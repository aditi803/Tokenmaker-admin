import { TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Col, Row } from 'reactstrap'

function Content(props) {
     const [content, setContent] = useState('You’re looking for a solution to create your own token on the blockchain?Blocktech Brew has you covered: we will help you generate a token automatically, and deploy it in a matter of minutes.');
     const { data, setData } = props;
     const [color, setColor] = useState('white')
     return (
          <Row className='mt-5'>
               <Col lg='8'>
                    <h3>Content</h3>
                    <TextField className='w-100' value={content} onChange={(e) => {
                         setContent(e.target.value);
                         setData({ ...data, content: e.target.value })
                         console.log(data);
                    }} />
               </Col>
               <Col lg='4'>
                    <h3>Content color</h3>
                    <TextField className='w-100' value={color} onChange={(e) => {
                         setColor(e.target.value)
                    
                         setData({ ...data, contentColor: e.target.value });
                         console.log(data);
                    }}

                    />
               </Col>
          </Row>
     )
}

export default Content