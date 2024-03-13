import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation  } from 'react-router-dom'

function SearchBox() {

  const [keyword, setKeyword] = useState('')

  let navigate = useNavigate()
  const location = useLocation()

  const submitHandler = (e) => {
    e.preventDefault()
    if(keyword) {
        navigate(`/?keyword=${keyword}&page=1`)
    } else {
        navigate(location.pathname)
    }
  }
  return (
    <Form onSubmit={submitHandler} className="d-flex flex-wrap align-items-start">
      <div className="d-flex align-items-center">
        <Form.Control
            type='text'
            name='q'
            onChange={ (e) => setKeyword(e.target.value)}
            className='mr-sm-2 ml-sm-5'
            style={{ height: '38px', marginRight: '5px' }}
        >
        </Form.Control>

        <div className="ms-2">
        <Button
            type='submit'
            variant='outline-success'
            className='p-2'
            style={{ height: '38px' }}
        >
            Submit
        </Button>
        </div>
      </div>
    </Form>
  )
}

export default SearchBox
