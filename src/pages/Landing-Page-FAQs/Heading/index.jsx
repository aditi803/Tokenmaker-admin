import { TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Col, Label, Row } from 'reactstrap'

function Heading(props) {
     const [heading, setHeading] = useState('');
     const { css, setCss } = props;
     const [color, setColor] = useState('')
     return (
          <Row>
               <Col lg='8'>
                    <h3>Heading</h3>
                    <TextField className='w-100' value={css.heading} onChange={(e) => {
                         setHeading(e.target.value);
                         setCss({ ...css, heading: e.target.value })
                         console.log(css);
                    }} />
               </Col>
               <Col lg='4'>
                    <h3>Heading color</h3>
                    <TextField className='w-100' value={css.headingColor} onChange={(e) => {
                         setColor(e.target.value);
                         setCss({ ...css, headingColor: e.target.value })
                         console.log(css);
                    }} />
               </Col>
          </Row>
     )
}

export default Heading