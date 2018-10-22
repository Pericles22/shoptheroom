import React, { createRef, Component } from 'react'
import styled from 'styled-components'

import Popup from './Popup'

export default class Location extends Component {
    constructor(props) {
        super(props)
    }

    handleClick = (event) => {
        const { props: { id, updateLocation } } = this

        event.stopPropagation()
        updateLocation(id)
    }

    render() {
        const { props: { id, product, visible }, handleClick } = this
        const { spatialTag } = product
        const { x, y } = spatialTag
        const offsetX = x >= .9 ? '-100%' : (x <= .1 ? 0 : '-50%')
        const offsetY = y >= .9 ? '-100%' : (y <= .1 ? 0 : '-50%')

        return (
            <Wrapper onClick={handleClick} offsetX={offsetX} offsetY={offsetY} coords={spatialTag}>
                <InnerCircle></InnerCircle>
                <Loc type="radio"></Loc>
                <Popup product={product} visible={visible === id} />
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    align-items: center;
    background: rgba(100,100,100,.5);
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    max-height: 10vw;
    max-width: 10vw;
    position: absolute;
    top: ${props => props.coords.y * 100}%;
    left: ${props => props.coords.x * 100}%;
    transform: translateX(${props => props.offsetX}) translateY(${props => props.offsetY});
    width: 40px;
    height: 40px;
`

const InnerCircle = styled.span`
    background: #fff;
    border-radius: 100%;
    position: absolute;
    width: 20%;
    height: 20%;
`

const Loc = styled.input`
    -moz-apperance: none;
    -webkit-appearance: none;
    appearance: none;
    border-radius: 100%;
    cursor: pointer;
    margin: 0;
    position: absolute;
    width: 100%;
    height: 100%;
`
