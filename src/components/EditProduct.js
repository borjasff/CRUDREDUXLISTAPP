import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductAction } from "../actions/productAction";
import { useNavigate } from "react-router-dom";


const EditProduct = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //new state of product
    const [product, setProduct] = useState({
        name: "",
        price: ''
    })
    //edit product
    const productEdit = useSelector(state => state.products.productEdit )
    
    //FILL STATE AUTOMATICALLY
    useEffect(() => {
        setProduct(productEdit)
    },[productEdit])


    //read form data
    const onChangeForm = e => {
        setProduct({
            ...product,
            [e.target.name] : e.target.value
        })
    }

    const {name, price} = product

    const submitEditProduct = e => {
        e.preventDefault();

        dispatch(editProductAction(product))
        navigate('/')
    }

  return (
    <div className="row justify-content-center">
    <div className="col-md-8">
        <div className="card">
            <div className="card-body">
                <h2  className="text-center mb-4 font-weight-bold">
                    Update Product
                </h2>
                <form
                onSubmit={submitEditProduct}
                >
                    <div className="form-group">
                        <label>Product Name</label>
                        <input name="name" type="text" placeholder="Name Product" className="form-control" value={name} onChange={onChangeForm}/>
                    </div>
                    <div className="form-group">
                        <label>Product Price</label>
                        <input name="price" type="number" placeholder="Price Product" className="form-control" value={price} onChange={onChangeForm}/>
                    </div>
                    <button type="submit" 
                            className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                        Save Product
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default EditProduct