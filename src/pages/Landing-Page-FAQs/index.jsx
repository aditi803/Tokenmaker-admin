import React, {useState} from 'react'
import PropTypes from "prop-types";
import { Container, Row,Button } from 'reactstrap'
import QuestionTable from './Question-Table'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from 'react-i18next';
import Heading from './Heading';
import Content from './Content';
function LandingPageFAQs(props) {

     document.title = "BlockTechBrew - Landing Page FAQs"
     const [data, setData] = useState({
          Heading: 'FAQ', headingColor: 'black', Content: 'As a leader in the field of Blockchain coding, Blocktech Brew not only teaches you how to make tokens, smart contracts and more, but also offers you tools like this token generator that allows you to save time and deploy tokens automatically', contentColor: 'black'
     })
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
                              breadcrumbItem={props.t("FAQs")}
                         />
                         <Row>
                              <Heading data={data} setData={setData} />
                              <Content data={data} setData={setData} />
                              <Button className='btn btn-success' onClick={handleChange} style={{ width: '200px', marginTop: '20px' }}>Update</Button>
                         </Row>
                         <Row>
                              <QuestionTable/>
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