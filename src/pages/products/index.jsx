import './style.css'
import axios from "axios";
import { useEffect, useState } from "react";
import ProductItem from '../../components/product-item';

const Products = () => {
    const PRODUCTS_URL = 'http://localhost:8080/products';

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(PRODUCTS_URL);
                setProducts(response.data);
            } catch(error) {
                throw new(`Erro de conexão!`)
            }
        }
        fetchProducts();
    }, []);

    return(
        products.length > 0 ?
        <>
            <div className="products">
                {products.map(product => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </>
       
        :
        <div className="products">
            <h2>Lista de produtos está vazia!</h2>
        </div>
    )
}

export default Products;