import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

//redux
import { useDispatch } from 'react-redux'
import { deleteProductAction, getProductEdit } from '../actions/productAction'

const Product = ({product}) => {
  
    const {name, price, id} = product
    
    const dispatch = useDispatch()
    const navigate = useNavigate()//habilit history for redirect
    // confirm if he wish to delete

    const confirmDeleteProduct = id => {
        //ask to user
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
              
            //send to action
            dispatch(deleteProductAction(id))

          }
        });
    }
    //function that redirect program format
    const redirectEdit = product => {
      dispatch(getProductEdit(product))
      navigate(`/products/edit/${product.id}`)
    }
  return (
    <tr>
        <td>{name}</td>
        <td><span className='font-weight-bold'>$ {price}</span></td>
        <td className='actions'>
            <button type='button' onClick={() => redirectEdit(product)} className='btn btn-primary mr-2'>Edit</button>
            <button onClick={() => confirmDeleteProduct(id)} type='button' className='btn btn-danger'>Delete</button>
        </td>
    </tr>
  )
}

export default Product