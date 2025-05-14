import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // reuse login styling

const CompanySignup = () => {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [logo, setLogo] = useState(null);
  const [TaxReg, setTaxReg] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();


    alert('Company registered successfully,an email will be sent once your application has been approved!');
    navigate('/company/home'); 
  };

  return (
    <div className="login-container">
      <h2>Company Sign Up</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Industry:</label>
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
            <label>Company Size:</label>
            <select
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                required
            >
                <option value="">Select size</option>
                <option value="Small">Small ( smaller than 50 employees)</option>
                <option value="Medium">Medium(between 50 and 100 employees)</option>
                <option value="Large">Large (between 100 and 500 employees)</option>
                <option value="Corporate">Corporate (500+ employees)</option>
            </select>
     </div>
        <div className="form-group">
          <label>Company Logo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files[0])}
          />
        </div> 

        <div className="form-group">
          <label>Tax Registeration:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setTaxReg(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Official Company Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register Company</button>
      </form>
    </div>
  );
};

export default CompanySignup;
