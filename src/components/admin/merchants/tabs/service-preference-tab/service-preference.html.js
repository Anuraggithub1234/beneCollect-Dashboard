import React from "react";

//Mui Components
import { Box, Grid, Typography, FormGroup, FormControlLabel, InputLabel, FormControl, Checkbox, Card ,Stack} from "@mui/material";
import { Autocomplete } from "@mui/material";
import { BootstrapInput } from "../../../../$widgets/form-inputs/BootstrapInput";
import MUIPhoneInput from "../../../../$widgets/form-inputs/MUIPhoneInput";
import ConfirmDialog from "../../../../$widgets/dialog";
import { ButtonPrimary, ButtonSecondary } from "../../../../$widgets/buttons/form-button";



//Styles
import "./service-preference.scss";
import { withStyles, useTheme } from "@material-ui/styles";

export function html() {

    const {
        paymentRequestInitiationViaAPI,
        paymentRequestInitiationViaFileUpload,
        paymentRequestInitiationViaScreen,
        keyCurrencies,
        withoutKeyCurrenciesList,
        keyCurrenciesList,
        otherCurrencies,
        invoicesSubscription,
        refundRequestInitiationViaAPI,
        refundRequestInitiationViaFileUpload,
        refundRequestInitiationViaScreen,
        cancellationsViaScreen,
        autoGenerateUnpaidInvoice,
        autoGeneratePaidInvoice,
        allCurrency,
        loading,
        formFields,
        openBDdeletepopup,
    } = this.state;

    const { } = this.props;

    const BootstrapLabel = withStyles((theme) => ({
        root: {
            fontSize: '20px !important',
            color: '#474747 !important',
            whiteSpace: 'normal !important'
        },
    }))(InputLabel);

    return (
        <Box component="div">

            {loading && (
                <div id="semiTransparenDiv"></div>)}

            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="body1" fontWeight={500} style={{ color: 'rgb(13, 90, 183)' }}>
                        Preferences
                    </Typography>
                </Grid>


                <Grid item xs={12} mt={1}>
                    <Box sx={{ display: "flex" }}>
                        <Grid container>
                            <Grid item xl={2} lg={2} md={3} sm={12} xs={12} className="inlineCenter">
                                <Typography variant="body1">
                                    Payment Request Initiation
                                </Typography>
                            </Grid>

                            <Grid item xl={10} lg={10} md={9} sm={12} xs={12}>
                                <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                    <FormGroup sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
                                        <FormControlLabel
                                            control={<Checkbox checked={paymentRequestInitiationViaAPI} onClick={this.handleCheckBoxEvent} name="paymentRequestInitiationViaAPI" />}
                                            label="via API"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={paymentRequestInitiationViaFileUpload} onClick={this.handleCheckBoxEvent} name="paymentRequestInitiationViaFileUpload" />}
                                            label="via File Upload"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={paymentRequestInitiationViaScreen} onClick={this.handleCheckBoxEvent} name="paymentRequestInitiationViaScreen" />}
                                            label="via Screen"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} style={{ marginTop: "-1%" }}>
                    <Box sx={{ display: "flex" }}>
                        <Grid container>
                            <Grid item xl={2} lg={2} md={3} sm={12} xs={12} className="inlineCenter">
                                <Typography variant="body1">
                                    Refunds
                                </Typography>
                            </Grid>

                            <Grid item xl={10} lg={10} md={9} sm={12} xs={12}>
                                <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                    <FormGroup sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
                                        <FormControlLabel
                                            control={<Checkbox checked={refundRequestInitiationViaAPI} onClick={this.handleCheckBoxEvent} name="refundRequestInitiationViaAPI" />}
                                            label="via API"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={refundRequestInitiationViaFileUpload} onClick={this.handleCheckBoxEvent} name="refundRequestInitiationViaFileUpload" />}
                                            label="via File Upload"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={refundRequestInitiationViaScreen} onClick={this.handleCheckBoxEvent} name="refundRequestInitiationViaScreen" />}
                                            label="via Screen"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} style={{ marginTop: "-1%" }}>
                    <Box sx={{ display: "flex" }}>
                        <Grid container>
                            <Grid item xl={2} lg={2} md={3} sm={12} xs={12} className="inlineCenter">
                                <Typography variant="body1">
                                    Cancellations
                                </Typography>
                            </Grid>

                            <Grid item xl={10} lg={10} md={9} sm={12} xs={12}>
                                <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                    <FormGroup sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
                                        <FormControlLabel
                                            control={<Checkbox checked={cancellationsViaScreen} onClick={this.handleCheckBoxEvent} name="cancellationsViaScreen" />}
                                            label="via Screen"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} style={{ marginTop: "-1%" }}>
                    <Box sx={{ display: "flex" }}>
                        <Grid container>
                            <Grid item xl={2} lg={2} md={3} sm={12} xs={12} className="inlineCenter">
                                <Typography variant="body1">
                                    Invoices Subscription
                                </Typography>
                            </Grid>

                            <Grid item xl={10} lg={10} md={9} sm={12} xs={12}>
                                <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                    <FormGroup sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
                                        <FormControlLabel
                                            control={<Checkbox checked={invoicesSubscription} onClick={this.handleCheckBoxEvent} name="invoicesSubscription" />}
                                            label=""
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                {invoicesSubscription ?
                    <Grid item xs={12} style={{ marginTop: "-1%" }}>
                        <Box sx={{ display: "flex" }}>
                            <Grid container>
                                <Grid item xl={2} lg={2} md={3} sm={12} xs={12} className="inlineCenter">
                                    <Typography variant="body1">
                                        Automatically generate and send invoice to payers
                                    </Typography>
                                </Grid>

                                <Grid item xl={10} lg={10} md={9} sm={12} xs={12}>
                                    <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                        <FormGroup sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
                                            <FormControlLabel
                                                control={<Checkbox checked={autoGenerateUnpaidInvoice} onClick={this.handleCheckBoxEvent} name="autoGenerateUnpaidInvoice" />}
                                                label="Unpaid Invoice"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={autoGeneratePaidInvoice} onClick={this.handleCheckBoxEvent} name="autoGeneratePaidInvoice" />}
                                                label="Paid Invoice"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    : ''}
            </Grid>

            <Grid container mt={3} spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xl={3.7} lg={4} md={6} sm={6} xs={12}>
                            <BootstrapLabel shrink required htmlFor="paymentDefaultDueDate">Payment Default Due Date (No of calendar days)</BootstrapLabel>
                            <FormControl style={{ width: '60%' }}>
                                <BootstrapInput
                                    id="paymentDefaultDueDate"
                                    value={formFields.paymentDefaultDueDate.value}
                                    rules={formFields.paymentDefaultDueDate.rules}
                                    errors={formFields.paymentDefaultDueDate.errors}
                                    onChange={(e) => { this.updateFormField("paymentDefaultDueDate", e.target.value) }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xl={3.7} lg={4} md={6} sm={6} xs={12}>
                            <BootstrapLabel shrink required htmlFor="expiry-date">Expiry Date after due date (no of calendar days)</BootstrapLabel>
                            <FormControl style={{ width: '60%' }}>
                                <BootstrapInput
                                    id="expiryDate"
                                    rules={formFields.expiryDate.rules}
                                    errors={formFields.expiryDate.errors}
                                    value={formFields.expiryDate.value}
                                    onChange={(e) => { this.updateFormField("expiryDate", e.target.value) }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} mt={1}>
                    <Grid container spacing={2}>
                        <Grid item xl={3.7} lg={4} md={6} sm={6} xs={12}>
                            <BootstrapLabel shrink htmlFor="default-email-id">Default Email id for notifications</BootstrapLabel>
                            <FormControl style={{ width: '60%' }}>
                                <BootstrapInput
                                    id="emailId"
                                    value={formFields.emailId.value}
                                    onChange={(e) => { this.updateFormField("emailId", e.target.value) }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xl={3.6} lg={4} md={6} sm={6} xs={12}>
                            <BootstrapLabel shrink htmlFor="mobileNo">Default mobile no for SMS notifications</BootstrapLabel>
                            <FormControl >
                                <MUIPhoneInput
                                    id="mobileNoForSMS"
                                    defaultCountry="in"
                                    countryCodeEditable={true}
                                    disableAreaCodes={true}
                                    rules={formFields.mobileNoForSMS.rules}
                                    value={formFields.mobileNoForSMS.value}
                                    errors={formFields.mobileNoForSMS.errors}
                                    onChange={(e, v) => {
                                        this.updateFormField("SMSMobileNoCountryCode", v.dialCode, false);
                                    }}
                                    onBlur={(e) => {
                                        let value = e.target.value;

                                        if (value && value.length > 4) {
                                            this.updateFormField("mobileNoForSMS", value, false);
                                        }
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} mt={1}>
                    <Grid container spacing={2}>
                        <Grid item xl={3.7} lg={4} md={6} sm={6} xs={12}>
                            <BootstrapLabel shrink htmlFor="default-due-date">Default mobile no for Whatsapp notifications</BootstrapLabel>
                            <FormControl>
                                <MUIPhoneInput
                                    id="mobileNoForWhatsApp"
                                    defaultCountry="in"
                                    countryCodeEditable={true}
                                    disableAreaCodes={true}
                                    rules={formFields.mobileNoForWhatsApp.rules}
                                    value={formFields.mobileNoForWhatsApp.value}
                                    errors={formFields.mobileNoForWhatsApp.errors}
                                    onChange={(e, v) => {
                                        this.updateFormField("WhatAppMobileNoCountryCode", v.dialCode, false);
                                    }}
                                    onBlur={(e) => {
                                        let value = e.target.value;

                                        if (value && value.length > 4) {
                                            this.updateFormField("mobileNoForWhatsApp", value, false);
                                        }
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xl={3.6} lg={4} md={6} sm={6} xs={12}>
                            <BootstrapLabel shrink required htmlFor="reminderFrequency">Reminder frequency (no of calendar days)</BootstrapLabel>
                            <FormControl style={{width:'60%'}}>
                                <BootstrapInput
                                    id="reminderFrequency"
                                    rules={formFields.reminderFrequency.rules}
                                    errors={formFields.reminderFrequency.errors}
                                    value={formFields.reminderFrequency.value}
                                    onChange={(e) => { this.updateFormField("reminderFrequency", e.target.value) }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                    <BootstrapLabel shrink required htmlFor="" >Default Currency</BootstrapLabel>
                    <FormControl >
                        <Autocomplete
                            sx={{ width: 270 }}
                            size="small"
                            id="defaultCurrency"
                            disablePortal
                            options={allCurrency.map((option) => option)}
                            getOptionLabel={(option) => `${option}`}
                            value={formFields.defaultCurrency.value}
                            onChange={(e, newValue) => this.updateFormField("defaultCurrency", (newValue ? newValue : null))}
                            renderInput={(params) => (
                                <BootstrapInput
                                    {...params}
                                    InputProps={{
                                        ...params.InputProps,
                                    }}
                                    rules={formFields.defaultCurrency.rules}
                                    value={formFields.defaultCurrency.value}
                                    errors={formFields.defaultCurrency.errors}
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container mt={4}>
                <Grid item xs={12}>
                    <Typography variant="body1" fontWeight={500} style={{ color: 'rgb(13, 90, 183)' }}>
                        Allowed Invoice / Payment Request Currencies
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset" variant="standard">
                        <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                            <FormControlLabel
                                control={<Checkbox checked={keyCurrencies} onClick={this.handleCheckBoxEvent} name="keyCurrencies" />}
                                label="Key Currencies"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>

                <Card style={{ width: '100%', paddingLeft: '1%', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 4px 4px' }}>
                    <Grid container>
                        {keyCurrenciesList.map((currency, index) => (
                            <Grid item xl={0.8} lg={0.8} md={2} sm={3} xs={3} key={index}>
                                <FormControl component="fieldset" variant="standard">
                                    <FormGroup sx={{ display: "flex", flexDirection: "column" }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={currency.checked}
                                                    onClick={(e) => this.handleCheckBoxEvent(e, currency)}
                                                    name={currency.name}
                                                />
                                            }
                                            label={currency.name}
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>
                </Card>

                <Grid item xs={12} mt={4}>
                    <FormControl component="fieldset" variant="standard">
                        <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                            <FormControlLabel
                                control={<Checkbox checked={otherCurrencies} onClick={this.handleCheckBoxEvent} name="otherCurrencies" />}
                                label="Other Currencies"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>


                <Card style={{ width: '100%', paddingLeft: '1%', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 4px 4px' }}>
                    <Grid container>
                        {withoutKeyCurrenciesList.map((currency, index) => (
                            <Grid item xl={0.8} lg={0.8} md={2} sm={3} xs={3} key={index}>
                                <FormControl component="fieldset" variant="standard">
                                    <FormGroup sx={{ display: "flex", flexDirection: "column" }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={currency.checked}
                                                    onClick={(e) => this.handleCheckBoxEvent(e, currency)}
                                                    name={index.name}
                                                />
                                            }
                                            label={currency.name}
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </Grid>
            
            <ConfirmDialog open={openBDdeletepopup} >
                <Box sx={{ width: 317, paddingLeft:'1%' }}>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid xs={12} mt={1}>
                            <BootstrapLabel style={{ fontSize: '18px !important' }}>Are you sure you want to delete?</BootstrapLabel>
                        </Grid>
                        <Grid xs={12} mt={4}>
                            <Stack spacing={{ xs: 1, sm: 1 }} direction="row" useFlexGap flexWrap="wrap">
                                <ButtonSecondary onClick={() => this.setState({ openBDdeletepopup: false })}>Cancel</ButtonSecondary>
                                <ButtonPrimary onClick={this.deletePreference}>Confirm</ButtonPrimary>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </ConfirmDialog>
        </Box >
        
    );
}
