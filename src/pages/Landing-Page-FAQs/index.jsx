import React from 'react'
import PropTypes from "prop-types";
import { Container, Row } from 'reactstrap'
import QuestionTable from './Question-Table'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from 'react-i18next';
// import Heading from './Heading';
// import Content from './Content';
function LandingPageFAQs(props) {
     document.title = "BlockTechBrew - Landing Page FAQs"
     return (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumbs
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("FAQs")}
                         />
                         {/* <Row>
                              <Heading />
                              <Content/>
                         </Row> */}
                         <Row>
                              <QuestionTable />
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
     )
};

LandingPageFAQs.propTypes = {
     t: PropTypes.any
};

export default withTranslation()(LandingPageFAQs);