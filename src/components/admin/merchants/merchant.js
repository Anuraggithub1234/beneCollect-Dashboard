import React, { Component } from 'react';
import { html } from './merchant.html'; // Importing HTML template
import { toast } from 'react-toastify';
import Utils from '../../../service/core/utils';
import { BenepayUserService } from '../../../service/api/benepay-user.service';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FormValidationService from '../../../service/core/validate.service';
import { DashboardService } from '../../../service/api/dashboard.service';

/**
 * @author Vijayakumar
 * 
 * Class created to handle merchants and merchant summary events
 */
class Merchant extends Component {
  fieldNames = [
    'merchantId',
  ];

  rules = {
    merchantId: [{ validate: 'required' }],
  }

  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      self: '',
      isApiCalled: false,
      formFields: this.prepareField(this.fieldNames, this.rules),
      merchantId: '',
      merchantSummary: [],
      rowsWithId: [],
      columns: [
        { field: 'merchantId', headerName: 'ID', width: 325, flex: 1, headerClassName: 'blue-header' },
        { field: 'merchantName', headerName: 'Name', width: 325, flex: 1, headerClassName: 'blue-header' },
        { field: 'emailIdForNotifications', headerName: 'Email', width: 325, flex: 1, headerClassName: 'blue-header' },
        { field: 'phone', headerName: 'Phone', width: 325, flex: 1, headerClassName: 'blue-header' },
        { field: 'status', headerName: 'Status', width: 325, flex: 1, headerClassName: 'blue-header' },
        { field: 'merchantAddress', headerName: 'Address', width: 325, flex: 1, headerClassName: 'blue-header' },
        { field: 'Action', headerName: '  ', width: 325, flex: 1, headerClassName: 'blue-header', renderCell: this.renderActions },

      ],
      showGrid: true,
      selectedTab: 0,

      editedRowIndex: null,
      saveBasicDetails: false,
      saveMerchantLogo: false,
      saveServicePreference: false,
      saveNotification: false,
      saveOnboard: false,
      deleteMerchantLogo: false,
      getBDPreValue: false,
      getLogo: false,
      getNotificationPreValue: false,
      deleteServiceAndPreference: false,
      deleteNotificationDetails: false,
      getOnboardingPreValue: false,
      activateMerchant: false,
      deleteOnboardDetails: false,
      merchanBDSaveStatus: false,
    };
  }

  renderActions = (params) => {
    const { editedRowIndex } = this.state;
    // const isEditing = editedRowIndex === params.rowIndex;

    return (
      <div>

        <EditNoteIcon style={{ cursor: 'pointer' }} onClick={() => this.handleEditClick(params)}>
          <span>Edit</span>
        </EditNoteIcon>

      </div>
    );
  };

  handleEditClick = (param) => {
    console.log('Edit clicked for row index:', param);

    if (param && param.row && param.row.merchantId) {
      this.setState({
        showGrid: false,
        merchantId: param.row.merchantId,
        getBDPreValue: true,
        selectedTab: 0,
      });

      this.updateFormField("merchantId", param.row.merchantId);
    }
  };

  handleSaveClick = (rowIndex) => {
    this.setState({
      editedRowIndex: null,
    });

    if (this.state.selectedTab == 4) {
      this.setState({
        saveOnboard: true
      });
    }
  };

  handleCancelClick = () => {
    this.setState({
      editedRowIndex: null,
    });
  };

  handleChange = (ev) => {
    this.setState({ self: ev.target.value });

    // Calling a method to fetch merchant data
    this.getAllMerchant();
  };

  GetMerchantSummaryIds = () => {
    this.setState({
      rowsWithId:
        this.state.merchantSummary.map((row, index) => ({
          ...row,
          id: index,
          status: 'Active',
          phone: '-',
          emailIdForNotifications: row.emailIdForNotifications || '-',
          deleteMerchantBD: false,
          deleteServiceAndPreference: false,
          deleteNotificationDetails: false,
          deleteMerchantND: false,
          activateMerchant: false,
          deleteOnboardND: false,
        }))
    })
  };

  handleDownloadClick = () => {
    const currentDate = new Date();
    const formattedDate = Utils.formatTwoDigitMonth(currentDate);
    const filename = `merchant_summary_${formattedDate}.csv`;//Csv file name and date format 
    const csvHeaders = this.state.columns.map((column) => column.headerName).join(",");
    const csvData = this.state.rowsWithId.map((row) => this.state.columns.map((column) => row[column.field]).join(",")).join("\n");
    const csvContent = csvHeaders + "\n" + csvData;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");  // Create a download link and trigger the download

    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  getAllMerchant = async () => {
    try {
      // Setting API call flag
      this.setState({ isApiCalled: true });

      const result = await BenepayUserService.getMerchants();

      if (result.data && result.data.merchantSummary) {
        // Updating the component state with merchant summary data
        this.setState({ merchantSummary: result.data.merchantSummary })
        this.GetMerchantSummaryIds();
      }

      if (result.data.status !== '200') {
        // Displaying an error toast message if the API response has an error
        toast.error(result.data.message);
        return;
      }

    } catch (error) {
      console.error(error);
    }
  };


  handleAddNewClick = () => {
    this.setState({
      showGrid: false,
      merchantId: '',
      selectedTab: 0,
    });
    this.state.formFields.merchantId.value = '';
  };

  handleTabChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });

    if (newValue == 0) {
      this.setState({ getBDPreValue: true });
    }
    else if (newValue == 1) {
      this.setState({ getLogo: true });
    }
    else if (newValue == 2) {
      this.setState({ getServiceAndPrefePreValue: true });
    }
    else if (newValue == 3) {
      this.setState({ getNotificationPreValue: true });
    }
    else if (newValue == 4) {
      this.setState({ getOnboardingPreValue: true });
    }
  };

  handleBackClick = () => {

    const previousTabIndex = this.state.selectedTab - 1;

    this.setState({
      selectedTab: previousTabIndex,
    });

    if (previousTabIndex == 0) {
      this.setState({ getBDPreValue: true });
    }
    else if (previousTabIndex == 1) {
      this.setState({ getLogo: true });
    }
    else if (previousTabIndex == 2) {
      this.setState({ getServiceAndPrefePreValue: true });
    }
    else if (previousTabIndex == 3) {
      this.setState({ getNotificationPreValue: true });
    }
    else if (previousTabIndex == 4) {
      this.setState({ getOnboardingPreValue: true });
    }
  };

  getPreValueCallback = (v) => {
    if (v == 0) {
      this.setState({ getBDPreValue: false });
    }
    else if (v == 1) {
      this.setState({ getLogo: false });
    }
    else if (v == 2) {
      this.setState({ getServiceAndPrefePreValue: false });
    }
    else if (v == 3) {
      this.setState({ getNotificationPreValue: false });
    }
    else if (v == 4) {
      this.setState({ getOnboardingPreValue: false });
    }
  }

  handleClearClick = () => {
    if (this[`refTo${this.state.selectedTab}`] && this[`refTo${this.state.selectedTab}`].handleClear) {
      this[`refTo${this.state.selectedTab}`].handleClear();
    }
    else if (this[`refTo${this.state.selectedTab}`] && this[`refTo${this.state.selectedTab}`].clearOnboardingValues) {
      this[`refTo${this.state.selectedTab}`].clearOnboardingValues();
    }
    else if (this[`refTo${this.state.selectedTab}`] && this[`refTo${this.state.selectedTab}`].clearNotificationValues) {
      this[`refTo${this.state.selectedTab}`].clearNotificationValues();
    }
    else if (this[`refTo${this.state.selectedTab}`] && this[`refTo${this.state.selectedTab}`].clearPreferenceValues) {
      this[`refTo${this.state.selectedTab}`].clearPreferenceValues();
    }
  };

  handleDeleteClick = () => {
    if (this.state.selectedTab == 0) {
      this.setState({ deleteMerchantBD: true });
    }
    else if (this.state.selectedTab == 1) {
      this.setState({ deleteMerchantLogo: true });
    }
    else if (this.state.selectedTab == 2) {
      this.setState({ deleteServiceAndPreference: true });
    }
    else if (this.state.selectedTab == 3) {
      this.setState({ deleteMerchantND: true });
    }
    else if (this.state.selectedTab == 4) {
      this.setState({ deleteOnboardDetails: true });
    }
  };

  deleteCallBack = (v) => {
    if (v == 0) {
      this.setState({ deleteMerchantBD: false });
    }
    if (v == 1) {
      this.setState({ deleteMerchantLogo: false });
    }
    if (v == 2) {
      this.setState({ deleteServiceAndPreference: false });
    }
    if (v == 3) {
      this.setState({ deleteMerchantND: false });
    }
    if (v == 4) {
      this.setState({ deleteOnboardDetails: false });
    }
  }

  handleSkipClick = () => {
    const nextTabIndex = this.state.selectedTab + 1;

    this.setState({
      selectedTab: nextTabIndex,
    });
  };

  handleNextClick = async () => {

    if (this.state.selectedTab == 0) {
      let formValid = await this.validateForm();
      const formFields = this.state.formFields;

      this.setState({
        saveBasicDetails: true,
        merchantId: formValid ? formFields.merchantId.value : null,
      });
    }
    else if (this.state.selectedTab == 1) {
      this.setState({
        saveMerchantLogo: true
      });
    }
    else if (this.state.selectedTab == 2) {
      this.setState({
        saveServicePreference: true
      });
    }
    else if (this.state.selectedTab == 3) {
      this.setState({
        saveNotification: true
      });
    }
  };
  handleActivateClick = async () => {
    this.setState({
      activateMerchant: true,

    });


  }
  showSummaryGrid = () => {
    this.setState({ showGrid: true })
    ;


  }

  activateCallBack = () => {
    this.setState({
      activateMerchant: false,
    });
  }

  buttonConfig = {
    0: [
      { label: 'Next', onClick: this.handleNextClick },
      { label: 'Delete', onClick: this.handleDeleteClick },
    ],
    1: [
      { label: 'Back', onClick: this.handleBackClick },
      { label: 'Clear', onClick: this.handleClearClick },
      { label: 'Next', onClick: this.handleNextClick },
      { label: 'Skip', onClick: this.handleSkipClick },
      { label: 'Delete', onClick: this.handleDeleteClick },
    ],
    2: [
      { label: 'Back', onClick: this.handleBackClick },
      { label: 'Next', onClick: this.handleNextClick },
      { label: 'Clear', onClick: this.handleClearClick },
      { label: 'Delete', onClick: this.handleDeleteClick },
      { label: 'Skip', onClick: this.handleSkipClick },
    ],
    3: [
      { label: 'Back', onClick: this.handleBackClick },
      { label: 'Next', onClick: this.handleNextClick },
      { label: 'Clear', onClick: this.handleClearClick },
      { label: 'Delete', onClick: this.handleDeleteClick },
      { label: 'Skip', onClick: this.handleSkipClick },
    ],
    4: [
      { label: 'Back', onClick: this.handleBackClick },
      { label: 'Save', onClick: this.handleSaveClick },
      { label: 'Clear', onClick: this.handleClearClick },
      { label: 'Delete', onClick: this.handleDeleteClick },
      { label: 'Activate Merchant', onClick: this.handleActivateClick },
    ],
  };

  componentDidMount = async () => {
    // Calling the method to fetch merchant data when the component mounts
    this.getAllMerchant()
  }

  saveCallback = (v) => {
    if (v == 0) {
      this.setState({ saveBasicDetails: false });
    }
    if (v == 1) {
      this.setState({ saveMerchantLogo: false });
    }
    if (v == 2) {
      this.setState({ saveServicePreference: false });
    }
    if (v == 3) {
      this.setState({ saveNotification: false });
    }
    if (v == 4) {
      this.setState({ saveOnboard: false });
    }
  }

  saveResponse = (res) => {
    console.log("saveResponse", res);

    if (res.merchanIdForAfterSave && res.merchanIdForAfterSave !== '') {
      this.setState({ merchantId: res.merchanIdForAfterSave, merchanBDSaveStatus: true });
    }

    if (res.basicDetailsFormSave) {
      const nextTabIndex = this.state.selectedTab + 1;

      this.setState({ selectedTab: nextTabIndex }, () => {
        this.handleTabChange(null, this.state.selectedTab);
      });

      if (res.message) {
        setTimeout(() => {
          toast.success("Basic Details Saved Successfully");
        }, 100);
      }
    }
    else if (res.logoUpload) {
      const nextTabIndex = this.state.selectedTab + 1;

      this.setState({ selectedTab: nextTabIndex, getServiceAndPrefePreValue: true });

      if (res.message) {
        setTimeout(() => {
          toast.success("Logo Uploaded Successfully");
        }, 100);
      }
    }
    else if (res.deleteLogo) {
      toast.success("Logo Deleted Successfully");
    }
    else if (res.deleteLogo == false) {
      toast.error("Unable to Delete the logo");
    }
    else if (res.saveSP) {
      const nextTabIndex = this.state.selectedTab + 1;

      this.setState({ selectedTab: nextTabIndex }, () => {
        this.handleTabChange(null, this.state.selectedTab);
      });

      if (res.messages) {
        setTimeout(() => {
          toast.success("Service Saved Successfully");
        }, 100);
      }
    }
    else if (res.saveNtn == true) {
      const nextTabIndex = this.state.selectedTab + 1;

      this.setState({ selectedTab: nextTabIndex });
      setTimeout(() => {
        toast.success("Notification Saved Successfully");
      }, 100);
    }
    else if (res.saveNtn == 'changeTab') {
      const nextTabIndex = this.state.selectedTab + 1;

      this.setState({ selectedTab: nextTabIndex });
    }
    else if (res.onBoardingFormSave) {
      toast.success("Onboarding Saved Successfully");
    }
    else {
      if (!(res.merchanIdForAfterSave && res.merchanIdForAfterSave !== '')) {
        toast.error("Unable to save");
      }
    }
  }

  /**
    * Method to assign basic field data 
    * 
    * @param fieldNames 
    * @param rules 
    * @returns 
    */
  prepareField = (fieldNames, rules) => {
    const fields = {};

    fieldNames.forEach(fieldName => {
      let value = '';

      fields[fieldName] = {
        rules: rules[fieldName] || [],
        value: value,
        errors: []
      };
    });

    return fields;
  }


  /**
      * Method to update the particular field in the form
      * after the updation trigger the field validation
      * 
      * @param {*} fieldName 
      * @param {*} value 
      * @param {*} validate 
      */
  updateFormField = (fieldName, value, validate = true) => {

    let fields = this.state.formFields;

    if (fields.hasOwnProperty(fieldName) != -1) {
      fields[fieldName].value = value;

      this.setState({ formFields: fields });
    }

    if (validate) {
      this.validateField(fieldName);
    }
  }

  /**
    * update the each fields in the form
    * after the updation trigger the field validation
    * 
    * @param {*} formFields 
    */
  updateFormFields = async (formFields, validate = true) => {
    await this.setState({ formFields: formFields });
  }

  /**
    * Validate the form fields
    * 
    * @returns 
    */
  validateForm = async () => {
    let formValid = true;

    for (let fieldName of this.fieldNames) {
      const field = this.state.formFields[fieldName];

      const { errors, valid } = await FormValidationService.validate(field.rules, field.value, this.state.formFields);

      this.state.formFields[fieldName].errors = errors;

      if (!valid) {
        formValid = false;
      }
    };

    this.setState({ formFields: this.state.formFields });

    return formValid;
  }

  /**
     * Validate the field based on designed rules
     * 
     * @param {*} fieldName 
     */
  validateField = async (fieldName) => {
    let field = this.state.formFields[fieldName];

    const { errors, valid } = await FormValidationService.validate(field.rules, field.value, this.state.formFields);

    this.state.formFields[fieldName].errors = errors;

    this.setState({ formFields: this.state.formFields });
  }

  /**
   * Method validate the merchant id is unique
   * @returns 
   */
  validateMerchantIdIsUnique = async () => {
    var mId = this.state.formFields.merchantId.value;

    if (mId !== '' && mId !== null && mId !== undefined) {
      if (mId.length <= 15) {
        var requestObj = { merchantId: mId }
        const response = await DashboardService.validateMerchantId(requestObj);

        if (!response.merchantIdValid) {
          this.state.formFields.merchantId.errors = [response.message];

          this.updateFormFields(this.state.formFields);
        }
      }
      else {
        this.state.formFields.merchantId.errors = ["The Merchant ID is not greater than 15 characters."];

        this.updateFormFields(this.state.formFields);
      }
    }
  }

  // Rendering the component using the HTML template
  render = () => html.apply(this);
}

export default Merchant;
