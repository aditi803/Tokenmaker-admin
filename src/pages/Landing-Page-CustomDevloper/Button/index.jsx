import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { Col, Row } from 'reactstrap';

function ButtonComp(props) {
     const [text, setText] = useState('');
     const { data, setData } = props;
     const [background, setBackground] = useState('');
     const [color, setColor] = useState('')
  return (
       <Row className='mt-5'>
            <Col lg='4'>
                 <h3>Button Text</h3>
                 <TextField className='w-100' value={data.buttonText} onChange={(e) => {
                      setColor(e.target.value);
                      setData({ ...data, buttonText: e.target.value })
                      console.log(data);
                 }} />
            </Col>
            <Col lg='4'>
                 <h3>Button Text color</h3>
                 <TextField className='w-100' value={data.buttonColor} onChange={(e) => {
                      setColor(e.target.value);
                      setData({ ...data, buttonColor: e.target.value })
                      console.log(data);
                 }} />
            </Col>
            <Col lg='4'>
                 <h3>Button Background</h3>
                 <TextField className='w-100' value={data.buttonBackgroundColor} onChange={(e) => {
                      setColor(e.target.value);
                      setData({ ...data, buttonBackgroundColor: e.target.value })
                      console.log(data);
                 }} />
            </Col>
       </Row>
  )
}

export default ButtonComp