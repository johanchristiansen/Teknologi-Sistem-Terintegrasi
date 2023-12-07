// Product.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const { Deskripsi_Kepribadian } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.api1.get('/notes');
        const filteredProducts = response.data.filter(note => note.Deskripsi_Kepribadian === Deskripsi_Kepribadian);
        // console.log(Deskripsi_Kepribadian);
        // console.log(filteredProducts);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error.message);
      }
    };

    fetchProducts();
  }, [Deskripsi_Kepribadian]);

  const handlePinjolRecommendationClick = () => {
    navigate('/formpinjam');
  };

  return (
    <div>
      <h2>Products for {Deskripsi_Kepribadian}</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.Produk}</strong> - Rp {product.Harga}
            <button onClick={handlePinjolRecommendationClick}>Rekomendasi Pinjol</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
