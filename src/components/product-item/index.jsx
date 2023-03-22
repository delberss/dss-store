import './style.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';


const ProductItem = ({product}) => {
  
  const {user} = useSelector(reducer => reducer.userReducer);
  const [showButton, setShowButton] = useState(false);


  const handleAddProduct = async () => {
    try{
      const id = user._id;
      const response = await axios.post(`http://localhost:8080/add/product/${id}`, product)
    } catch(err){
      throw new(err);
    }
  }

  return (
    <div className='product-item'
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}>
      <div className='imagem'>
        <img src={product.imagem} alt={product.descricao}/>
      </div>
      <div className='descricao-preco'>
        <h2>{product.descricao}</h2>
        <span>{product.preco}</span>

        {showButton && (
          <button
            onClick={handleAddProduct}
          >
            Adicionar item
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductItem;