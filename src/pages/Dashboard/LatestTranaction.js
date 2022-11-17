import React, { useEffect, useState, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { isEmpty } from "lodash";

import {
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { getOrders as onGetOrders } from "store/actions";

import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal";
import { latestTransaction } from "../../common/data/dashboard";
import searchicon from '../../assets/images/search-line.svg'
import calendarremovelines from '../../assets/images/calendar-remove-lines.svg'
import schedule from '../../assets/images/schedule.svg'
import downloadfileicon from '../../assets/images/download-file.svg'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { CCol, CButton, CFormSelect, CInputGroupText, CFormInput, CInputGroup, CFormLabel, CCard, CCardBody, CCardGroup } from '@coreui/react';
import { useParams } from 'react-router-dom'
import axios from "axios";
import useApiStatus from "hooks/useApiStatus";
import Spinner from "loader";
import DataTable from "react-data-table-component";
import { fullDateFormat, StandardPicketDateFormat } from "components/Common/utility";

import 'bootstrap-daterangepicker/daterangepicker.css';
import { downloadFile } from "components/Common/utility";

const debounceTime = 300
let distinctUntilChanged = null

const LatestTranaction = () => {

  const user = localStorage.getItem('authUser')
  const parseData = JSON.parse(user)
  const token = parseData.msg.jsonWebtoken;

  const [transactionData, setTransactionData] = useState([])
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()


  const [loader, setLoader] = useState(true)

  const [data, setData] = useState([])
  const [pageData, setPageData] = useState({ current: 1, totalItems: 0, pageSize: 8 })
  const [status, setStatus] = useState('')

  const [dateFilter, setDateFilter] = useState([])

  const [calendarIsShowing, setCalendarIsShowing] = useState(false)
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')

  const dateFilterChange = (e, picker) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>.', picker)
    console.log(picker.startDate.format('YYYY-MM-DD'), '>>>>>>>>>>>>>>>>.')

    const filter = [picker.startDate.format('YYYY-MM-DD'), picker.endDate.format('YYYY-MM-DD')]
    setDateFilter(filter)
    fetchData( pageData.pageSize,pageData.current, filter, query)
  }

  const fetchData = async (
    page = 1,
    limit = 8,
    dateFilter = [],
    query = '',
    exportRequest = 'false',
    searchByName = '',
  ) => {
    try {
      changeApiStatus(true, '')
      const [startDate, endDate] = dateFilter.length === 0 ? ['', ''] : dateFilter
      const list = await axios.get(`https://tokenmaker-apis.block-brew.com/token/alltokens?pageSize=${limit}&pageNumber=${page}&toDate=${endDate}&fromDate=${startDate}&filter=${query}&exportRequest=${exportRequest}`, { headers: { Authorization: `Bearer ${token}` } })
      if (exportRequest === 'true') {

        const url = URL.createObjectURL(new Blob([list.data.msg.csv], { type: "text/csv"}))
        downloadFile(url,`tokenDetails${Date.now()}.csv`)
        console.log(url,"urll true side ")
        console.log(list,"listttt export true side ")
        console.log(exportRequest,"export request state")

        return changeApiStatus(false, '')
        console.log(exportRequest,"export request value api side ")
      }
      // console.log(list,"listttt status after true ")

    if (list.status === 200 ) {
      console.log(list,"listttt")
      console.log(list.data.msg.items,"listttt items 200 side ")
      console.log(list.data.msg.csv,"listttt csv 200 side ")

      changeApiStatus(false, '')
      setPageData({ ...pageData, totalItems: list.data.msg.totalItems, current: page });
      setData(
        list.data.msg.items.map((val, index) => {
          return { ...val, serial: index + 1 }
        }),
      )

    } else {
      console.log(list);
      throw new Error(list.error)
    }
  } catch (err) {
    console.log(err, '>>>>>>>>>>>>')
    changeApiStatus(false)
  }
}
// setInProgress(false)
// setLoader(false)
// calendarremovelines
// const [querySearch] = useParams()
// useEffect(() => {
//   const status = querySearch.get('status')
//   if (status) {
//     setTimeout(() => {
//       setStatus(status)
//     }, 200)
//     // fetchData(1, page.pageSize, status, dateFilter, query)
//   }
//   // eslint-disable-next-line 
// }, [querySearch.get('status')])

// console.log(data, "Commission data ")
useEffect(() => {
  fetchData(pageData.current, pageData.pageSize, dateFilter, query)
  // eslint-disable-next-line 
}, [pageData.current, pageData.pageSize,query])


const onQueryChange = (e) => {
  const value = e.target.value.trim()
  // console.log(value, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
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
    name: 'Sr. no',
    selector: (row) => {
      return row.serial + (pageData.current - 1) * pageData.pageSize
    },
    sortable: true
  },
  {
    name: 'Token Name',
    selector: (row) => row.tokenName + " (" + row.tokenSymbol + ")",
    sortable: true
  },

  // {
  //   name: 'Token Symbol',
  //   selector: (row) => row.tokenSymbol,
  // },
  {
    name: 'Supply Type',
    selector: (row) => row.supplyType,
  },
  {
    name: 'Commission Fee',
    selector: (row) => row.commissionFee,
  },
  {
    name: 'Network',
    selector: (row) => row.networkName,
  },
  {
    name: 'Deployed on',
    selector: (row) => fullDateFormat(row.createdAt),
    sortbale: true,
  },
  {
    name: 'View Transactions',
    selector: (row) => (
      <>
        <a href={row.transactionHash} target='_blank' rel='noreferrer'>
          <Button
            type="button"
            color="primary"
            className="btn-sm btn-rounded"
          >
            View Details
          </Button>
        </a>
      </>
    )
  },

]


return apiStatus.inProgress && !data.length ? <Spinner /> : (
  <React.Fragment>
    <CCol xs>
      <div className="custom-header mb-3">
        <div className="col-xxl-12 col-xl-12 col-12 ml-auto me-auto">
          <div className="row justify-content-between align-items-center px-0">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-lg-0 mt-2 mt-xl-3">
              <div className="row align-items-center justify-content-between justify-content-lg-start px-0">
                <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-6 col-sm-12 pb-2 pb-md-0 ">
                  <CCol xs="auto" className="position-relative date_picker">
                    <CFormLabel className="visually-hidden" htmlFor="autoSizingInputGroup">
                      Filter by Date
                    </CFormLabel>
                    <CInputGroup style={{ width: "106%" }}>
                      <DateRangePicker
                        onApply={dateFilterChange}
                        onShow={() => setCalendarIsShowing(true)}
                        onHide={() => setCalendarIsShowing(false)}
                      >
                        <input
                          ref={inputRef}
                          readOnly
                          id="file-input"
                          placeholder="Filter by Date"
                          className="form-control"
                          style={{ caretColor: 'rgba(0,0,0,0)' }}
                          value={
                            dateFilter.length
                              ? `${StandardPicketDateFormat(
                                dateFilter[0],
                              )} - ${StandardPicketDateFormat(dateFilter[1])}`
                              : ''
                          }
                        />
                      </DateRangePicker>
                      <CInputGroupText>
                        <img
                          onClick={() => {
                            if (!calendarIsShowing && dateFilter.length) {
                              setDateFilter([])
                              fetchData(pageData.current, pageData.pageSize,[], query)
                            }
                          }}
                          src={
                            calendarIsShowing
                              ? calendarremovelines
                              : dateFilter.length
                                ? calendarremovelines
                                : schedule
                          }
                          alt=""
                          width={20}
                        />
                      </CInputGroupText>
                    </CInputGroup>
                  </CCol>
                </div>
                <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-6 col-sm-12 pb-2 pb-md-0 ">
                  <CCol xs="auto">
                    <CFormLabel className="visually-hidden" htmlFor="autoSizingInputGroup">
                      Search
                    </CFormLabel>
                    <CInputGroup>
                      <CFormInput
                        id="autoSizingInputGroup"
                        placeholder="Search"
                        onChange={onQueryChange}
                      />
                      <CInputGroupText>
                        <img src={searchicon} alt="" width={15} />
                      </CInputGroupText>
                    </CInputGroup>
                  </CCol>
                </div>
              </div>
            </div>

            <div className="col-xxl-6 col-xl-6 col-lg-5 col-md-12 col-sm-12 mt-lg-0 mt-2 mt-xl-3">
              <div className="d-flex align-items-center justify-content-end">
                <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-3 col-sm-3 text-end text-end">
                  <CButton
                    onClick={() =>
                      fetchData(
                        pageData.current,
                        pageData.pageSize,
                        dateFilter,
                        query,
                        'true',
                      )
                    }
                    color="success"
                    className="hand text-white px-2 w-100"
                  >
                    <img src={downloadfileicon} alt="" width={15} className="me-2" />
                    Export CSV
                  </CButton>
                </div>
              </div>
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
            paginationRowsPerPageOptions={[8, 16, 24, 32]}
            onChangePage={(e) => setPageData({ ...pageData, current: e })}
            onChangeRowsPerPage={(e) => setPageData({ ...pageData, pageSize: e })}
            progressComponent={<Spinner />}
          />
        </CCardBody>
      </CCard>
    </CCardGroup>

  </React.Fragment>
);
};


LatestTranaction.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};


export default withRouter(LatestTranaction)
