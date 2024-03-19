import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({ product}) {
  return (
    <Card className="my-3 p-3 rounded" style={{ height: '450px' }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          style={{ width: '100%', height: '200px', objectFit: 'cover'}}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>

          <Card.Title as='div' style={{ height: '50px' }}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <div className='my-3'>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
          </div>
        </Card.Text>

        <Card.Text>
          {product.short_description}
        </Card.Text>

        <Card.Text as='h3'>
            ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}


export default Product
