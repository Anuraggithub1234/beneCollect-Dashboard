import _ from 'lodash';
import Validator from './validator';
import { messages } from '../../config/constants';
import { HTTP } from '../core/http.service'

/**
 * Generic service to validate the value with rules
 * Existing validation service not used anywhere
 * The base of existing validation service modified to generic way
 * It is Flexible for different forms and cover each field 
 * 
 * @author Muthukumaran
 */
class FormValidationService {

    /**
     * Method to validate based on rules for field
     * 
     * @param rules 
     * @param value 
     * @returns 
     */
    static async validate(rules, value, formFields) {
        let fields = formFields;

        const field = { errors: [], valid: true };

        if (!rules || _.isEmpty(rules)) {
            return field;
        }

        for (const rule of rules) {
            // to validate the individual field based on the added rule
            // custom validation can be pass on this value 
            if (rule.validate) {
                let result = await this.customValidation(field, rule, value, fields);

                field.errors = result.errors;
                field.valid = result.valid;
            }

            // to validate the regex test from added rule
            if (rule.test instanceof RegExp) {
                if (!rule.test.test(value)) {
                    field.errors.push(rule.message);
                    field.valid = false;
                }
            }

            // to validate the field based on the condition 
            // if (rule.condition) {
                // if (!rule.condition) {
                //     field.errors.push(rule.message);
                //     field.valid = false;
                // }
            // }
        };

        return field;
    }

    /**
     * Method to check is given form values valid
     * 
     * @param formElems 
     * @returns 
     */
    static isFormValid(formElems) {
        let formValid = true;

        Object.values(formElems).forEach((elem) => {
            const { errors, valid } = this.validate(elem.rules, elem.value);

            if (!valid) {
                formValid = false
            }
        });

        return formValid;
    }

    /**
     * Method to validate the custom validation rules
     * 
     * @param field 
     * @param rule 
     * @param value 
     * @returns 
     */
    static async customValidation(field, rule, value, fields) {

        switch (rule.validate) {

            // to validate the field is not empty
            case 'required':
                if (await Validator.isNotEmpty(value)) {
                    break;
                }

                // to check the callback return to bypass the validation 
                if( rule.type && rule.type == "depend" ){
                   if( rule.cb() == false ){
                    break;
                   }
                }

                field = this.mapMessage(field, rule, messages.requiredField);

                break;

            // to validate the field has valid email
            case 'email':
                if (!value) {
                    break;
                }

                if (await Validator.isEmail(value)) {
                    break;
                }

                field = this.mapMessage(field, rule, messages.emailInvalid);

                break;

            // to validate the field has the positive value
            case 'positive':
                if (!value) {
                    break;
                }

                if (await Validator.isPositiveNumber(value)) {
                    break;
                }

                field = this.mapMessage(field, rule, messages.requiredPositiveNumber);

                break;
            
            // validate the field value is not a zero
            case 'nonZero':
                if (!value) {
                    break;
                }

                if (parseFloat(value) > 0) {
                    break;
                }

                field = this.mapMessage(field, rule, messages.nonZero);

                break;
            
            // to validate the field has a proper decimal
            case 'decimal':
                if (!value) {
                    break;
                }

                if (await Validator.isValidDecimal(value, rule.decimal)) {
                    break;
                }

                let message = (rule.decimal > 0) ? messages.requiredDecimal.replace('{decimal}',` ${rule.decimal}`):messages.requiredDecimal.replace('{decimal}',' ');

                field = this.mapMessage(field, rule, message);

                break;

            // to validate the field value is a valid mobile number
            case 'mobile':
                if (!value) {
                    break;
                }

                if (await Validator.isValidMobileNumber(value)) {
                    break;
                }

                field = this.mapMessage(field, rule, messages.mobileInvalid);

                break;

            // to validate the field has less than another field
            // inter connect within the form fields
            case 'lessthan':
                if (!value || !fields) {
                    break;
                }

                try {
                    rule.depends.forEach((depend) => {
                        let no = (fields[depend] && fields[depend].value) ? fields[depend].value : 0;

                        if (parseFloat(value) > no) {
                            field = this.mapMessage(field, rule, messages.greatorError);
                        }
                    });
                } catch (error) {
                    field = this.mapMessage(field, rule, messages.invalidField);
                }

                break;

            // to validate the field has less than another field
            // inter connect within the form fields
            case 'sumEqual':
                if (!fields) {
                    break;
                }

                try {
                    if(rule.base){
                        if(fields[rule.base] && fields[rule.base].value){
                            value = fields[rule.base].value;
                        }
                    }
    
                    let sum = 0;
                    rule.depends.forEach((depend) => {
                        let no = (fields[depend] && fields[depend].value) ? fields[depend].value : 0;
    
                        sum += parseFloat(no);
                    });
    
                    if (sum > 0 && sum != parseFloat(value)) {
                        field = this.mapMessage(field, rule, messages.sumNotEqual);
                    }
                } catch (error) {
                    console.error(error);
                    field = this.mapMessage(field, rule, messages.invalidField);
                }

                break;
            
            // to validate the field
            case 'validateByAPI':
                if (!fields) {
                    break;
                }

                try {
                    var param = rule.param == 'self' ? value : rule.param;
                    field = await this.validateByAPI( field, rule, param);
                } catch (error) {
                    console.error(error);
                    field = this.mapMessage(field, rule, messages.invalidField);
                }

                break;

        }

        return field;
    }

    /**
     * Mapping messages with the field
     * 
     * @param field 
     * @param rule 
     * @param message 
     */
    static mapMessage(field, rule, message = null) {
        field.valid = false;

        if (rule.message) {
            field.errors.push(rule.message);
        } else if (message) {
            field.errors.push(message);
        }

        return field;
    }

    /**
     * Check the validation in the server
     * 
     * @param {*} field 
     * @returns 
     */
    static async validateByAPI( field, rule, param ) {
        const url = rule.url;
        
        param = param == null && !param ? '' : param;

        if( param == '' ) {
            return field;
        }

        var result = {};

        if (rule.method == "GET"){
            result = await HTTP.get(`${url}${param}`);
        }

        if (result.status && result.status == 200) {
            var data = result.data;

            if ( data.valid == false ){
                field.errors.push(data.message);
                field.valid = false;
            }
        } else {
            field.errors.push("unable to validate");
            field.valid = false;
        }

        return field;
    }
}

export default FormValidationService;
