import React, { Component } from 'react';

import { html } from "./notification.html";
import FormValidationService from '../../../../../service/core/validate.service';
import { DashboardService } from '../../../../../service/api/dashboard.service';
import Utils from '../../../../../service/core/utils';
import { toast } from 'react-toastify';

class Notification extends Component {

    INITIATED = "initiated";
    INPROGRESS = "inprogress";
    DONE = "done";

    fieldNames = [
        'mobileNoForMerPLSMSNtn',
        'mobileNoCtryCodeFormobileNoForMerPLSMSNtn',
        'mobileNoForMerPLWtsAppNtn',
        'ctryCodeFormobileNoForMerPLWtsAppNtn',
        'emailIdForMerPLNtn',

        'mobileNoForMerPCSMSNtn',
        'ctryCodeFormobileNoForMerPCSMSNtn',
        'mobileNoForMerPCWtsAppNtn',
        'ctryCodeFormobileNoForMerPCWtsAppNtn',
        'emailIdForMerPCNtn',

        'paymentConfirmNtnFMViaSMS',
        'ctryCodeForPaymentConfirmNtnFMViaSMS',
        'paymentConfirmNtnFMViaWtsApp',
        'ctryCodeForPaymentConfirmNtnFMViaWtsApp',
        'emailIdForMerPmtConfirmNtn',

        'mobileNoForMerPmtExpirySMSNtn',
        'ctryCodeForPmtExpirySMSNtn',
        'mobileNoForMerPmtExpiryWtsAppNtn',
        'ctryCodeForPmtExpiryWtsAppNtn',
        'emailIdForMerPmtExpiryNtn',

        'mobileNoForMerPmtRefundSMSNtn',
        'ctryCodeForPmtRefundSMSNtn',
        'mobileNoForMerPmtRefundWtsAppNtn',
        'ctryCodeForPmtRefundWtsAppNtn',
        'emailIdForMerPmtRefundNtn',

        'mobileNoForMerStlmntReportSMSNtn',
        'ctryCodeForStlmntReportSMSNtn',
        'mobileNoForMerStlmntReportWtsAppNtn',
        'ctryCodeForStlmntReportWtsAppNtn',
        'emailIdForMerSltmntReportNtn',
    ];

    rules = {
        mobileNoForMerPLSMSNtn: [
            {
                validate: 'required',
                type: 'depend',
                cb: () => {
                    return this.state.paymentLinkNtnForMerchantViaSMS === true;
                }

            },
            [{ validate: 'mobile' }]

        ],
        mobileNoForMerPLWtsAppNtn: [{ validate: 'mobile' }],
        emailIdForMerPLNtn: [],

        mobileNoForMerPCSMSNtn: [{ validate: 'mobile' }],
        mobileNoForMerPCWtsAppNtn: [{ validate: 'mobile' }],
        emailIdForMerPCNtn: [],

        paymentConfirmNtnFMViaSMS: [{ validate: 'mobile' }],
        paymentConfirmNtnFMViaWtsApp: [{ validate: 'mobile' }],
        emailIdForMerPmtConfirmNtn: [],

        mobileNoForMerPmtExpirySMSNtn: [{ validate: 'mobile' }],
        mobileNoForMerPmtExpiryWtsAppNtn: [{ validate: 'mobile' }],
        emailIdForMerPmtExpiryNtn: [],

        mobileNoForMerPmtRefundSMSNtn: [{ validate: 'mobile' }],
        mobileNoForMerPmtRefundWtsAppNtn: [{ validate: 'mobile' }],
        emailIdForMerPmtRefundNtn: [],

        mobileNoForMerStlmntReportSMSNtn: [{ validate: 'mobile' }],
        mobileNoForMerStlmntReportWtsAppNtn: [{ validate: 'mobile' }],
        emailIdForMerSltmntReportNtn: [],
    }

    constructor(props) {
        super(props);

        this.state = {
            formFields: this.prepareField(this.fieldNames, this.rules),
            save: '',
            getNtnPrevalue: '',
            getPreValue: '',
            paymentLinkNtnForMerchantViaSMS: false,
            paymentLinkNtnForMerchantViaWtsApp: false,
            paymentLinkNtnForMerchantViaEmail: false,
            PLNotifyPayerViaSMS: false,
            PLNotifyPayerViaWtsApp: false,
            PLNotifyPayerViaEmail: false,

            paymentCancelNtnForMerchantViaSMS: false,
            paymentCancelNtnForMerchantViaWtsApp: false,
            paymentCancelNtnForMerchantViaEmail: false,
            PCNotifyPayerViaSMS: false,
            PCNotifyPayerViaWtsApp: false,
            PCNotifyPayerViaEmail: false,

            paymentConfirmNtnForMerchantViaSMS: false,
            paymentConfirmNtnForMerchantViaWtsApp: false,
            PaymentConfirmNotifyFMViaEmail: false,
            pmtConfirmForNotifyPayerViaSMS: false,
            pmtConfirmForNotifyPayerViaWtsApp: false,
            pmtConfirmForNotifyPayerViaEmail: false,

            notifyMerChantPmtExpiryViaSMS: false,
            notifyMerChantPmtExpiryViaWtsApp: false,
            notifyMerChantPmtExpiryViaEmail: false,
            PmtExpiryNotifyPayerViaSMS: false,
            PmtExpiryNotifyPayerViaWtsApp: false,
            PmtExpiryNotifyPayerViaEmail: false,

            pmtRefundNtnForMerchantViaSMS: false,
            pmtRefundNtnForMerchantViaWtsApp: false,
            pmtRefundNtnForMerchantViaEmail: false,
            pmtRefundNotifyPayerViaSMS: false,
            pmtRefundNotifyPayerViaWtsAp: false,
            pmtRefundNotifyPayerViaEmail: false,

            stlmntReportNtnForMerchantViaSMS: false,
            stlmntReportNtnForMerchantViaWtsApp: false,
            stlmntReportNtnForMerchantViaEmail: false,
            sltmneReportNotifyPayerViaSMS: false,
            sltmneReportNotifyPayerViaWtsApp: false,
            sltmneReportNotifyPayerViaEmail: false,

            pmtReminderNotifyPayerViaSMS: false,
            pmtReminderNotifyPayerViaWtsApp: false,
            pmtReminderNotifyPayerViaEmail: false,

            invoiceNotifyPayerViaSMS: false,
            invoiceNotifyPayerWtsApp: false,
            invoiceNotifyPayerViaEmail: false,

            openBDdeletepopup: false,
            deleteND: '',
        }
    }

    /**
     * Common method for all the Check box onClick event
     * @param {*} e event
     * @param {*} name Input field name
     */
    handleCheckBoxClickEvent = (e, name) => {
        var elementValue = e.target.checked;

        //start-Payment link notification
        if (name == 'paymentLinkNtnFMInSMS') {
            this.setState({ paymentLinkNtnForMerchantViaSMS: elementValue });
            if (!elementValue) {
                this.state.formFields.mobileNoForMerPLSMSNtn.value = '';
                this.state.formFields.mobileNoForMerPLSMSNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'paymentLinkNtnFMInWtsApp') {
            this.setState({ paymentLinkNtnForMerchantViaWtsApp: elementValue });
            if (!elementValue) {
                this.state.formFields.mobileNoForMerPLWtsAppNtn.value = '';
                this.state.formFields.mobileNoForMerPLWtsAppNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'paymentLinkNtnFMInEmail') {
            this.setState({ paymentLinkNtnForMerchantViaEmail: elementValue });
            if (!elementValue) {
                this.state.formFields.emailIdForMerPLNtn.value = '';
                this.state.formFields.emailIdForMerPLNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'PLNotifyPayerViaSMS') {
            this.setState({ PLNotifyPayerViaSMS: elementValue })
        }

        if (name == 'PLNotifyPayerViaWtsApp') {
            this.setState({ PLNotifyPayerViaWtsApp: elementValue })
        }

        if (name == 'PLNotifyPayerViaEmail') {
            this.setState({ PLNotifyPayerViaEmail: elementValue })
        }
        //end-Payment link notification

        //start-Payment Cancellation Notification
        if (name == 'PCNotifyMerchantViaSMS') {
            this.setState({ paymentCancelNtnForMerchantViaSMS: elementValue });
            if (!elementValue) {
                this.state.formFields.mobileNoForMerPCSMSNtn.value = '';
                this.state.formFields.mobileNoForMerPCSMSNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'PCNotifyMerchantViaWhtsApp') {
            this.setState({ paymentCancelNtnForMerchantViaWtsApp: elementValue });
            if (!elementValue) {
                this.state.formFields.mobileNoForMerPCWtsAppNtn.value = '';
                this.state.formFields.mobileNoForMerPCWtsAppNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'paymentCancelNtnFMViaEmail') {
            this.setState({ paymentCancelNtnForMerchantViaEmail: elementValue });
            if (!elementValue) {
                this.state.formFields.emailIdForMerPCNtn.value = '';
                this.state.formFields.emailIdForMerPCNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'PCNotifyPayerViaSMS') {
            this.setState({ PCNotifyPayerViaSMS: elementValue })
        }

        if (name == 'PCNotifyPayerViaWtsApp') {
            this.setState({ PCNotifyPayerViaWtsApp: elementValue })
        }

        if (name == 'PCNotifyPayerViaEmail') {
            this.setState({ PCNotifyPayerViaEmail: elementValue })
        }
        //end-Payment Cancellation notification

        //start-Payment Confirmation Notification
        if (name == 'paymentConfirmNtnForMerchantViaSMS') {
            this.setState({ paymentConfirmNtnForMerchantViaSMS: elementValue });
            if (!elementValue) {
                this.state.formFields.paymentConfirmNtnFMViaSMS.value = '';
                this.state.formFields.paymentConfirmNtnFMViaSMS.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'paymentConfirmNtnForMerchantViaWtsApp') {
            this.setState({ paymentConfirmNtnForMerchantViaWtsApp: elementValue });
            if (!elementValue) {
                this.state.formFields.paymentConfirmNtnFMViaWtsApp.value = '';
                this.state.formFields.paymentConfirmNtnFMViaWtsApp.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'PaymentConfirmNotifyFMViaEmail') {
            this.setState({ PaymentConfirmNotifyFMViaEmail: elementValue });
            if (!elementValue) {
                this.state.formFields.emailIdForMerPmtConfirmNtn.value = '';
                this.state.formFields.emailIdForMerPmtConfirmNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'pmtConfirmForNotifyPayerViaSMS') {
            this.setState({ pmtConfirmForNotifyPayerViaSMS: elementValue })
        }

        if (name == 'pmtConfirmForNotifyPayerViaWtsApp') {
            this.setState({ pmtConfirmForNotifyPayerViaWtsApp: elementValue })
        }

        if (name == 'pmtConfirmForNotifyPayerViaEmail') {
            this.setState({ pmtConfirmForNotifyPayerViaEmail: elementValue })
        }
        //end-Payment Confirmation notification

        //start-Payment Expiry Notification
        if (name == 'notifyMerChantPmtExpiryViaSMS') {
            this.setState({ notifyMerChantPmtExpiryViaSMS: elementValue });
            if (!elementValue) {
                this.state.formFields.mobileNoForMerPmtExpirySMSNtn.value = '';
                this.state.formFields.mobileNoForMerPmtExpirySMSNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'notifyMerChantPmtExpiryViaWtsApp') {
            this.setState({ notifyMerChantPmtExpiryViaWtsApp: elementValue });
            if (!elementValue) {
                this.state.formFields.mobileNoForMerPmtExpiryWtsAppNtn.value = '';
                this.state.formFields.mobileNoForMerPmtExpiryWtsAppNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'notifyMerChantPmtExpiryViaEmail') {
            this.setState({ notifyMerChantPmtExpiryViaEmail: elementValue });
            if (!elementValue) {
                this.state.formFields.emailIdForMerPmtExpiryNtn.value = '';
                this.state.formFields.emailIdForMerPmtExpiryNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'PmtExpiryNotifyPayerViaSMS') {
            this.setState({ PmtExpiryNotifyPayerViaSMS: elementValue })
        }

        if (name == 'PmtExpiryNotifyPayerViaWtsApp') {
            this.setState({ PmtExpiryNotifyPayerViaWtsApp: elementValue })
        }

        if (name == 'PmtExpiryNotifyPayerViaEmail') {
            this.setState({ PmtExpiryNotifyPayerViaEmail: elementValue })
        }
        //end-Payment Expiry notification

        //start-Payment Refund Notification
        if (name == 'pmtRefundNtnForMerchantViaSMS') {
            this.setState({ pmtRefundNtnForMerchantViaSMS: elementValue });
            if (!elementValue) {
                this.state.formFields.mobileNoForMerPmtRefundSMSNtn.value = '';
                this.state.formFields.mobileNoForMerPmtRefundSMSNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'pmtRefundNtnForMerchantViaWtsApp') {
            this.setState({ pmtRefundNtnForMerchantViaWtsApp: elementValue });
            if (!elementValue) {
                this.state.formFields.mobileNoForMerPmtRefundWtsAppNtn.value = '';
                this.state.formFields.mobileNoForMerPmtRefundWtsAppNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'pmtRefundNtnForMerchantViaEmail') {
            this.setState({ pmtRefundNtnForMerchantViaEmail: elementValue });
            if (!elementValue) {
                this.state.formFields.emailIdForMerPmtRefundNtn.value = '';
                this.state.formFields.emailIdForMerPmtRefundNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'pmtRefundNotifyPayerViaSMS') {
            this.setState({ pmtRefundNotifyPayerViaSMS: elementValue })
        }

        if (name == 'pmtRefundNotifyPayerViaWtsApp') {
            this.setState({ pmtRefundNotifyPayerViaWtsApp: elementValue })
        }

        if (name == 'pmtRefundNotifyPayerViaEmail') {
            this.setState({ pmtRefundNotifyPayerViaEmail: elementValue })
        }
        //end-Payment Refund notification

        //start-Settlement report Notification
        if (name == 'stlmntReportNtnForMerchantViaSMS') {
            this.setState({ stlmntReportNtnForMerchantViaSMS: elementValue });
            if (!elementValue) {
                this.state.formFields.mobileNoForMerStlmntReportSMSNtn.value = '';
                this.state.formFields.mobileNoForMerStlmntReportSMSNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'stlmntReportNtnForMerchantViaWtsApp') {
            this.setState({ stlmntReportNtnForMerchantViaWtsApp: elementValue });
            if (!elementValue) {
                this.state.formFields.mobileNoForMerStlmntReportWtsAppNtn.value = '';
                this.state.formFields.mobileNoForMerStlmntReportWtsAppNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'stlmntReportNtnForMerchantViaEmail') {
            this.setState({ stlmntReportNtnForMerchantViaEmail: elementValue });
            if (!elementValue) {
                this.state.formFields.emailIdForMerSltmntReportNtn.value = '';
                this.state.formFields.emailIdForMerSltmntReportNtn.errors = '';

                this.updateFormFields(this.state.formFields);
            }
        }

        if (name == 'sltmneReportNotifyPayerViaSMS') {
            this.setState({ sltmneReportNotifyPayerViaSMS: elementValue })
        }

        if (name == 'sltmneReportNotifyPayerViaWtsApp') {
            this.setState({ sltmneReportNotifyPayerViaWtsApp: elementValue })
        }

        if (name == 'sltmneReportNotifyPayerViaEmail') {
            this.setState({ sltmneReportNotifyPayerViaEmail: elementValue })
        }
        //end-Settlement report Notification

        //start - Payment Reminder Notification
        if (name == 'pmtReminderNotifyPayerViaSMS') {
            this.setState({ pmtReminderNotifyPayerViaSMS: elementValue })
        }

        if (name == 'pmtReminderNotifyPayerViaWtsApp') {
            this.setState({ pmtReminderNotifyPayerViaWtsApp: elementValue })
        }

        if (name == 'pmtReminderNotifyPayerViaEmail') {
            this.setState({ pmtReminderNotifyPayerViaEmail: elementValue })
        }
        //end - Payment Reminder Notification

        //start - invoice Notification
        if (name == 'invoiceNotifyPayerViaSMS') {
            this.setState({ invoiceNotifyPayerViaSMS: elementValue })
        }

        if (name == 'invoiceNotifyPayerWtsApp') {
            this.setState({ invoiceNotifyPayerWtsApp: elementValue })
        }

        if (name == 'invoiceNotifyPayerViaEmail') {
            this.setState({ invoiceNotifyPayerViaEmail: elementValue })
        }
        //end - invoice Notification
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

    checkAllFieldsEmptyOrNot = (fieldNames) => {
        var value = false;
        const formFields = this.state.formFields;

        fieldNames.forEach(fieldName => {
            let fName = formFields[fieldName].value;

            if (fName !== "") {
                value = true;
            }
        });

        return value;
    }

    concatenateWithSpace = (value1, value2) => {
        if (value1 && value2) {
            return value1.concat(" ", value2);
        } else {
            return null;
        }
    };

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



    saveNotification = async () => {

        const formFields = this.state.formFields;
        var formValid = await this.validateForm();
        var sendRes = { saveNtn: false };

        var paymentLinkNotification = {
            viaSMS: this.state.PLNotifyPayerViaSMS,
            viaWhatsapp: this.state.PLNotifyPayerViaWtsApp,
            viaEmail: this.state.PLNotifyPayerViaEmail,
        };
        var paymentCancellationNotification = {
            viaSMS: this.state.PCNotifyPayerViaSMS,
            viaWhatsapp: this.state.PCNotifyPayerViaWtsApp,
            viaEmail: this.state.PCNotifyPayerViaEmail,
        };
        var paymentConfirmantionNotification = {
            viaSMS: this.state.pmtConfirmForNotifyPayerViaSMS,
            viaWhatsapp: this.state.pmtConfirmForNotifyPayerViaWtsApp,
            viaEmail: this.state.pmtConfirmForNotifyPayerViaEmail,
        };
        var paymentExpiryNotification = {
            viaSMS: this.state.PmtExpiryNotifyPayerViaSMS,
            viaWhatsapp: this.state.PmtExpiryNotifyPayerViaWtsApp,
            viaEmail: this.state.PmtExpiryNotifyPayerViaEmail,
        };
        var paymentRefundNotification = {
            viaSMS: this.state.pmtRefundNotifyPayerViaSMS,
            viaWhatsapp: this.state.pmtRefundNotifyPayerViaWtsAp,
            viaEmail: this.state.pmtReminderNotifyPayerViaEmail,
        };
        var settlementReportNotification = {
            viaSMS: this.state.sltmneReportNotifyPayerViaSMS,
            viaWhatsapp: this.state.sltmneReportNotifyPayerViaWtsApp,
            viaEmail: this.state.sltmneReportNotifyPayerViaEmail,
        };
        var settlementReportNotification = {
            viaSMS: this.state.sltmneReportNotifyPayerViaSMS,
            viaWhatsapp: this.state.sltmneReportNotifyPayerViaWtsApp,
            viaEmail: this.state.sltmneReportNotifyPayerViaEmail,
        };
        var paymentReminderNotification = {
            viaSMS: this.state.pmtReminderNotifyPayerViaSMS,
            viaWhatsapp: this.state.pmtReminderNotifyPayerViaWtsApp,
            viaEmail: this.state.pmtReminderNotifyPayerViaEmail,
        };
        var invoiceNotification = {
            viaSMS: this.state.invoiceNotifyPayerViaSMS,
            viaWhatsapp: this.state.invoiceNotifyPayerWtsApp,
            viaEmail: this.state.invoiceNotifyPayerViaEmail,
        };


        var requestObj = {
            paymentLinkNotification: {
                notificationSmsPhone: Utils.formatPhoneNumber.call(this, formFields.mobileNoForMerPLSMSNtn.value, this.state.formFields.mobileNoCtryCodeFormobileNoForMerPLSMSNtn.value),
                notificationSmsCtryCode: this.setNullIfEmpty(formFields.mobileNoCtryCodeFormobileNoForMerPLSMSNtn.value),
                notificationWtsapPhone: Utils.formatPhoneNumber.call(this, formFields.mobileNoForMerPLWtsAppNtn.value, this.state.formFields.ctryCodeFormobileNoForMerPLWtsAppNtn.value),
                notificationWtsapCtryCode: this.setNullIfEmpty(formFields.ctryCodeFormobileNoForMerPLWtsAppNtn.value),
                email: this.setNullIfEmpty(formFields.emailIdForMerPLNtn.value),
                notifyPayer: this.formatAction(paymentLinkNotification),
            },


            paymentCancellactionNotification: {
                notificationSmsPhone: Utils.formatPhoneNumber.call(this, formFields.mobileNoForMerPCSMSNtn.value, this.state.formFields.ctryCodeFormobileNoForMerPCSMSNtn.value),
                notificationSmsCtryCode: this.setNullIfEmpty(formFields.ctryCodeFormobileNoForMerPCSMSNtn.value),
                notificationWtsapPhone: Utils.formatPhoneNumber.call(this, formFields.mobileNoForMerPCWtsAppNtn.value, this.state.formFields.ctryCodeFormobileNoForMerPCWtsAppNtn.value),
                notificationWtsapCtryCode: this.setNullIfEmpty(formFields.ctryCodeFormobileNoForMerPCWtsAppNtn.value),
                email: this.setNullIfEmpty(formFields.emailIdForMerPCNtn.value),
                notifyPayer: this.formatAction(paymentCancellationNotification),
            },

            paymentConfirmantionNotification: {
                notificationSmsPhone: Utils.formatPhoneNumber.call(this, formFields.paymentConfirmNtnFMViaSMS.value, this.state.formFields.ctryCodeForPaymentConfirmNtnFMViaSMS.value),
                notificationSmsCtryCode: this.setNullIfEmpty(formFields.ctryCodeForPaymentConfirmNtnFMViaSMS.value),
                notificationWtsapPhone: Utils.formatPhoneNumber.call(this, formFields.paymentConfirmNtnFMViaWtsApp.value, this.state.formFields.ctryCodeForPaymentConfirmNtnFMViaWtsApp.value),
                notificationWtsapCtryCode: this.setNullIfEmpty(formFields.ctryCodeForPaymentConfirmNtnFMViaWtsApp.value),
                email: this.setNullIfEmpty(formFields.emailIdForMerPmtConfirmNtn.value),
                notifyPayer: this.formatAction(paymentConfirmantionNotification),
            },

            paymentExpiryNotification: {
                notificationSmsPhone: Utils.formatPhoneNumber.call(this, formFields.mobileNoForMerPmtExpirySMSNtn.value, this.state.formFields.ctryCodeForPmtExpirySMSNtn.value),
                notificationSmsCtryCode: this.setNullIfEmpty(formFields.ctryCodeForPmtExpirySMSNtn.value),
                notificationWtsapPhone: Utils.formatPhoneNumber.call(this, formFields.mobileNoForMerPmtExpiryWtsAppNtn.value, this.state.formFields.ctryCodeForPmtExpiryWtsAppNtn.value),
                notificationWtsapCtryCode: this.setNullIfEmpty(formFields.ctryCodeForPmtExpiryWtsAppNtn.value),
                email: this.setNullIfEmpty(formFields.emailIdForMerPmtExpiryNtn.value),
                notifyPayer: this.formatAction(paymentExpiryNotification),
            },

            paymentRefundNotification: {
                notificationSmsPhone: Utils.formatPhoneNumber.call(this, formFields.mobileNoForMerPmtRefundSMSNtn.value, this.state.formFields.ctryCodeForPmtRefundSMSNtn.value),
                notificationSmsCtryCode: this.setNullIfEmpty(formFields.ctryCodeForPmtRefundSMSNtn.value),
                notificationWtsapPhone: Utils.formatPhoneNumber.call(this, formFields.mobileNoForMerPmtRefundWtsAppNtn.value, this.state.formFields.ctryCodeForPmtRefundWtsAppNtn.value),
                notificationWtsapCtryCode: this.setNullIfEmpty(formFields.ctryCodeForPmtRefundWtsAppNtn.value),
                email: this.setNullIfEmpty(formFields.emailIdForMerPmtRefundNtn.value),
                notifyPayer: this.formatAction(paymentRefundNotification),
            },

            settlementReportNotification: {
                notificationSmsPhone: Utils.formatPhoneNumber.call(this, formFields.mobileNoForMerStlmntReportSMSNtn.value, this.state.formFields.ctryCodeForStlmntReportSMSNtn.value),
                notificationSmsCtryCode: this.setNullIfEmpty(formFields.ctryCodeForStlmntReportSMSNtn.value),
                notificationWtsapPhone: Utils.formatPhoneNumber.call(this, formFields.mobileNoForMerStlmntReportWtsAppNtn.value, this.state.formFields.ctryCodeForStlmntReportWtsAppNtn.value),
                notificationWtsapCtryCode: this.setNullIfEmpty(formFields.ctryCodeForStlmntReportWtsAppNtn.value),
                email: this.setNullIfEmpty(formFields.emailIdForMerSltmntReportNtn.value),
                notifyPayer: this.formatAction(settlementReportNotification),

            },

            paymentReminderNotification: {
                notificationSmsPhone: null,
                notificationSmsCtryCode: null,
                notificationWtsapPhone: null,
                notificationWtsapCtryCode: null,
                email: null,
                notifyPayer: this.formatAction(paymentReminderNotification),

            },

            invoiceNotification: {
                notificationSmsPhone: null,
                notificationSmsCtryCode: null,
                notificationWtsapPhone: null,
                notificationWtsapCtryCode: null,
                email: null,
                notifyPayer: this.formatAction(invoiceNotification),

            }
        }

        if (this.state.paymentLinkNtnForMerchantViaSMS || this.state.paymentLinkNtnForMerchantViaWtsApp || this.state.paymentLinkNtnForMerchantViaEmail ||
            this.state.paymentCancelNtnForMerchantViaSMS || this.state.paymentCancelNtnForMerchantViaWtsApp || this.state.paymentCancelNtnForMerchantViaEmail ||
            this.state.paymentConfirmNtnForMerchantViaSMS || this.state.paymentConfirmNtnForMerchantViaWtsApp || this.state.PaymentConfirmNotifyFMViaEmail ||
            this.state.notifyMerChantPmtExpiryViaSMS || this.state.notifyMerChantPmtExpiryViaWtsApp || this.state.notifyMerChantPmtExpiryViaEmail ||
            this.state.pmtRefundNtnForMerchantViaSMS || this.state.pmtRefundNtnForMerchantViaWtsAp || this.state.pmtRefundNtnForMerchantVia ||
            this.state.stlmntReportNtnForMerchantViaSMS || this.state.stlmntReportNtnForMerchantViaWtsApp || this.state.stlmntReportNtnForMerchantViaEmail) {

            if (formValid) {
                this.setState({ loading: true });

                var dataSaved = false;
                for (const [key, request] of Object.entries(requestObj)) {
                    request.notificationType = key;
                    request.merchantId = this.props.merchantId;

                    const res = await DashboardService.saveMerchantNotifications(request);

                    dataSaved = true;
                }

                if (dataSaved) {
                    this.setState({ save: this.SAVE_DONE, loading: false });

                    sendRes.saveNtn = true;
                    this.props.notificationSaveResponse(sendRes);
                } else {
                    this.setState({ loading: false });
                    this.props.notificationSaveResponse(sendRes);
                }

            } else {
                this.setState({ save: '' })
            }
        }
        else {
            let valueIsExists = this.checkAllFieldsEmptyOrNot(this.fieldNames);

            if (valueIsExists) {
                // const res = DashboardService.saveMerchantNotifications(requestObj);
                const res = undefined;

                if (res && res !== undefined) {
                    this.setState({ save: this.DONE, loading: false });

                    sendRes.saveNtn = true;
                    this.props.notificationSaveResponse(sendRes);
                } else {
                    this.setState({ loading: false });
                    this.props.notificationSaveResponse(sendRes);
                }
            } else {
                sendRes.saveNtn = 'changeTab';
                this.props.notificationSaveResponse(sendRes);
            }
        }
    }

    splitStringIntoLetters = (notificationType, inputString) => {
        var letters = inputString.split('');

        if (notificationType == "paymentLinkNotification") {

            if (letters[0] == "1") {
                this.state.PLNotifyPayerViaSMS = true;
            } else {
                this.state.PLNotifyPayerViaSMS = false;
            }

            if (letters[1] == "1") {
                this.state.PLNotifyPayerViaWtsApp = true;
            } else {
                this.state.PLNotifyPayerViaWtsApp = false;
            }

            if (letters[2] == "1") {
                this.state.PLNotifyPayerViaEmail = true;
            } else {
                this.state.PLNotifyPayerViaEmail = false;
            }
        }

        if (notificationType == "paymentCancellactionNotification") {

            if (letters[0] == "1") {
                this.state.PCNotifyPayerViaSMS = true;
            } else {
                this.state.PCNotifyPayerViaSMS = false;
            }

            if (letters[1] == "1") {
                this.state.PCNotifyPayerViaWtsApp = true;
            } else {
                this.state.PCNotifyPayerViaWtsApp = false;
            }

            if (letters[2] == "1") {
                this.state.PCNotifyPayerViaEmail = true;
            } else {
                this.state.PCNotifyPayerViaEmail = false;
            }
        }

        if (notificationType == "paymentConfirmantionNotification") {

            if (letters[0] == "1") {
                this.state.pmtConfirmForNotifyPayerViaSMS = true;
            } else {
                this.state.pmtConfirmForNotifyPayerViaSMS = false;
            }

            if (letters[1] == "1") {
                this.state.pmtConfirmForNotifyPayerViaWtsApp = true;
            } else {
                this.state.pmtConfirmForNotifyPayerViaWtsApp = false;
            }

            if (letters[2] == "1") {
                this.state.pmtConfirmForNotifyPayerViaEmail = true;
            } else {
                this.state.pmtConfirmForNotifyPayerViaEmail = false;
            }
        }

        if (notificationType == "paymentExpiryNotification") {

            if (letters[0] == "1") {
                this.state.PmtExpiryNotifyPayerViaSMS = true;
            } else {
                this.state.PmtExpiryNotifyPayerViaSMS = false;
            }

            if (letters[1] == "1") {
                this.state.PmtExpiryNotifyPayerViaWtsApp = true;
            } else {
                this.state.PmtExpiryNotifyPayerViaWtsApp = false;
            }

            if (letters[2] == "1") {
                this.state.PmtExpiryNotifyPayerViaEmail = true;
            } else {
                this.state.PmtExpiryNotifyPayerViaEmail = false;
            }
        }

        if (notificationType == "paymentRefundNotification") {

            if (letters[0] == "1") {
                this.state.pmtRefundNotifyPayerViaSMS = true;
            } else {
                this.state.pmtRefundNotifyPayerViaSMS = false;
            }

            if (letters[1] == "1") {
                this.state.pmtRefundNotifyPayerViaWtsApp = true;
            } else {
                this.state.pmtRefundNotifyPayerViaWtsApp = false;
            }

            if (letters[2] == "1") {
                this.state.pmtRefundNotifyPayerViaEmail = true;
            } else {
                this.state.pmtRefundNotifyPayerViaEmail = false;
            }
        }

        if (notificationType == "settlementReportNotification") {

            if (letters[0] == "1") {
                this.state.sltmneReportNotifyPayerViaSMS = true;
            } else {
                this.state.sltmneReportNotifyPayerViaSMS = false;
            }

            if (letters[1] == "1") {
                this.state.sltmneReportNotifyPayerViaWtsApp = true;
            } else {
                this.state.sltmneReportNotifyPayerViaWtsApp = false;
            }

            if (letters[2] == "1") {
                this.state.sltmneReportNotifyPayerViaEmail = true;
            } else {
                this.state.sltmneReportNotifyPayerViaEmail = false;
            }
        }

        if (notificationType == "paymentReminderNotification") {

            if (letters[0] == "1") {
                this.state.pmtReminderNotifyPayerViaSMS = true;
            } else {
                this.state.pmtReminderNotifyPayerViaSMS = false;
            }

            if (letters[1] == "1") {
                this.state.pmtReminderNotifyPayerViaWtsApp = true;
            } else {
                this.state.pmtReminderNotifyPayerViaWtsApp = false;
            }

            if (letters[2] == "1") {
                this.state.pmtReminderNotifyPayerViaEmail = true;
            } else {
                this.state.pmtReminderNotifyPayerViaEmail = false;
            }
        }

        if (notificationType == "invoiceNotification") {

            if (letters[0] == "1") {
                this.state.invoiceNotifyPayerViaSMS = true;
            } else {
                this.state.invoiceNotifyPayerViaSMS = false;
            }

            if (letters[1] == "1") {
                this.state.invoiceNotifyPayerWtsApp = true;
            } else {
                this.state.invoiceNotifyPayerWtsApp = false;
            }

            if (letters[2] == "1") {
                this.state.invoiceNotifyPayerViaEmail = true;
            } else {
                this.state.invoiceNotifyPayerViaEmail = false;
            }
        }
    }


    fetchNotification = async () => {
        let merchantId = this.props.merchantId;
        // let merchantId = 'R002';

        if (merchantId) {
            this.setState({ loading: true });

            const reqObj = { merchantId: merchantId }

            const res = await DashboardService.fetchNotifications(reqObj);

            if (res && res.notifications.length > 0) {
                res.notifications.forEach((v, i) => {
                    if (v.notificationType == "paymentLinkNotification") {
                        this.state.formFields.mobileNoCtryCodeFormobileNoForMerPLSMSNtn.value = v.notificationSmsCtryCode
                        this.state.formFields.mobileNoForMerPLSMSNtn.value = this.concatenateWithSpace(v.notificationSmsCtryCode, v.notificationSmsPhone);
                        v.notificationSmsPhone ? this.state.paymentLinkNtnForMerchantViaSMS = true : false;

                        this.state.formFields.ctryCodeFormobileNoForMerPLWtsAppNtn.value = v.notificationWtsapCtryCode
                        this.state.formFields.mobileNoForMerPLWtsAppNtn.value = this.concatenateWithSpace(v.notificationWtsapCtryCode, v.notificationWtsapPhone);
                        v.notificationWtsapCtryCode ? this.state.paymentLinkNtnForMerchantViaWtsApp = true : false

                        this.state.formFields.emailIdForMerPLNtn.value = v.email
                        v.email ? this.state.paymentLinkNtnForMerchantViaEmail = true : false

                        this.splitStringIntoLetters("paymentLinkNotification", v.notifyPayer);
                    }

                    if (v.notificationType == "paymentCancellactionNotification") {
                        this.state.formFields.ctryCodeFormobileNoForMerPCSMSNtn.value = v.notificationSmsCtryCode
                        this.state.formFields.mobileNoForMerPCSMSNtn.value = this.concatenateWithSpace(v.notificationSmsCtryCode, v.notificationSmsPhone)
                        v.notificationSmsPhone ? this.state.paymentCancelNtnForMerchantViaSMS = true : false

                        this.state.formFields.ctryCodeFormobileNoForMerPCWtsAppNtn.value = v.notificationWtsapCtryCode
                        this.state.formFields.mobileNoForMerPCWtsAppNtn.value = this.concatenateWithSpace(v.notificationWtsapCtryCode, v.notificationWtsapPhone,)
                        v.notificationWtsapCtryCode ? this.state.paymentCancelNtnForMerchantViaWtsApp = true : false

                        this.state.formFields.emailIdForMerPCNtn.value = v.email
                        v.email ? this.state.paymentCancelNtnForMerchantViaEmail = true : false

                        this.splitStringIntoLetters("paymentCancellactionNotification", v.notifyPayer);
                    }

                    if (v.notificationType == "paymentConfirmantionNotification") {
                        this.state.formFields.ctryCodeForPaymentConfirmNtnFMViaSMS.value = v.notificationSmsCtryCode
                        this.state.formFields.paymentConfirmNtnFMViaSMS.value = this.concatenateWithSpace(v.notificationSmsCtryCode, v.notificationSmsPhone)
                        v.notificationSmsPhone ? this.state.paymentConfirmNtnForMerchantViaSMS = true : false

                        this.state.formFields.ctryCodeForPaymentConfirmNtnFMViaWtsApp.value = v.notificationWtsapCtryCode
                        this.state.formFields.paymentConfirmNtnFMViaWtsApp.value = this.concatenateWithSpace(v.notificationWtsapCtryCode, v.notificationWtsapPhone)
                        v.notificationWtsapCtryCode ? this.state.paymentConfirmNtnForMerchantViaWtsApp = true : false

                        this.state.formFields.emailIdForMerPmtConfirmNtn.value = v.email
                        v.email ? this.state.PaymentConfirmNotifyFMViaEmail = true : false

                        this.splitStringIntoLetters("paymentConfirmantionNotification", v.notifyPayer);
                    }

                    if (v.notificationType == "paymentExpiryNotification") {
                        this.state.formFields.ctryCodeForPmtExpirySMSNtn.value = v.notificationSmsCtryCode
                        this.state.formFields.mobileNoForMerPmtExpirySMSNtn.value = this.concatenateWithSpace(v.notificationSmsCtryCode, v.notificationSmsPhone)
                        v.notificationSmsPhone ? this.state.notifyMerChantPmtExpiryViaSMS = true : false

                        this.state.formFields.ctryCodeForPmtExpiryWtsAppNtn.value = v.notificationWtsapCtryCode
                        this.state.formFields.mobileNoForMerPmtExpiryWtsAppNtn.value = this.concatenateWithSpace(v.notificationWtsapCtryCode, v.notificationWtsapPhone)
                        v.notificationWtsapCtryCode ? this.state.notifyMerChantPmtExpiryViaWtsApp = true : false

                        this.state.formFields.emailIdForMerPmtExpiryNtn.value = v.email
                        v.email ? this.state.notifyMerChantPmtExpiryViaEmail = true : false

                        this.splitStringIntoLetters("paymentExpiryNotification", v.notifyPayer);
                    }

                    if (v.notificationType == "paymentRefundNotification") {
                        this.state.formFields.ctryCodeForPmtRefundSMSNtn.value = v.notificationSmsCtryCode
                        this.state.formFields.mobileNoForMerPmtRefundSMSNtn.value = this.concatenateWithSpace(v.notificationSmsCtryCode, v.notificationSmsPhone)
                        v.notificationSmsPhone ? this.state.pmtRefundNtnForMerchantViaSMS = true : false

                        this.state.formFields.ctryCodeForPmtRefundWtsAppNtn.value = v.notificationWtsapCtryCode
                        this.state.formFields.mobileNoForMerPmtRefundWtsAppNtn.value = this.concatenateWithSpace(v.notificationWtsapCtryCode, v.notificationWtsapPhone)
                        v.notificationWtsapCtryCode ? this.state.pmtRefundNtnForMerchantViaWtsApp = true : false

                        this.state.formFields.emailIdForMerPmtRefundNtn.value = v.email
                        v.email ? this.state.pmtRefundNtnForMerchantViaEmail = true : false

                        this.splitStringIntoLetters("paymentRefundNotification", v.notifyPayer);
                    }

                    if (v.notificationType == "settlementReportNotification") {
                        this.state.formFields.ctryCodeForStlmntReportSMSNtn.value = v.notificationSmsCtryCode
                        this.state.formFields.mobileNoForMerStlmntReportSMSNtn.value = this.concatenateWithSpace(v.notificationSmsCtryCode, v.notificationSmsPhone)
                        v.notificationSmsPhone ? this.state.stlmntReportNtnForMerchantViaSMS = true : false

                        this.state.formFields.ctryCodeForStlmntReportWtsAppNtn.value = v.notificationWtsapCtryCode
                        this.state.formFields.mobileNoForMerStlmntReportWtsAppNtn.value = this.concatenateWithSpace(v.notificationWtsapCtryCode, v.notificationWtsapPhone)
                        v.notificationWtsapCtryCode ? this.state.stlmntReportNtnForMerchantViaWtsApp = true : false

                        this.state.formFields.emailIdForMerSltmntReportNtn.value = v.email
                        v.email ? this.state.stlmntReportNtnForMerchantViaEmail = true : false

                        this.splitStringIntoLetters("paymentRefundNotification", v.notifyPayer);
                    }

                    if (v.notificationType == "paymentReminderNotification") {
                        this.splitStringIntoLetters("paymentReminderNotification", v.notifyPayer);
                    }

                    if (v.notificationType == "invoiceNotification") {
                        this.splitStringIntoLetters("invoiceNotification", v.notifyPayer);
                    }

                });
            }

            this.updateFormFields(this.state.formFields);

            this.setState({ loading: false });
        }

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
        console.log("fValue", value);
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

    deleteND = async () => {

        if (this.state.merchantId) {
            const res = await DashboardService.deleteNotificationDetails(this.state.merchantId);

            if (res.message) {
                this.setState({ openBDdeletepopup: false }, () => {
                    toast.success(res.message);
                    this.fetchNotification();
                });
            }
        }
        else {
            this.setState({ openBDdeletepopup: false }, () => {
                toast.error("Unable to delete");
            });
        }
    }


    componentDidMount = () => {
        if (this.props.getNotificationPreValue) {
            this.setState({ getPreValue: this.INITIATED }, () => {
                //Give a parameter of tab index
                this.props.getPreValueCallback(3);
                this.fetchNotification();
            });
        }
    }


    //Please don't comment or remove any lines in the method
    //!Be careful if you make any change in the componentDidUpdate
    componentDidUpdate = () => {
        if (this.props.saveNtn) {
            this.setState({ save: this.INITIATED });
            //Give a parameter of tab index
            this.props.saveNtnCallback(3);
        }

        if (this.state.save === this.INITIATED) {
            this.setState({ save: this.INPROGRESS }, () => {
                // This callback is executed after the state is updated
                this.saveNotification();
            });
        }

        if (this.props.getNotificationPreValue) {
            this.setState({ getNtnPrevalue: this.INITIATED });
            //Give a parameter of tab index
            this.props.getPreValueCallback(3);
        }

        if (this.state.getNtnPrevalue === this.INITIATED) {
            this.setState({ getNtnPrevalue: this.INPROGRESS }, () => {
                // This callback is executed after the state is updated
                this.fetchNotification();
            });
        }
        if (this.props.deleteMerchantND) {
            this.setState({ deleteND: this.INITIATED, merchantId: this.props.merchantId });
            //Give a parameter of tab index
            this.props.nddeleteCallback(3);
        }

        if (this.state.deleteND === this.INITIATED) {
            this.setState({ deleteND: this.INPROGRESS, openBDdeletepopup: true });
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

            fields[fieldName] = {
                rules: rules[fieldName] || [],
                value: value,
                errors: []
            };
        });

        return fields;
    }

    /**
    * Method to refresh the form fields
    */
    resetForm = async () => {
        this.setState({
            formFields: this.prepareField(this.fieldNames, this.rules)
        })
    }

    clearNotificationValues = () => {
        this.resetForm();

        Object.keys(this.state).forEach((i) => {
            if (i.includes('ViaSMS') || i.includes('ViaEmail') || i.includes('ViaWtsApp')) {
                this.state[i] = false;
            }
        })

        this.setState({ ...this.state });
    }

    render = () => html.apply(this);
}

export default (Notification);
