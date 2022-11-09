import React, { useState } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from 'components/Common/Breadcrumb';
import LatestTranaction from 'pages/Dashboard/LatestTranaction';
// import Breadcrumb from '../../../components/Common/Breadcrumb';
import Spinner from '../../loader/index'

function AllTokens (props) {
    const [loader, setLoader] = useState(false)
    return (
        <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumb
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("AllTokens")}
                         />
                         <Row>
                              <LatestTranaction loader={loader} setLoader={setLoader}/>
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