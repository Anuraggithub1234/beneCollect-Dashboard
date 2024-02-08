import React from 'react';
import logo from "../../../assets/images/benepay-transperent.png";
import vm from "../../../assets/images/vm.jpg";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { AppAccountIcon, AppExitIcon, AppMenuIcon, AppPaymentIcon } from "../../$widgets/icons/app-icons";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip, Menu, Box, MenuItem, Typography } from '@mui/material';
import { MerchantName } from '../../$widgets/merchant-name/MerchantName';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { StorageService, TempStorage, USER_TYPE } from "../../../service/core/storage.service";
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faArrowRightFromBracket, faAddressCard} from '@fortawesome/free-solid-svg-icons'

export function html() {
    const { beneficiaryName, drawerOpen, logoUrl, merchantName, activeMenu, fullMerchantName, anchorElUser, anchorElNav, email, anchorElViewDetails } = this.state;
    const { device, navbarToggle } = this.props

    const loginFunctionItems = [
        {
            text: 'Profile',
            icon: faAddressCard,
            onClick: () => this.navigateToProfile(),
        },
        {
          text: 'Change Password',
          icon: faKey,
          onClick: () => this.navigateToChangePassword(),
        },
        {
          text: 'Sign Out',
          icon: faArrowRightFromBracket,
          onClick: () => this.signOut(),
        },
      ]

    return (
        <nav className="navbar app-header-main navbar-expand-sm navbar-light" style={{background: 'white'}}>
            {device.scale < 2 ?
                <div className="header-content" >

                    <IconButton onClick={this.toggleDrawer}><AppMenuIcon /></IconButton>

                    <ul className={`drawer ${drawerOpen ? 'drawer-open' : ''}`}>
                        <li>
                            <AppAccountIcon />
                            <p>{beneficiaryName}</p>

                        </li>
                        <li onClick={this.handleDashboardNavigate}>
                            <DashboardOutlinedIcon />
                            <p>Dashboard</p>
                        </li>
                        <li onClick={this.handleNavigate}>
                            <AppPaymentIcon />
                            <p>Transaction Summary</p>
                        </li>
                        <li onClick={this.onExit}>
                            <AppExitIcon />
                            <p>Exit</p>
                        </li>
                    </ul>

                    <div className='logo d-flex align-items-center'>
                        <p style={{ marginTop: '10px', color: '#264d73', fontSize: 'var(--font-large)' }}>benepay</p>
                    </div>

                    <div className='user-section'>

                        <AppAccountIcon />
                        <span>{merchantName}</span>
                    </div>
                </div> 
                
                :

                <div className="header-content">
                    <div>
                        <img src={logo} alt='Benepay' style={{width: '170px', aspectRatio: 'auto'}}/>
                    </div>

                    {/* <div className='d-flex' style={{ marginLeft: "100px" }}></div> */}

                    <div className='d-flex align-items-center' style={{ marginLeft: "100px" }}>
                        {merchantName ?
                            <>
                                <div className="dropdown">
                                  <button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{display: 'flex', alignItems: 'center', background: '#D8E0E8', padding: '8px 16px', border: 'none', outline: 'none' , borderRadius: '50px'}}>
                                    <img className={'merchant-logo'} src={logoUrl} alt="Merchant Logo" /> 
                                    <span className='ml-2' style={{fontSize: 'var(--font-x-large)', fontWeight: '500' , color: '#0A365F'}}>{merchantName}</span>
                                  </button>
                                  <div className="dropdown-menu dropdown-menu-lg-end-header" aria-labelledby="dropdownMenuButton" style={{padding: '8px', margin: '0', minWidth: '240px', borderRadius: '4px', background: '#EEDFDF'}}>
                                    <div style={{display: 'flex', alignItems: 'center', borderBottom: '1px solid #ABA6C8', paddingBottom: '8px'}}>
                                        <img className={'merchant-logo'} src={logoUrl} alt="Merchant Logo" style={{height: "36px"}} />
                                        <div className='ml-3' style={{display: 'flex',flexDirection: 'column', justifyContent: 'center'}}>
                                            <h2 style={{fontSize: 'var(--font-large)', fontWeight: '500' , color: '#0A365F'}}>{merchantName}</h2>
                                            <h3 style={{fontSize: 'var(--font-x-small)', fontWeight: '400' , color: '#0A365F', marginTop: '-6px'}}>{email}</h3>
                                        </div>
                                    </div>
                                    <div>
                                        {loginFunctionItems.length > 0 && <>
                                          <ul style={{textDecoration: "none" , padding: '0'}}>
                                            {loginFunctionItems.map(({ text, icon, onClick }, index)=> {
                                              return (
                                              <>
                                                <li key={`Header${index}`} onClick={onClick} style={{display: 'flex', alignItems: 'center', height: '40px', margin: '12px 0', cursor: 'pointer'}}>
                                                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '32px', height: '32px', marginRight: '1rem'}}>
                                                    <FontAwesomeIcon icon={icon} color={"#495370"} style={{ aspectRatio: 'auto', height: '21.6px'}} />
                                                  </div>
                                                  <h4 style={{fontSize: 'var(--font-large)', color: "#495370", fontWeight: 'normal', marginTop: '6px'}}>{text}</h4>
                                                </li>
                                              </>
                                              );
                                            })}
                                          </ul>
                                        </>}
                                    </div>
                                  </div>
                                </div> 
                            </>
                            :
                            <div className='d-flex align-items-center' style={{ marginLeft: "100px" }}>
                                <AccountCircleIcon className={"mt-2 mr-2"} style={{ fontSize: "40px" }} />
                                <span style={{ position: 'relative', top: '4px', marginLeft: '6px', color:"#495370" }}>Guest</span>
                            </div>}
                    </div>
                </div>
                }


            {drawerOpen && <div className={'backdrop'} onClick={this.toggleDrawer} />}
        </nav>
    );
};
