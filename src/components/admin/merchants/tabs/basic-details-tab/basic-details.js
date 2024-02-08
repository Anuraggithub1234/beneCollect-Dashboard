import { Component } from 'react';
import { html } from "./basic-details.html";
import FormValidationService from '../../../../../service/core/validate.service.js';
import { include } from 'underscore';
import { DashboardService } from '../../../../../service/api/dashboard.service';
import Utils from '../../../../../service/core/utils';
import { toast } from 'react-toastify';


class BasicDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            loading: false,
            formFields: this.prepareField(this.fieldNames, this.rules),
            selectedTab: 0,
            merchantDropdownOptions: [
                { index: '1', label: 'Mr' },
                { index: '2', label: 'Mrs' },
                { index: '3', label: 'Ms' },
                { index: '4', label: 'Dr' },
            ],
            merchantNamePrefix: [],
            merchantCountry: [],
            selectedDropdownValue: null,
            sameAsTradingAddress: true,
            formData: props.data || {},
            save: '', // Inprogress, Done
            getPreValueState: '', // Inprogress, Done
            deleteBD: '', // Inprogress, Done
            merchantId: "",
            prevFormFields: {},
            merchanIdForAfterSave: '',
            merchantTypeOptions: [],
            merchantIndustryList: [],
            fieldsOnchange: false,
            openBDdeletepopup: false,
        };
    }

    INITIATED = "initiated";
    INPROGRESS = "inprogress";
    DONE = "done";

    // form fields declaration
    fieldNames = [
        'merchantType',
        'merchantName',
        'country',
        'industry',
        'registrationNo',
        'tradingAddressLine1',
        'tradingAddressLine2',
        'townOrCity',
        'postCode',
        'stateOrCounty',
        'countryForTradingAddress',
        'mobileForTradingAddress',
        'mobileCountryCodeForTradingAddress',
        'regAddressLine1',
        'regAddressLine2',
        'townOrCityForRegAddress',
        'postCodeForRegAddress',
        'stateOrCountryForRegAddress',
        'countryForRegAddress',
        'mobileForRegAddress',
        'mobileCountryCodeForRegAddress',
        'prefixForPrimaryContact',
        'firstNameForPrimaryContact',
        'surnameForPrimaryContact',
        'emailForPrimaryContact',
        'designationForPrimaryContact',
        'mobileForPrimaryContact',
        'mobileCountryForPrimaryContact',
        'prefixForSecondaryContact',
        'firstNameForSecondaryContact',
        'surNameForSecondaryContact',
        'emailForSecondaryContact',
        'designationForSecondaryContact',
        'mobileForSecondaryContact',
        'mobileCountryForSecondaryContact',
    ];

    rules = {
        merchantType: [{ validate: 'required' }],
        merchantName: [{ validate: 'required' }],
        country: [{ validate: 'required' }],
        industry: [{ validate: 'required' }],
        registrationNo: [{ validate: 'required' }],
        tradingAddressLine1: [{ validate: 'required' }],
        townOrCity: [{ validate: 'required' }],
        postCode: [{ validate: 'required' }],
        countryForTradingAddress: [{ validate: 'required' }],
        regAddressLine1: [{ validate: 'required' }],
        townOrCityForRegAddress: [{ validate: 'required' }],
        postCodeForRegAddress: [{ validate: 'required' }],
        countryForRegAddress: [{ validate: 'required' }],

        mobileForTradingAddress: [{ validate: 'mobile' }],
        mobileForRegAddress: [{ validate: 'mobile' }],
        mobileForPrimaryContact: [{ validate: 'mobile' }],
        mobileForSecondaryContact: [{ validate: 'mobile' }],
    }

    handleTabChange = (event, newValue) => {
        this.setState({ selectedTab: newValue });
    };

    handleDropdownChange = (event, newValue) => {
        this.setState({ selectedDropdownValue: newValue });
    };

    handleCountryDropdownChange = (event, newValue) => {
        this.setState({ selectedCountryValue: newValue });
    };

    handleCheckboxChange = () => {
        this.setState((prevState) => ({
            sameAsTradingAddress: !prevState.sameAsTradingAddress,
        }));
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
        let fieldNamesForSkipValidation = ["regAddressLine1", "townOrCityForRegAddress", "postCodeForRegAddress", "countryForRegAddress"];

        for (let fieldName of this.fieldNames) {
            const field = this.state.formFields[fieldName];

            if (!(this.state.sameAsTradingAddress == true && include(fieldNamesForSkipValidation, fieldName))) {
                const { errors, valid } = await FormValidationService.validate(field.rules, field.value, this.state.formFields);

                this.state.formFields[fieldName].errors = errors;

                if (!valid) {
                    formValid = false;
                }
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
                value = "3";
            }

            if (fieldName == "country") {
                value = null;
            }

            if (fieldName == "industry") {
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

    // Helper function to convert empty strings to null
    setNullIfEmpty(value) {
        return value === '' ? null : value;
    }

    /**
     * @author Ragavan
     * Save the Merchant Basic Details
     * Please don't comment or remove the else part in the method
     * @returns 
     */
    saveMerchantBasicDetails = async () => {
        let formValid = await this.validateForm();
        var sendRes = { basicDetailsFormSave: false, merchanIdForAfterSave: '', message: false };

        if (this.state.merchantId !== null && this.state.merchantId !== "") {
            if (formValid && this.state.fieldsOnchange) {
                this.setState({ loading: true });
                const formFields = this.state.formFields;
                const regAddressSameAsTradingAdd = this.state.sameAsTradingAddress;

                var requestObj = {
                    merchantId: this.setNullIfEmpty(this.state.merchantId),
                    merchantType: this.setNullIfEmpty(formFields.merchantType.value),
                    merchantName: this.setNullIfEmpty(formFields.merchantName.value),
                    industryType: this.setNullIfEmpty(formFields.industry.value),
                    merchantCountry: this.setNullIfEmpty(formFields.country.value),
                    regnNo: this.setNullIfEmpty(formFields.registrationNo.value),
                    sameRegTradingAddr: this.state.sameAsTradingAddress ? 1 : 2,

                    tradingAddr: {
                        address1: this.setNullIfEmpty(formFields.tradingAddressLine1.value),
                        address2: this.setNullIfEmpty(formFields.tradingAddressLine2.value),
                        city: this.setNullIfEmpty(formFields.townOrCity.value),
                        postalcode: this.setNullIfEmpty(formFields.postCode.value),
                        state: this.setNullIfEmpty(formFields.stateOrCounty.value),
                        country: this.setNullIfEmpty(formFields.countryForTradingAddress.value),
                        phoneNo: this.setNullIfEmpty(formFields.mobileForTradingAddress.value),
                        phoneCtryCode: this.setNullIfEmpty(formFields.mobileCountryCodeForTradingAddress.value)
                    },

                    registeredAddr: {
                        address1: regAddressSameAsTradingAdd ? this.setNullIfEmpty(formFields.tradingAddressLine1.value) : this.setNullIfEmpty(formFields.regAddressLine1.value),
                        address2: regAddressSameAsTradingAdd ? this.setNullIfEmpty(formFields.tradingAddressLine2.value) : this.setNullIfEmpty(formFields.regAddressLine2.value),
                        city: regAddressSameAsTradingAdd ? this.setNullIfEmpty(formFields.townOrCity.value) : this.setNullIfEmpty(formFields.townOrCityForRegAddress.value),
                        postalcode: regAddressSameAsTradingAdd ? this.setNullIfEmpty(formFields.postCode.value) : this.setNullIfEmpty(formFields.postCodeForRegAddress.value),
                        state: regAddressSameAsTradingAdd ? this.setNullIfEmpty(formFields.stateOrCounty.value) : this.setNullIfEmpty(formFields.stateOrCountryForRegAddress.value),
                        country: regAddressSameAsTradingAdd ? this.setNullIfEmpty(formFields.countryForTradingAddress.value) : this.setNullIfEmpty(formFields.countryForRegAddress.value),
                        phoneNo: regAddressSameAsTradingAdd ? this.setNullIfEmpty(formFields.mobileForTradingAddress.value) : this.setNullIfEmpty(formFields.mobileForRegAddress.value),
                        phoneCtryCode: regAddressSameAsTradingAdd ? this.setNullIfEmpty(formFields.mobileCountryCodeForTradingAddress.value) : this.setNullIfEmpty(formFields.mobileCountryCodeForRegAddress.valu)
                    },

                    primaryContact: {
                        namePrefix: this.setNullIfEmpty(formFields.prefixForPrimaryContact.value),
                        firstName: this.setNullIfEmpty(formFields.firstNameForPrimaryContact.value),
                        lastName: this.setNullIfEmpty(formFields.surnameForPrimaryContact.value),
                        emailId: this.setNullIfEmpty(formFields.emailForPrimaryContact.value),
                        designation: this.setNullIfEmpty(formFields.designationForPrimaryContact.value),
                        phoneNo: this.setNullIfEmpty(formFields.mobileForPrimaryContact.value),
                        phoneCtryCode: this.setNullIfEmpty(formFields.mobileCountryForPrimaryContact.valu)
                    },

                    secondaryContact: {
                        namePrefix: this.setNullIfEmpty(formFields.prefixForSecondaryContact.value),
                        firstName: this.setNullIfEmpty(formFields.firstNameForSecondaryContact.value),
                        lastName: this.setNullIfEmpty(formFields.surNameForSecondaryContact.value),
                        email: this.setNullIfEmpty(formFields.emailForSecondaryContact.value),
                        designation: this.setNullIfEmpty(formFields.designationForSecondaryContact.value),
                        phoneNo: this.setNullIfEmpty(formFields.mobileForSecondaryContact.value),
                        phoneCtryCode: this.setNullIfEmpty(formFields.mobileCountryForSecondaryContact.valu)
                    }
                }

                console.log("Basic Details req Objwe", requestObj);
                const response = await DashboardService.saveMerchantBasicDetails(requestObj);

                if (response && response.statusCode == "200" && response !== undefined) {
                    this.setState({ save: this.DONE, merchanIdForAfterSave: response.merchantId, loading: false });

                    sendRes.basicDetailsFormSave = true;
                    sendRes.message = true;
                    sendRes.merchanIdForAfterSave = this.state.merchanIdForAfterSave;
                }
                else {
                    this.setState({ loading: false });
                }
            }
            else {
                if (!this.state.fieldsOnchange) {
                    sendRes.basicDetailsFormSave = true;
                    sendRes.message = false;
                }

                this.setState({ save: '' });
            }
        }
        else {
            this.setState({ save: '' });
        }

        this.props.saveResponse(sendRes);
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

    fetchMerchantBasicDetails = async () => {
        let merchantId = this.state.merchantId;

        if (merchantId) {
            this.setState({ loading: true });

            const reqObj = { merchantId: merchantId }

            const res = await DashboardService.fetchMerchantBasicDetails(reqObj);
            var data = res.merchantBasicDetails[0];
        
            let sendRes = { merchanIdForAfterSave: data.merchantId };
            this.props.saveResponse(sendRes);

            this.setState({
                sameAsTradingAddress: data.sameRegTradingAddr == 1 ? true : false
            });

            this.state.formFields.merchantName.value = Utils.setEmptyWhenNull(data.merchantName);
            this.state.formFields.merchantType.value = Utils.setEmptyWhenNull(data.merchantType);
            this.state.formFields.industry.value = Utils.setEmptyWhenNull(data.industryType);
            this.state.formFields.country.value = Utils.setEmptyWhenNull(data.country);
            this.state.formFields.registrationNo.value = Utils.setEmptyWhenNull(data.regnNo);

            if (!data.tradingAddr) {
                this.setState({ loading: false });
                return;
            }

            this.state.formFields.tradingAddressLine1.value = Utils.setEmptyWhenNull(data.tradingAddr.address1);
            this.state.formFields.tradingAddressLine2.value = Utils.setEmptyWhenNull(data.tradingAddr.address2);
            this.state.formFields.townOrCity.value = Utils.setEmptyWhenNull(data.tradingAddr.city);
            this.state.formFields.countryForTradingAddress.value = Utils.setEmptyWhenNull(data.tradingAddr.country);
            this.state.formFields.mobileCountryCodeForTradingAddress.value = Utils.setEmptyWhenNull(data.tradingAddr.phoneCtryCode);
            this.state.formFields.mobileForTradingAddress.value = Utils.setEmptyWhenNull(data.tradingAddr.phoneNo);
            this.state.formFields.postCode.value = Utils.setEmptyWhenNull(data.tradingAddr.postalcode);
            this.state.formFields.stateOrCounty.value = Utils.setEmptyWhenNull(data.tradingAddr.state);

            if (!data.registeredAddr) {
                this.setState({ loading: false });
                return;
            }

            this.state.formFields.regAddressLine1.value = Utils.setEmptyWhenNull(data.registeredAddr.address1);
            this.state.formFields.regAddressLine2.value = Utils.setEmptyWhenNull(data.registeredAddr.address2);
            this.state.formFields.townOrCityForRegAddress.value = Utils.setEmptyWhenNull(data.registeredAddr.city);
            this.state.formFields.postCodeForRegAddress.value = Utils.setEmptyWhenNull(data.registeredAddr.postalcode);
            this.state.formFields.stateOrCountryForRegAddress.value = Utils.setEmptyWhenNull(data.registeredAddr.state);
            this.state.formFields.countryForRegAddress.value = Utils.setEmptyWhenNull(data.registeredAddr.country);
            this.state.formFields.mobileForRegAddress.value = Utils.setEmptyWhenNull(data.registeredAddr.phoneNo);
            this.state.formFields.mobileCountryCodeForRegAddress.value = Utils.setEmptyWhenNull(data.registeredAddr.phoneCtryCode);

            if (!data.primaryContact) {
                this.setState({ loading: false });
                return;
            }

            this.state.formFields.prefixForPrimaryContact.value = Utils.setEmptyWhenNull(data.primaryContact.namePrefix);
            this.state.formFields.firstNameForPrimaryContact.value = Utils.setEmptyWhenNull(data.primaryContact.firstName);
            this.state.formFields.surnameForPrimaryContact.value = Utils.setEmptyWhenNull(data.primaryContact.lastName);
            this.state.formFields.emailForPrimaryContact.value = Utils.setEmptyWhenNull(data.primaryContact.emailId);
            this.state.formFields.designationForPrimaryContact.value = Utils.setEmptyWhenNull(data.primaryContact.designation);
            this.state.formFields.mobileForPrimaryContact.value = Utils.setEmptyWhenNull(data.primaryContact.phoneNo);
            this.state.formFields.mobileCountryForPrimaryContact.valu = Utils.setEmptyWhenNull(data.primaryContact.phoneCtryCode);

            if (!data.secondaryContact) {
                this.setState({ loading: false });
                return;
            }

            this.state.formFields.prefixForSecondaryContact.value = Utils.setEmptyWhenNull(data.secondaryContact.namePrefix);
            this.state.formFields.firstNameForSecondaryContact.value = Utils.setEmptyWhenNull(data.secondaryContact.firstName);
            this.state.formFields.surNameForSecondaryContact.value = Utils.setEmptyWhenNull(data.secondaryContact.lastName);
            this.state.formFields.emailForSecondaryContact.value = Utils.setEmptyWhenNull(data.secondaryContact.email);
            this.state.formFields.designationForSecondaryContact.value = Utils.setEmptyWhenNull(data.secondaryContact.designation);
            this.state.formFields.mobileForSecondaryContact.value = Utils.setEmptyWhenNull(data.secondaryContact.phoneNo);
            this.state.formFields.mobileCountryForSecondaryContact.valu = Utils.setEmptyWhenNull(data.secondaryContact.phoneCtryCode);

            this.updateFormFields(this.state.formFields);

            this.setState({ loading: false });
        }
    }

    deleteBD = async () => {

        if (this.state.merchantId) {
            const res = await DashboardService.deleteMerchantBasicDetails(this.state.merchantId);

            if (res.message) {
                this.setState({ openBDdeletepopup: false }, () => {
                    toast.success(res.message);
                    this.fetchMerchantBasicDetails();
                });
            }
        }
        else {
            this.setState({ openBDdeletepopup: false }, () => {
                toast.error("Unable to delete");
            });
        }
    }

    //Please don't comment or remove any lines in the method
    //!Be careful if you make any change in the componentDidUpdate
    componentDidUpdate = () => {
        if (this.props.saveBD) {
            this.setState({ save: this.INITIATED, merchantId: this.props.merchantId });
            //Give a parameter of tab index
            this.props.saveCallback(0);
        }

        if (this.state.save === this.INITIATED) {
            this.setState({ save: this.INPROGRESS }, () => {
                // This callback is executed after the state is updated
                this.saveMerchantBasicDetails();
            });
        }

        if (this.props.getPreValue) {
            this.setState({ getPreValueState: this.INITIATED, merchantId: this.props.merchantId });
            //Give a parameter of tab index
            this.props.getPreValueCallback(0);
        }

        if (this.state.getPreValueState === this.INITIATED) {
            this.setState({ getPreValueState: this.INPROGRESS }, () => {
                // This callback is executed after the state is updated
                this.fetchMerchantBasicDetails();
            });
        }

        if (this.props.deleteMerchantBD) {
            this.setState({ deleteBD: this.INITIATED, merchantId: this.props.merchantId });
            //Give a parameter of tab index
            this.props.deleteCallback(0);
        }

        if (this.state.deleteBD === this.INITIATED) {
            this.setState({ deleteBD: this.INPROGRESS, merchantId: this.props.merchantId, openBDdeletepopup: true });
        }
    }

    getNamePrefix = async () => {
        const result = await DashboardService.getNamePrefix();

        if (result && result.namePrefix !== null && result.namePrefix.length > 0) {
            this.setState({ merchantNamePrefix: result.namePrefix })
        }
    }

    getMerchantCountry = async () => {
        const result = await DashboardService.getMerchantCountrys();

        if (result && result.countryCodes !== null && result.countryCodes.length > 0) {
            this.setState({ merchantCountry: result.countryCodes })
        }
    }

    getMerchantTypes = async () => {
        const result = await DashboardService.getMerchantType();

        if (result && result.merchantTypes.length > 0) {
            this.setState({ merchantTypeOptions: result.merchantTypes })
        }
    }

    getMerchantIndustrys = async () => {
        const result = await DashboardService.getMerchantIndustrys();

        if (result && result.merchantIndustryList.length > 0) {
            this.setState({ merchantIndustryList: result.merchantIndustryList })
        }
    }

    componentDidMount = async () => {
        this.getNamePrefix();
        this.getMerchantCountry();
        this.getMerchantTypes();
        this.getMerchantIndustrys();
    }


    render = () => html.apply(this);

}

export default BasicDetails;
