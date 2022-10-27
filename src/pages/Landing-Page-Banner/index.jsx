import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Heading from './Heading';
import Content from './Content';
import Background from './Background';

function LandingPageBanner(props) {
     document.title = "BlockTechBrew - Landing Page Banner"
     return (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumbs
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("Banner")}
                         />
                         <Row>
                              <Col lg='8'>
                                   <Heading />
                                   <Content />
                              </Col>
                              <Col lg='4'>
                                   <Background/>
                              </Col>
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
     )
}

LandingPageBanner.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(LandingPageBanner);