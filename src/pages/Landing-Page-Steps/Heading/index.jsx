import { TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Col, Label, Row, Input } from 'reactstrap'
import InputMask from "react-input-mask"
import { SketchPicker } from "react-color"
import "@vtaits/react-color-picker/dist/index.css"
import InputColor from 'react-input-color';


function Heading(props) {
     const [heading, setHeading] = useState('');
     const { css, setCss } = props;
     const [color, setColor] = useState('')
     const [simple_color3, setsimple_color3] = useState(0)
     const handleHor = color => {
          setcolorHor(color.hex)
        }
     return (
          <Row className='mt-2'>
               <Col lg='8'>
                    <Label>Heading</Label>
                    <InputMask className="form-control input-color" value={css.heading} onChange={(e) => {
                         setHeading(e.target.value);
                         setCss({ ...css, heading: e.target.value })
                         console.log(css);
                    }} />
               </Col>
               <Col lg='4'>
                    <Label>Heading color</Label>
                    {/* <div>
                         <InputColor
                              initialValue="#8671ee"
                              style={{width:" 59px", height:"51px"}}
                              onChange={setColor}
                              placement="right"
                         />
                         <div
                              style={{
                                   width: 250,
                                   height: 50,
                                   marginTop: 20,
                                   backgroundColor: color.rgba,
                                   display:'none'
                              }}
                         />
                    </div> */}
                    {/* <TextField className='w-100' value={css.headingColor} onChange={(e) => {
                         setColor(e.target.value);
                         setCss({ ...css, headingColor: e.target.value })
                         console.log(css);
                    }} /> */}
                    <Input
                         type="text"
                         onClick={() => {
                              setsimple_color3(!simple_color3)
                         }}
                         // onChange={(e) => console.log(e , '>>>>>>>>>>>>>>>>>>>')}
                         value={css.headingColor}
                         readOnly
                    />
                    {simple_color3 ? (
                         <SketchPicker
                              color={css.headingColor}
                              value={simple_color3}
                              width="160px"
                              // onChangeComplete={handleHor}
                              onChangeComplete={e => {
                                   setCss(prev => ({
                                        ...prev,
                                        headingColor: e.hex,
                                   }))
                              }}
                         />
                    ) : null}
               </Col>
          </Row>
     )
}

export default Heading