import React,{useState} from 'react'
import { Col, Container, Row,Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Heading from './Heading';
import FeatureList from './FeatureList';
function LandingPageFeatures(props) {
     document.title = "BlockTechBrew - Landing Page Features"
     const [data, setData] = useState({ Heading: 'Features:', headingColor: 'black' });
     const handleChange = (e) => {
          const confirmMessage = prompt("if you want to changes please confirm with yes or y")
          if (confirmMessage == 'yes' || confirmMessage == 'y') {

          } else {

          }
          console.log(data);
     }
     return (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumbs
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("Features")}
                         />
                         <Row>
                              <Heading data={data} setData={setData} />
                              <div className='row '>
                                   <Button className='btn btn-success ' onClick={handleChange} style={{ width: '200px', margin: 'auto', marginTop: '15px' }}>Update</Button>
                              </div>
                              
                         </Row>
                         <Row className='mt-5'>
                              <FeatureList />
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
     )
}
LandingPageFeatures.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(LandingPageFeatures);