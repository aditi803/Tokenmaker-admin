import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from '../../../components/Common/Breadcrumb';
function General (props) {
    return(
        <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumb
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("General Settings")}
                         />
                         <Row>
                              <h1>General Settings </h1>
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
    )
}

General.propTypes = {
    t: PropTypes.any
};
export default withTranslation()(General);