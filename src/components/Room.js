import React from 'react'
import styled from 'styled-components'

export default ({index, room, updateFeaturedRoom}) => {
    const imageLink = room ? room.media.large.link : ''

    return (
        <RoomWrapper className={index > 1 ? 'high-index' : ''} onClick={() => updateFeaturedRoom(room.id)} imageLink={imageLink}>
            <Room imageLink={imageLink} />
        </RoomWrapper>
    )
}

const RoomWrapper = styled.div`
    box-sizing: border-box;
    cursor: pointer;
    padding: 8px;
    width: calc(100% / 3);

    @media(max-width: 1509px) {
        width: 50%;
    }
    @media(max-width: 569px) {
        padding: 6px;
        width: 100%;

        &.high-index {
            display: none;
        }    
    }
`

const Room = styled.div`
    background: url(${props => props.imageLink}) center center no-repeat;
    background-size: cover;
    border-radius: 4px;
    padding-top: 67%;
`
