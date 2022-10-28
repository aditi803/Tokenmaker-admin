import {
     Card,
     CardBody,
     CardHeader,
     Col,
     Row,
} from "reactstrap";
// import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import React from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { useState } from "react";
import { EditOutlined } from "@mui/icons-material";

const SortableItem = SortableElement(({ value, i, editHandler, edit }) => <Row className='mb-5'><Col lg='1'>{i + 1}</Col><Col lg='3'>{edit == i ? <textarea value={value.Question} onChange={(e) => editHandler(i, { Question: e.target.value })} /> : value.Question}</Col><Col lg='6'>{value.Answer}</Col></Row>);
const SortableList = SortableContainer(({ items, editHandler, edit, toggleEdit }) => {
     return (
          <Col lg="12">
               {items.map((value, index) => (
                    // <Row key={index} className='mb-5'>
                         <SortableItem key={index} i={index} edit={edit} index={index} toggleEdit={toggleEdit} editHandler={editHandler} value={value} />
                         // {/* <Col lg='2'><span onClick={() => toggleEdit(edit === index ? undefined : index)}><EditOutlined /></span></Col> */}
                    // {/* </Row> */}
               ))}
          </Col>
     );
});
export default function QuestionTable() {
     const [edit, setEdit] = useState(undefined);
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
     const onSortEnd = ({ oldIndex, newIndex }) => {
          setItems(Items => arrayMove(Items, oldIndex, newIndex));
          // console.log(Items);
     };
     const editHandler = (index, value) => {
          console.log(index, value);
          setItems(Items => Items.map((item, i) => i === index ? ({ ...item, ...value }) : item))
     };
     const toggleEdit = (i) => {
          console.log(i);
          setEdit(i);
     }
     return (
          <React.Fragment>
               <Card>
                    <CardHeader>
                         <Row><Col lg='1' className="">{'S.No'}</Col><Col lg='3' className="">{'Questions'}</Col><Col lg='6' className="">{'Answers'}</Col></Row>
                    </CardHeader>
                    <CardBody>
                         <SortableList items={items} edit={edit} toggleEdit={toggleEdit} editHandler={editHandler} onSortEnd={onSortEnd} />
                    </CardBody>
               </Card>
          </React.Fragment>
     )
}
