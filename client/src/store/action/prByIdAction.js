export const PRODUCTBYID_REQUEST = "PRODUCTBYID_REQUEST";
export const PRODUCTBYID_SUCCESS = "PRODUCTBYID_SUCCESS";
export const PRODUCTBYID_ERROR = "PRODUCTBYID_ERROR";

export const productByIdRequest = () => ({
    type: PRODUCTBYID_REQUEST,
});

export const productByIdSuccess = (data) => ({
    type: PRODUCTBYID_SUCCESS,
    payload: data,
});

export const productByIdError = (error) => ({
    type: PRODUCTBYID_ERROR,
    payload: error,
});