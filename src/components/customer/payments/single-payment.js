import { Component } from 'react';
import moment from "moment";
import { html } from "./single-payment.html";
import { PaymentService } from '../../../service/api/payment.service';
import FormValidationService from '../../../service/core/validate.service';
import { messages } from '../../../config/constants';
import Utils from '../../../service/core/utils';
import { toast } from "react-toastify";
import { urls } from '../../../config/urlConfig';

/**
 * Component for process Single process payment transaction
 * 
 * @author Muthukumaran
 */
class SinglePayment extends Component {

    // form fields declaration
    fieldNames = [
        'payerName',
        'payerEmail',
        'payerMobile',
        'description',
        'collectionRef',
        'transactionId',
        'dueDate',
        'expiryDate',
        'reqCurrency',
        'reqAmount',
        'initialAmount',
        'chargeAmount',
        'chargeReason',
        'mobileCountry'
    ];

    amountFields = ['reqAmount', 'initialAmount', 'chargeAmount'];

    // define rules for each fields in single payment transaction form
    rules = {
        payerName: [{ validate: 'required' }],
        description: [{ validate: 'required' }],
        collectionRef: [{ validate: 'required' }],
        transactionId: [{ validate: 'required' }],
        dueDate: [{ validate: 'required' }],
        reqCurrency: [{ validate: 'required' }],
        payerMobile: [{ validate: 'mobile' }],
        initialAmount: [
            { validate: 'positive' },
            { validate: 'decimal', decimal: 0 },
            {
                validate: 'lessthan',
                depends: ['reqAmount'],
                message: messages.lessAmount
            }
        ],
        chargeAmount: [
            { validate: 'positive' },
            { validate: 'decimal', decimal: 0 },
            {
                validate: 'lessthan',
                depends: ['reqAmount'],
                message: messages.lessAmount
            },
            {
                validate: 'sumEqual',
                base: "reqAmount",
                depends: ['chargeAmount', 'initialAmount'],
                message: messages.shouldEqual
            }
        ],
        reqAmount: [
            { validate: 'required' },
            { validate: 'positive' },
            { validate: 'nonZero' },
            { validate: 'decimal', decimal: 0 },
        ],
        payerEmail: [
            { validate: 'required' },
            {
                validate: 'email',
                message: messages.spEmailInvalid,
            },
        ],
        transactionId: [
            { validate: 'required' },
            {
                validate: 'validateByAPI',
                url: urls.checkRequestorTransaction + '/',
                method: 'GET',
                param: 'self'
            },
        ],
    };

    /**
     * Constructor for Single Payment
     * 
     * @param props 
     */
    constructor(props) {
        super(props);

        // declare state for single payment component
        this.state = {
            formFields: this.prepareField(this.fieldNames, this.rules),
            currencyList: [],
            payers: [],
            showForm: true,
            transaction: {},
            mailSent: false,
            paymentLink: null,
            txnResponse: null,
            showExpiry: false,
            loading: false,
            showExpiryMobile: false,
            mobileTitle: "Request Money"
        }
    }

    /**
     * Handler for when component ready 
     */
    componentDidMount = async () => {
        setTimeout(() => {
            this.getSupportedCurrency();
            this.getMerchantDetails();
        }, 1200);
    }

    /**
     * Method to refresh the form fields
     */
    resetForm = async () => {
        this.setState({
            formFields: this.prepareField(this.fieldNames, this.rules),
            showForm: true
        })

        // collect the merchant dates auto-fill
        await this.getMerchantDetails();
    }

    /**
     * update the each fields in the form
     * after the updation trigger the field validation
     * 
     * @param {*} formFields 
     */
    updateFormFields = (formFields, validate = true) => {
        this.setState({ formFields: formFields });

        if (validate) {
            this.validateForm();
        }
    }

    /**
     * Method to update the particular field in the form
     * after the updation trigger the field validation
     * 
     * @param {*} fieldName 
     * @param {*} value 
     * @param {*} validate 
     */
    updateFormField = (fieldName, value, validate = true) => {
        let fields = this.state.formFields;

        if (fields.hasOwnProperty(fieldName) != -1) {
            fields[fieldName].value = value;

            this.setState({ formFields: fields });
        }

        if (validate) {
            this.validateField(fieldName);
        }
    }

    /**
     * Method to assign basic field data 
     * 
     * @param fieldNames 
     * @param rules 
     * @returns 
     */
    prepareField = (fieldNames, rules) => {
        const fields = {};

        fieldNames.forEach(fieldName => {
            let value = '';

            if (fieldName == "mobileCountry") {
                value = "in";
            } else if (fieldName == "dueDate") {
                value = null;
            }

            fields[fieldName] = {
                rules: rules[fieldName] || [],
                value: value,
                errors: []
            };
        });

        return fields;
    }

    /**
     * Add the decimal rule based on the currency update
     * 
     * @param {*} currency 
     */
    updateDecimalInRule = (currency, validate = true) => {
        try {
            let code = this.state.currencyList.filter((v) => v.code == currency);

            if (code.length > 0) {
                let decimal = code[0].decimal;

                // set the decimal value to test
                this.amountFields.forEach((fieldName) => {
                    const field = this.state.formFields[fieldName];

                    field.rules.forEach((rule, index) => {
                        if (rule.validate == "decimal") {
                            this.state.formFields[fieldName].rules[index].decimal = decimal;
                        }
                    })
                });

                this.setState({ formFields: this.state.formFields });

                // validate the decimal
                if (validate) {
                    this.amountFields.forEach((fieldName) => {
                        const field = this.state.formFields[fieldName];

                        if (field.value) {
                            this.validateField(fieldName);
                        }
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Set the decimal points for all amount fields
     * 
     * @param {*} fieldName 
     * @param {*} amount 
     * @returns 
     */
    autoFixDecimal = (fieldName, amount) => {
        try {
            let formFields = this.state.formFields;

            let rule = formFields[fieldName].rules.filter((rule) => rule.validate == "decimal");

            if (amount && rule.length > 0) {
                amount = parseFloat(amount).toFixed(rule[0].decimal);
            }

            return amount;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Set the required attribure based on the charge amount field 
     * 
     * @param changeAmt
     * @param formFields
     * @returns 
     */
    toggleReasonToMandate(changeAmt, formFields) {
        if (changeAmt && changeAmt > 0) {
            formFields.chargeReason.rules = [{ validate: 'required' }]
        } else {
            formFields.chargeReason.rules = []
        }

        return formFields;
    }

    /**
     * Validate the field based on designed rules
     * 
     * @param {*} fieldName 
     */
    validateField = async (fieldName) => {
        let field = this.state.formFields[fieldName];

        const { errors, valid } = await FormValidationService.validate(field.rules, field.value, this.state.formFields);

        this.state.formFields[fieldName].errors = errors;

        this.setState({ formFields: this.state.formFields });
    }

    /**
     * Validate the form fields
     * 
     * @returns 
     */
    validateForm = async () => {
        let formValid = true;

        for (let fieldName of this.fieldNames) {
            const field = this.state.formFields[fieldName];

            const { errors, valid } = await FormValidationService.validate(field.rules, field.value, this.state.formFields);

            this.state.formFields[fieldName].errors = errors;

            if (!valid) {
                formValid = false;
            }
        };

        this.setState({ formFields: this.state.formFields });

        return formValid;
    }

    /**
    * Validate the form fields
    * 
    * @returns 
    */
    validateFormMobile = async () => {

        let formValid = true;

        for (let fieldName of this.fieldNames) {
            
            if (fieldName === 'collectionRef' || fieldName === 'transactionId') {
                continue;
            }
            const field = this.state.formFields[fieldName];

            const { errors, valid } = await FormValidationService.validate(field.rules, field.value, this.state.formFields);

            this.state.formFields[fieldName].errors = errors;

            if (!valid) {
                formValid = false;
            }
        };

        this.setState({ formFields: this.state.formFields});

        return formValid;
    }

    /**
     * Method to fetch the payer transaction
     * 
     * @returns 
     */
    getPayerTransaction = async (payer) => {
        try {
            const response = await PaymentService.fetchPayerRecentTransaction(payer.name, payer.email);

            if (response && response.data && response.data.payerRecentTransaction.length > 0) {
                const transaction = response.data.payerRecentTransaction[0];

                // convertion for react input component does not accept the null in the value 
                this.state.formFields.payerName.value = Utils.setEmptyWhenNull(transaction.debtorName);
                this.state.formFields.payerEmail.value = Utils.setEmptyWhenNull(transaction.debtorEmailId);
                this.state.formFields.payerMobile.value = Utils.setEmptyWhenNull(transaction.debtorMobileNumber);
                this.state.formFields.description.value = Utils.setEmptyWhenNull(transaction.reasonForCollection);
                this.state.formFields.transactionId.value = Utils.setEmptyWhenNull(transaction.requestorTransactionId);
                this.state.formFields.collectionRef.value = Utils.setEmptyWhenNull(transaction.collectionReferenceNumber);
                this.state.formFields.reqCurrency.value = Utils.setEmptyWhenNull(transaction.collectionCurrency);
                this.state.formFields.reqAmount.value = Utils.setEmptyWhenNull(transaction.finalDueAmount);

                this.updateFormFields(this.state.formFields);

                // set the decimal point for validation rule 
                this.updateDecimalInRule(transaction.collectionCurrency, false);

                // update the decimal points for amount fields
                this.amountFields.forEach((fieldName) => {
                    const field = this.state.formFields[fieldName];

                    if (field.value) {
                        let amount = this.autoFixDecimal(fieldName, field.value);

                        this.updateFormField(fieldName, amount);
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Prepare the submission form values to request object
     * 
     * @param {*} transaction 
     * @param {*} formFields 
     * @returns 
     */
    setSubmissionValues = (transaction, formFields) => {
        transaction.debtorName = formFields.payerName.value;
        transaction.debtorEmailId = formFields.payerEmail.value;
        // before submit remove the extra characters from the mobile number
        transaction.debtorMobileNumber = formFields.payerMobile.value.replace(/[-\s]/g, "");
        transaction.reasonForCollection = formFields.description.value;
        transaction.requestorTransactionId = formFields.transactionId.value;
        transaction.collectionReferenceNo = formFields.collectionRef.value;
        transaction.finalDueDate = formFields.dueDate.value;
        transaction.paymentExpiryDate = formFields.expiryDate.value;
        transaction.collectionCurrency = formFields.reqCurrency.value;
        transaction.finalDueAmount = formFields.reqAmount.value;
        transaction.initialDueAmount = Utils.setNullWhenEmpty(formFields.initialAmount.value);
        transaction.charges = Utils.setNullWhenEmpty(formFields.chargeAmount.value);
        transaction.reasonForCharges = Utils.setNullWhenEmpty(formFields.chargeReason.value);

        return transaction;
    }

    /**
     * Handle new form request
     */
    handleMakeAnother = async () => {
        this.setState({
            formFields: this.prepareField(this.fieldNames, this.rules),
            showForm: true
        });

        // collect the merchant dates auto-fill
        await this.getMerchantDetails();
    }

    /**
     * Method to fetch the supported currency list
     * 
     * @returns 
     */
    getSupportedCurrency = async () => {
        const response = await PaymentService.fetchCurrencyDecimals();

        if (response && response.data && response.data.currencyList.length > 0) {
            this.setState({ currencyList: response.data.currencyList })
        }
    }

    /**
     * Method to fetch the payer transaction
     */
    getPayers = async (name) => {
        const response = await PaymentService.fetchPayers(name);

        if (response && response.data) {
            const payers = response.data.payers.map((payer) => {
                return { "name": payer.debtorName, "email": payer.debtorEmailId }
            });

            this.setState({ payers: payers });
        }
    }

    /**
     * Method to fetch merchant details and  due and expiry dates
     */
    getMerchantDetails = async (name) => {
        const response = await PaymentService.getMerchantDetails(name);

        if (response && response.data) {

            if (response.data.dueDate && response.data.expiryDate) {
                let formFields = this.state.formFields;

                formFields.dueDate.value = response.data.dueDate;
                formFields.expiryDate.value = response.data.expiryDate;
                formFields.reqCurrency.value = response.data.settlementCcy;

                this.setState({ formFields: formFields });
                
                setTimeout(() => {
                    // set the decimal point for validation rule 
                    this.updateDecimalInRule(response.data.settlementCcy, false);    
                }, 1000);
            }
        }
    }

    /**
     * Method to submit the form values
     */
    submitForm = async () => {
        this.setState({loading: true});
        try {
            const formFields = this.state.formFields;

            let transaction = {};
            let mailDone = false;
            let paymentLink = null;
            let message = null;

            // prepare the transaction request object
            transaction = this.setSubmissionValues(transaction, formFields);

            const response = await PaymentService.submitPayment(transaction);

            var transactionData = transaction;

            if (response && response.data) {
                if (response.data.transaction) {
                    transactionData = response.data.transaction;
                    transactionData.finalDueAmount = transaction.finalDueAmount;
                }

                if (response.data.mailSent) {
                    mailDone = response.data.mailSent;
                }

                if (response.data.message) {
                    message = response.data.message;
                }

                if (response.data.paymentLink) {
                    paymentLink = response.data.paymentLink;
                }
            }

            this.setState({
                transaction: transactionData,
                showForm: false,
                mailSent: mailDone,
                paymentLink: paymentLink,
                txnResponse: message,
                mobileTitle: "Request Sent"
            });
        } catch (error) {
            console.error(error);
        }
        this.setState({loading: false});
    }

    /**
     * To handle event for the due date field when change
     * @param {*} event
     */
    handleDueDate = async (event) => {
        let value = null;

        if (event != null) {
            value = moment(event.toDate()).format("YYYY-MM-DD");
        }

        this.updateFormField("dueDate", value);

        await this.updateExpiryDate(value);
    }

    /**
     * Update the expiry date based on the given due date
     */
    updateExpiryDate = async (dueDate) => {
        const response = await PaymentService.fetchExpiryDate(dueDate);
        
        if (response && response.data) {
            if (response.data.expiryDate) {
                let formFields = this.state.formFields;

                formFields.expiryDate.value = response.data.expiryDate;

                this.setState({ formFields: formFields });
            }
        }
    }

    /**
     * To handle event for requested amount field when change
     * @param {*} event 
     */
    handleRequestedAmount = (event) => {
        let amount = event.target.value.replace(/[^0-9.]/g, '');

        this.updateFormField("reqAmount", amount);
    }

    /**
     * To handle event for  initial amount field when change
     * @param {*} event
     */
    handleInitialAmount = (event) => {
        let amount = event.target.value.replace(/[^0-9.]/g, '');

        this.updateFormField("initialAmount", amount);
    }

    /**
     * To handle event for change amount field when change
     * @param {*} event
     */
    handleChangeAmount = (event) => {
        let amount = event.target.value.replace(/[^0-9.]/g, '');

        // update reason field required or not
        let fields = this.toggleReasonToMandate(amount, this.state.formFields);

        this.setState({ formFields: fields });

        this.updateFormField("chargeAmount", amount);
    }

    /**
     * @author Bharath
     * HandleEvent to generate the invoice
     * @param {*} params 
     */
    handleGenerateInvoice = async (params) => {    
        let response = await PaymentService.generateInvoice(params);
        if (response.pdfContent && response.fileName) {
            Utils.downloadBase64PDF(response.pdfContent, response.fileName)
        } else {
            toast.error(response.message)
        }
        
    }

    render = () => html.apply(this);
}

export default SinglePayment;
