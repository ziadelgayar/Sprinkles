import React, { createContext, useContext, useState } from 'react';

const ApplicationsContext = createContext();

export const ApplicationsProvider = ({ children }) => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      position: 'Software Engineering Intern',
      companyName: 'Microsoft',
      location: 'Redmond, WA',
      appliedDate: '2025-02-15',
      lastUpdated: '2025-02-20',
      status: 'rejected',
      documents: [
        { name: 'Resume.pdf', content: 'John Doe - Resume\nSkills: JavaScript, React, Node.js' },
        { name: 'Cover_Letter_Microsoft.pdf', content: 'Cover Letter for Microsoft\nDear Hiring Manager...' }
      ]
    },
    {
      id: 2,
      position: 'UX Design Intern',
      companyName: 'Google',
      location: 'Remote',
      appliedDate: '2024-03-10',
      lastUpdated: '2024-03-12',
      status: 'finalized',
      documents: [
        { name: 'Resume.pdf', content: 'Resume content' },
        { name: 'Portfolio.pdf', content: 'Portfolio content' }
      ]
    },
    {
      id: 3,
      position: 'Marketing Intern',
      companyName: 'Nike',
      location: 'Portland, OR',
      appliedDate: '2024-02-28',
      lastUpdated: '2024-03-01',
      status: 'accepted',
      documents: [
        { name: 'Resume.pdf', content: 'Resume content' },
        { name: 'Cover_Letter.pdf', content: 'Cover letter content' }
      ]
    }
  ]);

  const addApplication = (application) => {
    setApplications(prev => {
      // Check if application already exists
      const exists = prev.some(app => 
        app.position === application.position && 
        app.companyName === application.companyName
      );
      
      if (exists) {
        return prev;
      }
      
      return [...prev, application];
    });
  };

  const withdrawApplication = (applicationId) => {
    setApplications(prev => prev.filter(app => app.id !== applicationId));
  };

  const updateApplicationStatus = (applicationId, updatedApplication) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId ? { ...app, ...updatedApplication } : app
      )
    );
  };

  return (
    <ApplicationsContext.Provider value={{ 
      applications, 
      addApplication, 
      withdrawApplication, 
      updateApplicationStatus 
    }}>
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return context;
}; 