import React from "react";

import { Box, Grid, Card, CardContent, Typography, Chip, Button, Divider, Link } from "@mui/material";
import { withStyles } from "@material-ui/styles";
import { FileCopyOutlined, PictureAsPdf } from "@material-ui/icons";

import { ButtonPrimary, ButtonSecondary } from "../../$widgets/buttons/form-button";
import Utils from "../../../service/core/utils";
import { toast } from "react-toastify";

const TransactionId = withStyles((theme) => ({
    root: {
        color: "#346799",
        fontWeight: "bold"
    },
}))(Typography);

const CardHead = withStyles((theme) => ({
    root: {
        fontSize: 18,
        marginBottom: 15
    },
}))(Typography);

const StyledChip = withStyles({
    label: {
        fontSize: '15px',
        color: 'rgb(106 158 222)',
    },
})(Chip);

/**
 * Component for align contents inside the grid in a row
  * 
 * @author Muthukumaran
 * 
 * @param {*} props 
 * @returns Component
 */
function GridContent(props) {

    return (
        <>
            {props.value &&
                <Grid container style={{ marginBottom: 20 }}>

                    <Grid item xs={6}>
                        <Typography>{props.title}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid container sx={{paddingLeft:props.padding?1:0}}>
                            {props.children ? props.children : <Typography>{props.value}</Typography>}
                        </Grid>
                    </Grid>

                </Grid>
            }
        </>
    )
}

/**
 * Status widget to show the response and status 
 * after transaction created
 * 
 * @author Muthukumaran
 * 
 * @param props 
 * @returns 
 */
export function PaymentStatusWidget(props) {
    let transaction = props.transaction;
    let mailSent = props.mailSent;
    let paymentLink = props.paymentLink;
    let message = props.message;
    
    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Card>
                        <CardContent style={{ marginLeft: 20}}>
                            <CardHead gutterBottom>
                                {transaction.status ? <Typography style={{fontSize:30,fontWeight:"bold"}}>Success!!</Typography>
                                    : <Typography sx={{fontSize:30,fontWeight:"bold"}}>Failed!!</Typography>}
                            </CardHead>

                            <Grid container spacing={2}>
                                <Grid item xs={10}>

                                    {(transaction.transactionId && !mailSent) && <Grid container style={{ marginBottom: 25 }}>
                                        <Grid item xs={12}>
                                            <Typography variant="span">As instructed, BenePay hasnt sent any email to {transaction.debtorName} requesting payment.</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="span">Payment link can be copied from below and send to payer via alternate means.</Typography>
                                        </Grid>
                                    </Grid>}

                                    {(transaction.transactionId && mailSent) && <Grid container style={{ marginBottom: 50 }}>
                                        <Grid item xs={12}>
                                            <Typography variant="span">An email has been sent to {transaction.debtorName} requesting payment with below details.</Typography>
                                        </Grid>
                                    </Grid>}

                                    {(!transaction.transactionId && message) && <Grid container style={{ marginBottom: 50 }}>
                                        <Grid item xs={12}>
                                            <Typography variant="span" color="danger">{message}</Typography>
                                        </Grid>
                                    </Grid>}

                                    <GridContent
                                        title="BenePay Transaction Id"
                                        value={transaction.transactionId}
                                        padding={true}
                                    >
                                        <Grid item xs={11}>
                                            <TransactionId>{transaction.transactionId}</TransactionId>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Button style={{ padding: 0 }}>
                                                <FileCopyOutlined 
                                                style={{ color: 'rgb(106 158 222)' }} 
                                                onClick={()=> {
                                                    Utils.copyContent(transaction.transactionId, (e) => {
                                                        toast.success('Copied!');
                                                    });
                                                }} 
                                                />
                                            </Button>
                                        </Grid>
                                    </GridContent>

                                    {transaction.transactionId && <Grid container style={{ marginBottom: 20, marginLeft: 20 }}>
                                        <Grid item xs={12}>
                                            <Divider variant="middle" />
                                        </Grid>
                                    </Grid>}

                                    <GridContent
                                        title="Requested Amount"
                                        value={transaction.finalDueAmount}
                                        padding={true}>
                                        <Typography style={{marginRight:10}}>
                                            {transaction.collectionCurrency && transaction.collectionCurrency}
                                        </Typography>
                                        <Typography>
                                            {transaction.finalDueAmount}
                                        </Typography>
                                    </GridContent>

                                    <GridContent
                                        title="Status"
                                        value="true">
                                        {
                                            transaction.transactionId ?
                                                <Chip label={transaction.status} color="success" />
                                                : <Chip label="Failed" color="warning" />
                                        }
                                    </GridContent>

                                    <GridContent
                                        title="Create Timestamp"
                                        value={transaction.createTimestamp}
                                        padding={true}>
                                        <Typography>{Utils.datetimeSystemFormat(transaction.createTimestamp)}</Typography>
                                    </GridContent>

                                    <GridContent
                                        title="Payer"
                                        value={transaction.debtorName}
                                        padding={true}>
                                        <Grid item xs={12}>
                                            <Typography>{transaction.debtorName}</Typography>
                                        </Grid>
                                        {
                                            transaction.debtorEmailId &&
                                            <Grid item xs={12}>
                                                <Typography>{transaction.debtorEmailId}</Typography>
                                            </Grid>
                                        }
                                        {
                                            transaction.debtorMobileNumber &&
                                            <Grid item xs={12}>
                                                <Typography>{transaction.debtorMobileNumber}</Typography>
                                            </Grid>
                                        }
                                    </GridContent>

                                    <GridContent
                                        title="Payment Link"
                                        value={transaction.transactionId}>
                                        <Grid item xs={12}>
                                            <StyledChip
                                                label={paymentLink}
                                                variant="outlined"
                                                deleteIcon={<FileCopyOutlined style={{ color: 'rgb(106 158 222)' }} />}
                                                onDelete={(e) => {
                                                    Utils.copyContent(paymentLink, (e) => {
                                                        toast.success('Copied!');
                                                    })
                                                }}
                                            />
                                        </Grid>
                                    </GridContent>

                                    <GridContent
                                        title="Collection Reference"
                                        value={transaction.collectionReferenceNo}
                                        padding={true} />

                                    <GridContent
                                        title="Description"
                                        value={transaction.reasonForCollection}
                                        padding={true} />

                                    <GridContent
                                        title="Due Date"
                                        value={transaction.paymentDueDate}
                                        padding={true}>
                                        <Typography>{Utils.javaDateToJsFormat(transaction.paymentDueDate)}</Typography>
                                    </GridContent>

                                    <GridContent
                                        title="Expiry Date"
                                        value={transaction.paymentExpiryDate}
                                        padding={true}>
                                        <Typography>{Utils.dateSystemFormat(transaction.paymentExpiryDate)}</Typography>
                                    </GridContent>

                                    <GridContent
                                        title="Invoice"
                                        value={transaction.transactionId}>
                                            <Chip
                                                sx={{padding:1}}
                                                icon={<PictureAsPdf />}
                                                label="Click here to download Invoice"
                                                clickable
                                                color="primary"
                                                onClick={props.generateInvoice}
                                                />
                                    </GridContent>

                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>

                </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <ButtonPrimary
                        onClick={props.onMakeAnother}
                    >
                        Create Another
                    </ButtonPrimary>
                </Grid>
            </Grid>
        </Box>
    )
}
