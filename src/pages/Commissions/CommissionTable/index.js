import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from 'components/Common/Breadcrumb';
// import Breadcrumb from '../../../components/Common/Breadcrumb';

function CommissionTable (props) {
    return(
        <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumb
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("Commision Table")}
                         />
                         <Row>
                              <h1>Commision table</h1>
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