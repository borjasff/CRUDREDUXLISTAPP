
import {
    ADD_PRODUCT,
    ADD_PRODUCT_ERROR,
    ADD_PRODUCT_SUCCESS,
    START_DOWNLOAD_PRODUCTS,
    DOWNLOAD_PRODUCTS_SUCCESS,
    DOWNLOAD_PRODUCTS_ERROR,
    GET_PRODUCT_DELETE,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_ERROR,
    GET_PRODUCT_EDIT,
    START_PRODUCT_EDIT,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_ERROR

} from "../types"

import clientAxios from "../config/axios";

import Swal from "sweetalert2"


//create new products
export function createNewProductAction(product){
    return async (dispatch) => {
        dispatch( addProduct());
        try {
            //insert in API
            await clientAxios.post('/products', product);

            //if all is good
            dispatch(addProductSuccess(product))

            Swal.fire(
                'Success',
                'The product has been successfully added',
                'success'
            )
        } catch (error) {
            console.log(error);
            //change state if exist a error
            dispatch(addProductError(true))
            //error alert 
            Swal.fire({
                icon: 'error',
                title: 'The product has failed to add',
                text: 'We Found error'}
            )
        }
    }
}

const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true
})

//if the product is saved in the db
const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
})

//if exist a error
const addProductError = state => ({
    type: ADD_PRODUCT_ERROR,
    payload: state
});

//function to download the product of db
export function getProductsAction(){
    return async (dispatch) => {
        dispatch(downloadProducts())
        try {
            const answer = await clientAxios.get('/products');
            dispatch( downloadProductsSuccess(answer.data))
        } catch (error) {
            dispatch( downloadProductsError())
        }
    }
}
const downloadProducts = () => ({
    type: START_DOWNLOAD_PRODUCTS,
    payload: true
})

const downloadProductsSuccess = products => ({
    type: DOWNLOAD_PRODUCTS_SUCCESS,
    payload: products
})

const downloadProductsError = () => ({
    type: DOWNLOAD_PRODUCTS_ERROR,
    payload: true
})

//SELECT AND DELETE PRODUCT
export function deleteProductAction(id){
    return async (dispatch) => {
        dispatch( getProductDelete());
        try {
           await clientAxios.delete(`/products/${id}`)
           dispatch( deleteProductSuccess())

           //if it is removed
           Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success"
          });
        } catch (error) {
            dispatch( deleteProductError())
        }
    }
}

 const getProductDelete = id => ({
    type: GET_PRODUCT_DELETE,
    payload: id
})

 const deleteProductSuccess = () => ({
    type: PRODUCT_DELETE_SUCCESS
})

 const deleteProductError = () => ({
    type: PRODUCT_DELETE_ERROR,
    payload: true
})

//added product to edit
export function getProductEdit(product) {
    return (dispatch) => {
        dispatch(getProductAction(product))
    }
}
const getProductAction = product => ({
    type: GET_PRODUCT_EDIT,
    payload: product
})

//EDIT REGISTER IN API AND STATE
export function editProductAction(product) {
    return async (dispatch) => {
        dispatch( editProduct())

        try {
            clientAxios.put(`/products/${product.id}`, product)
            dispatch( editProductSuccess(product))
        } catch (error) {
            dispatch(  editProductError())
        }
    }
}

const editProduct = () => ({
    type: START_PRODUCT_EDIT
})
const editProductSuccess = product => ({
    type: PRODUCT_EDIT_SUCCESS,
    payload: product
})

const editProductError = () => ({
    type: PRODUCT_EDIT_ERROR,
    payload: true
})