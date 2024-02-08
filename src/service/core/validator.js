import _ from 'lodash';
import { isValidPhoneNumber } from 'libphonenumber-js';

export default class Validator {
    static isEmail(email) {
        const reg = /^[a-z]+([a-z0-9_.])*@[a-z]+(\.[a-z]{2,3})+$/i;
        return reg.test(email);
    }

    static isPasswordValid(string) {
        const reg = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
        return reg.test(string);
    }

    static isPhoneValid(phone) {
        const reg = /^\d{10}$/;
        return reg.test(phone);
    }

    static isOTPValid(otp) {
        const reg = /^\d{4}$/;
        return reg.test(otp);
    }

    static isTagValid(tag) {
        const reg = /^[A-Za-z0-9_]{2}$/;
        return reg.test(tag);
    }
    static isModificationFlagValid(modificationFlag) {
        const reg = /^[A-Za-z0-9_]{2}$/;
        return reg.test(modificationFlag);
    }
    static isCountryCodeValid(countryCode) {
        const reg = /^[A-Za-z]{2}$/;
        return reg.test(countryCode);
    }

    /**
     * validate non-empty to check for mandatory
     * 
     * @param value 
     * @returns 
     */
    static isNotEmpty(value) {
        if( typeof value == 'number' ){
            return value != '';
        } else {
            return !_.isEmpty(value);
        }
    }

    /**
     * validate to check  value is non-negative
     * 
     * @param value
     * @returns 
     */
    static isPositiveNumber(value) {
        return (Math.sign(value) !== -1) ? true : false;
    }

    /**
     * Validate decimal number
     * 
     * @param {*} value 
     * @param {*} decimal 
     * @returns 
     */
    static isValidDecimal(value, decimal) {
        let parts = value.toString().split('.');

        if (decimal == 0) {
            return (parts.length == 1);
        }

        var isValidated = /^[-+]?[0-9]+\.[0-9]+$/.test(value);

        if (!isValidated) {
            return false;
        }

        return parts[1].length == decimal;
    }

    /**
     * Validate mobile number
     * 
     * @param {*} value 
     * @param {*} decimal 
     * @returns 
     */
    static async isValidMobileNumber(value) { 
        return isValidPhoneNumber(value);
    }
}
