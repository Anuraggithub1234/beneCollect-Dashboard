import React, { Component } from 'react';
import { html } from "./service-preference.html";
import { DashboardService } from '../../../../../service/api/dashboard.service';
import FormValidationService from '../../../../../service/core/validate.service';
import moment from 'moment';
import { messages } from '../../../../../config/constants';
import Utils from '../../../../../service/core/utils';
import { toast } from 'react-toastify';


class ServicePreference extends Component {
    INITIATED = "initiated";
    INPROGRESS = "inprogress";
    DONE = "done";

    fieldNames = [
        'paymentDefaultDueDate',
        'expiryDate',
        'emailId',
        'mobileNoForSMS',
        'SMSMobileNoCountryCode',
        'mobileNoForWhatsApp',
        'WhatAppMobileNoCountryCode',
        'reminderFrequency',
        'defaultCurrency',
    ]

    rules = {
        expiryDate: [{ validate: 'required' }],
        paymentDefaultDueDate: [{ validate: 'required' }],
        reminderFrequency: [{ validate: 'required' }],
        defaultCurrency: [{ validate: 'required' }],
        mobileNoForSMS: [{ validate: 'mobile' }],
        mobileNoForWhatsApp: [{ validate: 'mobile' }],
    }

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            loading: false,
            paymentRequestInitiationViaAPI: false,
            paymentRequestInitiationViaFileUpload: false,
            paymentRequestInitiationViaScreen: false,
            invoicesSubscription: false,
            refundRequestInitiationViaAPI: false,
            refundRequestInitiationViaFileUpload: false,
            refundRequestInitiationViaScreen: false,
            cancellationsViaScreen: false,
            keyCurrencies: false,
            otherCurrencies: false,
            autoGenerateUnpaidInvoice: false,
            autoGeneratePaidInvoice: false,
            selectedKeyCurrency: [],
            selectedOtherCurrency: [],
            keyCurrenciesList: [],
            withoutKeyCurrenciesList: [],
            allCurrency: [],
            formFields: this.prepareField(this.fieldNames, this.rules),
            save: '',
            merchantId: '',
            getPreState: '',
            fieldsOnchange: false,
            deleteSerAndPre: '',
        }
    }

    getSupportedCurrency = async (callback = {}) => {
        this.setState({ loading: true });
        const response = await DashboardService.getCurrencies()
        if (!response) {
            return
        }

        const ccyResponse = response.supportedCcyList;

        const excludedCurrencyNames = ['INR', 'USD', 'GBP', 'EUR', 'AUD', 'AED', 'CAD'];

        const withoutExcludedCurrencies = ccyResponse.filter((currency) => excludedCurrencyNames.includes(currency));
        const withoutKeyCurrencies = ccyResponse.filter((currency) => !excludedCurrencyNames.includes(currency));

        if (ccyResponse !== undefined && ccyResponse.length > 0 && withoutExcludedCurrencies.length > 0) {
            this.state.keyCurrenciesList = withoutExcludedCurrencies.map(currency => ({ name: currency, currencyType: 'keyCurrency', checked: false }));
            this.state.withoutKeyCurrenciesList = withoutKeyCurrencies.map(currency => ({ name: currency, currencyType: 'otherCurrency', checked: false }));
            this.state.allCurrency = ccyResponse;
        }

        this.setState({ loading: false });

        if (typeof callback == 'function') {
            callback();
        }
    }

    handleCheckBoxEvent = async (e, currency) => {
        var elementName = e.target.name;
        var elementValue = e.target.checked;

        const newState = { ...this.state };
        newState[elementName] = elementValue;

        if (!newState['fieldsOnchange']) {
            newState['fieldsOnchange'] = true;
        }

        if (elementName == 'invoicesSubscription' && elementValue == false) {
            newState.autoGenerateUnpaidInvoice = false;
            newState.autoGeneratePaidInvoice = false;
        }

        if (currency) {
            currency.checked = elementValue

            if (currency.currencyType == "keyCurrency") {
                const selectedCurrencyIndex = newState.selectedKeyCurrency.indexOf(currency);

                if (selectedCurrencyIndex !== -1 && currency.checked == false) {
                    newState.selectedKeyCurrency.splice(selectedCurrencyIndex, 1);
                }
                else if (currency.checked == true) {
                    newState.selectedKeyCurrency.push(currency);
                }
            }
            else if (currency.currencyType == "otherCurrency") {
                const selectedCurrencyIndex = newState.selectedOtherCurrency.indexOf(currency);

                if (selectedCurrencyIndex !== -1 && currency.checked == false) {
                    newState.selectedOtherCurrency.splice(selectedCurrencyIndex, 1);
                }
                else if (currency.checked == true) {
                    newState.selectedOtherCurrency.push(currency);
                }
            }
        }

        if (elementName === "keyCurrencies") {
            // If keyCurrencies checkbox is clicked, update all keyCurrenciesList items
            newState.selectedKeyCurrency = newState.keyCurrenciesList = newState.keyCurrenciesList.map((item) => ({
                ...item,
                checked: elementValue,
            }));

        } else if (elementName === "otherCurrencies") {
            // If otherCurrencies checkbox is clicked, update all withoutKeyCurrenciesList items
            newState.withoutKeyCurrenciesList = newState.withoutKeyCurrenciesList.map(
                (item) => ({
                    ...item,
                    checked: elementValue,
                })
            );
        } else {
            // If an individual currency item is clicked, update its checked status
            newState[elementName] = elementValue;

            if (newState.keyCurrenciesList.some((item) => item.checked == false)) {
                newState.keyCurrencies = false;
            }

            if (newState.withoutKeyCurrenciesList.some((item) => item.checked == false)) {
                newState.otherCurrencies = false;
            }

            if (newState.keyCurrenciesList.every((item) => item.checked == true)) {
                newState.keyCurrencies = true;
            }

            if (newState.withoutKeyCurrenciesList.every((item) => item.checked == true)) {
                newState.otherCurrencies = true;
            }
        }

        await this.setState(newState);
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

        if (!this.state.fieldsOnchange) {
            this.state.fieldsOnchange = true;
        }

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

            if (fieldName == "merchantType") {
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
     * To handle event for the due date field when change
     * @param {*} event
     */
    handleDateFields = async (event, fieldName) => {
        let value = null;
        // const formField = this.state.formFields;

        if (event != null) {
            value = moment(event.toDate()).format("YYYY-MM-DD");
        }

        this.updateFormField(fieldName, value);
    }

    //Get currency name
    getCurrencyName = (currencyArray) => {
        // Initialize an empty array to store names
        const checkedCurrencyNames = [];

        // Loop through the array and store names of checked items
        for (const item of currencyArray) {
            if (item.checked) {
                checkedCurrencyNames.push(item.name);
            }
        }

        return checkedCurrencyNames;
    }

    // Helper function to convert empty strings to null
    setNullIfEmpty(value) {
        return value === '' ? null : value;
    }

    /**
     * @author Ragavan
     * Format the payment,refund,cancellation fields
     * Store in XXX format - 1st X API, 2nd X File Upload, 3rd X Screen, Store 1 for Yes and 0 for No, ex: 001 means only Screen upload required
     * @param {*} value 
     * @returns 
     */
    formatAction = (value) => {

        let formattedValue = '';

        if (value.viaAPI) {
            formattedValue += '1';
        } else {
            formattedValue += '0';
        }

        if (value.viaFileUpload) {
            formattedValue += '1';
        } else {
            formattedValue += '0';
        }

        if (value.viaScreen) {
            formattedValue += '1';
        } else {
            formattedValue += '0';
        }

        return formattedValue;
    }

    //The API return value in "000" format
    //Method set the payment, refund, cancellation fields in the true or false based on the value
    splitStringIntoLetters = (preferenceType, inputString) => {
        this.setState({ loading: true });
        var letters = inputString.split('');

        if (preferenceType == "1") {
            if (letters[0] == "1") {
                this.setState({ paymentRequestInitiationViaAPI: true });
            } else {
                this.setState({ paymentRequestInitiationViaAPI: false });
            }

            if (letters[1] == "1") {
                this.setState({ paymentRequestInitiationViaFileUpload: true });
            } else {
                this.setState({ paymentRequestInitiationViaFileUpload: false });
            }

            if (letters[2] == "1") {
                this.setState({ paymentRequestInitiationViaScreen: true });
            } else {
                this.setState({ paymentRequestInitiationViaScreen: false });
            }
        }

        if (preferenceType == "2") {
            if (letters[0] == "1") {
                this.setState({ refundRequestInitiationViaAPI: true });
            } else {
                this.setState({ refundRequestInitiationViaAPI: false });
            }

            if (letters[1] == "1") {
                this.setState({ refundRequestInitiationViaFileUpload: true });
            } else {
                this.setState({ refundRequestInitiationViaFileUpload: false });
            }

            if (letters[2] == "1") {
                this.setState({ refundRequestInitiationViaScreen: true });
            } else {
                this.setState({ refundRequestInitiationViaScreen: false });
            }
        }

        if (preferenceType == "3") {
            if (letters[0] == "1") {
                this.setState({ cancellationsViaScreen: true });
            } else {
                this.setState({ cancellationsViaScreen: false });
            }
        }

        this.setState({ loading: false });
    }

    setValuesToCurrencies = (v) => {

        if (v && v.keyCurrencies !== '' && v.keyCurrencies !== null) {
            this.setState({ loading: true });

            var curyList = [];
            const currencies = v.keyCurrencies.split(',');

            curyList.push(...currencies);

            const updatedArray = this.state.keyCurrenciesList.map((currency) => ({
                ...currency,
                checked: curyList.includes(currency.name),
            }));

            // Store checked true currencies in separate variables
            const checkedKeyCurrencies = updatedArray
                .filter((currency) => currency.checked)
                .map((currency) => currency);

            this.setState({ keyCurrenciesList: updatedArray, selectedKeyCurrency: checkedKeyCurrencies, loading: false });

            if (this.state.keyCurrenciesList.every((item) => item.checked == true)) {
                this.state.keyCurrencies = true;
            }

            if (this.state.withoutKeyCurrenciesList.every((item) => item.checked == true)) {
                this.state.otherCurrencies = true;
            }
        }

        if (v && v.allowedCurrencies !== '' && v.allowedCurrencies !== null) {

            this.setState({ loading: true });

            var curyList = [];
            const currencies = v.allowedCurrencies.split(',');

            curyList.push(...currencies);

            const updatedArray = this.state.withoutKeyCurrenciesList.map((currency) => ({
                ...currency,
                checked: curyList.includes(currency.name),
            }));

            // Store checked true currencies in separate variables
            const checkedKeyCurrencies = updatedArray
                .filter((currency) => currency.checked)
                .map((currency) => currency);

            this.setState({ withoutKeyCurrenciesList: updatedArray, selectedOtherCurrency: checkedKeyCurrencies, loading: false });

            if (this.state.keyCurrenciesList.some((item) => item.checked == false)) {
                this.state.keyCurrencies = false;
            }

            if (this.state.withoutKeyCurrenciesList.some((item) => item.checked == false)) {
                this.state.otherCurrencies = false;
            }
        }
    }

    /**
    * update the each fields in the form
    * after the updation trigger the field validation
    * 
    * @param {*} formFields 
    */
    updateFormFields = async (formFields, validate = true) => {
        await this.setState({ formFields: formFields });
    }

    saveServicePreference = async () => {

        let formValid = await this.validateForm();
        var sendRes = { saveSP: false, messages: false };

        if (formValid && this.state.fieldsOnchange && this.state.merchantId) {
            this.setState({ loading: true });
            const formFields = this.state.formFields;

            var paymentRequestInitiationAction = {
                viaAPI: this.setNullIfEmpty(this.state.paymentRequestInitiationViaAPI),
                viaFileUpload: this.setNullIfEmpty(this.state.paymentRequestInitiationViaFileUpload),
                viaScreen: this.setNullIfEmpty(this.state.paymentRequestInitiationViaScreen),
            };

            var refunds = {
                viaAPI: this.setNullIfEmpty(this.state.refundRequestInitiationViaAPI),
                viaFileUpload: this.setNullIfEmpty(this.state.refundRequestInitiationViaFileUpload),
                viaScreen: this.setNullIfEmpty(this.state.refundRequestInitiationViaScreen),
            };

            var cancellation = {
                viaScreen: this.setNullIfEmpty(this.state.cancellationsViaScreen),
            };

            var requestObj = {
                merchantId: this.state.merchantId,
                paymentRequestInitiation: this.formatAction(paymentRequestInitiationAction),
                refunds: this.formatAction(refunds),
                cancellations: this.formatAction(cancellation),
                invoicesSubscription: this.setNullIfEmpty(this.state.invoicesSubscription),

                autoGenerateInvoice: {
                    unpaidInvoice: this.setNullIfEmpty(this.state.autoGenerateUnpaidInvoice),
                    paidInvoice: this.setNullIfEmpty(this.state.autoGeneratePaidInvoice),
                },

                paymentDefaultDueDate: this.setNullIfEmpty(formFields.paymentDefaultDueDate.value),
                expiryDate: this.setNullIfEmpty(formFields.expiryDate.value),
                emailId: this.setNullIfEmpty(formFields.emailId.value),
                mobileNoForSMS: this.setNullIfEmpty(formFields.mobileNoForSMS.value),
                smsMobileNoCountryCode: this.setNullIfEmpty(formFields.SMSMobileNoCountryCode.value),
                mobileNoForWhatsApp: this.setNullIfEmpty(formFields.mobileNoForWhatsApp.value),
                whatAppMobileNoCountryCode: this.setNullIfEmpty(formFields.WhatAppMobileNoCountryCode.value),
                reminderFrequency: this.setNullIfEmpty(formFields.reminderFrequency.value),
                merchantDefaultCurrency: this.setNullIfEmpty(formFields.defaultCurrency.value),
                keyCurrencies: this.state.keyCurrencies ? this.getCurrencyName(this.state.keyCurrenciesList) : this.state.selectedKeyCurrency.length > 0 ? this.getCurrencyName(this.state.selectedKeyCurrency) : [],
                otherCurrencies: this.state.otherCurrencies ? this.getCurrencyName(this.state.withoutKeyCurrenciesList) : this.state.selectedOtherCurrency.length > 0 ? this.getCurrencyName(this.state.selectedOtherCurrency) : [],
            }

            console.log("requestObj : ", requestObj);

            const res = await DashboardService.saveMerchantServicepref(requestObj);
            console.log("Save Services and preference :", res);

            if (res && res !== 'undefined') {
                this.setState({ save: this.DONE, loading: false });

                sendRes.saveSP = true;
                sendRes.messages = true;
            } else {
                this.setState({ loading: false });
            }
        } else {

            if (!this.state.fieldsOnchange) {
                sendRes.saveSP = true;
                sendRes.messages = false;
            }
            this.setState({ save: '' });
        }

        this.props.sPSaveResponse(sendRes);
    }

    fetchSerAndPre = async () => {
        let merchantId = this.props.merchantId;

        if (merchantId) {
            this.setState({ loading: true });

            const reqObj = { merchantId: merchantId }

            const res = await DashboardService.fetchMerchantOnboardPrefe(reqObj);

            if (res && res.merchantServiceAndPreference.length > 0) {
                res.merchantServiceAndPreference.forEach((v, i) => {

                    if (v.actionPreference == "1") {
                        this.state.formFields.defaultCurrency.value = Utils.setEmptyWhenNull(v.settlementCcy);
                        this.state.formFields.emailId.value = Utils.setEmptyWhenNull(v.email);
                        this.state.formFields.paymentDefaultDueDate.value = Utils.setEmptyWhenNull(v.defaultPaymentDueDays);
                        this.state.formFields.expiryDate.value = Utils.setEmptyWhenNull(v.expiryAfterDue);
                        this.state.formFields.mobileNoForSMS.value = Utils.setEmptyWhenNull(v.notificationSmsPhone);
                        this.state.formFields.mobileNoForWhatsApp.value = Utils.setEmptyWhenNull(v.notificationWtsapPhone);
                        this.state.formFields.reminderFrequency.value = Utils.setEmptyWhenNull(v.reminderFrequency);
                        this.state.invoicesSubscription = v.invoiceSubscription == "1" ? true : false;
                        this.state.autoGeneratePaidInvoice = v.autoInvoicePaid == "1" ? true : false;
                        this.state.autoGenerateUnpaidInvoice = v.autoInvoiceUnpaid == "1" ? true : false;

                        this.updateFormFields(this.state.formFields);
                        this.splitStringIntoLetters(v.actionPreference, v.actionThrough);
                        this.setValuesToCurrencies(v);
                    }

                    if (v.actionPreference == "2") {
                        this.splitStringIntoLetters(v.actionPreference, v.actionThrough);
                    }

                    if (v.actionPreference == "3") {
                        this.splitStringIntoLetters(v.actionPreference, v.actionThrough);
                    }
                })
            }

            this.setState({ loading: false });
        }
    }

    deletePreference = async () => {
        if (this.state.merchantId) {
            const res = await DashboardService.deleteOnboardPreference(this.state.merchantId);

            if (res.message) {
                this.setState({ openBDdeletepopup: false }, () => {
                    toast.success(res.message);
                    this.fetchSerAndPre();
                });
            }
        }
        else {
            this.setState({ openBDdeletepopup: false }, () => {
                toast.error("Unable to delete");
            });
        }
    }

    /**
    * Method to refresh the form fields
    */
    resetForm = async () => {
        this.setState({
            formFields: this.prepareField(this.fieldNames, this.rules)
        })
    }

    clearPreferenceValues = () => {

        this.resetForm();
        this.setState({
            selectedKeyCurrency: [],
            selectedOtherCurrency: [],
            paymentRequestInitiationViaAPI: false,
            paymentRequestInitiationViaFileUpload: false,
            paymentRequestInitiationViaScreen: false,
            invoicesSubscription: false,
            refundRequestInitiationViaAPI: false,
            refundRequestInitiationViaFileUpload: false,
            refundRequestInitiationViaScreen: false,
            cancellationsViaScreen: false,
            keyCurrencies: false,
            otherCurrencies: false,
            autoGenerateUnpaidInvoice: false,
            autoGeneratePaidInvoice: false,
        }, () => {
            const newState = { ...this.state };

            const anyKeyCuryChecked = newState.keyCurrenciesList.some(item => item.checked);
            newState.keyCurrenciesList = newState.keyCurrenciesList.map((item) => ({
                ...item,
                checked: anyKeyCuryChecked ? false : item.checked,
            }));

            const anyOtherCuryChecked = newState.withoutKeyCurrenciesList.some(item => item.checked);
            newState.withoutKeyCurrenciesList = newState.withoutKeyCurrenciesList.map((item) => ({
                ...item,
                checked: anyOtherCuryChecked ? false : item.checked,
            }));

            this.setState(newState);
        });
    }


    componentDidMount = async () => {
        this.getSupportedCurrency()
    }

    //Please don't comment or remove any lines in the method
    //!Be careful if you make any change in the componentDidUpdate
    componentDidUpdate = () => {

        //Call the Save method
        if (this.props.saveSP) {
            this.setState({ save: this.INITIATED, merchantId: this.props.merchantId });
            //Give a parameter of tab index
            this.props.saveSPCallback(2);
        }

        if (this.state.save === this.INITIATED) {
            this.setState({ save: this.INPROGRESS }, () => {
                this.saveServicePreference();
            });
        }

        //Call the fetch method
        if (this.props.getSPPreValue) {
            this.setState({ getPreState: this.INITIATED, merchantId: this.props.merchantId });
            //Give a parameter of tab index
            this.props.getSPPreValueCallback(2);
        }

        if (this.state.getPreState === this.INITIATED) {
            this.setState({ getPreState: this.INPROGRESS }, () => {
                this.getSupportedCurrency(() => {
                    this.fetchSerAndPre();
                });
            });
        }

        //Call delete method 
        if (this.props.delete) {
            this.setState({ deleteSerAndPre: this.INITIATED, merchantId: this.props.merchantId });
            //Give a parameter of tab index
            this.props.spDeleteCallback(2);
        }

        if (this.state.deleteSerAndPre === this.INITIATED) {
            this.setState({ deleteSerAndPre: this.INPROGRESS }, () => {
                this.getSupportedCurrency(() => {
                    this.setState({ openBDdeletepopup: true });
                });
            });
        }
    }

    render = () => html.apply(this);
}

export default (ServicePreference);
