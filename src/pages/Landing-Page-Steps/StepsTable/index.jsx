import {
     Card,
     CardBody,
     CardHeader,
     Col,
     Row,
} from "reactstrap";
import React from 'react';
import { useState } from "react";
import { EditOutlined, DeleteSharp } from "@mui/icons-material";

const Item = ({ item, index, editHandler, deleteHandler }) => {
     const [edit, setEdit] = useState(false);

     return (
          <Row className='mb-5'>
               <Col lg='1'>{item.sno}</Col>
               <Col lg='3'>{edit ? <textarea value={item.title} onChange={(e) => editHandler(index, { title: e.target.value })} /> : item.title}</Col>
               <Col lg='6'>{edit ? <textarea value={item.content} onChange={(e) => editHandler(index, { content: e.target.value })} /> : item.content}</Col>
               <Col lg='2'><span onClick={() => setEdit(prev => !prev)}><EditOutlined /></span><span className="ms-3" onClick={() => deleteHandler(index)}><DeleteSharp /></span></Col>
          </Row>
     )
}

const List = ({ items, editHandler, deleteHandler }) => {

     return (
          <Col lg="12">
               {items.map((item, index) => (
                    <Item key={index} item={item} index={index} editHandler={editHandler} deleteHandler={deleteHandler} />
               ))}
          </Col>
     );
}
export default function StepsTable() {
     const [items, setItems] = useState([
          {
               sno: '1',
               title: 'Install MetasMask',
               content: "If you don't have it yet, please make sure to install MetaMask or any of the supported wallets"
          },
          {
               sno: '2',
               title: 'Deposit cryto on your wallet',
               content: "Make sure you have enough crypto available to pay for Smart Contract creation"
          },
          {
               sno: '3',
               title: 'Fill-out Token details',
               content: "We need basic information (Token Name, Symbol) and eventually more depending on the complexity of your Token"
          },
          {
               sno: '4',
               title: 'Deploy your Token',
               content: "That's it, you're good to go! Confirm transaction on MetaMask and your Token will be ready in a matter of minutes."
          }
     ]);
     
     const editHandler = (index, value) => {
          setItems(Items => Items.map((item, i) => i === index ? ({ ...item, ...value }) : item))
     };
     const deleteHandler = (index) => {
          setItems(Items => Items.filter((item, i) => i !== index));
     };
     return (
          <React.Fragment>
               <Card>
                    <CardHeader>
                         <Row><Col lg='1' >{'Step No.'}</Col><Col lg='3' >{'Title'}</Col><Col lg='6' >{'Content'}</Col><Col lg='2' >{'Action'}</Col></Row>
                    </CardHeader>
                    <CardBody>
                         <List items={items} editHandler={editHandler} deleteHandler={deleteHandler} />
                    </CardBody>
               </Card>
          </React.Fragment>
     )
}
