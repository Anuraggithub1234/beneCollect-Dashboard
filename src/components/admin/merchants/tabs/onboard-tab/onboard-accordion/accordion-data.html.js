import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import { BootstrapInput } from '../../../../../$widgets/form-inputs/BootstrapInput';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MUIDatePicker from "../../../../../$widgets/form-inputs/MUIDatePicker"
import { withStyles } from "@material-ui/styles";
import { InputLabel, Autocomplete } from '@mui/material';
import { DateFormat } from '../../../../../../enum/common.enum';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';

export function html() {

    const {
        onboardStatusOptions, formFields,
        currencyList,
        expandedPanel1,
        expandedPanel2,
        expandedPanel3,
    } = this.state;
    const { } = this.props;

    const useStyles = makeStyles({        
        bgColor: {
            "& .MuiInputBase-root": {
                backgroundColor:'red',
            }
        }
    });

    const BootstrapLabel = withStyles((theme) => ({
        root: {
            fontSize: '20px !important',
            color: '#474747 !important',
            fontWeight: '450 !important'
        },
    }))(InputLabel);

    return (

        <div>
            <Accordion expanded={expandedPanel1}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon onClick={this.expandHandleChange('expandedPanel1')} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Checkbox
                        color="primary"
                        style={{ padding: '0px' }}
                        checked={formFields.pglProvider.value}
                        onClick={(e) => this.handleProviderCheckBox("pglProvider", e.target.checked)}
                    />
                    <Typography variant="h6" paddingLeft={1}>Provider 1 (PayGlocal)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2} >

                        <Grid item xs={12}>
                            <Card style={{ boxShadow: '0 0 4px 4px rgba(0, 0, 0, 0.1)' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.pglProvider.value ? true : false} htmlFor="">
                                                Onboarding Status
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <Autocomplete
                                                    id="defaultCurrency"
                                                    size="small"
                                                    disabled={formFields.pglProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.pglProvider.value ? '' : '#EDEDED' }}
                                                    disablePortal
                                                    options={onboardStatusOptions || []}
                                                    getOptionLabel={(option) => option.description}
                                                    value={onboardStatusOptions.find((v) => v.lookupCode === formFields.pglOnboardingStatus.value) || null}
                                                    onChange={(e, newValue) => this.updateFormField("pglOnboardingStatus", (newValue ? newValue.lookupCode : null))}
                                                    renderInput={(params) => (
                                                        <BootstrapInput
                                                            {...params}
                                                            InputProps={{
                                                                ...params.InputProps,
                                                            }}
                                                            rules={formFields.pglOnboardingStatus.rules}
                                                            value={formFields.pglOnboardingStatus.value}
                                                            errors={formFields.pglOnboardingStatus.errors}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.pglProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Date Onboarding Completed
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <MUIDatePicker
                                                    id="pglDateCompletedForOnboarding"
                                                    disabled={formFields.pglProvider.value ? false : true}
                                                    format={DateFormat.date}
                                                    placeholder="From"
                                                    disablePast={true}
                                                    rules={formFields.pglDateCompletedForOnboarding.rules}
                                                    errors={formFields.pglDateCompletedForOnboarding.errors}
                                                    value={formFields.pglDateCompletedForOnboarding.value ? dayjs(formFields.pglDateCompletedForOnboarding.value) : null}
                                                    disableEdit={true}
                                                    onChange={(e) => { this.handleDateFields(e, "pglDateCompletedForOnboarding") }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.pglProvider.value ? true : false} htmlFor=""
                                                style={{ whiteSpace: 'nowrap' }}>
                                                Merchant id at Provider
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="pglMerchantIdForProvider"
                                                    disabled={formFields.pglProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.pglProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.pglMerchantIdForProvider.value}
                                                    rules={formFields.pglMerchantIdForProvider.rules}
                                                    errors={formFields.pglMerchantIdForProvider.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("pglMerchantIdForProvider", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={12}>
                                            <BootstrapLabel shrink htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Onboarding Notes
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput id="pglOnboardingNotes"
                                                    disabled={formFields.pglProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.pglProvider.value ? '' : '#EDEDED' }}
                                                    multiline rows={3}
                                                    value={formFields.pglOnboardingNotes.value}
                                                    onChange={(e) => {
                                                        this.updateFormField("pglOnboardingNotes", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography variant="h6" style={{ color: '#264d73', whiteSpace: 'nowrap' }}   >
                                                Settlement Details
                                            </Typography>
                                        </Grid>
                                        {/* <Grid item xs={12} sm={6} md={6}>
                                            <Typography variant="h6" style={{ color: '#264d73', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}  >

                                                <Checkbox
                                                    color="primary" checked={formFields.payGlocalSettlementsDetailsForAllSer.value} onClick={(e) => this.updateFormField("payGlocalSettlementsDetailsForAllSer", e.target.checked)}
                                                />
                                                Use Same Settlement Details For All  Services
                                            </Typography>
                                        </Grid> */}

                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.pglProvider.value ? true : false} htmlFor=""
                                                style={{ whiteSpace: 'nowrap' }}>
                                                Settlement Currency
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <Autocomplete
                                                    id="pglSettlementCury"
                                                    size="small"
                                                    disabled={formFields.pglProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.pglProvider.value ? '' : '#EDEDED' }}
                                                    disablePortal
                                                    options={currencyList.map((option) => option)}
                                                    getOptionLabel={(option) => `${option}`}
                                                    value={formFields.pglSettlementCury.value}
                                                    onChange={(e, newValue) => this.updateFormField("pglSettlementCury", (newValue ? newValue : null))}
                                                    renderInput={(params) => (
                                                        <BootstrapInput
                                                            {...params}
                                                            InputProps={{
                                                                ...params.InputProps,
                                                            }}
                                                            rules={formFields.pglSettlementCury.rules}
                                                            value={formFields.pglSettlementCury.value}
                                                            errors={formFields.pglSettlementCury.errors}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.pglProvider.value ? true : false} htmlFor=""
                                                style={{ whiteSpace: 'nowrap' }}>
                                                Bank Account Number
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="pglBankAccountNumber"
                                                    disabled={formFields.pglProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.pglProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.pglBankAccountNumber.value}
                                                    rules={formFields.pglBankAccountNumber.rules}
                                                    errors={formFields.pglBankAccountNumber.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("pglBankAccountNumber", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.pglProvider.value ? true : false} htmlFor=""
                                                style={{ whiteSpace: 'nowrap' }}>
                                                Branch Code
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="pglBranchCode"
                                                    disabled={formFields.pglProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.pglProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.pglBranchCode.value}
                                                    rules={formFields.pglBranchCode.rules}
                                                    errors={formFields.pglBranchCode.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("pglBranchCode", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.pglProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Swift BIC
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="pglSwiftBic"
                                                    disabled={formFields.pglProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.pglProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.pglSwiftBic.value}
                                                    rules={formFields.pglSwiftBic.rules}
                                                    errors={formFields.pglSwiftBic.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("pglSwiftBic", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.pglProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Name Of Account
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="pglNameOfAccount"
                                                    disabled={formFields.pglProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.pglProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.pglNameOfAccount.value}
                                                    rules={formFields.pglNameOfAccount.rules}
                                                    errors={formFields.pglNameOfAccount.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("pglNameOfAccount", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.pglProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Type Of Account
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="pglTypeOfAccount"
                                                    disabled={formFields.pglProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.pglProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.pglTypeOfAccount.value}
                                                    rules={formFields.pglTypeOfAccount.rules}
                                                    errors={formFields.pglTypeOfAccount.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("pglTypeOfAccount", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={8}>
                                            <BootstrapLabel shrink required = {formFields.pglProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Name Of Bank
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="pglNameOfBank"
                                                    disabled={formFields.pglProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.pglProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.pglNameOfBank.value}
                                                    rules={formFields.pglNameOfBank.rules}
                                                    errors={formFields.pglNameOfBank.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("pglNameOfBank", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.pglProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Name Of Branch
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="pglNameOfBranch"
                                                    disabled={formFields.pglProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.pglProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.pglNameOfBranch.value}
                                                    rules={formFields.pglNameOfBranch.rules}
                                                    errors={formFields.pglNameOfBranch.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("pglNameOfBranch", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expandedPanel2} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon onClick={this.expandHandleChange('expandedPanel2')} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Checkbox
                        color="primary"
                        style={{ padding: '0px' }}
                        checked={formFields.finaroProvider.value}
                        onClick={(e) => this.handleProviderCheckBox("finaroProvider", e.target.checked)}
                    />
                    <Typography variant="h6" paddingLeft={1}>Provider 2 (Finaro) </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2} >

                        <Grid item xs={12}>
                            <Card style={{ boxShadow: '0 0 4px 4px rgba(0, 0, 0, 0.1)' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.finaroProvider.value ? true : false} htmlFor="">
                                                Onboarding Status
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <Autocomplete
                                                    id="defaultCurrency"
                                                    size="small"
                                                    disabled={formFields.finaroProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.finaroProvider.value ? '' : '#EDEDED' }}
                                                    disablePortal
                                                    options={onboardStatusOptions || []}
                                                    getOptionLabel={(option) => option.description}
                                                    value={onboardStatusOptions.find((v) => v.lookupCode === formFields.finaroOnboardingStatus.value) || null}
                                                    onChange={(e, newValue) => this.updateFormField("finaroOnboardingStatus", (newValue ? newValue.lookupCode : null))}
                                                    renderInput={(params) => (
                                                        <BootstrapInput
                                                            {...params}
                                                            InputProps={{
                                                                ...params.InputProps,
                                                            }}
                                                            rules={formFields.finaroOnboardingStatus.rules}
                                                            value={formFields.finaroOnboardingStatus.value}
                                                            errors={formFields.finaroOnboardingStatus.errors}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.finaroProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Date Onboarding Completed
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <MUIDatePicker
                                                    id="finaroDateCompletedForOnboarding"
                                                    disabled={formFields.finaroProvider.value ? false : true}
                                                    format={DateFormat.date}
                                                    placeholder="From"
                                                    disablePast={true}
                                                    rules={formFields.finaroDateCompletedForOnboarding.rules}
                                                    errors={formFields.finaroDateCompletedForOnboarding.errors}
                                                    value={formFields.finaroDateCompletedForOnboarding.value ? dayjs(formFields.finaroDateCompletedForOnboarding.value) : null}
                                                    disableEdit={true}
                                                    onChange={(e) => { this.handleDateFields(e, "finaroDateCompletedForOnboarding") }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.finaroProvider.value ? true : false} htmlFor=""
                                                style={{ whiteSpace: 'nowrap' }}>
                                                Merchant id at Provider
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="finaroMerchantIdForProvider"
                                                    disabled={formFields.finaroProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.finaroProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.finaroMerchantIdForProvider.value}
                                                    rules={formFields.finaroMerchantIdForProvider.rules}
                                                    errors={formFields.finaroMerchantIdForProvider.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("finaroMerchantIdForProvider", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={12}>
                                            <BootstrapLabel shrink htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Onboarding Notes
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    multiline rows={3}
                                                    id="finaroOnboardingNotes"
                                                    disabled={formFields.finaroProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.finaroProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.finaroOnboardingNotes.value}
                                                    rules={formFields.finaroOnboardingNotes.rules}
                                                    errors={formFields.finaroOnboardingNotes.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("finaroOnboardingNotes", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography variant="h6" style={{ color: '#264d73', whiteSpace: 'nowrap' }}   >
                                                Settlement Details
                                            </Typography>
                                        </Grid>
                                        {/* <Grid item xs={12} sm={6} md={6}>
                                            <Typography variant="h6" style={{ color: '#264d73', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}  >

                                                <Checkbox
                                                    color="primary" checked={formFields.finaroSettlementsDetailsForAllSer.value} onClick={(e) => this.updateFormField("finaroSettlementsDetailsForAllSer", e.target.checked)}
                                                />
                                                Use Same Settlement Details For All  Services
                                            </Typography>
                                        </Grid> */}

                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.finaroProvider.value ? true : false} htmlFor=""
                                                style={{ whiteSpace: 'nowrap' }}>
                                                Settlement Currency
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <Autocomplete
                                                    id="finaroSettlementCury"
                                                    size="small"
                                                    disabled={formFields.finaroProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.finaroProvider.value ? '' : '#EDEDED' }}
                                                    disablePortal
                                                    options={currencyList.map((option) => option)}
                                                    getOptionLabel={(option) => `${option}`}
                                                    value={formFields.finaroSettlementCury.value}
                                                    onChange={(e, newValue) => this.updateFormField("finaroSettlementCury", (newValue ? newValue : null))}
                                                    renderInput={(params) => (
                                                        <BootstrapInput
                                                            {...params}
                                                            InputProps={{
                                                                ...params.InputProps,
                                                            }}
                                                            rules={formFields.finaroSettlementCury.rules}
                                                            value={formFields.finaroSettlementCury.value}
                                                            errors={formFields.finaroSettlementCury.errors}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.finaroProvider.value ? true : false} htmlFor=""
                                                style={{ whiteSpace: 'nowrap' }}>
                                                Bank Account Number
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="finaroBankAccountNumber"
                                                    disabled={formFields.finaroProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.finaroProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.finaroBankAccountNumber.value}
                                                    rules={formFields.finaroBankAccountNumber.rules}
                                                    errors={formFields.finaroBankAccountNumber.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("finaroBankAccountNumber", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.finaroProvider.value ? true : false} htmlFor=""
                                                style={{ whiteSpace: 'nowrap' }}>
                                                Branch Code
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="finaroBranchCode"
                                                    disabled={formFields.finaroProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.finaroProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.finaroBranchCode.value}
                                                    rules={formFields.finaroBranchCode.rules}
                                                    errors={formFields.finaroBranchCode.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("finaroBranchCode", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.finaroProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Swift BIC
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="finaroSwiftBic"
                                                    disabled={formFields.finaroProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.finaroProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.finaroSwiftBic.value}
                                                    rules={formFields.finaroSwiftBic.rules}
                                                    errors={formFields.finaroSwiftBic.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("finaroSwiftBic", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.finaroProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Name Of Account
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="finaroNameOfAccount"
                                                    disabled={formFields.finaroProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.finaroProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.finaroNameOfAccount.value}
                                                    rules={formFields.finaroNameOfAccount.rules}
                                                    errors={formFields.finaroNameOfAccount.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("finaroNameOfAccount", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.finaroProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Type Of Account
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="finaroTypeOfAccount"
                                                    disabled={formFields.finaroProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.finaroProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.finaroTypeOfAccount.value}
                                                    rules={formFields.finaroTypeOfAccount.rules}
                                                    errors={formFields.finaroTypeOfAccount.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("finaroTypeOfAccount", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={8}>
                                            <BootstrapLabel shrink required = {formFields.finaroProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Name Of Bank
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="finaroNameOfBank"
                                                    disabled={formFields.finaroProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.finaroProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.finaroNameOfBank.value}
                                                    rules={formFields.finaroNameOfBank.rules}
                                                    errors={formFields.finaroNameOfBank.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("finaroNameOfBank", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.finaroProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Name Of Branch
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="finaroNameOfBranch"
                                                    disabled={formFields.finaroProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.finaroProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.finaroNameOfBranch.value}
                                                    rules={formFields.finaroNameOfBranch.rules}
                                                    errors={formFields.finaroNameOfBranch.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("finaroNameOfBranch", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expandedPanel3}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon onClick={this.expandHandleChange('expandedPanel3')}/>}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Checkbox
                        color="primary"
                        style={{ padding: '0px' }}
                        checked={formFields.nttProvider.value}
                        onClick={(e) => this.handleProviderCheckBox("nttProvider", e.target.checked)}
                    />
                    <Typography variant="h6" paddingLeft={1}>Provider 3 (NTT) </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2} >

                        <Grid item xs={12}>
                            <Card style={{ boxShadow: '0 0 4px 4px rgba(0, 0, 0, 0.1)' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.nttProvider.value ? true : false} htmlFor="">
                                                Onboarding Status
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <Autocomplete
                                                    id="defaultCurrency"
                                                    size="small"
                                                    disabled={formFields.nttProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.nttProvider.value ? '' : '#EDEDED' }}
                                                    disablePortal
                                                    options={onboardStatusOptions || []}
                                                    getOptionLabel={(option) => option.description}
                                                    value={onboardStatusOptions.find((v) => v.lookupCode === formFields.nttOnboardingStatus.value) || null}
                                                    onChange={(e, newValue) => this.updateFormField("nttOnboardingStatus", (newValue ? newValue.lookupCode : null))}
                                                    renderInput={(params) => (
                                                        <BootstrapInput
                                                            {...params}
                                                            InputProps={{
                                                                ...params.InputProps,
                                                            }}
                                                            rules={formFields.nttOnboardingStatus.rules}
                                                            value={formFields.nttOnboardingStatus.value}
                                                            errors={formFields.nttOnboardingStatus.errors}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.nttProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Date Onboarding Completed
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <MUIDatePicker
                                                    id="nttDateCompletedForOnboarding"
                                                    disabled={formFields.nttProvider.value ? false : true}
                                                    format={DateFormat.date}
                                                    placeholder="From"
                                                    disablePast={true}
                                                    rules={formFields.nttDateCompletedForOnboarding.rules}
                                                    errors={formFields.nttDateCompletedForOnboarding.errors}
                                                    value={formFields.nttDateCompletedForOnboarding.value ? dayjs(formFields.nttDateCompletedForOnboarding.value) : null}
                                                    disableEdit={true}
                                                    onChange={(e) => { this.handleDateFields(e, "nttDateCompletedForOnboarding") }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.nttProvider.value ? true : false} htmlFor=""
                                                style={{ whiteSpace: 'nowrap' }}>
                                                Merchant id at Provider
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="nttMerchantIdForProvider"
                                                    disabled={formFields.nttProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.nttProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.nttMerchantIdForProvider.value}
                                                    rules={formFields.nttMerchantIdForProvider.rules}
                                                    errors={formFields.nttMerchantIdForProvider.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("nttMerchantIdForProvider", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={12}>
                                            <BootstrapLabel shrink htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Onboarding Notes
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    multiline rows={3}
                                                    id="nttOnboardingNotes"
                                                    disabled={formFields.nttProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.nttProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.nttOnboardingNotes.value}
                                                    rules={formFields.nttOnboardingNotes.rules}
                                                    errors={formFields.nttOnboardingNotes.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("nttOnboardingNotes", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} variant="h6" sm={12} md={12}>
                                            <Typography variant='h6' style={{ color: '#264d73', whiteSpace: 'nowrap' }}   >
                                                Settlement Details
                                            </Typography>
                                        </Grid>
                                        {/* <Grid item xs={12} sm={6} md={6}>
                                            <Typography variant="h6" style={{ color: '#264d73', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}  >

                                                <Checkbox
                                                    color="primary" checked={formFields.nttSettlementsDetailsForAllSer.value} onClick={(e) => this.updateFormField("nttSettlementsDetailsForAllSer", e.target.checked)}
                                                />
                                                Use Same Settlement Details For All  Services
                                            </Typography>
                                        </Grid> */}

                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.nttProvider.value ? true : false} htmlFor=""
                                                style={{ whiteSpace: 'nowrap' }}>
                                                Settlement Currency
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <Autocomplete
                                                    id="nttSettlementCury"
                                                    size="small"
                                                    disabled={formFields.nttProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.nttProvider.value ? '' : '#EDEDED' }}
                                                    disablePortal
                                                    options={currencyList.map((option) => option)}
                                                    getOptionLabel={(option) => `${option}`}
                                                    value={formFields.nttSettlementCury.value}
                                                    onChange={(e, newValue) => this.updateFormField("nttSettlementCury", (newValue ? newValue : null))}
                                                    renderInput={(params) => (
                                                        <BootstrapInput
                                                            {...params}
                                                            InputProps={{
                                                                ...params.InputProps,
                                                            }}
                                                            rules={formFields.nttSettlementCury.rules}
                                                            value={formFields.nttSettlementCury.value}
                                                            errors={formFields.nttSettlementCury.errors}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.nttProvider.value ? true : false} htmlFor=""
                                                style={{ whiteSpace: 'nowrap' }}>
                                                Bank Account Number
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="nttBankAccountNumber"
                                                    disabled={formFields.nttProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.nttProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.nttBankAccountNumber.value}
                                                    rules={formFields.nttBankAccountNumber.rules}
                                                    errors={formFields.nttBankAccountNumber.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("nttBankAccountNumber", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.nttProvider.value ? true : false} htmlFor=""
                                                style={{ whiteSpace: 'nowrap' }}>
                                                Branch Code
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="nttBranchCode"
                                                    disabled={formFields.nttProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.nttProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.nttBranchCode.value}
                                                    rules={formFields.nttBranchCode.rules}
                                                    errors={formFields.nttBranchCode.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("nttBranchCode", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.nttProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Swift BIC
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="nttSwiftBic"
                                                    disabled={formFields.nttProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.nttProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.nttSwiftBic.value}
                                                    rules={formFields.nttSwiftBic.rules}
                                                    errors={formFields.nttSwiftBic.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("nttSwiftBic", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.nttProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Name Of Account
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="nttNameOfAccount"
                                                    disabled={formFields.nttProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.nttProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.nttNameOfAccount.value}
                                                    rules={formFields.nttNameOfAccount.rules}
                                                    errors={formFields.nttNameOfAccount.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("nttNameOfAccount", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.nttProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Type Of Account
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="nttTypeOfAccount"
                                                    disabled={formFields.nttProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.nttProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.nttTypeOfAccount.value}
                                                    rules={formFields.nttTypeOfAccount.rules}
                                                    errors={formFields.nttTypeOfAccount.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("nttTypeOfAccount", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={8}>
                                            <BootstrapLabel shrink required = {formFields.nttProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Name Of Bank
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="nttNameOfBank"
                                                    disabled={formFields.nttProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.nttProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.nttNameOfBank.value}
                                                    rules={formFields.nttNameOfBank.rules}
                                                    errors={formFields.nttNameOfBank.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("nttNameOfBank", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BootstrapLabel shrink required = {formFields.nttProvider.value ? true : false} htmlFor="" style={{ whiteSpace: 'nowrap' }}>
                                                Name Of Branch
                                            </BootstrapLabel>
                                            <FormControl fullWidth>
                                                <BootstrapInput
                                                    id="nttNameOfBranch"
                                                    disabled={formFields.nttProvider.value ? false : true}
                                                    style={{ backgroundColor: formFields.nttProvider.value ? '' : '#EDEDED' }}
                                                    value={formFields.nttNameOfBranch.value}
                                                    rules={formFields.nttNameOfBranch.rules}
                                                    errors={formFields.nttNameOfBranch.errors}
                                                    onChange={(e) => {
                                                        this.updateFormField("nttNameOfBranch", e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </AccordionDetails>

            </Accordion>
        </div>
    );
};



