import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner role="status" animation="border" style={{
            width: '100px', 
            height: '100px', 
            display: 'block', 
            margin: '0 auto'}}>
            <span className="sr-only"> Loading... </span>
        </Spinner>
    )
}

export default Loader
