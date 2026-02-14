export const MYPRODUCTS_REQUEST = "MYPRODUCTS_REQUEST"
export const MYPRODUCTS_SUCCESS = "MYPRODUCTS_SUCCESS"
export const MYPRODUCTS_ERROR = "MYPRODUCTS_ERROR"

export const myProductsRequest = () => ({
    type: MYPRODUCTS_REQUEST,
})

export const myProductsSuccess = (data) => ({
    type: MYPRODUCTS_SUCCESS,
    payload: data
})

export const myProductsError = (error) => ({
    type: MYPRODUCTS_ERROR,
    payload: error
})