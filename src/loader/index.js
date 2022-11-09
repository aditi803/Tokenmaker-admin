import React from 'react'
import './loader.css';
import ClipLoader from 'react-spinners/ClipLoader';

function Spinner() {
  return (
    <div className="loader">
      <ClipLoader
        // size={20}
        color="#A74AC7"
      />
  </div>
  )
}

export default Spinner;