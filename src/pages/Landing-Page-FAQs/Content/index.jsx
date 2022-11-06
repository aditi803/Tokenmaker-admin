import { TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Col, Row } from 'reactstrap'

function Content(props) {
     
     const [content, setContent] = useState("");
     const { css, setCss } = props;
     const [color, setColor] = useState('')
     return (
          <Row className='mt-5'>
               <Col lg='8'>
                    <h3>Content</h3>
                    <TextField className='w-100' value={css.content} onChange={(e) => {
                         setContent(e.target.value);
                         setCss({ ...css, content: e.target.value })
                         console.log(css);
                    }} />
               </Col>
               <Col lg='4'>
                    <h3>Content color</h3>
                    <TextField className='w-100' value={css.contentColor} onChange={(e) => {
                         setColor(e.target.value)

                         setCss({ ...css, contentColor: e.target.value });
                         console.log(css);
                    }}
                    />
               </Col>
          </Row>
     )
}

export default Content