import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faClipboard, faRotateLeft, faCircleXmark, faBell } from '@fortawesome/free-solid-svg-icons';
import { TempStorage, USER_TYPE } from "../../../service/core/storage.service";

const ActionBtn = (props) => {
    
    // getPaymentActionIcons

    const [params,setParams] = useState(props.params);
    const [status, setStatus] = useState(props.params.row.status);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

        setParams(props.params);
        setStatus(props.params.row.status);

        let allowedStatus = ['AWAITING_PAYMENT', 'PARTIALLY_REFUNDED', 'SETTLED', 'REFUNDED', 'PAID']

        let isVisibleValue = allowedStatus.includes(status);

        if(isVisibleValue){
            setIsVisible(true);
        }

    }, [props]);

    return (
        <>  
            {isVisible && <>
                <div className="dropdown" style={{marginRight: '24px', overflow: 'visible'}}>
                    {(status !== 'REFUNDED') && 
                        <button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{display: 'flex', alignItems: 'center', color: '#1A1A1C', border: 'none', outline: 'none', background: "transparent"}}>
                            <FontAwesomeIcon icon={faEllipsisVertical} style={{fontSize: '18px'}}/>
                        </button>
                    }
                    <div className="dropdown-menu dropdown-menu-lg-x-end" aria-labelledby="dropdownMenuButton" style={{padding: '4px', height: 'auto', minWidth: '245px', borderRadius: '4px', background: '#F1F1F1', border: 'none', zIndex: '70'}}>
                      <ul style={{listStyle: 'none', padding: '0', width: '100%', margin: '0', zIndex: '70'}}>
                        {TempStorage.loginUserRole !== USER_TYPE.ADMIN_USER && 
                        <>
                            {(status == 'AWAITING_PAYMENT') && 
                            <>
                                <li key={`${params.id}-copy`} style={{padding: '8px', width: '100%'}} onClick={() => { props.handleCopyClick(params.row.paymentURL); }}>
                                    <FontAwesomeIcon icon={faClipboard} style={{color: '#6654C3', marginRight: '18px'}} /> <span style={{fontSize: '16px', fontWeight: '500', color: '#495370'}}>Copy Payment Link</span>
                                </li>
                            </>}
                        </>}

                        {(status == 'AWAITING_PAYMENT') && 
                        <>
                            <li key={`${params.id}-cancel`} style={{padding: '8px', width: '100%'}} onClick={(e) => {
                                //  (status == 'AWAITING_PAYMENT') ? props.refundClick(e, params.row) : ''
                                 if(status == 'AWAITING_PAYMENT') {
                                     props.refundClick(e, params.row);
                                 }
                                 }}>
                                <FontAwesomeIcon icon={faCircleXmark} style={{color: '#CB4848', marginRight: '18px'}} /> <span style={{fontSize: '16px', fontWeight: '500', color: '#495370'}}>Cancel Payment</span>
                            </li>
                        </>}

                        {(status == 'PAID' || status == 'PARTIALLY_REFUNDED') && 
                        <>
                            <li key={`${params.id}-refund`} style={{padding: '8px', width: '100%'}}                         
                            onClick={(e) => {
                                if (status === 'PAID' || status === 'PARTIALLY_REFUNDED' || status === 'SETTLED' || status == 'REFUNDED') {
                                    props.setSelectedItem(params.row);
                                    props.refundClick(e, params.row);
                                }
                            }}>
                                <FontAwesomeIcon icon={faRotateLeft} style={{color: '#6EC56F', marginRight: '18px'}} /> <span style={{fontSize: '16px', fontWeight: '500', color: '#495370'}}>Initiate Refund</span>
                            </li>
                        </>}

                        {(status == 'AWAITING_PAYMENT') && 
                        <>
                            <li key={`${params.id}-notification`} style={{padding: '8px', width: '100%'}} onClick={() => { props.sendPaymentReminderBtn(params); }}>
                                <FontAwesomeIcon icon={faBell} style={{color: '#C3545B', marginRight: '18px'}} /> <span style={{fontSize: '16px', fontWeight: '500', color: '#495370'}}>Send Payment Reminder</span>
                            </li>
                        </>}

                      </ul>
                    </div>
                </div>
            </>}
        </>
    );

};

export default ActionBtn;