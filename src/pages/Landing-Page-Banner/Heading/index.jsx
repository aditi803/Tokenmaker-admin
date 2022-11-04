import { TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Col, Label, Row } from 'reactstrap'

function Heading(props) {
     const [heading, setHeading] = useState('Automatic Token Maker');
     const { data, setData } = props;
     const [color, setColor] = useState('white')
     return (
          <Row className='mt-5'>
               <Col lg='8'>
                    <h3>Heading</h3>
                    <TextField className='w-100' value={data.heading} onChange={(e) => {
                         setHeading(e.target.value);
                         setData({ ...data, heading: e.target.value })
                    console.log(data);}} />
               </Col>
               <Col lg='4'>
                    <h3>Heading color</h3>
                    <TextField className='w-100' value={data.headingColor} onChange={(e) => {
                         setColor(e.target.value);
                         setData({ ...data, headingColor: e.target.value })
                         console.log(data);
                    }} />
               </Col>
          </Row>
     )
}

export default Heading