import { urls, adminUrls } from "../../config/urlConfig";
import { HTTP } from "../core/http.service";

export class DashboardService {

    static getPaymentSearchResult = async (req) => {
        const result = await HTTP.post(urls.getPaymentSearchList, req);

        if (result && result.data) {
            return result.data;
        }
        return undefined;
    };


    static initiateRefund = async (req, transactionId) => {
        console.log("transactionId", transactionId)
        const result = await HTTP.post(urls.initiateRefund + `${transactionId}` + `/refund`, req);

        if (result && result.data) {
            return result.data;
        }
        return undefined;
    };


    static getRejectedPaymentSearchResult = async (req) => {
        const result = await HTTP.post(urls.getRejectedPaymentSearchList, req);

        if (result && result.data) {
            return result.data;
        }
        return undefined;
    };

    static getCurrencies = async () => {

        const result = await HTTP.get(urls.getCurrencies);

        if (result && result.data) {
            return result.data;
        }
        return undefined;
    };

    static downloadTransactionsReport = async (searchObj, requestType) => {
        const result = await HTTP.post(requestType === 'report' ? urls.export : urls.downlaodSettlement, searchObj);
        if (result && result.data) {
            return result.data;
        }
        return undefined;
    }

    static getAllFailedTransactions = async (request) => {
        const result = await HTTP.post(urls.searchFailedPayments, request);
        
        if (result && result.data) {
            return result.data;
        }
        return undefined;
    }

    static getUserInfo = async () => {
        const result = await HTTP.get(urls.userInfo);
        if (result && result.data) {
            return result.data;
        }
        return undefined;
    }

    static cancelPayment = async (request) => {
        const result = await HTTP.post(urls.cancelPayment, request);
        if (result && result.data) {
            return result.data;
        }
        return undefined;

    }

    static downloadFailedTransactionsReport = async (searchObj) => {
        const result = await HTTP.post(urls.downloadFailedTransactionsReport, searchObj);
        if (result && result.data) {
            return result.data;
        }
        return undefined;
    }

    static getSettlementReportResult = async (req) => {
        const result = await HTTP.post(urls.getSettlementReportResult, req)
        if (result && result.status == 200) {
            return result;
        }
        return undefined;
    }

    static sendPaymentReminder = async (transactionId) => {
        let url = `${urls.sendPaymentReminder}/${transactionId}`;
        const result = await HTTP.get(url)
        if (result && result.status == 200) {
            return result;
        }
        return undefined;
    }

    static downloadSettlementReport = async (fileId) => {
        const url = `${urls.downloadSettlementReport}/${fileId}`
        const result = await HTTP.get(url)
        if (result && result.status == 200) {
            return result;
        }
        return undefined;
    }

    static getRefundDetails = async (transactionId) => {
        const result = await HTTP.get(urls.getRefundDetails + `${transactionId}`)
        
        return result;
    }

    static getPaymentDetails = async (paymentId) => {
        const result = await HTTP.get(urls.paymentDetails + `${paymentId}`);

        if (result && result.data) {
            return result.data;
        }

        return undefined;
    }

    static getMerchantSummaryList = async () => {
        const result = await HTTP.get(adminUrls.getMerchants);

        if (result && result.data) {
            return result.data;
        }
        return undefined;
    }
  
    static getUserDetails = async () => {
        const result = await HTTP.get(urls.getUserDetails);
        
        if (result.data) {
            return result.data;
            
        }
        return undefined;
    }

    static getMerchantType = async () => {
        const result = await HTTP.get(adminUrls.getMerchantTypes);

        if (result.data) {
            return result.data;
        }

        return undefined;
    }

    static getMerchantMessages = async () => {
        const result = await HTTP.get(urls.fetchMerchantBroadcast);
        
        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static getMerchantIndustrys = async () => {
        const result = await HTTP.get(adminUrls.getMerchantIndustry);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static getMerchantCountrys = async () => {
        const result = await HTTP.get(adminUrls.getMerchantCountrys);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static getNamePrefix = async () => {
        const result = await HTTP.get(adminUrls.getNamePrefix);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static getProviderCardTypes = async () => {
        const result = await HTTP.get(adminUrls.getProviderCardTypes);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static getOnboardingStatus = async () => {
        const result = await HTTP.get(adminUrls.getOnboardingStatus);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static saveMerchantBasicDetails = async (req) => {
        const result = await HTTP.post(adminUrls.saveMerchantBasicDetails, req);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static saveMerchantLogo = async (req) => {
        const result = await HTTP.post(adminUrls.saveMerchantLogo, req);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static saveMerchantServicepref = async (req) => {
        const result = await HTTP.post(adminUrls.saveMerchantServicepref, req);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static saveMerchantNotifications = async (req) => {
        const result = await HTTP.post(adminUrls.saveMerchantNotification, req);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static saveMerchantOnboarding = async (req) => {
        const result = await HTTP.post(adminUrls.saveMerchantOnboarding, req);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static fetchMerchantBasicDetails = async (req) => {
        const result = await HTTP.post(adminUrls.fetchMerchantBasicDetails, req);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static fetchMerchantOnboardPrefe = async (req) => {
        const result = await HTTP.post(adminUrls.fetchOnboardPreferences, req);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static fetchNotifications = async (req) => {
        const result = await HTTP.post(adminUrls.fetchNotifications, req);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static fetchMerchantOnboarding = async (req) => {
        const result = await HTTP.post(adminUrls.fetchMerchantOnboarding, req);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static validateMerchantId = async (req) => {
        const result = await HTTP.post(adminUrls.validateMerchantId, req);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static deleteMerchantBasicDetails = async (merchantId) => {

        const result = await HTTP.post(`${adminUrls.deleteBasicDetails}/${merchantId}`);

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static deleteOnboardPreference = async (merchantId) => {

        const result = await HTTP.post(`${adminUrls.deleteOnboardPreference}/${merchantId}`)

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static deleteNotificationDetails = async (merchantId) => {

        const result = await HTTP.post(`${adminUrls.deleteNotificationDetails}/${merchantId}`)

        if (result.data) {
            return result.data;
        }
        return undefined;
    }
    static deleteOnboardTabDetails = async (merchantId) => {

        const result = await HTTP.post(`${adminUrls.deleteOnboardTabDetails}/${merchantId}`)

        if (result.data) {
            return result.data;
        }
        return undefined;
    }
    static activateMerchantDetails = async (merchantId) => {

        const result = await HTTP.post(`${adminUrls.activateMerchantDetails}/${merchantId}`)

        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static updateMerchantBroadcast = async (messageId) => {
        const result = await HTTP.post(urls.updateMerchantBroadcast + `${messageId}`)
        return undefined;
    }

    static getActivitySummary = async () => {
        const result = await HTTP.get(urls.getActivitySummary);

        if (result && result.data) {
            return result.data.activity;
        }
        return undefined;
    };
    
    static getAgeingSummary = async () => {
        const result = await HTTP.get(urls.getAgingSummary);

        if (result && result.data) {
            return result.data;
        }
        return undefined;
    };

    static getConversionSummary = async () => {
        const result = await HTTP.get(urls.getConversionSummary);

        if (result && result.data) {
            return result.data;
        }
        return undefined;
    };

    static getSettlement30days = async () => {
        const result = await HTTP.get(urls.getSettlement30days);

        if (result && result.data) {
            return result.data;
        }
        return undefined;
    };

    static getSettlement1year = async () => {
        const result = await HTTP.get(urls.getSettlement1year);

        if (result && result.data) {
            return result.data;
        }
        return undefined;
    };

    static getExpirySummary = async () => {
        const result = await HTTP.get(urls.getExpirySummary);

        if (result && result.data) {
            return result.data;
        }
        return undefined;
    };

    static getDemographySummary = async () => {
        const result = await HTTP.get(urls.getDemographySummary);

        if (result && result.data) {
            return result.data.demography;
        }
        return undefined;
    };

    static getMethodSummary = async () => {
        const result = await HTTP.get(urls.getMethodSummary);

        if (result && result.data) {
            return result.data.methods;
        }
        return undefined;
    };

}
