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

const LatestTranaction = ({loader, setLoader}) => {

  const user = localStorage.getItem('authUser')

  const parseData = JSON.parse(user)
  const token = parseData.msg.jsonWebtoken;
  //  console.log(token,"Token transaction")

  const [transactionData, setTransactionData] = useState([])
  useEffect(() => {
    getData()
  }, [setTransactionData])

  const getData = async() => {
    // setLoader(true);
    await axios.get("https://tokendetails.herokuapp.com/token/alltokens", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setTransactionData(res.data.msg)
        // setLoader(false)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoader(false)
      })
  }

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
        Header: "Token Name",
        accessor: "tokenName",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <OrderId {...cellProps} />;
        },
      },
      {
        Header: "Token Symbol",
        accessor: "tokenSymbol",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <BillingName {...cellProps} />;
        },
      },
      {
        Header: "Supply Type",
        accessor: "supplyType",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Date {...cellProps} />;
        },
      },
      {
        Header: "Commission Fee",
        accessor: "commissionFee",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Total {...cellProps} />;
        },
      },
      {
        Header: "Initial Supply",
        accessor: "initialSupply",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <PaymentStatus {...cellProps} />;
        },
      },
      {
        Header: "Maximum Supply",
        accessor: "maximumSupply",
        disableFilters: true,
        Cell: cellProps => {
          return <PaymentMethod {...cellProps} />;
        },
      },
      {
        Header: "View Details",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={toggleViewModal}
            >
              View Details
            </Button>
          );
        },
      },
    ],
    []
  );


  return (
    <React.Fragment>
      <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} />
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title">Latest Transaction</div>
          <TableContainer
            columns={columns}
            data={transactionData}
            isGlobalFilter={false}
            isAddOptions={false}
            customPageSize={6}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

LatestTranaction.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(LatestTranaction);
