import React, { useState, useEffect } from "react"
import { Col, Container, Row, Button, Form } from "reactstrap"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import Breadcrumb from "components/Common/Breadcrumb"
// import ReactInputMask from 'react-input-mask';
import { useParams, useLocation, useHistory } from "react-router-dom"
import InputMask from "react-input-mask"
import Dropzone from "react-dropzone"
import { toast } from "react-toastify"
import useApiStatus from "hooks/useApiStatus"
import axios from "axios"
import { CFormSelect } from "@coreui/react"
// import Breadcrumb from '../../../components/Common/Breadcrumb';

function EditView(props) {
  const { id } = useParams()
  console.log(id, "id of edit ")
  const networkId = id;
  console.log(networkId, "hjgfdnetwokr")
  const location = useLocation()
  const history = useHistory()

  const { inProgress } = useApiStatus()

  const authUser = JSON.parse(localStorage.getItem("authUser"))
  const [getData, setGetData] = useState(location.state)
  const [image, setImage] = useState()

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

  console.log(getData?.networkName,"NetqworkName")
  console.log(getData?.categoryName,"CategoryName")

  const [category, setCategory] = useState([])

  useEffect(() => {
    fetchCategoryData()
  }, [setCategory])

  const fetchCategoryData = () => {
    axios.get("https://tokenmaker-apis.block-brew.com/category/categorys")
      .then((res) => {
        setCategory(res.data.msg.items)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
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
        `https://tokenmaker-apis.block-brew.com/network/network/${networkId}`,
        formData,
        { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } }
      )
      .then(res => {
        // console.log(res, ">>>>>>>>>>>>>")
        toast.success("Updated Successffully")
        history.push('/view')
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
                    <p style={{ textAlign: "center" }}>Edit Networks</p>
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
                        <Col sm={8} className="pb-3">
                          <div>
                            <label htmlFor="rpcUrl" className="mb-2 name">
                              <p>
                                Description <span className="input-error">*</span>
                              </p>
                            </label>

                            <InputMask
                              name="description"
                              placeholder="Enter description here"
                              className="form-control"
                              autoComplete="off"
                              value={getData?.description}
                              onChange={handleChange}
                            />
                            {/* {errors.rpcUrl && touched.rpcUrl ? (
                                                                      <div className="input-error">{errors.rpcUrl}</div>
                                                                 ) : null} */}
                          </div>
                        </Col>
                        <Col sm={8} className="pb-3">
                          <div>
                            <label htmlFor="categoryName" className="mb-2 name">
                              <p>
                                Category <span className="input-error">*</span>
                              </p>
                            </label>
                            <CFormSelect
                              className="form-control"
                              aria-label="Small select example"
                              name="categoryName"
                              // id={selVal}
                              defaultValue={getData?.category}
                              onChange={handleChange}
                              value={getData?.category}
                              selected={getData?.category}
                            >
                              <option hidden>Select category</option>
                              {category?.map((content, i) => {
                                return (
                                  <>
                                  {console.log(getData.category, '>>>>>>>>>>>>>>>>>>>>>>>>>>HOW COULD YOU')}
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
                            {/* {errors.rpcUrl && touched.rpcUrl ? (
                                                                      <div className="input-error">{errors.rpcUrl}</div>
                                                                 ) : null} */}
                          </div>
                        </Col>

                        <Col sm={8} className="pb-3 mt-3">
                          <div>
                            <label htmlFor="symbol" className="mb-2 name">
                              <p>
                                Symbol <span className="input-error">*</span>
                              </p>
                            </label>

                            <InputMask
                              name="symbol"
                              placeholder="Symbol"
                              className="form-control"
                              autoComplete="off"
                              value={getData?.symbol}
                              onChange={handleChange}
                            />
                            {/* {errors.symbol && touched.symbol ? (
                                                                      <div className="input-error">{errors.symbol}</div>
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
                          <div style={{ display: "flex" }} className="my-3">
                            <div className="mb-4">
                              <Button
                                className="btn btn-success px-4"
                                type="submit"
                                onClick={updateNetworkHandler}
                              // style={{ marginTop: "10px" }}
                              >
                                {/* {id ? 'Update' : 'Add'} */} Update
                              </Button>
                            </div>
                            <div className="mb-4" style={{ marginLeft: "10px" }}>
                              <Button
                                className="btn btn-secondary px-4"
                                type="submit"
                                onClick={() => {
                                  history.push('/view')
                                }}
                              // style={{ marginTop: "10px" }}
                              >
                                {/* {id ? 'Update' : 'Add'} */} Close
                              </Button>
                            </div>
                          </div>

                        </Col>

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
