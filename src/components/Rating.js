import React from 'react'
import styled from 'styled-components'
import StarFull from 'overstock-component-library/lib/Icons/rate/Star_Full'

const renderStars = () => {
    return Array.from(Array(5).keys()).map(i => (
        <StarFull key={i} data-index={i} viewBox='0 0 30 30' />
    ))
}

export default ({count, rating}) => (
    <RatingWrapper>
        <Count>{count} reviews</Count>
        <StarWrapper>
            <StarContainer>
                {renderStars()}
            </StarContainer>
            <Front rating={rating}>
                <FilledStarContainer>
                    {renderStars()}
                </FilledStarContainer>
            </Front>
        </StarWrapper>
    </RatingWrapper>
)

export const Count = styled.span`
    color: #258a9c;
    font-size: 10px;
    margin-left: 4px;
`

export const RatingWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
`

export const StarWrapper = styled.div`
    fill: #d6d6d6;
    position: relative;
    width: 60px;
`

export const StarContainer = styled.div`
    align-items: center;
    direction: rtl;
    display: flex;
    fill: #bfbfbf;
    justify-content: space-between;

    svg {
        transition: opacity linear .2s;
        width: 100%;
    }
`

export const Front = styled.div`
    overflow: hidden;
    max-width: 100%;
    position: absolute;
    top: 0;
    width: ${props => props.rating * (100 / 5) || 0}%;
`

export const FilledStarContainer = StarContainer.extend`
    fill: #f39019;
    width: 60px;
`
