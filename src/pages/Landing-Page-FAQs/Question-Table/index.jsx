import {
     Card,
     CardBody,
     CardHeader,
     Col,
     Row,
} from "reactstrap";
import MessageModal from "pages/MessageModal";
import React from 'react';
// import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { useState } from "react";
import { EditOutlined, DeleteSharp } from "@mui/icons-material";
import { Button, Modal } from 'react-bootstrap'
import axios from "axios";



const Item = ({ value, i, editHandler, edit }) => {
     return (
          <>
               <Col lg='1'>{i + 1}</Col>
               <Col lg='3'>{edit == i ? <textarea className="w-100" value={value.question} onChange={(e) => editHandler(i, { Question: e.target.value })} /> : value.question}</Col>
               <Col lg='6'>{edit == i ? <textarea className="w-100" value={value.answer} onChange={(e) => editHandler(i, { Answer: e.target.value })} /> : value.answer}</Col>
               {/* {console.log(value.question,"question")} */}
          </>
     )
}

const List = ({ data, editHandler, edit, toggleEdit, deleteHandler }) => {
     return (
          <React.Fragment>
               {data?.map((value, index) => (
                    <Row key={index} className='mb-5'>
                         <Item key={index} i={index} edit={edit} index={index} toggleEdit={toggleEdit} editHandler={editHandler} value={value} />
                         <Col lg='2'><span onClick={() => toggleEdit(edit === index ? undefined : index)}><EditOutlined /></span><span className="ms-3" onClick={() => deleteHandler(index)}><DeleteSharp /></span></Col>
                    </Row>
               ))}
          </React.Fragment>
     );
}
export default function QuestionTable(props) {
     const [edit, setEdit] = useState(undefined);
     const [show, setShow] = useState(false)
     const { data, setData,items } = props;
     const [faq, setFaq] = useState({ question: '', answer: '' })
     const [show1, setShow1] = useState(false)
     const [show2, setShow2] = useState(false)
     const handleClose = () => {setShow(false),setShow1(false),setShow2(false)};

     const addHandler = async() => {
          handleClose()
          // setItems(prev => [...prev, { Question: faq.Question, Answer: faq.Answer }]);
          const addFaqResponse=await axios.post('http://localhost:3010/cms/faq',{
               question:faq.question,answer:faq.answer},{ headers: 
                    { "Authorization": `Bearer ${items.msg.jsonWebtoken}` } })
                    console.log(addFaqResponse);
          if(addFaqResponse.status==200){
               setShow2(true)
               setFaq({question:'',answer:''})
          } else{
              console.log(addFaqResponse); 
          }  
     }
     const onSortEnd = ({ oldIndex, newIndex }) => {
          setItems(Items => arrayMove(Items, oldIndex, newIndex));
     };
     const editHandler = (index, value) => {
          handleClose1()
          setItems(Items => Items.map((item, i) => i === index ? ({ ...item, ...value }) : item))
          // setItems(Items => [Items.map((item, i) => i === index ? ({ ...item, ...value }) : item)], { Question: faq.Question, Answer: faq.Answer })
     };
     const deleteHandler = (index) => {
          setItems(Items => Items.filter((item, i) => i !== index));
     };
     const toggleEdit = (i) => {
          console.log(i);
          setShow1(true);
          setEdit(i);
     }
     return (
          <React.Fragment>
               <Card className='mt-5'>
                    <CardBody>
                         <Row className="justify-content-end"><button className="btn btn-primary" onClick={() => setShow(true)} style={{ width: '200px', marginBottom: '20px' }}>Add FAQ</button></Row>
                         <Row className="mb-5"><Col lg='1' className="">{'S.No'}</Col><Col lg='3' className="">{'Questions'}</Col><Col lg='6' className="">{'Answer'}</Col><Col lg='2' className="">{'Action'}</Col></Row>
                         <List data={data} edit={edit} toggleEdit={toggleEdit} deleteHandler={deleteHandler} editHandler={editHandler} onSortEnd={onSortEnd} />

                    </CardBody>
               </Card>

               <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                         <Modal.Title> ADD FAQ</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                         <form>
                              <div className="form-group">
                                   <label htmlFor="Question">Question</label>

                                   <input type="text" className="form-control" onChange={(e) => { setFaq({ ...faq, question: e.target.value });console.log(faq) }} id="Question" aria-describedby="emailHelp" placeholder="Question...." />
                                   {/* <small id="emailHelp" className="form-text text-muted"></small> */}
                              </div>
                              <div className="form-group">

                                   <label htmlFor="Answers">Answer</label>
                                   <textarea rows='5' type="text" className="form-control" onChange={(e) => { setFaq({ ...faq, answer: e.target.value });console.log(faq) }} id="Answers" placeholder="Answers" />
                              </div>
                              {/* <div className="form-group form-check">
                                   <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                   <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                              </div> */}
                              {/* <button type="submit" class="btn btn-primary">Submit</button> */}
                         </form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
                              Close
                         </Button>
                         <Button variant="primary" onClick={addHandler}>
                              ADD FAQ
                         </Button >
                    </Modal.Footer>
               </Modal>

               <Modal show={show1} onHide={handleClose}>
                    <Modal.Header closeButton>
                         <Modal.Title>Edit-Faq-Qus/Ans</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                         <form>
                              <div className="form-group">
                                   <label htmlFor="Question">Question</label>

                                   <input type="text" className="form-control" value={edit >= 0 ? items[edit].Question : ''} onChange={(e) => { console.log(items[edit]); setFaq({ ...faq, Question: e.target.value }); setItems(items.map((ele, i) => { return edit === i ? { ...ele, Question: e.target.value } : ele })) }} id="Question" aria-describedby="emailHelp" placeholder="Question...." />
                                   {/* <small id="emailHelp" className="form-text text-muted"></small> */}
                              </div>
                              <div className="form-group">

                                   <label htmlFor="Answers">Answer</label>
                                   <textarea rows='5' type="text" className="form-control" value={edit >= 0 ? items[edit].Answer : ''} onChange={(e) => { setFaq({ ...faq, Answer: e.target.value }); setItems(items.map((ele, i) => { return edit === i ? { ...ele, Answer: e.target.value } : ele })) }} id="Answers" placeholder="Answers" />
                              </div>
                              {/* <div className="form-group form-check">
                                   <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                   <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                              </div> */}
                              {/* <button type="submit" class="btn btn-primary">Submit</button> */}
                         </form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
                              Close
                         </Button>
                         <Button variant="primary" onClick={editHandler}>
                              Save Changes
                         </Button >
                    </Modal.Footer>
               </Modal>
               <Modal show={show2} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Successfully Added Faq !</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
          </React.Fragment>
     )
}
