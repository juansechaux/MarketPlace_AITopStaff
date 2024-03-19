import React, { useState, useEffect } from 'react'
import { Link, redirect, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderAction'

function ProfileScreen() {
  const history = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [okMessage, setOkMessage] = useState('')

  const dispatch = useDispatch()


  const userDetails = useSelector(state => state.userDetails)
  const { error, loading, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector(state => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
      if(!userInfo){
          history('/login')
      } else {
        if(!user || !user.name || success){
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        } else {
            setName(user.name)
            setEmail(user.email)
        }
      }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
      e.preventDefault()

      if(password != confirmPassword){
          setMessage('Password do not match')
          setOkMessage('')
      } else {
          dispatch(updateUserProfile({
            'id': user._id,
            'name': name,
            'email': email,
            'password': password
            }))
          setOkMessage('The information was updated successfully')
          setMessage('')
      }
  }
  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>

            {message && <Message variant='danger'>{message}</Message>}
            {okMessage && <Message variant='success'>{okMessage}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name' style={{ marginTop: '10px' }}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    > 
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email' style={{ marginTop: '10px' }}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    > 
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password' style={{ marginTop: '10px' }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    > 
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm' style={{ marginTop: '10px' }}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    > 
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' style={{ marginTop: '10px' }}>
                    Update
                </Button>

            </Form>
        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? (
                <Loader />
            ) : errorOrders ? (
                <Message variant='danger'>{errorOrders}</Message>
            ) : (
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Bot program send</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
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

export default ProfileScreen
