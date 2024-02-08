import moment from "moment";
import axios from "axios";
import * as constants from "../../config/constants";
import { config } from "../../config/config";
import { FileType } from '../../enum/common.enum';
import { toast } from 'react-toastify';

export default class Utils {

    static getFormattedDate(date) {
        if (!date) {
            return ''
        }
        return moment(date).format('MMM D YYYY, h:mm A');
    }

    static getFormattedDate2(date) {
        if (!date) {
            return ''
        }
        return moment(date).format('DD-MM-YYYY h:mm A');
    }

    static getFormattedDate3(date) {
        if (!date) {
            return ''
        }
        return moment(date).format('DD MMM YYYY');
    }

    /**
     * @author Vijayakumar
     * 
     * To format the date to date and month in 2 digit and separator will be customizable as require while using
     * Example: 01-12-1991 or 01/12/1991
     * 
     * @param {*} date 
     * @param {*} separator 
     * @returns String
     */
    static formatTwoDigitMonth(date, separator = "-") {
        if (!date) {
            return '';
        }

        return moment(date).format(`DD${separator}MM${separator}YYYY`);
    }

    static getFormattedDateCalendar(date) {
        if (!date) {
            return ''
        }
        return moment(date).format('MMM D YYYY');
    }

    static getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    static getVersion() {
        const v = config.version;
        return `${v.majorRevision}.${v.minorRevision}.${v.bugFixes}`
    }

    static getFormattedAddress(residentDetails) {
        return [residentDetails.address1,
        residentDetails.address2,
        residentDetails.cityOrTown,
        residentDetails.countyOrState,
        residentDetails.claimedCountry?.text,
        residentDetails.postCode].filter(Boolean).join(", ")
    }

    /**
     * Method to copying given value to paste anywhere 
     * 
     * @param {*} value 
     * @param {*} success 
     */
    static copyContent = (value, success) => {
        navigator.clipboard.writeText(value)
            .then(success)
            .catch((error) => {
                console.error('Unable to copy:', error);
            });
    };

    /**
     *  Method for format the date string in the system
     * 
     * @param {*} date 
     * @param {*} separator 
     * @returns 
     */
    static dateSystemFormat(date, separator = "/") {
        if (!date) {
            return '';
        }

        return moment(date).format(`DD${separator}MM${separator}YYYY`);
    }

    /**
     * Method for format the date and time string in the system
     * 
     * @param {*} date 
     * @param {*} separator 
     * @returns 
     */
    static datetimeSystemFormat(date, separator = "/") {
        if (!date) {
            return '';
        }

        return moment(date).format(`DD${separator}MM${separator}YYYY HH:mm:ss`);
    }

    /**
     * Method for format the date and time string to date
     * java date format convert here
     * 
     * @param {*} date 
     * @param {*} separator 
     * @returns 
     */
    static javaDateToJsFormat(date, separator = "/") {
        if (!date) {
            return '';
        }

        return moment(date, 'ddd MMM DD HH:mm:ss zzz YYYY').format(`DD${separator}MM${separator}YYYY`);
    }

    /**
      * Method to set null when value is empty 
      * 
      * @param {*} value 
      * @returns null
      */
    static setNullWhenEmpty = (value) => {
        value = value.trim();

        return (value) ? value : null;
    }

    /**
     * Method to set empty string when value is null
     * 
     * @param {*} value 
     * @returns string
     */
    static setEmptyWhenNull = (value) => {
        return (!value) ? "" : value;
    }

    /**
     * Method to Downloads the pdf content
     * @param {*} base64Content 
     * @param {*} fileName 
     */
    static downloadBase64PDF = (base64Content, fileName) => {

        var byteCharacters = atob(base64Content);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: 'application/pdf' });

        if ('download' in document.createElement('a')) {
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName + '.pdf';
            link.click();

            window.URL.revokeObjectURL(link.href);
        } else if (window.navigator.msSaveBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.pdf');
        } else {
            toast.error('Error downloading PDF.');
        }
    }

    // Helper function to convert empty strings to null
    static setNullIfEmpty(value) {
        return value === '' ? null : value;
    }

    static formatPhoneNumber(phoneNumber, countryCode) {
        // Trim and replace country code if phoneNumber is not null
        console.log("input", countryCode, phoneNumber)
        const formattedPhoneNumber = this.setNullIfEmpty(phoneNumber);
        if (formattedPhoneNumber !== null) {

            console.log("forate", formattedPhoneNumber.replace("+" + countryCode, "").trim())
            return formattedPhoneNumber.replace("+" + countryCode, "").trim();
            
        }
        return null;
    }

}
