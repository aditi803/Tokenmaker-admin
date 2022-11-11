import React, { useMemo, useState } from 'react';
import {
     Col, Container, Row, Button, Card,
     CardBody,
} from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from 'components/Common/Breadcrumb';
import TableContainer from '../../../components/Common/TableContainer'
import useApiStatus from 'hooks/useApiStatus';
import { BillingName, Date, OrderId, PaymentMethod, PaymentStatus, Total } from 'pages/Dashboard/LatestTranactionCol';
import { EditOutlined, DeleteSharp } from "@mui/icons-material"
import CommissionModal from '../modals/CommissionModal';
import style from "./comissionTable.module.css"



function CommissionTable(props) {
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()

     const [modal1, setModal1] = useState(false);

     const toggleViewModal = () => setModal1(!modal1);

     const columns = useMemo(
          () => [
               {
                    Header: "S.no",
                    filterable: false,
                    disableFilters: true,
                    Cell: cellProps => {
                         return <ul><li></li></ul>;
                    },
               },
               {
                    Header: "Networks",
                    accessor: "network",
                    filterable: false,
                    disableFilters: true,
                    Cell: cellProps => {
                         return <OrderId {...cellProps} />;
                    },
               },
               {
                    Header: "Commissions",
                    accessor: "commission",
                    disableFilters: true,
                    filterable: false,
                    Cell: cellProps => {
                         return <BillingName {...cellProps} />;
                         // return <input type='text' />
                    },
               },
               {
                    Header: "Symbol",
                    accessor: "symbol",
                    disableFilters: true,
                    filterable: false,
                    Cell: cellProps => {
                         return <Date {...cellProps} />;
                    },
               },
               //   {
               //     Header: "Commission Fee",
               //     accessor: "commissionFee",
               //     disableFilters: true,
               //     filterable: false,
               //     Cell: cellProps => {
               //       return <Total {...cellProps} />;
               //     },
               //   },
               //   {
               //     Header: "Initial Supply",
               //     accessor: "initialSupply",
               //     disableFilters: true,
               //     filterable: false,
               //     Cell: cellProps => {
               //       return <PaymentStatus {...cellProps} />;
               //     },
               //   },
               {
                    Header: "Actions",
                    accessor: "maximumSupply",
                    disableFilters: true,
                    Cell: cellProps => {
                         return (
                              <>
                                   <EditOutlined
                                        onClick={toggleViewModal}
                                        className={style.editIcon}
                                   />
                                   <DeleteSharp
                                        className={style.deleteIcon} 
                                   />
                              </>
                         );
                    },
               },
          ],
          []
     );

     const data = [
          {
               id: 1,
               network: "ETH Mainnet",
               commission: '0.05',
               symbol: 'ETH'
          },
          {
               id: 2,
               network: "ETH Goerli",
               commission: '0.00',
               symbol: 'ETH'
          },
          {
               id: 3,
               network: "ETH Rinkeby",
               commission: '0.01',
               symbol: 'ETH'
          },
     ]

     return (
          <React.Fragment>
               <CommissionModal isOpen={modal1} toggle={toggleViewModal} />
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumb
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("Commision Table")}
                         />
                         <Row>
                              <Card>
                                   <CardBody>
                                        <div className="mb-4 h4 card-title">Latest Transaction</div>
                                        <TableContainer
                                             columns={columns}
                                             data={data}
                                             isGlobalFilter={false}
                                             isAddOptions={false}
                                             customPageSize={6}
                                        />
                                   </CardBody>
                              </Card>
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
     )
}

CommissionTable.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(CommissionTable);