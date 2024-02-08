import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import { BootstrapInput } from "../../../../$widgets/form-inputs/BootstrapInput";
import { withStyles } from "@material-ui/styles";
import { InputLabel } from '@material-ui/core';
import MUIPhoneInput from "../../../../$widgets/form-inputs/MUIPhoneInput";
import { Divider, Stack, Box} from "@mui/material";
import { ButtonPrimary, ButtonSecondary } from "../../../../$widgets/buttons/form-button";
import ConfirmDialog from "../../../../$widgets/dialog";




export function html() {

    const {
        formFields,

        //Payment Link Notification
        paymentLinkNtnForMerchantViaSMS,
        paymentLinkNtnForMerchantViaWtsApp,
        paymentLinkNtnForMerchantViaEmail,
        PLNotifyPayerViaSMS,
        PLNotifyPayerViaWtsApp,
        PLNotifyPayerViaEmail,

        //Payment Cancellation Notification
        paymentCancelNtnForMerchantViaSMS,
        paymentCancelNtnForMerchantViaWtsApp,
        paymentCancelNtnForMerchantViaEmail,
        PCNotifyPayerViaSMS,
        PCNotifyPayerViaWtsApp,
        PCNotifyPayerViaEmail,

        //Payment Confirmation Notification
        paymentConfirmNtnForMerchantViaSMS,
        paymentConfirmNtnForMerchantViaWtsApp,
        PaymentConfirmNotifyFMViaEmail,
        pmtConfirmForNotifyPayerViaSMS,
        pmtConfirmForNotifyPayerViaWtsApp,
        pmtConfirmForNotifyPayerViaEmail,

        //Payment Expiry Notification
        notifyMerChantPmtExpiryViaSMS,
        notifyMerChantPmtExpiryViaWtsApp,
        notifyMerChantPmtExpiryViaEmail,
        PmtExpiryNotifyPayerViaSMS,
        PmtExpiryNotifyPayerViaWtsApp,
        PmtExpiryNotifyPayerViaEmail,

        //Payment Refund Notification
        pmtRefundNtnForMerchantViaSMS,
        pmtRefundNtnForMerchantViaWtsApp,
        pmtRefundNtnForMerchantViaEmail,
        pmtRefundNotifyPayerViaSMS,
        pmtRefundNotifyPayerViaWtsApp,
        pmtRefundNotifyPayerViaEmail,

        //Settlement Report Notification
        stlmntReportNtnForMerchantViaSMS,
        stlmntReportNtnForMerchantViaWtsApp,
        stlmntReportNtnForMerchantViaEmail,
        sltmneReportNotifyPayerViaSMS,
        sltmneReportNotifyPayerViaWtsApp,
        sltmneReportNotifyPayerViaEmail,

        //Payment Reminder Notification
        pmtReminderNotifyPayerViaSMS,
        pmtReminderNotifyPayerViaWtsApp,
        pmtReminderNotifyPayerViaEmail,

        //Invoice Notification
        invoiceNotifyPayerViaSMS,
        invoiceNotifyPayerWtsApp,
        invoiceNotifyPayerViaEmail,

        openBDdeletepopup,
    } = this.state;

    const BootstrapLabel = withStyles((theme) => ({
        root: {
            fontSize: '20px !important',
            color: '#474747 !important',
            fontWeight: '450 !important'
        },
    }))(InputLabel);



    return (
        <>

            {/* <Grid container spacing={5} marginBottom={1}>
                <Grid item xs={6} >
                    <Notification title="Payment Link Notification" id="pln" merchant={true}/>
                </Grid>
            </Grid> */}

            <div>
                <Grid container spacing={5} >

                    <Grid item xs={6} >
                        <BootstrapLabel variant="h6" style={{ paddingBottom: '1%' }}>
                            Payment Link Notification
                        </BootstrapLabel>

                        <Card style={{ boxShadow: '0 0 4px 4px rgba(0, 0, 0, 0.1)', marginTop: '1%' }}>
                            <CardContent>
                                {/* Notify Merchant */}
                                <Typography variant="h6" style={{ color: '#264d73' }}>
                                    Notify Merchant
                                </Typography>
                                <Grid container spacing={2} marginTop={1}>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary" checked={paymentLinkNtnForMerchantViaSMS} onClick={(e) => this.handleCheckBoxClickEvent(e, 'paymentLinkNtnFMInSMS')} />
                                            via SMS
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={paymentLinkNtnForMerchantViaSMS ? true : false} htmlFor="">
                                            Mobile number for SMS Notification
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <MUIPhoneInput
                                                id="mobileNoForMerPLSMSNtn"
                                                defaultCountry='in'
                                                countryCodeEditable={false}
                                                disableAreaCodes={true}
                                                rules={paymentLinkNtnForMerchantViaSMS ? formFields.mobileNoForMerPLSMSNtn.rules : []}
                                                errors={paymentLinkNtnForMerchantViaSMS ? formFields.mobileNoForMerPLSMSNtn.errors : ''}
                                                value={formFields.mobileNoForMerPLSMSNtn.value}
                                                onChange={(e, v) => {
                                                    this.updateFormField("mobileNoCtryCodeFormobileNoForMerPLSMSNtn", v.dialCode, false);
                                                }}
                                                onBlur={(e) => {
                                                    let value = e.target.value;

                                                    if (value && value.length > 4) {
                                                        this.updateFormField("mobileNoForMerPLSMSNtn", value, false);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary" checked={paymentLinkNtnForMerchantViaWtsApp} onClick={(e) => this.handleCheckBoxClickEvent(e, 'paymentLinkNtnFMInWtsApp')} />
                                            via WhatsApp
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={paymentLinkNtnForMerchantViaWtsApp ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                            Mobile number for WhatsApp Notification
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <MUIPhoneInput
                                                id="mobileNoForMerPLWtsAppNtn"
                                                defaultCountry='in'
                                                countryCodeEditable={false}
                                                disableAreaCodes={true}
                                                rules={paymentLinkNtnForMerchantViaWtsApp ? formFields.mobileNoForMerPLWtsAppNtn.rules : []}
                                                errors={paymentLinkNtnForMerchantViaWtsApp ? formFields.mobileNoForMerPLWtsAppNtn.errors : ''}
                                                value={formFields.mobileNoForMerPLWtsAppNtn.value}
                                                onChange={(e, v) => {
                                                    this.updateFormField("ctryCodeFormobileNoForMerPLWtsAppNtn", v.dialCode, false);
                                                }}
                                                onBlur={(e) => {
                                                    let value = e.target.value;

                                                    if (value && value.length > 4) {
                                                        this.updateFormField("mobileNoForMerPLWtsAppNtn", value, false);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary" checked={paymentLinkNtnForMerchantViaEmail} onClick={(e) => this.handleCheckBoxClickEvent(e, 'paymentLinkNtnFMInEmail')} />
                                            via Email
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={paymentLinkNtnForMerchantViaEmail ? true : false} htmlFor="">
                                            Email id(s) for Payment Link
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <BootstrapInput
                                                id="emailIdForMerPLNtn" multiline rows={3}
                                                autoComplete="off"
                                                rules={paymentLinkNtnForMerchantViaEmail ? formFields.emailIdForMerPLNtn.rules : []}
                                                errors={paymentLinkNtnForMerchantViaEmail ? formFields.emailIdForMerPLNtn.errors : ''}
                                                value={formFields.emailIdForMerPLNtn.value}
                                                onChange={(e) => {
                                                    this.updateFormField("emailIdForMerPLNtn", e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Divider orientation="horizontal" flexItem fullWidth
                                            style={{ color: 'black' }}>
                                        </Divider>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="h6" style={{ color: '#264d73' }}>
                                            Notify Payer
                                        </Typography>
                                        {/* Notify Payer */}
                                        <Grid container spacing={1} marginTop={1}>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox color="primary"
                                                        checked={PLNotifyPayerViaSMS} style={{ whiteSpace: 'nowrap' }}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'PLNotifyPayerViaSMS')}
                                                    />
                                                    via SMS
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox color="primary"
                                                        checked={PLNotifyPayerViaWtsApp} style={{ whiteSpace: 'nowrap' }}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'PLNotifyPayerViaWtsApp')}
                                                    />
                                                    Via WhatsApp
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox color="primary"
                                                        checked={PLNotifyPayerViaEmail} style={{ whiteSpace: 'nowrap' }}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'PLNotifyPayerViaEmail')}
                                                    />
                                                    Via Email
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={6} >
                        <BootstrapLabel style={{ paddingBottom: '1%' }}>
                            Payment Cancellation Notification
                        </BootstrapLabel>
                        <Card style={{ boxShadow: '0 0 4px 4px rgba(0, 0, 0, 0.1)', marginTop: '1%' }}>
                            <CardContent>
                                {/* Notify Merchant */}
                                <Typography variant="h6" style={{ color: '#264d73' }}>
                                    Notify Merchant
                                </Typography>
                                <Grid container spacing={2} marginTop={1}>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox
                                                color="primary" checked={paymentCancelNtnForMerchantViaSMS}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'PCNotifyMerchantViaSMS')}
                                            />
                                            via SMS
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={paymentCancelNtnForMerchantViaSMS ? true : false} htmlFor="">
                                            Mobile number for SMS Notification
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <MUIPhoneInput
                                                id="mobileNoForMerPCSMSNtn"
                                                defaultCountry='in'
                                                countryCodeEditable={false}
                                                disableAreaCodes={true}
                                                rules={paymentCancelNtnForMerchantViaSMS ? formFields.mobileNoForMerPCSMSNtn.rules : []}
                                                errors={paymentCancelNtnForMerchantViaSMS ? formFields.mobileNoForMerPCSMSNtn.errors : ''}
                                                value={formFields.mobileNoForMerPCSMSNtn.value}
                                                onChange={(e, v) => {
                                                    this.updateFormField("ctryCodeFormobileNoForMerPCSMSNtn", v.dialCode, false);
                                                }}
                                                onBlur={(e) => {
                                                    let value = e.target.value;

                                                    if (value && value.length > 4) {
                                                        this.updateFormField("mobileNoForMerPCSMSNtn", value, false);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox
                                                color="primary" checked={paymentCancelNtnForMerchantViaWtsApp}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'PCNotifyMerchantViaWhtsApp')}
                                            />
                                            via WhatsApp
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={paymentCancelNtnForMerchantViaWtsApp ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                            Mobile number for WhatsApp Notification
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <MUIPhoneInput
                                                id="mobileNoForMerPCWtsAppNtn"
                                                defaultCountry='in'
                                                countryCodeEditable={false}
                                                disableAreaCodes={true}
                                                rules={paymentCancelNtnForMerchantViaWtsApp ? formFields.mobileNoForMerPCWtsAppNtn.rules : []}
                                                errors={paymentCancelNtnForMerchantViaWtsApp ? formFields.mobileNoForMerPCWtsAppNtn.errors : ''}
                                                value={formFields.mobileNoForMerPCWtsAppNtn.value}
                                                onChange={(e, v) => {
                                                    this.updateFormField("ctryCodeFormobileNoForMerPCWtsAppNtn", v.dialCode, false);
                                                }}
                                                onBlur={(e) => {
                                                    let value = e.target.value;

                                                    if (value && value.length > 4) {
                                                        this.updateFormField("mobileNoForMerPCWtsAppNtn", value, false);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox
                                                color="primary" checked={paymentCancelNtnForMerchantViaEmail}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'paymentCancelNtnFMViaEmail')}
                                            />
                                            via Email
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={paymentCancelNtnForMerchantViaEmail ? true : false} htmlFor="">
                                            Email id(s) for Payment Link
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <BootstrapInput
                                                id="emailIdForMerPCNtn" multiline rows={3}
                                                autoComplete="off"
                                                rules={paymentCancelNtnForMerchantViaEmail ? formFields.emailIdForMerPCNtn.rules : []}
                                                errors={paymentCancelNtnForMerchantViaEmail ? formFields.emailIdForMerPCNtn.errors : ''}
                                                value={formFields.emailIdForMerPCNtn.value}
                                                onChange={(e) => {
                                                    this.updateFormField("emailIdForMerPCNtn", e.target.value);
                                                }}
                                            />
                                        </FormControl>

                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider orientation="horizontal" flexItem fullWidth
                                            style={{ color: 'black' }}>
                                        </Divider>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="h6" style={{ color: '#264d73' }}>
                                            Notify Payer
                                        </Typography>
                                        {/* Notify Payer */}
                                        <Grid container spacing={1} marginTop={1}>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox
                                                        color="primary" style={{ whiteSpace: 'nowrap' }}
                                                        checked={PCNotifyPayerViaSMS}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'PCNotifyPayerViaSMS')}
                                                    />
                                                    via SMS
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox
                                                        color="primary" style={{ whiteSpace: 'nowrap' }}
                                                        checked={PCNotifyPayerViaWtsApp}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'PCNotifyPayerViaWtsApp')}
                                                    />
                                                    Via WhatsApp
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox
                                                        color="primary" style={{ whiteSpace: 'nowrap' }}
                                                        checked={PCNotifyPayerViaEmail}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'PCNotifyPayerViaEmail')}
                                                    />
                                                    Via Email
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>

            <div style={{ marginTop: '1%' }}>
                <Grid container spacing={5} >

                    <Grid item xs={6} >
                        <BootstrapLabel style={{ paddingBottom: '1%' }}>
                            Payment Confirmation Notification
                        </BootstrapLabel>

                        <Card style={{ boxShadow: '0 0 4px 4px rgba(0, 0, 0, 0.1)', marginTop: '1%' }}>
                            <CardContent>
                                {/* Notify Merchant */}
                                <Typography variant="h6" style={{ color: '#264d73' }}>
                                    Notify Merchant
                                </Typography>
                                <Grid container spacing={2} marginTop={1}>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary" checked={paymentConfirmNtnForMerchantViaSMS}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'paymentConfirmNtnForMerchantViaSMS')}
                                            />
                                            via SMS
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={paymentConfirmNtnForMerchantViaSMS ? true : false} htmlFor="">
                                            Mobile number for SMS Notification
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <MUIPhoneInput
                                                id="paymentConfirmNtnFMViaSMS"
                                                defaultCountry='in'
                                                countryCodeEditable={false}
                                                disableAreaCodes={true}
                                                rules={paymentConfirmNtnForMerchantViaSMS ? formFields.paymentConfirmNtnFMViaSMS.rules : []}
                                                errors={paymentConfirmNtnForMerchantViaSMS ? formFields.paymentConfirmNtnFMViaSMS.errors : ''}
                                                value={formFields.paymentConfirmNtnFMViaSMS.value}
                                                onChange={(e, v) => {
                                                    this.updateFormField("ctryCodeForPaymentConfirmNtnFMViaSMS", v.dialCode, false);
                                                }}
                                                onBlur={(e) => {
                                                    let value = e.target.value;

                                                    if (value && value.length > 4) {
                                                        this.updateFormField("paymentConfirmNtnFMViaSMS", value, false);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary" checked={paymentConfirmNtnForMerchantViaWtsApp}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'paymentConfirmNtnForMerchantViaWtsApp')}
                                            />
                                            via WhatsApp
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={paymentConfirmNtnForMerchantViaWtsApp ? true : false} htmlFor=" " style={{ whiteSpace: 'nowrap' }}>
                                            Mobile number for WhatsApp Notification
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <MUIPhoneInput
                                                id="paymentConfirmNtnFMViaWtsApp"
                                                defaultCountry='in'
                                                countryCodeEditable={false}
                                                disableAreaCodes={true}
                                                rules={paymentConfirmNtnForMerchantViaWtsApp ? formFields.paymentConfirmNtnFMViaWtsApp.rules : []}
                                                errors={paymentConfirmNtnForMerchantViaWtsApp ? formFields.paymentConfirmNtnFMViaWtsApp.errors : ''}
                                                value={formFields.paymentConfirmNtnFMViaWtsApp.value}
                                                onChange={(e, v) => {
                                                    this.updateFormField("ctryCodeForPaymentConfirmNtnFMViaWtsApp", v.dialCode, false);
                                                }}
                                                onBlur={(e) => {
                                                    let value = e.target.value;

                                                    if (value && value.length > 4) {
                                                        this.updateFormField("paymentConfirmNtnFMViaWtsApp", value, false);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary"
                                                checked={PaymentConfirmNotifyFMViaEmail}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'PaymentConfirmNotifyFMViaEmail')}
                                            />
                                            via Email
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={PaymentConfirmNotifyFMViaEmail ? true : false} htmlFor="">
                                            Email id(s) for Payment Link
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <BootstrapInput
                                                id="emailIdForMerPmtConfirmNtn" multiline rows={3}
                                                autoComplete="off"
                                                rules={PaymentConfirmNotifyFMViaEmail ? formFields.emailIdForMerPmtConfirmNtn.rules : []}
                                                errors={PaymentConfirmNotifyFMViaEmail ? formFields.emailIdForMerPmtConfirmNtn.errors : ''}
                                                value={formFields.emailIdForMerPmtConfirmNtn.value}
                                                onChange={(e) => {
                                                    this.updateFormField("emailIdForMerPmtConfirmNtn", e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Divider orientation="horizontal" flexItem fullWidth
                                            style={{ color: 'black' }}>
                                        </Divider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" style={{ color: '#264d73' }}>
                                            Notify Payer
                                        </Typography>
                                        {/* Notify Payer */}
                                        <Grid container spacing={1} marginTop={1}>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox
                                                        color="primary" style={{ whiteSpace: 'nowrap' }}
                                                        checked={pmtConfirmForNotifyPayerViaSMS}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'pmtConfirmForNotifyPayerViaSMS')}
                                                    />
                                                    via SMS
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox
                                                        color="primary" style={{ whiteSpace: 'nowrap' }}
                                                        checked={pmtConfirmForNotifyPayerViaWtsApp}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'pmtConfirmForNotifyPayerViaWtsApp')}
                                                    />
                                                    Via WhatsApp
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox
                                                        color="primary" style={{ whiteSpace: 'nowrap' }}
                                                        checked={pmtConfirmForNotifyPayerViaEmail}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'pmtConfirmForNotifyPayerViaEmail')}
                                                    />
                                                    Via Email
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={6} >
                        <BootstrapLabel style={{ paddingBottom: '1%' }}>
                            Payment Expiry  Notification
                        </BootstrapLabel>
                        <Card style={{ boxShadow: '0 0 4px 4px rgba(0, 0, 0, 0.1)', marginTop: '1%' }}>
                            <CardContent>
                                {/* Notify Merchant */}
                                <Typography variant="h6" style={{ color: '#264d73' }}>
                                    Notify Merchant
                                </Typography>
                                <Grid container spacing={2} marginTop={1}>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary" checked={notifyMerChantPmtExpiryViaSMS}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'notifyMerChantPmtExpiryViaSMS')}
                                            />
                                            via SMS
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={notifyMerChantPmtExpiryViaSMS ? true : false} htmlFor="">
                                            Mobile number for SMS Notification
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <MUIPhoneInput
                                                id="mobileNoForMerPmtExpirySMSNtn"
                                                defaultCountry='in'
                                                countryCodeEditable={false}
                                                disableAreaCodes={true}
                                                rules={notifyMerChantPmtExpiryViaSMS ? formFields.mobileNoForMerPmtExpirySMSNtn.rules : []}
                                                errors={notifyMerChantPmtExpiryViaSMS ? formFields.mobileNoForMerPmtExpirySMSNtn.errors : ''}
                                                value={formFields.mobileNoForMerPmtExpirySMSNtn.value}
                                                onChange={(e, v) => {
                                                    this.updateFormField("ctryCodeForPmtExpirySMSNtn", v.dialCode, false);
                                                }}
                                                onBlur={(e) => {
                                                    let value = e.target.value;

                                                    if (value && value.length > 4) {
                                                        this.updateFormField("mobileNoForMerPmtExpirySMSNtn", value, false);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary" checked={notifyMerChantPmtExpiryViaWtsApp}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'notifyMerChantPmtExpiryViaWtsApp')}
                                            />
                                            via WhatsApp
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={notifyMerChantPmtExpiryViaWtsApp ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                            Mobile number for WhatsApp Notification
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <MUIPhoneInput
                                                id="mobileNoForMerPmtExpiryWtsAppNtn"
                                                defaultCountry='in'
                                                countryCodeEditable={false}
                                                disableAreaCodes={true}
                                                rules={notifyMerChantPmtExpiryViaWtsApp ? formFields.mobileNoForMerPmtExpiryWtsAppNtn.rules : []}
                                                errors={notifyMerChantPmtExpiryViaWtsApp ? formFields.mobileNoForMerPmtExpiryWtsAppNtn.errors : ''}
                                                value={formFields.mobileNoForMerPmtExpiryWtsAppNtn.value}
                                                onChange={(e, v) => {
                                                    this.updateFormField("ctryCodeForPmtExpiryWtsAppNtn", v.dialCode, false);
                                                }}
                                                onBlur={(e) => {
                                                    let value = e.target.value;

                                                    if (value && value.length > 4) {
                                                        this.updateFormField("mobileNoForMerPmtExpiryWtsAppNtn", value, false);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary" checked={notifyMerChantPmtExpiryViaEmail}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'notifyMerChantPmtExpiryViaEmail')}
                                            />
                                            via Email
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={notifyMerChantPmtExpiryViaEmail ? true : false}>
                                            Email id(s) for Payment Link
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <BootstrapInput
                                                id="emailIdForMerPmtExpiryNtn" multiline rows={3}
                                                autoComplete="off"
                                                rules={notifyMerChantPmtExpiryViaEmail ? formFields.emailIdForMerPmtExpiryNtn.rules : []}
                                                errors={notifyMerChantPmtExpiryViaEmail ? formFields.emailIdForMerPmtExpiryNtn.errors : ''}
                                                value={formFields.emailIdForMerPmtExpiryNtn.value}
                                                onChange={(e) => {
                                                    this.updateFormField("emailIdForMerPmtExpiryNtn", e.target.value);
                                                }}
                                            />
                                        </FormControl>

                                    </Grid>
                                    <Grid item xs={12}  >
                                        <Divider orientation="horizontal" flexItem fullWidth
                                            style={{ color: 'black' }}>
                                        </Divider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" style={{ color: '#264d73' }}>
                                            Notify Payer
                                        </Typography>
                                        {/* Notify Payer */}
                                        <Grid container spacing={1} marginTop={1}>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox color="primary" style={{ whiteSpace: 'nowrap' }}
                                                        checked={PmtExpiryNotifyPayerViaSMS}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'PmtExpiryNotifyPayerViaSMS')}
                                                    />
                                                    via SMS
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox color="primary" style={{ whiteSpace: 'nowrap' }}
                                                        checked={PmtExpiryNotifyPayerViaWtsApp}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'PmtExpiryNotifyPayerViaWtsApp')}
                                                    />
                                                    Via WhatsApp
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox color="primary" style={{ whiteSpace: 'nowrap' }}
                                                        checked={PmtExpiryNotifyPayerViaEmail}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'PmtExpiryNotifyPayerViaEmail')}
                                                    />
                                                    Via Email
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </div>
            <div style={{ marginTop: '1%' }}>
                <Grid container spacing={5} >

                    <Grid item xs={6} >
                        <BootstrapLabel style={{ paddingBottom: '1%' }}>
                            Payment Refund Notification
                        </BootstrapLabel>

                        <Card style={{ boxShadow: '0 0 4px 4px rgba(0, 0, 0, 0.1)', marginTop: '1%' }}>
                            <CardContent>
                                {/* Notify Merchant */}
                                <Typography variant="h6" style={{ color: '#264d73' }}>
                                    Notify Merchant
                                </Typography>
                                <Grid container spacing={2} marginTop={1}>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary"
                                                checked={pmtRefundNtnForMerchantViaSMS}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'pmtRefundNtnForMerchantViaSMS')}
                                            />
                                            via SMS
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={pmtRefundNtnForMerchantViaSMS ? true : false} htmlFor="">
                                            Mobile number for SMS Notification
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <MUIPhoneInput
                                                id="mobileNoForMerPmtRefundSMSNtn"
                                                defaultCountry='in'
                                                countryCodeEditable={false}
                                                disableAreaCodes={true}
                                                rules={pmtRefundNtnForMerchantViaSMS ? formFields.mobileNoForMerPmtRefundSMSNtn.rules : []}
                                                errors={pmtRefundNtnForMerchantViaSMS ? formFields.mobileNoForMerPmtRefundSMSNtn.errors : ''}
                                                value={formFields.mobileNoForMerPmtRefundSMSNtn.value}
                                                onChange={(e, v) => {
                                                    this.updateFormField("ctryCodeForPmtRefundSMSNtn", v.dialCode, false);
                                                }}
                                                onBlur={(e) => {
                                                    let value = e.target.value;

                                                    if (value && value.length > 4) {
                                                        this.updateFormField("mobileNoForMerPmtRefundSMSNtn", value, false);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary"
                                                checked={pmtRefundNtnForMerchantViaWtsApp}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'pmtRefundNtnForMerchantViaWtsApp')}
                                            />
                                            via WhatsApp
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={pmtRefundNtnForMerchantViaWtsApp ? true : false} htmlFor=" " style={{ whiteSpace: 'nowrap' }}>
                                            Mobile number for WhatsApp Notification
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <MUIPhoneInput
                                                id="mobileNoForMerPmtRefundWtsAppNtn"
                                                defaultCountry='in'
                                                countryCodeEditable={false}
                                                disableAreaCodes={true}
                                                rules={pmtRefundNtnForMerchantViaWtsApp ? formFields.mobileNoForMerPmtRefundWtsAppNtn.rules : []}
                                                errors={pmtRefundNtnForMerchantViaWtsApp ? formFields.mobileNoForMerPmtRefundWtsAppNtn.errors : ''}
                                                value={formFields.mobileNoForMerPmtRefundWtsAppNtn.value}
                                                onChange={(e, v) => {
                                                    this.updateFormField("ctryCodeForPmtRefundWtsAppNtn", v.dialCode, false);
                                                }}
                                                onBlur={(e) => {
                                                    let value = e.target.value;

                                                    if (value && value.length > 4) {
                                                        this.updateFormField("mobileNoForMerPmtRefundWtsAppNtn", value, false);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary"
                                                checked={pmtRefundNtnForMerchantViaEmail}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'pmtRefundNtnForMerchantViaEmail')}
                                            />
                                            via Email
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={pmtRefundNtnForMerchantViaEmail ? true : false} htmlFor="">
                                            Email id(s) for Payment Link
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <BootstrapInput
                                                id="emailIdForMerPmtRefundNtn" multiline rows={3}
                                                autoComplete="off"
                                                rules={pmtRefundNtnForMerchantViaEmail ? formFields.emailIdForMerPmtRefundNtn.rules : []}
                                                errors={pmtRefundNtnForMerchantViaEmail ? formFields.emailIdForMerPmtRefundNtn.errors : ''}
                                                value={formFields.emailIdForMerPmtRefundNtn.value}
                                                onChange={(e) => {
                                                    this.updateFormField("emailIdForMerPmtRefundNtn", e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Divider orientation="horizontal" flexItem fullWidth
                                            style={{ color: 'black' }}>
                                        </Divider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" style={{ color: '#264d73' }}>
                                            Notify Payer
                                        </Typography>
                                        {/* Notify Payer */}
                                        <Grid container spacing={1} marginTop={1}>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox color="primary" style={{ whiteSpace: 'nowrap' }}
                                                        checked={pmtRefundNotifyPayerViaSMS}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'pmtRefundNotifyPayerViaSMS')}
                                                    />
                                                    via SMS
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox color="primary" style={{ whiteSpace: 'nowrap' }}
                                                        checked={pmtRefundNotifyPayerViaWtsApp}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'pmtRefundNotifyPayerViaWtsApp')}
                                                    />
                                                    Via WhatsApp
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox color="primary" style={{ whiteSpace: 'nowrap' }}
                                                        checked={pmtRefundNotifyPayerViaEmail}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'pmtRefundNotifyPayerViaEmail')}
                                                    />
                                                    Via Email
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={6} >
                        <BootstrapLabel style={{ paddingBottom: '1%' }}>
                            Settlement Report  Notification
                        </BootstrapLabel>
                        <Card style={{ boxShadow: '0 0 4px 4px rgba(0, 0, 0, 0.1)', marginTop: '1%' }}>
                            <CardContent>
                                {/* Notify Merchant */}
                                <Typography variant="h6" style={{ color: '#264d73' }}>
                                    Notify Merchant
                                </Typography>
                                <Grid container spacing={2} marginTop={1}>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary"
                                                checked={stlmntReportNtnForMerchantViaSMS}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'stlmntReportNtnForMerchantViaSMS')}
                                            />
                                            via SMS
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={stlmntReportNtnForMerchantViaSMS ? true : false} htmlFor="">
                                            Mobile number for SMS Notification
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <MUIPhoneInput
                                                id="mobileNoForMerStlmntReportSMSNtn"
                                                defaultCountry='in'
                                                countryCodeEditable={false}
                                                disableAreaCodes={true}
                                                rules={stlmntReportNtnForMerchantViaSMS ? formFields.mobileNoForMerStlmntReportSMSNtn.rules : []}
                                                errors={stlmntReportNtnForMerchantViaSMS ? formFields.mobileNoForMerStlmntReportSMSNtn.errors : ''}
                                                value={formFields.mobileNoForMerStlmntReportSMSNtn.value}
                                                onChange={(e, v) => {
                                                    this.updateFormField("ctryCodeForStlmntReportSMSNtn", v.dialCode, false);
                                                }}
                                                onBlur={(e) => {
                                                    let value = e.target.value;

                                                    if (value && value.length > 4) {
                                                        this.updateFormField("mobileNoForMerStlmntReportSMSNtn", value, false);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary"
                                                checked={stlmntReportNtnForMerchantViaWtsApp}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'stlmntReportNtnForMerchantViaWtsApp')}
                                            />
                                            via WhatsApp
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={stlmntReportNtnForMerchantViaWtsApp ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                            Mobile number for WhatsApp Notification
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <MUIPhoneInput
                                                id="mobileNoForMerStlmntReportWtsAppNtn"
                                                defaultCountry='in'
                                                countryCodeEditable={false}
                                                disableAreaCodes={true}
                                                rules={stlmntReportNtnForMerchantViaWtsApp ? formFields.mobileNoForMerStlmntReportWtsAppNtn.rules : []}
                                                errors={stlmntReportNtnForMerchantViaWtsApp ? formFields.mobileNoForMerStlmntReportWtsAppNtn.errors : ''}
                                                value={formFields.mobileNoForMerStlmntReportWtsAppNtn.value}
                                                onChange={(e, v) => {
                                                    this.updateFormField("ctryCodeForStlmntReportWtsAppNtn", v.dialCode, false);
                                                }}
                                                onBlur={(e) => {
                                                    let value = e.target.value;

                                                    if (value && value.length > 4) {
                                                        this.updateFormField("mobileNoForMerStlmntReportWtsAppNtn", value, false);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary"
                                                checked={stlmntReportNtnForMerchantViaEmail}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'stlmntReportNtnForMerchantViaEmail')}
                                            />
                                            via Email
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <BootstrapLabel shrink required={stlmntReportNtnForMerchantViaEmail ? true : false} htmlFor="">
                                            Email id(s) for Payment Link
                                        </BootstrapLabel>
                                        <FormControl fullWidth>
                                            <BootstrapInput
                                                id="emailIdForMerSltmntReportNtn" multiline rows={3}
                                                autoComplete="off"
                                                rules={stlmntReportNtnForMerchantViaEmail ? formFields.emailIdForMerSltmntReportNtn.rules : []}
                                                errors={stlmntReportNtnForMerchantViaEmail ? formFields.emailIdForMerSltmntReportNtn.errors : ''}
                                                value={formFields.emailIdForMerSltmntReportNtn.value}
                                                onChange={(e) => {
                                                    this.updateFormField("emailIdForMerSltmntReportNtn", e.target.value);
                                                }}
                                            />
                                        </FormControl>

                                    </Grid>
                                    <Grid item xs={12}  >
                                        <Divider orientation="horizontal" flexItem fullWidth
                                            style={{ color: 'black' }}>
                                        </Divider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" style={{ color: '#264d73' }}>
                                            Notify Payer
                                        </Typography>
                                        {/* Notify Payer */}
                                        <Grid container spacing={1} marginTop={1}>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox color="primary" style={{ whiteSpace: 'nowrap' }}
                                                        checked={sltmneReportNotifyPayerViaSMS}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'sltmneReportNotifyPayerViaSMS')}
                                                    />
                                                    via SMS
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox color="primary" style={{ whiteSpace: 'nowrap' }}
                                                        checked={sltmneReportNotifyPayerViaWtsApp}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'sltmneReportNotifyPayerViaWtsApp')}
                                                    />
                                                    Via WhatsApp
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>
                                                    <Checkbox color="primary" style={{ whiteSpace: 'nowrap' }}
                                                        checked={sltmneReportNotifyPayerViaEmail}
                                                        onClick={(e) => this.handleCheckBoxClickEvent(e, 'sltmneReportNotifyPayerViaEmail')}
                                                    />
                                                    Via Email
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </div>

            <div style={{ marginTop: '1%', marginBottom: '5%' }}>

                <Grid container spacing={5} style={{ flex: 1 }} >

                    <Grid item xs={6} style={{ minHeight: '100%', }}>

                        <BootstrapLabel style={{ paddingBottom: '1%', marginTop: '1%' }}>
                            Payment Reminder Notification
                        </BootstrapLabel>

                        <Card style={{ minHeight: '93%', boxShadow: '0 0 4px 4px rgba(0, 0, 0, 0.1)', marginTop: '1%' }}>
                            <CardContent >
                                <Typography variant="h6" style={{ color: '#264d73' }}>
                                    Notify Payer
                                </Typography>
                                {/* Notify Payer */}
                                <Grid container spacing={1} marginTop={1}>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary"
                                                checked={pmtReminderNotifyPayerViaSMS}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'pmtReminderNotifyPayerViaSMS')}
                                            />
                                            via SMS
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary"
                                                checked={pmtReminderNotifyPayerViaWtsApp}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'pmtReminderNotifyPayerViaWtsApp')}
                                            />
                                            Via WhatsApp
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary"
                                                checked={pmtReminderNotifyPayerViaEmail}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'pmtReminderNotifyPayerViaEmail')}
                                            />
                                            Via Email
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={6} >
                        <BootstrapLabel style={{ paddingBottom: '1%', marginTop: '1%' }}>
                            Invoice Notification
                        </BootstrapLabel>
                        <Card style={{ minHeight: '93%', boxShadow: '0 0 4px 4px rgba(0, 0, 0, 0.1)', marginTop: '1%' }}>
                            <CardContent>
                                <Typography variant="h6" style={{ color: '#264d73' }}>
                                    Notify Payer
                                </Typography>
                                {/* Notify Payer */}
                                <Grid container spacing={1} marginTop={1}>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary"
                                                checked={invoiceNotifyPayerViaSMS}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'invoiceNotifyPayerViaSMS')}
                                            />
                                            via SMS
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary"
                                                checked={invoiceNotifyPayerWtsApp}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'invoiceNotifyPayerWtsApp')}
                                            />
                                            Via WhatsApp
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            <Checkbox color="primary"
                                                checked={invoiceNotifyPayerViaEmail}
                                                onClick={(e) => this.handleCheckBoxClickEvent(e, 'invoiceNotifyPayerViaEmail')}
                                            />
                                            Via Email
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <ConfirmDialog open={openBDdeletepopup} >
                    <Box sx={{ width: 317, paddingLeft: '1%' }}>
                        <Grid container spacing={{ xs: 2, md: 3 }}>
                            <Grid xs={12} mt={1}>
                                <BootstrapLabel style={{ fontSize: '18px !important' }}>Are you sure you want to delete?</BootstrapLabel>
                            </Grid>
                            <Grid xs={12} mt={4}>
                                <Stack spacing={{ xs: 1, sm: 1 }} direction="row" useFlexGap flexWrap="wrap">
                                    <ButtonSecondary onClick={() => this.setState({ openBDdeletepopup: false })}>Cancel</ButtonSecondary>
                                    <ButtonPrimary onClick={this.deleteND}>Confirm</ButtonPrimary>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </ConfirmDialog>

            </div>

        </>
    );
}


