import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin }) => {
    return (
        <Pagination>
            {pages > 0 && (
                <>
                <LinkContainer to={ isAdmin ? `/admin/products/page/1` : `/products/page/1`}>
                    <Pagination.First disabled={page === 1} />
                </LinkContainer>
                <LinkContainer to={ isAdmin ? `/admin/products/page/${page-1}` : `/products/page/${page-1}`}>
                    <Pagination.Prev disabled={page === 1} />
                </LinkContainer>
                
                </>
            )}
            {[...Array(pages).keys()].map(x => (
                <LinkContainer to={ isAdmin ? `/admin/products/page/${x+1}` : `/products/page/${x+1}`}>
                    <Pagination.Item active={x+1 === page}>  {x+1} </Pagination.Item>
                </LinkContainer>
                
            ))}
            {pages > 0 && (
                <>
                <LinkContainer to={ isAdmin ? `/admin/products/page/${page+1}` : `/products/page/${page+1}`}>
                    <Pagination.Next active={null} disabled={page === pages} />
                </LinkContainer>
                <LinkContainer to={ isAdmin ? `/admin/products/page/${pages}` : `/products/page/${pages}`}>
                    <Pagination.Last disabled={page === pages} />
                </LinkContainer>
                
                </>
            )}
        </Pagination>
    )
}

export default Paginate
