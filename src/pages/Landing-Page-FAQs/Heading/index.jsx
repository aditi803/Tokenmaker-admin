import { TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Col, Label, Row } from 'reactstrap'

function Heading(props) {
     const [heading, setHeading] = useState('FAQ');
     const { data, setData } = props;
     const [color, setColor] = useState('black')
     return (
          <Row>
               <Col lg='8'>
                    <h3>Heading</h3>
                    <TextField className='w-100' value={heading} onChange={(e) => {
                         setHeading(e.target.value);
                         setData({ ...data, Heading: e.target.value })
                         console.log(data);
                    }} />
               </Col>
               <Col lg='4'>
                    <h3>Heading color</h3>
                    <TextField className='w-100' value={color} onChange={(e) => {
                         setColor(e.target.value);
                         setData({ ...data, headingColor: e.target.value })
                         console.log(data);
                    }} />
               </Col>
          </Row>
     )
}

export default Heading