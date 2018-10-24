import React from 'react'
import styled from 'styled-components'

import Info from './Info'


export default ({coords, imageWidth, product, visible}) => {
    console.log('PRODUCT GOES HERE', product)

    const { asset: { imageUrl } } = product
    const distance = imageWidth * Math.min(coords.x, 1 - coords.x)
    const popupWidth = 240
    const marginX = distance - Math.max((distance - (imageWidth - popupWidth)), 0) - 20

    return (
        <PopupWrapper marginX={marginX} onClick={(event) => event.stopPropagation()} coords={coords} visible={visible}>
            <Image imageurl={imageUrl} />
            <Info product={product} />
        </PopupWrapper>
    )
}


const PopupWrapper = styled.div`
    align-items: center;
    background: #fff;
    border-radius: 4px;
    display: ${props => props.visible ? 'flex' : 'none'};
    flex: 1;
    margin: 0 ${props => props.coords.x >= .5 ? 0 : props.marginX}px 0 ${props => props.coords.x >= .5 ? props.marginX : 0}px; 
    max-width: 90vw;
    padding: 5px;
    position: absolute;
    top: ${props => props.coords.y >= .5 ? 'initial' : props.coords.y * 100 + '%'};
    bottom: ${props => props.coords.y >= .5 ? (1 - props.coords.y) * 100 + '%' : 'initial'};
    right: ${props => props.coords.x >= .5 ? props.marginX + 'px' : 'initial'};
    left: ${props => props.coords.x >= .5 ? 'initial' : props.marginX + 'px'};
    width: 240px;
    z-index: 2;
`

const Image = styled.img.attrs({
    src: props => props.imageurl
})`
    flex: 1;
    width: 55px;
`
