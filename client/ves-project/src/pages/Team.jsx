import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

function Team() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await Axios.get(`http://localhost:5000/project/${id}`);
        setProject(response.data);
        // Fetch user details for each user ID
        const usersData = await Promise.all(response.data.userIDs.map(userId =>
          Axios.get(`http://localhost:5000/user/${userId}`)
        ));
        setUsers(usersData.map(user => user.data));
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  return (
    <div>
      <h1>Team Page</h1>
      {project && (
        <div>
          <h1>Project Name: {project.projectName}</h1>
          <h2>Team Members:</h2>
          <ul>
            {users.map(user => (
              <li key={user._id}>
                <strong>Name:</strong> {user.username}, <strong>Email:</strong> {user.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Team;



/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

function Team() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await Axios.get(`http://localhost:5000/project/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  return (
    <div>
      <h1>Team Page</h1>
      {project && (
        <div>
          <h1>Project Name: {project.projectName}</h1>
          <h2>User IDs:</h2>
          <ul>
            {project.userIDs.map((userId) => (
              <li key={userId}>{userId}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Team;*/
