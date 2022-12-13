import React from "react";

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

import ApexRadial from "./ApexRadial";
import PieChart from "./Piechart";

const MonthlyEarning = () => {
  return (
    <React.Fragment>
      {/* {" "}
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Monthly Earning</CardTitle> */}
          <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Pie Chart</CardTitle>
                  <Row className="justify-content-center">
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0">2536</h5>
                        <p className="text-muted text-truncate">Ethereum</p>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0">69421</h5>
                        <p className="text-muted text-truncate">Polygon</p>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0">89854</h5>
                        <p className="text-muted text-truncate">BSC</p>
                      </div>
                    </Col>
                  </Row>

                  <PieChart dataColors='["--bs-success", "#ebeff2", "#dedede" ]'/>
                </CardBody>
              </Card>
            </Col>
        {/* </CardBody>
      </Card> */}
    </React.Fragment>
  );
};

export default MonthlyEarning;
