import {
     Card,
     CardBody,
     CardHeader,
     Col,
     Row,
} from "reactstrap";
import React from 'react';
import { useState, useEffect } from "react";
import { EditOutlined, DeleteSharp } from "@mui/icons-material";
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify"
import { fireToast, toastConfirm } from "common/toast";
import useApiStatus from "hooks/useApiStatus"

const Item = ({ value, i, editHandler, edit }) => {
     return (
          <>
               <Col lg='1'>{i + 1}</Col>
               <Col lg='3'>{edit == i ? <textarea className="w-100" value={value.title} onChange={(e) => editHandler(i, { title: e.target.value })} /> : value.title}</Col>
               <Col lg='6'>{edit == i ? <textarea className="w-100" value={value.content} onChange={(e) => editHandler(i, { content: e.target.value })} /> : value.content}</Col>
          </>
     )
}

const List = ({ data, items, editHandler, edit, toggleEdit, deleteHandler, show1 }) => {
     return (
          <React.Fragment>
               {data.map((value, index) => (
                    <Row key={index} className='mb-5'>
                         <Item key={index} show1={show1} i={index} edit={edit} index={index} toggleEdit={toggleEdit} editHandler={editHandler} value={value} />
                         <Col lg='2'>
                              <span onClick={() => { toggleEdit(value) }}><EditOutlined /></span>
                              <span className="ms-3" onClick={() => { deleteHandler(value); }}><DeleteSharp /></span></Col>
                    </Row>
               ))}
          </React.Fragment>
     );
}
export default function FeatureList(props) {
     const [edit, setEdit] = useState(undefined);
     const [show, setShow] = useState(false)
     // const { items } = props;

     const [faq, setFaq] = useState({ title: '', content: '' })
     const [show1, setShow1] = useState(false)
     const handleClose = () => { setShow(false); setShow1(false) }
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()

     useEffect(() => {
          getFeaturesData();
     }, []);

     const [data, setData] = useState([])
     const [css, setCss] = useState({})
     const [items, setItems] = useState({})
     const getFeaturesData = () => {
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

     const deleteHandler = (value) => {
          toastConfirm('Are you sure you want to delete this?')
               .fire()
               .then(async (val) => {
                    if (val.isConfirmed) {
                         try {
                              changeApiStatus(true, '')
                              // const token = items.msg.jsonWebtoken;
                              const featureId = value._id;
                              const list = await axios.delete(`https://tokenmaker-apis.block-brew.com/cms/deletefeature/${featureId}`, { headers: { "Authorization": `Bearer ${items.msg.jsonWebtoken}` } })
                              // console.log(list, 'list delete handler side ')
                              if (list?.status === 200) {
                                   // setApiSuccess()
                                   changeApiStatus(false)
                                   toast.success('FAQ deleted successfully')
                                   // setFaq({ question: "", answer: "" })
                                   getFeaturesData()
                              } else {
                                   toast.error("list is undefined")
                                   // throw new Error(destroySection.error)
                              }
                         } catch (err) {
                              console.log(err, "err delete handler side ")
                              toast.error('error', err.response ? err.response.data.error : err)
                              changeApiStatus(false, err.response ? err.response.data.error : err)
                              setFaq({ question: "", answer: "" })
                              setApiFailed(err.msg)
                         }
                    }
               })
     }



     const editHandler = async (value) => {
          handleClose()
          console.log('fghjhnj');
          console.log(value);
          // setItems(Items => [Items.map((item, i) => i === index ? ({ ...item, ...value }) : item)], { Question: faq.Question, Answer: faq.Answer })
          try {
               const featureId = value._id;
               const updateFeatureResponse = await axios.put(`https://tokenmaker-apis.block-brew.com/cms/editfeature`, {
                    featureId: featureId, title: value.title, content: value.content
               }, {
                    headers:
                         { "Authorization": `Bearer ${items.msg.jsonWebtoken}` }
               })
               console.log(updateFeatureResponse.status);
               if (updateFeatureResponse.status === 200) {
                    toast.success('Feature updated successfully')
                    setEdit({})
               }
          } catch (error) {
               toast.error('Feature updation error !');
               console.log(updateStepResponse.status)
               setEdit({})
          }
     }
     const toggleEdit = (value) => {
          setShow1(true);
          setEdit(value);
     }
     return (
          <React.Fragment>
               <Card className='mt-5'>
                    <CardBody>
                         <Row className="mb-5"><Col lg='1' className="">{'S.No'}</Col><Col lg='3' className="">{'titles'}</Col><Col lg='6' className="">{'content'}</Col><Col lg='2' className="">{'Action'}</Col></Row>
                         <List show1={show1} data={data} edit={edit} toggleEdit={toggleEdit} deleteHandler={deleteHandler} editHandler={editHandler}  />

                    </CardBody>
               </Card>
               {/* 
               <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                         <Modal.Title>FAQ</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                         <form>
                              <div className="form-group">
                                   <label htmlFor="title">title</label>

                                   <input type="text" className="form-control" onChange={(e) => { setFaq({ ...faq, title: e.target.value }) }} id="title" aria-describedby="emailHelp" placeholder="title...." />
                              </div>
                              <div className="form-group">

                                   <label htmlFor="contents">content</label>
                                   <textarea rows='5' type="text" className="form-control" onChange={(e) => { setFaq({ ...faq, content: e.target.value }) }} id="contents" placeholder="contents" />
                              </div>
                         </form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
                              Close
                         </Button>
                         <Button variant="primary" onClick={addHandler}>
                              Save Changes
                         </Button >
                    </Modal.Footer>
               </Modal> */}

               <Modal show={show1} onHide={handleClose}>
                    <Modal.Header closeButton>
                         <Modal.Title>Edit-FeatureList</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                         <form>
                              <div className="form-group">
                                   <label htmlFor="title">title</label>

                                   <input type="text" className="form-control" value={edit == undefined ? null : edit == null ? null : edit.title} onChange={(e) => {
                                        setEdit({ ...edit, title: e.target.value });
                                   }} id="title" aria-describedby="emailHelp" placeholder="title...." />
                              </div>
                              <div className="form-group">

                                   <label htmlFor="contents">content</label>
                                   <textarea rows='5' type="text" className="form-control" value={edit == undefined ? null : edit == null ? null : edit.content} onChange={(e) => {
                                        setEdit({ ...edit, content: e.target.value });
                                   }} id="contents" placeholder="contents" />
                              </div>
                         </form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
                              Close
                         </Button>
                         <Button variant="primary" onClick={() => { editHandler(edit) }}>
                              Save Changes
                         </Button >
                    </Modal.Footer>
               </Modal>
               <ToastContainer />
          </React.Fragment>
     )
}

