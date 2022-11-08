import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from 'components/Common/Breadcrumb';
// import Breadcrumb from '../../../components/Common/Breadcrumb';

function Add (props) {
    return(
        <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumb
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("Add")}
                         />
                         <Row>
                              <h1>Add</h1>
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
    )
}

Add.propTypes = {
    t: PropTypes.any
};
export default withTranslation()(Add);