import React, { Component } from 'react';
import { html } from "./home.v2.html";
import { DashboardService } from "../../service/api/dashboard.service";
// import { Auth } from '@aws-amplify/auth';
import { fetchAuthSession  } from   '@aws-amplify/auth'
import { StorageKeys, StorageService, TempStorage, USER_TYPE } from "../../service/core/storage.service";
import { addDays, endOfDay, startOfDay } from 'date-fns'
import moment from "moment";
import { toast } from 'react-toastify';
import { NaturePeopleOutlined } from '@material-ui/icons';
import { Pagination } from '../../config/constants';
import { DateFormat } from '../../enum/common.enum';
import { Chip, IconButton, Divider, Tooltip, Typography } from "@mui/material";
import { Cancel, Replay, Notifications } from '@mui/icons-material';
import dayjs from 'dayjs';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { PaymentService } from '../../service/api/payment.service';
import Utils from '../../service/core/utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faCheck, faMoneyBillTransfer, faXmark, faCalendarXmark, faHandHoldingDollar, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import StatusIconCreator from './support-components/StatusIconCreator.js';
import ActionBtn from './support-components/ActionBtn.js';


class Home extends Component {


    
    constructor(props) {
        super(props);

        this.state = {
            checkedStatuses: new Map(),
            selectedStatuses: [],
            teststatuscheck: [],
            // status: ["ALL", "AWAITING_PAYMENT", "PROCESSSING", "REJECTED_BY_PROVIDER", "PAID", "REFUNDED"],
            status: [],
            apply1Click: false,
            apply2Click: false,
            list1Style: '',
            section1show: false,
            currencyList: [],
            searchedPaymentResultList: [],
            serachedRejectedPaymentResultList: [],
            validationFailed: false,
            amountValidationError: false,
            totalPaymentsFound: 0,
            noResultFound: false,
            noRejectedResultFound: false,
            rejectedTableShow: false,
            showProcessedTable: false,
            showValidationMsg: false,
            showRefundConfirmationModal: false,
            showRefundSuccessModal: false,
            showFailureModal: false,
            refundAmount: 0,
            showModal: false,
            showConfirmationModal: false,
            refundAmount: '',
            refundCcy: '',
            selectedOption: 'Partial Refund',
            fullRefundAmt: '',
            fullRefundCcy: '',
            paymentSettlementModel: false,
            settlementDate: '',
            loading: false,
            refundLoading: false,
            parentTransactions: [],
            selectedItem: {},
            lastSelectedItem: {},
            currentIndex: 0,
            isRowVisible: false,
            showCancellationModal: false,
            showCancellationReason: false,
            cancellationReason: '',
            selectedTransactionId: '',
            isCancellationProcessing: false,
            failedAttemptStartDate: '',
            failedAttemptEndDate: '',
            benepayPaymentRef: '',
            collectionReference: '',
            fromAmount: '',
            toAmount: '',
            failedTransactions: undefined,
            isFailedTransactionsRequested: false,
            payerEmail: '',
            refundCount: 0,
            locale: 'ru',
            receiptEndDate: null,
            paymentStartDate: null,
            paymentEndDate: null,
            receiptStartDate: null,
            rejectedReceiptEndDate: null,
            rejectedReceiptStartDate: null,
            requestorTransactionId: '',
            payerName: null,
            collectionRef: '',
            coltype: '',
            order: 'desc',
            colvalue: '',
            apiUpdation: '',
            showCopiedMsg: false,
            copiedId: "",
            refundIndex: "",
            pageNo: Pagination.pageNo,
            pageNoForRedirect: null,
            pageSize: Pagination.pageSize,
            totalPages: Pagination.totalPages,
            totalFailedPages: Pagination.totalPages,
            initalPage: 0,
            rejectedFilePagination: false,
            initalPageFailed: 0,
            recentSortColumn: "",
            remainingAmt: 0,
            totalFailedCount: null,
            copyText: 'Copy Payment Link',
            showReminderModal: false,
            transactionIdForReminder: null,
            errorDesc: "",
            paymentAttempts: 0,
            paymentDetails: [],
            paymentDetailsOpen: false,
            paymentStatus: '',
            showCancellationSuccessModal: false,
            transactionDetailsModal: false,
            searchedBenePayTransactionId: null,
            searchedRequestorTransactionId: '',
            payerEmail: null,
            cancellationFromDate: null,
            cancellationToDate: null,
            requestedCcy: null,
            requestedMinAmount: null,
            requestedMaxAmount: null,
            paidCcy: null,
            paidMinAmount: null,
            paidMaxAmount: null,
            showAllRecords: true,
            totalFailedCount: null,
            copyText: 'Copy Payment Link',
            showReminderModal: false,
            transactionIdForReminder: null,
            errorDesc: "",
            paymentAttempts: 0,
            isDeviceMobile: false,
            failedTransactionsModal: false,
            faildTransactionMatched: false,
            selectedCollectionCurrency: '',
            transactionDetails: '',
            merchantsList: '',
            merchantId: null,
            selectedMerchant: null,
            mobileViewFilterModal: false,
            sortingType:null,
            sortingBy:null,
            isFirstTimeSearch: true,
            alreadyAppliedFilters: null,
            isAmountFilter: false,
            isDateFilter: false,
            transactionPaymenButtonRules: {
                disableViewPaymentDetails: true,
                disableViewFailedAttempts: true,
                disableViewRefundDetails: true,
                disableDuplicate: true,
                disableIssueRefund: true,
                disableCancelTransaction: true,
            },
            refundResponse: {
                refundDetails: [],
                refundReason: null,
                payerName: null,
                payerName: null,
                payerEmail: null,
                paymentMethod: null,
                refundType: null,
                traceId: null
            },
            columns: this.transactionSummaryColumns(),
        }
    }

    transactionSummaryColumns = () => {
        const cols = [
            {
                field: 'debtorName',
                headerName: 'Payer',
                width: 220,
                headerClassName: 'serachedPaymentResultListHeaderColor',
                cellClassName: 'table-cell-classname',
                flex: 1,
                minWidth: 180,
                renderCell: (params) => {
                    return (
                        <div
                            title={params.row.debtorName}
                            style={{ cursor: 'pointer', fontWeight: '400', textDecoration: 'none', color: '#1A1A1C' }}
                        >
                          <p style={{fontSize: '16px', margin: '0', padding: '0', marginBottom: '2px'}}>{params.row.debtorName}</p>
                          <p className="text-ellipsis" style={{fontSize: '14px', margin: '0', padding: '0'}}>{params.row.debtorEmailId}</p>  
                        </div>
                    );
                }
            },
            {
                field: 'transactionId',
                headerName: 'BenePay Transaction Id',
                width: 280,
                minWidth: 260,
                headerClassName: 'serachedPaymentResultListHeaderColor',
                cellClassName: 'table-cell-classname',
                flex: 1,
            },
            {
                field: 'finalDueAmountWithCurrency',
                headerName: 'Requested Amount',
                // width: 190,
                headerAlign: 'left',
                headerClassName: 'serachedPaymentResultListHeaderColor',
                cellClassName: 'table-cell-classname-amount',
                flex: 1,
                minWidth: 190,
            },
            {
                field: 'createTimeStamp',
                headerName: 'Create Timestamp',
                width: 240,
                align: 'left',
                headerAlign: 'left',
                headerClassName: 'serachedPaymentResultListHeaderColor',
                cellClassName: 'table-cell-classname',
                flex: 1,
                minWidth: 200,
                valueGetter:(params) => moment(params.value).format(DateFormat.dateTime)
            },
            {
                field: 'collectionReferenceNumber',
                headerName: 'Collection Ref',
                // width: 240,
                headerClassName: 'serachedPaymentResultListHeaderColor',
                cellClassName: 'table-cell-classname',
                flex: 1,
                minWidth: 155,
            },
            {
                field: 'requestorTransactionId',
                headerName: 'Requestor Transaction ID',
                // width: 240,
                headerClassName: 'serachedPaymentResultListHeaderColor',
                cellClassName: 'table-cell-classname',
                flex: 1,
                minWidth: 245,
            },
            {
                field: 'collectorsName',
                headerName: 'Merchant Name',
                width: 230,
                minWidth: 130,
                headerClassName: 'serachedPaymentResultListHeaderColor',
                cellClassName: 'table-cell-classname',
                flex: 1,
            },
            {
                field: 'refundCount',
                headerName: 'Refunds',
                align: 'left',
                headerAlign: 'left',
                headerClassName: 'serachedPaymentResultListHeaderColor',
                cellClassName: 'table-cell-classname',
                flex: 1,
                minWidth: 115,
                renderCell: (params) => {
                    const refundsCount = params.row.refundCount;

                    if (refundsCount > 0) {
                        return (
                            <a
                                title={refundsCount}
                                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', width: 'content-fit' }}
                                onClick={() => { this.handleRefundDetails(params) }}
                            >
                                {refundsCount}
                            </a>
                        );
                    } else {
                        return <p title={refundsCount}>{refundsCount}</p>; // Display the count as is when it's not greater than 0
                    }
                },
            },
            {
                field: 'status',
                headerName: 'Status',
                width: 220,
                align: 'left',
                headerAlign: 'left',
                headerClassName: 'serachedPaymentResultListHeaderColor',
                cellClassName: 'table-cell-classname',
                flex: 1,
                minWidth: 200,
                renderCell: (params) => {
                        return (
                            <StatusIconCreator status={params.value} />
                        );
                },
            },
            {
                headerName: '',
                width: 20,
                align: 'center',
                headerAlign: 'center',
                headerClassName: 'serachedPaymentResultListHeaderColor',
                cellClassName: 'table-cell-classname-actions',
                flex: 1,
                minWidth: 20,
                disableColumnMenu:true,
                sortable:false,
                border:0,
                renderCell: (params) => {
                    return (
                        <ActionBtn params={params} setSelectedItem={this.setSelectedItem} handleCopyClick={this.handleCopyClick} refundClick={this.refundClick} sendPaymentReminderBtn={this.sendPaymentReminderBtn}/>
                    );
                },
            },
        ];

        if (TempStorage.loginUserRole !== USER_TYPE.ADMIN_USER) {
            const withoutMerchantName = cols.filter((column) => column.field !== 'collectorsName');
            return withoutMerchantName;
        }

        return cols;
    }

    downloadFailedTransactionsCSV = async () => {
        this.setState({
            loading: true
        })
        const request = {}
        if (this.state.failedAttemptStartDate) {
            request.attemptStartDate = moment(this.state.failedAttemptStartDate).format('YYYY-MM-DD')
        }
        if (this.state.failedAttemptEndDate) {
            request.attemptEndDate = moment(this.state.failedAttemptEndDate).format('YYYY-MM-DD')
        }
        if (this.state.requestedCcy) {
            request.requestedCcy = this.state.requestedCcy
        }
        if (this.state.requestedMinAmount) {
            request.requestedMinAmount = +this.state.requestedMinAmount
        }
        if (this.state.requestedMaxAmount) {
            request.requestedMaxAmount = +this.state.requestedMaxAmount
        }
        if (this.state.payerEmail) {
            request.payerEmail = this.state.payerEmail
        }
        if (this.state.collectionReference) {
            request.collectionRef = this.state.collectionReference
        }
        if (this.state.benepayPaymentRef) {
            request.transactionId = this.state.benepayPaymentRef
        }

        const response = await DashboardService.downloadFailedTransactionsReport(request)
        if (!response) {
            return
        }
        this.setState({
            loading: false
        })
        var blob = this.base64toBlob(response.content, 'text/csv')
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveOrOpenBlob(blob, response.fileName + '.csv');
        }
        else {
            var a = window.document.createElement("a");
            a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
            a.download = response.fileName + '.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    sendReminder = async () => {
        this.setState({ loading: true });

        if (!this.state.transactionIdForReminder) {
            toast("Something went wrong, please try again later! ", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: "toast-message toast-error",
            });
            this.setState({ loading: false });
            return;
        }

        const response = await DashboardService.sendPaymentReminder(this.state.transactionIdForReminder);

        this.setState({ loading: false });
        toast("Reminder email sent successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
            className: "toast-message toast-success",
        });

    }


    sortingData = (coltype, apiUpdation) => {
        this.setState({
            coltype: coltype,
            recentSortColumn: coltype
        })


        // console.log("this is event : ", coltype, "and the updation will be in ", apiUpdation)
        let data = []
        if (apiUpdation === "Payment") {
            data = this.state.serachedPaymentResultList
            // console.log("data is set to payment")
        } else if (apiUpdation === "Failed") {
            data = this.state.failedTransactions
            // console.log("data is set to failed")
        } else {
            data = this.state.serachedRejectedPaymentResultList
            // console.log("data is set to rejected")
        }

        const sortedData = data.sort((a, b) => {
            let i = a[coltype]
            let j = b[coltype]

            if (i !== null && j !== null) {
                let c = i.toLowerCase()
                let d = j.toLowerCase()
                return c > d ? -1 : 1;
            }
            if (i === null) {
                return 1
            }
            if (j === null) {
                return -1
            }
        })

        if (this.state.order === 'ascn' && this.state.colvalue === coltype) {
            sortedData.reverse()
            this.setState({ order: 'desc' })
            // console.log("the data is in desc order")
        } else {
            this.setState({ order: 'ascn', colvalue: coltype })
            // console.log("the data is in ascn order")
        }

        // console.log("this is sorteed data : ", sortedData)

        if (this.state.apiUpdation === "Payment") {
            this.setState({
                serachedPaymentResultList: sortedData
            })
        } if (this.state.apiUpdation === "Failed") {
            this.setState({
                failedTransactions: sortedData
            })
        } else {
            this.setState({
                serachedRejectedPaymentResultList: sortedData
            })

        }

    }

    pageWiseSorting = (value) => {
        if (this.state.recentSortColumn !== null && this.state.recentSortColumn.trim() !== '') {
            if (this.state.order === 'ascn') {
                this.setState({ order: 'desc' })
            } else {
                this.setState({ order: "ascn" })
            }
            this.sortingData(this.state.recentSortColumn, value)

        }
    }


    setRowVisibility = async (item, index) => {
        if (this.state.selectedItem.transactionId === item.transactionId) {
            item.isRowVisible = !item.isRowVisible;
        } else {
            item.isRowVisible = true;
        }
        this.setState({ selectedItem: item, currentIndex: index });
    }

    onDateChange = (item) => {
        // console.log('item ', item);
        item[0] = moment(item[0]).format('DD-MMM-YYYY')
        item[1] = moment(item[1]).format('DD-MMM-YYYY')
        this.setState({ selectedDates: item })
    };

    copyRequestedId = (id, index) => {
        navigator.clipboard.writeText(id);
        // console.log("this is the copied item:", id);
        this.setState({ showCopiedMsg: true, refundIndex: index, copiedId: id }, () => {
            setTimeout(() => {
                this.setState({ showCopiedMsg: false });
            }, 500);
        });
    }


    //  outFunc =()=> {
    //     var tooltip = document.getElementById("myTooltip");
    //     tooltip.innerHTML = "Copy to clipboard";
    //   }


    handleChange = (value) => {
        this.setState({ dateRange: value });
    };

    handleApplyClickPaymentSettlement = async () => {

        this.setState({ initalPage: 0 });
        this.processedApply(1);

    }

    // Helper function to convert empty strings to null
    setNullIfEmpty(value) {
        return value === '' ? null : value;
    }

    processedApply = async (paramPageNo) => {
        this.setState({
            noResultFound: false,
            showProcessedTable: false,
            isAmountFilter: false,
            isDateFilter: false,
            loading: true
        });

        // Get the current date
        const currentDate = new Date();

        // Calculate the date 30 days ago
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(currentDate.getDate() - 29);

        // Format the dates as strings
        const currentDateStr = currentDate.toISOString().split('T')[0];
        const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

        var searchObj = {
            status: this.state.selectedStatuses,
            receiptStartDate: this.state.receiptStartDate,
            receiptEndDate: this.state.receiptEndDate,
            paymentStartDate: this.state.paymentStartDate,
            paymentEndDate: this.state.paymentEndDate,
            requestedCcy: this.state.requestedCcy || this.setNullIfEmpty(this.state.requestedCcy),
            requestedMinAmount: this.state.requestedMinAmount || this.setNullIfEmpty(this.state.requestedMinAmount),
            requestedMaxAmount: this.state.requestedMaxAmount || this.setNullIfEmpty(this.state.requestedMaxAmount),
            paymentMode: this.state.paymentMode || this.setNullIfEmpty(this.state.paymentMode),
            payerName: this.state.payerName || this.setNullIfEmpty(this.state.payerName),
            collectionRef: this.state.collectionRef,
            pageNo: paramPageNo,
            pageSize: this.state.pageSize,
            defaultSearch: false,
            transactionId: this.state.searchedBenePayTransactionId || this.setNullIfEmpty(this.state.searchedBenePayTransactionId),
            requestorTransactionId: this.state.searchedRequestorTransactionId || this.setNullIfEmpty(this.state.searchedRequestorTransactionId),
            payerEmail: this.state.payerEmail || this.setNullIfEmpty(this.state.payerEmail),
            cancellationFromDate: this.state.cancellationFromDate,
            cancellationToDate: this.state.cancellationToDate,
            paidCcy: this.state.paidCcy || this.setNullIfEmpty(this.state.paidCcy),
            paidMinAmount: this.state.paidMinAmount || this.setNullIfEmpty(this.state.paidMinAmount),
            paidMaxAmount: this.state.paidMaxAmount || this.setNullIfEmpty(this.state.paidMaxAmount),
            showAllRecords: this.state.showAllRecords,
            merchantId: null,
            sortingType: this.state.sortingType !== null ? this.state.sortingType.toUpperCase() : null,
            sortingBy: this.state.sortingBy
        };

        // console.log("PRINTING SUSH :",this.state.pageNo)
        if (this.state.receiptStartDate) {
            searchObj.receiptStartDate = moment(this.state.receiptStartDate).format('YYYY-MM-DD')
        }
        if (this.state.receiptEndDate) {
            searchObj.receiptEndDate = moment(this.state.receiptEndDate).format('YYYY-MM-DD')
        }
        if (this.state.paymentStartDate) {
            searchObj.paymentStartDate = moment(this.state.paymentStartDate).format('YYYY-MM-DD')
        }
        if (this.state.paymentEndDate) {
            searchObj.paymentEndDate = moment(this.state.paymentEndDate).format('YYYY-MM-DD')
        }
        if (this.state.cancellationFromDate) {
            searchObj.cancellationFromDate = moment(this.state.cancellationFromDate).format('YYYY-MM-DD')
        }
        if (this.state.cancellationToDate) {
            searchObj.cancellationToDate = moment(this.state.cancellationToDate).format('YYYY-MM-DD')
        }

        if (this.state.requestedMinAmount) {
            searchObj.requestedMinAmount = parseInt(this.state.requestedMinAmount)
        }
        if (this.state.requestedMaxAmount) {
            searchObj.requestedMaxAmount = parseInt(this.state.requestedMaxAmount)
        }
        if (this.state.paidMinAmount) {
            searchObj.paidMinAmount = parseInt(this.state.paidMinAmount)
        }
        if (this.state.paidMaxAmount) {
            searchObj.paidMaxAmount = parseInt(this.state.paidMaxAmount)
        }

        if (this.state.paidMinAmount) {
            searchObj.paidMinAmount = parseInt(this.state.paidMinAmount)
        }
        if (this.state.paidMaxAmount) {
            searchObj.paidMaxAmount = parseInt(this.state.paidMaxAmount)
        }
        if (!searchObj.status.length) {
            searchObj.status = null
        }

        var objFields = Object.keys(searchObj);
        var allFieldsBoolean = false;

        if (TempStorage.loginUserRole === USER_TYPE.ADMIN_USER) {

            if (!this.state.merchantId && !searchObj.transactionId && !searchObj.status && !searchObj.receiptStartDate && !searchObj.receiptEndDate && !searchObj.paymentStartDate && !searchObj.paymentEndDate && !searchObj.requestedCcy && !searchObj.requestedMinAmount &&
                !searchObj.requestedMaxAmount && !searchObj.paidCcy && !searchObj.paidMinAmount && !searchObj.paidMaxAmount && !searchObj.paymentMode && !searchObj.payerName && !searchObj.collectionRef &&
                !searchObj.requestorTransactionId && !searchObj.payerEmail && !searchObj.cancellationFromDate && !searchObj.cancellationToDate) {
                this.setState({ merchantId: 'All', selectedMerchant: 'All', receiptStartDate: thirtyDaysAgo, receiptEndDate: currentDate });
                searchObj.receiptStartDate = thirtyDaysAgoStr
                searchObj.receiptEndDate = currentDateStr
                // searchObj.allMerchant = true;
            }

            if (searchObj.transactionId || searchObj.status || searchObj.receiptStartDate || searchObj.receiptEndDate || searchObj.paymentStartDate ||
                searchObj.paymentEndDate || searchObj.requestedCcy || searchObj.requestedMinAmount || searchObj.requestedMaxAmount || searchObj.paidCcy ||
                searchObj.paidMinAmount || searchObj.paidMaxAmount || searchObj.paymentMode || searchObj.payerName || searchObj.collectionRef ||
                searchObj.requestorTransactionId || searchObj.payerEmail || searchObj.cancellationFromDate || searchObj.cancellationToDate) {

                if (!this.state.merchantId) {
                    this.setState({ merchantId: 'All', selectedMerchant: 'All' });
                }
            }

            if (this.state.merchantId == 'All') {
                searchObj.allMerchant = true;
            }

            if (this.state.merchantId !== 'All' && this.state.merchantId !== null) {
                searchObj.merchantId = this.state.merchantId
            }
        }

        // if (!searchObj.transactionId && !searchObj.status && !searchObj.receiptStartDate && !searchObj.receiptEndDate && !searchObj.paymentStartDate && !searchObj.paymentEndDate && !searchObj.requestedCcy && !searchObj.requestedMinAmount &&
        //     !searchObj.requestedMaxAmount && !searchObj.paidCcy && !searchObj.paidMinAmount && !searchObj.paidMaxAmount && !searchObj.paymentMode && !searchObj.payerName && !searchObj.collectionRef &&
        //     !searchObj.requestorTransactionId && !searchObj.payerEmail && !searchObj.cancellationFromDate && !searchObj.cancellationToDate) {
        //     // allFieldsBoolean = true;

        //     if (TempStorage.loginUserRole !== USER_TYPE.ADMIN_USER) {
        //         searchObj.status = ["PAID", "AWAITING_PAYMENT"]
        //         searchObj.receiptStartDate = thirtyDaysAgoStr
        //         searchObj.receiptEndDate = currentDateStr

        //         this.setState({
        //             status: [
        //                 { text: 'All', value: "ALL", isChecked: false },
        //                 { text: 'Awaiting Payment', value: "AWAITING_PAYMENT", isChecked: true },
        //                 { text: 'Paid', value: "PAID", isChecked: true },
        //                 { text: 'Refunded', value: "REFUNDED", isChecked: false },
        //                 { text: 'Cancelled', value: "CANCELLED", isChecked: false },
        //                 { text: 'Expired', value: "EXPIRED", isChecked: false },
        //                 { text: 'Settled', value: "SETTLED", isChecked: false }
        //             ],
        //             selectedStatuses: searchObj.status,
        //             receiptStartDate: thirtyDaysAgo,
        //             receiptEndDate: currentDate
        //         });
        //     }
        // }

        if (allFieldsBoolean) {
            searchObj = {
                pageNo: paramPageNo,
                pageSize: this.state.pageSize,
                // defaultSearch: true
            }
        }
        // else{
        //     searchObj.defaultSearch = false
        // }

        // if (!searchObj.transactionId && !searchObj.status && !searchObj.receiptStartDate && !searchObj.receiptEndDate && !searchObj.paymentStartDate && !searchObj.paymentEndDate && !searchObj.requestedCcy && !searchObj.requestedMinAmount &&
        //     !searchObj.requestedMaxAmount && !searchObj.paidCcy && !searchObj.paidMinAmount && !searchObj.paidMaxAmount && !searchObj.paymentMode && !searchObj.payerName && !searchObj.collectionRef &&
        //     !searchObj.requestorTransactionId && !searchObj.payerEmail && !searchObj.cancellationFromDate && !searchObj.cancellationToDate) {
        //         searchObj = {
        //             pageNo: paramPageNo,
        //             pageSize: this.state.pageSize,
        //             defaultSearch: true
        //         }
        //     }

        const response = await DashboardService.getPaymentSearchResult(searchObj)
        // console.log("Payment Search Result: ", response);

        // For already applied Filters --sushmit

        let statusIsVisible = this.state.selectedStatuses.length > 0;
        let amountIsVisible = ((searchObj.paidCcy !== null && searchObj.paidMinAmount !== null && searchObj.paidMaxAmount !== null) || (searchObj.requestedCcy !== null && searchObj.requestedMinAmount !== null && searchObj.requestedMaxAmount !== null));
        let dateIsVisible = ((searchObj.receiptStartDate !== null && searchObj.receiptEndDate !== null) ||
                            (searchObj.paymentStartDate !== null && searchObj.paymentEndDate !== null) ||
                            (searchObj.cancellationFromDate !== null && searchObj.cancellationToDate !== null));
        let basicIsVisible = ((this.state.searchedBenePayTransactionId !== null && this.state.searchedBenePayTransactionId.length > 0) ||
                            (this.state.searchedRequestorTransactionId !== null && this.state.searchedRequestorTransactionId.length > 0) ||
                            (this.state.payerEmail !== null && this.state.payerEmail.length > 0) ||
                            (this.state.payerName !== null && this.state.payerName.length > 0) ||
                            (this.state.collectionRef !== null && this.state.collectionRef.length > 0));

        let statusArray = [];
        this.state.selectedStatuses.forEach(element => {

            let val = element.toLowerCase();
            if(element === "AWAITING_PAYMENT"){
                statusArray.push({text: "Awaiting Payment", value: element})
            }else{
                statusArray.push({text: val.charAt(0).toUpperCase() + val.slice(1), value: element})
            }

        });

        let alreadyAppliedFilters = {
            basicFilters: {
                isVisible: basicIsVisible,
                data: [
                    {title: 'BenePay Transaction Id', onClick: () => {this.setState({searchedBenePayTransactionId: ''}); this.handlePageChange({selected: this.state.pageNo});}, value:this.state.searchedBenePayTransactionId},
                    {title: 'Requestor Transaction Id', onClick: () => {this.setState({searchedRequestorTransactionId: ''}); this.handlePageChange({selected: this.state.pageNo});}, value:this.state.searchedRequestorTransactionId},
                    {title: 'Payer Email', onClick: () => {this.setState({payerEmail: ''}); this.handlePageChange({selected: this.state.pageNo});}, value:this.state.payerEmail},
                    {title: 'Payer Name', onClick: () => {this.setState({payerName: ''}); this.handlePageChange({selected: this.state.pageNo});}, value:this.state.payerName},
                    {title: 'Collection Reference', onClick: () => {this.setState({collectionRef: ''}); this.handlePageChange({selected: this.state.pageNo});}, value:this.state.collectionRef},
                ]},
            statusFilters: {
                isVisible:statusIsVisible,
                data: statusArray
                },
            amountFilters: {
                isVisible: amountIsVisible,
                data: [
                {title: "Requested Amount",currency: searchObj.requestedCcy, min: searchObj.requestedMinAmount, max: searchObj.requestedMaxAmount},
                {title: "Paid Amount",currency: searchObj.paidCcy, min: searchObj.paidMinAmount, max: searchObj.paidMaxAmount}
                ]},
            dateFilters: {
                isVisible: dateIsVisible,
                data: [
                {title: "Create Date", startDate: searchObj.receiptStartDate, endDate: searchObj.receiptEndDate},
                {title: "Payment Date",startDate: searchObj.paymentStartDate, endDate :searchObj.paymentEndDate},
                {title: "Cancellation Date",startDate: searchObj.cancellationFromDate, endDate: searchObj.cancellationToDate}
            ]}
        };

        this.setState({
            alreadyAppliedFilters: alreadyAppliedFilters,
            isFirstTimeSearch: false
        })

        // For already applied Filters
        
        if(response == undefined){
            this.setState({
                loading: false
            });
            return;
        }

        if ((response && response["Error Code"]) || !response.paymentDetails) {
            toast("Something went wrong, please try again later!", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: "toast-message toast-error",
            });
            this.setState({
                loading: false
            });
            return;
        }

        if (response && response.errorMessage === null && response.paymentDetail && response.paymentDetail.length === 0) {
            this.setState({
                noResultFound: true,
                loading: false
            });

            return
        }

        let totalPages = (response.totalCount / this.state.pageSize);
        this.setState({
            totalPages: Math.ceil(totalPages)
        });
        // 
        response.paymentDetails.map(pd => {
            pd.isRowVisible = false;
        })

        this.setState({
            searchedPaymentResultList: response.paymentDetails,
            // totalPaymentsFound: response.paymentDetails.filter((pd) => pd.transactionType.toUpperCase() === 'PAYMENT' && pd.transactionStatus !== 'SUCCESS').length,
            totalPaymentsFound: response.totalCount,
            refundCount: response.paymentDetails.filter((pd) => pd.transactionType.toUpperCase() === 'REFUND').length,
            sortingBy:response.sortingBy ? response.sortingBy : null,
            sortingType:response.sortingType !== null ? response.sortingType.toLowerCase() : null,          
            loading: false
        })

        if(response.sortingBy == "collectionReferenceNo"){
            this.setState({
                sortingBy:"collectionReferenceNumber",
            })
        }

        // var paymentDetails = [{
        //     requestorTransactionId: '12345',
        //     paymentCurrency: 'INR',
        //     paymentAmount: 2000
        // }]

        const _response = response.paymentDetails
        for (let i = 0; i < _response.length; i++) {
            for (let j = 1; j < _response.length; j++) {
                if (_response[i].transactionType === 'PAYMENT' && _response[i].status !== 'AWAITING_PAYMENT' && _response[i].status !== 'PAID' && _response[i].status !== 'PARTIALLY_REFUNDED' && _response[i].status !== 'FULLY_REFUNDED' && _response[i].status !== 'REFUNDED' && _response[i].status !== 'SETTLED' && _response[i].transactionId === _response[j].transactionId) {
                    _response[i].parentTransactionId = _response[i].transactionId
                }
            }
        }


        this.setState({
            searchedPaymentResultList: _response
        })

        await this.setState({ parentTransactions: [...this.state.searchedPaymentResultList?.filter(sp => sp.transactionType.toUpperCase() === "PAYMENT")] })

        this.pageWiseSorting("Payment")

        this.setState({
            apply1Click: true,
            apply2Click: false,
            showProcessedTable: true
        })
    }

    removeAlreadyPresentBasicStatus = async (val) => {

        switch (val) {
            case "BenePay Transaction Id":
                await this.setState({searchedBenePayTransactionId: ''});
                break;
            case "Requestor Transaction Id":
                await this.setState({searchedRequestorTransactionId: ''});
                break;
            case "Payer Email":
                await this.setState({payerEmail: ''});
                break;
            case "Payer Name":
                await this.setState({payerName: ''});
                break;
            case "Collection Reference":
                await this.setState({collectionRef: ''});
                console.log("In", val, this.state.collectionRef);
                break;
            default:
                break;
        }

        this.handlePageChange({selected: this.state.pageNo});

    }

    rejectedClear = async () => {
        this.setState({
            rejectedReceiptStartDate: '',
            rejectedReceiptEndDate: ''
        });
    }

    clearFailedTransactionForm = () => {
        this.setState({ failedAttemptStartDate: '', failedAttemptEndDate: '', requestedCcy: '', instructedAmountCcy: '', fromAmount: '', toAmount: '', payerEmail: '', collectionReference: '', benepayPaymentRef: '', failedTransactions: null })
    }

    failedPaymentNavigationHandler = async () => {
        this.setState({ showProcessedTable: false, rejectedTableShow: false, apply1Click: false, apply2Click: false, rejectedFilePagination: false });
        this.clearFailedTransactionForm()
        this.clearProcessedDetails();
        this.rejectedClear()
    }

    applyFailedTransactionHandleClick = async () => {

        this.setState({ initalPageFailed: 0 });
        this.applyFailedTransactionHandler(1);

    }

    applyFailedTransactionHandler = async (paramPageNo) => {
        this.setState({ loading: true })
        const request = {}
        if (this.state.failedAttemptStartDate) {
            request.attemptStartDate = moment(this.state.failedAttemptStartDate).format('YYYY-MM-DD')
        }
        if (this.state.failedAttemptEndDate) {
            request.attemptEndDate = moment(this.state.failedAttemptEndDate).format('YYYY-MM-DD')
        }
        if (this.state.requestedCcy) {
            request.requestedCcy = this.state.requestedCcy
        }
        if (this.state.fromAmount) {
            request.requestedMinAmount = +this.state.fromAmount
        }
        if (this.state.toAmount) {
            request.requestedMaxAmount = +this.state.toAmount
        }
        if (this.state.payerEmail) {
            request.payerEmail = this.state.payerEmail
        }
        if (this.state.collectionReference) {
            request.collectionRef = this.state.collectionReference
        }
        if (this.state.benepayPaymentRef) {
            request.transactionId = this.state.benepayPaymentRef
        }
        if (this.state.pageNo) {
            request.pageNo = paramPageNo
        }
        if (this.state.pageSize) {
            request.pageSize = this.state.pageSize
        }
        this.getFailedTransactions(request)
    }

    submitCancellationRequest = async () => {
        this.setState({ loading: true })
        const request = {
            transactionId: this.state.selectedTransactionId,
            reason: this.state.cancellationReason
        }

        const response = await DashboardService.cancelPayment(request);
        this.setState({
            loading: false,
            showCancellationModal: false,
            showCancellationReason: false,
            paymentStatus: response.paymentStatus
        });
        if (!response) {
            return
        }
        // toast.success('Payment cancelled successfully!');

        /**
         * @author Ragavan
         * Use to showing a success message of the cancellation
         */
        if (this.state.paymentStatus === "CANCELLED") {
            this.setState({
                showCancellationModal: true,
                showCancellationSuccessModal: true,
                selectedStatus: "CANCELLED",
                selectedTransactionId: this.state.selectedTransactionId,
                selectedReasonForCharges: this.state.cancellationReason,
            })
        }

        this.processedApply(this.state.pageNo);
    }

    handleOnChange = e => {
        this.setState({ selectedOption: e.target.value });
        if (e.target.value === "Full Refund") {
            this.setState({
                refundAmount: this.state.fullRefundAmt,
                refundCcy: this.state.fullRefundCcy
            })
        } else {
            this.setState({
                refundAmount: '',
                refundCcy: this.state.fullRefundCcy
            })
        }
    }

    refundAmountCal = async (item) => {

        // let data = this.state.serachedPaymentResultList;
        // let initialAmount = item.finalDueAmount;
        // let amount = 0;
        // data.forEach(value => {
        //     if ((value.transactionId).includes(item.transactionId) && value.transactionType === "REFUND") {
        //         amount += parseFloat(value.finalDueAmount);
        //     }
        // });
        // amount = Math.round(amount * 100) / 100;
        // let formattedAmount = amount.toFixed(2);

        this.setState({
            remainingAmt: item.maxRefundAmount
        })
    }

    handleRefundAmountChange = (e) => {
        this.setState({ refundAmount: e.target.value });
    };

    handleRefundReason = (e) => {
        this.setState({ refundReason: e.target.value });
    };

    handleRefundCcyChange = (e) => {
        this.setState({ refundCcy: e.target.value });
    };

    refundClick = async (event, item) => {

        this.refundAmountCal(item)

        console.log("item", item)
        event.stopPropagation()
        if (item.status === 'PAID' || item.status === 'PARTIALLY_REFUNDED' || item.status === 'REFUNDED') {
            this.setState({
                transactionDetailsModal: false,
                paymentDetailsOpen: false,
                showRefundConfirmationModal: true,
                showModal: true,
                // refundAmount: item.paymentAmount,
                refundCcy: item.collectionCurrency,
                selectedOption: 'Partial Refund',
                fullRefundAmt: item.paymentAmount,
                fullRefundCcy: item.collectionCurrency,
                refundTransactionId: item.transactionId,
                paymentAttempts: item.paymentAttempts
            })
            return;
        }
        if (item.status.toUpperCase() === 'AWAITING_PAYMENT') {
            this.setState({
                transactionDetailsModal: false,
                showCancellationModal: true,
                selectedTransactionId: item.transactionId,
                selectedStatus: item.status,
                selectedFinalDueAmount: item.finalDueAmount,
                selectedReceiptTimestamp: item.receiptTimestamp,
                selectedDebtorName: item.debtorName,
                selectedDebtorEmailId: item.debtorEmailId,
                selectedCollectionRefNumber: item.collectionReferenceNumber,
                selectedReasonForCharges: item.reasonForCharges,
                selectedCollectionCurrency: item.collectionCurrency,
            });
        }

        if(item.status.toUpperCase() === ""){

        }
    }

    cancelRefund = async () => {
        this.setState({ refundReason: "", selectedOption: 'Partial Refund', refundAmount: '' })
        this.setState({
            showRefundSuccessModal: false,
            showRefundConfirmationModal: false,
            refundReason: "",
            selectedOption: 'F',
            refundAmount: "",
            showConfirmationModal: false,
            showModal: false

        })
    }

    cancelSettlement = async () => {
        this.setState({
            paymentSettlementModel: false,
            settlementDate: ''
        })
        this.props.history.push('/home');
    }


    confirmBack = async () => {

        this.setState({
            showRefundSuccessModal: false,
            showRefundConfirmationModal: false,
            showFailureModal: false,

        })

    }

    confirmRefund = async () => {
        this.setState({ loading: true });
        var refundObj = {
            "transactionId": this.state.refundTransactionId,
            "refundType": this.state.selectedOption === 'Full Refund' ? 'F' : 'P',
            "refundCcy": this.state.refundCcy,
            "refundAmt": this.state.refundAmount,
            "refundReason": this.state.refundReason

        }

        if (this.state.selectedOption !== 'Full Refund' && this.state.refundAmount > this.state.remainingAmt) {
            toast("The entered amount should not exceed the remaining amount", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: "toast-message toast-info",
            });
            this.setState({ loading: false });
            return;
        }


        const response = await DashboardService.initiateRefund(refundObj, this.state.refundTransactionId)
        console.log('refund response ', response);
        this.setState({ refundReason: "", loading: false, refundResponse: response });
        if (!response) {
            toast("Something went wrong, Please try again later", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: "toast-message toast-error",
            });
            return;
        }
        if (response.errors || (response.status && response.status === 'FAILURE')) {
            const firstElement = response.errors[0];
            // console.log("this is error  ", firstElement);
            if (firstElement) {
                const errorDesc = firstElement.errorDescription;
                // console.log("this is error desc ", errorDesc);
                this.setState({

                    errorDesc: errorDesc,
                })
            }
            this.setState({
                showFailureModal: true,
                showRefundConfirmationModal: false
            })
            return;
        }
        if (response.status && response.status.toString().toLowerCase() === 'success') {
            this.setState({
                showRefundSuccessModal: true,
                showRefundConfirmationModal: false
            })
            this.processedApply(this.state.pageNo);
        }
    }

    paymentSettlement = async () => {
        this.setState({
            paymentSettlementModel: true
        });
    }

    downloadSettlementFile = async () => {

        var searchObj = {
            settlementDate: this.state.settlementDate,
        }
        this.setState({
            paymentSettlementModel: false,
            loading: true
        })
        const response = await DashboardService.downloadTransactionsReport(searchObj, 'settlement')
        this.setState({
            loading: false,
        })
        if (!response) {
            return
        }
        this.props.history.push('/home');
        if (!response.fileName) {
            toast("Requested File not found", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: "toast-message toast-info",
            });
            return
        }
        var blob = this.base64toBlob(response.content, 'text/csv')
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveOrOpenBlob(blob, response.fileName + '.csv');
        }
        else {
            var a = window.document.createElement("a");
            a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
            a.download = response.fileName + '.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    rejectedApply = async () => {
        this.setState({
            noRejectedResultFound: false,
            showValidationMsg: false,
        });

        var searchObj = {
            receiptStartDate: this.state.rejectedReceiptStartDate,
            receiptEndDate: this.state.rejectedReceiptEndDate
        }

        if (this.state.rejectedReceiptStartDate) {
            searchObj.receiptStartDate = moment(this.state.rejectedReceiptStartDate).format('YYYY-MM-DD')
        }
        if (this.state.rejectedReceiptEndDate) {
            searchObj.receiptEndDate = moment(this.state.rejectedReceiptEndDate).format('YYYY-MM-DD')
        }

        if (!this.state.rejectedReceiptStartDate || !this.state.rejectedReceiptEndDate) {
            this.setState({
                showValidationMsg: true,
                rejectedTableShow: false
            });
        }
        else {
            this.setState({
                loading: true
            });
            const response = await DashboardService.getRejectedPaymentSearchResult(searchObj)
            this.setState({
                loading: false
            });
            if (!response || response.beneRejectedPayments.length == 0) {
                this.setState({
                    noRejectedResultFound: true,

                });

                return
            }
            this.setState({ serachedRejectedPaymentResultList: response.beneRejectedPayments })

            this.setState({
                apply1Click: true,
                apply2Click: true,
                rejectedTableShow: true,
                showValidationMsg: false

            })

        }
    }

    processedClick = async () => {

        this.setState({
            apply1Click: false,
            apply2Click: false,
            rejectedTableShow: false,
            failedTransactions: undefined,
            rejectedTableShow: false,
            rejectedFilePagination: false
        })
        this.clearProcessedDetails()
        this.clearFailedTransactionForm()
        this.rejectedClear()
    }

    clearProcessedDetails = async () => {
        this.setState({
            receiptStartDate: null,
            receiptEndDate: null,
            paymentStartDate: null,
            paymentEndDate: null,
            cancellationFromDate: null,
            cancellationToDate: null,
            requestedCcy: null,
            requestedMinAmount: '',
            requestedMaxAmount: '',
            paidCcy: null,
            paidMinAmount: '',
            paidMaxAmount: '',
            paymentMode: '',
            payerName: '',
            collectionRef: '',
            searchedBenePayTransactionId: '',
            searchedRequestorTransactionId: '',
            payerEmail: '',
            apply1Click: false,
            apply2Click: false,
            showProcessedTable: false,
            merchantId: null,
            selectedMerchant: null,
            sortingType:null, 
            sortingBy:null,
            pageSize:Pagination.pageSize,
            alreadyAppliedFilters: null
        });

        // Clear the checkboxes
        const updatedStatus = this.state.status.map((statusItem) => ({
            ...statusItem,
            isChecked: false
        }));

        document.getElementById("requestedCcySelect").selectedIndex = 0;
        document.getElementById("paidCcySelect").selectedIndex = 0;

        this.setState({ status: updatedStatus })
        this.setState({ selectedStatuses: [] });
    };


    rejectedClick = async () => {

        this.setState({
            apply1Click: false,
            apply2Click: true,
            section1show: true,
            noRejectedResultFound: false,
            showProcessedTable: false,
            noResultFound: false,
            rejectedTableShow: false,
            rejectedFilePagination: true,
            failedTransactions: undefined
        })
    }

    removeAlreadyPresentStatus = (data) => {

        this.state.selectedStatuses = [];
        this.state.teststatuscheck = [];

        const item = data;

        // console.log('item ', item , this.state.status, this.state.selectedStatuses);

        let index = -1;
        const isChecked = true;
        for (var j = 0; j < this.state.status.length; j++) {
            if (this.state.status[j].value === item) {
                this.state.status[j].isChecked = isChecked
            }
            // if (this.state.status[j].name === "ALL" && !isChecked) {
            //     this.state.status[j].isChecked = false;
            // }
        }

        this.setState({ status: this.state.status });

        for (var j = 0; j < this.state.status.length; j++) {
            if (this.state.status[j].isChecked === true) {
                if (this.state.status[j].value !== 'ALL') {
                    this.state.teststatuscheck.push(this.state.status[j].value)
                }
            }

        }
        this.state.selectedCurrencies = []

        for (var j = 0; j < this.state.status.length; j++) {
            for (var k = 0; k < this.state.teststatuscheck.length; k++) {
                if (this.state.status[j].value === this.state.teststatuscheck[k]) {
                    if (this.state.status[j].value !== 'ALL') {

                        this.state.selectedStatuses.push(this.state.status[j].value);
                    }
                }
            }

        }

        let fruites = this.state.status;

        fruites.forEach(fruite => {
            if (fruite.value == item && isChecked) {
                fruite.isChecked = true
            }
        });

        this.setState({ status: fruites });

        for (var j = 0; j < this.state.status.length; j++) {
            for (var k = 0; k < this.state.teststatuscheck.length; k++) {
                if (this.state.status[j].value === this.state.teststatuscheck[k].value) {
                    if (this.state.status[j].value !== 'ALL') {

                        this.state.selectedStatuses.push(this.state.status[j].value);
                    }
                }
            }
        }

        if (item == "ALL" && isChecked) {
            this.state.selectedStatuses = [];
            for (var j = 0; j < this.state.status.length; j++) {
                if (this.state.status[j].value !== 'ALL') {

                    this.state.selectedStatuses.push(this.state.status[j].value);
                }
                let fruites = this.state.status;

                fruites.forEach(fruite => (fruite.isChecked = true));
                this.setState({ status: fruites });
            }

        }
        if (item == "ALL" && !isChecked) {
            this.state.selectedStatuses = [];
            for (var j = 0; j < this.state.status.length; j++) {
                let fruites = this.state.status;

                fruites.forEach(fruite => (fruite.isChecked = false));
                this.setState({ status: fruites });
            }
        }

        let sStatus = this.state.selectedStatuses;
        let val = this.state.selectedStatuses.indexOf(data.toUpperCase());
        if (val !== -1) {
            sStatus.splice(val, 1);
            this.setState({
                selectedStatuses: sStatus
            })
        }

        this.handlePageChange({selected: this.state.pageNo});

        // console.log('After', item , this.state.status , this.state.selectedStatuses, sStatus, val ,data);

    }

    handleStatusChange = e => {

        e.persist()
        this.state.selectedStatuses = []
        this.state.teststatuscheck = [];

        const item = e.target.name;
        
        // console.log('item ', item);

        let index = -1;
        const isChecked = e.target.checked;
        for (var j = 0; j < this.state.status.length; j++) {
            if (this.state.status[j].value === item) {
                this.state.status[j].isChecked = isChecked
            }
            // if (this.state.status[j].name === "ALL" && !isChecked) {
            //     this.state.status[j].isChecked = false;
            // }
        }

        this.setState({ status: this.state.status });

        for (var j = 0; j < this.state.status.length; j++) {
            if (this.state.status[j].isChecked === true) {
                if (this.state.status[j].value !== 'ALL') {
                    this.state.teststatuscheck.push(this.state.status[j].value)
                }
            }

        }
        this.state.selectedCurrencies = []

        for (var j = 0; j < this.state.status.length; j++) {
            for (var k = 0; k < this.state.teststatuscheck.length; k++) {
                if (this.state.status[j].value === this.state.teststatuscheck[k]) {
                    if (this.state.status[j].value !== 'ALL') {

                        this.state.selectedStatuses.push(this.state.status[j].value);
                    }
                }
            }

        }

        let fruites = this.state.status;

        fruites.forEach(fruite => {
            if (fruite.value == item && isChecked) {
                fruite.isChecked = true
            }
        });

        this.setState({ status: fruites });

        for (var j = 0; j < this.state.status.length; j++) {
            for (var k = 0; k < this.state.teststatuscheck.length; k++) {
                if (this.state.status[j].value === this.state.teststatuscheck[k].value) {
                    if (this.state.status[j].value !== 'ALL') {

                        this.state.selectedStatuses.push(this.state.status[j].value);
                    }
                }
            }
        }

        if (item == "ALL" && isChecked) {
            this.state.selectedStatuses = [];
            for (var j = 0; j < this.state.status.length; j++) {
                if (this.state.status[j].value !== 'ALL') {

                    this.state.selectedStatuses.push(this.state.status[j].value);
                }
                let fruites = this.state.status;

                fruites.forEach(fruite => (fruite.isChecked = true));
                this.setState({ status: fruites });
            }

        }
        if (item == "ALL" && !isChecked) {
            this.state.selectedStatuses = [];
            for (var j = 0; j < this.state.status.length; j++) {
                let fruites = this.state.status;

                fruites.forEach(fruite => (fruite.isChecked = false));
                this.setState({ status: fruites });
            }
        }

    }

    getSupportedCurrency = async () => {
        const response = await DashboardService.getCurrencies()
        if (!response) {
            return
        }
        this.setState({ currencyList: response.supportedCcyList })
    }



    downloadTransactions = async () => {
        this.setState({
            loading: true
        })
         // Get the current date
         const currentDate = new Date();

         // Calculate the date 30 days ago
         const thirtyDaysAgo = new Date();
         thirtyDaysAgo.setDate(currentDate.getDate() - 29);
 
         // Format the dates as strings
         const currentDateStr = currentDate.toISOString().split('T')[0];
         const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

         
        var searchObj = {
            status: this.state.selectedStatuses,
            receiptStartDate: this.state.receiptStartDate,
            receiptEndDate: this.state.receiptEndDate,
            paymentStartDate: this.state.paymentStartDate,
            paymentEndDate: this.state.paymentEndDate,
            requestedCcy: this.state.requestedCcy || this.setNullIfEmpty(this.state.requestedCcy),
            requestedMinAmount: this.state.requestedMinAmount || this.setNullIfEmpty(this.state.requestedMinAmount),
            requestedMaxAmount: this.state.requestedMaxAmount || this.setNullIfEmpty(this.state.requestedMaxAmount),
            paymentMode: this.state.paymentMode || this.setNullIfEmpty(this.state.paymentMode),
            payerName: this.state.payerName || this.setNullIfEmpty(this.state.payerName),
            collectionRef: this.state.collectionRef,
            pageSize: this.state.pageSize,
            defaultSearch: false,
            transactionId: this.state.searchedBenePayTransactionId || this.setNullIfEmpty(this.state.searchedBenePayTransactionId),
            requestorTransactionId: this.state.searchedRequestorTransactionId || this.setNullIfEmpty(this.state.searchedRequestorTransactionId),
            payerEmail: this.state.payerEmail || this.setNullIfEmpty(this.state.payerEmail),
            cancellationFromDate: this.state.cancellationFromDate,
            cancellationToDate: this.state.cancellationToDate,
            paidCcy: this.state.paidCcy || this.setNullIfEmpty(this.state.paidCcy),
            paidMinAmount: this.state.paidMinAmount || this.setNullIfEmpty(this.state.paidMinAmount),
            paidMaxAmount: this.state.paidMaxAmount || this.setNullIfEmpty(this.state.paidMaxAmount),
            showAllRecords: false,
            // allMerchant: false
        }
        // @todo following date formats need to integrate from generic method
        if (this.state.receiptStartDate) {
            searchObj.receiptStartDate = moment(this.state.receiptStartDate).format('YYYY-MM-DD')
        }
        if (this.state.receiptEndDate) {
            searchObj.receiptEndDate = moment(this.state.receiptEndDate).format('YYYY-MM-DD')
        }
        if (this.state.paymentStartDate) {
            searchObj.paymentStartDate = moment(this.state.paymentStartDate).format('YYYY-MM-DD')
        }
        if (this.state.paymentEndDate) {
            searchObj.paymentEndDate = moment(this.state.paymentEndDate).format('YYYY-MM-DD')
        }
        if (this.state.cancellationFromDate) {
            searchObj.cancellationFromDate = moment(this.state.cancellationFromDate).format('YYYY-MM-DD')
        }
        if (this.state.cancellationToDate) {
            searchObj.cancellationToDate = moment(this.state.cancellationToDate).format('YYYY-MM-DD')
        }

        if (this.state.requestedMinAmount) {
            searchObj.requestedMinAmount = parseInt(this.state.requestedMinAmount)
        }
        if (this.state.requestedMaxAmount) {
            searchObj.requestedMaxAmount = parseInt(this.state.requestedMaxAmount)
        }
        if (this.state.paidMinAmount) {
            searchObj.paidMinAmount = parseInt(this.state.paidMinAmount)
        }
        if (this.state.paidMaxAmount) {
            searchObj.paidMaxAmount = parseInt(this.state.paidMaxAmount)
        }
        if (!searchObj.status.length) {
            searchObj.status = null
        }

        var objFields = Object.keys(searchObj);
        var allFieldsBoolean = false;

        if (TempStorage.loginUserRole === USER_TYPE.ADMIN_USER) {

            if (!this.state.merchantId && !searchObj.transactionId && !searchObj.status && !searchObj.receiptStartDate && !searchObj.receiptEndDate && !searchObj.paymentStartDate && !searchObj.paymentEndDate && !searchObj.requestedCcy && !searchObj.requestedMinAmount &&
                !searchObj.requestedMaxAmount && !searchObj.paidCcy && !searchObj.paidMinAmount && !searchObj.paidMaxAmount && !searchObj.paymentMode && !searchObj.payerName && !searchObj.collectionRef &&
                !searchObj.requestorTransactionId && !searchObj.payerEmail && !searchObj.cancellationFromDate && !searchObj.cancellationToDate) {
                this.setState({ merchantId: 'All', selectedMerchant: 'All', receiptStartDate: thirtyDaysAgo, receiptEndDate: currentDate });
                searchObj.receiptStartDate = thirtyDaysAgoStr
                searchObj.receiptEndDate = currentDateStr
            }

            if (searchObj.transactionId || searchObj.status || searchObj.receiptStartDate || searchObj.receiptEndDate || searchObj.paymentStartDate ||
                searchObj.paymentEndDate || searchObj.requestedCcy || searchObj.requestedMinAmount || searchObj.requestedMaxAmount || searchObj.paidCcy ||
                searchObj.paidMinAmount || searchObj.paidMaxAmount || searchObj.paymentMode || searchObj.payerName || searchObj.collectionRef ||
                searchObj.requestorTransactionId || searchObj.payerEmail || searchObj.cancellationFromDate || searchObj.cancellationToDate) {

                if (!this.state.merchantId) {
                    this.setState({ merchantId: 'All', selectedMerchant: 'All' });
                }
            }

            if (this.state.merchantId == 'All') {
                // searchObj.allMerchant = true;
            }

            if (this.state.merchantId !== 'All' && this.state.merchantId !== null) {
                searchObj.merchantId = this.state.merchantId
            }
        }

        if (!searchObj.status && !searchObj.receiptStartDate && !searchObj.receiptEndDate && !searchObj.paymentStartDate && !searchObj.paymentEndDate && !searchObj.requestedCcy && !searchObj.requestedMinAmount &&
            !searchObj.requestedMaxAmount && !searchObj.paidCcy && !searchObj.paidMinAmount && !searchObj.paidMaxAmount && !searchObj.paymentMode && !searchObj.payerName && !searchObj.collectionRef &&
            !searchObj.requestorTransactionId && !searchObj.transactionId && !searchObj.payerEmail && !searchObj.cancellationFromDate && !searchObj.cancellationToDate) {
            allFieldsBoolean = true;

        }

        if (allFieldsBoolean) {
            searchObj = {defaultSearch: false}
        }

        if (TempStorage.loginUserRole === USER_TYPE.ADMIN_USER) {
            searchObj.merchantId = this.state.merchantId
        }

        const response = await DashboardService.downloadTransactionsReport(searchObj, 'report')
        if (!response) {
            return
        }
        this.setState({
            loading: false
        })
        var blob = this.base64toBlob(response.content, 'text/csv')
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveOrOpenBlob(blob, response.fileName + '.csv');
        }
        else {
            var a = window.document.createElement("a");
            a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
            a.download = response.fileName + '.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

    }

    base64toBlob = function (base64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var byteCharacters = atob(base64Data);
        //var byteCharacters = decodeURIComponent(escape(window.atob(base64Data)))
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);

            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    }

    getFailedTransactions = async (request) => {
        const response = await DashboardService.getAllFailedTransactions(request);
        this.setState({ loading: false })
        if (!response) {
            return;
        }
        // 
        let totalFailedPages = (response.totalCount / this.state.pageSize);
        this.setState({
            totalFailedPages: Math.ceil(totalFailedPages)
        });
        // 
        // console.log("SUSHMIT PRINTING :", response);
        await this.setState({ failedTransactions: response.list, totalFailedCount: response.totalCount });
        this.pageWiseSorting("Failed")
        // this.clearFailedTransactionForm()
        // console.log('failedTransactions ', this.state.failedTransactions);
    }


    getPaymentDetails = async (paymentId) => {
        this.setState({ loading: true });

        const response = await DashboardService.getPaymentDetails(paymentId);

        if (response !== undefined && Object.keys(response).length !== 0) {
            this.setState({
                paymentDetails: response,
                loading: false,
                transactionDetailsModal: false,
                showCancellationModal: false,
                paymentDetailsOpen: true,
            });
        } else {
            this.setState({ loading: false });
            toast("Unable to get the Payment Details", {
                position: toast.POSITION.BOTTOM_CENTER,
                className: "toast-message toast-error",
            });
        }
    }

    componentDidMount = async () => {

        this.setState({ isDeviceMobile: false });

        if (this.props.location.state && this.props.location.state.isSettlementRequested) {
            this.paymentSettlement()
        }
        await fetchAuthSession().then(res => {
            let jwt = res["idToken"]["jwtToken"]
            StorageService.set(StorageKeys.clientJwt, jwt);
        })

        if (TempStorage.loginUserRole === USER_TYPE.ADMIN_USER) {
            const response = await DashboardService.getMerchantSummaryList();
            const addOption = { merchantId: 'All', merchantName: 'All' };
            response.merchantSummary = [addOption, ...response.merchantSummary]; //Add a All option in merchants array

            if (Object.keys(response).length !== 0) {
                this.setState({ merchantsList: response.merchantSummary });
            }
        }

        if (TempStorage.loginUserRole !== USER_TYPE.ADMIN_USER) {
            this.setState({
                status: [
                    { text: 'All', value: "ALL", isChecked: false },
                    { text: 'Awaiting Payment', value: "AWAITING_PAYMENT", isChecked: false },
                    { text: 'Paid', value: "PAID", isChecked: false },
                    // { text: 'Partially Refunded', value: "PARTIALLY_REFUNDED", isChecked: false },
                    // { text: 'Fully Refunded', value: "FULLY_REFUNDED", isChecked: false },
                    { text: 'Refunded', value: "REFUNDED", isChecked: false },
                    { text: 'Cancelled', value: "CANCELLED", isChecked: false },
                    { text: 'Expired', value: "EXPIRED", isChecked: false },
                    { text: 'Settled', value: "SETTLED", isChecked: false }
                ]
            });
        }
        else {
            this.setState({
                status: [
                    { text: 'All', value: "ALL", isChecked: false },
                    { text: 'Awaiting Payment', value: "AWAITING_PAYMENT", isChecked: false },
                    { text: 'Paid', value: "PAID", isChecked: false },
                    // { text: 'Partially Refunded', value: "PARTIALLY_REFUNDED", isChecked: false },
                    // { text: 'Fully Refunded', value: "FULLY_REFUNDED", isChecked: false },
                    { text: 'Refunded', value: "REFUNDED", isChecked: false },
                    { text: 'Cancelled', value: "CANCELLED", isChecked: false },
                    { text: 'Expired', value: "EXPIRED", isChecked: false },
                    { text: 'Settled', value: "SETTLED", isChecked: false }
                ]
            });
        }

        this.getSupportedCurrency()
        this.handleApplyClickPaymentSettlement();
        window.addEventListener('touchstart', (e) => {
            let statusMenu = document.getElementById('statusMenu');
            let creationDateMenu = document.getElementById('creationDateMenu');

            let elementId = e.target.id;

            if (!(elementId === 'statusDropDown' || elementId === 'creationDateDropDown')) {
                if (!((e.target.classList.contains('avoidToggle')) || (e.target.classList.contains('MuiInputBase-input')))) {
                    try {
                        statusMenu.classList.remove('d-block');
                        creationDateMenu.classList.remove('d-block');
                    } catch {
                        // console.log("Classlist is null");
                    }
                }
            }
        })

        // UI

        // let amountFilter = document.getElementById("dropdownMenuButtonAmount");
        // let amountFilterDiv = document.getElementById("dropdownDivButtonAmount");
        // amountFilter.addEventListener("click", (e) => {
        //     if (!((e.target.classList.contains('avoidToggle')) || (e.target.classList.contains('MuiInputBase-input')))) {
        //         try {
        //             console.log("IN here");
        //         } catch {
        //             // console.log("Classlist is null");
        //         }
        //     }
        // })
    

        // UI

        if (window.innerWidth < 720) {
            this.setState({ initalPage: 0, isDeviceMobile: true });
            this.processedApply(1);
        }

        // window.addEventListener('resize', () => {
        //     if(window.innerWidth < 600){
        //         this.setState({ initalPage: 0 , isDeviceMobile: true});
        //         this.processedApply(1);
        //     }
        // })

    }

    handlePageChange = (data) => {
        if(data.selected + 1 > this.state.totalPages){
            data.selected = this.state.totalPages-1;
        }else if(data.selected <= 0){
            data.selected = 0;
        }
        this.setState({ initalPage: data.selected });
        this.setState({ pageNo: data.selected + 1 });
        this.processedApply(data.selected + 1);
    }

    handlePageChangeFailedTransaction = (data) => {
        this.setState({ initalPageFailed: data.selected });
        this.setState({ pageNo: data.selected + 1 });
        this.applyFailedTransactionHandler(data.selected + 1);
    }

    handlePaymentDetailsClose = () => {
        this.setState({ paymentDetailsOpen: false, refundModel: false, showFailureModal:false });
    }

    /**
     * @author Ragavan
     * This Method Handle to copy the param value to the system clipboard
     *  
     * @param {*} value 
     */
    handleCopyClick = (value) => {
        navigator.clipboard.writeText(value)
            .then(() => {
                toast("Copied! ", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: "toast-message toast-success",
                });
            })
            .catch((error) => {
                console.error('Unable to copy:', error);
            });
    };

    /**
     * @author Ragavan
     * 
     * Method Cell click event
     * 
     * @param {*} params 
     * @param {*} event 
     */
    handleCellClick = (params, event) => {
        // console.log("row click", params.row);
        if (params.field != "") {
            this.handleTransactionDetails(params, event);
            console.log("IN HERE FOR TEST", params);
        }
    }

    /**
     * @author Ragavan
     * 
     * Method to show the transaction info screen
     * 
     * @param {*} params 
     * @param {*} event 
     */
    handleTransactionDetails = (params, event) => {
        
        const rowData = params.row;

        this.setState({
            transactionParams: params,
            transactionDetails: rowData,
            transactionDetailsModal: true,
            selectedCollectionRefNumber: rowData.collectionReferenceNumber,
            selectedCollectionCurrency: rowData.collectionCurrency,
            selectedCardBrand: rowData.cardBrand,
            selectedCancelledTimestamp: rowData.cancelledTimestamp,
            selectedCharges: rowData.charges,
            selectedCreateTimeStamp: rowData.createTimeStamp,
            selectedDebtorName: rowData.debtorName,
            selectedDebtorEmailId: rowData.debtorEmailId,
            selectedFinalDueAmount: rowData.finalDueAmount,
            selectedFinalPaymentAmount: rowData.paymentAmount,
            selectedPaymentConfirmationId: rowData.paymentConfirmationId,
            selectedPaymentCurrency: rowData.paymentCurrency,
            selectedPaymentMode: rowData.paymentMode,
            selectedPaymentCompletionTimestamp: rowData.paymentCompletionTimestamp,
            selectedPaymentDueDate: rowData.paymentDueDate,
            selectedPaymentLink: rowData.paymentURL,
            selectedPaymentExpiryDate: rowData.paymentExpiryDate,
            selectedReasonForCharges: rowData.reasonForCharges,
            selectedReasonForCancellation: rowData.reasonForCancellation,
            selectedReasonForCollection: rowData.reasonForCollection,
            selectedReceiptTimestamp: rowData.receiptTimestamp,
            selectedStatus: rowData.status,
            selectedTransactionId: rowData.transactionId,
            selectedFailedAttempts: rowData.failedAttempts,
        });

        if (rowData.status === "AWAITING_PAYMENT") {
            this.setState({
                transactionPaymenButtonRules: {
                    disableViewPaymentDetails: true,
                    disableIssueRefund: true,
                    disableCancelTransaction: false,
                    disableViewFailedAttempts: false,
                    disableDuplicate: false,
                    disableViewRefundDetails: true,
                }
            })
        }

        if (rowData.status === "PAID") {
            this.setState({
                transactionPaymenButtonRules: {
                    disableViewPaymentDetails: false,
                    disableIssueRefund: false,
                    disableCancelTransaction: true,
                    disableViewFailedAttempts: false,
                    disableDuplicate: false,
                    disableViewRefundDetails: true,
                }
            })
        }

        if (rowData.status === "PARTIALLY_REFUNDED") {
            this.setState({
                transactionPaymenButtonRules: {
                    disableViewPaymentDetails: false,
                    disableIssueRefund: false,
                    disableCancelTransaction: true,
                    disableViewFailedAttempts: false,
                    disableDuplicate: false,
                    disableViewRefundDetails: false,
                }
            })
        }

        if (rowData.status === "FULLY_REFUNDED") {
            this.setState({
                transactionPaymenButtonRules: {
                    disableViewPaymentDetails: false,
                    disableIssueRefund: false,
                    disableCancelTransaction: true,
                    disableViewFailedAttempts: false,
                    disableDuplicate: false,
                    disableViewRefundDetails: false,
                }
            })
        }

        if (rowData.status === "EXPIRED") {
            this.setState({
                transactionPaymenButtonRules: {
                    disableViewPaymentDetails: true,
                    disableIssueRefund: true,
                    disableCancelTransaction: true,
                    disableViewFailedAttempts: false,
                    disableDuplicate: false,
                    disableViewRefundDetails: true,
                }
            })
        }

        if (rowData.status === "CANCELLED") {
            this.setState({
                transactionPaymenButtonRules: {
                    disableViewPaymentDetails: true,
                    disableIssueRefund: true,
                    disableCancelTransaction: true,
                    disableViewFailedAttempts: false,
                    disableDuplicate: false,
                    disableViewRefundDetails: true,
                }
            })
        }

        if (rowData.status === "SETTLED") {
            this.setState({
                transactionPaymenButtonRules: {
                    disableViewPaymentDetails: false,
                    disableIssueRefund: false,
                    disableCancelTransaction: true,
                    disableViewFailedAttempts: false,
                    disableDuplicate: false,
                    disableViewRefundDetails: true,
                }
            })
        }

        if (rowData.status === "REFUNDED") {
            this.setState({
                transactionPaymenButtonRules: {
                    disableViewPaymentDetails: false,
                    disableIssueRefund: true,
                    disableCancelTransaction: true,
                    disableViewFailedAttempts: false,
                    disableDuplicate: false,
                    disableViewRefundDetails: false,
                }
            })
        }
    }

    /**
     * @author Ragavan
     * Method to render chip component based on the payment status
     */
    getStatusChip = (status) => {
        let chip = true;
        var chipColor = '', chipBgColor = '', chipLabel = '';
        switch (status) {
            case 'PAID':
                chipColor = 'black';
                chipBgColor = '#90EE90';
                chipLabel = 'Paid';
                break
            case 'AWAITING_PAYMENT':
                chipColor = 'white';
                chipBgColor = '#4D9AFF';
                chipLabel = 'Awaiting Payment';
                break
            case 'FULLY_REFUNDED':
                chipColor = 'white';
                chipBgColor = 'rgb(200 134 10)';
                chipLabel = 'Fully Refunded';
                break
            case 'CANCELLED':
                chipColor = 'white';
                chipBgColor = '#F34747';
                chipLabel = 'Cancelled';
                break
            case 'PARTIALLY_REFUNDED':
                chipColor = 'white';
                chipBgColor = '#edb64f';
                chipLabel = 'Partially Refunded';
                break
            case 'EXPIRED':
                chipColor = 'white';
                chipBgColor = '#FF7276';
                chipLabel = 'Expired';
                break
            case 'SETTLED':
                chipColor = 'white';
                chipBgColor = 'rgb(8 171 8)';
                chipLabel = 'Settled';
                break
            case 'SUCCESS':
                chipColor = 'black';
                chipBgColor = '#a7daa2';
                chipLabel = 'Success';
                break
            case 'REFUNDED':
                chipColor = 'white';
                chipBgColor = 'gray';
                chipLabel = 'Refunded';
                break
            default:
                chip = false;
        }

        return !chip ? '-' : <Chip label={chipLabel} title={chipLabel} style={{ backgroundColor: chipBgColor, color: chipColor, width: '146px', height: '30px' }} />;
    }

    /**
     * @author Ragavan
     * Method returns the number of refunds count for the transaction
     * @param {*} transactionId 
     * @returns 
     */
    getRefundsCount = (transactionId, status = null) => {

        var refundCount = 0;
        if (transactionId && status == null) {

            (this.state.searchedPaymentResultList || []).map((value) => {
                if (value.transactionType === "REFUND" && value.parentTransactionId == transactionId) {
                    refundCount++;
                }
            });
            return refundCount;
        }

        if (transactionId && status) {
            (this.state.searchedPaymentResultList || []).map((value) => {
                if (value.transactionType === "REFUND" && value.status === "SUCCESS" && value.parentTransactionId == transactionId) {
                    refundCount++;
                }
            });
            return refundCount;
        }
    }

    /**
     * @author Ragavan
     * @param {*} value 
     * @returns 
     */
    getPaymentActionIcons = (value) => {
        let status = value.row.status;

        return (
            <>
                {TempStorage.loginUserRole !== USER_TYPE.ADMIN_USER ?

                    <>
                        <Tooltip title={status == 'AWAITING_PAYMENT' ? "Copy Payment Link" : ''}>
                            <IconButton
                                aria-label="Duplicate"
                                style={{ padding: 'inherit' }}
                                onClick={() => { this.handleCopyClick(value.row.paymentURL); }}
                                disabled={(status != 'AWAITING_PAYMENT')}
                            >
                                <FileCopyOutlinedIcon style={{ color: (status == 'AWAITING_PAYMENT') ? '#264d73' : 'gray' }} />
                            </IconButton>
                        </Tooltip>
                        <Divider orientation="vertical" variant="middle" flexItem />
                    </>
                    : ''
                }

                <Tooltip title={status == 'AWAITING_PAYMENT' ? "Cancel Transaction" : ''}>
                    <IconButton
                        aria-label="Cancel"
                        style={{ padding: 'inherit' }}
                        onClick={(e) => {
                            // (status == 'AWAITING_PAYMENT') ? this.refundClick(e, value.row) : ''
                            if (status === 'AWAITING_PAYMENT') {
                                this.refundClick(e, value.row);
                            }
                        }}
                        disabled={(status != 'AWAITING_PAYMENT')}>
                        <Cancel style={{ color: (status == 'AWAITING_PAYMENT') ? 'red' : 'gray' }} />
                    </IconButton>
                </Tooltip>

                <Divider orientation="vertical" variant="middle" flexItem />

                <Tooltip title={status == 'PAID' || status == 'PARTIALLY_REFUNDED' || status == 'SETTLED' || status == 'REFUNDED' ? "Issue Refund" : ''}>
                    <IconButton
                        aria-label="Refunds" style={{ padding: 'inherit' }}
                        disabled={!(status == 'PAID' || status == 'PARTIALLY_REFUNDED' || status == 'SETTLED' || status == 'REFUNDED')}
                        onClick={(e) => {
                            if (status === 'PAID' || status === 'PARTIALLY_REFUNDED' || status === 'SETTLED' || status == 'REFUNDED') {
                                this.selectedItem = value.row;
                                this.refundClick(e, value.row);
                            }
                        }}
                    >
                        <Replay style={{ color: (status == 'PAID' || status == 'PARTIALLY_REFUNDED' || status == 'SETTLED' || status == 'REFUNDED') ? '#264d73' : 'gray' }} />
                    </IconButton >
                </Tooltip>

                <Divider orientation="vertical" variant="middle" flexItem />

                <Tooltip title={status == 'AWAITING_PAYMENT' ? "Send Payment Reminder" : ''}>
                    <IconButton
                        aria-label="Reminder" style={{ padding: 'inherit' }}
                        disabled={(status != 'AWAITING_PAYMENT')}
                        onClick={() => { this.sendPaymentReminderBtn(value) }}
                    >
                        <Notifications style={{ color: (status == 'AWAITING_PAYMENT') ? "#264d73" : "gray" }} />
                    </IconButton>
                </Tooltip>
            </>
        )
    }

    setSelectedItem = (value) => {
        this.selectedItem = value;
    }

    sendPaymentReminderBtn = (value) => {
        this.setState({ showReminderModal: true, transactionIdForReminder: value.row.transactionId })
    }

    humanize(str) {
        var i, frags = str.split('_');
        for (i = 0; i < frags.length; i++) {
            frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        return frags.join(' ');
    }

    getPaymentRefundTimestamp(date) {
        const tempDate = date.toLocaleString("en-GB", {
            hour12: false,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        const formatDate = new Intl.DateTimeFormat("en",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            }
        );
        const modifiedDate = formatDate.format(new Date(date));
        return modifiedDate;
    }

    handleRefundDetails = async (params) => {
        this.setState({ loading: true })

        const rowData = params.row;

        let res = await DashboardService.getRefundDetails(rowData.transactionId)
        // console.log("handleRefundDetails", res);
        if (res.data.paymentDetails) {
            this.setState({
                refundModel: true,
                transactionDetailsModal: false,
                refundDetails: res.data.paymentDetails,
                refundSelected: rowData
            })
        }
        this.setState({ loading: false })
    }

    handleFailedTransactions = async () => {
        this.setState({ loading: true })
        const request = {};
        const response = await DashboardService.getAllFailedTransactions(request);

        if (!response) {
            return;
        }
        await this.setState({ failedTransactions: response.list, failedTransactionsModal: true });
        // console.log("failedTransactions", this.state.failedTransactions);
        let match = false;
        for (let failedTransaction in this.state.failedTransactions) {
            let transaction = this.state.failedTransactions[failedTransaction]

            if (transaction.transactionId == this.state.selectedTransactionId) {
                match = true;
            }
            // console.log("N", failedTransaction, transaction.transactionId, this.state.selectedTransactionId, transaction);
        }

        await this.setState({
            transactionDetailsModal: false,
            faildTransactionMatched: match,
            loading: false
        })
    }

    closeFaildTransactionModal = () => {
        this.setState({ failedTransactionsModal: false });
    }

    /**
     * @author Ragavan
     * Method to sort amount with currency
     * 
     * @param {*} v1 
     * @param {*} v2 
     * @returns 
     */
    sortCurrencyComparator = (v1, v2) => {
        let value1 = v1.split(' ');
        let value2 = v2.split(' ');

        const currency1 = value1[0];
        const currency2 = value2[0];
        const amount1 = parseFloat(value1[1]);
        const amount2 = parseFloat(value2[1]);

        if (currency1 < currency2) {
            return -1;
        }

        if (currency1 > currency2) {
            return 1;
        }

        return amount1 - amount2;
    };

    /**
     * Redirect to single payment when user trigger 
     */
    navigateToNewPayment = () => {
        this.props.history.push('/new-payment');
    };


    /**
     * @author Ragavan
     * Handle merchant list onchange
     * @param {*} e 
     * @param {*} v 
     */
    getMerchantId = (e, v) => {

        if (v && v.merchantId !== null && v.merchantId !== '') {
            this.setState({ merchantId: v.merchantId, selectedMerchant: v.merchantName })
        }

        if (v == null) {
            this.setState({ selectedMerchant: null, merchantId: null })
        }
    }

    openMobileViewFilter = () => {
        this.setState({ mobileViewFilterModal: true })
    }

    /**
     * @author Ragavan
    * To handle event for the date field when change
    * @param {*} event
    */
    changeDateFormat = (event) => {
        let value = null;

        if (event != null) {
            value = moment(event.toDate()).format("YYYY-MM-DD");
        }

        return value;
    }

    handleRowsPerPage = async (event) =>{
        await this.setState({
            pageSize:event.target.value
        });
        
        this.processedApply(1);
    }

    sortTransaction = async (model) =>{
        
        if(model.length !== 0){
            let sortingType, sortingBy;

            if (model[0].field === "collectionReferenceNumber") {
                sortingType = model[0].sort;
                sortingBy = "collectionReferenceNo";
            } else {
                sortingType = model[0].sort;
                sortingBy = model[0].field;
            }

            await this.setState({
                sortingType,
                sortingBy,
                initalPage: 0,
                pageNo: 0
            });

            // Reset the flag when sorting criteria change
            await this.setState({ apiCallMade: false });

            this.processedApply(1);
        }
        else{
            // Make the API call only if it hasn't been made before
            if (!this.state.apiCallMade) {
                await this.setState({ apiCallMade: true, sortingType:null, sortingBy:null, initalPage:0, pageNo:0 });
                this.processedApply(1);
            }
        }
    }

    /**
     * @author Bharath
     * HandleEvent to generate the invoice
     * @param {*} params 
     */
    handleGenerateInvoice = async (params) => { 
        await this.setState({loading: true});   
        let response = await PaymentService.generateInvoice(params);
        if (response.pdfContent && response.fileName) {
            Utils.downloadBase64PDF(response.pdfContent, response.fileName)
        } else {
            toast(response.message , {
                position: toast.POSITION.BOTTOM_CENTER,
                className: "toast-message toast-error",
            });
        }
        await this.setState({loading: false});
    }

    removeAmountFilter = async (data) => {

        if(data === "Requested Amount"){
            await this.setState({
                requestedCcy: null,
                requestedMinAmount: null,
                requestedMaxAmount: null
            })
        }else if(data === "Paid Amount"){
            await this.setState({
                paidCcy: null,
                paidMinAmount: null,
                paidMaxAmount: null
            })
        }

        this.handlePageChange({selected: this.state.pageNo});
    
    }

    removeDateFilter = async (data) => {

        if(data === "Create Date"){
            await this.setState({
                receiptStartDate: null,
                receiptEndDate: null
            })
        }else if(data === "Payment Date"){
            await this.setState({
                paymentStartDate: null,
                paymentEndDate: null
            })
        }else if(data === "Cancellation Date"){
            await this.setState({
                cancellationToDate: null,
                cancellationFromDate: null
            })
        }

        this.handlePageChange({selected: this.state.pageNo});
    }


    setStateValue = (key , value) => {
        this.setState({
            key: value
        })
    }

    
    render = () => html.apply(this);
}

export default Home;
