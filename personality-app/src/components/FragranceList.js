// src/components/FragranceList.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const FragranceList = () => {
  const [fragranceList, setFragranceList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/personality');
        setFragranceList(response.data);
      } catch (error) {
        console.error('Failed to fetch fragrance combinations:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Fragrance Combinations</h2>
      <ul>
        {fragranceList.map((person) => (
          <li key={person.Id}>
            <strong>{person.Nama}</strong> - {person.Kombinasi_Fragrance.length > 0
              ? person.Kombinasi_Fragrance.join(', ')
              : 'Silahkan update kepribadian'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FragranceList;
