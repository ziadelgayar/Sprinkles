import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    // Redirect to login page with role as a query parameter
    navigate(`/login?role=${role}`);
  };

  return (
    <div>
      <h1>Welcome to GUC Portal!</h1>
      <p>Please Select Your Role</p>
      
      <div>
        <button onClick={() => handleRoleSelect('company')}>
          Company
        </button>
        
          <button onClick={() => handleRoleSelect('student')}>
            Student
        </button> 
        <button onClick={() => handleRoleSelect('PROstudent')}>
          PRO Student
        </button>
        <button onClick={() => handleRoleSelect('faculty')}>
          Faculty Member
        </button>
        
        <button onClick={() => handleRoleSelect('scad')}>
          SCAD Office
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
