import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='NavBar'>
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>Produtos</Link>
        <Link to={"/"}>Sobre</Link>
        <Link></Link>
    </div>
  )
}

export default NavBar