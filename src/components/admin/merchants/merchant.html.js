import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Tabs, Tab, CardContent, Typography, Grid } from "@mui/material";
import "./merchant.scss"
import { FormControl, InputLabel } from '@material-ui/core';
import { withStyles } from "@material-ui/styles";
import BasicDetails from './tabs/basic-details-tab/basic-details';
import Logo from './tabs/logo-tab/logo';
import ServicePreference from './tabs/service-preference-tab/service-preference';
import Notification from './tabs/notifications-tab/notification';
import OnboardTab from './tabs/onboard-tab/onboard-tab';
import { BootstrapInput } from '../../$widgets/form-inputs/BootstrapInput';


export function html() {
  const {
    columns,
    rowsWithId,
    isLoading,
    showGrid,
    selectedTab,
    saveBasicDetails,
    saveMerchantLogo,
    saveServicePreference,
    saveNotification,
    saveOnboard,
    formFields,
    merchantId,
    deleteMerchantLogo,
    getBDPreValue,
    getServiceAndPrefePreValue,
    getLogo,
    getNotificationPreValue,
    deleteServiceAndPreference,
    getOnboardingPreValue,
    deleteMerchantBD,
    deleteMerchantND,
    activateMerchant,
    deleteOnboardDetails,
    merchanBDSaveStatus,
  } = this.state;

  const BootstrapLabel = withStyles((theme) => ({
    root: {
      fontSize: '20px !important',
      color: '#474747 !important',
      fontWeight: '450 !important'
    },
  }))(InputLabel);


  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      {showGrid ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h1 style={{ color: '#264d73', fontSize: '22px', fontFamily: 'sans-serif', margin: '0' }}>Merchant Summary</h1>
            <Button className='downloadButton' variant="outlined" onClick={this.handleAddNewClick} style={{ position: 'absolute', right: '40px', width: '180px' }}>
              Add New
            </Button>
          </div>
          <div>
            <hr className='divider' style={{ border: '1px solid #264d73', width: '100%' }} />
          </div>
          <div style={{ height: '380px', width: '100%', overflowY: 'auto' }}>
            <DataGrid
              rows={rowsWithId}
              columns={columns}
              className="custom-data-grid"
              pagination
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              loading={isLoading}
              pageSizeOptions={[{ value: -1, label: 'All' }, 5, 10]}
              disableColumnMenu
              disableColumnFilter
              disableRowSelectionOnClick
              getRowId={(row) => row.id}
            />
          </div>
          <Button className="downloadButton" variant="contained" onClick={this.handleDownloadClick}
            style={{ background: '#264d73', marginTop: '-4.7%', marginLeft: '92%' }}>
            Download
          </Button>
        </div>
      ) : (
        <>
          <Tabs
            value={selectedTab}
            onChange={this.handleTabChange}
            variant="fullWidth"
            style={{ justifyContent: 'center', justifyItems: 'center', display: 'flex', overflowY: 'auto', marginTop: '16px' }}
          >
            <Tab
              label="Basic Details"
              className={`tabStyle ${selectedTab === 0 ? 'selected-tab' : ''}`}

            />
            <Tab
              label="Logo"
              className={`tabStyle ${selectedTab === 0 ? 'selected-tab' : ''}`}
            />
            <Tab
              label="Services & Preferences"
              className={`tabStyle ${selectedTab === 0 ? 'selected-tab' : ''}`}
            />
            <Tab
              label="Notifications"
              className={`tabStyle ${selectedTab === 0 ? 'selected-tab' : ''}`}
            />
            <Tab
              label="Onboarding"
              className={`tabStyle ${selectedTab === 0 ? 'selected-tab' : ''}`}
            />
          </Tabs>
          <div>
            <hr className='divider' style={{ border: '1px solid #264d73', width: '100%', margin: 'unset' }} />
          </div>

          <Grid container mt={3} paddingLeft={2} columnGap={1}>
            <Grid item sx={3}>
              {merchantId ?
                (<Typography style={{ color: '#264d73', fontSize: '20px', fontWeight: '600' }}>Merchant Id :</Typography>)
                :
                (<Typography style={{ color: '#264d73', fontSize: '20px', fontWeight: '600', marginTop: '1%' }}>Merchant Id *</Typography>)
              }
            </Grid>

            <Grid item sx={2}>

              {merchantId && merchanBDSaveStatus ?
                (<Typography style={{ color: '#264d73', fontSize: '20px', fontWeight: '600', marginTop: '1%' }}>{merchantId}</Typography>)
                : (
                  <FormControl fullWidth>
                    <BootstrapInput
                      id="merchant-Id"
                      value={formFields.merchantId.value}
                      rules={formFields.merchantId.rules}
                      errors={formFields.merchantId.errors}
                      onChange={(e) => {
                        this.updateFormField("merchantId", e.target.value);
                      }}
                      onBlur={() => {this.validateMerchantIdIsUnique();}}
                    />
                  </FormControl>
                )}

            </Grid>
          </Grid>

          <CardContent>

            {selectedTab === 0 && (
              <BasicDetails
                merchantId={merchantId}
                saveBD={saveBasicDetails}
                saveCallback={this.saveCallback}
                getPreValue={getBDPreValue}
                getPreValueCallback={this.getPreValueCallback}
                saveResponse={this.saveResponse}
                deleteMerchantBD={deleteMerchantBD}
                deleteCallback={this.deleteCallBack}
              />
            )}
            {selectedTab === 1 && (
              <Logo
                ref={(ref) => (this.refTo1 = ref)}
                merchantId={merchantId}
                saveImg={saveMerchantLogo}
                saveImgCallback={this.saveCallback}
                imgSaveResponse={this.saveResponse}
                deleteLogo={deleteMerchantLogo}
                deleteImgCallback={this.deleteCallBack}
                getPreValueOfLogo={getLogo}
                getPreValueCallback={this.getPreValueCallback}
              />
            )}
            {selectedTab === 2 && (
              <ServicePreference
                ref={(ref) => (this.refTo2 = ref)}
                merchantId={merchantId}
                getSPPreValue={getServiceAndPrefePreValue}
                getSPPreValueCallback={this.getPreValueCallback}
                saveSP={saveServicePreference}
                saveSPCallback={this.saveCallback}
                sPSaveResponse={this.saveResponse}
                delete={deleteServiceAndPreference}
                spDeleteCallback={this.deleteCallBack}
              />
            )}

            {selectedTab === 3 && (
              <Notification 
                ref={(ref) => (this.refTo3 = ref)}
                merchantId={merchantId} 
                saveNtn={saveNotification} 
                saveNtnCallback={this.saveCallback} 
                notificationSaveResponse={this.saveResponse}
                getNotificationPreValue={getNotificationPreValue}
                getPreValueCallback={this.getPreValueCallback}
                deleteMerchantND={deleteMerchantND}
                nddeleteCallback={this.deleteCallBack}
              />
            )}

            {selectedTab === 4 && (
              <OnboardTab
                ref={(ref) => (this.refTo4 = ref)}
                merchantId={merchantId}
                saveOnBoard={saveOnboard}
                saveMerchantOnboardingCallback={this.saveCallback}
                saveResForMerchantOnboarding={this.saveResponse}
                getValue={getOnboardingPreValue}
                getPreValueCallback={this.getPreValueCallback}
                activateMerchant={activateMerchant}
                activateMerchantCallBack = {this.activateCallBack}
                deleteOnboardOTD={deleteOnboardDetails}
                obdeleteCallback={this.deleteCallBack}
                showGrid={this.showSummaryGrid}
              />
            )}
            <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Grid container spacing={2}>
                {this.buttonConfig[selectedTab].map((button, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: '56%' }}
                      onClick={button.onClick}
                    >
                      {button.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </div>

          </CardContent>
        </ >
      )
      }
    </div >
  );
}
