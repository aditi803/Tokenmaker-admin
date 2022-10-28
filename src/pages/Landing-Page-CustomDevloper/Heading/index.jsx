import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { Col, Row } from 'reactstrap';

function Heading() {
     const [heading, setHeading] = useState('Need a custom development ?');
     const [background, setBackground] = useState('#33d3d2');
     const [color, setColor] = useState('white')
     return (
          <Row className='mt-5'>
               <Col lg='4'>
                    <h3>Heading</h3>
                    <TextField className='w-100' value={heading} onChange={(e) => setHeading(e.target.value)} />
               </Col>
               <Col lg='4'>
                    <h3>Heading color</h3>
                    <TextField className='w-100' value={color} onChange={(e) => setColor(e.target.value)} />
               </Col>
               <Col lg='4'>
                    <h3>Background</h3>
                    <TextField className='w-100' value={background} onChange={(e) => setBackground(e.target.value)} />
               </Col>
          </Row>
     )
}

export default Heading