import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import logo from "../../../assets/images/b_brew.png";
function LogoManager(props) {
     return (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumb
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("Logo Manager")}
                         />
                         <Row>
                              <div>
                                   <div className="card mb-3">
                                        <div className="card-body">
                                             <h5>Admin Logo Manager</h5>

                                             <div className="row">
                                                  <div className="col-sm-6 col-lg-6 mt-1">
                                                       <div className="border position-relative px-2 overflow-hidden">
                                                            {/* {currUpload.includes('headerLogo') && (
                                                                 <div className="spinner-box position-absolute">
                                                                      <Spinner animation="border" />
                                                                 </div>
                                                            )} */}
                                                            <div className="upload-images p-3">
                                                                 <img
                                                                      src={logo}
                                                                      alt=""
                                                                      title=""
                                                                      height={100}
                                                                 />
                                                            </div>
                                                            <div className="mb-3 form-check">
                                                                 <label htmlFor="formFile" className="form-label">
                                                                      Admin Header Logo
                                                                 </label>
                                                                 <input
                                                                      className="form-control"
                                                                      type="file"
                                                                      id="formFile"
                                                                      name="headerLogo"
                                                                      // onChange={(e) => handleImageChange(e.target.files, e.target.name)}
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div className="col-sm-6 col-lg-6 mt-1">
                                                       <div className="border position-relative px-2 overflow-hidden">
                                                            {/* {currUpload.includes('adminFavIcon') && (
                                                                 <div className="spinner-box position-absolute">
                                                                      <Spinner animation="border" />
                                                                 </div>
                                                            )} */}
                                                            <div className="upload-images p-3">
                                                                 <img
                                                                      src={logo}
                                                                      alt=""
                                                                      title=""
                                                                      height={100}
                                                                      // onChange={(e) => handleImageChange(e.target.files, e.target.name)}
                                                                 />
                                                            </div>
                                                            <div className="mb-3 form-check">
                                                                 <label htmlFor="formFile" className="form-label">
                                                                      Admin FavIcon
                                                                 </label>
                                                                 <input
                                                                      className="form-control"
                                                                      type="file"
                                                                      id="formFile"
                                                                      // onChange={(e) => handleImageChange(e.target.files, e.target.name)}
                                                                      name="adminFavIcon"
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   {/*  */}
                              </div>
                              <div>
                                   <div className="card mb-3">
                                        <div className="card-body">
                                             <h5>Investor Logo Manager</h5>

                                             <div className="row">
                                                  <div className="col-sm-6 col-lg-6 mt-1">
                                                       <div className="border position-relative px-2 overflow-hidden">
                                                            {/* {currUpload.includes('investorLogo') && (
                                                                 <div className="spinner-box position-absolute">
                                                                      <Spinner animation="border" />
                                                                 </div>
                                                            )} */}
                                                            <div className="upload-images p-3">
                                                                 <img
                                                                      src={logo}
                                                                      alt=""
                                                                      title=""
                                                                      height={100}
                                                                      // onChange={(e) => handleImageChange(e.target.files, e.target.name)}
                                                                 />
                                                            </div>
                                                            <div className="mb-3 form-check">
                                                                 <label htmlFor="formFile" className="form-label">
                                                                      Investor Header Logo
                                                                 </label>
                                                                 <input
                                                                      className="form-control"
                                                                      type="file"
                                                                      id="formFile"
                                                                      // onChange={(e) => handleImageChange(e.target.files, e.target.name)}
                                                                      name="investorLogo"
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div className="col-sm-6 col-lg-6 mt-1">
                                                       <div className="border position-relative px-2 overflow-hidden">
                                                            {/* {currUpload.includes('investorFavIcon') && (
                                                                 <div className="spinner-box position-absolute">
                                                                      <Spinner animation="border" />
                                                                 </div>
                                                            )} */}
                                                            <div className="upload-images p-3">
                                                                 <img
                                                                      src={logo}
                                                                      alt=""
                                                                      title=""
                                                                      height={100}
                                                                 />
                                                            </div>
                                                            <div className="mb-3 form-check">
                                                                 <label htmlFor="formFile" className="form-label">
                                                                      Investor Favicon
                                                                 </label>
                                                                 <input
                                                                      className="form-control"
                                                                      type="file"
                                                                      id="formFile"
                                                                      name="investorFavIcon"
                                                                      // onChange={(e) => handleImageChange(e.target.files, e.target.name)}
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div className="col-sm-6 col-lg-6 mt-1">
                                                       <div className="border position-relative px-2 overflow-hidden">
                                                            {/* {currUpload.includes('investorMobileViewLogo') && (
                                                                 <div className="spinner-box position-absolute">
                                                                      <Spinner animation="border" />
                                                                 </div>
                                                            )} */}
                                                            <div className="upload-images p-3">
                                                                 <img
                                                                      src={
                                                                           logo
                                                                      }
                                                                      alt=""
                                                                      title=""
                                                                      height={100}
                                                                      // onChange={(e) => handleImageChange(e.target.files, e.target.name)}
                                                                 />
                                                            </div>
                                                            <div className="mb-3 form-check">
                                                                 <label htmlFor="formFile" className="form-label">
                                                                      Investor Mobile View Logo
                                                                 </label>
                                                                 <input
                                                                      className="form-control"
                                                                      type="file"
                                                                      id="formFile"
                                                                      // onChange={(e) => handleImageChange(e.target.files, e.target.name)}
                                                                      name="investorMobileViewLogo"
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   {/*  */}
                              </div>

                         </Row>
                    </Container>
               </div>
          </React.Fragment>
     )
}

LogoManager.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(LogoManager);