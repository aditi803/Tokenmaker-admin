import React, { useEffect, useState, useMemo } from "react";
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

import axios from "axios";

import {
  OrderId,
  BillingName,
  Date,
  Total,
  PaymentStatus,
  PaymentMethod,
} from "./LatestTranactionCol";

import TableContainer from "../../components/Common/TableContainer";
import useApiStatus from "hooks/useApiStatus";
import Spinner from "loader";
import DataTable from "react-data-table-component";

const LatestTranaction = () => {

  const user = localStorage.getItem('authUser')

  const parseData = JSON.parse(user)
  const token = parseData.msg.jsonWebtoken;

  const [transactionData, setTransactionData] = useState([])
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()


  const [page, setPage] = useState({ current: 1, totalItems: 0, pageSize: 10 })
  const [loader, setLoader] = useState(true)

  const [data, setData] = useState([])

  const fetchData = async (
    page = 1,
    limit = 10,
    exportRequest = 'false',
  ) => {
    try {
      changeApiStatus(true, '')
      const list = await axios.get(`https://tokenmaker-apis.block-brew.com/token/alltokens?limit=${limit}&page=${page}`, { headers: { Authorization: `Bearer ${token}` } })
      if (exportRequest === 'true') {
        return changeApiStatus(false, '')
      }

      console.log(list, '<<<<<<<<<>>>>>>>>>>>>>>>LIST')

      if (list.status === 200) {
        console.log('!!!!!')
        changeApiStatus(false, '')
        console.log('!!!!!>>>>>ADDD')
        // setPage({ ...page, totalItems: list.data.totalItems, pageSize, current: pageNumber })
        console.log('!!!!!>>>>>')
        // setData(
        //   list.msg.map((val, index) => {
        //     return { ...val, serial: index + 1 }

        //   }),
        console.log('list', list)
        setData(
          list.data.msg.map((val, index) => {
            return { ...val, serial: index + 1 }

          }),

        )
      } else {
        throw new Error(list.error)
      }
    } catch (err) {
      changeApiStatus(false)
    }
  }

  console.log(data, "Commission data ")
  useEffect(() => {
    fetchData(page.current, page.pageSize)
    // eslint-disable-next-line 
  }, [page.current, page.pageSize])


  const columns = [
    {
      name: 'Sr. no',
      selector: (row) => {
        return row.serial + (page.current - 1) * page.pageSize
      },
      sortable:true
    },
    {
      name: 'Token Name',
      selector: (row) => row.tokenName,
      sortable: true
    },

    {
      name: 'Token Symbol',
      selector: (row) => row.tokenSymbol,
    },
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
      selector: (row) => row.network,
    },
    // {
    //   name: 'Deployed on',
    //   selector: (row) => fullDateFormat(row.createdAt),
        // sortbale:true,       
    // },
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


  return apiStatus.inProgress ? <Spinner /> : (
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
                      <CInputGroup>
                        <DateRangePicker
                        // initialSettings={{ startDate: '1/1/2014', endDate: '3/1/2014' }}
                        // onApply={dateFilterChange}
                        // onShow={() => setCalendarIsShowing(true)}
                        // onHide={() => setCalendarIsShowing(false)}
                        // onCancel={}
                        // ref={calendarRef}
                        >
                          <input
                            readOnly
                            placeholder="Filter by Date"
                            className="form-control"
                          // value={
                          //      dateFilter.length
                          //           ? `${StandardPicketDateFormat(
                          //                dateFilter[0],
                          //           )} - ${StandardPicketDateFormat(dateFilter[1])}`
                          //           : ''
                          // }
                          />
                        </DateRangePicker>
                        <CInputGroupText>
                          <img
                            // onClick={() => {
                            //      if (!calendarIsShowing && dateFilter.length) {
                            //           setDateFilter([])
                            //           fetchData(page.current, page.pageSize, status, [], query)
                            //      }
                            // }}
                            // src={
                            //      calendarIsShowing
                            //           ? calendarremovelines
                            //           : dateFilter.length
                            //                ? calendarremovelines
                            //                : schedule
                            // }
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
                        // onChange={onQueryChange}
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
                          page.current,
                          page.pageSize,
                          status,
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
              pageSize={10}
              paginationPerPage={10}
              paginationServer
              paginationTotalRows={page.totalItems}
              paginationRowsPerPageOptions={[10, 20]}
              onChangePage={(e) => setPage({ ...page, current: e })}
              onChangeRowsPerPage={(e) => setPage({ ...page, pageSize: e })}
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

export default withRouter(LatestTranaction);
