import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from 'components/Common/Breadcrumb';
// import Breadcrumb from '../../../components/Common/Breadcrumb';

function View (props) {
    return(
        <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumb
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("View")}
                         />
                         <Row>
                              <h1>View</h1>
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
    )
}

View.propTypes = {
    t: PropTypes.any
};
export default withTranslation()(View);