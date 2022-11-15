import React, { useState, useEffect } from "react"
import { Col, Container, Row, Button, Form, Card } from "reactstrap"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import Breadcrumb from "components/Common/Breadcrumb"
// import ReactInputMask from 'react-input-mask';
import InputMask from "react-input-mask"
import Dropzone from "react-dropzone"
import { toast } from "react-toastify"
import useApiStatus from "hooks/useApiStatus"
import axios from "axios"
import './Add.css'
import { Link } from "react-router-dom"

import cloud from '../../../assets/images/small/cloud-file-download.svg'
import Spinner from "loader"
// import Breadcrumb from '../../../components/Common/Breadcrumb';

function Add(props) {
     // const { inProgress } = useApiStatus()
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
     const [getData, setGetData] = useState({
          networkName: "",
          blockExplorerUrl: "",
          chainId: "",
          createdAt: "",
          currency: "",
          networkImage: "",
          rpcUrl: "",
          updatedAt: "",
     })
     const [selectedFiles, setselectedFiles] = useState([])
     const data = {
          networkName: getData.networkName,
          chainId: getData.chainId,
          blockExplorerUrl: getData.blockExplorerUrl,
          rpcUrl: getData.rpcUrl,
          currency: getData.currency,
          networkImage: getData.networkImage,
     }

     function handleAcceptedFiles(files) {
          const [file] = files

          setGetData(prev => ({
               ...prev,
               networkImage: file,
               networkImageFile: window.URL.createObjectURL(file),
          }))

          //     files.map(file =>
          //       Object.assign(file, {
          //         preview: URL.createObjectURL(file),
          //         formattedSize: formatBytes(file.size),
          //       })
          //     )

          //     setselectedFiles(files)
     }

     const dropZoneStyle = {
          border: "2px dashed rgba(110, 25, 194, 0.2705882353)",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "rgba(244, 245, 247, 0.67)",
          borderRadius: "3px",
          padding: "40px 0 "
     }

     function formatBytes(bytes, decimals = 2) {
          if (bytes === 0) return "0 Bytes"
          const k = 1024
          const dm = decimals < 0 ? 0 : decimals
          const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

          const i = Math.floor(Math.log(bytes) / Math.log(k))
          return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
     }

     const [loader, setLoader] = useState(true)

     const addNetworkHandler = async (e) => {
          // console.log("hgello")
          e.preventDefault()
          changeApiStatus(true)
          const authUser = JSON.parse(localStorage.getItem("authUser"))

          const formData = new FormData()

          for (const fields in getData) {
               formData.append(fields, getData[fields])
          }

          await axios
               .post("https://tokenmaker-apis.block-brew.com/cms/newnetwork", formData, {
                    headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` },
               })
               .then(res => {
                    setApiSuccess()
                    changeApiStatus(false)
                    toast.success("Network Added Successfully")
               })
               .catch(err => {
                    changeApiStatus(false)
                    setApiFailed(err.message)
                    console.log(err, "network Error")
               })
               setLoader(false)
     }

     // console.log(getData, "njbvcxzdsfghjk")

     return apiStatus.inProgress ? <Spinner /> : ( 
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
                                                  <p style={{ textAlign: "center" }}>Add Networks</p>
                                                  <>
                                                       <Row className="justify-content-center">
                                                            <Col sm={8} className="pb-3">
                                                                 <div>
                                                                      <label htmlFor="networkName" className="mb-2 name">
                                                                           <p>
                                                                                Network Name{" "}
                                                                                <span className="input-error">*</span>
                                                                           </p>
                                                                      </label>

                                                                      <input
                                                                           type="text"
                                                                           name="networkName"
                                                                           placeholder="Enter Network Name"
                                                                           className="form-control"
                                                                           autoComplete="off"
                                                                           onChange={e => {
                                                                                setGetData({
                                                                                     ...getData,
                                                                                     networkName: e.target.value,
                                                                                })
                                                                           }}
                                                                      />

                                                                      {/* {errors.networkName && touched.networkName ? (
                                                                      <div className="input-error">{errors.networkName}</div>
                                                                 ) : null} */}
                                                                 </div>
                                                            </Col>
                                                            <Col sm={8} className="pb-3">
                                                                 <div>
                                                                      <label htmlFor="chainId" className="mb-2 name">
                                                                           <p>
                                                                                Chain ID <span className="input-error">*</span>
                                                                           </p>
                                                                      </label>

                                                                      <input
                                                                           type="text"
                                                                           name="chainId"
                                                                           placeholder="Enter Chain Id"
                                                                           className="form-control"
                                                                           autoComplete="off"
                                                                           onChange={e => {
                                                                                setGetData({
                                                                                     ...getData,
                                                                                     chainId: e.target.value,
                                                                                })
                                                                           }}
                                                                      />
                                                                      {/* {errors.chainId && touched.chainId ? (
                                                                      <div className="input-error">{errors.chainId}</div>
                                                                 ) : null} */}
                                                                 </div>
                                                            </Col>
                                                            <Col sm={8} className="pb-3">
                                                                 <div>
                                                                      <label
                                                                           htmlFor="blockExplorerUrl"
                                                                           className="mb-2 name"
                                                                      >
                                                                           <p>
                                                                                Block Explorer Url{" "}
                                                                                <span className="input-error">*</span>
                                                                           </p>
                                                                      </label>

                                                                      <input
                                                                           type="text"
                                                                           name="blockExplorerUrl"
                                                                           placeholder="Enter Block Explorer Url"
                                                                           className="form-control"
                                                                           autoComplete="off"
                                                                           onChange={e => {
                                                                                setGetData({
                                                                                     ...getData,
                                                                                     blockExplorerUrl: e.target.value,
                                                                                })
                                                                           }}
                                                                      />
                                                                      {/* {errors.blockExplorerUrl && touched.blockExplorerUrl ? (
                                                                      <div className="input-error">{errors.blockExplorerUrl}</div>
                                                                 ) : null} */}
                                                                 </div>
                                                            </Col>
                                                            <Col sm={8} className="pb-3">
                                                                 <div>
                                                                      <label htmlFor="rpcUrl" className="mb-2 name">
                                                                           <p>
                                                                                RPC Url <span className="input-error">*</span>
                                                                           </p>
                                                                      </label>

                                                                      <input
                                                                           type="text"
                                                                           name="rpcUrl"
                                                                           placeholder="Enter RPC Url"
                                                                           className="form-control"
                                                                           autoComplete="off"
                                                                           onChange={e => {
                                                                                setGetData({
                                                                                     ...getData,
                                                                                     rpcUrl: e.target.value,
                                                                                })
                                                                           }}
                                                                      />
                                                                      {/* {errors.rpcUrl && touched.rpcUrl ? (
                                                                      <div className="input-error">{errors.rpcUrl}</div>
                                                                 ) : null} */}
                                                                 </div>
                                                            </Col>
                                                            <Col sm={8} className="pb-3 ">
                                                                 <div>
                                                                      <label htmlFor="currency" className="mb-2 name">
                                                                           <p>
                                                                                Currency <span className="input-error">*</span>
                                                                           </p>
                                                                      </label>

                                                                      <input
                                                                           type="text"
                                                                           name="currency"
                                                                           placeholder="Enter Currency"
                                                                           className="form-control"
                                                                           autoComplete="off"
                                                                           onChange={e => {
                                                                                setGetData({
                                                                                     ...getData,
                                                                                     currency: e.target.value,
                                                                                })
                                                                           }}
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
                                                                                <p>
                                                                                     Network image{" "}
                                                                                     <span className="input-error">*</span>
                                                                                </p>
                                                                           </label>
                                                                           <div className="text-center" style={dropZoneStyle}>
                                                                                <div className=" dragdrop-container">
                                                                                     {/* <Form> */}
                                                                                     <Dropzone
                                                                                          accept="image/*"
                                                                                          multiple={false}
                                                                                          onDrop={acceptedFiles => {
                                                                                               handleAcceptedFiles(acceptedFiles)
                                                                                          }}
                                                                                     >
                                                                                          {({
                                                                                               getRootProps,
                                                                                               getInputProps,
                                                                                               isDragActive,
                                                                                          }) => (
                                                                                               <section>
                                                                                                    <div
                                                                                                         className="drop-area"
                                                                                                         {...getRootProps()}
                                                                                                    >
                                                                                                         {/* {getData?.networkImage && ( */}
                                                                                                         <img
                                                                                                              width={150}
                                                                                                              src={getData?.networkImage ? getData?.networkImageFile : cloud}
                                                                                                              alt=""
                                                                                                         />
                                                                                                         {/* )} */}
                                                                                                         <input
                                                                                                              {...getInputProps()}
                                                                                                              accept="image/*"
                                                                                                              multiple={false}
                                                                                                         />

                                                                                                         {isDragActive ? (
                                                                                                              <div>
                                                                                                                   Drop your image file here
                                                                                                              </div>
                                                                                                         ) : (
                                                                                                              <p>
                                                                                                                   Drag n drop image file here, or
                                                                                                                   click to select <br />
                                                                                                                   <small className="text-center">
                                                                                                                        <strong>
                                                                                                                             Supported files:
                                                                                                                        </strong>{" "}
                                                                                                                        jpeg, jpg, png. | Will be
                                                                                                                        resized to: 1920x1080 px.
                                                                                                                   </small>
                                                                                                              </p>
                                                                                                         )}
                                                                                                    </div>
                                                                                               </section>
                                                                                          )}
                                                                                     </Dropzone>
                                                                                     <div
                                                                                          className="dropzone-previews mt-3"
                                                                                          id="file-previews"
                                                                                     >
                                                                                     </div>
                                                                                </div>
                                                                           </div>
                                                                      </div>
                                                                 </div>
                                                            </Col>
                                                            <div className="mb-4 col-sm-8">
                                                                 <button
                                                                      className="btn btn-primary px-4"
                                                                      type="submit"
                                                                      onClick={addNetworkHandler}
                                                                 >
                                                                      {/* {id ? 'Update' : 'Add'} */} Add
                                                                 </button>
                                                            </div>
                                                       </Row>
                                                  </>
                                             </div>
                                        </div>
                                   </div>
                              </Form>
                         </>
                    </Row>
               </div>
          </React.Fragment>
     )
}

Add.propTypes = {
     t: PropTypes.any,
}
export default withTranslation()(Add)
