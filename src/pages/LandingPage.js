import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/login?role=${role}`);
  };

  return ( 
    
    <div className="landing-center">  
 <h1 style={{ color: "#fff", marginBottom: "40px", textAlign: "center" }}>
        Welcome to GUC Portal!
      </h1> 
    <div style={{ background: "rgba(255,255,255,0.10)", borderRadius: "18px", padding: "40px 60px", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.20)", backdropFilter: "blur(8px)", textAlign: "center" }}>
      <p style={{ fontSize: "25px"}}>Please Select Your Role</p>
      
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
    </div>
  );
};

export default LandingPage;
