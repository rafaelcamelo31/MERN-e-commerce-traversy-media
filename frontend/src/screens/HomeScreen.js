import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        if (products.length === 0) {
            dispatch(listProducts())
        }
    }, [dispatch, products.length])

    return (
        <>
            <h1>Latest Products</h1>
            { loading ? <Loader></Loader>
                : error ? <Message variant='danger'>{error}</Message>
                    : (<Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>)}
        </>
    )
}

export default HomeScreen