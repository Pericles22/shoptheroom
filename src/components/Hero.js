import React from 'react'
import styled from 'styled-components'

import Location from './Location'

export default ({data, updateLocation, visible}) => {
    if(!data || !Object.keys(data).length) return <div></div>
    const { media: { extraLarge: { link: imageUrl } }, products: curalateProducts } = data

    return (
        <Wrapper>
            <InnerWrapper>
                <Image imageurl={imageUrl} />
                {curalateProducts.map((product, idx) => <Location key={idx} id={idx} visible={visible} updateLocation={updateLocation} product={product} ratingCount={} rating={} />)}
            </InnerWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    align-items: center;
    background: #f0f1f2;
    display: flex;
    justify-content: center;
`

const InnerWrapper = styled.div`
    font-size: 0;
    position: relative;
`

const Image = styled.img.attrs({
    src: props => props.imageurl
})`
    max-height: 50vh;

    @media(max-width: 569px) {
        max-width: 100vh;
    }
`
