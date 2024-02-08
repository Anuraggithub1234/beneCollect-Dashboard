import React, { Component } from 'react';
import './merchant-profile.scss';
import { toast } from 'react-toastify';
import Utils from '../../../../service/core/utils';
import { html } from "./merchant-profile.html";
import { DashboardService } from '../../../../service/api/dashboard.service';
import Checkbox from '@mui/material/Checkbox';
import SquareIcon from '@mui/icons-material/Square';
import Typography from '@mui/material/Typography';

class MerchantProfile extends Component {
  constructor(props) {
    super(props);

    // Initializing component state
    this.state = {
      value: 0,
      self: '',
      isApiCalled: false,
      merchantSummary: [], // Array to store merchant summary data
      rowsWithId: [],
      columns: {
        collectionTableService: this.collectionTableServiceColumns(),
        preferences: this.preferencesTablecolumns(),
      },
      notificationData: this.notificationData(),
    };
  }
  collectionTableServiceColumns = () => {
    const cols = [
      // Define the columns for the data grid
      { field: 'collections', headerName: 'Collection Service', width: '325', flex: 1, headerClassName: 'blue-header' },
      {
        field: 'service_status',
        headerName: 'Service status',
        width: 325,
        flex: 1,
        headerClassName: 'blue-header',
        renderCell: (params) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SquareIcon
              checked={params.value} // Assuming service_status is a boolean indicating whether the service is active
              disabled // You can remove this if you want the checkbox to be interactive
              style={{ color: '#57f542', marginRight: '8px', marginLeft: '8px' }} // You can customize the color
              inputProps={{ 'aria-label': 'Service Status Checkbox' }}
            />
            <Typography>{params.row.service_status}</Typography>
          </div>
        ),
      },
      { field: 'service_start_date', headerName: 'Service Start Date', width: 325, flex: 1, headerClassName: 'blue-header' },
      { field: 'service_end_date', headerName: 'Service End Date', width: 325, flex: 1, headerClassName: 'blue-header' },
      { field: 'settlement-after_payment_date', headerName: 'Settlement After\nPayment Date', width: 325, flex: 1, headerClassName: 'blue-header' },
      { field: 'settlement_account', headerName: 'Settlement Account', width: 325, flex: 1, headerClassName: 'blue-header' },
      { field: 'settlement_ccy', headerName: 'Settlement Ccy', width: 325, flex: 1, headerClassName: 'blue-header' },
    ];

    // Dummy data for the collectionTableServiceColumns
    const dummyData = [
      { id: 1, collections: 'Domestic Cards', service_status: 'Active', service_start_date: '23/10/2023', service_end_date: '', 'settlement-after_payment_date': '1', settlement_account: 'ICIC0000595003901546765', settlement_ccy: 'INR' },
      { id: 2, collections: 'Iternational Cards', service_status: 'Active', service_start_date: '23/10/2023', service_end_date: '', 'settlement-after_payment_date': '1', settlement_account: 'ICIC0000595003901546765', settlement_ccy: 'INR' },
      { id: 3, collections: 'Net Banking', service_status: 'Active', service_start_date: '23/10/2023', service_end_date: '', 'settlement-after_payment_date': '1', settlement_account: 'ICIC0000595003901546765', settlement_ccy: 'INR' },
      { id: 4, collections: 'UPI', service_status: 'Active', service_start_date: '23/10/2023', service_end_date: '', 'settlement-after_payment_date': '1', settlement_account: 'ICIC0000595003901546765', settlement_ccy: 'INR' },
      { id: 5, collections: 'Wallets', service_status: 'Active', service_start_date: '23/10/2023', service_end_date: '', 'settlement-after_payment_date': '1', settlement_account: 'ICIC0000595003901546765', settlement_ccy: 'INR' },
      { id: 6, collections: 'Amex cards', service_status: 'Active', service_start_date: '23/10/2023', service_end_date: '', 'settlement-after_payment_date': '1', settlement_account: 'ICIC0000595003901546765', settlement_ccy: 'INR' },
      { id: 7, collections: 'International Bank Accounts', service_status: 'Active', service_start_date: '23/10/2023', service_end_date: '', 'settlement-after_payment_date': '1', settlement_account: 'ICIC0000595003901546765', settlement_ccy: 'INR' },
      // Add more dummy data as needed
    ];

    return { columns: cols, dummyData: dummyData };
  }

  preferencesTablecolumns = () => {
    const cols1 = [
      // Define the columns for the data grid
      { field: 'payment_type', headerName: 'Preferences', width: 325, flex: 1, headerClassName: 'blue-header' },
      {
        field: 'payment_preference', headerName: '', width: 325, flex: 1, headerClassName: 'blue-header',
        renderCell: (params) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SquareIcon
              checked={params.value} // Assuming service_status is a boolean indicating whether the service is active
              disabled // You can remove this if you want the checkbox to be interactive
              style={{ color: '#57f542', marginRight: '8px' }} // You can customize the color
              inputProps={{ 'aria-label': 'Service Status Checkbox' }}
            />
            <Typography>{params.row.payment_preference}</Typography>
          </div>
        ),
      },
      {
        field: 'screen', headerName: '', width: 325, flex: 1, headerClassName: 'blue-header', renderCell: (params) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SquareIcon
              checked={params.value} // Assuming service_status is a boolean indicating whether the service is active
              disabled // You can remove this if you want the checkbox to be interactive
              style={{ color: '#57f542', marginRight: '8px', marginLeft: '8px' }} // You can customize the color
              inputProps={{ 'aria-label': 'Service Status Checkbox' }}
            />
            <Typography>{params.row.screen}</Typography>
          </div>
        ),
      },
      {
        field: 'preference', headerName: '', width: 325, flex: 1, headerClassName: 'blue-header', renderCell: (params) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SquareIcon
              checked={params.value} // Assuming service_status is a boolean indicating whether the service is active
              disabled // You can remove this if you want the checkbox to be interactive
              style={{ color: '#57f542', marginRight: '8px', marginLeft: '8px' }} // You can customize the color
              inputProps={{ 'aria-label': 'Service Status Checkbox' }}
            />
            <Typography>{params.row.preference}</Typography>
          </div>
        ),
      },

    ]
    const preferencesTableData = [
      { id: 1, payment_type: 'Payment Request Initiation', payment_preference: 'via API', screen: 'via File Upload', preference: 'via screen' },
      {
        id: 2, payment_type: 'Refunds', payment_preference: 'via API', screen: 'via File Upload', preference: 'via screen'
      },
      { id: 3, payment_type: 'Collections', payment_preference: 'via Screen', screen: 'via File Upload', preference: 'via screen' },
      { id: 4, payment_type: 'Generate Invoice For Payment Initiated', payment_preference: 'via API', screen: 'via File Upload', preference: 'via screen' },
      { id: 5, payment_type: 'Default Payment Due Date ', payment_preference: '30 calender days ', screen: 'via File Upload', preference: 'via screen' },
      { id: 6, payment_type: 'Payment Expiry after Due Date', payment_preference: '5 calender days', screen: 'via File Upload', preference: 'via screen' },
    ];

    return { columns: cols1, preferencesTableData: preferencesTableData };
  }

  notificationData = () => {
    return {
      invoices: {
        sms: '+91 9876543210',
        whatsapp: '+91 9876543210',
        email: 'Email Invoices',
        payersms: '+91 9876543210',
        payerwhatsapp: '',
        payeremail: 'Email Invoices for Payer',
      },
      settlementReport: {
        sms: '+91 9876543210',
        whatsapp: '+91 9876543210',
        email: '',
        payersms: '+91 9876543210',
        payerwhatsapp: '',
        payeremail: 'Email Settlement Report for Payer',
      },
      refundNotification: {
        sms: '+91 9876543210',
        whatsapp: '+91 9876543210',
        email: 'Email Refund Notification',
        payersms: '',
        payerwhatsapp: 'WhatsApp Refund Notification for Payer',
        payeremail: 'Email Refund Notification for Payer',
      },
      paymentReminders: {
        sms: '+91 9876543210',
        whatsapp: '',
        email: 'Email Payment Reminders',
        payersms: '+91 9876543210',
        payerwhatsapp: 'WhatsApp Payment Reminders for Payer',
        payeremail: 'Email Payment Reminders for Payer',
      },
      paymentExpiry: {
        sms: '+91 9876543210',
        whatsapp: '+91 9876543210',
        email: '',
        payersms: '+91 9876543210',
        payerwhatsapp: 'WhatsApp Payment Expiry for Payer',
        payeremail: 'Email Payment Expiry for Payer',
      },
      paymentLink: {
        sms: '+91 9876543210',
        whatsapp: '+91 9876543210',
        email: 'Email Payment Link',
        payersms: '',
        payerwhatsapp: 'WhatsApp Payment Link for Payer',
        payeremail: 'Email Payment Link for Payer',
      },
      paymentCancellation: {
        sms: '+91 9876543210',
        whatsapp: '+91 9876543210',
        email: 'Email Payment Cancellation',
        payersms: '',
        payerwhatsapp: 'WhatsApp Payment Cancellation for Payer',
        payeremail: 'Email Payment Cancellation for Payer',
      },
      freq: {
        frequency: 'Email Payment Cancellation for Payer',
      },
    };
  };

  profileData = () => {
    return {
      merchantDetails: {
        customerId: '+91 9876543210',
        logo: '+91 9876543210',
        industry: 'Email Invoices',
        companyRegistrationId: '+91 9876543210',
        tradingAdderess: '',
        registeredAdderess: 'Email Invoices for Payer',

      },
      primaryContact: {
        workEmailId: '+91 9876543210',
        mobileNumber: '+91 9876543210',
        designation: 'master',

      },
      secondryContact: {
        secondryContact: '+91 9876543210',

      },

    };
  };

  handleChange = (ev) => {
    // Handling changes in the input field
    this.setState({ self: ev.target.value });
  };

  componentDidMount = async () => {
  }

  // Rendering the component using the HTML template
  render = () => html.apply(this);
}
export default (MerchantProfile);
