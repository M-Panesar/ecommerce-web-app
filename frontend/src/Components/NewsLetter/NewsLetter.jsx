import React from 'react'
import { Link } from 'react-router-dom'
import './NewsLetter.css'

export const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input type="email" placeholder='Your Email id' />
            <button><Link style={{ textDecoration:'none', color:'white' }} to='/subscribe'>Subscribe</Link></button>
        </div>
    </div>
  )
}
