import React,{useState} from 'react';
import { Col, Container, Row ,Button} from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Heading from './Heading';
import Content from './Content';
import Background from './Background';

function LandingPageBanner(props) {
     document.title = "BlockTechBrew - Landing Page Banner"
     const [data, setData] = useState({ Heading: 'Automatic Token Maker', headingColor: 'white', Content:'You’re looking for a solution to create your own token on the blockchain?Blocktech Brew has you covered: we will help you generate a token automatically, and deploy it in a matter of minutes.',contentColor:'white'});
     const handleChange = (e) => {
         console.log(data);
     }
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
                                   <Heading data={data} setData={setData} />
                                   <Content data={data} setData={setData} />
                                   <Button className='btn btn-success' onClick={handleChange} style={{ width: '200px', marginTop: '20px' }}>Update</Button>

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