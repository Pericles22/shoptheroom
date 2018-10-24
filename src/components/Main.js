import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { fetchMediaItem, fetchProducts, fetchSimilarRooms } from '../redux/actions'
import CarouselMod from 'overstock-marketing-component-library/module/lib/js/CarouselMod'
import Icons from './Icons'
import { FakeData } from '../utils'

import Hero from './Hero'
import SimilarRooms from './SimilarRooms'

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeLocation: null
        }
    }

    componentDidMount() {
        this.props.fetchMediaItem()
    }

    componentWillReceiveProps(next) {
        let newMediaItem = Object.keys(next.mediaItem).length && !Object.keys(this.props.mediaItem).length

        if(newMediaItem) {
            this.props.fetchSimilarRooms(next.mediaItem.labels)
            this.props.fetchProducts(next.mediaItem.products.map(prod => prod.metadata.productId))
        }
    }

    renderSlide = (slide, dimensions) => {
        const { asset: { imageUrl }, landingPage: link, attributes: { productData: { options } } } = slide
        const { savings, sellingPrice } = options[0]
        const oldPrice = savings && savings !== '$0.00' ? (Number(savings.slice(1).replace(/,/g, '')) + Number(sellingPrice.slice(1).replace(/,/g, ''))).toFixed(2) : null
        
        return (
            <StyledSlide target="_blank" href={link} innerMargin={dimensions.innerMargin}>
                <ImageWrapper>
                    <Image image={imageUrl}></Image>
                    <ImageOverlay></ImageOverlay>
                </ImageWrapper>
                <Price>{sellingPrice} <span>{oldPrice ? '$' + Number(oldPrice).toLocaleString() : ''}</span></Price>
                <Options>{options.length} option{options.length !== 1 && 's'}</Options>
            </StyledSlide>
        )
    }

    updateFeaturedRoom = (asset) => {
        const newHref = window.location.href.replace(this.props.mediaItem.id, asset)
        window.location = newHref
    }

    updateLocation = (id) => {
        this.setState({activeLocation: id})
    }


    render() {
        const { props: { mediaItem, products, similarRooms }, state: { activeLocation }, constructSlides, renderSlide, updateFeaturedRoom, updateLocation } = this
        const roomProducts = products && products.length ? products : FakeData

        return (
            <PageWrapper onClick={updateLocation}>
                <Hero visible={activeLocation} data={mediaItem} products={roomProducts} updateLocation={updateLocation} />
                <Icons />
                <InnerWrapper>
                    <CarouselMod renderSlide={renderSlide} slides={roomProducts} />
                    <SimilarRooms mediaItem={mediaItem} rooms={similarRooms} updateFeaturedRoom={updateFeaturedRoom} />
                </InnerWrapper>
            </PageWrapper>
        )
    }
}


const PageWrapper = styled.div`
    padding-bottom: 16px;
`

const ImageWrapper = styled.div`
    width: 100%;
`

export const Image = styled.div`
    background: url(${props => props.image}) top center no-repeat;
    background-size: cover;
    border-radius: 8px;
    padding-top: 100%;
    position: relative;
    width: 100%;
    height: 0;
`

export const ImageOverlay = styled.div`
    background: rgba(0,0,0,0.2);
    border-radius: 8px;
    padding-top: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
`

export const InnerWrapper = styled.div`
    margin: 0 80px;
    max-width: 1620px;

    @media(max-width: 569px) {
        margin: 0 24px;
    }
    @media(min-width: 1780px) {
        margin: auto;
    }
`

export const Options = styled.p`
    font-size: 15px;
    margin: 8px 0 0;
`

export const StyledSlide = styled.a`
    align-items: flex-start;
    border-radius: 3px;
    color: #525252;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    margin: ${props => props.innerMargin/2}px;
    position: relative;
    text-decoration: none;
`

const Price = styled.span`
    align-self: flex-start;
    font-weight: 700;
    font-size: 18px;
    margin-top: 10px;

    span {
        font-size: 15px;
        font-weight: 500;
        text-decoration: line-through;
    }
`

const mapStateToProps = state => ({
    mediaItem: state.mediaItem,
    similarRooms: state.similarRooms,
    products: state.products,
    isFetching: state.isFetching,
    error: state.error,
    state: state
})

const mapDispatchToProps = dispatch => ({
    fetchMediaItem: () => dispatch(fetchMediaItem()),
    fetchSimilarRooms: (items) => dispatch(fetchSimilarRooms(items)),
    fetchProducts: (product_ids) => dispatch(fetchProducts(product_ids))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
