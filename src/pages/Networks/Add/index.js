import React from 'react';
import { Col, Container, Row, Button, Form } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from 'components/Common/Breadcrumb';
// import ReactInputMask from 'react-input-mask';
import InputMask from "react-input-mask"
import Dropzone from 'react-dropzone';
// import Breadcrumb from '../../../components/Common/Breadcrumb';

function Add(props) {
     return (
          <React.Fragment>
               <div className="page-content">
                    <Breadcrumb
                         title={props.t("Landing-Page")}
                         breadcrumbItem={props.t("Add-Network")}
                    />
                    <Row>
                         <>
                              <Form>
                                   <div className="row ">
                                        <div className="col-md-12 justify-content-center align-item-center">
                                             <div className="bg-white pb-3 pt-2">
                                                  <p style={{textAlign:"center"}}>Add Networks</p>
                                             <>
                                                  <Row className="justify-content-center">
                                                       <Col sm={8} className="pb-3">
                                                            <div>
                                                                 <label htmlFor="networkName" className="mb-2 name">
                                                                     <p>Network Name{' '}
                                                                      <span className="input-error">*</span></p>
                                                                 </label>

                                                                 <InputMask
                                                                      name="networkName"
                                                                      placeholder="Enter Network Name"
                                                                      className="form-control"
                                                                      autoComplete="off"
                                                                 />
                                                                 {/* {errors.networkName && touched.networkName ? (
                                                                      <div className="input-error">{errors.networkName}</div>
                                                                 ) : null} */}
                                                            </div>
                                                       </Col>
                                                       <Col sm={8} className="pb-3">
                                                            <div>
                                                                 <label htmlFor="chainId" className="mb-2 name">
                                                                     <p>Chain ID <span className="input-error">*</span></p>
                                                                 </label>

                                                                 <InputMask
                                                                      name="chainId"
                                                                      placeholder="Enter Chain Id"
                                                                      className="form-control"
                                                                      autoComplete="off"
                                                                 />
                                                                 {/* {errors.chainId && touched.chainId ? (
                                                                      <div className="input-error">{errors.chainId}</div>
                                                                 ) : null} */}
                                                            </div>
                                                       </Col>
                                                       <Col sm={8} className="pb-3">
                                                            <div>
                                                                 <label htmlFor="blockExplorerUrl" className="mb-2 name">
                                                                     <p>Block Explorer Url{' '}
                                                                      <span className="input-error">*</span></p>
                                                                 </label>

                                                                 <InputMask
                                                                      name="blockExplorerUrl"
                                                                      placeholder="Enter Block Explorer Url"
                                                                      className="form-control"
                                                                      autoComplete="off"
                                                                 />
                                                                 {/* {errors.blockExplorerUrl && touched.blockExplorerUrl ? (
                                                                      <div className="input-error">{errors.blockExplorerUrl}</div>
                                                                 ) : null} */}
                                                            </div>
                                                       </Col>
                                                       <Col sm={8} className="pb-3">
                                                            <div>
                                                                 <label htmlFor="rpcUrl" className="mb-2 name">
                                                                     <p>RPC Url <span className="input-error">*</span></p>
                                                                 </label>

                                                                 <InputMask
                                                                      name="rpcUrl"
                                                                      placeholder="Enter RPC Url"
                                                                      className="form-control"
                                                                      autoComplete="off"
                                                                 />
                                                                 {/* {errors.rpcUrl && touched.rpcUrl ? (
                                                                      <div className="input-error">{errors.rpcUrl}</div>
                                                                 ) : null} */}
                                                            </div>
                                                       </Col>
                                                       <Col sm={8} className="pb-3 mt-3">
                                                            <div>
                                                                 <label htmlFor="currency" className="mb-2 name">
                                                                     <p>Currency <span className="input-error">*</span></p>
                                                                 </label>

                                                                 <InputMask
                                                                      name="currency"
                                                                      placeholder="Enter Currency"
                                                                      className="form-control"
                                                                      autoComplete="off"
                                                                 />
                                                                 {/* {errors.currency && touched.currency ? (
                                                                      <div className="input-error">{errors.currency}</div>
                                                                 ) : null} */}
                                                            </div>
                                                       </Col>
                                                       <Col sm={8} className="pb-3">
                                                            <div>
                                                                 <div>
                                                                      <label className="name mb-2">
                                                                          <p>Network image {' '}
                                                                      <span className="input-error">*</span></p>
                                                                      </label>
                                                                      <div className="text-center">
                                                                           <div className="mb-3 dragdrop-container">
                                                                                <input
                                                                                     // ref={uploadRef}
                                                                                     // disabled={apiStatus.inProgress}
                                                                                     id="upload"
                                                                                     hidden
                                                                                     // accept="image/*"
                                                                                     type="file"
                                                                                     // onChange={(e) => handleImageChange(e.target.files)}
                                                                                />
                                                                                {/* {image.src ? ( */}
                                                                                     <img
                                                                                          className="banner-img"
                                                                                          // src={image.src}
                                                                                          alt=""
                                                                                          // onClick={() => {
                                                                                          //      uploadRef.current.click()
                                                                                          // }}
                                                                                     />
                                                                                {/* ) : ( */}
                                                                                     <div className="drag-n-drop-container">
                                                                                          <div>
                                                                                               <Dropzone
                                                                                                    // accept="image/*"
                                                                                                    multiple={false}
                                                                                                    // onDrop={(acceptedFiles) => {
                                                                                                    //      handleImageChange(acceptedFiles)
                                                                                                    // }}
                                                                                               >
                                                                                                    {({ getRootProps, getInputProps, isDragActive }) => (
                                                                                                         <section>
                                                                                                              <div className="drop-area">
                                                                                                                   <img width={60}  alt="" />
                                                                                                                   <input
                                                                                                                        // {...getInputProps()}
                                                                                                                        // accept="image/*"
                                                                                                                        multiple={false}
                                                                                                                   />

                                                                                                                   
                                                                                                                        <div>Drop your image file here</div>
                                                                                                                   
                                                                                                                        <p>
                                                                                                                             Drag and drop image file here, or click to
                                                                                                                             select <br />
                                                                                                                             <small className="text-center">
                                                                                                                                 <p>Supported files:</p> jpeg,
                                                                                                                                  jpg, png. | Will be resized to: 1920x1080
                                                                                                                                  px.
                                                                                                                             </small>
                                                                                                                        </p>
                                                                                                                   
                                                                                                              </div>
                                                                                                         </section>
                                                                                                    )}
                                                                                               </Dropzone>
                                                                                          </div>
                                                                                     </div>
                                                                                
                                                                           </div>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </Col>
                                                  </Row>
                                             </>
                                        </div>
                                   </div>
                                   <div className="mb-4 text-center">
                                        <button className="btn btn-primary" type="submit">
                                             {/* {id ? 'Update' : 'Add'} */} Add
                                        </button>
                                   </div>
                                   </div>
                              </Form>
                         </>
                    </Row>
               </div >
          </React.Fragment >
     )
}

Add.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(Add);