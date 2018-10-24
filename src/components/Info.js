import React from 'react'
import styled from 'styled-components'

import Rating from './Rating'

export default ({product}) => {
    console.log('PRODUCT', product)
    const { options, productName, reviewCount, reviewRating } = product.attributes.productData
    const { savings, sellingPrice } = options[0]
    const oldPrice = Number(savings.slice(1)) + Number(sellingPrice.slice(1))

    return (
        <Wrapper>
            <div>
                <Price>{sellingPrice}</Price>
                <OldPrice>{isNaN(oldPrice) ? '' : '$' + oldPrice}</OldPrice>
            </div>
            <Name>{productName}</Name>
            <Rating count={reviewCount} rating={reviewRating} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-left:10px;
`

const OldPrice = styled.span`
    font-size: 12px;
    margin-left: 10px;
    text-decoration: line-through;
`

const Price = styled.span`
    font-size: 14px;
    font-weight: 700;
`

const PriceWrapper = styled.div``

const Name = styled.span`
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    font-size: 10px;
    margin-top: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
`
