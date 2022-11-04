import React,{useState} from 'react'
import { Col, Container, Row,Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Heading from './Heading';
import ButtonComp from './Button';


function LandingPageCustomDeveloper(props) {
     document.title = "BlockTechBrew - Landing Page Custom Devloper"
     const [data, setData] = useState({ heading: 'Ready to deploy your token ?', headingColor: 'white',
      buttonText: 'Contact us', buttonColor: 'Black', 
      buttonBackgroundColor: '#f50058',backgroundColor:'green' })
     const[items,setItems]=useState({});

     // useEffect(() => {
     //      const authUser=JSON.parse(localStorage.getItem('authUser'));
     //      setItems(authUser);
     //  }, []);

     //  const handleChange = (e) => {
     //       const confirmMessage = prompt("if you want to changes please confirm with yes or y")
     //       if (confirmMessage == 'yes' || confirmMessage == 'y') {
     //            e.preventDefault();
     //      axios.put('http://localhost:3010/cms/customdetails', { buttonText:data.buttonText
     //  ,buttonColor:data.buttonColor, buttonBackgroundColor:data.buttonBackgroundColor,heading:data.heading,headingColor:data.headingColor,
     // backgroundColor:data.backgroundColor},
     //       { headers: {"Authorization" : `Bearer ${items.msg.jsonWebtoken}`}}).then((result) => {
     //           if(result.success==1){
     //                alert('Updated Successfully');
     //           }
     //       }).catch((err) => {
     //           alert('Cannot Update');
     //       });
     //       } 
           
     //  }
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