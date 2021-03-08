import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailsUser, userUpdateAction } from '../actions/userActions'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'

const UserEditScreen = ({ match, history }) => {

    const userId = match.params.id
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { success: successUpdateUser, error: errorUpdateUser } = userUpdate

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userUpdateAction(userId, {name, email, isAdmin}))
    }

    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin) {
            history.push('/signin')
        } else {
            if(!user || !user.name || user._id !== userId) {
                dispatch(getDetailsUser(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
        
    }, [dispatch, userInfo, history, userId, user])
    return (
        <FormContainer>
            <h3>Edit User</h3>
            {errorUpdateUser && <Message variant="danger"> {errorUpdateUser} </Message>}
            {successUpdateUser && (<Message> Update User Successfully </Message>)}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="Name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control value={name} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="Email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control value={email} type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Check type="checkbox" name="isAdmin" checked={isAdmin} label="isAdmin" id="isAdmin" onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                </Form.Group>
                <Button type="submit" variant="primary">Update</Button>
            </Form>

        </FormContainer>
    )
}

export default UserEditScreen
