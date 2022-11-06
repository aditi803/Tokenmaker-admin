import React,{useState,useEffect} from 'react'
import { Col, Container, Row,Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Heading from './Heading';
import FeatureList from './FeatureList';
import axios from 'axios';

function LandingPageFeatures(props) {
     document.title = "BlockTechBrew - Landing Page Features"
     const[items,setItems]=useState({});


     const handleChange = (e) => {
          const confirmMessage = prompt("if you want to changes please confirm with yes or y")
          if (confirmMessage == 'yes' || confirmMessage == 'y') {
               axios.put('https://tokenmaker-apis.block-brew.com/cms/feature',
                    { heading:css.heading,headingColor:css.headingColor, },
                              { headers: {"Authorization" : `Bearer ${items.msg.jsonWebtoken}`}}).then((result) => {
                                  if(result.success==1){
                                       alert('Updated Successfully');
                                      
                                  }
                              }).catch((err) => {
                                  alert('Cannot Update');
                              });
          }
          console.log(data);
     }
     const [data, setData] = useState([])
     const [css, setCss] = useState({})


     useEffect(() => {
          const getData = () => {
               axios.get("https://tokenmaker-apis.block-brew.com/cms/features")
                    .then((result) => {
                         setData(result.data.msg.featureDetails);
                         setCss(result.data.msg.featureData);
                         console.log(result.data.msg, "Features details");
                         const authUser = JSON.parse(localStorage.getItem('authUser'));
                         setItems(authUser);
                    }).catch(err => {
                         console.log(err);
                    })

          }
          getData();
     }, []);

     return (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumbs
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("Features")}
                         />
                         <Row>
                              <Heading css={css} setCss={setCss} />
                              <div className='row '>
                                   <Button className='btn btn-success ' onClick={handleChange} style={{ width: '200px', margin: 'auto', marginTop: '15px' }}>Update</Button>
                              </div>
                              
                         </Row>
                         <Row className='mt-5'>
                              <FeatureList data={data} setData={setData} />
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