import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import { Tabs, Tab, Stack, Box } from "@mui/material";
import AccordionData from "./onboard-accordion/accordion-data";
import "./onboard-tab.scss";
import { withStyles } from "@material-ui/styles";
import { ButtonPrimary, ButtonSecondary } from "../../../../$widgets/buttons/form-button";
import ConfirmDialog from "../../../../$widgets/dialog";
import InputLabel from "@material-ui/core/InputLabel";



export function html() {
    const {
        selectedTab,
        callPaymentGatwaySaveMethod,
        callPaymentGatwayFetchMethod,
        checkedValues,
        merchantId,
        cardTypesList,
        loading,
        cardType,
        callFetchMethod,
        openActivatepopup,
        openBDdeletepopup,
        previousCardType,
        triggeringDelete,
    } = this.state;

    const { } = this.props;
    const BootstrapLabel = withStyles((theme) => ({
        root: {
            fontSize: '20px !important',
            color: '#474747 !important',
            fontWeight: '450 !important'
        },
    }))(InputLabel);

    return (
        <div>
            {loading && (<div id="semiTransparenDiv"></div>)}

            <Grid container spacing={5} >
                <Grid item xs={3}>
                    <Card style={{ boxShadow: '0 0 4px 4px rgba(0, 0, 0, 0.1)' }}>
                        <CardContent>
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={this.state.selectedTab}
                                onChange={this.handleTabChange}
                            >
                                {cardTypesList.map((option, index) => (
                                    <Tab
                                        key={index}
                                        label={
                                            <Grid container alignItems="center" spacing={1}>
                                                <Grid item>
                                                    <Checkbox
                                                        color="primary"
                                                        onClick={() => { this.handleCardOnChange(option) }}
                                                        checked={checkedValues.length > 0 ? checkedValues.includes(option) : false}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    {option.description}
                                                </Grid>
                                            </Grid>
                                        }
                                        className={`tabStyle ${selectedTab === index ? 'selected-tab' : ''}`}
                                    />
                                ))}
                            </Tabs>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={9}>

                    {selectedTab === 0 || selectedTab === 1 || selectedTab === 2 || selectedTab === 3 || selectedTab === 4 || selectedTab === 5 || selectedTab === 6 ? (
                        <AccordionData
                            ref={(ref) => (this.callClear = ref)}
                            merchantId={merchantId}
                            cardList={checkedValues}
                            currentTab={selectedTab}
                            cardType={cardType}
                            previousCardType={previousCardType}
                            callFetchMethod={callFetchMethod}
                            resetCardTypes={this.resetCardTypes}
                            fetchMethodCallback={this.fetchCallBack}
                            callSaveMethod={callPaymentGatwaySaveMethod}
                            saveMethodCallback={this.saveMethodCallback}
                            saveResForMerchantOnboarding={this.saveResponse}
                            fetchValue={callPaymentGatwayFetchMethod}
                            updateCardType={this.updateCardType}
                            delete={triggeringDelete}
                            deleteCallback={this.deleteCallback}
                        />
                    ) : ''}

                </Grid>
            </Grid>
            <ConfirmDialog open={openActivatepopup} >
                <Box sx={{ width: 334, paddingLeft: '1%' }}>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid xs={12} mt={1}>
                            <BootstrapLabel style={{ fontSize: '18px !important' }}>Do you want to activate this merchant?</BootstrapLabel>
                        </Grid>
                        <Grid xs={12} mt={4}>
                            <Stack spacing={{ xs: 1, sm: 1 }} direction="row" useFlexGap flexWrap="wrap">
                                <ButtonSecondary onClick={() => this.setState({ openActivatepopup: false })}>Cancel</ButtonSecondary>
                                <ButtonPrimary onClick={this.activateMerchant}>Confirm</ButtonPrimary>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </ConfirmDialog>

            <ConfirmDialog open={openBDdeletepopup} >
                <Box sx={{ width: 317, paddingLeft: '1%' }}>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid xs={12} mt={1}>
                            <BootstrapLabel style={{ fontSize: '18px !important' }}>Are you sure you want to delete?</BootstrapLabel>
                        </Grid>
                        <Grid xs={12} mt={4}>
                            <Stack spacing={{ xs: 1, sm: 1 }} direction="row" useFlexGap flexWrap="wrap">
                                <ButtonSecondary onClick={() => this.setState({ openBDdeletepopup: false })}>Cancel</ButtonSecondary>
                                <ButtonPrimary onClick={this.deleteOTD}>Confirm</ButtonPrimary>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </ConfirmDialog>

        </div>
    );
}
