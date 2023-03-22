import React, { useEffect, useState } from 'react'
import './style.css'
import { useSelector } from 'react-redux';
import axios from 'axios';


export const customModalCart = window.screen.width > 750 ? {
    content: {
        position: 'fixed',
        inset: '100px 0 0 70%',
        width: '30%',
    }

} : {
    content: {
        position: 'fixed',
        inset: '100px 0 0 0%',
        width: '100%',
    }
};


  
const Cart = ({isOpen, onClose}) => {
    const {user} = useSelector(reducer => reducer.userReducer);
    const [total, setTotal] = useState(0);

    const [products, setProducts] = useState([]);

    const handleDecrease = async (produto) => {
        const DECREASE_URL = `http://localhost:8080/decrease/product/${user._id}`;
        try{
            const response = await axios.post(DECREASE_URL, produto);
          }catch(err){
            throw new(err)
          }
    }

    const handleIncrease = async (produto) => {
        const INCREASE_URL = `http://localhost:8080/increase/product/${user._id}`;
        try{
            const response = await axios.post(INCREASE_URL, produto);
          }catch(err){
            throw new(err)
          }
    }

    const GET_PRODUCTS = `http://localhost:8080/products/${user._id}`;
    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await axios.get(GET_PRODUCTS);
                setProducts(response.data.products);
              }catch(err){
                throw new(err)
              }
        }
        fetchProducts();
    }, [products]);

    
  if(isOpen) {
    return (
        <div className="modal-card">
            <h2>Total R${total}</h2>
            {
                products.length > 0 ?
                products.map(product => (
                    <div key={product.id} className="product-item-cart cart">
                        <img src={product.imagem} alt={product.descricao}/>
                        <h2>{product.descricao}</h2>
                        <span>{product.preco}</span>
                        <div className='increase-decrease'>   
                            <button onClick={() => handleDecrease(product)}>-</button>
                            <span>({product.quantidade})</span>
                            <button onClick={() => handleIncrease(product)}>+</button>
                        </div>
                    </div>
                ))
           
            :
            <div className="products">
                <h2>Lista de produtos está vazia!</h2>
            </div>
            }
        </div>
    );
}
return null;
}

export default Cart