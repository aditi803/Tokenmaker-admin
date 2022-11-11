import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Heading from './Heading';
import FeatureList from './FeatureList';
import axios from 'axios';
import {toast} from 'react-toastify'
import Spinner from 'loader';
import useApiStatus from 'hooks/useApiStatus';

function LandingPageFeatures(props) {
     document.title = "BlockTechBrew - Landing Page Features"
     const [items, setItems] = useState({});
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
     const [loader, setLoader] = useState(true)

     const handleChange = (e) => {
          changeApiStatus(true)
          axios.put('https://tokenmaker-apis.block-brew.com/cms/feature',
               { heading: css.heading, headingColor: css.headingColor, },
               { headers: { "Authorization": `Bearer ${items.msg.jsonWebtoken}` } }).then((result) => {
                    if (result.data.success === 1) {
                         setApiSuccess()
                         changeApiStatus(false)
                         toast.success('Updated Successfully');
                    }
               }).catch((err) => {
                    changeApiStatus(false)
                    setApiFailed(err.message)
                    toast.error('Already Updated!!');
               });

          console.log(data);
     }
     const [data, setData] = useState([])
     const [css, setCss] = useState({})

    
     useEffect(() => {
          changeApiStatus(true)
          const getData = () => {
               axios.get("https://tokenmaker-apis.block-brew.com/cms/features")
                    .then((result) => {
                         setData(result.data.msg.featureDetails);
                         setCss(result.data.msg.featureData);
                         // console.log(result.data.msg, "Features details");
                         const authUser = JSON.parse(localStorage.getItem('authUser'));
                         setItems(authUser);
                         setApiSuccess()
                         changeApiStatus(false)
                    }).catch(err => {
                         changeApiStatus(false)
                         setApiFailed(err.message)
                    })

          }
          setLoader(false)
          getData();
     }, []);

     return apiStatus.inProgress ? <Spinner /> : (
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
                              <FeatureList data={data} items={items} setData={setData} />
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