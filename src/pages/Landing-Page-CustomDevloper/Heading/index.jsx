import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { Col, Row } from 'reactstrap';
import axios from 'axios';
function Heading(props) {
     const [heading, setHeading] = useState('');
     const { data, setData } = props;
     const [background, setBackground] = useState('');
     const [color, setColor] = useState('')
     return (
          <Row className='mt-5'>
               <Col lg='4'>
                    <h3>Heading</h3>
                    <TextField className='w-100' value={data.heading} onChange={(e) => {
                         setHeading(e.target.value);
                         setData({ ...data, heading: e.target.value })
                         console.log(data);
                    }} />
               </Col>
               <Col lg='4'>
                    <h3>Heading color</h3>
                    <TextField className='w-100' value={data.headingColor} onChange={(e) => {
                         setBackground(e.target.value);
                         setData({ ...data, headingColor: e.target.value })
                         console.log(data);
                    }} />
               </Col>
               <Col lg='4'>
                    <h3>Background</h3>
                    <TextField className='w-100' value={data.backgroundColor} onChange={(e) => {
                         setColor(e.target.value);
                         setData({ ...data, backgroundColor: e.target.value })
                         console.log(data);
                    }} />     
               </Col>
          </Row>
     )
}

export default Heading