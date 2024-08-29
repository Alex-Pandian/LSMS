import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from "./Components/login";
import StudentLanding from './Components/Student/StdLandingPage';
import FacultyLanding from './Components/Faculty/FacultyLanding';
import AdminLogin from './Components/Admin/admin';
import AdminHome from './Components/Admin/admin_home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<LoginForm/>} />
          <Route path='/std-home/:userId' element={<StudentLanding/>} />
          <Route path='/faculty-home/:faculty_id' element={<FacultyLanding/>} />
          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/adminlogin/admin-home' element={<AdminHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
