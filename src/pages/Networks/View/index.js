import React, { useState, useEffect } from "react"
import { Col, Container, Row, Button, Card } from "reactstrap"
import PropTypes from "prop-types"
import { CCard, CCardBody, CFormSwitch } from "@coreui/react"
import { withTranslation } from "react-i18next"
import Breadcrumb from "components/Common/Breadcrumb"
import { useHistory, Link, useParams } from "react-router-dom"
import { DeleteSharp, EditOutlined } from "@mui/icons-material"
// import Breadcrumb from '../../../components/Common/Breadcrumb';
import "./view.css"
import axios from "axios"
import CIcon from "@coreui/icons-react"
import { cilPencil, cilTrash } from "@coreui/icons"
import { toastConfirm } from "common/toast"
import { toast } from 'react-toastify'
import useApiStatus from "hooks/useApiStatus"
import Spinner from "loader"
import { Switch } from "@material-ui/core"

function View(props) {

  const [getData, setGetData] = useState([])
  useEffect(() => {
    getNetworkHanlder()
  }, [])

  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()

  const [activeToggler, setActiveToggler] = useState(true)

  const user = localStorage.getItem("authUser")
  const parseData = JSON.parse(user)
  const token = parseData.msg.jsonWebtoken
  const [items, setItems] = useState({})
  const [loader, setLoader] = useState(true)

  const fetchStatus = () => {
    const authUser = JSON.parse(localStorage.getItem("authUser"))
    axios.get("https://tokenmaker-apis.block-brew.com/network/onlynetworkstatus", {
      headers: {
        Authorization: `Bearer ${authUser.msg.jsonWebtoken}`,
      },
    })
      .then((res) => {
        console.log(res.data.msg, "Toggler status")
        setActiveToggler(res.data.msg)
      })
      .catch((err) => {
        console.log(err, "toggler error")
      })
  }

  useEffect(() => {
    fetchStatus()
  })

  const getNetworkHanlder = () => {
    changeApiStatus(true)
    axios
      .get("https://tokenmaker-apis.block-brew.com/network/networkdetails")
      .then(res => {
        setGetData(res.data.msg.items)

        const authUser = JSON.parse(localStorage.getItem("authUser"))
        setItems(authUser)
        console.log(res, "Add data view page")
        setItems(authUser);
        changeApiStatus(false)
      })
      .catch(err => {
        console.log(err)
        changeApiStatus(false)
        setApiFailed(err.message)
      })
    setLoader(false)
  }

  const deleteNet = networkId => {
    toastConfirm("Are you sure?", `You want to delete this Network ?`)
      .fire()
      .then(async (val) => {
        if (val.isConfirmed) {
          try {
            changeApiStatus(true, "")
            const authUser = JSON.parse(localStorage.getItem("authUser"))
            const list = await axios.delete(
              `https://tokenmaker-apis.block-brew.com/network/deletenetwork/${networkId}`,
              {
                headers: {
                  Authorization: `Bearer ${authUser.msg.jsonWebtoken}`,
                },
              }
            )
            // console.log(list, '>>>>>>')
            if (list.status === 200) {
              changeApiStatus(false, "")
              toast.success("Template deleted successfully")
              getNetworkHanlder()
            } else {
              throw new Error(DeleteData.error)
            }
          } catch (err) {
            toast.error("Cannot Deleted", err.response ? err.response.data.error : err)
            changeApiStatus(false, err.response ? err.response.data.error : err)
          }
        }
      })
  }



  const NetworkToggler = (statusUpdate, selectednetworkId) => {
    // setActiveToggler(false)
    console.log(selectednetworkId, "toggler network id ")
    const data = {
      networkId: selectednetworkId,
      status: statusUpdate
    }
    const authUser = JSON.parse(localStorage.getItem("authUser"))
    axios.put("https://tokenmaker-apis.block-brew.com/network/networkstatus", data, {
      headers: {
        Authorization: `Bearer ${authUser.msg.jsonWebtoken}`,
      },
    })
      .then((res) => {
toast.success(res?.data?.msg)
      })
      .catch((err) => {
        console.log(err, "Toggler error")
        toast.error("Please try again.")
      })
  }

  console.log(activeToggler, "Active toggler value")


  const imageBaseUrl = "https://tokenmaker-apis.block-brew.com/images/"
  return apiStatus.inProgress ? <Spinner /> : (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <p
            style={{ color: "#2a3042", fontWeight: 500, fontSize: "17px" }}
          >View</p>
          <Row>
            <div className="col-xl-12 col-lg-12  mx-auto mb-xl-4 mb-2 ">
              {/* <CCard className='mb-2 border-0 pt-2'> */}
              <CCardBody>
                <div className="row gx-5 align-items-start justify-content-center">
                  <div className="row gx-5 align-items-start justify-content-center">
                    {getData.map((content, i) => (
                      <CCard className="mb-4" key={i}>
                        <span className=" d-block mt-2 mb-2 h4  fw-bold">
                          {content.categoryName}{' '}
                        </span>
                        <div className="row mb-4">
                          {content.networks?.map((net, i) => (
                            <div
                              className="col-xl-3 col-lg-3 col-md-3 overflow-hidden p-2 mx-4 my-3 columnBox"
                              key={i}
                            >
                              {console.log(net, "ADITI NET")}


                              <div className="box-outer">
                                <span className="text-center d-block mt-2 fs-5 inner-logo">
                                  {net.networkName}{" "}
                                </span>

                                <div className="logo" style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                                  <img
                                    className="checkmark"
                                    src={imageBaseUrl + net.networkImage}
                                    alt="img"
                                    style={{ height: "120px", width: "120px" }}
                                  />
                                </div>

                                <h6 className="text-center mt-2 fw-bold">
                                  <div className="view-icons">
                                    <div>
                                      <Link to={{ pathname: `/network-edit/${net._id}`, state: net }}>
                                        <CIcon
                                          icon={cilPencil}
                                          className="text-warning hand me-2"
                                          onClick={() => {
                                          }}
                                        />
                                      </Link>
                                      <CIcon
                                        icon={cilTrash}
                                        className="text-danger hand"
                                        onClick={() => deleteNet(net._id)}
                                      />
                                    </div>

                                    <div>
                                      {/* {console.log(net.active, "Active Toggler")} */}
                                      <CFormSwitch
                                        // checked={checked}
                                        // onChange={handleChange}
                                        // color="primary"
                                        shape="pill"
                                        // size="small"
                                        color={net.active ? 'success' : 'danger'}
                                        // value={net.active}
                                        defaultChecked={net.active === "false" ? false : net.active === "true" ? true : false}
                                        // checked={net.active}
                                        // inputProps={{ 'aria-label': 'controlled' }}
                                        // inputProps={net.active}
                                        onChange={(e) => {
                                          NetworkToggler(e.target.checked ? "true" : "false", net._id)
                                        }
                                        }
                                      />
                                    </div>
                                  </div>


                                </h6>
                                <span className="text-center d-block">
                                  (Id: {net.networkKey})
                                </span>
                                {/* <span className="text-center d-block mt-2 fs-5 inner-logo">
                                  {net.description}{" "}
                                </span> */}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CCard>
                    ))}
                  </div>
                </div>
              </CCardBody>

              {/* </CCard> */}
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

View.propTypes = {
  t: PropTypes.any,
}
export default withTranslation()(View)
