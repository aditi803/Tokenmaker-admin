import React, { useState } from "react"
import { TextField } from "@mui/material"
import { Col, Label, Row, Input } from "reactstrap"
import InputMask from "react-input-mask"
import { SketchPicker } from "react-color"
// import InputColor from 'react-input-color';

function Heading(props) {
  const [heading, setHeading] = useState("")
  const [simple_color3, setsimple_color3] = useState(0)
  const [simple_color2, setsimple_color2] = useState(0)
  const { data, setData } = props
  const [background, setBackground] = useState("")
  // const [color, setColor] = useState('')
  const [color, setColor] = React.useState({})

  return (
    <Row className="mt-5">
      <Col lg="4">
        <Label>Heading</Label>
        <InputMask
          className="form-control input-color"
          value={data.heading}
          onChange={e => {
            setHeading(e.target.value)
            setData({ ...data, heading: e.target.value })
            console.log(data)
          }}
        />
      </Col>
      <Col lg="4">
        {/* <Label>Heading color</Label> */}
        <div className="form-group mb-4">
          <Label for="input-date2"> Heading color</Label>
          <Input
            type="text"
            onClick={() => {
              setsimple_color3(!simple_color3)
            }}
            // onChange={(e) => console.log(e , '>>>>>>>>>>>>>>>>>>>')}
            value={data.headingColor}
            readOnly
          />
          {simple_color3 ? (
            <SketchPicker
              color={data.headingColor}
              value={simple_color3}
              width="160px"
              // onChangeComplete={handleHor}
              onChangeComplete={e => {
                setData(prev => ({
                  ...prev,
                  headingColor: e.hex,
                }))
              }}
            />
          ) : null}
        </div>
      </Col>
      <Col lg="4">
        {/* <Label>Background</Label> */}
        <div className="form-group mb-4">
          <Label for="input-date2"> Background</Label>
          <Input
            type="text"
            onClick={() => {
              setsimple_color2(!simple_color2)
            }}
            // onChange={(e) => console.log(e , '>>>>>>>>>>>>>>>>>>>')}
            value={data.backgroundColor}
            readOnly
          />
          {simple_color2 ? (
            <SketchPicker
              color={data.backgroundColor}
              value={simple_color2}
              width="160px"
              // onChangeComplete={handleHor}
              onChangeComplete={e => {
                setData(prev => ({
                  ...prev,
                  backgroundColor: e.hex,
                }))
              }}
            />
          ) : null}
        </div>

        {/* <TextField
          className="w-100"
          value={data.backgroundColor}
          onChange={e => {
            setColor(e.target.value)
            setData({ ...data, backgroundColor: e.target.value })
            console.log(data)
          }}
        /> */}
      </Col>
    </Row>
  )
}

export default Heading
