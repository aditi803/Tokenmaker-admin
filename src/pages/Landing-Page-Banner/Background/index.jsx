import React from 'react'
import { useState } from 'react';
import { Col, Row } from 'reactstrap'

function Background() {
     const [background, setBackground] = useState('https://tokenmaker.block-brew.com/static/media/Background-V1.1-1.8da2fcfd43ac80268eb2.png');
     const handleChange = (e) => {
          let files = e.target.files;
          if (!files.length) {
               var reader = new FileReader();
               reader.readAsDataURL(files[0]);

               reader.onloadend = function () {
                    console.log(this.result);
                    setBackground(this.result);
               }
          }
     }
     return (
          <Row className='mt-5'>
               <Row>
                    <Col>
                         <img src={background} alt="" height={'230px'} width={'200px'} />
                    </Col>
               </Row>
               <Row>
                    <Col>
                         <label className="btn btn-primary" style={{width:'200px'}}>
                              Update<input type="file" onChange={handleChange} style={{ width: '0px', height: '0px', overflow: 'hidden' }} />
                         </label>
                    </Col>
               </Row>
          </Row>
     )
}

export default Background