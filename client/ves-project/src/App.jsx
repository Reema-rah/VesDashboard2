import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import UserStoryDetails from './UserStoryDetails';
import IterationDetails from './IterationDetails';
import ReleaseDetails from './ReleaseDetails';
import Header from './Header';
import Sidebar from './Sidebar';
import UserStoryForm from './UserStoryForm';
import IterationForm from './IterationForm';
import ReleaseForm from './ReleaseForm';
import Space from './Space';
import Lists from './pages/Lists';
import Progress from './pages/progress/Progress';
import Reports from './pages/Reports';
import Team from './pages/Team';
import Setting from './pages/Setting';
import Login from './Login';
import Signup from './Signup';
import Splash from './Splash';
import Projects from './Projects';

import {  useEffect } from 'react'
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [id, setId] = useState("")
  const [showHeader, setShowHeader] = useState(false)
  const [projectName, setProjectName] = useState("")
  
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  var location = window.location.pathname;

  useEffect(() => {
    const isLoginPage = (location === '/login');
    const isSignupPage = (location === '/SignUp');
    const isSplashPage = (location === '/Splash');
    const isProjectsPage = (location === '/projects');
    setShowHeader(!isLoginPage && !isSignupPage && !isSplashPage && !isProjectsPage);
}, [location])


  return (
    <Router>
      <div className={showHeader ? 'grid-container' : ''}>
        {showHeader && <Header OpenSidebar={OpenSidebar}  />}
        {showHeader && <Sidebar  openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/space/:id' element={<Space />} />
          <Route path='/userStories/:id' element={<UserStoryDetails />} />
          <Route path='/iterations/:id' element={<IterationDetails />} />
          <Route path='/releases/:id' element={<ReleaseDetails />} />
          <Route path='/userstoryform' element={<UserStoryForm />} />
          <Route path='/iterationform' element={<IterationForm />} />
          <Route path='/releaseForm' element={<ReleaseForm />} />
          <Route path='/lists/:id' element={<Lists />} />
          <Route path='/progress/:id' element={<Progress />} />
          <Route path='/reports/:id' element={<Reports />} />
          <Route path='/team/:id' element={<Team />} />
          <Route path='/setting/:id' element={<Setting />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Splash' element={<Splash />} />
          <Route path='/Projects' element={<Projects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;