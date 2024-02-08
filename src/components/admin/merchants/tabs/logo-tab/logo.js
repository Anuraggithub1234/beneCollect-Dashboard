import React, { Component } from 'react';
import { html } from "./logo.html";
import { toast } from 'react-toastify';
import { DashboardService } from '../../../../../service/api/dashboard.service';

class Logo extends Component {

  INITIATED = "initiated";
  INPROGRESS = "inprogress";
  DONE = "done";

  constructor(props) {
    super(props);

    this.state = {
      merchantId: props.merchantId,
      value: 0,
      save: '',
      delete: '',
      selectedFile: '',
      getPreValue: '',
    }
  }
  fileInputRef = React.createRef();

  handleFileChange = (event) => {
    // Update the state with the selected file
    const selectedFile = event.target.files[0];

    // Validate the file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/heic', 'image/heif', 'image/png'];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      this.setState({ selectedFile: selectedFile });
      this.setState({ imagePreview: null });


      // Create a temporary URL for the image preview
      const imagePreview = URL.createObjectURL(selectedFile);
      this.setState({ imagePreview });

    } else {
      // Clear the selected file and show an error toast with allowed file types
      this.setState({ selectedFile: null, imagePreview: null });
      const allowedTypesString = allowedTypes.map(type => type.replace('image/', '')).join(', ');
      toast.error(`Invalid file type. Please select a valid image file format (${allowedTypesString}).`);
    }
  };


  //Function to check if the selected file is a logo
  isLogo = (file) => {
    // Replace this condition with your logic for determining if the file is a logo
    return file && (file.type === 'image/jpeg' || file.type === 'image/png');
  };

  getBase64FromFile = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  uploadMerchantLogo = async () => {
    var sendRes = { logoUpload: false, message: false };

    if (this.state.selectedFile && this.state.selectedFile instanceof File) {

      this.setState({ loading: true });

      let enfile = await this.getBase64FromFile(this.state.selectedFile);
      enfile = enfile.split(',')[1];

      let reqObj = {
        merchantId: this.props.merchantId,
        file: enfile,
        fileName: this.state.selectedFile.name,
        deleteLogo: false
      }

      const res = await DashboardService.saveMerchantLogo(reqObj);
      console.log("uploadMerchantLogoRes", res);

      if (res && res.statusCode == "200" && res !== undefined && res !== null) {
        this.setState({ save: this.SAVE_DONE, loading: false });
        sendRes.logoUpload = true;
        sendRes.message = true;

      } else {
        this.setState({ loading: false });
      }
    }
    else {
      sendRes.logoUpload = true;
      sendRes.message = false;
    }

    this.props.imgSaveResponse(sendRes);
  };

  fetchLogo = async () => {
    let merchantId = this.state.merchantId;

    if (merchantId) {
      this.setState({ loading: true });

      const reqObj = { merchantId: merchantId }

      const res = await DashboardService.fetchMerchantBasicDetails(reqObj);
      var data = res.merchantBasicDetails[0];

      if (data.merchantLogoUrl !== null) {
        this.setState({
          selectedFile: data.merchantLogoUrl,
          imagePreview: data.merchantLogoUrl,
        });
      }

      this.setState({ loading: false });
    }
  }

  handleClear = () => {
    this.fileInputRef.current.value = "";
    this.setState({
      selectedFile: null,
      imagePreview: null,
    });
  };

  handleDeleteLogo = async () => {

    this.setState({ loading: true });

    let reqObj = {
      merchantId: this.state.merchantId,
      file: null,
      fileName: null,
      deleteLogo: true
    }

    const res = await DashboardService.saveMerchantLogo(reqObj);
    
    let sendRes = { deleteLogo: false };

    if (res && res.statusCode == "200" && res !== undefined && res !== null) {
      this.setState({ delete: this.DELETE_DONE, loading: false });
      sendRes.deleteLogo = true;

      this.props.imgSaveResponse(sendRes);
    } else {

      this.setState({ delete: '', loading: false });
      this.props.imgSaveResponse(sendRes);
    }
  };

  handleUploadClick = () => {
    this.fileInputRef.current.click();
  };

  componentDidMount = () =>{
    if (this.props.getPreValueOfLogo) {
      this.setState({ getPreValue: this.INITIATED });
      //Give a parameter of tab index
      this.props.getPreValueCallback(1);
    }

    if (this.state.getPreValue === this.INITIATED) {
      this.setState({ getPreValue: this.INPROGRESS }, () => {
        this.fetchLogo();
      });
    }
  }

  //Please don't comment or remove any lines in the method
  //!Be careful if you make any change in the componentDidUpdate
  componentDidUpdate = () => {

    if (this.props.saveImg) {
      this.setState({ save: this.INITIATED });
      //Give a parameter of tab index
      this.props.saveImgCallback(1);
    }

    if (this.state.save === this.INITIATED) {
      this.setState({ save: this.INPROGRESS }, () => {
        this.uploadMerchantLogo();
      });
    }

    if (this.props.deleteLogo) {
      this.setState({ delete: this.INITIATED });
      //Give a parameter of tab index
      this.props.deleteImgCallback(1);
    }

    if (this.state.delete === this.INITIATED) {
      this.setState({ delete: this.INPROGRESS }, () => {
        this.setState({ openLogodeletepopup: true })
      });
    }

    if (this.props.getPreValueOfLogo) {
      this.setState({ getPreValue: this.INITIATED });
      //Give a parameter of tab index
      this.props.getPreValueCallback(1);
    }

    if (this.state.getPreValue === this.INITIATED) {
      this.setState({ getPreValue: this.INPROGRESS }, () => {
        this.fetchLogo();
      });
    }
  }

  render = () => html.apply(this);
}
export default (Logo);
