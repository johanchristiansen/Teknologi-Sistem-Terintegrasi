// src/components/UpdatePersonality.js
import React, { useState } from 'react';
import api from '../services/api';

const UpdatePersonality = ({ onUpdateSuccess }) => {
  const [nama, setNama] = useState('');
  const [deskripsiKepribadian, setDeskripsiKepribadian] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpdatePersonality = async () => {
    try {
      console.log(api.defaults.headers)
      const response = await api.post('/update_personality_description', {
        Nama: nama,
        Deskripsi_Kepribadian: deskripsiKepribadian.split(',').map((desc) => desc.trim()),
      });
      console.log(response);
      setSuccessMessage('Personality updated successfully!');
      setUpdateError('');
      // onUpdateSuccess(response.data); // Pass any relevant data to the parent component
    } catch (error) {
      setSuccessMessage('');
      setUpdateError('Update failed');
    }
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
        placeholder="Deskripsi Kepribadian (comma-separated)"
        value={deskripsiKepribadian}
        onChange={(e) => setDeskripsiKepribadian(e.target.value)}
      />
      <button onClick={handleUpdatePersonality}>Update Personality</button>
      {updateError && <div style={{ color: 'red' }}>{updateError}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </div>
  );
};

export default UpdatePersonality;
