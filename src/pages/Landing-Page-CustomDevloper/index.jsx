import React,{useState} from 'react'
import { Col, Container, Row,Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Heading from './Heading';
import ButtonComp from './Button';


function LandingPageCustomDeveloper(props) {
     document.title = "BlockTechBrew - Landing Page Custom Devloper"
     const [data, setData] = useState({ Heading: 'Ready to deploy your token ?', headingColor: 'white', headingBackground: '#383838', buttonText: 'Contact us', buttonTextColor: 'Black', buttonBackgroundColor: '#f50058' })
     
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
                              breadcrumbItem={props.t("Custom-Devloper")}
                         />
                         <Row>
                              <Heading data={data} setData={setData} />
                         </Row>
                         <Row>
                              <ButtonComp data={data} setData={setData} />
                         </Row>
                         <Row className='row'>
                              <Button className='btn btn-success' onClick={handleChange} style={{ width: '200px', margin: 'auto', marginTop: '20px' }}>Update</Button>
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