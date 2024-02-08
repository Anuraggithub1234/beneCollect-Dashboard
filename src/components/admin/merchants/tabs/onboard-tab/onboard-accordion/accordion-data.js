import React, { Component } from 'react';

import { html } from "./accordion-data.html";
import FormValidationService from '../../../../../../service/core/validate.service';
import moment from 'moment';
import { DashboardService } from '../../../../../../service/api/dashboard.service';
import { toast } from 'react-toastify';

class AccordionData extends Component {

    INITIATED = "initiated";
    INPROGRESS = "inprogress";
    DONE = "done";

    // form fields declaration
    fieldNames = [
        'pglOnboardingStatus',
        'pglDateCompletedForOnboarding',
        'pglMerchantIdForProvider',
        'pglOnboardingNotes',
        'pglSettlementCury',
        'pglBankAccountNumber',
        'pglBranchCode',
        'pglSwiftBic',
        'pglNameOfAccount',
        'pglTypeOfAccount',
        'pglNameOfBank',
        'pglNameOfBranch',

        'finaroOnboardingStatus',
        'finaroDateCompletedForOnboarding',
        'finaroMerchantIdForProvider',
        'finaroOnboardingNotes',
        'finaroSettlementCury',
        'finaroBankAccountNumber',
        'finaroBranchCode',
        'finaroSwiftBic',
        'finaroNameOfAccount',
        'finaroTypeOfAccount',
        'finaroNameOfBank',
        'finaroNameOfBranch',

        'nttOnboardingStatus',
        'nttDateCompletedForOnboarding',
        'nttMerchantIdForProvider',
        'nttOnboardingNotes',
        'nttSettlementCury',
        'nttBankAccountNumber',
        'nttBranchCode',
        'nttSwiftBic',
        'nttNameOfAccount',
        'nttTypeOfAccount',
        'nttNameOfBank',
        'nttNameOfBranch',

        // 'payGlocalSettlementsDetailsForAllSer',
        // 'finaroSettlementsDetailsForAllSer',
        // 'nttSettlementsDetailsForAllSer',

        'pglProvider',
        'finaroProvider',
        'nttProvider',
    ]

    rules = {
        pglOnboardingStatus: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.pglProvider.value == true; } }],
        pglDateCompletedForOnboarding: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.pglProvider.value == true; } }],
        pglMerchantIdForProvider: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.pglProvider.value == true; } }],
        pglSettlementCury: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.pglProvider.value == true; } }],
        pglBankAccountNumber: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.pglProvider.value == true; } }],
        pglBranchCode: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.pglProvider.value == true; } }],
        pglSwiftBic: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.pglProvider.value == true; } }],
        pglNameOfAccount: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.pglProvider.value == true; } }],
        pglTypeOfAccount: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.pglProvider.value == true; } }],
        pglNameOfBank: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.pglProvider.value == true; } }],
        pglNameOfBranch: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.pglProvider.value == true; } }],

        finaroOnboardingStatus: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.finaroProvider.value == true; } }],
        finaroDateCompletedForOnboarding: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.finaroProvider.value == true; } }],
        finaroMerchantIdForProvider: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.finaroProvider.value == true; } }],
        finaroSettlementCury: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.finaroProvider.value == true; } }],
        finaroBankAccountNumber: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.finaroProvider.value == true; } }],
        finaroBranchCode: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.finaroProvider.value == true; } }],
        finaroSwiftBic: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.finaroProvider.value == true; } }],
        finaroNameOfAccount: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.finaroProvider.value == true; } }],
        finaroTypeOfAccount: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.finaroProvider.value == true; } }],
        finaroNameOfBank: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.finaroProvider.value == true; } }],
        finaroNameOfBranch: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.finaroProvider.value == true; } }],

        nttOnboardingStatus: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.nttProvider.value == true; } }],
        nttDateCompletedForOnboarding: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.nttProvider.value == true; } }],
        nttMerchantIdForProvider: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.nttProvider.value == true; } }],
        nttSettlementCury: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.nttProvider.value == true; } }],
        nttBankAccountNumber: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.nttProvider.value == true; } }],
        nttBranchCode: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.nttProvider.value == true; } }],
        nttSwiftBic: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.nttProvider.value == true; } }],
        nttNameOfAccount: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.nttProvider.value == true; } }],
        nttTypeOfAccount: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.nttProvider.value == true; } }],
        nttNameOfBank: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.nttProvider.value == true; } }],
        nttNameOfBranch: [{ validate: 'required', type: 'depend', cb: () => { return this.state.formFields.nttProvider.value == true; } }],
    }

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            save: '',
            onboardStatusOptions: [],
            formFields: this.prepareField(this.fieldNames, this.rules),
            currencyList: [],
            providers: [],
            merchantId: '',
            mIdUpdated: this.INITIATED,
            flagOfCallFetch: this.INITIATED,
            flagForCallFM: '',
            currentTabValue: '',
            onchangeisCalled: false,
            expandedPanel1: true,
            expandedPanel2: false,
            expandedPanel3: false,
            cardType: '',
            previousCardType: '',
            reqObj: {},
        }
    }

    expandHandleChange = (panel) => () => {
        this.setState((prevState) => ({
            expandedPanel1: panel === 'expandedPanel1' ? !prevState.expandedPanel1 : false,
            expandedPanel2: panel === 'expandedPanel2' ? !prevState.expandedPanel2 : false,
            expandedPanel3: panel === 'expandedPanel3' ? !prevState.expandedPanel3 : false,
        }));
    };

    clearFieldValues = (name) => {
        const formFields = this.state.formFields;
        formFields[`${name}`].value = "",
            formFields[`${name}`].value = "",
            formFields[`${name}`].value = "",
            formFields[`${name}`].value = "",
            formFields[`${name}`].value = "",
            formFields[`${name}`].value = "",
            formFields[`${name}`].value = "",
            formFields[`${name}`].value = "",
            formFields[`${name}`].value = "",
            formFields[`${name}`].value = "",
            formFields[`${name}`].value = "",
            formFields[`${name}`].value = ""

        this.updateFormFields(formFields);
    }

    handleProviderCheckBox = (fieldName, value) => {

        if (fieldName == "pglProvider") {
            if (value == false) {
                this.fieldNames.forEach(name => {
                    if (name.startsWith('pgl')) {
                        this.clearFieldValues(name);
                    }
                });
            }
        }

        if (fieldName == "finaroProvider") {
            if (value == false) {
                this.fieldNames.forEach(name => {
                    if (name.startsWith('finaro')) {
                        this.clearFieldValues(name);
                    }
                });
            }
        }

        if (fieldName == "nttProvider") {
            if (value == false) {
                this.fieldNames.forEach(name => {
                    if (name.startsWith('ntt')) {
                        this.clearFieldValues(name);
                    }
                });
            }
        }
        this.updateFormField(fieldName, value);
    }

    /**
    * Method to update the particular field in the form
    * after the updation trigger the field validation
    * 
    * @param {*} fieldName 
    * @param {*} value 
    * @param {*} validate 
    */
    updateFormField = async (fieldName, value, validate = true) => {

        let fields = this.state.formFields;

        if (fields.hasOwnProperty(fieldName) != -1) {
            fields[fieldName].value = value;

            this.setState({ formFields: fields, onchangeisCalled: true });
        }

        if (validate) {
            this.validateField(fieldName);
        }

        this.prepareAPIResponse();
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

            if (fieldName == "payGlocalSettlementsDetailsForAllSer") {
                value = false;
            }

            if (fieldName == "finaroSettlementsDetailsForAllSer") {
                value = false;
            }

            if (fieldName == "nttSettlementsDetailsForAllSer") {
                value = false;
            }

            fields[fieldName] = {
                rules: rules[fieldName] || [],
                value: value,
                errors: []
            };
        });

        return fields;
    }

    // Helper function to convert empty strings to null
    setNullIfEmpty(value) {
        return value === '' ? null : value;
    }

    /**
     * To handle event for the due date field when change
     * @param {*} event
     */
    handleDateFields = async (event, fieldName) => {
        let value = null;

        if (event != null) {
            value = moment(event.toDate()).format("YYYY-MM-DD");
        }

        this.updateFormField(fieldName, value);
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

    /**
    * Method to refresh the form fields
    */
    resetForm = async () => {
        this.setState({
            formFields: this.prepareField(this.fieldNames, this.rules)
        })
    }

    saveMerchantOnboardingTab1 = async () => {
        // let formValid = await this.validateForm();
        let formValid = false;
        var sendRes = { onBoardingFormSave: false };
        const formFields = this.state.formFields;

        if (formValid && this.state.onchangeisCalled && this.props.cardList.length > 0) {
            if (formFields.pglProvider.value || formFields.finaroProvider.value || formFields.nttProvider.value) {

                this.setState({ loading: true });

                const requestObj = {
                    merchantId: this.props.merchantId,
                    ...this.state.reqObj
                };

                const response = await DashboardService.saveMerchantOnboarding(requestObj);

                if (response && response !== undefined) {
                    this.setState({ save: this.DONE, loading: false });

                    sendRes.onBoardingFormSave = true;
                    this.props.saveResForMerchantOnboarding(sendRes);
                }
                else {
                    this.setState({ loading: false });
                    this.props.saveResForMerchantOnboarding(sendRes);
                }
            }
        } else {
            this.setState({ save: '' });

            if (this.props.cardList.length == 0) {
                toast.error("Please select any one of the card")
            } else {
                toast.error("Please fill the required fields")
            }
        }
    }

    clearValues = () => {
        this.resetForm();
    }

    setValues = async (desiredTabValue, providersComesInApi=false) => {
        var cardTypeCodes = [];

        this.state.providers.forEach((ct) => {
            if (ct.cardType) {
                cardTypeCodes.push(ct.cardType);
            }
        });

        if (cardTypeCodes.length > 0 && providersComesInApi) {
           await this.props.updateCardType(cardTypeCodes);
        }

        let providers = this.collectProviderData(desiredTabValue);

        if (providers.length > 0) {
            this.setState({ loading: true });
            await this.resetForm();

            providers.forEach((v) => {

                // Define the list of provider objects
                const providerObjects = [
                    { id: "1", provider: "pgl" },
                    { id: "2", provider: "finaro" },
                    { id: "3", provider: "ntt" }
                ];

                // Find the matching provider object
                const currentProviderObj = providerObjects.find(
                    (providerObj) => v.fkpaymentProviderId == providerObj.id
                );

                const formFields = this.state.formFields;

                if (currentProviderObj) {
                    Object.keys(formFields).forEach((field) => {
                        const fieldName = field.substring(0, field.lastIndexOf('Provider'));

                        if (fieldName.toLowerCase() === currentProviderObj.provider) {
                            formFields[field].value = v.fkpaymentProviderId === currentProviderObj.id ? true : false;
                            formFields[`${fieldName}OnboardingStatus`].value = v.onboardingStatus;
                            formFields[`${fieldName}DateCompletedForOnboarding`].value = v.dateOnboardingCompleted;
                            formFields[`${fieldName}MerchantIdForProvider`].value = v.providerMerchantId;
                            formFields[`${fieldName}OnboardingNotes`].value = v.onboardingNotes;
                            formFields[`${fieldName}SettlementCury`].value = v.settlementCurrency;
                            formFields[`${fieldName}BankAccountNumber`].value = v.bankAccountNo;
                            formFields[`${fieldName}BranchCode`].value = v.branchCode;
                            formFields[`${fieldName}SwiftBic`].value = v.swiftBic;
                            formFields[`${fieldName}NameOfAccount`].value = v.nameOnAccount;
                            formFields[`${fieldName}TypeOfAccount`].value = v.accountType;
                            formFields[`${fieldName}NameOfBank`].value = v.bankName;
                            formFields[`${fieldName}NameOfBranch`].value = v.bankBranch;
                        }
                    });
                }

                this.updateFormFields(formFields);
                this.setState({ loading: false });
            });
        }
        else {
            this.resetForm();
            // this.props.resetCardTypes();
        }
    };

    prepareAPIResponse = () => {
        if (this.state.onchangeisCalled) {
            const formFields = this.state.formFields;
            const cardTypes = this.props.cardList;
            const providers = ['pgl', 'finaro', 'ntt'];

            const resultArray = [...this.state.providers];
            const requestObj = this.state.reqObj;

            const selectedCardType = this.props.cardType;

            cardTypes.forEach((cardType) => {
                if (selectedCardType && cardType.lookupCode == selectedCardType) {
                    const cardTypeName = cardType.description.replace(/\s/g, "");
                    var strVal = "";
                    if (cardTypeName == "UPI") {
                        strVal = cardTypeName.toLowerCase();
                    } else {
                        strVal = cardTypeName.charAt(0).toLowerCase() + cardTypeName.slice(1);
                    }

                    requestObj[strVal] = {};

                    providers.forEach((provider) => {
                        requestObj[strVal][provider] = {};
                        requestObj[strVal]["cardTypeId"] = cardType.lookupCode;

                        this.fieldNames.forEach((fieldName) => {
                            if (fieldName.startsWith(`${provider}`)) {
                                if (fieldName == 'pglProvider') {
                                    this.state.formFields.pglProvider.value = formFields[fieldName].value ? '1' : null;
                                } else if (fieldName == 'finaroProvider') {
                                    this.state.formFields.finaroProvider.value = formFields[fieldName].value ? '2' : null;
                                } else if (fieldName == 'nttProvider') {
                                    this.state.formFields.nttProvider.value = formFields[fieldName].value ? '3' : null;
                                }

                                const trimmedFieldName = fieldName.replace(`${provider}`, '');
                                const fieldNameWithLowerFirstLetter = trimmedFieldName.charAt(0).toLowerCase() + trimmedFieldName.slice(1);
                                const value = formFields[fieldName].value;

                                requestObj[strVal][provider][fieldNameWithLowerFirstLetter] = this.setNullIfEmpty(value);
                            }
                        });

                        const entry = {
                            merchantIdForProvider: requestObj[strVal][provider].merchantIdForProvider,
                            provider: requestObj[strVal][provider].provider,
                            onboardingStatus: requestObj[strVal][provider].onboardingStatus,
                            dateCompletedForOnboarding: requestObj[strVal][provider].dateCompletedForOnboarding,
                            onboardingNotes: requestObj[strVal][provider].onboardingNotes,
                            settlementDetailsCommon: requestObj[strVal][provider].settlementDetailsCommon,
                            settlementCury: requestObj[strVal][provider].settlementCury,
                            bankAccountNumber: requestObj[strVal][provider].bankAccountNumber,
                            branchCode: requestObj[strVal][provider].branchCode,
                            swiftBic: requestObj[strVal][provider].swiftBic,
                            nameOfAccount: requestObj[strVal][provider].nameOfAccount,
                            typeOfAccount: requestObj[strVal][provider].typeOfAccount,
                            nameOfBank: requestObj[strVal][provider].nameOfBank,
                            nameOfBranch: requestObj[strVal][provider].nameOfBranch,
                        };

                        const existingEntry = requestObj[strVal][provider];

                        if (existingEntry) {
                            // Update the existing entry
                            requestObj[strVal][provider] = { ...existingEntry, ...entry };
                        } else {
                            // Add a new entry
                            requestObj[strVal][provider] = entry;
                        }
                    });
                }
            });

            cardTypes.forEach((cardType) => {
                if (selectedCardType && cardType.lookupCode == selectedCardType) {
                    const cardTypeName = cardType.description.replace(/\s/g, "");
                    var strVal = "";
                    if (cardTypeName === "UPI") {
                        strVal = cardTypeName.toLowerCase();
                    } else {
                        strVal = cardTypeName.charAt(0).toLowerCase() + cardTypeName.slice(1);
                    }

                    providers.forEach((provider) => {
                        const entry = {
                            providerMerchantId: requestObj[strVal][provider].merchantIdForProvider,
                            fkpaymentProviderId: requestObj[strVal][provider].provider,
                            cardType: cardType.lookupCode,
                            onboardingStatus: requestObj[strVal][provider].onboardingStatus,
                            dateOnboardingCompleted: requestObj[strVal][provider].dateCompletedForOnboarding,
                            onboardingNotes: requestObj[strVal][provider].onboardingNotes,
                            settlementDetailsCommon: requestObj[strVal][provider].settlementDetailsCommon,
                            settlementCurrency: requestObj[strVal][provider].settlementCury,
                            bankAccountNo: requestObj[strVal][provider].bankAccountNumber,
                            branchCode: requestObj[strVal][provider].branchCode,
                            swiftBic: requestObj[strVal][provider].swiftBic,
                            nameOnAccount: requestObj[strVal][provider].nameOfAccount,
                            accountType: requestObj[strVal][provider].typeOfAccount,
                            bankName: requestObj[strVal][provider].nameOfBank,
                            bankBranch: requestObj[strVal][provider].nameOfBranch,
                        };

                        // Check if an entry with the same cardType and provider already exists
                        const existingIndex = resultArray.findIndex((existingEntry) =>
                            existingEntry.cardType == entry.cardType && existingEntry.fkpaymentProviderId == entry.fkpaymentProviderId
                        );

                        if (existingIndex !== -1) {
                            // Update the existing entry
                            resultArray[existingIndex] = entry;
                        } else {
                            // Add a new entry
                            if (entry.fkpaymentProviderId) {
                                resultArray.push(entry);
                            }
                        }
                    });
                }
            });

            this.setState({ providers: resultArray, reqObj: requestObj });
        }
    }

    collectProviderData = (cardType) => {
        const cardData = this.state.providers.filter((provider) => {
            return provider.cardType == cardType;
        });

        return cardData !== undefined ? cardData : [];
    }

    fetchOBValues = async () => {
        if (this.state.merchantId) {
            var providersComesInApi = false;
            this.setState({ loading: true });

            const reqObj = { merchantId: this.state.merchantId }

            const res = await DashboardService.fetchMerchantOnboarding(reqObj);

            if (res && res.providers && res.providers.length > 0) {

                this.setState({ providers: res.providers }, () => {
                    this.setValues(this.props.cardType,  providersComesInApi=true);
                });
            }

            this.setState({ loading: false });
        }
    }

    getSettlementCurrency = async (id) => {

        if (id) {
            this.setState({ loading: true });

            const reqObj = { merchantId: id }

            const res = await DashboardService.fetchMerchantBasicDetails(reqObj);
            var data = res.merchantBasicDetails[0];

            if (data && data !== undefined && data !== null && data.settlementCcy) {

                this.state.formFields.pglSettlementCury.value = data.settlementCcy;
                this.state.formFields.finaroSettlementCury.value = data.settlementCcy;
                this.state.formFields.nttSettlementCury.value = data.settlementCcy;

                this.updateFormFields(this.state.formFields);
            }

            this.setState({ loading: false });
        }
    }

    getCurrencyList = async () => {
        this.setState({ loading: true });
        const response = await DashboardService.getCurrencies()
        if (!response) {
            return
        }

        this.setState({ currencyList: response.supportedCcyList, loading: false })
    }

    getOnboardingStatusList = async () => {
        this.setState({ loading: true });

        const response = await DashboardService.getOnboardingStatus()
        if (!response) {
            return
        }

        this.setState({ onboardStatusOptions: response.onboardingStatus, loading: false })
    }

    componentDidMount = async () => {
        this.getCurrencyList();
        this.getOnboardingStatusList();
    }

    //Please don't comment or remove any lines in the method
    //!Be careful if you make any change in the componentDidUpdate
    componentDidUpdate = () => {

        if (this.props.merchantId && this.state.mIdUpdated === this.INITIATED) {
            this.setState({ merchantId: this.props.merchantId, previousCardType: this.props.previousCardType, currentTabValue: this.props.currentTab, mIdUpdated: this.DONE }, () => {
                this.getSettlementCurrency(this.props.merchantId);
            });
        }

        if (this.props.fetchValue && this.state.flagOfCallFetch === this.INITIATED) {
            this.setState({ flagOfCallFetch: this.DONE }, () => {
                this.fetchOBValues();
            });
        }

        if (this.props.callSaveMethod) {
            this.setState({ save: this.INITIATED });
            //Give a parameter of tab index
            this.props.saveMethodCallback(4);
        }

        if (this.state.save === this.INITIATED) {
            this.setState({ save: this.INPROGRESS }, () => {
                // This callback is executed after the state is updated
                this.saveMerchantOnboardingTab1();
            });
        }

        if (this.props.callFetchMethod) {
            this.setState({ flagForCallFM: this.INITIATED });
            //Give a parameter of tab index
            this.props.fetchMethodCallback();
        }

        if (this.state.flagForCallFM === this.INITIATED) {
            this.setState({ cardType: this.props.cardType, previousCardType: this.props.previousCardType, flagForCallFM: this.INPROGRESS }, () => {
                // This callback is executed after the state is updated
                this.fetchOBValues();
                this.setValues(this.props.cardType);
            });
        }

        if (this.props.delete) {
            this.setState({ flagForCallDelete: this.INITIATED },
                this.props.deleteCallback()
            );
        }

        if (this.state.flagForCallDelete === this.INITIATED) {
            this.setState({ flagForCallDelete: this.INPROGRESS }, () => {
                this.setState({ providers: [] }, () => {
                    this.resetForm();
                    this.props.resetCardTypes();
                });
            });
        }
    }

    render = () => html.apply(this);
}

export default (AccordionData);
