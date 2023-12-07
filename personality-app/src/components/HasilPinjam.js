import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const HasilPinjam = () => {
  const username = sessionStorage.getItem('username');
  const [customerLoanNew, setCustomerLoanNew] = useState({
    loan_amount: 0,
    loan_amount_term: 0,
  });
  const navigate = useNavigate();
  const [loanRec, setLoanRec] = useState({});
  const [loanCustomer, setLoanCust] = useState({});
  // const storedToken2 = sessionStorage.getItem('external');
  const token = localStorage.getItem('externalAccessToken')
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Implement logic to check username existence using the API
    const checkUsernameExistence = async () => {
      try {
        const response = await api.api2.get(
          `/customers/${username}`
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        

        setLoanCust(response.data);
        
      } catch (error) {
        console.log(error);
        // window.location.href = '/hasilpinjam';
      }
    };
    checkUsernameExistence();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.api2.post(
        `/recommend_loan/${username}`,
        {
            loan_amount: customerLoanNew.loan_amount,
            loan_amount_term: customerLoanNew.loan_amount_term
        }
      );
        setLoanRec(response.data);
      // Handle redirect or other actions after successful submission
    } catch (error) {
      console.error('Error submitting customer:', error);
    }
    
  };

  const handleInputChange = (name, value) => {
    setCustomerLoanNew((prevData) => ({
        ...prevData,
        [name]: Number(value),
    }));

    };
  
  const handlePinjolRecommendationClick = () => {
      navigate('/formpinjam');
  };

  if (!loanCustomer) {
    return (
      <div>
        <h1 className="headingL">User Profile</h1>
      </div>
    );
  }

  return (
    <div>
      <h2>Loan Recommendation</h2>
      <button onClick={handlePinjolRecommendationClick}>Isi Form Pinjol</button>
      <div>
        <table>
          <tbody>
            <tr>
              <td><strong>Username:</strong></td>
              <td>{loanCustomer.Username}</td>
            </tr>
            <tr>
              <td><strong>Gender:</strong></td>
              <td>{loanCustomer.Gender}</td>
            </tr>
            <tr>
              <td><strong>Married:</strong></td>
              <td>{loanCustomer.Married}</td>
            </tr>
            <tr>
              <td><strong>Dependents:</strong></td>
              <td>{loanCustomer.Dependents}</td>
            </tr>
            <tr>
              <td><strong>Education:</strong></td>
              <td>{loanCustomer.Education}</td>
            </tr>
            <tr>
              <td><strong>Applicant Income:</strong></td>
              <td>{loanCustomer.ApplicantIncome}</td>
            </tr>
            <tr>
              <td><strong>Property Area:</strong></td>
              <td>{loanCustomer.Property_Area}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {Object.keys(loanRec).length !== 0 && (
        <div>
          <table>
            <tbody>
              <tr>
                <td><strong>Default Prediction</strong></td>
                <td>{loanRec["predicted_class"]}</td>
              </tr>
              <tr>
                <td><strong>Probability of Default</strong></td>
                <td>{`${(loanRec["probability_of_default"] * 100).toFixed(2)}%`}</td>
              </tr>
              <tr>
                <td><strong>Interest Rate</strong></td>
                <td>{loanRec["InterestRate"]}</td>
              </tr>
              <tr>
                <td><strong>Tenure (Months)</strong></td>
                <td>{loanRec["TenureMonths"]}</td>
              </tr>
              <tr>
                <td><strong>Loan Amount ($)</strong></td>
                <td>{loanRec["LoanAmount"]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Loan Amount ($) </label>
        <input
          type="number"
          name="loan_amount"
          min="100"
          value={customerLoanNew.loan_amount}
          required
          onChange={e => handleInputChange("loan_amount", e.target.value)}
        />

        <label>Loan Period (Month)</label>
        <input
          type="number"
          name="loan_amount_term"
          min="10"
          max="360"
          value={customerLoanNew.loan_amount_term}
          required
          onChange={e => handleInputChange("loan_amount_term", e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HasilPinjam;