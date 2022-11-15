import React, { useState, useEffect } from "react"
import { Col, Container, Row, Button, Form } from "reactstrap"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import Breadcrumb from "components/Common/Breadcrumb"
// import ReactInputMask from 'react-input-mask';
import { useParams, useLocation } from "react-router-dom"
import InputMask from "react-input-mask"
import Dropzone from "react-dropzone"
import { toast } from "react-toastify"
import useApiStatus from "hooks/useApiStatus"
import axios from "axios"
// import Breadcrumb from '../../../components/Common/Breadcrumb';

function EditView(props) {
  const { id } = useParams()
  console.log(id,"id of edit ")
  const networkId=id;
  console.log(networkId, "hjgfdnetwokr")
  const location = useLocation()
  // console.log(id, 'ID>>ID>>ID>>ID>>ID')
  // console.log(location, 'Location>>>>>>>')
  // const data = location.state

  const { inProgress } = useApiStatus()

  // const addNetwork = () => {
  //      toast.success("Added Successfully");
  // }
  const authUser = JSON.parse(localStorage.getItem("authUser"))
  const [getData, setGetData] = useState(location.state)
  const [image, setImage] = useState()
  // useEffect(() => {
  //      getNetworkHanlder()
  // },[]) //getData
  // const user = localStorage.getItem('authUser')
  // const parseData = JSON.parse(user)
  // const token = parseData.msg.jsonWebtoken;
  // // console.log(token,"Add token")
  // const[items,setItems]=useState({});
  // const getNetworkHanlder = () => {

  //      axios.get("https://tokenmaker-apis.block-brew.com/cms/networkDetails")
  //      .then((res) => {
  //           setGetData(res)
  //           console.log(res,"Add data")
  //      })
  //      .catch((err) => {
  //           console.log(err)
  //      })
  // }


  const handleChange = e => {
    if (e.target.type === "file") {
      setImage({
        blob: e.target.files[0],
        src: window.URL.createObjectURL(e.target.files[0])
      })
    } else {
      // console.log(e.target.type, 'ADITI')
      setGetData(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    }
  }

  const updateNetworkHandler = async (e) => {
    e.preventDefault();
    console.log(id, "Function network id ")
    let data, formData;
    if (image) {
      data = { ...getData, networkImage: image.blob }
      formData = new FormData()
      for (const field in data) {
        formData.append(field, data[field])
      }
    } else {
      formData = { ...getData }
    }

    const networkId = id

    axios
      .put(
        `https://tokenmaker-apis.block-brew.com/cms/network/${networkId}`,
        formData,
        { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } }
      )
      .then(res => {
        // console.log(res, ">>>>>>>>>>>>>")
        toast.success("Updated Successffully")
      })
      .catch(err => {
        console.log(err, ">>>>>>>>>>>>>>")
        toast.error(err)
      })
  }


  const imageBaseUrl = "https://tokenmaker-apis.block-brew.com/images/"
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

                            <InputMask
                              name="networkName"
                              value={getData?.networkName}
                              placeholder="Enter Network Name"
                              className="form-control"
                              autoComplete="off"
                              onChange={handleChange}
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

                            <InputMask
                              name="chainId"
                              placeholder="Enter Chain Id"
                              className="form-control"
                              autoComplete="off"
                              value={getData?.chainId}
                              onChange={handleChange}
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

                            <InputMask
                              name="blockExplorerUrl"
                              placeholder="Enter Block Explorer Url"
                              className="form-control"
                              autoComplete="off"
                              value={getData?.blockExplorerUrl}
                              onChange={handleChange}
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

                            <InputMask
                              name="rpcUrl"
                              placeholder="Enter RPC Url"
                              className="form-control"
                              autoComplete="off"
                              value={getData?.rpcUrl}
                              onChange={handleChange}
                            />
                            {/* {errors.rpcUrl && touched.rpcUrl ? (
                                                                      <div className="input-error">{errors.rpcUrl}</div>
                                                                 ) : null} */}
                          </div>
                        </Col>
                        <Col sm={8} className="pb-3 mt-3">
                          <div>
                            <label htmlFor="currency" className="mb-2 name">
                              <p>
                                Currency <span className="input-error">*</span>
                              </p>
                            </label>

                            <InputMask
                              name="currency"
                              placeholder="Enter Currency"
                              className="form-control"
                              autoComplete="off"
                              value={getData?.currency}
                              onChange={handleChange}
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
                              <div className="text-center" style={{ border: "1px dashed lightgray", height: "250px" }}>
                                <div className="mb-3 dragdrop-container">

                                  <input
                                    // ref={uploadRef}
                                    disabled={useApiStatus.inProgress}
                                    // id="upload"
                                    name="networkImage"
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    id="networkImage"
                                    onChange={handleChange}
                                  // onChange={(e) => console.log(e, '>>>>>>>>>>>>>>>>>>>>>>') }
                                  // onChange={(e) => handleImageChange(e.target.files)}
                                  />
                                  {/* {image.src ? ( */}
                                  <label htmlFor="networkImage">
                                    <img
                                      className="banner-img"
                                      style={{ width: "200px", height: "120px", marginTop: "65px" }}
                                      src={image ? image.src : imageBaseUrl + getData?.networkImage}
                                      alt=""
                                    // onClick={() => {
                                    //      uploadRef.current.click()
                                    // }}
                                    />
                                  </label>
                                  {/* ) : ( */}
                                  
                                </div>

                              </div>

                            </div>
                          </div>
                        </Col>
                        <div className="mb-4 col-sm-8">
                                    <Button
                                      className="btn btn-success px-4"
                                      type="submit"
                                      onClick={updateNetworkHandler}
                                      // style={{ marginTop: "10px" }}
                                    >
                                      {/* {id ? 'Update' : 'Add'} */} Update
                                    </Button>
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

EditView.propTypes = {
  t: PropTypes.any,
}
export default withTranslation()(EditView)
