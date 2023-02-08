import React, { useEffect, useState, useMemo, useRef } from "react"
import { Col, Container, Row, Button, Card, CardBody } from "reactstrap"
import CIcon from "@coreui/icons-react"
import { cilPencil, cilTrash } from "@coreui/icons"

import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { isEmpty } from "lodash"

import { getOrders as onGetOrders } from "store/actions"
// import {
//   fullDateFormat,
// } from "components/Common/utility"
import moment from "moment"

// import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal"
// import { latestTransaction } from "../../common/data/dashboard"
// import searchicon from "../../assets/images/search-line.svg"
// import calendarremovelines from "../../assets/images/calendar-remove-lines.svg"
// import schedule from "../../assets/images/schedule.svg"
// import downloadfileicon from "../../assets/images/download-file.svg"
import DateRangePicker from "react-bootstrap-daterangepicker"
import {
  CCol,
  CButton,
  CFormSelect,
  CInputGroupText,
  CFormInput,
  CInputGroup,
  CFormLabel,
  CCard,
  CCardBody,
  CCardGroup,
} from "@coreui/react"
import { useParams } from "react-router-dom"
import axios from "axios"
import useApiStatus from "hooks/useApiStatus"
import Spinner from "loader"
import DataTable from "react-data-table-component"
import {
  fullDateFormat,
} from "components/Common/utility"

import "bootstrap-daterangepicker/daterangepicker.css"
import { downloadFile } from "components/Common/utility"

const debounceTime = 300
let distinctUntilChanged = null

const LatestTranaction = () => {
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()

  const [modal1, setModal1] = useState(false)

  const toggleViewModal = () => setModal1(!modal1)

  const [addModal, setAddModal] = useState(false)
  const toggleAddModal = () => setAddModal(!addModal)

  const [edit, setEdit] = useState()
  const [page, setPage] = useState({ current: 1, totalItems: 0, pageSize: 10 })

  const [items, setItems] = useState({})
  const [loader, setLoader] = useState(true)

  const [data, setData] = useState([])

  const fetchData = async (
    pageNumber = 1,
    pageSize = 10,
    exportRequest = "false"
  ) => {
    try {
      changeApiStatus(true, "")
      const list = await axios.get(
        "https://tokenmaker-apis.block-brew.com/subscribe/allsubscribers"
      )
      if (exportRequest === "true") {
        return changeApiStatus(false, "")
      }
      if (list.status === 200) {
        changeApiStatus(false, "")
        setPage({
          ...page,
          totalItems: list.data.totalItems,
          pageSize,
          current: pageNumber,
        })
        setData(
          list.data.msg.items.map((val, index) => {
            console.log(val, "kjhgfdxzfghjk")
            return { ...val, serial: index + 1 }
          })
        )
      } else {
        throw new Error(list.error)
      }
    } catch (err) {
      changeApiStatus(false)
    }
  }

  console.log(data, "kjhgfds")


  useEffect(() => {
    fetchData(page.current, page.pageSize)
    // eslint-disable-next-line
  }, [page.current, page.pageSize])

  const deleteNetwork = id => {
    toastConfirm("Are you sure you want to delete this?")
      .fire()
      .then(async val => {
        if (val.isConfirmed) {
          try {
            changeApiStatus(true, "")
            const authUser = JSON.parse(localStorage.getItem("authUser"))
            const list = await axios.delete(
              `https://tokenmaker-apis.block-brew.com/step/deletestep/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${authUser.msg.jsonWebtoken}`,
                },
              }
            )
            console.log(list, "list delete handler side ")
            if (list?.status === 200) {
              // setApiSuccess()
              changeApiStatus(false)
              toast.success("Network deleted successfully")
              fetchData()
            } else {
              toast.error("list is undefined")
            }
          } catch (err) {
            console.log(err, "err delete handler side ")
            toast.error("error", err.response ? err.response.data.error : err)
            changeApiStatus(false, err.response ? err.response.data.error : err)
          }
        }
      })
  }

  const imageBaseUrl = "https://tokenmaker-apis.block-brew.com/images/"

  const columns = [
    {
      name: "Sr. no",
      selector: row => {
        return row.serial + (page.current - 1) * page.pageSize
      },
    },
    {
      name: "Email",
      selector: row => row.email,
    },
    {
      name: "Subscribed on",
      selector: row => fullDateFormat(row.createdAt),
    },
  ]


  return apiStatus.inProgress ? <Spinner /> : (
    <>
      <div className="page-content">
        <Container fluid>
          <p
            style={{ color: "#2a3042", fontWeight: 500, fontSize: "17px" }}
          >Subscribed Users</p>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody style={{ display: "flex", justifyContent: "center" }}>
                  <DataTable
                    striped
                    columns={columns}
                    data={data}
                    pageSize={10}
                    paginationPerPage={10}
                    paginationServer
                    paginationTotalRows={page.totalItems}
                    paginationRowsPerPageOptions={[10, 20]}
                    onChangePage={e => setPage({ ...page, current: e })}
                    onChangeRowsPerPage={e => setPage({ ...page, pageSize: e })}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

LatestTranaction.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(LatestTranaction)
