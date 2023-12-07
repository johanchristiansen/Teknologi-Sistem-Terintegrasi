import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const FragranceList = () => {
  const [fragranceList, setFragranceList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.api1.get('/personality');
        setFragranceList(response.data);
      } catch (error) {
        console.error('Failed to fetch fragrance combinations:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleUpdateClick = () => {
    navigate('/update-personality');
  };

  const handleShowRecommendations = (personId, Deskripsi_Kepribadian) => {
    navigate(`/product/${Deskripsi_Kepribadian}`);
    console.log('Show recommendations for', personId);
  };

  const handlelihatpinjol = () => {
    navigate('/hasilpinjam');
  };


  return (
    <div>
      <h2>User Fragrance</h2>
      <button onClick={handleUpdateClick}>Update Personality</button>
      <button onClick={handlelihatpinjol}>Hasil Pinjol</button>
      <ul>
        {fragranceList.map((person) => (
          <li key={person.Id}>
            <strong>{person.Nama}</strong> - {person.Kombinasi_Fragrance.length > 0
              ? person.Kombinasi_Fragrance.join(', ')
              : 'Silahkan update kepribadian'}
            <button onClick={() => handleShowRecommendations(person.Id, person.Deskripsi_Kepribadian)}>Tampilkan produk rekomendasi</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FragranceList;
