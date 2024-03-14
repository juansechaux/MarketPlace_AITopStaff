import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="bg-primary text-white">
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <h5 className="text-white">About Us</h5>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Mauris aliquet lacinia
            nulla ut laoreet.
          </Col>
          <Col className='text-center py-3'>
            <h5 className="text-white">Contact Us</h5>
            If you have any query, please contact us{' '}
            <a href="mailto:andres@lidarit.com" className="text-warning underline">andres@lidarit.com</a>
          </Col>
          <Col className='text-center py-3'>
            <div>
              <p>Florida, USA<br></br>
              +1 407 632 2622</p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className='text-center py-3'>Copyright &copy; AITopStaff</Col>
        </Row> 
      </Container>
    </footer>
  )
}

export default Footer
