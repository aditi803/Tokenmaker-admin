import React, { useState, useEffect } from "react"
import { Col, Container, Row, Button, Card } from "reactstrap"
import PropTypes from "prop-types"
import { CCard, CCardBody } from "@coreui/react"
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
import {toast} from 'react-toastify'
import useApiStatus from "hooks/useApiStatus"
import Spinner from "loader"

function View(props) {

  const [getData, setGetData] = useState([])
  useEffect(() => {
    getNetworkHanlder()
  }, [])

  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()

  const user = localStorage.getItem("authUser")
  const parseData = JSON.parse(user)
  const token = parseData.msg.jsonWebtoken
  const [items, setItems] = useState({})
  const [loader, setLoader] = useState(true)

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
            toast.error("Cannot Deleted",err.response ? err.response.data.error : err)
            changeApiStatus(false, err.response ? err.response.data.error : err)
          }
        }
      })
  }
  const imageBaseUrl = "https://tokenmaker-apis.block-brew.com/images/"
  return apiStatus.inProgress ? <Spinner /> : (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb
            title={props.t("Landing-Page")}
            breadcrumbItem={props.t("View")}
          />
          <Row>
            <div className="col-xl-12 col-lg-12  mx-auto mb-xl-4 mb-2 ">
              {/* <CCard className='mb-2 border-0 pt-2'> */}
              <CCardBody>
                <div className="row gx-5 align-items-start justify-content-center">
                  <div className="row gx-5 align-items-start justify-content-center">
                    {/* {category.map((content, i) => ( */}
                    <CCard className="mb-4">
                      <span className=" d-block mt-2 mb-2 h4  fw-bold">
                        {/* {content.categoryName}{' '} */}
                      </span>
                      <div className="row mb-4">
                        {getData.map((net, i) => (
                          <div
                            className="col-xl-3 col-lg-3 col-md-3 overflow-hidden p-2 mx-4 my-3 columnBox"
                            key={i}
                          >
                            <div className="box-outer">
                              <span className="text-center d-block mt-2 fs-5 inner-logo">
                                {net.networkName}{" "}
                              </span>
                      
                              <div className="logo" style={{display:"flex",justifyContent:"center",alignItems:"flex-start"}}>
                                <img
                                  className="checkmark"
                                  src={imageBaseUrl + net.networkImage}
                                  alt="img"
                                  style={{height:"120px", width:"120px"}}
                                />
                              </div>

                              <h6 className="text-center mt-2 fw-bold">
                                {/* <button onClick={history.push('/network-edit')}>edit</button> */}
                                {/* <EditOutlined />
                                                                                <DeleteSharp /> */}
                                <Link to={{ pathname: `/network-edit/${net._id}`, state: net }}>
                                  <CIcon
                                    icon={cilPencil}
                                    className="text-warning hand me-2"
                                    onClick={() => {
                                      // navigate(paths.getNetworksUpdate(content._id, net._id))
                                    }}
                                  />
                                </Link>
                                <CIcon
                                  icon={cilTrash}
                                  className="text-danger hand"
                                  onClick={() => deleteNet(net._id)}
                                />
                              </h6>
                              <span className="text-center d-block">
                                (Id: {net.networkKey})
                              </span>
                              <span className="text-center d-block mt-2 fs-5 inner-logo">
                                {net.description}{" "}
                                {/* Create your token on ethereum */}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CCard>
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
