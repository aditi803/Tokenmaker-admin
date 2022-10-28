import React from 'react'
import { Col, Container, Row } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Heading from './Heading';
import Button from './Button';


function LandingPageCustomDeveloper(props) {
     document.title = "BlockTechBrew - Landing Page Custom Devloper"
     return (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumbs
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("Custom-Devloper")}
                         />
                         <Row>
                              <Heading />
                         </Row>
                         <Row>
                              <Button />
                         </Row>
                        
                    </Container>
               </div>
          </React.Fragment>
     )
}
LandingPageCustomDeveloper.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(LandingPageCustomDeveloper);