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



const Item = ({ value, i, editHandler, edit }) => {
     return (
          <>
               <Col lg='1'>{i + 1}</Col>
               <Col lg='3'>{edit == i ? <textarea className="w-100" value={value.Question} onChange={(e) => editHandler(i, { Question: e.target.value })} /> : value.Question}</Col>
               <Col lg='6'>{edit == i ? <textarea className="w-100" value={value.Answer} onChange={(e) => editHandler(i, { Answer: e.target.value })} /> : value.Answer}</Col>
          </>
     )
}

const List = ({ items, editHandler, edit, toggleEdit, deleteHandler }) => {
     return (
          <React.Fragment>
               {items.map((value, index) => (
                    <Row key={index} className='mb-5'>
                         <Item key={index} i={index} edit={edit} index={index} toggleEdit={toggleEdit} editHandler={editHandler} value={value} />
                         <Col lg='2'><span onClick={() => toggleEdit(edit === index ? undefined : index)}><EditOutlined /></span><span className="ms-3" onClick={() => deleteHandler(index)}><DeleteSharp /></span></Col>
                    </Row>
               ))}
          </React.Fragment>
     );
}
export default function QuestionTable() {
     const [edit, setEdit] = useState(undefined);
     const [show, setShow] = useState(false)
     const [items, setItems] = useState([
          {
               Question: 'What is an ERC-20 Token?',
               Answer: "The ERC-20 introduces a standard for Fungible Tokens, which means that each Token has a property that makes it identical to another Token (in terms of type and value). An ERC-20 Token, for example, functions similarly to ETH, meaning that one Token is and will always be equal to all other Tokens."
          },
          {
               Question: 'What is a BEP-20 Token standard?',
               Answer: "It is a native token standard of the Binance Smart Chain. It acts as a blueprint of how the BEP-20 tokens can be utilized. It is an extension of the ERC-20 token standard and can be used to represent shares or fiat."
          },
          {
               Question: 'What is Fixed Supply Token?',
               Answer: "Once you deploy the token, the entire supply will be sent to the owner's wallet.Fixed supply means that this supply can't be modified later on."
          },
          {
               Question: 'What is Capped Supply Token?',
               Answer: "When you create the token, you will have the option to choose to send an initial supply to the owner's wallet. Supply can be adjusted later on by minting or burning tokens if you chose those options. You won't be able to generate more tokens that supply cap allows."
          },
          {
               Question: "How is the smart contract's source code verified?",
               Answer: "When we deploy your smart contract, a third party such as Etherscan verifies the source code and publishes it on their website. The source code can be found on the contract's webpage."
          },
          {
               Question: "What kind of acces type can i set up?",
               Answer: `None: there is no central authority which can make people trust your token more Ownable: The token will have an owner who will act as admin and be able to conduct different actions such as mining, burning...`
          }
     ]);
     const [faq, setFaq] = useState({ Question: '', Answer: '' })
     const[show1,setShow1]=useState(false)
     const handleClose = () => setShow(false);
     const handleClose1 = () => setShow1(false);


     // function Example() {
     //      // const [show, setShow] = useState(false);


     //      const handleShow = () => setShow(true);

     //      return (
     //           <>
     //                <Button variant="primary" onClick={handleShow}>
     //                     Launch demo modal
     //                </Button>

     //           </>
     //      );
     // }
     const addHandler = () => {
          handleClose()
          setItems(prev => [...prev, { Question: faq.Question, Answer: faq.Answer }]);
          console.log(faq);
          setEdit([items.length]);

          //   setEdit(items);    
     }
     const onSortEnd = ({ oldIndex, newIndex }) => {
          setItems(Items => arrayMove(Items, oldIndex, newIndex));
     };
     const editHandler = (index, value) => {
          setItems(Items => Items.map((item, i) => i === index ? ({ ...item, ...value }) : item))
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
                      <List items={items} edit={edit} toggleEdit={toggleEdit} deleteHandler={deleteHandler} editHandler={editHandler} onSortEnd={onSortEnd} />
                    
                    </CardBody>
               </Card>

               <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                         <Modal.Title>FAQ</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                         <form>
                              <div className="form-group">
                                   <label htmlFor="Question">Question</label>

                                   <input type="text" className="form-control" onChange={(e) => { setFaq({ ...faq, Question: e.target.value }) }} id="Question" aria-describedby="emailHelp" placeholder="Question...." />
                                   {/* <small id="emailHelp" className="form-text text-muted"></small> */}
                              </div>
                              <div className="form-group">

                                   <label htmlFor="Answers">Answer</label>
                                   <textarea rows='5' type="text" className="form-control" onChange={(e) => { setFaq({ ...faq, Answer: e.target.value }) }} id="Answers" placeholder="Answers" />
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
                         <Modal.Title>Edit-Faq-Qus/Ans</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                         <form>
                              <div className="form-group">
                                   <label htmlFor="Question">Question</label>

                                   <input type="text" className="form-control" onChange={(e) => { setFaq({ ...faq, Question: e.target.value }) }} id="Question" aria-describedby="emailHelp" placeholder="Question...." />
                                   {/* <small id="emailHelp" className="form-text text-muted"></small> */}
                              </div>
                              <div className="form-group">

                                   <label htmlFor="Answers">Answer</label>
                                   <textarea rows='5' type="text" className="form-control" onChange={(e) => { setFaq({ ...faq, Answer: e.target.value }) }} id="Answers" placeholder="Answers" />
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
                         <Button variant="primary" onClick={addHandler}>
                              Save Changes
                         </Button >
                    </Modal.Footer>
               </Modal>
          </React.Fragment>
     )
}
