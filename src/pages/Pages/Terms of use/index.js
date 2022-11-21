import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Input,
  FormGroup,
  Label,
  Button,
} from "reactstrap"

// Import Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import InputMask from "react-input-mask"
import { SketchPicker } from "react-color"

//Import Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb"

const TermsOfUse = () => {

  //meta title
  document.title = "Create Task | Skote - React Admin & Dashboard Template";

  const inpRow = [{ name: "", file: "" }]
  const [startDate, setstartDate] = useState(new Date())
  const [endDate, setendDate] = useState(new Date())
  const [inputFields, setinputFields] = useState(inpRow)
  const [colorHor, setcolorHor] = useState("#fffff");
  const [simple_color2, setsimple_color2] = useState(0);

  const startDateChange = date => {
    setstartDate(date)
  }

  const endDateChange = date => {
    setendDate(date)
  }

  // Function for Create Input Fields
  function handleAddFields() {
    const item1 = { name: "", file: "" }
    setinputFields([...inputFields, item1])
  }
  const handleHor = color => {
    setcolorHor(color.hex);
  };

  // Function for Remove Input Fields
  function handleRemoveFields(idx) {
    document.getElementById("nested" + idx).style.display = "none"
  }

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <p
            style={{ color: "#2a3042", fontWeight: 500, fontSize: "17px" }}
          >Terms of Use</p>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody style={{ display: "flex", justifyContent: "center" }}>
                  {/* <CardTitle className="mb-4">Create New Task</CardTitle> */}
                  <form className="outer-repeater">
                    <div data-repeater-list="outer-group" className="outer">
                      <div data-repeater-item className="outer">
                        <FormGroup className="mb-4" row>
                          <Col lg="12">
                            <Label
                              htmlFor="taskname"
                              className="col-form-label col-lg-2"
                            >
                              Title
                            </Label>
                            <Input
                              id="taskname"
                              name="taskname"
                              type="text"
                              className="form-control"
                              placeholder="Terms of Use"
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup lcassName='mb-4' row>

                          <Col lg={6}>
                            <div>
                              <div className="form-group mb-4">
                                <Label for="input-date1">Title Color: </Label>
                                <Input
                                  type="text"
                                  // onClick={() => {
                                  //   setsimple_color3(!simple_color3)
                                  // }}
                                  // onChange={(e) => console.log(e , '>>>>>>>>>>>>>>>>>>>')}
                                  // value={footer?.backgroundColor}
                                  onClick={() => {
                                    setsimple_color2(!simple_color2);
                                  }}
                                  value={colorHor}
                                  readOnly
                                />
                                {simple_color2 ? (
                                <SketchPicker
                                  // color={footer?.backgroundColor}
                                  color="#fff"
                                  // value={simple_color3}
                                  value={simple_color2}
                                  onChangeComplete={handleHor}
                                  width="160px"
                                // onChangeComplete={handleHor}
                                // onChangeComplete={e => {
                                //   setFooter(prev => ({
                                //     ...prev,
                                //     backgroundColor: e.hex,
                                //   }))
                                // }}
                                />
                                 ) : null}
                              </div>
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mt-4 mt-lg-0">
                              <div className="form-group mb-4">
                                <Label for="input-repeat">Content Color:</Label>
                                <Input
                                  type="text"
                                  // onClick={() => {
                                  //   setsimple_color3(!simple_color3)
                                  // }}
                                  // onChange={(e) => console.log(e , '>>>>>>>>>>>>>>>>>>>')}
                                  // value={footer?.backgroundColor}
                                  onClick={() => {
                                    setsimple_color2(!simple_color2);
                                  }}
                                  value={colorHor}
                                  readOnly
                                />
                                {simple_color2 ? (
                                <SketchPicker
                                  // color={footer?.backgroundColor}
                                  color="#fff"
                                  // value={simple_color3}
                                  value={simple_color2}
                                  onChangeComplete={handleHor}
                                  width="160px"
                                // onChangeComplete={handleHor}
                                // onChangeComplete={e => {
                                //   setFooter(prev => ({
                                //     ...prev,
                                //     backgroundColor: e.hex,
                                //   }))
                                // }}
                                />
                                 ) : null}
                              </div>
                            </div>
                          </Col>

                        </FormGroup>


                        <FormGroup className="mb-4" row>
                          <Col lg="12">
                            <Label className="col-form-label col-lg-2">
                             Content
                            </Label>
                            <Editor
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClassName"
                              placeholder="Place Your Content Here..."
                            />
                          </Col>
                        </FormGroup>


                        <Row>
                          <Col lg="10">
                            <Button
                              color="success"
                              className="inner"
                            // onClick={() => {
                            //   handleAddFields()
                            // }}
                            >
                              Update
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default TermsOfUse
