import React, { useEffect, useState, useMemo, useRef } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { isEmpty } from "lodash"

import { Button, Card, CardBody } from "reactstrap"
import { getOrders as onGetOrders } from "store/actions"
import moment from "moment"

import searchicon from "../../assets/images/search-line.svg"
import calendarremovelines from "../../assets/images/calendar-remove-lines.svg"
import schedule from "../../assets/images/schedule.svg"
import downloadfileicon from "../../assets/images/download-file.svg"
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
  StandardPicketDateFormat,
} from "components/Common/utility"

import "bootstrap-daterangepicker/daterangepicker.css"
import { downloadFile } from "components/Common/utility"

const debounceTime = 300
let distinctUntilChanged = null

const DashboardTokens = () => {
  const user = localStorage.getItem("authUser")
  const parseData = JSON.parse(user)
  const token = parseData.msg.jsonWebtoken

  const [networkStatus, setNetworkStatus] = useState("")

  const [transactionData, setTransactionData] = useState([])
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()

  const [loader, setLoader] = useState(true)

console.log('dummmy change test')

  const [data, setData] = useState([])
  const [pageData, setPageData] = useState({
    current: 1,
    totalItems: 0,
    pageSize: 5,
  })
  const [status, setStatus] = useState("")

  const [dateFilter, setDateFilter] = useState([])

  const [calendarIsShowing, setCalendarIsShowing] = useState(false)
  const inputRef = useRef(null)
  const [query, setQuery] = useState("")

  const dateFilterChange = (e, picker) => {
    
    const filter = [
      picker.startDate.format("YYYY-MM-DD"),
      picker.endDate.format("YYYY-MM-DD"),
    ]
    setDateFilter(filter)
    fetchData(pageData.current, pageData.pageSize , filter, query)
  }

  const [network, setNetwork] = useState()


  const fetchNetwork = () => {
    changeApiStatus(true)
    axios
      .get("https://tokenmaker-apis.block-brew.com/network/networkdetails")
      .then(res => {
        setNetwork(res.data.msg.items)

        changeApiStatus(false)
      })
      .catch(err => {
        console.log(err)
        changeApiStatus(false)
        setApiFailed(err.message)
      })
    // setLoader(false)
  }

  const fetchData = async (
    page = 1,
    limit = 5,
    dateFilter = [],
    query = "",
    exportRequest = "false",
    networkStatus = ""
  ) => {
    try {
      changeApiStatus(true, "")
      const [startDate, endDate] =
        dateFilter.length === 0 ? ["", ""] : dateFilter

        console.log(limit,page,"limit and page")
      const list = await axios.get(
        `https://tokenmaker-apis.block-brew.com/token/alltokens?pageSize=${limit}&pageNumber=${page}&toDate=${endDate}&fromDate=${startDate}&filter=${query}&exportRequest=${exportRequest}&networkName=${networkStatus}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

        console.log(list, '>>>>>>>>>>>>>>>>>>>>>>>>ADDDDDDDDDDDDDDDDD')


      if (exportRequest === "true") {
        const url = URL.createObjectURL(
          new Blob([list.data.msg.csv], { type: "text/csv" })
        )

        const date1 = moment(Date.now()).format("DD-MM-YYYY")
        const time1 = moment(Date).format(('h:mm a'))
        // console.log(time1, "zzzzzzzzzzzzzzzz")

        const finalDate = date1 + "-" + time1

        downloadFile(url, `AllTokens${date1}.csv`)

        return changeApiStatus(false, "")
      }

      if (list.status === 200) {
        changeApiStatus(false, "")
        setPageData({
          ...pageData,
          totalItems: list.data.msg.totalItems,
          current: page,
        })
        setData(
          list.data.msg.items.map((val, index) => {
            return { ...val, serial: index + 1 }
          })
        )
      } else {
        console.log(list)
        throw new Error(list.error)
      }
    } catch (err) {
      console.log(err, ">>>>>>>>>>>>")
      changeApiStatus(false)
    }
  }
  useEffect(() => {
    fetchNetwork()
  }, [])

  useEffect(() => {

    fetchData(pageData.current, pageData.pageSize, dateFilter, query, false, networkStatus)
    // eslint-disable-next-line
  }, [pageData.current, pageData.pageSize, networkStatus])

  const onQueryChange = e => {
    const value = e.target.value.trim()
    setQuery(value)
    if (distinctUntilChanged) {
      clearTimeout(distinctUntilChanged)
      distinctUntilChanged = null
    }
    distinctUntilChanged = setTimeout(() => {
      setQuery(value)
      fetchData(pageData.current, pageData.pageSize, dateFilter, value)
      distinctUntilChanged = null
    }, debounceTime)
  }

  const columns = [
    {
      name: "Sr. no",
      selector: row => {
        return row.serial + (pageData.current - 1) * pageData.pageSize
      },
      sortable: true,
    },
    {
      name: "Token Name",
      selector: row => row.tokenName + " - " + row.tokenSymbol,
      sortable: true,
    },
    {
      name: "Supply Type",
      selector: row => (
        row.supplyType[0].toUpperCase()+ row.supplyType.slice(1)
      ),
    },
    {
      name: "Commission Fee",
      selector: row => row.commissionFee + " " + row.commissionType,
    },
    {
      name: "Network",

      selector: row => row.networkName,
    },
    {
      name: "Deployed on",
      selector: row => fullDateFormat(row.createdAt),
      sortbale: true,
    },
    {
      name: "View Transactions",
      selector: row => (
        <>
          <a href={row.transactionHash} target="_blank" rel="noreferrer">
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
            >
              View Details
            </Button>
          </a>
        </>
      ),
    },
  ]

  return !data.length ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <CCol xs>
        <div className="custom-header mb-3">
          <div className="col-xxl-12 col-xl-12 col-12 ml-auto me-auto">
            <div className="row justify-content-between align-items-center px-0">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-lg-0 mt-2 mt-xl-3">
                <p>Recent Tokens</p>
              </div>
            </div>
          </div>
        </div>
      </CCol>
      <CCardGroup>
        <CCard>
          <CCardBody>
            <DataTable
              striped
              columns={columns}
              data={data}
              paginationDefaultPage={pageData.current}
              paginationPerPage={pageData.pageSize}
              pagination={true}
              progressPending={apiStatus.inProgress}
              paginationServer
              paginationTotalRows={pageData.totalItems}
              paginationRowsPerPageOptions={[5, 10, 15, 20]}
              onChangePage={e => setPageData({ ...pageData, current: e })}
              onChangeRowsPerPage={e =>
                setPageData({ ...pageData, pageSize: e })
              }
            //   progressComponent={<Spinner />}
            />
          </CCardBody>
        </CCard>
      </CCardGroup>
    </React.Fragment>
  )
}

DashboardTokens.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(DashboardTokens)
