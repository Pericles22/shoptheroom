import React, { Component } from 'react'
import styled from 'styled-components'
import Room from './Room'

function randomizeRooms(mediaItem, rooms) {
    if(!rooms || !rooms.length) return []

    let currentIndex = rooms.length,
        randomized = rooms.slice(),
        temporaryValue = '',
        randomIndex = 0
    
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = randomized[currentIndex]
        randomized[currentIndex] = randomized[randomIndex]
        randomized[randomIndex] = temporaryValue
    }
    
    return randomized.filter(room => room.id !== mediaItem.id).slice(0,6)
}

export default class SimilarRooms extends Component {
    constructor(props) {
        super(props)

        this.state = {
            randomRooms: []
        }
    }

    componentWillReceiveProps(next) {
        const { mediaItem, rooms } = next
        
        if((!this.props.rooms || !this.props.rooms.length) && rooms && rooms.length)
            this.setState({randomRooms: randomizeRooms(mediaItem, rooms)})
    }

    render() {
        const { props: { updateFeaturedRoom }, state: { randomRooms } } = this

        return (
            <SimilarWrapper>
                <Title>Rooms You Might Like</Title>
                <Rooms>
                    {randomRooms.map((rm, idx) => <Room room={rm} index={idx} updateFeaturedRoom={updateFeaturedRoom}></Room>)}
                </Rooms>
            </SimilarWrapper>
        )
    }
}

const SimilarWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.h2`

`

const Rooms = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 -8px;

    @media(max-width: 743px) {
        margin: 0 -6px;
    }
`