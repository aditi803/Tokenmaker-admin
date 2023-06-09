import React, { useState, useEffect } from "react";

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios"


import useApiStatus from "hooks/useApiStatus";
import Spinner from "loader";
import Doughnut from "./doughnutchart";

const MonthlyEarning = () => {
return (
    <React.Fragment>
      <Row className="justify-content-center">
        <CardTitle className="mb-4" style={{ fontSize: "16px" }}>Commissions</CardTitle>
        <div>
          {/* <Doughnut dataColors='["#e84142", "#2ad3b4","#8a92b2", "#f3ba2f","#8247e5"]' /> */}
          <Doughnut dataColors='["#e84142", "#f3ba2f", "#35d07f","#62688f","#13b5ec","#e9f58f","#3f7fff","#e1137b","#8247e5","15ebac"]' />
        </div>
      </Row>
    </React.Fragment>
  );
};

export default MonthlyEarning;
