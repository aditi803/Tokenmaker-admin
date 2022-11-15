import { TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Col, Row, Label, Input } from 'reactstrap'
import InputMask from "react-input-mask"
import InputColor from 'react-input-color';
import { SketchPicker } from "react-color"
import "@vtaits/react-color-picker/dist/index.css"

function Content(props) {
     
     const [content, setContent] = useState("");
     const { css, setCss } = props;
     const [color, setColor] = useState('')
     const [simple_color3, setsimple_color3] = useState(0)
     const handleHor = color => {
          setcolorHor(color.hex)
        }
     return (
          <Row className='mt-3'>
               <Col lg='8'>
                    <Label>Content</Label>
                    <InputMask className="form-control input-color" value={css.content} onChange={(e) => {
                         setContent(e.target.value);
                         setCss({ ...css, content: e.target.value })
                         console.log(css);
                    }} />
               </Col>
               <Col lg='4'>
                    <Label>Content color</Label>
                    {/* <div>
                         <InputColor
                              initialValue="#5e72e4"
                              
                              onChange={setColor}
                              placement="right"
                              style={{width:"59px", height:"51px"}}
                         />
                         <div

                              style={{
                                   width: 250,
                                   height: 50,
                                   marginTop: 20,
                                   backgroundColor: color.rgba,
                                   display:"none"
                              }}
                         />
                    </div> */}
                    <Input
                         type="text"
                         onClick={() => {
                              setsimple_color3(!simple_color3)
                         }}
                         // onChange={(e) => console.log(e , '>>>>>>>>>>>>>>>>>>>')}
                         value={css.contentColor}
                         readOnly
                    />
                    {simple_color3 ? (
                         <SketchPicker
                              color={css.contentColor}
                              value={simple_color3}
                              width="160px"
                              // onChangeComplete={handleHor}
                              onChangeComplete={e => {
                                   setCss(prev => ({
                                        ...prev,
                                        contentColor: e.hex,
                                   }))
                              }}
                         />
                    ) : null}
                    {/* <TextField className='w-100' value={css.contentColor} onChange={(e) => {
                         setColor(e.target.value)

                         setCss({ ...css, contentColor: e.target.value });
                         console.log(css);
                    }}
                    /> */}
               </Col>
          </Row>
     )
}

export default Content