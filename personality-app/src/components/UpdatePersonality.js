import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const UpdatePersonality = () => {
  const [nama, setNama] = useState('');
  const [deskripsiKepribadian, setDeskripsiKepribadian] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [personalityNotes, setPersonalityNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get('/notes');
        setPersonalityNotes(response.data);
      } catch (error) {
        console.error('Error fetching personality notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleUpdatePersonality = async () => {
    try {
      await api.post('/update_personality_description', {
        Nama: nama,
        Deskripsi_Kepribadian: deskripsiKepribadian.split(',').map((desc) => desc.trim()),
      });
      setSuccessMessage('Personality updated successfully!');
      setUpdateError('');
    } catch (error) {
      setSuccessMessage('');
      setUpdateError('Update failed. Please try again.');
    }
  };

  const handleBackToFragranceList = () => {
    navigate('/fragrance-list');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />
      <input
        type="text"
        placeholder="Deskripsi Kepribadian (e.g., Cool,Ceria)"
        value={deskripsiKepribadian}
        onChange={(e) => setDeskripsiKepribadian(e.target.value)}
      />
      <button onClick={handleUpdatePersonality}>Update Personality</button>
      <button onClick={handleBackToFragranceList}>Back to Fragrance List</button>
      {updateError && <div style={{ color: 'red' }}>{updateError}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

      <h3>List Kepribadian:</h3>
      <ul>
        {personalityNotes.map((note, index) => (
          <li key={index}>
            {note.Deskripsi_Kepribadian}
          </li>
        ))}
      </ul>
      <p>Input deskripsi kepribadian bisa lebih dari satu, pisahkan dengan koma (e.g., Cool,Ceria).</p>
    </div>
  );
};

export default UpdatePersonality;
