import { TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Col, Label, Row } from 'reactstrap'

function Heading() {
     const [heading, setHeading] = useState('Create your token in just a few easy steps:');
     const [color, setColor] = useState('black')
     return (
          <Row className='mt-5'>
               <Col lg='8'>
                    <h3>Heading</h3>
                    <TextField className='w-100' value={heading} onChange={(e)=>setHeading(e.target.value)} />
               </Col>
               <Col lg='4'>
                    <h3>Heading color</h3>
                    <TextField className='w-100' value={color} onChange={(e) => setColor(e.target.value)} />
               </Col>
          </Row>
     )
}

export default Heading