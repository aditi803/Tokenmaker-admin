import React, { useState, useEffect, useRef, useMemo } from "react"
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
import JoditEditor from 'jodit-react';
import axios from "axios"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import InputMask from "react-input-mask"
import { SketchPicker } from "react-color"
import { toast } from 'react-toastify'

//Import Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import useApiStatus from "hooks/useApiStatus"
import Spinner from "loader";

//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb"

const TermsOfUse = () => {

  //meta title

  const inpRow = [{ name: "", file: "" }]
  const [startDate, setstartDate] = useState(new Date())
  const [endDate, setendDate] = useState(new Date())
  const [inputFields, setinputFields] = useState(inpRow)
  const [colorHor, setcolorHor] = useState("#fffff");
  const [simple_color2, setsimple_color2] = useState(0)
  const [simple_color3, setsimple_color3] = useState(0)
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()

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

  const [loader, setLoader] = useState(true)
  const [terms, setTerms] = useState([])

  const editor = useRef(null);
  const [content, setContent] = useState('');

  const onChangeHandler = async (e) => {
    e.preventDefault()
    // console.log(e.target.value, "onchange e target side ")
    const { name, value } = e.target
    setTerms({
      ...terms,
      [name]: value,
    })
  }

  useEffect(() => {
    changeApiStatus(true)
    setLoader(false)
    fetchData()
  }, [setTerms])

  const fetchData = async () => {
    await axios
      .get('https://tokenmaker-apis.block-brew.com/cms/termsdetails')
      .then(res => {
        setTerms(res.data.msg)
        console.log(res.data.msg, "?>>>>>>>>>>>>>>>>>>terms msg")
        setApiSuccess()
        changeApiStatus(false)
      })
      .catch(err => {
        changeApiStatus(false)
        setApiFailed(err.message)
      })
  }

  const handleDescription = (editorState) => {
    setTerms({ ...terms, ['content']: editorState })
  }

  const termsUpdate = async () => {
    // console.log("Hello")
    changeApiStatus(true)
    const authUser = JSON.parse(localStorage.getItem("authUser"))
    await axios
      .put("https://tokenmaker-apis.block-brew.com/cms/terms", terms, {
        headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` },
      })
      .then(res => {
        console.log(res, "Update terms of use")
        setApiSuccess()
        changeApiStatus(false)
        fetchData()
        toast.success("Updated Successfully")
      })
      .catch(err => {
        changeApiStatus(false)
        setApiFailed(err.message)
        toast.error("Cannot update")
      })
    setLoader(false)
  }

  return apiStatus.inProgress ? <Spinner /> : (
    <>
      <div className="page-content">
        <Container fluid>
          <p
            style={{ color: "#2a3042", fontWeight: 500, fontSize: "17px" }}
          >Terms of Use</p>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody style={{ display: "flex", justifyContent: "center" }}>
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
                            <InputMask
                              id="taskname"
                              name="title"
                              type="text"
                              className="form-control"
                              placeholder="Terms of Use"
                              value={terms.title}
                              onChange={onChangeHandler}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup lcassName='mb-4' row>

                          <Row>
                            <Col lg={6}>
                              <div>
                                <div className="form-group mb-4">
                                  <Label for="input-date1">Content Color: </Label>
                                  <Input
                                    type="text"
                                    onClick={() => {
                                      setsimple_color2(!simple_color2)
                                    }}
                                    value={terms?.contentColor}
                                    readOnly
                                  />
                                  {simple_color2 ? (
                                    <SketchPicker
                                      color={terms?.contentColor}
                                      value={simple_color2}
                                      width="160px"
                                      onChangeComplete={e => {
                                        setTerms(prev => ({
                                          ...prev,
                                          contentColor: e.hex,
                                        }))
                                      }}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div>
                                <div className="form-group mb-4">
                                  <Label for="input-date2"> Title Color: </Label>
                                  <Input
                                    type="text"
                                    onClick={() => {
                                      setsimple_color3(!simple_color3)
                                    }}
                                    value={terms?.titleColor}
                                    readOnly
                                  />
                                  {simple_color3 ? (
                                    <SketchPicker
                                      color={terms?.titleColor}
                                      value={simple_color3}
                                      width="160px"
                                      onChangeComplete={e => {
                                        setTerms(prev => ({
                                          ...prev,
                                          titleColor: e.hex,
                                        }))
                                      }}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                          </Row>


                        </FormGroup>


                        <FormGroup className="mb-4" row>
                          <Col lg="12">
                            <Label className="col-form-label col-lg-2">
                              Content
                            </Label>
                            <JoditEditor
                              ref={editor}
                              value={terms.content}
                              name="content"
                              id="content"
                              rows='5'
                              tabIndex={1} // tabIndex of textarea
                              onChange={newContent => handleDescription(newContent)}
                            />
                          </Col>
                        </FormGroup>


                        <Row>
                          <Col lg="10">
                            <Button
                              color="success"
                              className="inner"
                              onClick={termsUpdate}
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
