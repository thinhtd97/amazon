import React, { useEffect } from 'react'
import { Row, Table, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, userDeleteAction } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const usersList = useSelector(state => state.usersList)
    const { users, loading, error } = usersList

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    const deleteHandler = (id) => {
        dispatch(userDeleteAction(id))
    }

    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin) {
            history.push('/signin')
        }
        dispatch(listUsers())
        
    }, [dispatch, userInfo, history, successDelete])
    return (
        <Row>
            <h3>Users</h3>
            <Col md={12}>
                {loading ? (<Loader />) : error ? (<Message variant="danger"> {error} </Message>) : (
                    <Table hover responsive bordered striped className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user) => (
                                <tr key={user._id}>
                                    <th> {user._id} </th>
                                    <th> {user.name} </th>
                                    <th> {user.email} </th>
                                    <td style={{textAlign: 'center'}}> {user.isAdmin ? (
                                        <i className="fas fa-check" style={{color: 'green'}}></i>
                                    ) : (
                                        <i className="fas fa-times" style={{color: 'red'}}></i>
                                    )} </td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}`}>
                                            <Button variant="light" className='btn-sm'>
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                            
                                        </LinkContainer>
                                        <Button variant="danger" className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default UserListScreen



