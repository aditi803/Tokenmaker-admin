import React from 'react'
import { useState } from 'react';
import { Col, Row } from 'reactstrap'

function Background(props) {
     const { data, setData } = props;
     const [background, setBackground] = useState('');
     const handleChange = (e) => {
          let files = e.target.files;
          if (!files.length) {
               var reader = new FileReader();
               reader.readAsDataURL(files[0]);
console.log('m');
               reader.onloadend = function () {
                    console.log(this.result);
                    setData({...data,backgroundImage:this.result});
               }
          }
     }
     return (
          <Row className='mt-5'>
               <Row>
                    <Col>
                         <img src={data.backgroundImage} alt="" height={'230px'} width={'200px'} />
                    </Col>
               </Row>
               <Row>
                    <Col>
                         <label className="btn btn-primary" style={{width:'200px',marginTop:'10px'}}>
                              Update<input type="file" onChange={handleChange} style={{ width: '0px', height: '0px', overflow: 'hidden' }} />
                         </label>
                    </Col>
               </Row>
          </Row>
     )
}

export default Background