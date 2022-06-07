import React from 'react';
import '../resources/item.css'
import {Button} from 'antd'
import { useDispatch } from 'react-redux';
function Item({item}){

    const dispatch = useDispatch()
    function addToCart(){

        dispatch({type:'addToCart' , payload : {...item , quantity:1}})

    }

    return (
        
        <div className="item">
            {/* <h6>{item._id}</h6>
            <h5>{item.category}</h5> */}
            <h4 className="name">{item.name}</h4>
            <img src={item.image} alt="" height='100' width='100'/>
            <h4 className="price"><b>Price : </b>{item.price}$/-</h4>
            <div className="d-flex justify-content-end">
                <Button onClick={()=>addToCart()}>Add to cart</Button>
            </div>
        </div>
    );

}

export default Item