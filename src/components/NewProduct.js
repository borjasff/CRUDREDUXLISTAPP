import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
//actions of redux
import { createNewProductAction } from "../actions/productAction";
import { showAlert, hideAlertAction } from "../actions/alertAction";
import { useNavigate } from "react-router-dom";
const NewProduct = () => {
    let navigate = useNavigate();
    //state component
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)

    //use useDispatch and return a function
    const dispatch = useDispatch()
    //access state of store
    const loading = useSelector( state => state.products.loading)
    const error = useSelector(state => state.products.error)
    const alert = useSelector(state => state.alerts.alert)
    //call action in product action
    const addProduct = (product) => dispatch(createNewProductAction(product))

    const submitNewProduct = e => {
        e.preventDefault();

        //validate form
        if(name.trim() === "" || price <= 0){
            const alert = {
                msg: 'All fields are required',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(showAlert(alert))
            return;
        }
        
        //if we dont have errors
        dispatch(hideAlertAction());

        //create new product
        addProduct({
            name,
            price
        });

        //reddirect
        navigate("/");
    }
  return (
    <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h2  className="text-center mb-4 font-weight-bold">
                        Add New Product
                    </h2>
                    {alert ? <p className={alert.classes}>{alert.msg}</p> : null}
                    <form
                        onSubmit={submitNewProduct}
                    >
                        <div className="form-group">
                            <label>Product Name</label>
                            <input name="name" type="text" placeholder="Name Product" className="form-control" value={name} onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Product Price</label>
                            <input name="price" type="number" placeholder="Price Product" className="form-control" value={price} onChange={e => setPrice(Number(e.target.value))}/>
                        </div>
                        <button type="submit" 
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                            Add
                        </button>
                    </form>
                    { loading ? <p>Loading...</p>: null}
                    { error ? <p className="alert alert-danger p2 mt-4 text-center">Error Found</p> : null}
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewProduct;