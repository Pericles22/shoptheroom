import React from 'react'
import styled from 'styled-components'

import Info from './Info'


export default ({click, product, visible}) => {
    const { images, spatialTag: coords } = product
    const { smallSquare: { link: imageUrl } } = images[0]

    return (
        <PopupWrapper onClick={(event) => event.stopPropagation()} coords={coords} visible={visible}>
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
    max-width: 90vw;
    padding: 5px;
    position: absolute;
    top: ${props => props.coords.y >= .5 ? 'initial' : '50%'};
    bottom: ${props => props.coords.y >= .5 ? '50%' : 'initial'};
    right: ${props => props.coords.x >= .5 ? '-10%' : 'initial'};
    left: ${props => props.coords.x >= .5 ? 'initial' : '-10%'};
    width: 240px;
`

const Image = styled.img.attrs({
    src: props => props.imageurl
})`
    flex: 1;
    width: 55px;
`
