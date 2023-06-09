import React, { useState, useEffect } from "react"
import { Col, Container, Row, Button, Card } from "reactstrap"
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
import { Link, useHistory } from "react-router-dom"

import cloud from '../../../assets/images/small/cloud-file-download.svg'
import Spinner from "loader"
import { CFormSelect } from "@coreui/react"
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from 'yup'
// import Breadcrumb from '../../../components/Common/Breadcrumb';

function Add(props) {
     // const { inProgress } = useApiStatus()
     const history = useHistory()
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
     const [getData, setGetData] = useState({
          networkName: "",
          blockExplorerUrl: "",
          chainId: "",
          symbol: "",
          networkImage: "",
          rpcUrl: "",
          // description: "",
          categoryName: ""
     })

     const networkAddSchema = Yup.object().shape({
          networkName: Yup.string().required('Enter category name'),
          blockExplorerUrl: Yup.string().required('Enter block explorer url'),
          rpcUrl: Yup.string().required('Enter rpc url'),
          // chainId: Yup.string().required('Enter chain id '),
          chainId: Yup.string().matches(/^[0-9]+$/, "Only number allowed").required('Enter chain id'),
          // description: Yup.string().required('Enter description here'),
          categoryName: Yup.string().required('Choose category'),
          symbol: Yup.string().required('Enter symbol'),
          networkImageUrl: Yup.string().required('Network Image Required.')
     })



     const [selectedFiles, setselectedFiles] = useState([])
     const data = {
          networkName: getData.networkName,
          chainId: getData.chainId,
          blockExplorerUrl: getData.blockExplorerUrl,
          rpcUrl: getData.rpcUrl,
          symbol: getData.symbol,
          networkImage: getData.networkImage,
          // description: getData.description,
          categoryName: getData.categoryName
     }

     function handleAcceptedFiles(files, setFieldValue) {
          const [file] = files

          setGetData(prev => ({
               ...prev,
               networkImage: file,
               networkImageFile: window.URL.createObjectURL(file),
          }))
          setFieldValue("networkImageUrl", window.URL.createObjectURL(file))
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

   

     const [category, setCategory] = useState([])

     useEffect(() => {
          fetchCategoryData()
     }, [setCategory])

     const fetchCategoryData = () => {
          changeApiStatus(true)
          axios.get("https://tokenmaker-apis.block-brew.com/category/categorys")
               .then((res) => {
                    setCategory(res.data.msg.items)
                    console.log(res)
                    changeApiStatus(false)
               })
               .catch((err) => {
                    changeApiStatus(false)
                    console.log(err)
               })
     }

     // console.log(category, "Category name")
     const [categoryValue, setCategoryValue] = useState([])

     const [loader, setLoader] = useState(true)


     const addNetworkHandler = async (e) => {
          changeApiStatus(true)
          const authUser = JSON.parse(localStorage.getItem("authUser"))
          // console.log('getData. ', getData)
          const formData = new FormData()

          for (const fields in getData) {
               formData.append(fields, getData[fields])
          }
          // console.log(formData, "FormData");

          await axios
               .post("https://tokenmaker-apis.block-brew.com/network/newnetwork", formData, {
                    headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` },
               })
               .then(res => {
                    // setApiSuccess()

                    changeApiStatus(false)
                    history.push('/view')
                    toast.success("Network Added Successfully")

               })
               .catch(err => {
                    changeApiStatus(false)
                    setApiFailed(err.message)
                    console.log(err, "network Error")
               })
          setLoader(false)
     }

     return apiStatus.inProgress ? <Spinner /> : (
          <React.Fragment>
               <div className="page-content">
                    <p
                         style={{ color: "#2a3042", fontWeight: 500, fontSize: "17px" }}
                    >Add Network</p>
                    <Row>
                         <Formik initialValues={{
                              networkName: '',
                              blockExplorerUrl: '',
                              chainId: '',
                              rpcUrl: '',
                              // description: '',
                              categoryName: '',
                              symbol:'',
                              networkImageUrl: ''
                         }}
                              validationSchema={networkAddSchema}
                              onSubmit={(values, actions) => {
                                   console.log('aditi noni')
                                   addNetworkHandler()
                              }}
                         >
                              {({ values, setValues, setFieldValue, errors, touched }) => (
                                   <Form>
                                        <div className="row ">
                                             <div className="col-md-12 justify-content-center align-item-center">
                                                  <div className="bg-white pb-3 pt-5">
                                                       {/* <p style={{ textAlign: "center" }}>Add Networks</p> */}
                                                       <>
                                                            <Row className="justify-content-center">
                                                                 <Col sm={8} className="pb-3">
                                                                      <div>
                                                                           <label htmlFor="networkName" className="mb-2 name">
                                                                                <p className="m-0">
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
                                                                                     setFieldValue('networkName', e.target.value)
                                                                                }}
                                                                           />

                                                                           {errors.networkName && touched.networkName ? (
                                                                                <div className="input-error text-danger">{errors.networkName}</div>
                                                                           ) : null}
                                                                      </div>
                                                                 </Col>
                                                                 <Col sm={8} className="pb-3">
                                                                      <div>
                                                                           <label htmlFor="chainId" className="mb-2 name">
                                                                                <p className="m-0">
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
                                                                                     setFieldValue('chainId', e.target.value)
                                                                                }}
                                                                           />
                                                                           {errors.chainId && touched.chainId ? (
                                                                                <div className="input-error text-danger">{errors.chainId}</div>
                                                                           ) : null}
                                                                      </div>
                                                                 </Col>
                                                                 <Col sm={8} className="pb-3">
                                                                      <div>
                                                                           <label
                                                                                htmlFor="blockExplorerUrl"
                                                                                className="mb-2 name"
                                                                           >
                                                                                <p className="m-0">
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
                                                                                     setFieldValue('blockExplorerUrl', e.target.value)
                                                                                }}
                                                                           />
                                                                           {errors.blockExplorerUrl && touched.blockExplorerUrl ? (
                                                                                <div className="input-error text-danger">{errors.blockExplorerUrl}</div>
                                                                           ) : null}
                                                                      </div>
                                                                 </Col>
                                                                 <Col sm={8} className="pb-3">
                                                                      <div>
                                                                           <label htmlFor="rpcUrl" className="mb-2 name">
                                                                                <p className="m-0">
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
                                                                                     setFieldValue('rpcUrl', e.target.value)
                                                                                }}
                                                                           />
                                                                           {errors.rpcUrl && touched.rpcUrl ? (
                                                                                <div className="input-error text-danger">{errors.rpcUrl}</div>
                                                                           ) : null}
                                                                      </div>
                                                                 </Col>
                                                                 <Col sm={8} className="pb-3 ">
                                                                      <div>
                                                                           <label htmlFor="categoryName" className="mb-2 name">
                                                                                <p className="m-0">
                                                                                     Category <span className="input-error">*</span>
                                                                                </p>
                                                                           </label>

                                                                           <CFormSelect
                                                                                className="form-control"
                                                                                aria-label="Small select example"
                                                                                name="categoryName"
                                                                                value={getData.categoryName}
                                                                                onChange={e => {

                                                                                     setGetData({
                                                                                          ...getData,
                                                                                          categoryName: e.target.value
                                                                                     })
                                                                                     setFieldValue('categoryName', e.target.value)
                                                                                }}
                                                                           >
                                                                                <option hidden>Select category</option>
                                                                                {category?.map((content, i) => {
                                                                                     return (
                                                                                          <>
                                                                                               <option
                                                                                                    key={i}
                                                                                                    value={content.categoryName}
                                                                                               >
                                                                                                    {content.categoryName}
                                                                                               </option>
                                                                                          </>
                                                                                     )
                                                                                })}
                                                                           </CFormSelect>
                                                                           {errors.categoryName && touched.categoryName ? (
                                                                                <div className="input-error text-danger">{errors.categoryName}</div>
                                                                           ) : null}
                                                                      </div>
                                                                 </Col>
                                                                 <Col sm={8} className="pb-3 ">
                                                                      <div>
                                                                           <label htmlFor="symbol" className="mb-2 name">
                                                                                <p className="m-0">
                                                                                     Symbol <span className="input-error">*</span>
                                                                                </p>
                                                                           </label>

                                                                           <input
                                                                                type="text"
                                                                                name="symbol"
                                                                                placeholder="Symbol"
                                                                                className="form-control"
                                                                                autoComplete="off"
                                                                                onChange={e => {
                                                                                     setGetData({
                                                                                          ...getData,
                                                                                          symbol: e.target.value,
                                                                                     })
                                                                                     setFieldValue('symbol', e.target.value)
                                                                                }}
                                                                           />
                                                                           {errors.symbol && touched.symbol ? (
                                                                                <div className="input-error text-danger">{errors.symbol}</div>
                                                                           ) : null}
                                                                      </div>
                                                                 </Col>
                                                                 <Col sm={8} className="pb-3">
                                                                      <div>
                                                                           <div>
                                                                                <label className="name mb-2">
                                                                                     <p className="m-0">
                                                                                          Network images{" "}
                                                                                          <span className="input-error">*</span>
                                                                                     </p>
                                                                                </label>
                                                                                <div className="text-center" style={dropZoneStyle}>
                                                                                     <div>
                                                                                          {/* <Form> */}
                                                                                          <Dropzone
                                                                                               accept="image/*"
                                                                                               multiple={false}
                                                                                               onDrop={acceptedFiles => {
                                                                                                    handleAcceptedFiles(acceptedFiles, setFieldValue)
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
                                                                                                              <img
                                                                                                                   width={150}
                                                                                                                   src={getData?.networkImage ? getData?.networkImageFile : cloud}
                                                                                                                   alt=""
                                                                                                              />
                                                                                                              <input
                                                                                                                   {...getInputProps()}
                                                                                                                   accept="image/*"
                                                                                                                   multiple={false}
                                                                                                                   name="networkImageUrl"
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
                                                                           {errors.networkImageUrl && touched.networkImageUrl ? (
                                                                                <div className="input-error text-danger">{errors.networkImageUrl}</div>
                                                                           ) : null}
                                                                      </div>
                                                                      <div style={{ display: "flex" }} className="my-3 mt-4">
                                                                           <div className="">
                                                                                <button
                                                                                     className="btn btn-primary px-4"
                                                                                     type="submit"
                                                                                >
                                                                                      Add
                                                                                </button>
                                                                           </div>
                                                                           <div className="" style={{ marginLeft: "10px" }}>
                                                                                <button
                                                                                     className="btn btn-secondary px-4"
                                                                                     type="submit"
                                                                                     onClick={() => {
                                                                                          history.push('/view')
                                                                                     }}
                                                                                >
                                                                                     Close
                                                                                </button>
                                                                           </div>
                                                                      </div>
                                                                 </Col>


                                                            </Row>
                                                       </>
                                                  </div>
                                             </div>
                                        </div>
                                   </Form>
                              )}
                         </Formik>
                    </Row>
               </div>
          </React.Fragment>
     )
}

Add.propTypes = {
     t: PropTypes.any,
}
export default withTranslation()(Add)
