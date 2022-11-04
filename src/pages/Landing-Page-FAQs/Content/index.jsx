import { TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Col, Row } from 'reactstrap'

function Content(props) {
     
     const [content, setContent] = useState("As a leader in the field of Blockchain coding, Blocktech Brew not only teaches you how to make tokens, smart contracts and more, but also offers you tools like this token generator that allows you to save time and deploy tokens automatically");
     const { data, setData } = props;
     const [color, setColor] = useState('black')
     return (
          <Row className='mt-5'>
               <Col lg='8'>
                    <h3>Content</h3>
                    <TextField className='w-100' value={data.content} onChange={(e) => {
                         setContent(e.target.value);
                         setData({ ...data, content: e.target.value })
                         console.log(data);
                    }} />
               </Col>
               <Col lg='4'>
                    <h3>Content color</h3>
                    <TextField className='w-100' value={data.contentColor} onChange={(e) => {
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