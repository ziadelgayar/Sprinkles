import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import CompanySignup from '../pages/CompanySignup';

import CompanyHome from '../pages/company/Home';
import CompanyInternships from '../pages/company/Internships';
import CompanyApplications from '../pages/company/Applications';
import Interns from '../pages/company/Interns';
import CompanyEvaluations from '../pages/company/Evaluations';
import CompanyDocumentsReports from '../pages/company/DocumentsReports';
import CompanyProfile from '../pages/company/Profile';
import CompanyNotifications from '../pages/company/Notifications';
// Import student page components
import StudentHome from '../pages/student/Home';
import StudentInternships from '../pages/student/Internships';
import StudentApplications from '../pages/student/Applications';
import StudentEvaluations from '../pages/student/Evaluations';
import StudentDocumentsReports from '../pages/student/DocumentsReport';
import StudentProfile from '../pages/student/Profile';
import StudentNotifications from '../pages/student/Notifications';

// Import PROstudent page components
import PROStudentHome from '../pages/PROstudent/Home';
import PROStudentInternships from '../pages/PROstudent/Internships';
import PROStudentApplications from '../pages/PROstudent/Applications';
import PROStudentEvaluations from '../pages/PROstudent/Evaluations';
import PROStudentDocumentsReports from '../pages/PROstudent/DocumentsReport';
import PROStudentProfile from '../pages/PROstudent/Profile';
import PROStudentNotifications from '../pages/PROstudent/Notifications'; 
import PROStudentWorkshops from '../pages/PROstudent/Workshops';
import PROStudentVideoCall from '../pages/PROstudent/VideoCall'; 

import InternshipReports from '../pages/Scad/InternshipReports'; 
import ReportDetails from '../pages/Scad/ReportDetails'; 
import Statistics  from '../pages/Scad/Statistics';
import ScadHome from '../pages/Scad/ScadDashboard'; 
import Companies from '../pages/Scad/companies'; 
import Internships from '../pages/Scad/Internships';
import VideoCall from '../pages/Scad/VideoCall'; 
import Workshops from '../pages/Scad/Workshops';
import Students from '../pages/Scad/Students';

// Import faculty page components
import FacultyHome from '../pages/Faculty/Dashboard';
import FacultyEvaluationReports from '../pages/Faculty/EvaluationReports';
import FacultyInternshipReports from '../pages/Faculty/InternshipReports';
import FacultyNotifications from '../pages/Faculty/Notifications';
import FacultyProfile from '../pages/Faculty/Profile';
import FacultyStatisticsReports from '../pages/Faculty/StatisticsReports';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup/company" element={<CompanySignup />} />

      {/* Company routes */}
      <Route path="/company" element={<MainLayout />}>
        <Route index element={<Navigate to="/company/home" replace />} />
        <Route path="home" element={<CompanyHome />} />
        <Route path="internships" element={<CompanyInternships />} />
        <Route path="applications" element={<CompanyApplications />} />
        <Route path="interns" element={<Interns />} />
        <Route path="evaluations" element={<CompanyEvaluations />} />
        <Route path="documents" element={<CompanyDocumentsReports />} />
        <Route path="profile" element={<CompanyProfile />} />
        <Route path="notifications" element={<CompanyNotifications />} />
      </Route>
      
      {/* student routes */}
      <Route path="/student" element={<MainLayout />}>
        <Route index element={<Navigate to="/student/home" replace />} />
        <Route path="home" element={<StudentHome />} />
        <Route path="internships" element={<StudentInternships />} />
        <Route path="applications" element={<StudentApplications />} />
        <Route path="evaluations" element={<StudentEvaluations />} />
        <Route path="documents" element={<StudentDocumentsReports />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="notifications" element={<StudentNotifications />} /> 
      </Route> 
      {/* PROstudent routes */}
      <Route path="/PROstudent" element={<MainLayout />}>
        <Route index element={<Navigate to="/PROstudent/home" replace />} />
        <Route path="home" element={<PROStudentHome />} />
        <Route path="internships" element={<PROStudentInternships />} />
        <Route path="applications" element={<PROStudentApplications />} />
        <Route path="evaluations" element={<PROStudentEvaluations />} />
        <Route path="documents" element={<PROStudentDocumentsReports />} />
        <Route path="profile" element={<PROStudentProfile />} />
        <Route path="notifications" element={<PROStudentNotifications />} />  
        <Route path="workshops" element={<PROStudentWorkshops />} />
        <Route path="videocall" element={<PROStudentVideoCall />} />
      </Route> 
      {/* Scad routes */}
      <Route path="/scad" element={<MainLayout />}>
        <Route index element={<Navigate to="/scad/home" replace />} />
        <Route path="home" element={<ScadHome />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="reports" element={<InternshipReports />} /> 
        <Route path="companies" element={<Companies />} />
        <Route path="internships" element={<Internships />} />
        <Route path="students" element={<Students />} />
        <Route path="videocall" element={<VideoCall />} />
        <Route path="workshops" element={<Workshops />} />
      </Route>

      {/* Faculty routes */}
      <Route path="/faculty" element={<MainLayout />}>
        <Route index element={<Navigate to="/faculty/home" replace />} />
        <Route path="home" element={<FacultyHome />} />
        <Route path="evaluation-reports" element={<FacultyEvaluationReports />} />
        <Route path="internship-reports" element={<FacultyInternshipReports />} />
        <Route path="notifications" element={<FacultyNotifications />} />
        <Route path="profile" element={<FacultyProfile />} />
        <Route path="statistics-reports" element={<FacultyStatisticsReports />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
