"use strict";
import types from "./types";
import fetch from 'cross-fetch';

const getUrlQueries = () => {
    if(window.location.href === 'undefined') return
    let queriesObj = {}
    let queriesArray = window.location.href.split('?')
    queriesArray.shift()
    queriesArray = queriesArray.join``.split('&')

    queriesArray.map(i => queriesObj[i.split('=')[0]] = i.split('=')[1])

    return queriesObj
}

const receiveMediaItem = (mediaItem) => ({
    type: types.RECEIVE_MEDIA_ITEM,
    mediaItem,
    error: null,
    isFetching: false
})
const receiveSimilarRooms = (similarRooms) => ({
    type: types.RECEIVE_SIMILAR_ROOMS,
    similarRooms,
    error: null,
    isFetching: false
})
const receiveProducts = (products) => ({
    type: types.RECEIVE_PRODUCTS,
    products,
    error: null,
    isFetching: false
})

const requestMediaItem = () => ({
    type: types.REQUEST_MEDIA_ITEM,
    mediaItem: null,
    error: null,
    isFetching: true
})
const requestSimilarRooms = () => ({
    type: types.REQUEST_SIMILAR_ROOMS,
    similarRooms: null,
    error: null,
    isFetching: true
})
const requestProducts = () => ({
    type: types.REQUEST_PRODUCTS,
    products: null,
    error: null,
    isFetching: true
})

const requestMediaItemFailure = (error) => ({
    type: types.REQUEST_MEDIA_ITEM_FAILURE,
    mediaItem: null,
    error,
    isFetching: false
})
const requestSimilarRoomsFailure = (error) => ({
    type: types.REQUEST_SIMILAR_ROOMS_FAILURE,
    similarRooms: null,
    error,
    isFetching: false
})
const requestProductsFailure = (error) => ({
    type: types.REQUEST_PRODUCTS_FAILURE,
    roomProducts: null,
    error,
    isFetching: false
})

export const fetchMediaItem = () => {
    return dispatch => {
        dispatch(requestMediaItem())
        const urlData = getUrlQueries()
        fetch(`https://api-2.curalate.com/v1/media/gFNSZQbGWhQpNfaK/items/${urlData.asset_id}`)
            .then(function(res) {
                if(res.status !== 200) throw Error(res.statusText)
                return res.json()
            })
            .then(json => dispatch(receiveMediaItem(json.data.item)))
            .catch(error => {
                console.log(error)
                dispatch(requestMediaItemFailure(error))
            })
    }
}

export const fetchSimilarRooms = (items) => {
    return dispatch => {
        dispatch(requestSimilarRooms())
        const filterData = items.map(i => i).join('%20or%20label%3A')
        fetch(`https://api-2.curalate.com/v1/media/gFNSZQbGWhQpNfaK?filter=label%3A${filterData}&sort=Optimized&limit=50`)
            .then(res => {
                if(res.status !== 200) throw Error(res.statusText)
                return res.json()
            })
            .then(json => dispatch(receiveSimilarRooms(json.data.items)))
            .catch(error => {
                console.log(error)
                dispatch(requestSimilarRoomsFailure(error))
            })
    }
}

export const fetchProducts = (product_ids) => async dispatch => {
    try {
        dispatch(requestProducts())
        const results = await Promise.all(product_ids.map(pid => {
            return fetch(`https://lvxlayout.overstock.com/liverex/layout?ch=site&chtype=pla&productId=${pid}`)
                .then(res => {
                    if(res.status !== 200) throw Error(res.statusText)
                    return res.json()
                })
                .then(json => json.elements[0].recs[0])
            }
        ))
        dispatch(receiveProducts(results))
    } catch (error) {
        console.error(error)
        dispatch(requestProductsFailure(error))
    }
}

