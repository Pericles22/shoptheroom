import React from 'react'
import styled from 'styled-components'

import Rating from './Rating'

export default ({product}) => {
    const { name, price: { currencySymbol, display } } = product

    return (
        <Wrapper>
            <Price>{currencySymbol+display}</Price>
            <Name>{name}</Name>
            <Rating count={54} rating={4.5} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-left:10px;
`

const Price = styled.span`
    font-size: 14px;
    font-weight: 700;
`

const Name = styled.span`
    font-size: 10px;
`
