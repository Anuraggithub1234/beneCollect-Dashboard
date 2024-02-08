import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Grid, Typography, Divider } from "@material-ui/core";
import DownloadIcon from '@mui/icons-material/Download';
import SquareIcon from '@mui/icons-material/Square';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export function html() {
    const {
        columns,
        rowsWithId,
        isLoading,

    } = this.state;

    return (
        <div style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h1 style={{ color: '#264d73', fontSize: '22px', fontFamily: 'sans-serif', margin: '0' }}>Your Profile</h1>
                <Button
                    className="downloadButton"
                    // variant="contained"
                    onClick={this.handleDownloadClick}
                    style={{ color: 'black', textDecoration: 'underline', textDecorationThickness: '2px' }}
                >
                    <DownloadIcon style={{ marginRight: '5px', color: 'black' }} /> Download
                </Button>
            </div>

            <div >
                <Card style={{ marginBottom: '10px' }}>
                    <CardContent style={{ padding: 'unset' }}>
                        <Grid container>
                            <Grid item lg={12} xl={12} md={12} sm={12} xs={12} style={{ backgroundColor: '#264d73', height: '53px', color: 'rgb(235, 227, 227)', display: 'flex', alignItems: 'center', width: '100%', paddingLeft: '8px' }}>

                                <Typography style={{ fontSize: '14px', color: 'rgb(235, 227, 227)', fontWeight: 'bold' }}>
                                    Merchant Details
                                </Typography>
                            </Grid>
                            <Grid container mt={4} style={{ paddingLeft: '13px', paddingRight: '1120px' }}>
                                <Grid item lg={6} xl={6} md={8} sm={6} xs={6} style={{ marginBottom: '24px', marginTop: '10px' }} >
                                    <Typography>Customer ID </Typography>
                                </Grid>
                                <Grid item lg={6} xl={6} md={8} sm={6} xs={6} style={{ marginBottom: '24px', marginTop: '10px' }}>
                                    <Typography> Cl-1234 </Typography>
                                </Grid>
                                <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                    <Typography>logo </Typography>
                                </Grid>
                                <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                    <Typography> logo1 </Typography>
                                </Grid>
                                <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                    <Typography>Industry </Typography>
                                </Grid>
                                <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                    <Typography> Energy Warehouse </Typography>
                                </Grid>
                                <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                    <Typography>Company Registration ID </Typography>
                                </Grid>
                                <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                    <Typography> 123456789 </Typography>
                                </Grid>
                                <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                    <Typography>Trading Address </Typography>
                                </Grid>
                                <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                    <Typography> 151 Churchil place.Candy Whart.london EC1 4YU </Typography>
                                </Grid>
                                <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                                    <Typography>Registered Address </Typography>
                                </Grid>
                                <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '26px' }}>
                                    <Typography> 151 Churchil place.Candy Whart.london EC1 4YU </Typography>
                                </Grid>
                                <Grid container mt={2}>
                                    <Grid item lg={12} xl={12} md={12} sm={12} xs={12} mt={2} style={{ marginBottom: '24px' }}>
                                        <Typography style={{ textDecoration: 'underline' }}>
                                            Primary Contact
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                        <Typography>Work Email Id </Typography>
                                    </Grid>
                                    <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                        <Typography> 1213131 </Typography>
                                    </Grid>
                                    <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                        <Typography>Mobile Number </Typography>
                                    </Grid>
                                    <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                        <Typography> 1213131 </Typography>
                                    </Grid>
                                    <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                        <Typography>Designation </Typography>
                                    </Grid>
                                    <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                        <Typography> 1213131 </Typography>

                                    </Grid>
                                    <Grid container mt={2}>
                                        <Grid item lg={12} xl={12} md={12} sm={12} xs={12} style={{ marginBottom: '26px' }}>
                                            <Typography style={{ textDecoration: 'underline' }}>
                                                Secondry  Contact
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                            <Typography>secondry contact </Typography>
                                        </Grid>
                                        <Grid item lg={6} xl={6} md={6} sm={6} xs={6} style={{ marginBottom: '24px' }}>
                                            <Typography> 1213131 </Typography>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
            <div style={{ height: 'auto', width: '100%', overflow: 'auto', marginTop: '30px' }}>
                <DataGrid
                    rows={columns.collectionTableService.dummyData}
                    columns={columns.collectionTableService.columns}
                    className="custom-data-grid1"
                    loading={isLoading}
                    disableColumnMenu
                    disableColumnFilter
                    disableRowSelectionOnClick
                    hideFooterPagination
                    pagination={false}
                    autoHeight={true}
                />
            </div>
            <div style={{ height: 'auto', width: '100%', overflow: 'auto', marginTop: '30px' }}>
                <DataGrid
                    rows={columns.preferences.preferencesTableData}
                    columns={columns.preferences.columns}
                    className="custom-data-grid1"
                    initialState={{}}
                    disableColumnMenu
                    disableColumnFilter
                    disableRowSelectionOnClick
                    loading={isLoading}
                    hideFooterPagination
                    pagination={false}
                    autoHeight={true}
                />
            </div>
            <div style={{ height: 'auto', width: '100%', overflow: 'auto', marginTop: '30px' }}>
                <Card style={{ marginBottom: '10px' }}>
                    <CardContent style={{ padding: 'unset' }}>
                        <Grid container>
                            <Grid item lg={8} xl={8} md={8} sm={8} xs={8} style={{ backgroundColor: '#264d73', height: '53px', color: 'rgb(235, 227, 227)', display: 'flex', alignItems: 'center', width: '100%', paddingLeft: '8px' }}>

                                <Typography style={{ fontSize: '14px', color: 'rgb(235, 227, 227)', fontWeight: 'bold' }}>
                                    Merchant Notification
                                </Typography>
                            </Grid>

                            <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ backgroundColor: '#264d73', height: '53px', color: 'rgb(235, 227, 227)', display: 'flex', alignItems: 'center', width: '100%', paddingLeft: '8px' }}>

                                <Typography style={{ fontSize: '14px', color: 'rgb(235, 227, 227)', fontWeight: 'bold' }}>
                                    Payer Notification
                                </Typography>

                            </Grid>

                            <Grid item lg={7} xl={7} md={7} sm={7} xs={7}>
                                <Grid container>
                                    <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '10%' }}>
                                    </Grid>
                                    <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography>  SMS Notification  </Typography>

                                    </Grid>
                                    <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography>  Whatsapp Notification  </Typography>

                                    </Grid>
                                    <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography>  Email Notification  </Typography>

                                    </Grid>

                                    <Grid container >
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', color: 'blue', marginTop: '1rem' }}>
                                            <Typography> Invoices </Typography>

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
                                            {this.state.notificationData.invoices.sms ? (
                                                <Typography>{this.state.notificationData.invoices.sms}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
                                            {this.state.notificationData.invoices.whatsapp ? (
                                                <Typography>{this.state.notificationData.invoices.whatsapp}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
                                            {this.state.notificationData.invoices.email ? (
                                                <Typography>{this.state.notificationData.invoices.email}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>


                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', color: 'blue' }}>
                                            <Typography> Settlement Report </Typography>

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.settlementReport.sms ? (
                                                <Typography>{this.state.notificationData.settlementReport.sms}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.settlementReport.whatsapp ? (
                                                <Typography>{this.state.notificationData.settlementReport.whatsapp}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.settlementReport.email ? (
                                                <Typography>{this.state.notificationData.settlementReport.email}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>

                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', color: 'blue' }}>
                                            <Typography style={{ whiteSpace: 'normal' }} > Refund Notification </Typography>

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.refundNotification.sms ? (
                                                <Typography>{this.state.notificationData.refundNotification.sms}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.refundNotification.whatsapp ? (
                                                <Typography>{this.state.notificationData.refundNotification.whatsapp}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.refundNotification.email ? (
                                                <Typography>{this.state.notificationData.refundNotification.email}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', color: 'blue' }}>
                                            <Typography>Payment Reminders </Typography>
                                        </Grid>

                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.paymentReminders.sms ? (
                                                <Typography>{this.state.notificationData.paymentReminders.sms}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.paymentReminders.whatsapp ? (
                                                <Typography>{this.state.notificationData.paymentReminders.whatsapp}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.paymentReminders.email ? (
                                                <Typography>{this.state.notificationData.paymentReminders.email}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', color: 'blue' }}>
                                            <Typography> Payment Expiry </Typography>
                                        </Grid>

                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.paymentExpiry.sms ? (
                                                <Typography>{this.state.notificationData.paymentExpiry.sms}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.paymentExpiry.whatsapp ? (
                                                <Typography>{this.state.notificationData.paymentExpiry.whatsapp}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.paymentExpiry.email ? (
                                                <Typography>{this.state.notificationData.paymentExpiry.email}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>

                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', color: 'blue' }}>
                                            <Typography> Payment Link </Typography>
                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.paymentLink.sms ? (
                                                <Typography>{this.state.notificationData.paymentLink.sms}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.paymentLink.whatsapp ? (
                                                <Typography>{this.state.notificationData.paymentLink.whatsapp}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.paymentLink.email ? (
                                                <Typography>{this.state.notificationData.paymentLink.email}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>

                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', color: 'blue' }}>
                                            <Typography> Payment Cancellation </Typography>

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.paymentCancellation.sms ? (
                                                <Typography>{this.state.notificationData.paymentCancellation.sms}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.paymentCancellation.whatsapp ? (
                                                <Typography>{this.state.notificationData.paymentCancellation.whatsapp}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {this.state.notificationData.paymentCancellation.email ? (
                                                <Typography>{this.state.notificationData.paymentCancellation.email}</Typography>

                                            ) : (
                                                <CancelIcon style={{ color: 'red' }} />
                                            )}

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider orientation="vertical" flexItem />

                            <Grid item lg={4} xl={4} md={4} sm={4} xs={4}>
                                <Grid container style={{ paddingLeft: '2rem' }}>
                                    <Grid item lg={3} xl={3} md={3} sm={3} xs={3}>
                                        <Typography>  Via SMS  </Typography>
                                    </Grid>

                                    <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ paddingLeft: '2rem' }}>
                                        <Typography>  Via Whatsapp  </Typography>
                                    </Grid>

                                    <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ paddingLeft: '6rem' }}>
                                        <Typography>  Via Email  </Typography>
                                    </Grid>

                                    <Grid item lg={3} xl={3} md={3} sm={3} xs={3} style={{ paddingLeft: '7rem' }}>
                                        <Typography>  Freq  </Typography>
                                    </Grid>

                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px', marginTop: '1rem' }}>
                                        {this.state.notificationData.invoices.payersms ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px', marginTop: '1rem' }}>
                                        {this.state.notificationData.invoices.payerwhatsapp ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px', marginTop: '1rem' }}>
                                        {this.state.notificationData.invoices.payeremail ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.settlementReport.payersms ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.settlementReport.payerwhatsapp ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.settlementReport.payeremail ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.refundNotification.payersms ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.refundNotification.payerwhatsapp ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.refundNotification.payeremail ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>

                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.paymentReminders.payersms ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.paymentReminders.payerwhatsapp ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.paymentReminders.payeremail ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.paymentExpiry.payersms ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.paymentExpiry.payerwhatsapp ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.paymentExpiry.payeremail ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.paymentLink.payersms ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.paymentLink.payerwhatsapp ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.paymentLink.payeremail ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.paymentCancellation.payersms ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.paymentCancellation.payerwhatsapp ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>
                                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{ marginBottom: '24px' }}>
                                        {this.state.notificationData.paymentCancellation.payeremail ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />

                                        ) : (
                                            <CancelIcon style={{ color: 'red' }} />
                                        )}
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
