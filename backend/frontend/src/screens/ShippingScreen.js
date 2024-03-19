import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress, saveObservation } from '../actions/cartActions'

function ShippingScreen() {
  const history = useNavigate();
  const location = useLocation();

  // const cart = useSelector(state => state.cart)
  // const { shippingAddress } = cart

  const cart = useSelector(state => state.cart)
  const { Observation } = cart

  const dispatch = useDispatch()

  // const [address, setAdress] = useState(shippingAddress.address)
  // const [city, setCity] = useState(shippingAddress.city)
  // const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  // const [country, setCountry] = useState(shippingAddress.country)

  const [modification, setModification] = useState(Observation ? Observation.modification : '');

  // const submitHandler = (e) => {
  //   e.preventDefault()
  //   dispatch(saveShippingAddress({ address, city, postalCode, country }))
  //   history('/payment')
  // }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveObservation({ modification }))
    history('/payment')
  }


  return (
    <FormContainer>

      <CheckoutSteps step1 step2/> 
      
      <h1>Observation</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='address'>
            <Form.Label>Do you have any observation?</Form.Label>
            <Form.Control
                as='textarea'
                rows={5}
                placeholder='Enter observation'
                value={modification ? modification : ''}
                onChange={(e) => setModification(e.target.value)}
            > 
            </Form.Control>
        </Form.Group>

        {/* <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='Enter address'
                value={address ? address : ''}
                onChange={(e) => setAdress(e.target.value)}
            > 
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='city' style={{ marginTop: '10px' }}>
            <Form.Label>City</Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='Enter city'
                value={city ? city : ''}
                onChange={(e) => setCity(e.target.value)}
            > 
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode' style={{ marginTop: '10px' }}>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='Enter postal code'
                value={postalCode ? postalCode : ''}
                onChange={(e) => setPostalCode(e.target.value)}
            > 
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='country' style={{ marginTop: '10px' }}>
            <Form.Label>Country</Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='Enter country'
                value={country ? country : ''}
                onChange={(e) => setCountry(e.target.value)}
            > 
            </Form.Control>
        </Form.Group> */}


        <Button type='submit' variant='primary' style={{ marginTop: '10px' }}>
            Continue
        </Button>

      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
