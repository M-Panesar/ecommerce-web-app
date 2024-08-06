import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import axios from "axios";

export const CartItems = () => {


    const {getTotalCartAmount, all_product, cartItems, removeFromCart} = useContext(ShopContext);     
    const [test,setTest] =useState(false);

    const initiatePaymentAndVerifyOrder = async (order) => {
      const options = {
        key: "rzp_test_VkmkqinuUsxIdc",
         order_id: order.id,
      amount: order.amount,
        name: "Shophive Website",
  
        handler: async (response) => {
          await axios.post(`http://localhost:4000/verify`, response);       
          setTest(true); 
        },
  
      };
  
      const Razorpay = new window.Razorpay(options);
      await Razorpay.open();
    };
  
    const onClickToPay = async () => {
    
      const { data: orderResponse } = await axios.post(
        `http://localhost:4000/orders`,
        { price: getTotalCartAmount() }
      );
  
      await initiatePaymentAndVerifyOrder(orderResponse.array);
      console.log(orderResponse.array.amount);
    };
  
    return (
    <div className='cartitems'>
        {
            test && <Navigate to ="/"/>
        }
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItems[e.id]>0){
                return(
                    <div>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={e.image} alt="" className='carticon-product-icon' />
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                            <p>${e.new_price*cartItems[e.id]}</p>
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                        </div>
                        <hr />
                    </div>
                )
            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Total</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button  onClick={onClickToPay}>PROCEED TO PAYMENT</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, enter it here...</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='promo code'/>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
