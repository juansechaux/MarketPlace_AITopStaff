import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import {listTopProducts} from '../actions/productActions'

function ProductsCarousel() {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const {error, loading, products} = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

  return ( loading ? <Loader />
    : error
    ? <Message variant='danger'>{error}</Message>
    : (
        <Carousel pause='hover' className='bg-primary rounded'>
            {products.map(product => (
                <Carousel.Item key={product._id} >
                    <Link to={`/product/${product._id}`}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        style={{ maxWidth: '100%', width: '450px', height: '275px', objectFit: 'cover' }}
                    />
                        <Carousel.Caption className='carouser.caption'>
                            <h4>{product.name}</h4>
                            {/* (${product.price}) */}
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
  )
}

export default ProductsCarousel
