import React, { useState } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import LatestTranaction from 'pages/Dashboard/LatestTranaction';

function AllTokens(props) {
     const [loader, setLoader] = useState(false)
     return (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <p
                              style={{color:"#2a3042", fontWeight:500, fontSize:"17px" }}
                         >All Tokens</p>
                         <Row>
                              <LatestTranaction loader={loader} setLoader={setLoader} />
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
     )
}

AllTokens.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(AllTokens);