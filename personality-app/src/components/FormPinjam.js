import React, { useState } from 'react';
import api from '../services/api';
const FormPinjam = () => {
  const username = sessionStorage.getItem('username');
  const [formData, setFormData] = useState({
    Customer_ID: '',
    Gender: '',
    Married: '',
    Dependents: 0,
    Education: '',
    ApplicantIncome: 0,
    Property_Area: '',
    Username: username
  });
  const generateRandomId = () => {
    const length = 6; // Panjang string acak yang diinginkan
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters.charAt(randomIndex);
    }

    return randomId;
};

  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    
    // const randomId = generateRandomId();
    console.log(formData);
    try {
        console.log(username);
        const response = await api.api2.post(
        '/customers',
        {
            Customer_ID: generateRandomId(),
            Gender: formData.Gender,
            Married: formData.Married,
            Dependents: formData.Dependents,
            Education: formData.Education,
            ApplicantIncome: formData.ApplicantIncome,
            Property_Area: formData.Property_Area,
            Username: sessionStorage.getItem('username'),
        }
      );
      console.log(username);
      console.log(response);
      // Handle redirect or other actions after successful submission
    } catch (error) {
      console.error('Error submitting customer:', error);
    }
    window.location.href = '/hasilpinjam';
  };

//   const SignOut = () => {
//     sessionStorage.setItem('token1', '');
//     sessionStorage.setItem('token2', '');
//   };

  return (
    <div>
      <h2>Form Customer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Gender</label>
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
          >
            <option value="">Pilih Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label>Married</label>
          <select
            name="Married"
            value={formData.Married}
            onChange={handleChange}
          >
            <option value="">Pilih Status Pernikahan</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label>Dependents</label>
          <input
            type="number"
            name="Dependents"
            value={formData.Dependents}
            min="0"
            max="5"
            onChange={(e) => handleInputChange("Dependents", parseInt(e.target.value, 10))}
          />
        </div>

        <div>
          <label>Education</label>
          <select
            name="Education"
            value={formData.Education}
            onChange={handleChange}
          >
            <option value="">Pilih Edukasi</option>
            <option value="Graduate">Graduate</option>
            <option value="Not Graduate">Not Graduate</option>
          </select>
        </div>

        <div>
          <label>Applicant Income</label>
          <input
            type="number"
            name="ApplicantIncome"
            value={formData.ApplicantIncome}
            min="1000"
            onChange={(e) => handleInputChange("ApplicantIncome", parseInt(e.target.value, 10))}
          />
        </div>

        <div>
          <label>Property Area</label>
          <select
            name="Property_Area"
            value={formData.Property_Area}
            onChange={handleChange}
          >
            <option value="">Pilih Property Area</option>
            <option value="Urban">Urban</option>
            <option value="Semiurban">Semiurban</option>
            <option value="Rural">Rural</option>
          </select>
        </div>

        <button type="submit">Daftar</button>
      </form>
    </div>
  );
};

export default FormPinjam;