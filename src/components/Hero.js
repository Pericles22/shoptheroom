import React, { createRef, Component, Fragment } from 'react'
import styled from 'styled-components'

import Location from './Location'
import Popup from './Popup'

export default class Hero extends Component {
    constructor() {
        super()
        this.ImageRef = createRef()
    }

    render() {
        const { props, ImageRef } = this
        const { data, products, updateLocation, visible } = props
       
        if(!data || !Object.keys(data).length) return <div></div>
        
        const { media: { extraLarge: { link: imageUrl } }, products: curalateProducts } = data
        const imageWidth = ImageRef.current ? ImageRef.current.clientWidth : 0

        console.log(curalateProducts, products)

        return (
            <Wrapper>
                <InnerWrapper>
                    <Image innerRef={ImageRef} imageurl={imageUrl} />
                    {curalateProducts.map((cProduct, idx) => {
                        const product = products.find(oProduct => oProduct.attributes.featuredProductId.toString() === cProduct.metadata.productId.toString()) || products[idx]
                        const { spatialTag: coords } = cProduct
                        
                        if(!product) return ''
                        return (
                            <Fragment>
                                <Location
                                    coords={coords}
                                    key={idx}
                                    id={idx}
                                    product={product}
                                    updateLocation={updateLocation}
                                />
                                <Popup coords={coords} imageWidth={imageWidth} product={product} visible={visible === idx} />
                            </Fragment>
                        )
                    })}
                </InnerWrapper>
            </Wrapper>
        )
    }
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
