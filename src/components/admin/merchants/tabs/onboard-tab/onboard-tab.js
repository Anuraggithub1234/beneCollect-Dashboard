import React, { Component } from 'react';
import { html } from "./onboard-tab.html";
import { DashboardService } from '../../../../../service/api/dashboard.service';
import { toast } from 'react-toastify';

class OnboardTab extends Component {

    INITIATED = "initiated";
    INPROGRESS = "inprogress";
    DONE = "done";

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            selectedTab: 0,
            previousCardType:"0",
            loading: false,
            save: '',
            checkedValues: [],
            callPaymentGatwaySaveMethod: false,
            callPaymentGatwayFetchMethod: false,
            merchantId: null,
            cardTypesList: [],
            fetch: '',
            cardType: '1',
            callFetchMethod: false,
            openActivatepopup: false,
            openBDdeletepopup: false,
            triggeringDelete: false,
            flagForactivateMerchant: '',
            deleteOTD: '',
            showGrid: props.showGrid,
        }
    }

    handleTabChange = (event, newValue) => {
        this.setState({ selectedTab: newValue, previousCardType: this.state.selectedTab, cardType: newValue + 1, callFetchMethod: true });
    };

    fetchCallBack = () => {
        this.setState({ callFetchMethod: false });
    }

    deleteCallback = () => {
        this.setState({ triggeringDelete: false });
    }

    saveMerchantOnboarding = () => {
        this.setState({ callPaymentGatwaySaveMethod: true });
    }

    saveMethodCallback = (v) => {
        if (v == 4) {
            this.setState({ callPaymentGatwaySaveMethod: false });
        }
    }

    saveResponse = (res) => {
        this.props.saveResForMerchantOnboarding(res);
    }

    fetchOnboardingValue = () => {
        this.setState({ callPaymentGatwayFetchMethod: true })
    }

    updateCardType = (cardType) => {
        var newArray = [];

        this.state.cardTypesList.forEach((v) => {
            cardType.forEach((ct) =>{
                if (v.lookupCode == ct) {
                    newArray.push(v);
                }
            });
        });

        this.setState({ checkedValues: newArray })
    }

    handleCardOnChange = (option) => {

        const { checkedValues } = this.state;
        const currentIndex = checkedValues.indexOf(option);
        const newCheckedValues = [...checkedValues];

        if (currentIndex === -1) {
            newCheckedValues.push(option);
        } else {
            newCheckedValues.splice(currentIndex, 1);
        }

        this.setState({ checkedValues: newCheckedValues });
    }

    getCardTypes = async () => {
        this.setState({ loading: true });
        const response = await DashboardService.getProviderCardTypes()
        if (!response) {
            return
        }

        const ctResponse = response.cardTypes;

        this.setState({ cardTypesList: ctResponse, loading: false })
    }

    resetCardTypes = () => {
        this.setState({ checkedValues: [] });
    }

    clearOnboardingValues = () => {
        this.setState({ checkedValues: [] }, () => {
            if (this.callClear && this.callClear.clearValues) {
                this.callClear.clearValues();
            }
        });
    }

    activateMerchant = async () => {
        if (this.state.merchantId) {
            const res = await DashboardService.activateMerchantDetails(this.state.merchantId);

            if (res.message) {
                this.setState({ openActivatepopup: false }, () => {
                    toast.success(res.message);
                    setTimeout(() => {
                        this.props.showGrid();
                    }, 1000);

                });
            }
        }
        else {
            this.setState({ openActivatepopup: false }, () => {
                toast.error("Unable To Activate Merchant");
            });
        }
    }

    deleteOTD = async () => {

        if (this.state.merchantId) {
            const res = await DashboardService.deleteOnboardTabDetails(this.state.merchantId);

            if (res.message) {
                this.setState({ openBDdeletepopup: false }, () => {
                    toast.success(res.message);
                    this.setState({ triggeringDelete: true });
                });
            }
        }
        else {
            this.setState({ openBDdeletepopup: false }, () => {
                toast.error("Unable to delete");
            });
        }
    }

    componentDidMount = () => {
        if (this.props.merchantId) {
            this.setState({ merchantId: this.props.merchantId });
        }

        this.getCardTypes();
    }

    //Please don't comment or remove any lines in the method
    //!Be careful if you make any change in the componentDidUpdate
    componentDidUpdate = () => {

        if (this.props.saveOnBoard) {
            this.setState({ save: this.INITIATED });
            //Give a parameter of tab index
            this.props.saveMerchantOnboardingCallback(4);
        }

        if (this.state.save === this.INITIATED) {
            this.setState({ save: this.INPROGRESS }, () => {
                // This callback is executed after the state is updated
                this.saveMerchantOnboarding();
            });
        }

        if (this.props.getValue) {
            this.setState({ fetch: this.INITIATED });
            //Give a parameter of tab index
            this.props.getPreValueCallback(4);
        }

        if (this.state.fetch === this.INITIATED) {
            this.setState({ fetch: this.INPROGRESS }, () => {
                // This callback is executed after the state is updated
                this.fetchOnboardingValue();
            });
        }

        if (this.props.activateMerchant) {
            this.setState({ openActivatepopup: true }, () => {
                this.props.activateMerchantCallBack();

            });
        }
        if (this.props.deleteOnboardOTD) {
            this.setState({ deleteOTD: this.INITIATED, merchantId: this.props.merchantId });
            //Give a parameter of tab index
            this.props.obdeleteCallback(4);
        }

        if (this.state.deleteOTD === this.INITIATED) {
            this.setState({ deleteOTD: this.INPROGRESS, openBDdeletepopup: true });
        }

    }

    render = () => html.apply(this);
}

export default (OnboardTab);
