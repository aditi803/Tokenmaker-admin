import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { Col, Row } from 'reactstrap';

function Button() {
     const [text, setText] = useState('Start now');
     const [background, setBackground] = useState('#f50058');
     const [color, setColor] = useState('white')
  return (
       <Row className='mt-5'>
            <Col lg='4'>
                 <h3>Button Text</h3>
                 <TextField className='w-100' value={text} onChange={(e) => setText(e.target.value)} />
            </Col>
            <Col lg='4'>
                 <h3>Button Text color</h3>
                 <TextField className='w-100' value={color} onChange={(e) => setColor(e.target.value)} />
            </Col>
            <Col lg='4'>
                 <h3>Button Background</h3>
                 <TextField className='w-100' value={background} onChange={(e) => setBackground(e.target.value)} />
            </Col>
       </Row>
  )
}

export default Button