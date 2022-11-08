import {
     Card,
     CardBody,
     CardHeader,
     Col,
     Row,
} from "reactstrap";
import React from 'react';
// import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { useState } from "react";
import { EditOutlined, DeleteSharp } from "@mui/icons-material";
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios';

const Item = ({ value, i, editHandler, edit }) => {
     return (
          <>
               <Col lg='1'>{i + 1}</Col>
               <Col lg='3'>{edit == i ? <textarea className="w-100" value={value.title} onChange={(e) => editHandler(i, { title: e.target.value })} /> : value.title}</Col>
               <Col lg='6'>{edit == i ? <textarea className="w-100" value={value.content} onChange={(e) => editHandler(i, { content: e.target.value })} /> : value.content}</Col>
          </>
     )
}

const List = ({ data, items, editHandler, edit, toggleEdit, deleteHandler,show1 }) => {
     return (
          <React.Fragment>
               {data.map((value, index) => (
                    <Row key={index} className='mb-5'>
                         <Item key={index} show1={show1} i={index} edit={edit} index={index} toggleEdit={toggleEdit} editHandler={editHandler} value={value} />
                         <Col lg='2'><span onClick={() => { toggleEdit(edit === index ? index : index) }}><EditOutlined /></span><span className="ms-3" onClick={() => 
                         {deleteHandler(value);

                         }}><DeleteSharp /></span></Col>
                    </Row>
               ))}
          </React.Fragment>
     );
}
export default function FeatureList(props) {
     const [edit, setEdit] = useState(undefined);
     const [show, setShow] = useState(false)
     const { data, setData,items } = props;

     const [faq, setFaq] = useState({ title: '', content: '' })
     const [show1, setShow1] = useState(false)
     const handleClose = () => setShow(false);
     const handleClose1 = () => setShow1(false);




     
     const addHandler = () => {
          handleClose()
          // setItems(prev => [...prev, { title: faq.title, content: faq.content }]);
          console.log(faq);
          setEdit([items.length]);

          //   setEdit(items);    
     }
     const onSortEnd = ({ oldIndex, newIndex }) => {
          // setItems(Items => arrayMove(Items, oldIndex, newIndex));
     };
     const editHandler = (index, value) => {
          handleClose1()
          // setItems(Items => Items.map((item, i) => i === index ? ({ ...item, ...value }) : item))
          // setItems(Items => [Items.map((item, i) => i === index ? ({ ...item, ...value }) : item)], { title: faq.title, content: faq.content })
     };
     const deleteHandler = (value) => {
          // setItems(Items => Items.filter((item, i) => i !== index));
          console.log(value);
         
          // const token= items.msg.jsonWebtoken;
          // const featureId=value._id;
          // console.log(token);
          // axios.delete(`http://localhost:3010/cms/deletefeature/${featureId}`,
          // {headers:{"Authorization":`Bearer ${items.msg.jsonWebtoken}`}}).then((result)=>{
          //      console.log(result);
          // }).catch((err)=>{
          //      console.log(err);
          // })
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
                         {/* <Row className="justify-content-end"><button className="btn btn-primary" onClick={() => setShow(true)} style={{ width: '200px', marginBottom: '20px' }}>Add FAQ</button></Row> */}
                         <Row className="mb-5"><Col lg='1' className="">{'S.No'}</Col><Col lg='3' className="">{'titles'}</Col><Col lg='6' className="">{'content'}</Col><Col lg='2' className="">{'Action'}</Col></Row>
                         <List show1={show1} data={data} edit={edit} toggleEdit={toggleEdit} deleteHandler={deleteHandler} editHandler={editHandler} onSortEnd={onSortEnd} />

                    </CardBody>
               </Card>

               <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                         <Modal.Title>FAQ</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                         <form>
                              <div className="form-group">
                                   <label htmlFor="title">title</label>

                                   <input type="text" className="form-control" onChange={(e) => { setFaq({ ...faq, title: e.target.value }) }} id="title" aria-describedby="emailHelp" placeholder="title...." />
                                   {/* <small id="emailHelp" className="form-text text-muted"></small> */}
                              </div>
                              <div className="form-group">

                                   <label htmlFor="contents">content</label>
                                   <textarea rows='5' type="text" className="form-control" onChange={(e) => { setFaq({ ...faq, content: e.target.value }) }} id="contents" placeholder="contents" />
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
                              Save Changes
                         </Button >
                    </Modal.Footer>
               </Modal>

               <Modal show={show1} onHide={handleClose1}>
                    <Modal.Header closeButton>
                         <Modal.Title>Edit-FeatureList</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                         <form>
                              <div className="form-group">
                                   <label htmlFor="title">title</label>

                                   <input type="text" className="form-control" value={edit >= 0 ? items[edit].title : ''} onChange={(e) => { console.log(items[edit]); setFaq({ ...faq, title: e.target.value }); setItems(items.map((ele, i) => { return edit === i ? { ...ele, title: e.target.value } : ele })) }} id="title" aria-describedby="emailHelp" placeholder="title...." />
                                   {/* <small id="emailHelp" className="form-text text-muted"></small> */}
                              </div>
                              <div className="form-group">

                                   <label htmlFor="contents">content</label>
                                   <textarea rows='5' type="text" className="form-control" value={edit >= 0 ? items[edit].content : ''} onChange={(e) => { setFaq({ ...faq, content: e.target.value }); setItems(items.map((ele, i) => { return edit === i ? { ...ele, content: e.target.value } : ele })) }} id="contents" placeholder="contents" />
                              </div>
                              {/* <div className="form-group form-check">
                                   <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                   <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                              </div> */}
                              {/* <button type="submit" class="btn btn-primary">Submit</button> */}
                         </form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose1}>
                              Close
                         </Button>
                         <Button variant="primary" onClick={editHandler}>
                              Save Changes
                         </Button >
                    </Modal.Footer>
               </Modal>
          </React.Fragment>
     )
}

    