/**
 * Single payment transaction component HTML 
 * 
 * @autho Muthukumaran
 */
import React from "react";

import { Box, Grid, Card, CardContent, Autocomplete, Typography, InputLabel, FormControl, MenuItem, Divider } from "@mui/material";
import { withStyles } from "@material-ui/styles";
import "./single-payment.scss";

import { BootstrapInput } from "../../$widgets/form-inputs/BootstrapInput";
import { ButtonPrimary, ButtonSecondary } from "../../$widgets/buttons/form-button";
import MUIDatePicker from "../../$widgets/form-inputs/MUIDatePicker";
import MUIPhoneInput from "../../$widgets/form-inputs/MUIPhoneInput";
import ConfirmDialog from "../../$widgets/dialog";
import TitleBar from "../../title-bar/title-bar";
import { PaymentStatusWidget } from "./payment-status";
import dayjs from "dayjs";
import Utils from "../../../service/core/utils";
import { messages } from "../../../config/constants";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { FileCopyOutlined } from "@material-ui/icons";
import { toast } from "react-toastify";

export function html() {
  const {
    formFields,
    currencyList,
    payers,
    showForm,
    transaction,
    mailSent,
    paymentLink,
    txnResponse,
    showExpiry,
    loading,
    showExpiryMobile,
    mobileTitle
  } = this.state;

  const BootstrapLabel = withStyles((theme) => ({
    root: {
      fontSize: '20px !important',
      color: '#474747 !important',
      fontWeight: '450 !important'
    },
  }))(InputLabel);

  const CardHead = withStyles((theme) => ({
    root: {
      fontSize: 18,
      marginBottom: 15,
      color: "rgb(38, 77, 115)"
    },
  }))(Typography);

  return (
    <div>
      <div id="desktopScreen">
      {loading && (<div id="semiTransparenDiv"></div>)}
        <Box mt={4}>
          <TitleBar
            className={"mt-3"}
            color="blue"
            ruleColor="blue"
            title={"New Payment Request"}
          />

          {showForm && (
            <Box>
              <Grid container spacing={3}>

                <Grid item xs={9} mt={1}>
                  <Grid container spacing={3}>

                    {/* Payer Card design - start */}
                    <Grid item xs={12}>
                      <Card>
                        <CardContent>
                          <CardHead gutterBottom>
                            Payer
                          </CardHead>

                          <Grid container style={{ margin: 10 }}>
                            <Grid item xs={12}>
                              <Divider />
                            </Grid>
                          </Grid>

                          <Grid container spacing={2}>

                            <Grid item xs={4}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <BootstrapLabel shrink required htmlFor="payer-name">Name</BootstrapLabel>
                                </Grid>
                                <Grid item xs={12}>
                                  <Autocomplete
                                    freeSolo
                                    size="small"
                                    id="payer-name"
                                    disableClearable
                                    options={payers.map((option) => option.name)}
                                    value={formFields.payerName.value}
                                    onChange={(e, v) => {
                                      var payerIndex = payers.findIndex(function (entry, i) {
                                        if (entry.name == v) {
                                          return true;
                                        }
                                      });

                                      this.getPayerTransaction(payers[payerIndex]);
                                    }}
                                    renderInput={(params) => (
                                      <BootstrapInput
                                        {...params}
                                        InputProps={{
                                          ...params.InputProps,
                                          disableUnderline: true,
                                          type: 'search',
                                        }}
                                        rules={formFields.payerName.rules}
                                        value={formFields.payerName.value}
                                        errors={formFields.payerName.errors}
                                        onChange={(e) => {
                                          var pName = e.target.value;

                                          if (pName.length == 3) {
                                            this.getPayers(pName)
                                          }

                                          this.updateFormField("payerName", pName);
                                        }}
                                      />
                                    )}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid item xs={4}>
                              <BootstrapLabel shrink required htmlFor="payer-email">Email</BootstrapLabel>
                              <FormControl fullWidth>
                                <BootstrapInput
                                  id="payer-email"
                                  rules={formFields.payerEmail.rules}
                                  value={formFields.payerEmail.value}
                                  errors={formFields.payerEmail.errors}
                                  onChange={(e) => {
                                    this.updateFormField("payerEmail", e.target.value);
                                  }}
                                />
                              </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                              <BootstrapLabel shrink htmlFor="payer-mobile">Mobile</BootstrapLabel>
                              <FormControl fullWidth>
                                <MUIPhoneInput
                                  id="payer-mobile"
                                  defaultCountry={formFields.mobileCountry.value}
                                  rules={formFields.payerMobile.rules}
                                  value={formFields.payerMobile.value}
                                  errors={formFields.payerMobile.errors}
                                  countryCodeEditable={false}
                                  disableAreaCodes={true}
                                  onChange={(e, v) => {
                                    this.updateFormField("mobileCountry", v.countryCode, false);
                                  }}
                                  onBlur={(e) => {
                                    let value = e.target.value;

                                    if (value && value.length > 4) {
                                      this.updateFormField("payerMobile", value, true);
                                    }
                                  }}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>

                        </CardContent>
                      </Card>
                    </Grid>
                    {/* Payer Card design - end */}

                    {/* Payer Request details design - start */}
                    <Grid item xs={12}>
                      <Card>
                        <CardContent>
                          <CardHead gutterBottom>
                            Payment Request details
                          </CardHead>

                          <Grid container style={{ margin: 10 }}>
                            <Grid item xs={12}>
                              <Divider />
                            </Grid>
                          </Grid>

                          <Grid container spacing={2} mb={5}>
                            <Grid item xs={4}>
                              <BootstrapLabel shrink required htmlFor="description">Description</BootstrapLabel>
                              <FormControl fullWidth>
                                <BootstrapInput
                                  id="description"
                                  autoComplete="off"
                                  rules={formFields.description.rules}
                                  value={formFields.description.value}
                                  errors={formFields.description.errors}
                                  onChange={(e) => {
                                    this.updateFormField("description", e.target.value);
                                  }}
                                />
                              </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                              <BootstrapLabel shrink required htmlFor="collection-reference">Collection Reference</BootstrapLabel>
                              <FormControl fullWidth>
                                <BootstrapInput
                                  id="collection-reference"
                                  autoComplete="off"
                                  rules={formFields.collectionRef.rules}
                                  value={formFields.collectionRef.value}
                                  errors={formFields.collectionRef.errors}
                                  onChange={(e) => {
                                    this.updateFormField("collectionRef", e.target.value);
                                  }}
                                />
                              </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                              <BootstrapLabel shrink required htmlFor="transaction-id">Requestor Transaction Id</BootstrapLabel>
                              <FormControl fullWidth>
                                <BootstrapInput
                                  id="transaction-id"
                                  autoComplete="off"
                                  rules={formFields.transactionId.rules}
                                  value={formFields.transactionId.value}
                                  errors={formFields.transactionId.errors}
                                  onChange={(e) => {
                                    this.updateFormField("transactionId", e.target.value);
                                  }} />
                              </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <BootstrapLabel shrink required htmlFor="due-date">Due Date</BootstrapLabel>
                                </Grid>
                                <Grid item xs={12}>
                                  <FormControl fullWidth>
                                    <MUIDatePicker
                                      id="due-date"
                                      format={"DD/MM/YYYY"}
                                      placeholder="DD/MM/YYYY"
                                      disablePast={true}
                                      rules={formFields.dueDate.rules}
                                      errors={formFields.dueDate.errors}
                                      value={formFields.dueDate.value ? dayjs(formFields.dueDate.value) : null}
                                      disableEdit={true}
                                      onChange={this.handleDueDate}
                                      sx={{ margin: 0, padding: 0 }}
                                    />
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </Grid>

                          </Grid>
                        </CardContent>

                      </Card>

                    </Grid>
                    {/* Payer Request details design - end */}

                  </Grid>
                </Grid>

                {/* Amount details card design - start */}
                <Grid item xs={3} mt={1}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Card>
                        <CardContent>
                          <CardHead gutterBottom>
                            Amount details
                          </CardHead>

                          <Grid container style={{ margin: 10 }}>
                            <Grid item xs={12}>
                              <Divider />
                            </Grid>
                          </Grid>

                          <Grid container spacing={2}>

                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <BootstrapLabel shrink required htmlFor="amount-ccy">Requested Amount</BootstrapLabel>
                                </Grid>

                                <Grid item xs={12}>

                                  <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                      <FormControl fullWidth>
                                        <BootstrapInput
                                          select
                                          id="amount-ccy"
                                          value={formFields.reqCurrency.value != null ? formFields.reqCurrency.value : ''}
                                          errors={formFields.reqCurrency.errors}
                                          onChange={(e) => {
                                            this.updateDecimalInRule(e.target.value);

                                            this.updateFormField("reqCurrency", e.target.value);
                                          }}
                                          placeholder="Placeholder"
                                        >
                                          <MenuItem value="none" disabled>
                                            Currency
                                          </MenuItem>
                                          {currencyList.map((currency, index) => (
                                            <MenuItem
                                              key={index}
                                              value={currency.code}
                                            >
                                              {currency.code}
                                            </MenuItem>
                                          ))}
                                        </BootstrapInput>
                                      </FormControl>
                                    </Grid>

                                    <Grid item xs={9}>
                                      <BootstrapInput fullWidth
                                        id="requested-amount"
                                        autoComplete="off"
                                        rules={formFields.reqAmount.rules}
                                        value={formFields.reqAmount.value}
                                        errors={formFields.reqAmount.errors}
                                        onBlur={(e) => {
                                          e.persist();

                                          let amount = this.autoFixDecimal("reqAmount", e.target.value)

                                          this.updateFormField("reqAmount", amount);
                                        }}
                                        onChange={this.handleRequestedAmount}
                                      />
                                    </Grid>

                                  </Grid>
                                </Grid>

                              </Grid>
                            </Grid>

                            <Grid item xs={12}>
                              <BootstrapLabel shrink htmlFor="initial-amount">Initial Amount</BootstrapLabel>
                              <FormControl fullWidth>
                                <BootstrapInput
                                  id="initial-amount"
                                  autoComplete="off"
                                  value={formFields.initialAmount.value}
                                  rules={formFields.initialAmount.rules}
                                  errors={formFields.initialAmount.errors}
                                  onBlur={(e) => {
                                    e.persist();

                                    let amount = this.autoFixDecimal("initialAmount", e.target.value)

                                    this.updateFormField("initialAmount", amount);
                                  }}
                                  onChange={this.handleInitialAmount} />
                              </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                              <BootstrapLabel shrink htmlFor="charge-amount">Charge Amount</BootstrapLabel>
                              <FormControl fullWidth>
                                <BootstrapInput
                                  id="charge-amount"
                                  autoComplete="off"
                                  value={formFields.chargeAmount.value}
                                  errors={formFields.chargeAmount.errors}
                                  onBlur={(e) => {
                                    e.persist();

                                    let amount = this.autoFixDecimal("chargeAmount", e.target.value)

                                    this.updateFormField("chargeAmount", amount);
                                  }}
                                  onChange={this.handleChangeAmount}
                                />
                              </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                              <BootstrapLabel shrink required={formFields.chargeReason.rules.length > 0} htmlFor="charge-reason">
                                Reason for charges
                              </BootstrapLabel>
                              <FormControl fullWidth>
                                <BootstrapInput multiline
                                  rows={3}
                                  id="charge-reason"
                                  autoComplete="off"
                                  value={formFields.chargeReason.value}
                                  errors={formFields.chargeReason.errors}
                                  onChange={(e) => {
                                    this.updateFormField("chargeReason", e.target.value);
                                  }}
                                />
                              </FormControl>
                            </Grid>

                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Amount details card design - end */}

              </Grid>

              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <ButtonPrimary
                    onClick={async () => {
                      let formValid = await this.validateForm();

                      if (formValid) {
                        this.submitForm();
                        this.setState({ showExpiry: false });
                      }else{
                        toast.error("Please fill the mandatory fields!")
                      }
                    }}
                  >
                    Submit
                  </ButtonPrimary>
                  <ButtonSecondary
                    style={{ marginLeft: "5px" }}
                    onClick={() => {
                      this.resetForm();
                    }}>
                    Clear
                  </ButtonSecondary>
                </Grid>
              </Grid>

            </Box>
          )}

          {!showForm && <PaymentStatusWidget
            transaction={transaction}
            mailSent={mailSent}
            paymentLink={paymentLink}
            message={txnResponse}
            onMakeAnother={(e) => { this.resetForm(); }}
            generateInvoice={(e) => {this.handleGenerateInvoice(transaction.transactionId)}}
            />
          }

          {/* {showExpiry && <ConfirmDialog title="Warning" open={true} setOpen={true}>
            <Typography style={{marginBottom:20}}>
              {messages.spConfirm.replace('{date}', Utils.dateSystemFormat(formFields.expiryDate.value))}
            </Typography>

            <ButtonPrimary onClick={(e) => {
              this.submitForm();
              this.setState({ showExpiry: false });
            }}>
              Confirm
            </ButtonPrimary>

            <ButtonSecondary
              style={{ marginLeft: "5px" }}
              onClick={(e) => {
                this.setState({ showExpiry: false });
              }}>
              Cancel
            </ButtonSecondary>
          </ConfirmDialog>} */}
        </Box>
      </div>
      <div id="mobileScreen">
      {loading && (<div id="semiTransparenDiv"></div>)}
        <Box mt={4} className="px-2">
          <TitleBar
            className={"mt-2"}
            color="blue"
            ruleColor="blue"
            title={mobileTitle}
          />

          {showForm && (
            <div className="font-poppins">
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    {/* Name - Mobile */}
                    <Grid item xs={4} className="mb-3">
                      <Grid container>
                        <Grid item xs={12}>
                          <BootstrapLabel shrink required htmlFor="payer-name" className="font-poppins">Name</BootstrapLabel>
                        </Grid>
                        <Grid item xs={12}>
                          <Autocomplete
                            freeSolo
                            id="payer-name"
                            disableClearable
                            options={payers.map((option) => option.name)}
                            value={formFields.payerName.value}
                            onChange={(e, v) => {
                              var payerIndex = payers.findIndex(function (entry, i) {
                                if (entry.name == v) {
                                  return true;
                                }
                              });

                              this.getPayerTransaction(payers[payerIndex]);
                            }}
                            renderInput={(params) => (
                              <BootstrapInput
                                {...params}
                                InputProps={{
                                  ...params.InputProps,
                                  disableUnderline: true,
                                  type: 'search',
                                }}
                                rules={formFields.payerName.rules}
                                value={formFields.payerName.value}
                                errors={formFields.payerName.errors}
                                placeholder="Payer Name"
                                onChange={(e) => {
                                  var pName = e.target.value;

                                  if (pName.length == 3) {
                                    this.getPayers(pName)
                                  }

                                  this.updateFormField("payerName", pName);
                                }}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* Email - Mobile */}
                    <Grid item xs={4} className="mb-3">
                      <BootstrapLabel shrink required htmlFor="payer-email">Email</BootstrapLabel>
                      <FormControl fullWidth>
                        <BootstrapInput
                          id="payer-email"
                          rules={formFields.payerEmail.rules}
                          value={formFields.payerEmail.value}
                          errors={formFields.payerEmail.errors}
                          placeholder="Payer Email"
                          onChange={(e) => {
                            this.updateFormField("payerEmail", e.target.value);
                          }}
                        />
                      </FormControl>
                    </Grid>

                    {/* Amount - Mobile */}
                    <Grid item xs={12} className="mb-3">
                      <Grid container>
                        <Grid item xs={12}>
                          <BootstrapLabel shrink required htmlFor="amount-ccy">Requested Amount</BootstrapLabel>
                        </Grid>

                        <Grid item xs={12}>

                          <Grid container spacing={2}>
                            <Grid item xs={3}>
                              <FormControl fullWidth>
                                <BootstrapInput
                                  select
                                  id="amount-ccy"
                                  value={formFields.reqCurrency.value != null ? formFields.reqCurrency.value : ''}
                                  errors={formFields.reqCurrency.errors}
                                  placeholder="Currency"
                                  onChange={(e) => {
                                    this.updateDecimalInRule(e.target.value);

                                    this.updateFormField("reqCurrency", e.target.value);
                                  }}
                                >
                                  <MenuItem value="none" disabled>
                                    Currency
                                  </MenuItem>
                                  {currencyList.map((currency, index) => (
                                    <MenuItem
                                      key={index}
                                      value={currency.code}
                                    >
                                      {currency.code}
                                    </MenuItem>
                                  ))}
                                </BootstrapInput>
                              </FormControl>
                            </Grid>

                            <Grid item xs={9}>
                              <BootstrapInput fullWidth
                                id="requested-amount"
                                autoComplete="off"
                                rules={formFields.reqAmount.rules}
                                value={formFields.reqAmount.value}
                                errors={formFields.reqAmount.errors}
                                placeholder="Amount"
                                onBlur={(e) => {
                                  e.persist();

                                  let amount = this.autoFixDecimal("reqAmount", e.target.value)

                                  this.updateFormField("reqAmount", amount);
                                }}
                                onChange={this.handleRequestedAmount}
                              />
                            </Grid>

                          </Grid>
                        </Grid>

                      </Grid>
                    </Grid>

                    {/* Descroption - Mobile */}
                    <Grid item xs={4} className="mb-3">
                      <BootstrapLabel shrink required htmlFor="description">Description</BootstrapLabel>
                      <FormControl fullWidth>
                        <BootstrapInput
                          id="description"
                          autoComplete="off"
                          rules={formFields.description.rules}
                          value={formFields.description.value}
                          errors={formFields.description.errors}
                          placeholder="Description"
                          onChange={(e) => {
                            this.updateFormField("description", e.target.value);
                          }}
                        />
                      </FormControl>
                    </Grid>

                    {/* Buttons - Mobile */}
                    <Grid item xs={4} className="mb-1">
                      <ButtonPrimary
                        className="w-100 bg-primary border-none outline-none text-white text-base rounded py-2"
                        onClick={async () => {
                          let formValid = await this.validateFormMobile();
                          console.log('in2', formValid);
                          if (formValid) {
                            this.setState({ showExpiryMobile: true });
                          }
                        }}
                      >
                        Send Request
                      </ButtonPrimary>
                    </Grid>

                    <Grid item xs={12}>
                      <ButtonSecondary
                        className="w-100"
                        onClick={() => {
                          this.resetForm();
                        }}>
                        Clear
                      </ButtonSecondary>
                    </Grid>

                  </CardContent>
                </Card>
              </Grid>
            </div>
          )}

          {!showForm &&
            <div className="overflow-hidden">
              <div className="d-flex justify-content-center align-items-center w-100 my-2">
                {transaction.status ? <CheckCircleIcon className="icon icon-success"/>
                  : <CancelIcon className="icon icon-failure"/>}
              </div>
              <h1 variant="span" className="d-flex text-center text-base justify-content-center align-items-center my-3">You requested money successfully from</h1>
              <div className="w-100">
                <div className="d-flex flex-column justify-content-center align-items-center bg-primary px-2 py-4 rounded text-white">
                  <h1 className="text-base text-center mb-2">{transaction.debtorName}</h1>
                  <h1 className="text-lg text-center mb-1">{transaction.collectionCurrency} {transaction.finalDueAmount}</h1>
                  <div className="d-flex flex-column justify-content-center align-items-center my-3">
                    <h1 className="text-base text-center mb-2">
                      <span onClick={() => {
                        Utils.copyContent(transaction.transactionId, (e) => {
                          toast.success('Copied!');
                        });
                      }}>BenePay Transaction Id</span>
                      <FileCopyOutlined
                        title="copy"
                        className="icon-copy icon-copy-transaction"
                        onClick={() => {
                          Utils.copyContent(transaction.transactionId, (e) => {
                            toast.success('Copied!');
                          });
                        }}
                      />
                    </h1>
                    <h1 className="text-xs text-center">{transaction.transactionId}</h1>
                  </div>
                  <h1 className="text-sm text-center mb-2">{transaction.reasonForCollection}</h1>
                  <h1 className="text-sm text-center mb-1">Due By {Utils.dateSystemFormat(transaction.paymentDueDate)}</h1>
                </div>
              </div>

              <div className="d-flex flex-column justify-content-center align-items-center px-1 py-2 my-3">
                <div className="d-flex justify-content-center align-items-center px-2 bg-red">
                  <h1 className="text-base text-center">Payment Link</h1>
                  <FileCopyOutlined
                    className="icon-copy icon-copy-mobile"
                    onClick={() => {
                      Utils.copyContent(paymentLink, (e) => {
                        toast.success('Copied!');
                      });
                    }}
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center px-2 pt-3 pb-2 rounded bg-payment-link" onClick={() => {
                  Utils.copyContent(paymentLink, (e) => {
                    toast.success('Copied!');
                  });
                }}>
                  <h1 className="text-xs text-center">{paymentLink}</h1>
                </div>
              </div>

              {/* Buttons - Mobile */}
              <Grid item xs={4} className="my-3">
                <ButtonPrimary
                  className="w-100 bg-primary border-none outline-none text-white text-base rounded py-2"
                  onClick={async () => {
                    this.resetForm();
                    this.setState({ showForm: true , mobileTitle: "Request Money"});
                  }}
                >
                  New Request
                </ButtonPrimary>
              </Grid>
            </div>
          }

          {showExpiryMobile && <ConfirmDialog title="Warning" open={true} setOpen={true} isDeviceMobile={true}>
            <Typography mb={3}>
              {messages.spConfirm.replace('{date}', Utils.dateSystemFormat(formFields.expiryDate.value))}
            </Typography>

            <ButtonPrimary className="w-100 bg-primary border-none outline-none text-white text-base rounded py-2 mb-1" onClick={(e) => {
              this.submitForm();
              this.setState({ showExpiryMobile: false });
            }}>
              Confirm
            </ButtonPrimary>

            <ButtonSecondary className="w-100 border-none outline-none text-base rounded py-2 mb-1"
              onClick={(e) => {
                this.setState({ showExpiryMobile: false });
              }}>
              Cancel
            </ButtonSecondary>
          </ConfirmDialog>}

        </Box>
      </div>
    </div>

  );
}
