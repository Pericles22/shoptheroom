import types from './types'

const INITIAL_STATE = {
    mediaItem: {},
    isFetching: false,
    error: null,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.REQUEST_MEDIA_ITEM:
            return {
                ...state,
                isFetchingItem: action.isFetchingItem
            }
        case types.REQUEST_MEDIA_ITEM_FAILURE:
            return {
                ...state,
                isFetchingMods: action.isFetchingMods,
                errorMods: action.errorMods
            }
        case types.RECEIVE_MEDIA_ITEM:
            return {
                ...state,
                mediaItem: action.mediaItem,
                isFetchingMods: action.isFetchingMods,
                errorMods: action.errorMods
            }
        case types.REQUEST_SIMILAR_ROOMS:
            return {
                ...state,
                isFetchingItem: action.isFetchingItem
            }
        case types.REQUEST_SIMILAR_ROOMS_FAILURE:
            return {
                ...state,
                isFetchingMods: action.isFetchingMods,
                errorMods: action.errorMods
            }
        case types.RECEIVE_SIMILAR_ROOMS:
            return {
                ...state,
                similarRooms: action.similarRooms,
                isFetchingMods: action.isFetchingMods,
                errorMods: action.errorMods
            }
        case types.REQUEST_PRODUCTS:
            return {
                ...state,
                isFetchingProduct: action.isFetchingProduct
            }
        case types.REQUEST_PRODUCTS_FAILURE:
            return {
                ...state,
                isFetchingProduct: action.isFetchingProduct,
                errorProduct: action.errorProduct
            }
        case types.RECEIVE_PRODUCTS:
            return {
                ...state,
                products: action.products,
                isFetchingProduct: action.isFetchingProduct,
                errorProduct: action.errorProduct
            }
        default:
            return state
    }
}

