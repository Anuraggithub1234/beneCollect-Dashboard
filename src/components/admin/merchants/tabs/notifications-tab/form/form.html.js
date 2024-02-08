import React, {Component} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import { BootstrapInput } from "../../../../../$widgets/form-inputs/BootstrapInput";
import MUIPhoneInput from "../../../../../$widgets/form-inputs/MUIPhoneInput";
import { Divider } from "@mui/material";

export function html() {
    const {
        formFields,
        formKey,
        title,
        showMerchant
    } = this.state;

    return (
        <>
            <Typography variant="h6" style={{ paddingBottom: '1%' }}>
                {title}
            </Typography>

            <Card style={{ boxShadow: '0 0 4px 4px rgba(0, 0, 0, 0.1)', marginTop: '1%' }}>
                <CardContent>
                    {/* Notify Merchant */}
                    {
                    showMerchant && <Typography variant="h6" style={{ color: '#264d73' }}>
                        Notify Merchant
                    </Typography>
                    }
                     
                    {
                    showMerchant && 
                        <>
                            <Grid container spacing={2} marginTop={1}>
                                <Grid item xs={4}>
                                    <Typography>
                                        <Checkbox 
                                            color="primary" 
                                            checked={ (formFields.nmSMS.value == true) ? true : false }
                                            onClick={(e) => this.handleCheckBoxClick(e, 'nmSMS', 'smsNumber')}/>
                                        via SMS
                                    </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography shrink htmlFor="">
                                        Mobile number for SMS Notification
                                    </Typography>
                                    <FormControl fullWidth>
                                        <MUIPhoneInput
                                            id={`smsNumber${formKey}`}
                                            defaultCountry='in'
                                            countryCodeEditable={false}
                                            disableAreaCodes={true}
                                            rules={formFields.smsNumber.rule}
                                            errors={formFields.smsNumber.errors}
                                            value={formFields.smsNumber.value}
                                            onChange={(e, v) => {
                                                this.updateFormField("smsCcyCode", v.countryCode, false);
                                            }}
                                            onBlur={(e) => {
                                                let value = e.target.value;

                                                if (!(value && value.length > 4)) {
                                                    value = '';
                                                }

                                                this.updateFormField("smsNumber", value, false);
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        <Checkbox 
                                            color="primary" 
                                            checked={ (formFields.nmWApp.value == true) ? true : false }
                                            onClick={(e) => this.handleCheckBoxClick(e, 'nmWApp', 'wAppNumber')}/>
                                        via WhatsApp
                                    </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography shrink htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                        Mobile number for WhatsApp Notification
                                    </Typography>
                                    <FormControl fullWidth>
                                        <MUIPhoneInput
                                            id={`wAppNumber${formKey}`}
                                            defaultCountry='in'
                                            countryCodeEditable={false}
                                            disableAreaCodes={true}
                                            rules={formFields.wAppNumber.rule}
                                            errors={formFields.wAppNumber.errors}
                                            value={formFields.wAppNumber.value}
                                            onChange={(e, v) => {
                                                this.updateFormField("wAppCcyCode", v.dialCode, false);
                                            }}
                                            onBlur={(e) => {
                                                let value = e.target.value;

                                                if (value && value.length > 4) {
                                                    this.updateFormField("wAppNumber", value, false);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        <Checkbox 
                                            color="primary" 
                                            checked={ (formFields.nmEmail.value == true) ? true : false }
                                            onClick={(e) => this.handleCheckBoxClick(e, 'npSMS', 'emailIds')}/>
                                        via Email
                                    </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography shrink htmlFor="">
                                        Email id(s) for Payment Link
                                    </Typography>
                                    <FormControl fullWidth>
                                        <BootstrapInput
                                            id={`emailId${formKey}`}
                                            multiline 
                                            rows={3}
                                            autoComplete="off"
                                            onBlur={(e) => {
                                                this.updateFormField("emailIds", e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            
                            <Grid container spacing={2} marginTop={1}>
                                <Grid item xs={12}>
                                    <Divider orientation="horizontal" flexItem fullWidth
                                        style={{ color: 'black' }}>
                                    </Divider>
                                </Grid>
                            </Grid>
                        </>
                    }

                    {/* Notify Payer */}
                    <Grid container spacing={2} marginTop={1}>
                        <Grid item xs={12}>
                            <Typography variant="h6" style={{ color: '#264d73' }}>
                                Notify Payer
                            </Typography>
                            <Grid container spacing={1} marginTop={1}>
                                <Grid item xs={4}>
                                    <Typography>
                                        <Checkbox 
                                            color="primary" 
                                            style={{ whiteSpace: 'nowrap' }} 
                                            checked={ (formFields.npSMS.value == true) ? true : false }
                                            onClick={(e) => this.handleCheckBoxClick(e, 'npSMS')}/>
                                        via SMS
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        <Checkbox 
                                            color="primary" 
                                            style={{ whiteSpace: 'nowrap' }} 
                                            checked={ (formFields.npWApp.value == true) ? true : false }
                                            onClick={(e) => this.handleCheckBoxClick(e, 'npWApp')}/>
                                        via WhatsApp
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>
                                        <Checkbox 
                                            color="primary" 
                                            style={{ whiteSpace: 'nowrap' }} 
                                            checked={ (formFields.npEmail.value == true) ? true : false }
                                            onClick={(e) => this.handleCheckBoxClick(e, 'npEmail')}/>
                                        via Email
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}


