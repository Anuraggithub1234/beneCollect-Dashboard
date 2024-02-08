import { config } from './config'
import { Environment } from '../enum/common.enum'

const baseUrlDev = 'https://ki6f28zlli.execute-api.eu-west-2.amazonaws.com/dev'
const baseUrlProd = 'https://uat-api-collect-payment.benepay.io';

// const baseUrlProd = 'https://y1izdj44ki.execute-api.ap-south-1.amazonaws.com/test-prod';
// const baseUrlProd = 'https://collect-v2.api.benepay.io';

export const baseUrl = config.env === Environment.dev ? baseUrlDev : baseUrlProd;

// export const baseUrl = 'http://localhost:8080'

export const urls = {
    // to be added later
    getPaymentSearchList: '/v1/transactionSearchRequest',
    getRejectedPaymentSearchList: '/v1/unprocessedSearchRequest',
    getCurrencies: '/v1/supportedCurrency',
    initiateRefund: '/v1/transaction/',
    export: '/v1/export',
    downlaodSettlement: '/v1/settlement',
    uploadFile: '/v2/uploadpaymentfile',
    UploadedFilesList: '/v2/fileSummaryList',
    userInfo: '/v2/userOrgInfo',
    refundFile: '/v2/refundFile/upload',
    errorList: '/v2/errorSummaryList',
    paymentFileResponse: '/v2/download/paymentfileresponse',
    cancelPayment: '/v2/canclePayment',
    searchFailedPayments: '/v2/searchRequest/failedAttempts',
    downloadFailedTransactionsReport: '/v2/export/failed',
    getSettlementReportResult: '/v2/settlement/merchant/getReports',
    downloadSettlementReport: 'v2/settlement/merchant/download/file',
    paymentDetails: '/v1/paymentDetails/',
    sendPaymentReminder: 'v2/sendPaymentReminder',
    searchPayers : '/v2/searchPayers',
    payerRecentTransaction : '/v2/getPayerRecentTransaction',
    createPayment : '/v2/createPayment',
    currencyDecimals : '/v2/getCurrencyDecimals',
    merchantDetails : '/v2/getMerchantDetails',
    checkRequestorTransaction : '/v2/checkRequestorTxnId',
    getExpiryDate: '/v2/calculateExpiryDate',
    getRefundDetails: '/v2/transaction/refundDetails/',
    generateInvoice: '/v2/generateInvoice/',
    fetchMerchantBroadcast: '/v2/fetchMerchantBroadcast',
    updateMerchantBroadcast: '/v2/updateMerchantBroadcast/',
    getActivitySummary :'/v2/activitySummary',
    getAgingSummary : '/v2/aging',
    getConversionSummary : '/v2/conversions',
    getSettlement30days :'/v2/settlement-trend-last-30-days',
    getSettlement1year :'/v2/settlement-trend-last-year',
    getExpirySummary : '/v2/payments-nearing-expiry',
    getDemographySummary:'/v2/payer-demography',
    getMethodSummary : '/v2/payment-methods'
};

export const adminUrls = {
    uploadSettlementFile: 'v2/settlement/uploadAndProcessFile',
    getFromProvidedResult: 'v2/settlement/getUploadedFilesSummary',
    getGeneratedByBenepayResult: 'v2/settlement/getReports',
    downloadFromSettlementFile: 'v2/settlement/download/file',
    downloadGeneratedByBenepayFile: 'v2/settlement/download/file',
    getAllMerchants: '/v2/settlement/getMerchants',
    getAllProviders: '/v2/settlement/getProvidersList',
    getMerchants: '/v2/merchantSummaryList',

    validateMerchantId: 'v2/onboard/validateMerchantId',

    getMerchantTypes: 'v2/onboard/getMerchantTypes',
    getMerchantCountrys: 'v2/onboard/getCountryCodes',
    getNamePrefix: 'v2/onboard/getNamePrefix',
    getMerchantIndustry: 'v2/onboard/getMerchantIndustry',
    getProviderCardTypes: 'v2/onboard/getCardTypes',
    getOnboardingStatus: 'v2/onboard/getOnboardingStatus',

    fetchMerchantBasicDetails: 'v2/onboard/fetchMerchantBasicDetails',
    fetchOnboardPreferences: 'v2/onboard/fetchOnboardPreferences',
    fetchNotifications: 'v2/onboard/fetchNotifications',
    fetchMerchantOnboarding: 'v2/fetchonboarding',

    saveMerchantBasicDetails: 'v2/onboard/merchantDetails',
    saveMerchantLogo: 'v2/onboard/merchantLogo',
    saveMerchantServicepref: 'v2/onboard/preference',
    saveMerchantNotification: 'v2/onboard/saveNotification',
    saveMerchantOnboarding: 'v2/onboarding',

    deleteBasicDetails:'v2/update/basic/details',
    deleteOnboardPreference:'v2/update/preference/details',
    deleteNotificationDetails:'v2/update/notification/details',

    activateMerchantDetails:'v2/activate/merchant',
    deleteOnboardTabDetails:'v2/update/onboarding/details',
  
    getAllBroadcasts : '/v2/getBroadcastMessages',
    createBroadcast: '/v2/createBroadcast',
    updateBroadcast : '/v2/updateBroadcast/',
    deleteBroadcast: '/v2/deleteBroadcast/'
}
