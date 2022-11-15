import React, { useState } from "react"
import { TextField } from "@mui/material"
import { Col, Row, Label, Input } from "reactstrap"
import InputColor from "react-input-color"
// import ReactInputMask from 'react-input-mask';
import InputMask from "react-input-mask"
import { SketchPicker } from "react-color"

function ButtonComp(props) {
  const [text, setText] = useState("")
  const [simple_color2, setsimple_color2] = useState(0)
  const [simple_color3, setsimple_color3] = useState(0)
  const { data, setData } = props
  const [background, setBackground] = useState("")
  const [color, setColor] = useState("")
  return (
    <Row className="mt-2">
      <Col lg="4">
        <Label>Button Text</Label>
        <InputMask
          value={data.buttonText}
          className="form-control input-color "
          onChange={e => {
            setColor(e.target.value)
            setData({ ...data, buttonText: e.target.value })
            console.log(data)
          }}
        />
      </Col>
      <Col lg="4">
        {/* <Label>Button Text color</Label> */}
        <div className="form-group mb-4">
          <Label for="input-date2"> Button Text color</Label>
          <Input
            type="text"
            onClick={() => {
              setsimple_color3(!simple_color3)
            }}
            // onChange={(e) => console.log(e , '>>>>>>>>>>>>>>>>>>>')}
            value={data.buttonTextColor}
            readOnly
          />
          {simple_color3 ? (
            <SketchPicker
              color={data.buttonTextColor}
              value={simple_color3}
              width="160px"
              // onChangeComplete={handleHor}
              onChangeComplete={e => {
                setData(prev => ({
                  ...prev,
                  buttonTextColor: e.hex,
                }))
              }}
            />
          ) : null}
        </div>

        {/* <TextField className='w-100' value={data.buttonTextColor} onChange={(e) => {
                      setColor(e.target.value);
                      setData({ ...data, buttonTextColor: e.target.value })
                      console.log(data);
                 }} /> */}
      </Col>
      <Col lg="4">
        {/* <Label>Button Background</Label> */}
        <div className="form-group mb-4">
          <Label for="input-date2"> Button Background</Label>
          <Input
            type="text"
            onClick={() => {
               setsimple_color2(!simple_color2)
            }}
            // onChange={(e) => console.log(e , '>>>>>>>>>>>>>>>>>>>')}
            value={data.buttonBackgroundColor}
            readOnly
          />
          {simple_color2 ? (
            <SketchPicker
              color={data.buttonBackgroundColor}
              value={simple_color2}
              width="160px"
              // onChangeComplete={handleHor}
              onChangeComplete={e => {
                setData(prev => ({
                  ...prev,
                  buttonBackgroundColor: e.hex,
                }))
              }}
            />
          ) : null}
        </div>

        {/* <TextField
          className="w-100"
          value={data.buttonBackgroundColor}
          onChange={e => {
            setColor(e.target.value)
            setData({ ...data, buttonBackgroundColor: e.target.value })
            console.log(data)
          }}
        /> */}
      </Col>
    </Row>
  )
}

export default ButtonComp
