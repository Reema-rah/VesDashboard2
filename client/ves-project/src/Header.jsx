import React from 'react';
import { BsFillBellFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";

function Header({ OpenSidebar }) {

  const userID = window.localStorage.getItem("userID")
  const api = "http://localhost:5000"
  const [projects, setProjects] = useState([])
  const [_, setCookies] = useCookies("access_token")
  const navigate = useNavigate()

  const removeCookies = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    navigate("/login")
    location.reload();
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(api + `/userProject/${userID}`);
      if (!response.ok) {
        throw new Error(`Error fetching project details: ${response.statusText}`);
      }

      const data = await response.json();
      setProjects(data);


    } catch (error) {
      console.error('Error fetching project details:', error.message);
    }
  };

  return (
    <header className='header'>
      <div className='header-left'>
        <div className='menu-icon'>
          <BsJustify className='icon' onClick={OpenSidebar} />
        </div>
        <div className='dropdown'>
          <button className='dropdown-toggle' type='button' id='projectsDropdown' data-bs-toggle='dropdown' aria-expanded='false'>
            Projects
          </button>
          <ul className='dropdown-menu' aria-labelledby='projectsDropdown'>
            <li>
              <Link to="/projects" className='dropdown-item'>All Projects</Link>
            </li>
            {projects.map(({ _id, projectName }) => {
              return (
                <li key={_id}>
                  <a href={`/space/${_id}`} className='dropdown-item'>
                    {projectName}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='dropdown'>
          <button className='dropdown-toggle' type='button' id='tasksDropdown' data-bs-toggle='dropdown' aria-expanded='false'>
            Tasks
          </button>
          <ul className='dropdown-menu' aria-labelledby='tasksDropdown'>
            {/* Add task options here */}
            <li><a className='dropdown-item' href='#'>Task 1</a></li>
            <li><a className='dropdown-item' href='#'>Task 2</a></li>
            {/* Add more tasks as needed */}
          </ul>
        </div>
        <div className='search-box'>
          <BsSearch className='icon' />
          <input type='text' placeholder='Search...' />
        </div>
      </div>

      <div className='header-right'>
        <BsFillBellFill className='icon' />
        <BsPersonCircle className='icon' />
      </div>
      <a style={{ color: 'white', cursor: 'pointer' }} onClick={removeCookies}>Logout</a>
    </header>
  );
}

export default Header;