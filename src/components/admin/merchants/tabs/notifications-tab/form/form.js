import React, { Component } from 'react';

import { html } from "./form.html";

import FormValidationService from '../../../../../../service/core/validate.service';

class Notification extends Component {

    // SAVE_INITIATED = "initiated";
    // SAVE_INPROGRESS = "inprogress";
    // SAVE_DONE = "done";

    fieldNames = [
        'nmSMS',
        'nmWApp',
        'nmEmail',
        'npSMS',
        'npWApp',
        'npEmail',
        'smsNumber',
        'smsCcyCode',
        'wAppNumber',
        'wAppCcyCode',
        'emailIds'
    ];

    rules = {
        smsNumber: [{ validate: 'required' }, { validate: 'mobile' }],
        wAppNumber: [{ validate: 'required' }, { validate: 'mobile' }],
        emailIds: [{ validate: 'required' }],
    }

    constructor(props) {
        super(props);

        this.state = {
            formKey:props.id,
            title: props.title,
            showMerchant: props.merchant ? true : false,
            formFields: this.prepareField(this.fieldNames, this.rules),
            save: '',
        }
    }

    //Please don't comment or remove any lines in the method
    //!Be careful if you make any change in the componentDidUpdate
    componentDidUpdate = () => {
        // if (this.props.saveNtn) {
        //     this.setState({ save: this.SAVE_INITIATED });
        //     //Give a parameter of tab index
        //     this.props.saveNtnCallback(3);
        // }

        // if (this.state.save === this.SAVE_INITIATED) {
        //     this.setState({ save: this.SAVE_INPROGRESS }, () => {
        //         // This callback is executed after the state is updated
        //         this.saveNotification();
        //     });
        // }
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

        if (value.viaSMS) {
            formattedValue += '1';
        } else {
            formattedValue += '0';
        }

        if (value.viaWhatsapp) {
            formattedValue += '1';
        } else {
            formattedValue += '0';
        }

        if (value.viaEmail) {
            formattedValue += '1';
        } else {
            formattedValue += '0';
        }

        return formattedValue;
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
     * Method to refresh the form fields
     */
    resetField = async (v) => {
        this.setState({
            formFields: this.prepareField([v], this.rules)
        })
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

            fields[fieldName] = {
                rules: rules[fieldName] || [],
                value: value,
                errors: []
            };
        });

        return fields;
    }

    handleCheckBoxClick = (e, field, inputField = "" ) => {
        var checked = e.target.checked;
                
        if ( inputField != "" ) {
            this.updateFormField(inputField, '');
        }

        this.updateFormField(field, checked);
    }
    render = () => html.apply(this);
}

export default (Notification);
