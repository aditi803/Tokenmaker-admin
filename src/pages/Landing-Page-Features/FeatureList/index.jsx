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
export default function FeatureList() {
     const [items, setItems] = useState([
          {
               sno: '1',
               title: 'ERC20 / BEP20 Compliant',
               content: "Your Token will be completely compliant with the specification and will work with any wallet anywhere on the planet. It will have a name, a symbol, and an amount in decimals."
          },
          {
               sno: '2',
               title: 'Verified Source Code',
               content: "Your contract code will be automatically published and verified."
          },
          {
               sno: '3',
               title: 'Burnable Token',
               content: "Make your token burnable to give you the option to control supply and boost your asset's price when needed"
          },
          {
               sno: '4',
               title: 'Mintable Token',
               content: "Choose the mint option if you want to be able to generate more tokens later on"
          },
            {
               sno: '5',
                 title: 'Pausable',
                 content: "If you want to make sure token is not traded till a given date, just use the pause feature."
          },
          {
               sno: '6',
               title: 'Ownable Access',
               content: "Own your Token and control minting function (mint new tokens, end minting...) Role Based Access Set up roles for your Token (Admin, Minter) and give control to whoever you want."
          },
          {
               sno: '7',
               title: 'Control your supply',
               content: "Choose between fixed, capped or unlimited token supply."
          }, {
               sno: '8',
               title: 'Recover lost tokens',
               content: "No need to worry about lost tokens sent to your Smart Contracts by mistake. Our recovery feature got you covered!"
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
