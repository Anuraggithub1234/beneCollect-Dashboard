import React from "react";
import "./home.scss";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../$widgets/buttons/form-button";
import ReactPaginate from 'react-paginate';
import { CircularProgress } from "@material-ui/core";
import {
  Card,
  Container,
  CardContent,
  Box,
  Grid,
  Chip,
  Typography,
  NativeSelect,
  MenuItem,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  FormControl,
  Button,
  Select,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { styled } from "@mui/material/styles";
import ConfirmDialog from "../$widgets/dialog";
import { Backdrop, Autocomplete, IconButton, Divider, TextField, Slide, CardHeader, CardActions, InputLabel } from "@mui/material";
import moment from "moment";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { Close, CheckCircleOutline } from '@mui/icons-material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { DateFormat } from '../../enum/common.enum';
import { InputGroup, Form as bForm } from 'react-bootstrap';
import { nodeName } from "jquery";
// import { position } from "dom-helpers/query";
import { toast } from 'react-toastify';
import MUIDatePicker from "../$widgets/form-inputs/MUIDatePicker";
import TitleBar from "../title-bar/title-bar";
import { TempStorage, USER_TYPE } from "../../service/core/storage.service";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UndoIcon from '@material-ui/icons/Replay';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CancelIcon from '@material-ui/icons/Cancel';
import dayjs from "dayjs";
import { PictureAsPdf } from "@material-ui/icons";
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faFilter, faFilterCircleDollar, faDownload, faGear, faCalendar, faXmark, faAnglesRight} from '@fortawesome/free-solid-svg-icons'
import { a } from "aws-amplify";
import CustomNoRowsOverlay from "./support-components/CustomNoRowsOverlay"
// import AmountFilter from "./support-components/AmountFilter";


export function html() {

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      border: "1px solid #ced4da",
      fontSize: 14,
      minWidth: "100%",
      padding: "10px 26px 10px 5px",
    },
  }));

  const {
    refundModel,
    showValidationMsg,
    selectedOption,
    showFailureModal,
    paymentDetails,
    showProcessedTable,
    showRefundConfirmationModal,
    showCancellationModal,
    showConfirmationModal,
    showCancellationReason,
    paymentId,
    isError,
    selectedTransactionId,
    selectedStatus,
    selectedFinalDueAmount,
    selectedReceiptTimestamp,
    selectedDebtorName,
    selectedDebtorEmailId,
    selectedReasonForCharges,
    selectedCollectionRefNumber,
    selectedCollectionCurrency,
    selectedPaymentConfirmationId,
    selectedPaymentCurrency,
    selectedPaymentCompletionTimestamp,
    selectedPaymentDueDate,
    selectedPaymentLink,
    selectedCancelledTimestamp,
    selectedCardBrand,
    selectedCharges,
    selectedCreateTimeStamp,
    selectedFinalPaymentAmount,
    selectedPaymentMode,
    selectedReasonForCancellation,
    selectedPaymentExpiryDate,
    selectedReasonForCollection,
    selectedFailedAttempts,
    showRefundSuccessModal,
    status,
    apply1Click,
    apply2Click,
    list1Style,
    value,
    rejectedTableShow,
    totalPaymentsFound,
    paymentSettlementModel,
    loading,
    refundLoading,
    isRowVisible,
    selectedItem,
    currentIndex,
    cancellationReason,
    isCancellationProcessing,
    failedAttemptStartDate,
    failedAttemptEndDate,
    benepayPaymentRef,
    collectionReference,
    toAmount,
    fromAmount,
    failedTransactions,
    payerEmail,
    requestorTransactionId,
    settlementDate,
    refundCount,
    receiptStartDate,
    receiptEndDate,
    paymentStartDate,
    paymentEndDate,
    rejectedReceiptStartDate,
    rejectedReceiptEndDate,
    totalPages,
    totalFailedPages,
    totalFailedCount,
    copyText,
    showReminderModal,
    transactionIdForReminder,
    showCancellationSuccessModal,
    transactionDetailsModal,
    transactionPaymenButtonRules,
    searchedBenePayTransactionId,
    searchedRequestorTransactionId,
    payerName,
    collectionRef,
    cancellationFromDate,
    cancellationToDate,
    paidMinAmount,
    paidMaxAmount,
    parentTransactions,
    columns,
    transactionDetails,
    refundResponse,
    paymentDetailsOpen,
    faildTransactionMatched,
    failedTransactionsModal,
    showModal,
    merchantsList,
    mobileViewFilterModal,
    sortingType,
    sortingBy,
    pageNoForRedirect,
    pageNo,
    alreadyAppliedFilters,
    searchedPaymentResultList,
    isFirstTimeSearch,
    isDateFilter,
    isAmountFilter
  } = this.state;

  const { } = this.props;

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
          
  return (
    <>
      <div id="desktopScreen" className={"home-main position-relative"}>

        {loading && (
          <div id="semiTransparenDivTest">
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>)}

        <section>
            <ul className="nav nav-pills" id="pills-tab" role="tablist" style={{borderBottom: '1px solid #B4D3FA', position: 'relative', marginTop: '8px'}}>
              <li style={{fontSize: 'var(--font-large)', fontWeight: 'var(--font-weight-normal)', color: '#046CED'}}>
                <a className="navItem active" style={{display: 'block', minWidth: '120px', paddingBottom: '8px', marginRight: '2rem', cursor: "pointer"}} id="pills-transactions-tab" data-toggle="pill" href="#pills-transactions" role="tab" aria-controls="pills-transactions" aria-selected="true">Transactions</a>
              </li>
              <li style={{fontSize: 'var(--font-large)', fontWeight: 'var(--font-weight-normal)', color: '#046CED'}}>
                <a className="navItem" style={{display: 'block', minWidth: '120px', paddingBottom: '8px', marginRight: '2rem', cursor: "pointer"}} id="pills-refunds-tab" data-toggle="pill" href="#pills-refunds" role="tab" aria-controls="pills-refunds" aria-selected="false">Refunds</a>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-transactions" role="tabpanel" aria-labelledby="pills-transactions-tab" style={{width: '100%'}}>
                
                <div style={{marginTop: "16px", paddingBottom: '32px',  borderBottom: '1px solid #C5DCFC'}}>

                  {/* Already Applied Filters */}
                  {alreadyAppliedFilters && ( alreadyAppliedFilters.statusFilters.isVisible || alreadyAppliedFilters.dateFilters.isVisible || alreadyAppliedFilters.amountFilters.isVisible || alreadyAppliedFilters.basicFilters.isVisible)  &&
                  <>
                  <section style={{marginTop: '20px', width: '100%', background: '#F1F1F1', borderRadius: '4px', padding: '12px 16px'}}>
                    {/* Already Applied Status Filters */}
                    <h2 style={{fontSize: 'var(--font-medium)', fontWeight: 'var(--font-weight-medium)', color: '#495370', marginBottom: '8px'}}>Filters Applied</h2>
                    <ul style={{listStyle: 'none', padding: '0', width: '100%', margin: '0', display: 'flex', flexWrap: 'wrap', gap: '4px'}}>
                      
                      {alreadyAppliedFilters.basicFilters && alreadyAppliedFilters.basicFilters.isVisible && alreadyAppliedFilters.basicFilters.data &&
                      <>
                        {alreadyAppliedFilters.basicFilters.data.map((item) => (
                          <li key={item.title} style={(item.value && item.value.length > 0) ? {padding: '8px', width: 'auto', background: 'white', padding: '8px', marginRight: '8px', borderRadius: '4px'} : {display: 'none'}}>
                            <label
                              key={`Basic-${item.title}`}
                              htmlFor={`Status-${item.title}`}
                              className="d-flex align-items-center"
                              style={{display: 'flex'}}
                            >
                              <span style={{fontSize: 'var(--font-medium)', fontWeight: 'var(--font-weight-medium)', color: '#495370', marginRight: '8px'}}>{item.title} <span style={{fontSize: 'var(--font-x-small)', fontWeight: '600'}}>{`(${item.value})`}</span></span>
                              <FontAwesomeIcon  icon={faXmark} color="#495370" style={{fontSize: 'var(--font-x-medium)', cursor: 'pointer'}} onClick={() => {this.removeAlreadyPresentBasicStatus(item.title);}}/>
                            </label>
                          </li>
                        ))}
                      </>}
                      
                      {alreadyAppliedFilters.statusFilters && alreadyAppliedFilters.statusFilters.isVisible && alreadyAppliedFilters.statusFilters.data &&
                      <>
                      {/* <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}> */}
                        {/* <h5 style={{fontSize: 'var(--font-medium)', fontWeight: 'var(--font-weight-medium)', color: '#495370', margin: '0', minWidth: '160px'}}>Status Filters</h5> */}
                        
                          {alreadyAppliedFilters.statusFilters.data.map((item) => (
                            <li key={item.text} style={{display: 'flex', padding: '8px', width: 'auto', background: 'white', padding: '8px', marginRight: '8px', borderRadius: '4px'}}>
                              <span style={{fontSize: 'var(--font-medium)', fontWeight: 'var(--font-weight-medium)', color: '#495370', marginRight: '8px'}}>{item.text}</span>
                              <label
                                key={item.text}
                                htmlFor={`Status-${item.text}`}
                                className="d-flex align-items-center"
                                style={{display: 'flex'}}
                                onClick={(e) => {this.removeAlreadyPresentStatus(`${item.value}`);}}
                              >
                                <FontAwesomeIcon  icon={faXmark} color="#495370" style={{fontSize: 'var(--font-x-medium)', cursor: 'pointer'}}/>
                              </label>
                            </li>
                          ))}
                        
                      {/* </div> */}
                      </>
                      }

                      {alreadyAppliedFilters.amountFilters && alreadyAppliedFilters.amountFilters.isVisible && alreadyAppliedFilters.amountFilters.data &&
                      <>
                        {/* <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}> */}
                          {/* <h5 style={{fontSize: 'var(--font-medium)', fontWeight: 'var(--font-weight-medium)', color: '#495370', margin: '0', minWidth: '160px'}}>Amount Filters</h5> */}
                            {alreadyAppliedFilters.amountFilters.data.map((item) => (
                              <li key={item.text} style={(item && item.currency) ? {padding: '8px', width: 'auto', background: 'white', padding: '8px', marginRight: '8px', borderRadius: '4px'} : {display: 'none'}}>
                                <label
                                  key={`AAmount-${item.title}`}
                                  className="d-flex align-items-center"
                                  style={{display: 'flex'}}
                                >
                                  <span style={{fontSize: 'var(--font-medium)', fontWeight: 'var(--font-weight-medium)', color: '#495370', marginRight: '8px'}}>{item.title} <span style={{fontSize: 'var(--font-x-small)', fontWeight: '600'}}>{`(${item.currency} ${item.min} to ${item.currency} ${item.max})`}</span></span>
                                  <FontAwesomeIcon  icon={faXmark} color="#495370" style={{fontSize: 'var(--font-x-medium)', cursor: 'pointer'}} onClick={() => {this.removeAmountFilter(item.title)}}/>
                                </label>
                              </li>
                            ))}

                        {/* </div> */}
                      </>
                      }

                      {alreadyAppliedFilters.dateFilters && alreadyAppliedFilters.dateFilters.isVisible && alreadyAppliedFilters.dateFilters.data &&
                      <>
                        {/* <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}> */}
                          {/* <h5 style={{fontSize: 'var(--font-medium)', fontWeight: 'var(--font-weight-medium)', color: '#495370', margin: '0', minWidth: '160px'}}>Date Filters</h5> */}
                          {/* <ul style={{listStyle: 'none', padding: '0', width: '100%', margin: '0', display: 'flex'}}> */}
                            {alreadyAppliedFilters.dateFilters.data.map((item) => (
                              <li key={item.text} style={(item.startDate && item.startDate.length > 0) ? {padding: '8px', width: 'auto', background: 'white', padding: '8px', marginRight: '8px', borderRadius: '4px'} : {display: 'none'}}>
                                <label
                                  key={`ADate-${item.title}`}
                                  htmlFor={`Status-${item.text}`}
                                  className="d-flex align-items-center"
                                  style={{display: 'flex'}}
                                >
                                  <span style={{fontSize: 'var(--font-medium)', fontWeight: 'var(--font-weight-medium)', color: '#495370', marginRight: '8px'}}>{item.title} <span style={{fontSize: 'var(--font-x-small)', fontWeight: '600'}}>{`(${item.startDate} to ${item.endDate})`}</span></span>
                                  <FontAwesomeIcon  icon={faXmark} color="#495370" style={{fontSize: 'var(--font-x-medium)', cursor: 'pointer'}} onClick={() => {this.removeDateFilter(item.title)}}/>
                                </label>
                              </li>
                            ))}
                          {/* </ul> */}
                        {/* </div> */}
                            
                      </>
                      }
                    </ul>
                  </section>
                  </>}

                  {/* Other Filters */}
                  {/* {showProcessedTable && !this.state.validationFailed && */}
                  <>
                  <section style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '16px'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>

                      {/* Status Filters */}
                      <div className="dropdown" style={{marginRight: '24px'}}>
                          <button onFocus={()=> {console.log("TEST"); this.setState({isDateFilter: false, isAmountFilter: false })}} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{display: 'flex', alignItems: 'center', color: '#6654C3', border: 'none', outline: 'none', background: 'white'}}>
                            <FontAwesomeIcon icon={faFilter} /> <span style={{marginLeft: "12px", fontSize: 'var(--font-medium)', fontWeight: 'var(--font-weight-medium)'}}>Status Filters</span>
                          </button>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{padding: '4px', height: 'auto', minWidth: '216px', borderRadius: '4px', background: '#F1F1F1', border: 'none'}}>
                            <ul style={{listStyle: 'none', padding: '0', width: '100%', margin: '0'}}>
                              {status && status.map((item) => (
                                <li key={item.text} style={{padding: '8px', width: '100%'}}>
                                  <label
                                    key={item.text}
                                    htmlFor={`Status-${item.text}`}
                                    className="d-flex align-items-center cursor-pointer"
                                    style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}
                                  >
                                    <span htmlFor={`Status-${item.text}`} style={{fontSize: 'var(--font-medium)', fontWeight: 'var(--font-weight-medium)', color: '#495370'}}>{item.text}</span>
                                    <input
                                      id={`Status-${item.text}`}
                                      checked={item.isChecked}
                                      style={{
                                        borderRadius: "4px",
                                        height: "15px",
                                        width: "15px",
                                        cursor: "pointer",
                                        marginRight: '5px',
                                        backgroundColor: '#495370'
                                      }}
                                      type="checkbox"
                                      name={item.value}
                                      value={item}
                                      onChange={this.handleStatusChange}
                                    />
                                  </label>
                                </li>
                              ))}
                            </ul>
                          </div>
                      </div>

                      {/* Amount Filters */}
                      <div className="" style={{marginRight: '24px', position: 'relative'}}>
                          <button onClick={()=> {this.setState({isAmountFilter: !(this.state.isAmountFilter) , isDateFilter: false })}} type="button" id="dropdownMenuButtonAmount" style={{display: 'flex', alignItems: 'center', color: '#6654C3', border: 'none', outline: 'none', background: 'white'}}>
                            <FontAwesomeIcon icon={faFilterCircleDollar} /> <span style={{marginLeft: "12px", fontSize: 'var(--font-medium)', fontWeight: 'var(--font-weight-medium)'}}>Amount Filters</span>
                          </button>
                          <div id="dropdownDivButtonAmount" style={!isAmountFilter ? {display: 'none'} : {width: '340px',padding: '4px', position: "relative", padding: '4px', height: 'auto', minWidth: '310px', borderRadius: '4px', background: '#F1F1F1', border: 'none', position: "absolute", transform: "translate3d(-99px, 25px, 0px)", top: "0px", left: "100px", willChange: "transform", zIndex: '60'}}>
                            <ul style={{listStyle: 'none', padding: '0', width: '100%', margin: '0'}}>
                              <li className="avoidToggle" key={`Requested Amount`} style={{margin: '8px'}}>
                                <Grid item xs={4}>
                                <label
                                  htmlFor="requestedAmount"
                                  className="py-1"
                                  style={{ fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-medium)', color: '#495370' }}
                                >
                                  Requested Amount
                                </label>
                                <Grid container spacing={1} rowGap={2}>
                                  <Grid item xs={4}>
                                    <select
                                      id="requestedCcySelect"
                                      className="form-control"
                                      onChange={(e) =>
                                        this.setState({
                                          requestedCcy: e.target.value != "Currency" ? e.target.value : null,
                                        })
                                      }
                                    >
                                      <option>CCY</option>
                                      {this.state.currencyList &&
                                        this.state.currencyList.map((currency) => (
                                          <option key={currency} value={currency}>
                                            {currency}
                                          </option>
                                        ))}
                                    </select>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <input style={{width: '100px'}} type="number" placeholder="From" className="form-control" value={this.state.requestedMinAmount} onChange={(e) =>
                                      this.setState({
                                        requestedMinAmount: e.target.value,
                                      })
                                    } />
                                  </Grid>
                                  <Grid item xs={4}>
                                    <input style={{width: '100px'}} type="number" placeholder="To" className="form-control" value={this.state.requestedMaxAmount} onChange={(e) =>
                                      this.setState({
                                        requestedMaxAmount: e.target.value,
                                      })
                                    } />
                                  </Grid>
                                </Grid>
                                </Grid>
                              </li> 
                              <li className="avoidToggle" key={`Paid Amount`} style={{margin: '8px'}}>
                                <Grid item xs={4}>
                                <label
                                  htmlFor="paidAmount"
                                  className="py-1 avoidToggle"
                                  style={{ fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-medium)', color: '#495370' }}
                                >
                                  Paid Amount
                                </label>
                                <Grid className="avoidToggle" container spacing={1} rowGap={2}>
                                  <Grid item xs={4} >
                                    <select
                                      id="paidCcySelect"
                                      className="form-control avoidToggle"
                                      onChange={(e) =>
                                        this.setState({
                                          paidCcy: e.target.value != "Currency" ? e.target.value : null
                                        })
                                      }
                                    >
                                      <option className="avoidToggle">CCY</option>
                                      {this.state.currencyList &&
                                        this.state.currencyList.map((currency) => (
                                          <option className="avoidToggle" key={currency} value={currency}>
                                            {currency}
                                          </option>
                                        ))}
                                    </select>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <input style={{width: '100px'}} type="number" placeholder="From" className="form-control" value={paidMinAmount} onChange={(e) =>
                                      this.setState({
                                        paidMinAmount: e.target.value,
                                      })
                                    } />
                                  </Grid>
                                  <Grid item xs={4}>
                                    <input style={{width: '100px'}} type="number" placeholder="To" className="form-control" value={paidMaxAmount} onChange={(e) =>
                                      this.setState({
                                        paidMaxAmount: e.target.value,
                                      })
                                    } />
                                  </Grid>
                                </Grid>
                                </Grid>
                              </li>
                            </ul>
                          </div>
                      </div>

                      {/* Date Filters */}
                      <div className="" style={{marginRight: '24px', position: 'relative'}}>
                          <button onClick={()=> {this.setState({isDateFilter: !(this.state.isDateFilter), isAmountFilter: false })}} type="button" id="dateFilterMenuButton" style={{display: 'flex', alignItems: 'center', color: '#6654C3', border: 'none', outline: 'none', background: 'white'}}>
                            <FontAwesomeIcon icon={faCalendar} style={{marginBottom: '3px'}} /> <span style={{marginLeft: "12px", fontSize: 'var(--font-medium)', fontWeight: 'var(--font-weight-medium)'}}>Date Filters</span>
                          </button>
                          <div className="dropdown-menu-lg-end" style={!isDateFilter ? {display: 'none'} : {width: '340px',padding: '4px', position: "relative", padding: '4px', height: 'auto', minWidth: '310px', borderRadius: '4px', background: '#F1F1F1', border: 'none', position: "absolute", transform: "translate3d(-99px, 25px, 0px)", top: "0px", left: "-25px", willChange: "transform", zIndex: '60'}}>
                              <Grid container columnGap={1} rowGap={1} columns={{ xs: 1, md: 1 }} style={{position: "relative"}}>
                                <Grid item xs={3.2} style={{position: "relative"}}>
                                  <label
                                    className="py-1"
                                    style={{ fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-medium)', color: '#495370' }}
                                  >
                                    Create Date
                                  </label>
                                  <Grid container spacing={2}>
                                    <Grid item xs={6} style={{position: "relative"}}>
                                      <FormControl fullWidth>
                                        <MUIDatePicker
                                          name="CreatedStartDate"
                                          placeholder="From"
                                          value={receiptStartDate ? dayjs(receiptStartDate) : null}
                                          format={DateFormat.date}
                                          onChange={(e) => {
                                            let value = this.changeDateFormat(e);
                                            this.setState({ receiptStartDate: value })
                                          }}
                                        />
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <FormControl fullWidth>
                                        <MUIDatePicker
                                          name="CreatedEndDate"
                                          placeholder="To"
                                          value={receiptEndDate ? dayjs(receiptEndDate) : null}
                                          format={DateFormat.date}
                                          onChange={(e) => {
                                            let value = this.changeDateFormat(e);
                                            this.setState({ receiptEndDate: value })
                                          }}
                                        />
                                      </FormControl>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                        
                                <Grid item xs={3.2}>
                                  <label
                                    className="py-1"
                                    style={{ fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-medium)', color: '#495370' }}
                                  >
                                    Payment Date
                                  </label>
                                  <Grid container spacing={2}>
                                    <Grid item xs={6} >
                                      <FormControl fullWidth>
                                        <MUIDatePicker
                                          name="PaymentStartDate"
                                          placeholder="From"
                                          value={paymentStartDate ? dayjs(paymentStartDate) : null}
                                          format={DateFormat.date}
                                          onChange={(e) => {
                                            let value = this.changeDateFormat(e);
                                            this.setState({ paymentStartDate: value })
                                          }}
                                        />
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <FormControl fullWidth>
                                        <MUIDatePicker
                                          name="PaymentEndDate"
                                          placeholder="To"
                                          value={paymentEndDate ? dayjs(paymentEndDate) : null}
                                          format={DateFormat.date}
                                          onChange={(e) => {
                                            let value = this.changeDateFormat(e);
                                            this.setState({ paymentEndDate: value })
                                          }}
                                        />
                                      </FormControl>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                        
                                <Grid item xs={3.2}>
                                  <label
                                    className="py-1"
                                    style={{ fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-medium)', color: '#495370' }}
                                  >
                                    Cancellation Date
                                  </label>
                                  <Grid container spacing={2}>
                                    <Grid item xs={6} >
                                      <FormControl fullWidth>
                                        <MUIDatePicker
                                          name="cancellationFromDate"
                                          placeholder="From"
                                          value={cancellationFromDate ? dayjs(cancellationFromDate) : null}
                                          format={DateFormat.date}
                                          onChange={(e) => {
                                            let value = this.changeDateFormat(e);
                                            this.setState({ cancellationFromDate: value })
                                          }}
                                        />
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <FormControl fullWidth>
                                        <MUIDatePicker
                                          name="cancellationToDate"
                                          placeholder="To"
                                          value={cancellationToDate ? dayjs(cancellationToDate) : null}
                                          format={DateFormat.date}
                                          onChange={(e) => {
                                            let value = this.changeDateFormat(e);
                                            this.setState({ cancellationToDate: value })
                                          }}
                                        />
                                      </FormControl>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                          </div>
                      </div>

                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>

                      {/* Create new payment */}
                      <div style={{fontSize: 'var(--font-medium)', fontWeight: 'var(--font-weight-medium)', color: '#046CED', display: 'flex', alignContent: 'center', marginLeft: '24px',}}>
                        <a className="navItem" onClick={() => { this.navigateToNewPayment(); }} style={{display: 'block', minWidth: '120px', marginTop: '8px', marginleft: '1rem', color: '#6654C3', cursor: "pointer"}} id="pills-newTransaction-tab" data-toggle="pill" href="#pills-newTransaction" role="tab" aria-controls="pills-newTransaction" aria-selected="false">
                            <FontAwesomeIcon icon={faSquarePlus} style={{width: '16px', aspectRatio: 'auto'}} /> <span style={{marginLeft: '4px'}}>Create New Payment</span>
                        </a>
                      </div>

                      {/* Setting */}
                      {/* <button variant="contained" style={{ background: '#D9D9D9', width: '34px', height: '34px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', outline: 'none', border: 'none' }}>
                        <FontAwesomeIcon icon={faGear} color="#046CED"/>
                      </button> */}

                    </div>
                  </section>               
                  </>
                  {/* } */}

                  {/* Basic Search Filters */}
                  <Grid container mt={1} spacing={1} >
                  {TempStorage.loginUserRole === USER_TYPE.ADMIN_USER &&
                    <Grid item xs={12} md={4} xl={2}>
                      <label
                        htmlFor="merchants"
                        className="py-1"
                        style={{ whiteSpace: 'nowrap', fontWeight: 'var(--font-weight-normal)', fontSize: 'var(--font-x-medium)', overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        Merchants
                      </label>
                      <Autocomplete
                        disablePortal
                        id="merchantList"
                        options={merchantsList || []}
                        onChange={this.getMerchantId}
                        value={merchantsList ? merchantsList.find((v) => v.merchantName === this.state.selectedMerchant) : null}
                        getOptionLabel={(option) => `${option.merchantName}`}
                        renderInput={(params) => <TextField className="form-control merchantListDropDown" {...params} />}
                      />
                    </Grid>
                  }
                  <Grid item xs={12} md={4} xl={2}>
                    <label
                      htmlFor="benePayTransactionId"
                      className="py-1"
                      style={{  whiteSpace: 'nowrap', fontWeight: 'var(--font-weight-normal)', fontSize: 'var(--font-x-medium)', overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      BenePay Transaction Id
                    </label>
                    <input type="text" className="form-control" value={searchedBenePayTransactionId} onChange={(e) =>
                      this.setState({ searchedBenePayTransactionId: e.target.value })
                    } />
                  </Grid>
                  <Grid item xs={12} md={4} xl={2}>
                    <label
                      htmlFor="requestorTransactionId"
                      className="py-1"
                      style={{ whiteSpace: 'nowrap', fontWeight: 'var(--font-weight-normal)', fontSize: 'var(--font-x-medium)', overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      Requestor Transaction Id
                    </label>
                    <input type="text" className="form-control" value={searchedRequestorTransactionId} onChange={(e) =>
                      this.setState({ searchedRequestorTransactionId: e.target.value })
                    } />
                  </Grid>
                  <Grid item xs={12} md={4} xl={2}>
                    <label
                      htmlFor="PayerEmail"
                      className="py-1"
                      style={{ whiteSpace: 'nowrap', fontWeight: 'var(--font-weight-normal)', fontSize: 'var(--font-x-medium)', overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      Payer Email
                    </label>
                    <input type="text" className="form-control" value={payerEmail} onChange={(e) =>
                      this.setState({ payerEmail: e.target.value })
                    } />
                  </Grid>
                  <Grid item xs={12} md={4} xl={2}>
                    <label
                      htmlFor="PayerName"
                      className="py-1"
                      style={{ whiteSpace: 'nowrap', fontWeight: 'var(--font-weight-normal)', fontSize: 'var(--font-x-medium)', overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      Payer Name
                    </label>
                    <input type="text" className="form-control" value={payerName} onChange={(e) =>
                      this.setState({ payerName: e.target.value })
                    } />
                  </Grid>
                
                  {!(TempStorage.loginUserRole === USER_TYPE.ADMIN_USER) &&
                    <Grid item xs={12} md={4} xl={2}>
                      <label
                        htmlFor="collectionReference"
                        className="py-1"
                        style={{ whiteSpace: 'nowrap', fontWeight: 'var(--font-weight-normal)', fontSize: 'var(--font-x-medium)', overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        Collection Reference
                      </label>
                      <input type="text" className="form-control" value={collectionRef} onChange={(e) =>
                        this.setState({ collectionRef: e.target.value })
                      } />
                    </Grid>
                  }
                  </Grid>

                  {/* Apply Btns */}
                  <div className="d-flex justify-content-start" style={{marginTop: '24px'}}>
                  <span style={{ marginRight: "60px" }}>
                    <button
                      onClick={this.handleApplyClickPaymentSettlement}
                      style={{ padding:'8px 24px', marginRight: '8px', color: 'white', fontWeight: 'var(--font-weight-normal)', fontSize: 'var(--font-x-medium)', width: '154px', background: '#6654C3', outline: 'none', border: 'none', borderRadius: '4px' }} 
                    >
                      Search
                    </button>
                    <button
                      onClick={this.clearProcessedDetails}
                      style={{ padding:'8px 24px', fontWeight: 'var(--font-weight-normal)', fontSize: 'var(--font-x-medium)', width: '154px', background: '#C4CAD1', outline: 'none', border: 'none', borderRadius: '4px' }}
                    >
                      Clear
                    </button>
                  </span>
                  </div>
                  
                  {/* If result not found */}
                  <div style={{ float: "left" }}>
                  {this.state.noResultFound && (
                    <span
                      style={{
                        float: "left",
                        fontSize: 'var(--font-small)',
                        marginRight: "150px",
                        color: "red",
                        marginTop: '30px'
                      }}
                    >
                      {"No Transactions matching Search Criteria"}
                    </span>
                  )}
                  </div>
                </div>

                {/* Table Result */}
                {(showProcessedTable  && !this.state.validationFailed && parentTransactions && parentTransactions.length > 0) ? 
                <>
                  <div style={{marginTop: '20px'}}>
                    <Box sx={{ width: '100%', marginTop: '2%' }}>

                    {/* {this.state.searchedPaymentResultList && this.state.searchedPaymentResultList.length > 0 && 
                    <>
                      <ul>

                        {this.state.searchedPaymentResultList.map((item) => {
                          return (
                          <>

                          </>
                          )
                        })}
                      </ul>
                    </>} */}

                    {/* Download */}
                    <div style={{display: 'flex', justifyContent: 'flex-end'}} >

                      <button onClick={this.downloadTransactions} type="button" id="dropdownMenuButtonAmount" style={{display: 'flex', alignItems: 'center', color: '#6654C3', border: 'none', outline: 'none', background: 'white'}}>
                        <button variant="contained" style={{ background: '#D9D9D9', width: '34px', height: '34px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', outline: 'none', border: 'none' }}>
                          <FontAwesomeIcon icon={faDownload} color="#046CED"/>
                        </button>
                         <span style={{marginLeft: "12px", fontSize: 'var(--font-medium)', fontWeight: 'var(--font-weight-medium)'}}>Export</span>
                      </button>

                    </div>

                      {/**
                       * @author Ragavan
                       * Changed the normal table as a Datagrid - Start
                       */}
                      <DataGrid
                        rows={parentTransactions}
                        columns={columns}
                        className="serachedPaymentResultGridPagination"
                        onCellClick={this.handleCellClick}
                        rowHeight={72}
                        getRowId={(row) => row.transactionId} // Use a field that uniquely identifies each row
                        onSortModelChange={this.sortTransaction}
                        disableColumnSelector={true}  
                        disableColumnMenu={true}              
                        disableRowSelectionOnClick
                        disableColumnFilter
                        slots={{
                          noRowsOverlay: CustomNoRowsOverlay,
                        }}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: this.state.pageSize,
                            },
                          },
                          sorting: {
                            sortModel: [{ field: sortingBy, sort: sortingType }],
                          },
                        }}
                        sx={{
                          border: 0,
                          boxShadow: 0,
                          width: '100%',
                          "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#1976d233",
                            cursor: 'pointer',
                            overflow: 'visible !important',
                            zIndex: '50'
                          }
                        }}
                      />

                      {/* Pagination */}
                      <div id="PaginationWithDetails" style={{width: '100%', display:'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px'}}>
                        <Grid container spacing={2}>
                          <Grid item xl={6} lg={6} md={6} sm={6} xs={6} display="flex" alignContent="center" alignItems="center">
                            <Typography variant="body1" fontSize={16} fontWeight={500} style={{color: '#6654C3', width: '100%' }}>
                                Your search returned {totalPaymentsFound ? totalPaymentsFound : 0} payment requests
                            </Typography>
                          </Grid>
                        </Grid>
                        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                          <div style={{display: 'flex', alignItems: 'center', background: '#F1F1F1', height: 'auto', padding: '8px 16px', borderRadius: '7px'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                              {((apply2Click || apply1Click) && !this.state.rejectedFilePagination) && (
                                <ReactPaginate
                                  previousLabel={'<'}
                                  nextLabel={'>'}
                                  breakLabel={'...'}
                                  pageCount={this.state.totalPages}
                                  marginPagesDisplayed={1}
                                  pageRangeDisplayed={2}
                                  onPageChange={this.handlePageChange}
                                  containerClassName={'pagination justify-content-end my-auto'}
                                  pageClassName={'page-item bg-transparent border-0'}
                                  pageLinkClassName={'page-link rounded-lg mx-1 bg-transparent border-0'}
                                  previousClassName={'page-item bg-transparent border-0'}
                                  previousLinkClassName={'page-link rounded-lg mr-2 bg-transparent border-0'}
                                  nextClassName={'page-item bg-transparent border-0'}
                                  nextLinkClassName={'page-link rounded-lg ml-2 bg-transparent border-0'}
                                  breakClassName={'page-item rounded-lg mx-1 bg-transparent border-0'}
                                  breakLinkClassName={'page-link rounded-lg bg-transparent border-0'}
                                  activeClassName={'active bg-primary rounded-lg'}
                                  forcePage={this.state.initalPage}
                                />
                              )}
                            </div>
                            <FormControl>
                              <div style={{display: 'flex', minWidth: '180px', alignItems: 'center', marginLeft: '32px'}}>
                                <Typography gap={2} variant="body1" fontSize={17} fontWeight={500} style={{display: 'inline' }}>
                                  <span style={{fontSize: 'var(--font-x-small)', fontWeight: 'var(--font-weight-medium)', color: '#6654C3', marginRight: '5px'}}>Rows Per Page</span>
                                </Typography>
                                <Select
                                  size="small"
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={this.state.pageSize}
                                  onChange={this.handleRowsPerPage}
                                  sx={{width:72}}
                                >
                                  <MenuItem value={10} style={{color: '#6654C3'}}><span style={{color: '#6654C3'}}>10</span></MenuItem>
                                  <MenuItem value={15} style={{color: '#6654C3'}}><span style={{color: '#6654C3'}}>15</span></MenuItem>
                                  <MenuItem value={20} style={{color: '#6654C3'}}><span style={{color: '#6654C3'}}>20</span></MenuItem>
                                </Select>
                              </div>
                            </FormControl>
                            <div style={{display:'flex', minWidth: '200px', justifyContent: 'center', alignItems: 'center', marginLeft: '8px'}}>
                              <h5 style={{fontSize: 'var(--font-x-small)', fontWeight: 'var(--font-weight-medium)', color: '#6654C3', margin: '3px 5px 0px 0px'}}>Go to Page</h5>
                              <input min={1} max={this.state.totalPages} style={{width: '56px', background: 'white', padding: '4px', border: '1px solid #6654C3', textAlign: 'center'}} type="number" placeholder={pageNo} className="form-control" value={this.state.pageNoForRedirect} onChange={(e) =>
                                this.setState({
                                  pageNoForRedirect: e.target.value,
                                })
                              } />
                              <button onClick={()=> {this.handlePageChange({selected: Number(pageNoForRedirect)-1});}} style={{fontSize: 'var(--font-large)', marginLeft: '4px', fontWeight: 'var(--font-weight-normal)', background: '#00000000', outline: 'none', border: 'none'}}><span style={{color: '#6654C3'}}><FontAwesomeIcon icon={faAnglesRight} /></span></button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*
                      I have used this single ConfirmDialog for two purposes
                      1. Transaction cancellation popup
                      2. Cancellation success message popup */}
                      {showCancellationModal && !this.state.isDeviceMobile && (
                        <ConfirmDialog
                          open={true}
                          setOpen={true}
                        >
                          <Container maxWidth='sm'>
                            <Grid container rowSpacing={1}>
                              <Grid item xs={10}>
                                {showCancellationSuccessModal ?
                                  <>
                                    <Typography variant="body1" fontSize={20} fontWeight={600} style={{ color: '#0D5AB7' }}>
                                      <CheckCircleOutline color="success" fontSize="large" />&ensp; Transaction Successfully Cancelled
                                    </Typography>
                                  </>
                                  :
                                  <>
                                    <Typography variant="body1" fontSize={20} fontWeight={600} style={{ color: '#0D5AB7' }}>
                                      Cancel Transaction
                                    </Typography>
                                  </>
                                }
                              </Grid>
                              <Grid item xs={2} style={{ display: 'flex', justifyContent: 'end' }}>
                                <IconButton size="medium"
                                  onClick={() => this.setState({
                                    showCancellationModal: false,
                                    showCancellationSuccessModal: false,
                                    cancellationReason: '',
                                    transactionDetailsModal: false,
                                  })}
                                >
                                  <Close />
                                </IconButton>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography gap={2} variant="body1" fontSize={17} fontWeight={500} style={{ color: '#878787', display: 'inline' }}>
                                  BenePay Transaction Id:&nbsp;
                                </Typography>
                                <Typography gap={2} variant="body1" fontSize={17} style={{ color: 'rgb(106 158 222)', display: 'inline' }}>
                                  {selectedTransactionId}&ensp;
                                  <IconButton aria-label="Duplicate"
                                    onClick={() => { this.handleCopyClick(selectedTransactionId) }}
                                  >
                                    <FileCopyOutlinedIcon style={{ color: 'rgb(106 158 222)' }} />
                                  </IconButton>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Container>
                                
                          <Divider variant="middle" style={{ marginTop: '3%', borderWidth: '1px' }} />
                                
                          <Container maxWidth='sm'>
                            <Grid container rowSpacing={2} marginTop={2}>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  Amount
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  {selectedCollectionCurrency + ' ' + selectedFinalDueAmount}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  Status
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                {this.getStatusChip(selectedStatus)}
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  Creation Timestamp
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  {moment(selectedReceiptTimestamp).format(DateFormat.dateTime)}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  Payer
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  {selectedDebtorName}
                                </Typography>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  {selectedDebtorEmailId}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  Collection Reference
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  {selectedCollectionRefNumber}
                                </Typography>
                              </Grid>
                                
                              {showCancellationSuccessModal ?
                                <>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Reason for  Cancellation
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      {cancellationReason}
                                    </Typography>
                                  </Grid>
                              
                                  <Grid item xs={12} mt={4}>
                                    <Typography>
                                      Note: An email has been sent to {selectedDebtorEmailId} with information about the cancellation
                                    </Typography>
                                  </Grid>
                                </>
                                :
                                <>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Description
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      {selectedReasonForCharges}
                                    </Typography>
                                  </Grid>
                              
                                  <Grid item xs={12}>
                                    <Typography variant="body1" fontWeight={500} style={{ color: 'gray' }}>
                                      Enter Reason for Cancellation
                                    </Typography>
                                    <textarea
                                      rows="3"
                                      cols="50"
                                      className="transactionCancellation"
                                      onChange={(e) => this.setState({ cancellationReason: e.target.value })}
                                      value={cancellationReason}
                                    ></textarea>
                                  </Grid>
                              
                                  <Grid item xs={12}>
                                    <Typography variant="body1" fontWeight={500} style={{ color: 'gray' }}>
                                      Suggested Reasons
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={3}>
                                    <span className="suggestedReason"
                                      onClick={() => this.setState({ cancellationReason: "Already Paid" })}
                                    >
                                      Already Paid
                                    </span>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <span className="suggestedReason"
                                      onClick={() => this.setState({ cancellationReason: "Incorrectly sent earlier" })}
                                    >
                                      Incorrectly sent earlier
                                    </span>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <span className="suggestedReason"
                                      onClick={() => this.setState({ cancellationReason: "Payer requested cancellation" })}
                                    >
                                      Payer requested cancellation
                                    </span>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <span className="suggestedReason"
                                      onClick={() => this.setState({ cancellationReason: "Amount changed" })}
                                    >
                                      Amount changed
                                    </span>
                                  </Grid>
                              
                                  <Grid item xs={6} mt={2}>
                                    <Button variant="contained"
                                      style={{ backgroundColor: '#346799', width: '70%' }}
                                      onClick={this.submitCancellationRequest}
                                      disabled={!cancellationReason || loading}
                                    >
                                      Confirm
                                    </Button>
                                  </Grid>
                                  <Grid item xs={6} mt={2}>
                                    <Button variant="contained"
                                      style={{ backgroundColor: 'gray', width: '70%' }}
                                      onClick={() => this.setState({ showCancellationModal: false })}
                                    >
                                      Cancel
                                    </Button>
                                  </Grid>
                                </>
                              }
                            </Grid>
                          </Container>
                        </ConfirmDialog>
                      )}

                      {/**
                       * Transaction Details popup modal
                       * */}
                      {transactionDetailsModal && !this.state.isDeviceMobile && (
                        <ConfirmDialog
                          open={true}
                          setOpen={true}
                        >
                          <Container maxWidth='sm'>
                            <Grid container rowSpacing={1}>
                              <Grid item xs={10}>
                                <>
                                  <Typography variant="body1" fontSize={20} fontWeight={600} style={{ color: '#0D5AB7' }}>
                                    Transaction Details for
                                  </Typography>
                                </>
                              </Grid>
                              <Grid item xs={2} style={{ display: 'flex', justifyContent: 'end' }}>
                                <IconButton size="medium"
                                  onClick={() => this.setState({
                                    transactionDetailsModal: false,
                                  })}
                                >
                                  <Close />
                                </IconButton>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography gap={2} variant="body1" fontSize={17} fontWeight={500} style={{ color: '#878787', display: 'inline' }}>
                                  BenePay Transaction Id:&nbsp;
                                </Typography>
                                <Typography gap={2} variant="body1" fontSize={17} style={{ color: 'rgb(106 158 222)', display: 'inline' }}>
                                  {selectedTransactionId}&ensp;
                                  <IconButton aria-label="Duplicate"
                                    onClick={() => { this.handleCopyClick(selectedTransactionId) }}
                                  >
                                    <FileCopyOutlinedIcon style={{ color: 'rgb(106 158 222)' }} />
                                  </IconButton>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Container>
                                
                          <Divider variant="middle" style={{ marginTop: '3%', borderWidth: '1px' }} />
                                
                          <Container maxWidth='sm'>
                            <Grid container rowSpacing={2} marginTop={2}>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  Transaction Status
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                {this.getStatusChip(selectedStatus)}
                              </Grid>
                                
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  Create Timestamp
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  {moment(selectedCreateTimeStamp).format(DateFormat.dateTime)}
                                </Typography>
                              </Grid>
                                
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  Payer Name
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  {selectedDebtorName}
                                </Typography>
                              </Grid>
                                
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  Payer Email
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  {selectedDebtorEmailId}
                                </Typography>
                              </Grid>
                                
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  Due Date
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  {moment(selectedPaymentDueDate).format(DateFormat.date)}
                                </Typography>
                              </Grid>
                                
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  Collection Reference
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  {selectedCollectionRefNumber}
                                </Typography>
                              </Grid>
                                
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  Description
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  {selectedReasonForCollection}
                                </Typography>
                              </Grid>
                                
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  Charges/Taxes
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body1" fontSize={15} fontWeight={400}>
                                  {selectedCollectionCurrency + ' ' + (selectedCharges !== null ? selectedCharges : 0)}
                                </Typography>
                              </Grid>
                                
                              {selectedStatus == 'PAID' || selectedStatus == 'SETTLED' ?
                                <>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Payment Id
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      {selectedTransactionId}
                                    </Typography>
                                  </Grid>
                                </> : ''
                              }

                              {selectedStatus == 'SETTLED' ? '' :
                                <>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Requested Amount
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      {selectedCollectionCurrency + ' ' + selectedFinalDueAmount}
                                    </Typography>
                                  </Grid>
                                </>
                              }

                              {selectedStatus == 'AWAITING_PAYMENT' || selectedStatus == 'CANCELLED' || selectedStatus == 'EXPIRED' ? '' :
                                <>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Payment Confirmation Id
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" noWrap fontSize={15} fontWeight={400}>
                                      {selectedPaymentConfirmationId}
                                    </Typography>
                                  </Grid>
                            
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Paid Amount
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      {selectedPaymentCurrency + ' ' + selectedFinalPaymentAmount}
                                    </Typography>
                                  </Grid>
                                </>
                              }
                              {selectedStatus == 'PARTIALLY_REFUNDED' || selectedStatus == 'FULLY_REFUNDED' || selectedStatus == 'REFUNDED' || selectedStatus == 'CANCELLED' || selectedStatus == 'EXPIRED' ? '' :
                                <>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Payment Link
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={5}>
                                    <Typography gap={2} noWrap={true} variant="body1" fontSize={15} style={{ color: 'rgb(106 158 222)' }}>
                                      {selectedPaymentLink} &ensp;
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={1}>
                                    <IconButton aria-label="Duplicate" style={{ padding: '0' }}
                                      onClick={() => { this.handleCopyClick(selectedPaymentLink) }}
                                    >
                                      <FileCopyOutlinedIcon style={{ color: 'rgb(106 158 222)' }} />
                                    </IconButton>
                                  </Grid>
                                </>
                              }
                              {selectedStatus == 'AWAITING_PAYMENT' || selectedStatus == 'CANCELLED' || selectedStatus == 'EXPIRED' ? '' :
                                <>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Payment Method
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      {selectedCardBrand !== null && selectedCardBrand !== '' ? selectedCardBrand + ' ' + selectedPaymentMode : selectedPaymentMode}
                                    </Typography>
                                  </Grid>
                            
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Paid Timestamp
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      {moment(selectedPaymentCompletionTimestamp).format(DateFormat.dateTime)}
                                    </Typography>
                                  </Grid>
                            
                                </>
                              }
                              {selectedStatus == 'CANCELLED' ?
                                <>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Cancelled Timestamp
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      {moment(selectedCancelledTimestamp).format(DateFormat.dateTime)}
                                    </Typography>
                                  </Grid>
                            
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Cancellation Notes
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      {selectedReasonForCancellation}
                                    </Typography>
                                  </Grid>
                                </> : ''
                              }
                              {selectedStatus == 'CANCELLED' || selectedStatus == 'REFUNDED' || selectedStatus == 'FULLY_REFUNDED' || selectedStatus == 'PARTIALLY_REFUNDED' || selectedStatus == 'SETTLED' ? '' :
                                <>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Expiry Date
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      {moment(selectedPaymentExpiryDate).format(DateFormat.date)}
                                    </Typography>
                                  </Grid>
                                </>
                              }
                              {selectedStatus == 'PAID' || selectedStatus == 'CANCELLED' || selectedStatus == 'EXPIRED' ? '' :
                                <>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Payments
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography
                                      variant="body1"
                                      fontSize={15}
                                      fontWeight={400}
                                      style={selectedPaymentConfirmationId !== null && selectedPaymentConfirmationId !== '' ?
                                        { textDecoration: 'underline', cursor: 'pointer', color: 'blue' } : {}
                                      }
                                      onClick={() => {
                                        //  selectedPaymentConfirmationId !== null && selectedPaymentConfirmationId !== '' ? this.getPaymentDetails(selectedTransactionId) : '' 
                                        if (selectedPaymentConfirmationId !== null && selectedPaymentConfirmationId !== '' ){
                                          this.getPaymentDetails(selectedTransactionId);
                                        }
                                        }}
                                    >{selectedPaymentConfirmationId !== null && selectedPaymentConfirmationId !== '' ? 1 : 0}</Typography>
                                  </Grid>
                                </>
                              }
                              {selectedStatus == 'REFUNDED' || selectedStatus == 'FULLY_REFUNDED' || selectedStatus == 'PARTIALLY_REFUNDED' ?
                                <>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Refunds
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      {this.getRefundsCount(selectedTransactionId, selectedStatus)}
                                    </Typography>
                                  </Grid>
                            
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Refunded Amount
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      {this.getRefundsCount(selectedTransactionId, selectedStatus) !== 0 ? selectedFinalPaymentAmount : '-'}
                                    </Typography>
                                  </Grid>
                                </> : ''
                              }

                              {selectedFailedAttempts > 0 ?
                                <>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Failed Attempts
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      {selectedFailedAttempts}
                                    </Typography>
                                  </Grid>
                                </> : ''
                              }

                              {selectedStatus == 'REFUNDED' || selectedStatus == 'FULLY_REFUNDED' || selectedStatus == 'PARTIALLY_REFUNDED' || selectedStatus == 'SETTLED' ? '' :
                                <>
                                  <Grid item xs={6}>
                                    <Typography variant="body1" fontSize={15} fontWeight={400}>
                                      Invoice
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                  <Chip
                                      sx={{padding:1}}
                                      icon={<PictureAsPdf />}
                                      label="Click here to download Invoice"
                                      clickable
                                      color="primary"
                                      onClick={() => this.handleGenerateInvoice(selectedTransactionId)}
                                      />
                                  </Grid>
                                </>
                              }

                              <Grid container rowGap={4} columns={{ xs: 4, sm: 8, md: 12 }} mt={5}>
                                <Grid item xs={4}>
                                  <Button
                                    variant="contained"
                                    className="paymentDetailsActionButtons"
                                    disabled={transactionPaymenButtonRules.disableViewPaymentDetails}
                                    onClick={() => { this.getPaymentDetails(selectedTransactionId) }}
                                  >
                                    View Payment Details
                                  </Button>
                                </Grid>
                                <Grid item xs={4}>
                                  <Button
                                    variant="contained"
                                    className="paymentDetailsActionButtons"
                                    disabled={transactionPaymenButtonRules.disableViewFailedAttempts || selectedFailedAttempts == 0}
                                    onClick={this.handleFailedTransactions}
                                  >
                                    View Failed Attempts
                                  </Button>
                                </Grid>
                                <Grid item xs={4}>
                                  <Button
                                    variant="contained"
                                    className="paymentDetailsActionButtons"
                                    disabled={transactionPaymenButtonRules.disableViewRefundDetails}
                                    onClick={() => { this.handleRefundDetails(this.state.transactionParams) }}
                                  >
                                    View Refund Details
                                  </Button>
                                </Grid>
                            
                                <Grid item xs={4}>
                                  {/**
                                   * Now I am temporarily disabled
                                   * If add any condition use the condition "disabled={transactionPaymenButtonRules.disableDuplicate}"
                                   */}
                                  <Button variant="contained" className="paymentDetailsActionButtons" disabled>
                                    Duplicate
                                  </Button>
                                </Grid>
                                <Grid item xs={4}>
                                  <Button
                                    variant="contained"
                                    className="paymentDetailsActionButtons"
                                    disabled={transactionPaymenButtonRules.disableIssueRefund}
                                    onClick={(e) => {
                                      this.selectedItem = transactionDetails;
                                      this.refundClick(e, transactionDetails);
                                    }}
                                  >
                                    Issue Refund
                                  </Button>
                                </Grid>
                                <Grid item xs={4}>
                                  <Button
                                    variant="contained"
                                    className="paymentDetailsActionButtons"
                                    disabled={transactionPaymenButtonRules.disableCancelTransaction}
                                    onClick={(e) => { this.refundClick(e, transactionDetails) }}
                                  >
                                    Cancel Transaction
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Container>
                        </ConfirmDialog>
                      )}
                      {/**
                       * @author Ragavan
                       * Changed the normal table as a Datagrid - End
                       */}

                      {/* Reminder Modal */}
                      {showReminderModal && (
                        <ConfirmDialog
                          id="confirmDialogModal"
                          title="Warning"
                          open={true}
                          setOpen={true}
                          dialogPadding={0}
                        >
                          <b>Send Payment Reminder</b>
                          <br />
                          <br />
                      
                          <p>An email reminder will be sent to payer.. Please confirm</p>
                      
                          <ButtonSecondary
                            onClick={() =>
                              this.setState({ showReminderModal: false })
                            }
                            className="buttonSecondary"
                          >
                            Cancel
                          </ButtonSecondary>
                          <ButtonPrimary
                            className="buttonPrimary ml-1"
                            onClick={() => {
                              this.sendReminder();
                              this.setState({
                                showReminderModal: false,
                              })
                            }
                            }
                          >
                            Send Reminder
                          </ButtonPrimary>
                        </ConfirmDialog>
                      )}
                    </Box>

                    <TableContainer component={Paper} className="mt-4">
                      {/**
                        * @author Muthukumar
                        * Refund Confirmation modal
                        */}

                      {/**
                        * @author Ragavan
                        * I am changed the UI Bootstrap to MUI components
                        */}
                      {showRefundConfirmationModal && !this.state.isDeviceMobile && (
                        <ConfirmDialog
                          style={{ width: "2800px" }}
                          title="Warning"
                          open={true}
                        >
                          <Container maxWidth='sm'>
                            <Grid container rowSpacing={1}>
                              <Grid item xs={10}>
                                <>
                                  <Typography variant="body1" fontSize={20} fontWeight={600} style={{ color: '#0D5AB7' }}>
                                    Issue Refund for
                                  </Typography>
                                </>
                              </Grid>
                              <Grid item xs={2} style={{ display: 'flex', justifyContent: 'end' }}>
                                <IconButton size="medium"
                                  onClick={this.cancelRefund}
                                >
                                  <Close />
                                </IconButton>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography gap={2} variant="body1" fontSize={17} fontWeight={500} style={{ color: '#878787', display: 'inline' }}>
                                  BenePay Transaction Id:&nbsp;
                                </Typography>
                                <Typography gap={2} variant="body1" fontSize={17} style={{ color: 'rgb(106 158 222)', display: 'inline' }}>
                                  {this.selectedItem.transactionId}&ensp;
                                  <IconButton aria-label="Duplicate"
                                    onClick={() => { this.handleCopyClick(this.selectedItem.transactionId) }}
                                  >
                                    <FileCopyOutlinedIcon style={{ color: 'rgb(106 158 222)' }} />
                                  </IconButton>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Container>
                      
                          <Divider variant="middle" style={{ marginTop: '3%', borderWidth: '1px' }} />
                      
                          <Container maxWidth='sm'>
                            <Grid container rowSpacing={3} marginTop={2}>
                              <Grid item xs={12}>
                                <Typography>Select Refund Type</Typography>
                      
                                <FormControl>
                                  <Select
                                    aria-label="Select an Option"
                                    value={this.state.selectedOption}
                                    onChange={this.handleOnChange}
                                    style={{ height: '35px', width: '250px' }}
                                  >
                                    <MenuItem value="Full Refund">Fully Refund</MenuItem>
                                    <MenuItem value="Partial Refund">Partial Refund</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                      
                              <Grid item xs={12}>
                                <Typography>Refund Amount</Typography>
                      
                                <InputGroup >
                                  <InputGroup.Text >{this.state.refundCcy}</InputGroup.Text>
                                  <bForm.Control disabled={this.state.selectedOption == 'Full Refund'} style={{ maxWidth: '198px' }} onChange={this.handleRefundAmountChange}
                                    value={this.state.refundAmount}
                                  />
                                </InputGroup>
                              </Grid>
                      
                              <Grid item xs={12}>
                                <Typography>Reason For Refund</Typography>
                      
                                <textarea
                                  rows="3"
                                  style={{ width: "250px", fontSize: 'var(--font-medium)' }}
                                  className="transactionCancellation"
                                  placeholder={"Enter reason for refund"}
                                  onChange={this.handleRefundReason}
                                  value={this.state.refundReason}
                                ></textarea>
                              </Grid>
                      
                              <Grid item xs={6} mt={3}>
                                <Button variant="contained"
                                  style={{ backgroundColor: '#346799', width: '70%' }}
                                  onClick={this.confirmRefund} disabled={refundLoading}
                                >
                                  Confirm
                                </Button>
                              </Grid>
                              <Grid item xs={6} mt={3}>
                                <Button variant="contained"
                                  style={{ backgroundColor: 'gray', width: '70%' }}
                                  onClick={this.cancelRefund}
                                  disabled={refundLoading}
                                >
                                  Cancel
                                </Button>
                              </Grid>
                            </Grid>
                          </Container>
                      
                          <Backdrop
                            sx={{
                              color: "#fff",
                              zIndex: (theme) => theme.zIndex.drawer + 1,
                            }}
                            open={refundLoading}
                            onClick={this.handleClose}
                          >
                            <CircularProgress color="inherit" />
                          </Backdrop>
                        </ConfirmDialog>
                      )}

                      {/**
                        * @author Muthukumar
                        * Refund success modal
                        */}

                      {/**
                        * @author Ragavan
                        * I am changed the UI Bootstrap to MUI components
                        */}
                      {showRefundSuccessModal && !this.state.isDeviceMobile && (
                        <ConfirmDialog open={true} setOpen={true}>
                          <Container maxWidth='sm'>
                            <Grid container rowSpacing={1}>
                              <Grid item xs={11}>
                                <Typography variant="body1" fontSize={20} fontWeight={600} style={{ color: '#0D5AB7' }}>
                                  <CheckCircleOutline color="success" fontSize="large" />&ensp;Refund Successful For
                                </Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <IconButton
                                  aria-label="Close"
                                  onClick={this.confirmBack}
                                >
                                  <Close />
                                </IconButton>
                              </Grid>
                      
                              <Grid item xs={12}>
                                <Typography gap={2} variant="body1" fontSize={17} fontWeight={500} style={{ color: '#878787', display: 'inline' }}>
                                  BenePay Transaction Id:&nbsp;
                                </Typography>
                                <Typography gap={2} variant="body1" fontSize={17} style={{ color: 'rgb(106 158 222)', display: 'inline' }}>
                                  {this.selectedItem.transactionId}&ensp;
                                  <IconButton aria-label="Duplicate"
                                    onClick={() => { this.handleCopyClick(this.selectedItem.transactionId) }}
                                  >
                                    <FileCopyOutlinedIcon style={{ color: 'rgb(106 158 222)' }} />
                                  </IconButton>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Container>
                      
                          <Divider variant="middle" style={{ marginTop: '3%', borderWidth: '1px' }} />
                      
                          <Container maxWidth='sm'>
                            <Grid container rowSpacing={2} marginTop={2}>
                              <Grid item xs={5}>
                                <Typography fontSize={15}>Refund Id</Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography fontSize={15} sx={{ color: 'rgb(106 158 222)', display: 'inline', mr: 1 }}>
                                  {refundResponse.transactionId}
                                </Typography>
                                <IconButton style={{ padding: '0px' }} onClick={() => this.handleCopyClick(refundResponse.transactionId)} >
                                  <FileCopyOutlinedIcon style={{ color: 'rgb(106 158 222)' }} />
                                </IconButton>
                              </Grid>
                      
                              <Grid item xs={5}>
                                <Typography>Refund Amount</Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography>
                                {refundResponse.pgData.refundCurrency}{" "}{refundResponse.pgData.refundAmount}
                                </Typography>
                              </Grid>
                      
                              <Grid item xs={5}>
                                <Typography>Refunded to</Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography>{this.selectedItem.debtorName}</Typography>
                                <Typography>{this.selectedItem.debtorEmailId}</Typography>
                                <Typography>{this.selectedItem.cardBrand !== null ? this.selectedItem.cardBrand + " " + this.selectedItem.paymentMode : this.selectedItem.paymentMode}</Typography>
                              </Grid>
                      
                              <Grid item xs={5}>
                                <Typography>Refund Type</Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography>{refundResponse.refundType === "F" ? "Full" : refundResponse.refundType === "P" ? "Partially" : ''}</Typography>
                              </Grid>
                      
                              <Grid item xs={5}>
                                <Typography>Refund Timestamp</Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography>{moment(this.selectedItem.createTimeStamp).format(DateFormat.dateTime)}</Typography>
                              </Grid>
                      
                              <Grid item xs={5}>
                                <Typography>Refund Status</Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography>{this.getStatusChip(refundResponse.status)}</Typography>
                              </Grid>
                      
                              <Grid item xs={5}>
                                <Typography>Refund Notes</Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography>{refundResponse.refundReason}</Typography>
                              </Grid>
                            </Grid>
                          </Container>
                        </ConfirmDialog>
                      )}

                      {/**
                       * @author Bharath
                       * Refund Failure Modal
                       * */}
                       
                      {showFailureModal && !this.state.isDeviceMobile && (
                        <ConfirmDialog title="Warning" open={true} setOpen={true}>
                          <Container maxWidth="sm">
                            <Grid container rowSpacing={3}>
                              <Grid item xs={11}>
                                <Typography variant="body1" fontSize={20} fontWeight={600} style={{ color: '#0D5AB7' }}>
                                  <HighlightOffIcon color="error" fontSize="large" />&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;Refund Failed For
                                </Typography>
                              </Grid>
                              <Grid item xs={1} >
                                <IconButton aria-label="close" onClick={this.handlePaymentDetailsClose}>
                                  <CloseIcon />
                                </IconButton>
                              </Grid>
                      
                              <Grid item xs={5}>
                                <Typography fontSize={15}>BenePay Transaction Id</Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography fontSize={15} sx={{ color: 'rgb(106 158 222)', display: 'inline', mr: 1 }}>{this.selectedItem.transactionId}</Typography>
                                <IconButton style={{ padding: '0px' }} onClick={() => this.handleCopyClick(this.selectedItem.transactionId)} >
                                  <FileCopyOutlinedIcon style={{ color: 'rgb(106 158 222)' }} />
                                </IconButton>
                              </Grid>
                      
                              <Grid item xs={5}>
                                <Typography fontSize={15}>Failure Reason</Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography fontSize={15} sx={{ display: 'inline', mr: 1 }}>{refundResponse.errors[0].errorDescription}</Typography>
                              </Grid>
                      
                              {/* <Grid item xs={6}>
                                <Typography fontSize={15}>Trace Id</Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography fontSize={15}>{refundResponse.traceId}</Typography>
                              </Grid>
                      
                              <Grid item xs={6}>
                                <Typography fontSize={15}>Refund Amount</Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography fontSize={15}>{refundResponse.pgData.refundCurrency}&nbsp;&nbsp;&nbsp;{refundResponse.pgData.refundAmount}</Typography>
                              </Grid>
                      
                              <Grid item xs={6}>
                                <Typography fontSize={15}>Payer Name</Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography fontSize={15}>{this.selectedItem.debtorName}</Typography>
                              </Grid>
                      
                              <Grid item xs={6}>
                                <Typography fontSize={15}>Payer Email</Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography fontSize={15}>{this.selectedItem.debtorEmailId}</Typography>
                              </Grid>
                      
                              <Grid item xs={6}>
                                <Typography fontSize={15}>Payment Method</Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography fontSize={15}>{this.selectedItem.cardBrand !== null ? this.selectedItem.cardBrand + " " + this.selectedItem.paymentMode : this.selectedItem.paymentMode}</Typography>
                              </Grid>
                      
                              <Grid item xs={6}>
                                <Typography fontSize={15}>Refund Type</Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography fontSize={15}>{this.selectedItem.refundType === "F" ? "Full" : this.selectedItem.refundType === "P" ? "Partially" : "Error"}</Typography>
                              </Grid>
                      
                              <Grid item xs={6}>
                                <Typography fontSize={15}>Refund Attempt Timestamp</Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography fontSize={15}>{moment(refundResponse.refundAttemptTimestamp).format(DateFormat.dateTime)}</Typography>
                              </Grid> */}
                      
                              <Grid item xs={12}>
                                <Typography color={'red'}>We seem to be experiencing some technical issues at the moment. Please retry after sometime. if the issue persists, please contact BenePay.</Typography>
                              </Grid>
                            </Grid>
                          </Container>
                        </ConfirmDialog>
                      )}
                    </TableContainer>
                  </div>
                </>
                :
                <>
                  {!loading && 
                  <>
                    {isFirstTimeSearch ? 
                    <>
                      <div style={{marginTop: '20px', height: '320px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <p>Search for results</p>
                      </div>
                    </>
                    : 
                    <>
                      <div style={{marginTop: '20px', height: '320px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CustomNoRowsOverlay />
                      </div>
                    </>}
                  </>
                  }
                </>
                }
              </div>
              <div className="tab-pane fade" id="pills-refunds" role="tabpanel" aria-labelledby="pills-refunds-tab" style={{width: '100%'}}>Refunds</div>
            </div>
        </section>

        {false && (
          <Box mt={1}>

            <Box mt={3}>
              <Card className="pb-5 pt-2 px-3">
                <CardContent>
                  <ul
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "5px",
                      width: "100%",
                      marginTop: "-20px",
                      paddingBottom: '20px',
                      display: 'flex',
                      justifyContent: 'flex-start'
                    }}
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <a
                        style={{ padding: '8px 20px' }}
                        className="nav-link active"
                        onClick={this.processedClick}
                        id="pills-processed-by-benepay-tab"
                        data-toggle="pill"
                        href="#pills-processed-by-benepay"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        Transactions
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        style={{ padding: '8px 20px' }}
                        className="nav-link"
                        onClick={this.failedPaymentNavigationHandler}
                        id="pills-processed-by-benepay-tab"
                        data-toggle="pill"
                        href="#pills-failed-payment-attempts"
                        role="tab"
                        aria-controls="pills-failed-payments"
                        aria-selected="true"
                      >
                        Failed Payment Attempts
                      </a>
                    </li>
                    {/* <li className="nav-item" role="presentation">
                      <a
                        style={{
                          padding: '8px 20px',
                          marginLeft: "2px",
                        }}
                        className="nav-link"
                        onClick={this.rejectedClick}
                        id="pills-profile-tab"
                        data-toggle="pill"
                        href="#pills-profile"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                      >
                       Rejected Files
                      </a>
                    </li> */}
                  </ul>

                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-processed-by-benepay"
                      role="tabpanel"
                      aria-labelledby="pills-processed-by-benepay-tab"
                    >
                      {/**
                       * Start of @author ragavan
                       * Modification of transaction search screen
                       */}

                      <Grid container className="mt-4" columnGap={3} rowGap={2} columns={{ xs: 4, md: 12 }}>
                        <Grid item xs={3.2}>
                          <label
                            className="py-1"
                            style={{ fontWeight: 'var(--font-weight-medium)' }}
                          >
                            Create Date
                          </label>
                          <Grid container spacing={2}>
                            <Grid item xs={6} >
                              <FormControl fullWidth>
                                <MUIDatePicker
                                  name="CreatedStartDate"
                                  placeholder="From"
                                  value={receiptStartDate ? dayjs(receiptStartDate) : null}
                                  format={DateFormat.date}
                                  onChange={(e) => {
                                    let value = this.changeDateFormat(e);
                                    this.setState({ receiptStartDate: value })
                                  }}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl fullWidth>
                                <MUIDatePicker
                                  name="CreatedEndDate"
                                  placeholder="To"
                                  value={receiptEndDate ? dayjs(receiptEndDate) : null}
                                  format={DateFormat.date}
                                  onChange={(e) => {
                                    let value = this.changeDateFormat(e);
                                    this.setState({ receiptEndDate: value })
                                  }}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={3.2}>
                          <label
                            className="py-1"
                            style={{ fontWeight: 'var(--font-weight-medium)' }}
                          >
                            Payment Date
                          </label>
                          <Grid container spacing={2}>
                            <Grid item xs={6} >
                              <FormControl fullWidth>
                                <MUIDatePicker
                                  name="PaymentStartDate"
                                  placeholder="From"
                                  value={paymentStartDate ? dayjs(paymentStartDate) : null}
                                  format={DateFormat.date}
                                  onChange={(e) => {
                                    let value = this.changeDateFormat(e);
                                    this.setState({ paymentStartDate: value })
                                  }}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl fullWidth>
                                <MUIDatePicker
                                  name="PaymentEndDate"
                                  placeholder="To"
                                  value={paymentEndDate ? dayjs(paymentEndDate) : null}
                                  format={DateFormat.date}
                                  onChange={(e) => {
                                    let value = this.changeDateFormat(e);
                                    this.setState({ paymentEndDate: value })
                                  }}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={3.2}>
                          <label
                            className="py-1"
                            style={{ fontWeight: 'var(--font-weight-medium)' }}
                          >
                            Cancellation Date
                          </label>
                          <Grid container spacing={2}>
                            <Grid item xs={6} >
                              <FormControl fullWidth>
                                <MUIDatePicker
                                  name="cancellationFromDate"
                                  placeholder="From"
                                  value={cancellationFromDate ? dayjs(cancellationFromDate) : null}
                                  format={DateFormat.date}
                                  onChange={(e) => {
                                    let value = this.changeDateFormat(e);
                                    this.setState({ cancellationFromDate: value })
                                  }}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl fullWidth>
                                <MUIDatePicker
                                  name="cancellationToDate"
                                  placeholder="To"
                                  value={cancellationToDate ? dayjs(cancellationToDate) : null}
                                  format={DateFormat.date}
                                  onChange={(e) => {
                                    let value = this.changeDateFormat(e);
                                    this.setState({ cancellationToDate: value })
                                  }}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid container className="mt-1" spacing={3} columns={{ xs: 4, md: 12 }}>
                        {TempStorage.loginUserRole === USER_TYPE.ADMIN_USER &&
                          <Grid item xs={12} md={2} xl={2}>
                            <label
                              htmlFor="collectionReference"
                              className="py-1"
                              style={{ fontWeight: 'var(--font-weight-medium)' }}
                            >
                              Collection Reference
                            </label>
                            <input type="text" className="form-control" value={collectionRef} onChange={(e) =>
                              this.setState({ collectionRef: e.target.value })
                            } />
                          </Grid>
                        }
                      </Grid>
                      {/* End of author ragavan */}

                    </div>
                  </div>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}

        {paymentSettlementModel && (
          <ConfirmDialog
            style={{ width: "200px" }}
            title="Warning"
            open={true}
            setOpen={true}
          >
            <b>Settlement Request</b>
            <br />
            <br />

            <Grid container>
              <Grid item xs={3}>
                <p className="mb-0 h-100 d-flex align-items-center">
                  Settlement Date
                </p>
              </Grid>
              <Grid item xs={3} md={8}>
                <Grid container>
                  <Grid item xs={12} md={5}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <input
                        style={{
                          marginLeft: "2px",
                          height: "40px",
                          padding: "5px",
                        }}
                        type="date"
                        onChange={(e) =>
                          this.setState({ settlementDate: e.target.value })
                        }
                        value={this.state.settlementDate}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div className="mt-4">
              <ButtonPrimary onClick={this.downloadSettlementFile} disabled={loading || !settlementDate}>
                Confirm
              </ButtonPrimary>
              <ButtonPrimary
                onClick={this.cancelSettlement}
                style={{ marginLeft: "5px" }}
                disabled={loading}
              >
                Cancel
              </ButtonPrimary>
            </div>
          </ConfirmDialog>
        )}

        {this.state.rejectedTableShow && (
          <div className="mt-4 ">
            {/* <div className="row ">
            <div className="search-records">
              <spans
                style={{
                  float: "left",
                  fontSize: "14px",
                  marginRight: "150px",
                  color: "blue",
                }}
              >
                Your Search returned {this.state.serachedRejectedPaymentResultList.length} Rejected transactions
              </spans>
            </div>
            <div className="download-csv">
              <ButtonPrimary onClick={this.downloadTransactions}>
                Download as CSV
              </ButtonPrimary>
            </div>
          </div> */}
            <TableContainer component={Paper} className="mt-4">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ cursor: "pointer", textAlign: "center" }} onClick={() => { this.sortingData("receivedDate", "Reject") }}>Create   Timestamp{<button className={`${this.state.coltype === "receivedDate" && this.state.order === "ascn"
                      ? "sort-button"
                      : "sort-button sort-reverse"}`}>▲</button>}
                    </TableCell>
                    <TableCell align="right" style={{ cursor: "pointer" }} onClick={() => { this.sortingData("errorCode", "Reject") }}>Error Code{<button className={`${this.state.coltype === "errorCode" && this.state.order === "ascn"
                      ? "sort-button"
                      : "sort-button sort-reverse"}`}>▲</button>}
                    </TableCell>
                    <TableCell align="right">
                      Error Description
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.serachedRejectedPaymentResultList.map(
                    (item, index) => (
                      <TableRow key={index}>
                        <TableCell className={"p-0"}>
                          {moment(item?.receivedDate).format(DateFormat.date)} <br /> {moment(item?.receivedDate).format(DateFormat.time)}
                        </TableCell>
                        <TableCell align="right">{item?.errorCode}</TableCell>
                        <TableCell align="right">{item?.errorDesc}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>

{/* ----------------------------------------------------------------------------------- */}

      <div id="mobileScreen" className={"position-relative"}>
        {/* Loading */}
        {loading && (<div id="semiTransparenDiv"></div>)}
        {/* Search Bar */}
        <div id="searchBarMobile" className="w-100 px-2 mt-3" >
          <div className="d-flex w-100 pl-2 overflow-hidden">
            <input placeholder="Search By Requestor Transaction Id" className="py-2 w-100 bg-transparent text-xs outline-none border-none" value={this.state.searchedRequestorTransactionId} onChange={(e) => this.setState({ searchedRequestorTransactionId: e.target.value })}></input>
            <div className="bg-primary d-flex justify-content-center align-items-center px-2" onClick={() => { this.handleApplyClickPaymentSettlement(); }}>
              <SearchIcon className="text-white" />
            </div>
          </div>
        </div>
        {/* Filters */}
        <div className="w-100 px-2 py-2 mb-2 mt-1 d-flex justify-content-between">
          <div className="d-flex">
            {/* Status Filter */}
            <div className="dropdown mr-1">
              <button id="statusDropDown" onClick={() => {
                document.getElementById('statusMenu').classList.toggle('d-block');
                document.getElementById('creationDateMenu').classList.remove('d-block');
              }}
                className="dropdown-toggle px-3 py-1 bg-transparent text-md">
                Status
              </button>
              <ul id="statusMenu" className="dropdown-menu py-0 overflow-hidden" >
                <li className="w-100 bg-primary text-white avoidToggle d-flex justify-content-between align-items-center py-1 px-1"><h6 className="text-center avoidToggle my-auto text-xs">Status</h6><CloseIcon /></li>
                {status.map((item) => (
                  <li className="px-1 mb-1" key={item.text}>
                    <label
                      key={item.text}
                      className="d-flex align-items-center cursor-pointer avoidToggle"
                    >
                      <input
                        checked={item.isChecked}
                        className="avoidToggle status-menu-option-mobile"
                        type="checkbox"
                        name={item.value}
                        value={item}
                        onChange={this.handleStatusChange}
                      />
                      {item.text}
                    </label>
                  </li>
                ))}
                <li className="w-100 px-2 py-1 avoidToggle">
                  <button className="btn w-100 bg-primary text-white text-center avoidToggle rounded py-1" onClick={() => { document.getElementById('statusMenu').classList.remove('d-block'); this.handleApplyClickPaymentSettlement(); }} style={{ outline: 'none' }}>Apply</button>
                </li>
              </ul>
            </div>
            {/* Creation Date Filter */}
            <div className="dropdown mx-1">
              <button id="creationDateDropDown" onClick={() => {
                document.getElementById('creationDateMenu').classList.toggle('d-block');
                document.getElementById('statusMenu').classList.remove('d-block');
              }}
                className="dropdown-toggle px-3 py-1 bg-transparent text-md text-xs"
              >
                Creation Date
              </button>
              <ul id="creationDateMenu" className="dropdown-menu py-0">
                <li className="w-100 bg-primary text-white avoidToggle d-flex justify-content-between align-items-center py-1 px-1">
                  <h6 className="text-center avoidToggle my-auto">Creation Date</h6><CloseIcon />
                </li>
                <li className="my-1 px-1">
                  <label className="avoidToggle mb-1 ml-1">Start Date</label>
                  {/**
                   * @author Ragavan
                   * Changed the DatePicker to an MUIDatePicker
                   * For 'receiptStartDate' and 'receiptEndDate' fields are not working
                   * Because the Date Process is different
                   */}
                  <MUIDatePicker
                    name="receiptStartDate"
                    id="receiptStartDate" className="avoidToggle mb-1 w-100"
                    placeholder={DateFormat.date}
                    value={receiptStartDate ? dayjs(receiptStartDate) : null}
                    format={DateFormat.date}
                    onChange={(e) => {
                      let value = this.changeDateFormat(e);
                      this.setState({ receiptStartDate: value })
                    }}
                  />
                </li>
                <li className="my-1 px-1">
                  <label className="mb-1 ml-1">End Date</label>
                  <MUIDatePicker
                    name="CreatedEndDate"
                    id="receiptEndDate" className="avoidToggle mb-1 w-100"
                    placeholder={DateFormat.date}
                    value={receiptEndDate ? dayjs(receiptEndDate) : null}
                    format={DateFormat.date}
                    onChange={(e) => {
                      let value = this.changeDateFormat(e);
                      this.setState({ receiptEndDate: value })
                    }}
                  />
                </li>
                <li className="w-100 px-2 py-1 avoidToggle">
                  <button className="btn w-100 bg-primary text-white text-center avoidToggle rounded py-1 outline-none" onClick={() => { document.getElementById('creationDateMenu').classList.toggle('d-block'); this.handleApplyClickPaymentSettlement(); }}>Apply</button>
                </li>
              </ul>
            </div>
          </div>
          <button className="dropdown-toggle px-3 py-1 bg-transparent text-md text-xs" id="filterDropDown"
            onClick={this.openMobileViewFilter}
          >
            More Filters
          </button>
        </div>

        {/* Filter Menu */}
        <Slide direction="left" in={mobileViewFilterModal} mountOnEnter unmountOnExit>
          <Card sx={{ position: "absolute", width: '100%', top: "0", zIndex: 10, overflow: 'unset' }}>
            <ul className="p-0">
              <li className="bg-primary text-white avoidToggle d-flex justify-content-between align-items-center py-3 px-4">
                <h6 className="text-center avoidToggle my-auto d-flex align-items-center">
                  <CloseIcon className="mr-2"
                    onClick={() => {
                      this.setState({ mobileViewFilterModal: false })
                    }}
                  />
                  Filters
                </h6>
                <button className="d-flex align-items-center m-0 p-0 bg-transparent text-white outline-none border-none"
                  onClick={() => {
                    this.clearProcessedDetails();
                    this.setState({ mobileViewFilterModal: false });
                    this.handleApplyClickPaymentSettlement();
                  }}
                >
                  Clear
                </button>
              </li>

              <li className="text-white avoidToggle d-flex justify-content-between align-items-center py-2 px-4 bg-mobile-secondary">
                <label htmlFor="benePayTransactionId" >
                  BenePay Transaction Id
                </label>
              </li>
              <li className="avoidToggle d-flex justify-content-center align-items-center py-2 px-4">
                <input type="text" placeholder="BenePay Transaction Id" className="form-control" value={searchedBenePayTransactionId} onChange={(e) =>
                  this.setState({ searchedBenePayTransactionId: e.target.value })
                } />
              </li>

              <li className="text-white avoidToggle d-flex justify-content-between align-items-center py-2 px-4 mt-3 bg-mobile-secondary">
                <label htmlFor="requestorTransactionId">
                  Requestor Transaction Id
                </label>
              </li>
              <li className="avoidToggle d-flex justify-content-center align-items-center py-2 px-4">
                <input type="text" placeholder="Requestor Transaction Id" className="form-control" value={searchedRequestorTransactionId} onChange={(e) =>
                  this.setState({ searchedRequestorTransactionId: e.target.value })
                } />
              </li>

              <li className="text-white avoidToggle d-flex justify-content-between align-items-center py-2 px-4 mt-3 bg-mobile-secondary">
                <label htmlFor="payerEmail">
                  Payer Email
                </label>
              </li>
              <li className="avoidToggle d-flex justify-content-center align-items-center py-2 px-4">
                <input type="text" placeholder="Payer Email" className="form-control" value={payerEmail} onChange={(e) =>
                  this.setState({ payerEmail: e.target.value })
                } />
              </li>

              <li className="text-white avoidToggle d-flex justify-content-between align-items-center py-2 px-4 mt-3 bg-mobile-secondary">
                <label htmlFor="payerName" className="avoidToggle">Payer Name</label>
              </li>
              <li className="avoidToggle d-flex justify-content-center align-items-center py-2 px-4">
                <div className="d-flex justify-content-start align-items-center w-100 avoidToggle">
                  <input id="payerName" type="text" className="form-control w-100 avoidToggle" placeholder="Payer Name" value={this.state.payerName} onChange={(e) => this.setState({ payerName: e.target.value })} />
                </div>
              </li>
              <li className="text-white avoidToggle d-flex justify-content-between align-items-center py-2 px-4 mt-3 bg-mobile-secondary">
                <label htmlFor="collectionReference" className="avoidToggle">Collection Reference</label>
              </li>
              <li className="avoidToggle d-flex justify-content-center align-items-center py-2 px-4">
                <input id="collectionReference" type="text" className="form-control w-100 avoidToggle" placeholder="Collection Reference" value={this.state.collectionRef} onChange={(e) => this.setState({ collectionRef: e.target.value, })} />
              </li>

              <li className="text-white avoidToggle d-flex justify-content-between align-items-center py-2 px-4 mt-3 bg-mobile-secondary">
                <label htmlFor="paymentDate" className="avoidToggle">Payment Date</label>
              </li>
              <li className="avoidToggle d-flex justify-content-center align-items-center py-2 px-4">
                <MUIDatePicker
                  name="PaymentStartDate"
                  placeholder="From"
                  className="form-control avoidToggle"
                  value={(paymentStartDate ? dayjs(paymentStartDate) : null)}
                  format={DateFormat.date}
                  onChange={(e) => {
                    let value = this.changeDateFormat(e);
                    this.setState({ paymentStartDate: value })
                  }}
                />&ensp;

                <MUIDatePicker
                  name="PaymentEndDate"
                  placeholder="To"
                  className="form-control avoidToggle"
                  value={paymentEndDate ? dayjs(paymentEndDate) : null}
                  format={DateFormat.date}
                  onChange={(e) => {
                    let value = this.changeDateFormat(e);
                    this.setState({ paymentEndDate: value })
                  }}
                />
              </li>

              <li className="text-white avoidToggle d-flex justify-content-between align-items-center py-2 px-4 mt-3 bg-mobile-secondary">
                <label htmlFor="cancellationDate" className="avoidToggle">Cancellation Date</label>
              </li>
              <li className="avoidToggle d-flex justify-content-center align-items-center py-2 px-4">
                <MUIDatePicker
                  name="cancellationFromDate"
                  placeholder="From" className="form-control w-40 avoidToggle"
                  value={cancellationFromDate ? dayjs(cancellationFromDate) : null}
                  format={DateFormat.date}
                  onChange={(e) => {
                    let value = this.changeDateFormat(e);
                    this.setState({ cancellationFromDate: value })
                  }}
                />&ensp;

                <MUIDatePicker
                  name="cancellationToDate"
                  placeholder="To" className="form-control w-50 avoidToggle"
                  value={cancellationToDate ? dayjs(cancellationToDate) : null}
                  format={DateFormat.date}
                  onChange={(e) => {
                    let value = this.changeDateFormat(e);
                    this.setState({ cancellationToDate: value })
                  }}
                />
              </li>

              <li className="text-white avoidToggle d-flex justify-content-between align-items-center py-2 px-4 mt-3 bg-mobile-secondary">
                <label htmlFor="requestedAmount" className="avoidToggle">Requested Amount</label>
              </li>
              <li className="avoidToggle d-flex justify-content-center align-items-center py-2 px-4">
                <div className="d-flex justify-content-start align-items-center avoidToggle">
                  <select
                    className="form-control ccy-input w-33 avoidToggle"
                    id="instructedAmount"
                    onChange={(e) =>
                      this.setState({
                        requestedCcy: e.target.value,
                      })
                    }
                  >
                    <option className="w-100 avoidToggle">Currency</option>
                    {this.state.currencyList &&
                      this.state.currencyList.map((currency) => (
                        <option key={currency} value={currency} className="w-100 avoidToggle">
                          {currency}
                        </option>
                      ))}
                  </select>
                  <input type="text" placeholder="From" className="form-control search-input w-33 avoidToggle" value={this.state.instructedAmountMin} onChange={(e) =>
                    this.setState({
                      requestedMinAmount: e.target.value,
                    })
                  } />
                  <input type="text" placeholder="To" className="form-control search-input w-33 avoidToggle" value={this.state.instructedAmountMax} onChange={(e) =>
                    this.setState({
                      requestedMaxAmount: e.target.value,
                    })
                  } />
                </div>
              </li>

              <li className="text-white avoidToggle d-flex justify-content-between align-items-center py-2 px-4 mt-3 bg-mobile-secondary">
                <label htmlFor="paidAmount" className="avoidToggle">
                  Paid Amount
                </label>
              </li>
              <li className="avoidToggle d-flex justify-content-center align-items-center py-2 px-4">
                <div className="d-flex justify-content-start align-items-center avoidToggle">
                  <select
                    id="paidCcySelect"
                    className="form-control ccy-input w-33 avoidToggle"
                    onChange={(e) =>
                      this.setState({
                        paidCcy: e.target.value != "Currency" ? e.target.value : null
                      })
                    }
                  >
                    <option className="w-100 avoidToggle">Currency</option>
                    {this.state.currencyList &&
                      this.state.currencyList.map((currency) => (
                        <option key={currency} value={currency} className="w-100 avoidToggle">
                          {currency}
                        </option>
                      ))}
                  </select>
                  <input type="number" placeholder="From" className="form-control search-input w-33 avoidToggle" value={paidMinAmount} onChange={(e) =>
                    this.setState({
                      paidMinAmount: e.target.value,
                    })
                  } />
                  <input type="number" placeholder="To" className="form-control search-input w-33 avoidToggle" value={paidMaxAmount} onChange={(e) =>
                    this.setState({
                      paidMaxAmount: e.target.value,
                    })
                  } />
                </div>
              </li>

              {TempStorage.loginUserRole === USER_TYPE.ADMIN_USER &&
                <>
                  <li className="text-white avoidToggle d-flex justify-content-between align-items-center py-2 px-4 mt-3 bg-mobile-secondary">
                    <label htmlFor="collectionReference" className="avoidToggle">Merchants</label>
                  </li>
                  <li className="avoidToggle merchantListInMobileView d-flex justify-content-center align-items-center py-2 px-4">
                    <Autocomplete
                      disablePortal
                      id="merchantList"
                      fullWidth
                      options={merchantsList || []}
                      onChange={this.getMerchantId}
                      value={merchantsList ? merchantsList.find((v) => v.merchantName === this.state.selectedMerchant) : null}
                      getOptionLabel={(option) => `${option.merchantName}`}
                      renderInput={(params) => <TextField className="merchantListInMobileView" {...params} />}
                    />
                  </li>
                </>
              }

              <li className="bg-primary text-white avoidToggle d-flex justify-content-center align-items-center py-3 px-4 mt-4"
                onClick={() => {
                  this.setState({ mobileViewFilterModal: false });
                  this.handleApplyClickPaymentSettlement();
                }}
              >
                <h5 className="btn text-center text-white p-0 m-0 my-auto d-flex align-items-center" >Apply</h5>
              </li>
            </ul>
          </Card>
        </Slide>

        {showProcessedTable && !this.state.validationFailed && (
          <div className="mt-2 w-100">
            <div id="mobileResultTable" className="w-100 h-full">
              {parentTransactions && parentTransactions.length !== 0 &&
                parentTransactions.map((item, index) => (
                  <React.Fragment key={index + item.transactionId}>
                    {item.transactionType.toUpperCase() === "PAYMENT" &&
                      (item.status === "AWAITING_PAYMENT" ||
                        item.status === "PAID" ||
                        item.status === "PARTIALLY_REFUNDED" ||
                        item.status === "FULLY_REFUNDED" ||
                        item.status.toUpperCase() === "EXPIRED" ||
                        item.status.toUpperCase() === "CANCELLED" ||
                        item.status === "REFUNDED") && (
                        <div className="px-2 mb-2" >
                          <div className="mb-2 text-xs">{moment(item?.receiptTimestamp).format('DD MMM YYYY')} {moment(item?.receiptTimestamp).format('HH:mm:ss')}</div>
                          <div className="w-100 d-flex justify-content-between align-items-center px-1 border-mobile-bottom">
                            <div className="d-flex justify-content-start align-items-center">
                              {/* <div onClick={() => this.setRowVisibility(item, index)}>
                                    {item.transactionType.toUpperCase() ==="PAYMENT" && item.paymentAttempts === 0 
                                    ? <AccountBalanceWalletIcon className="icon-color"/>
                                    : <UndoIcon className="icon-color"/>}
                                  </div> */}
                              <div className="ml-1">
                                <h6 className="mb-2 text-xs text-primary">{item?.debtorName}</h6>
                                <h6 className="text-xs-extra">{item?.status}</h6>
                              </div>
                            </div>
                            <div className="d-flex justify-content-end align-items-start">
                              <div>
                                <h6 className="mb-2 text-align-right text-xs text-primary">{item?.collectionCurrency} {item?.finalDueAmount}</h6>
                                <h6 className="text-xs-extra text-align-right">{item?.collectionReferenceNumber}</h6>
                              </div>
                              <div className="ml-2 position-relative overflow-visible">
                                <div className="dropdown">
                                  <MoreVertIcon className="icon-color" type="button" id="transactionMenuBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                                  <div id="mobileActionIcons" className="dropdown-menu" aria-labelledby="transactionMenuBtn">
                                    {item.status === "AWAITING_PAYMENT"
                                      ? <a className="dropdown-item" onClick={() => { const textField = document.createElement('textarea'); textField.innerText = item.paymentURL; document.body.appendChild(textField); textField.select(); textField.setSelectionRange(0, 99999); document.execCommand('copy'); textField.remove(); toast.success('Payment Link Copied to Clipboard'); }}><FileCopyIcon className="copyIcon actionIconsMobile" /> Copy Payment Link</a>
                                      : ""}
                                    {item.status === "AWAITING_PAYMENT"
                                      ? <a className="dropdown-item" onClick={(e) => this.refundClick(e, item)}><CancelIcon className="actionIconsMobile cancelIcon" /> Cancel Transaction</a>
                                      : ""}
                                    {item.status === "PAID" || item.status === "SETTLED" || item.status === "REFUNDED"
                                      ? <a className="dropdown-item" onClick={(e) => this.refundClick(e, item)}><UndoIcon className="actionIconsMobile refundIcon" /> Issue Refund</a>
                                      : ""}
                                    {item.status === "AWAITING_PAYMENT"
                                      ? <a className="dropdown-item" onClick={() => { this.setState({ showReminderModal: true, transactionIdForReminder: item?.transactionId }) }}><NotificationsIcon className="actionIconsMobile notificationIcon" /> Send Payment Reminder</a>
                                      : ""}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    {/* TODO: Need to move in seprate component
                      {selectedItem.isRowVisible && item.parentTransactionId !== null && item.parentTransactionId === selectedItem.transactionId && selectedItem.paymentAttempts > 0 && (
                          <div className="px-3 py-2" style={{backgroundColor: '#E0E0E0'}}>
                            <div className="py-2">{moment(item?.receiptTimestamp).format('DD MMM YYYY')} {moment(item?.receiptTimestamp).format('HH:mm:ss')}</div>
                            <div className="w-100 d-flex justify-content-between align-items-center px-1" style={{borderBottom: '1px solid #E0E0E0'}}>
                              <div className="d-flex justify-content-start align-items-center">
                                <div onClick={() => this.setRowVisibility(item, index)}>
                                  <AccountBalanceWalletIcon style={{color: '#4C73AE'}}/>
                                </div>
                                <div className="ml-3">
                                  <h6 className="mb-2">{item?.debtorName}</h6>
                                  <h6 className="text-xs">{item?.status}</h6>
                                </div>
                              </div>
                              <div className="d-flex justify-content-end align-items-start">
                                <div>
                                  <h6 className="mb-2" style={{textAlign: 'right'}}>{item?.collectionCurrency} {item?.finalDueAmount}</h6>
                                  <h6 className="text-xs" style={{textAlign: 'right'}}>{item?.collectionReferenceNumber}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        )} */}
                  </React.Fragment>
                ))}

              {parentTransactions && parentTransactions.length !== 0 && (<div>
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={''}
                  pageCount={this.state.totalPages}
                  marginPagesDisplayed={0}
                  pageRangeDisplayed={3}
                  onPageChange={this.handlePageChange}
                  containerClassName={'pagination justify-content-center'}
                  pageClassName={'page-item '}
                  pageLinkClassName={'page-link rounded-circle mx-1 my-2'}
                  previousClassName={'page-item'}
                  previousLinkClassName={'page-link rounded-circle mx-1 my-2'}
                  nextClassName={'page-item'}
                  nextLinkClassName={'page-link rounded-circle mx-1 my-2'}
                  breakClassName={'page-item'}
                  breakLinkClassName={'page-link'}
                  activeClassName={'active'}
                  forcePage={this.state.initalPage}
                />
              </div>)}

              {this.state.serachedPaymentResultList && this.state.serachedPaymentResultList.length === 0 && (<div>
                <h6 className="text-align-center my-5">No Transactions Found</h6>
              </div>)}

            </div>

            {showModal && this.state.isDeviceMobile && (
              <ConfirmDialog
                title="Warning"
                open={true}
                setOpen={true}
                isDeviceMobile={true}
                className="font-poppins dialog-width-mobile"
              >
                <h5 className="mb-4">Refund Request</h5>
                <span>
                  <h6 className="mb-2 font-weight-normal">Select Refund Type Mobile{" "}</h6>
                  <input
                    disabled={this.state.paymentAttempts > 0 ? true : false}
                    type="radio"
                    value="Full Refund"
                    id="fullRefund"
                    onChange={this.handleOnChange}
                    name="refundType"
                    checked={selectedOption === "Full Refund"}
                  />
                  <label htmlFor="fullRefund" className="ml-1 text-xs">Full Refund</label>
                  <input
                    className="ml-2"
                    type="radio"
                    value="Partial Refund"
                    id="partialRefund"
                    onChange={this.handleOnChange}
                    name="refundType"
                    checked={selectedOption === "Partial Refund"}
                  />
                  <label htmlFor="partialRefund" className="ml-1 text-xs">Partial Refund</label>
                </span>
                <br />
                <br />

                <div className="row ml-0">
                  <h6 className="font-weight-normal refund-amount-mobile">Refund Amount</h6>
                  <br />
                  <TextField
                    size="small"
                    disabled={true}
                    onChange={this.handleRefundCcyChange}
                    value={this.state.refundCcy}
                    className="ml-2 refund-amount-ccy-mobile"
                  ></TextField>
                  <TextField
                    type={"number"}
                    label="Amount"
                    size="small"
                    disabled={
                      this.state.selectedOption === "Full Refund" ? true : false
                    }
                    className="ml-1 pl-1 refund-amount-change-mobile"
                    onChange={this.handleRefundAmountChange}
                    value={this.state.refundAmount}
                  ></TextField>
                </div>
                <br />
                <span>
                  <h6 className="mb-2 font-weight-normal"> Reason For Refund</h6>
                  <textarea
                    className="refund-reason-mobile"
                    placeholder={"Enter reason for refund"}
                    onChange={this.handleRefundReason}
                    value={this.state.refundReason}
                  ></textarea>
                </span>
                <br />

                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={refundLoading}
                  onClick={this.handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>

                <ButtonPrimary onClick={this.confirmRefund} disabled={refundLoading} className="w-100 mt-1">
                  Confirm
                </ButtonPrimary>
                <button
                  onClick={this.cancelRefund}
                  className="close-btn-dialog-mobile"
                  disabled={refundLoading}
                >
                  <CloseIcon />
                </button>
              </ConfirmDialog>
            )}

            {showCancellationModal && this.state.isDeviceMobile && (
              <ConfirmDialog
                title="Warning"
                open={true}
                setOpen={true}
                dialogPadding={0}
                className="dialog-width-mobile"
              >
                <h5 className="mb-4">Cancellation Request</h5>

                <h6 className="font-weight-normal">Do you really want to Cancel this payment request</h6>

                <button
                  onClick={() =>
                    this.setState({ showCancellationModal: false })
                  }
                  className="close-btn-dialog-mobile"
                  disabled={refundLoading}
                >
                  <CloseIcon />
                </button>
                <ButtonPrimary
                  className="w-100 mt-1"
                  onClick={() =>
                    this.setState({
                      showCancellationModal: false,
                      showCancellationReason: true,
                    })
                  }
                >
                  Yes
                </ButtonPrimary>
              </ConfirmDialog>
            )}

            {/* Reminder Modal */}
            {showReminderModal && this.state.isDeviceMobile && (
              <ConfirmDialog
                id="confirmDialogModal"
                title="Warning"
                open={true}
                setOpen={true}
                dialogPadding={0}
                className="dialog-width-mobile"
              >
                <h5 className="mb-4">Send Payment Reminder</h5>

                <h6 className="font-weight-normal">An email reminder will be sent to payer.. Please confirm</h6>

                <button
                  onClick={() =>
                    this.setState({ showReminderModal: false })
                  }
                  className="close-btn-dialog-mobile"
                  disabled={refundLoading}
                >
                  <CloseIcon />
                </button>
                <ButtonPrimary
                  className="w-100 mt-1"
                  onClick={() => {
                    this.sendReminder();
                    this.setState({
                      showReminderModal: false,
                    })
                  }
                  }
                >
                  Send Reminder
                </ButtonPrimary>
              </ConfirmDialog>
            )}

            {showCancellationReason && this.state.isDeviceMobile && (
              <ConfirmDialog
                className="dialog-width-mobile"
                title="Warning"
                open={true}
                setOpen={true}
                dialogPadding={0}
              >
                <h6>Reason for cancellation</h6>

                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={isCancellationProcessing}
                  onClick={this.handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>

                <textarea
                  className="cancel-reason-mobile"
                  style={{fontSize: 'var(--font-medium)'}}
                  onChange={(e) =>
                    this.setState({ cancellationReason: e.target.value })
                  }
                  value={cancellationReason}
                ></textarea>

                <div className="suggested-reasons mt-2">
                  <span className="d-block py-2">
                    <h6 className="font-weight-normal">Suggested Reasons: </h6>
                  </span>
                  <div className="reasons">
                    <span
                      className="text-primary text-underline cursor-pointer text-xs"
                      onClick={() =>
                        this.setState({ cancellationReason: "Already Paid" })
                      }
                    >
                      Already Paid
                    </span>
                    <span
                      className="text-primary text-underline cursor-pointer ml-3 text-xs"
                      onClick={() =>
                        this.setState({
                          cancellationReason: "Incorrectly sent earlier",
                        })
                      }
                    >
                      Incorrectly sent earlier
                    </span>
                    <br />
                    <span
                      className="text-primary text-underline cursor-pointer text-xs"
                      onClick={() =>
                        this.setState({
                          cancellationReason: "Payer requested cancellation",
                        })
                      }
                    >
                      Payer requested cancellation
                    </span>
                    <span
                      className="ml-3 text-primary text-underline cursor-pointer text-xs"
                      onClick={() =>
                        this.setState({ cancellationReason: "Amount Charged" })
                      }
                    >
                      Amount Charged
                    </span>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    onClick={() =>
                      this.setState({ showCancellationReason: false, cancellationReason: '' })
                    }
                    className="close-btn-dialog-mobile"
                    disabled={refundLoading}
                  >
                    <CloseIcon />
                  </button>
                  <ButtonPrimary
                    className="w-100 mt-2 bg-primary text-white"
                    onClick={this.submitCancellationRequest}
                    disabled={!cancellationReason || loading}
                  >
                    <span className="text-white">Submit</span>
                  </ButtonPrimary>
                </div>
              </ConfirmDialog>
            )}

            {showConfirmationModal && this.state.isDeviceMobile && (
              <ConfirmDialog title="Warning" open={true} setOpen={true}>
                <h6 className="font-weight-normal" >Success!!! your refund has been successfully initiated</h6>
                <br />
                <ButtonPrimary className="w-100 mt-2" onClick={this.confirmBack}>OK</ButtonPrimary>
              </ConfirmDialog>
            )}

            {showFailureModal && this.state.isDeviceMobile && (
              <ConfirmDialog title="Warning" open={true} setOpen={true}>
                <b>
                  {
                    "An error occurred during the refund operation, please contact <contact@benepay.io> quoting the error details below."
                  }
                </b>
                <br />
                <b>
                  {
                    this.state.errorDesc
                  }
                </b>

                <br />
                <br />

                <ButtonPrimary className="w-100 mt-2" onClick={this.confirmBack}>OK</ButtonPrimary>
              </ConfirmDialog>
            )}

          </div>
        )}
      </div>

      {/**
       * @author Bharath
       * Payment Details screen
       * */}
      {paymentDetailsOpen && !this.state.isDeviceMobile && (
        <ConfirmDialog
          title="Warning"
          open={true}
          setOpen={true}
        >
          <Container maxWidth="sm">
            <Grid container rowSpacing={3}>
              <Grid item xs={11}>
                <Typography fontSize={20} sx={{ color: '#0D5AB7', fontWeight: 'bold' }}>Payment Details for</Typography>
              </Grid>
              <Grid item xs={1} >
                <IconButton aria-label="close" onClick={() => { this.handlePaymentDetailsClose() }}>
                  <CloseIcon />
                </IconButton>
              </Grid>

              <Grid item xs={5}>
                <Typography fontSize={15}>BenePay Transaction Id</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography fontSize={15} sx={{ color: 'rgb(106 158 222)', display: 'inline', mr: 1 }}>{paymentDetails.requestorTransactionId}&ensp;</Typography>
                <IconButton style={{ padding: '0px' }} onClick={() => this.handleCopyClick(paymentDetails.requestorTransactionId)} >
                  <FileCopyOutlinedIcon style={{ color: 'rgb(106 158 222)' }} />
                </IconButton>
              </Grid>

              <Grid item xs={12} mt={2}>
                <Typography fontSize={15} sx={{ color: 'rgb(106 158 222)', fontWeight: 'bold' }}>Payment 1 of 1</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontSize={15}>Payment Id</Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography fontSize={15} noWrap>{paymentDetails.requestorTransactionId}</Typography>
              </Grid>

              <Grid item xs={1}>
                <IconButton style={{ padding: '0px' }} onClick={() => this.handleCopyClick(paymentDetails.requestorTransactionId)} >
                  <FileCopyOutlinedIcon style={{ color: 'rgb(106 158 222)' }} />
                </IconButton>
              </Grid>

              <Grid item xs={6}>
                <Typography fontSize={15}>Payment Amount</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontSize={15}>{paymentDetails.paymentCurrency + ' ' + paymentDetails.paymentAmount}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontSize={15}>Payment Status</Typography>
              </Grid>
              <Grid item xs={6}>
                {this.getStatusChip('SUCCESS')}
              </Grid>

              <Grid item xs={6}>
                <Typography fontSize={15}>Payment Method</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontSize={15}>
                  {paymentDetails.cardBrand && paymentDetails.cardBrand !== null ? paymentDetails.cardBrand : "" + ' ' + paymentDetails.paymentMode && paymentDetails.paymentMode !== null ? paymentDetails.paymentMode : ""}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontSize={15}>Payment Confirmation Id</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontSize={15}>{paymentDetails.paymentConfirmationId}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontSize={15}>Payment Timestamp</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontSize={15}>{moment(paymentDetails.paymentDate).format(DateFormat.dateTime)}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontSize={15}>Payer</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontSize={15}>{paymentDetails.debtorName}</Typography>
                <Typography fontSize={15}>{paymentDetails.debtorEmailId}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontSize={15}>Collection Reference</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontSize={15}>{paymentDetails.collectionReferenceNumber}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontSize={15}>Description</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontSize={15}>{paymentDetails.reasonForCollection}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontSize={15}>Charges/Taxes</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontSize={15}>{paymentDetails.collectionAmountCurrency + ' ' + (paymentDetails.charges != null ? paymentDetails.charges : "0")}</Typography>
              </Grid>
              {selectedStatus !== 'SETTLED' &&
                <Grid item xs={6}>
                  <ButtonSecondary
                    disabled={transactionPaymenButtonRules.disableIssueRefund}
                    style={transactionPaymenButtonRules.disableIssueRefund ? {backgroundColor:'#E0E0E0'} :{}}
                    onClick={(e) => {
                      this.selectedItem = transactionDetails;
                      this.refundClick(e, transactionDetails);
                    }}
                  >
                    Issue refund
                  </ButtonSecondary>
                </Grid>
              }
            </Grid>
          </Container>
        </ConfirmDialog>
      )
      }

      {/**
       * @author Muthukumar
       * Transaction Refund Details Modal
       */}
      {/**
        * @author Ragavan
        * I am changed the UI Bootstrap to MUI components
        * Correct the fields base on the jira Description
        */}
      {refundModel && !this.state.isDeviceMobile && (
        <ConfirmDialog
          style={{ width: "2800px" }}
          title="Warning"
          open={true}
        >
          <Container maxWidth='sm'>
            <Grid container rowSpacing={1}>
              <Grid item xs={10}>
                <>
                  <Typography variant="body1" fontSize={20} fontWeight={600} style={{ color: '#0D5AB7' }}>
                    Refund Details
                  </Typography>
                </>
              </Grid>
              <Grid item xs={2} style={{ display: 'flex', justifyContent: 'end' }}>
                <IconButton size="medium"
                  onClick={() => { this.handlePaymentDetailsClose() }}
                >
                  <Close />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Typography gap={2} variant="body1" fontSize={17} fontWeight={500} style={{ color: '#878787', display: 'inline' }}>
                  BenePay Transaction Id:&nbsp;
                </Typography>
                <Typography gap={2} variant="body1" fontSize={17} style={{ color: 'rgb(106 158 222)', display: 'inline' }}>
                  {this.state.refundSelected.transactionId}&ensp;
                  <IconButton aria-label="Duplicate"
                    onClick={() => { this.handleCopyClick(this.state.refundSelected.transactionId) }}
                  >
                    <FileCopyOutlinedIcon style={{ color: 'rgb(106 158 222)' }} />
                  </IconButton>
                </Typography>
              </Grid>
            </Grid>
          </Container>

          {this.state.refundDetails.map(
            (item, index) => (
              <>
                <Divider variant="middle" style={{ marginTop: '3%', borderWidth: '1px' }} />

                <Container maxWidth="sm">
                  <Grid container rowSpacing={2}>
                    <Grid item xs={12} mt={2}>
                      <Typography fontSize={15} sx={{ color: 'rgb(106 158 222)', fontWeight: 'bold' }}>
                        Payemnt {index + 1} of {this.state.refundDetails.length}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} >
                      <Typography fontSize={15} >Refund Id</Typography>
                    </Grid>
                    <Grid item xs={8} >
                      <Typography fontSize={15} >
                        {item.transactionId}&ensp;
                        <IconButton aria-label="Duplicate"
                          onClick={() => { this.handleCopyClick(item.transactionId) }}
                        >
                          <FileCopyOutlinedIcon style={{ color: 'rgb(106 158 222)' }} />
                        </IconButton>
                      </Typography>
                    </Grid>

                    <Grid item xs={4} >
                      <Typography fontSize={15} >Refund Amount</Typography>
                    </Grid>
                    <Grid item xs={8} >
                      <Typography fontSize={15} >{item.paymentCurrency}{" "}{item.paymentAmount || item.finalPaymentAmount}</Typography>
                    </Grid>

                    <Grid item xs={4} >
                      <Typography fontSize={15} >Refunded to</Typography>
                    </Grid>
                    <Grid item xs={8} >
                      <Typography fontSize={15} >{item.debtorName}</Typography>
                      <Typography fontSize={15} >{item.debtorEmailId}</Typography>
                      <Typography fontSize={15} >{item.cardBrand !== null ? item.cardBrand + ' ' + item.paymentMode : item.paymentMode}</Typography>
                    </Grid>

                    <Grid item xs={4} >
                      <Typography fontSize={15} >Refund Type</Typography>
                    </Grid>
                    <Grid item xs={8} >
                      <Typography fontSize={15} >{item.refundType == 'F' ? "Full" : item.refundType == 'P' ? "Partial" : "Error"}</Typography>
                    </Grid>

                    <Grid item xs={4} >
                      <Typography fontSize={15} >Refund status</Typography>
                    </Grid>
                    <Grid item xs={8} >
                      <Typography fontSize={15} >{this.getStatusChip(item.status)}</Typography>
                    </Grid>

                    <Grid item xs={4} >
                      <Typography fontSize={15} >Refund Timestamp</Typography>
                    </Grid>
                    <Grid item xs={8} >
                      <Typography fontSize={15} >{moment(item.createTimeStamp).format(DateFormat.dateTime)}</Typography>
                    </Grid>

                    <Grid item xs={4} >
                      <Typography fontSize={15} >Refund notes</Typography>
                    </Grid>
                    <Grid item xs={8} >
                      <Typography fontSize={15} >{item.reasonForCollection}</Typography>
                    </Grid>
                  </Grid>
                </Container>
              </>
            )
          )}
        </ConfirmDialog>
      )}

      {/**
        * @author Ragavan
        * Payment Faild attempts Details
        */}
      {failedTransactionsModal == true && failedTransactions !== undefined && failedTransactions !== null && Object.keys(failedTransactions) !== 0 && (
        <ConfirmDialog
          title="Warning"
          open={true}
        >
          <Container maxWidth='sm'>
            <Grid container rowSpacing={1}>
              <Grid item xs={10}>
                <>
                  <Typography variant="body1" fontSize={20} fontWeight={600} style={{ color: '#0D5AB7' }}>
                    Failed Attempts
                  </Typography>
                </>
              </Grid>
              <Grid item xs={2} style={{ display: 'flex', justifyContent: 'end' }}>
                <IconButton size="medium"
                  onClick={this.closeFaildTransactionModal}
                >
                  <Close />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Typography gap={2} variant="body1" fontSize={17} fontWeight={500} style={{ color: '#878787', display: 'inline' }}>
                  BenePay Transaction Id:&nbsp;
                </Typography>
                <Typography gap={2} variant="body1" fontSize={17} style={{ color: 'rgb(106 158 222)', display: 'inline' }}>
                  {selectedTransactionId}&ensp;
                  <IconButton aria-label="Duplicate"
                    onClick={() => { this.handleCopyClick(selectedTransactionId) }}
                  >
                    <FileCopyOutlinedIcon style={{ color: 'rgb(106 158 222)' }} />
                  </IconButton>
                </Typography>
              </Grid>
            </Grid>
          </Container>

          {faildTransactionMatched && Object.values(failedTransactions).map(
            (value) => (
              <>
                {value.transactionId === selectedTransactionId &&
                  <>
                    <Divider variant="middle" style={{ marginTop: '3%', borderWidth: '1px' }} />
                    <Container maxWidth="sm">
                      <Grid container rowSpacing={2} mt={2}>
                        <Grid item xs={6}>
                          <Typography fontSize={15}>Bene Id</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontSize={15}>{value.beneId}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography fontSize={15}>Payer Name</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontSize={15}>{value.debtorName}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography fontSize={15}>Payer Email</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontSize={15}>{value.debtorEmailId}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography fontSize={15}>Creation Timestamp</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontSize={15}>{moment(value.creationDate).format(DateFormat.dateTime)}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography fontSize={15}>Amount</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontSize={15}>{value.currency + " " + value.dueAmount}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography fontSize={15}>Collection Reference</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontSize={15}>{value.collectionReferenceNo}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography fontSize={15}>Status</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontSize={15}>
                            <Chip label={value.pgStatus} style={{ backgroundColor: '#cccccc', color: "black", width: '146px', height: '30px' }} />
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontSize={15}>Reason</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontSize={15}>{value.reason}</Typography>
                        </Grid>
                      </Grid>
                    </Container>
                  </>
                }
              </>
            )
          )}

        </ConfirmDialog>
      )}
    </>
  );
}
