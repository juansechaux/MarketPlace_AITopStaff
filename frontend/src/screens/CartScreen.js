import React, {useEffect} from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Message } from '../components/Message'
import { addToCart } from '../actions/cartActions'

function CartScreen({ match }) {
  const history = useNavigate();
  const { id } = useParams();
  const productId = id
  const location = useLocation();
  const qty = Number(new URLSearchParams(location.search).get('qty'));

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  console.log('cartItems:', cartItems)

  useEffect(() => {
    if (productId) {
        dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])


  return (
    <div>
        Cart
    </div>
  )
}

export default CartScreen
