import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react'
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {

  const api = "http://localhost:5000"

  const [id, setId] = useState("");
  const [project, setProject] = useState([])

  const fetchData = async (projectId) => {
    try {
      console.log(projectId)
      const response = await fetch(api + `/project/${projectId}`);

      if (!response.ok) {
        throw new Error(`Error fetching project : ${response.statusText}`);
      }

      console.log("here")
      const data = await response.json();
      setProject(data);


    } catch (error) {
      console.error('Error fetching project details:', error.message);
    }
  };
  useEffect(() => {
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    const lastSegment = url.pathname.split('/').filter(segment => segment !== '').pop();

    
    setId(lastSegment)
    if (lastSegment !== ""){
      fetchData(lastSegment);
    }
      
  }, []);

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          {project.projectName}
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>x</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to={`/space/${id}`}>
            <BsGrid1X2Fill clasName='icon' /> Space
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={`/lists/${id}`} >
            <BsFillArchiveFill className='icon' /> Lists
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={`/Progress/${id}`}>
            <BsFillGrid3X3GapFill className='icon' /> Progress
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={`/reports/${id}`}>
            <BsMenuButtonWideFill className='icon' /> Reports
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to={`/team/${id}`}>
            <BsPeopleFill className='icon' /> Team
          </Link>
        </li>
        <li className='sidebar-list-item setting'>
          <Link to={`/setting/${id}`}>
            <BsFillGearFill className='icon' /> Setting
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
