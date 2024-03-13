import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ page, pages, keyword = '', isAdmin = false }) {

    console.log('befor Keyword: ', keyword)

    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    console.log('Keyword: ', keyword)

    return (pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={!isAdmin ?
                    { pathname: '/', search: `?keyword=${keyword}&page=${x + 1}` }
                    : { pathname: '/admin/productlist/', search: `?keyword=${keyword}&page=${x + 1}` }
                    }
                >
                <Pagination.Item
                    key={Number(x + 1)} 
                    active={page !== (x + 1)}
                    disabled={page === (x + 1)}
                >
                    {x + 1}
                </Pagination.Item>
              </LinkContainer>
            ))}
        </Pagination>
    )
    )
}

export default Paginate
