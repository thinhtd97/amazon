import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'


const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Group>
                <Form.Control 
                type="text" 
                name="q" 
                onChange={(e) => setKeyword(e.target.value)} 
                placeholder="Search Product ..."></Form.Control>
                <Button type="submit" variant="outline-success">Search</Button>
            </Form.Group>
            
        </Form>
    )
}

export default SearchBox
