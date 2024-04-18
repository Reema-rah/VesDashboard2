// Frontend - IterationDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatDate } from './utils';

function IterationDetails() {
  const { id } = useParams();
  const [iteration, setIteration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userStories, setUserStories] = useState([]);
  const [assignees, setAssignees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIteration = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:5000/iterations/${id}`);
          if (!response.ok) {
            throw new Error(`Error fetching iteration details: ${response.statusText}`);
          }
    
          const data = await response.json();
          setIteration(data);
    
          /*// Extracting ObjectId references from userStories
          const userStoryIds = data.userStories.map(story => story._id);
          setUserStories(userStoryIds);
    
          // Fetch details of user stories associated with the iteration
          const userStoriesDetails = await Promise.all(
            userStoryIds.map(async (storyId) => {
              const storyResponse = await fetch(`http://localhost:5000/userStories/${storyId}`);
              if (!storyResponse.ok) {
                throw new Error(`Error fetching user story details: ${storyResponse.statusText}`);
              }
              const storyData = await storyResponse.json();
              return storyData.name; // Extracting the name of the user story
            })
          );
    
          setUserStories(userStoriesDetails);*/

          // Extracting ObjectId references from userStories
          const userStoryIds = data.userStories.map(story => story._id);
          setUserStories(userStoryIds);
    
          // Fetch details of user stories associated with the iteration
          const userStoriesDetails = await Promise.all(
            userStoryIds.map(async (storyId) => {
              const storyResponse = await fetch(`http://localhost:5000/userStories/${storyId}`);
              if (!storyResponse.ok) {
                throw new Error(`Error fetching user story details: ${storyResponse.statusText}`);
              }
              const storyData = await storyResponse.json();
              return storyData.name; // Extracting the name of the user story
            })
          );
    
          setUserStories(userStoriesDetails);



          // Extracting assignee IDs from the user story data
          const assigneeIds = data.assignees.map(assignee => assignee._id);
          setAssignees(assigneeIds);

          // Fetch details of assigned users
          const assigneesDetails = await Promise.all(
            assigneeIds.map(async (assigneeId) => {
              const userResponse = await fetch(`http://localhost:5000/user/${assigneeId}`);
              if (!userResponse.ok) {
                throw new Error(`Error fetching user details: ${userResponse.statusText}`);
              }
              const userData = await userResponse.json();
              return userData.username; // Extracting the username of the user
            })
          );

          setAssignees(assigneesDetails)
        }
      } catch (error) {
        console.error('Error fetching iteration details:', error.message);
        setError('Error fetching iteration details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchIteration();
  }, [id]);

  const handleEdit = () => {
    navigate(`/iterations/${id}/edit`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!iteration) {
    return <div>Iteration not found</div>;
  }

  return (
    <div>
      <h2>Iteration Details</h2>
      <p>Name: {iteration.name || 'N/A'}</p>
      <p>Objective: {iteration.objective || 'N/A'}</p>
      <p>User Stories: {userStories.length > 0 ? userStories.join(', ') : 'N/A'}</p>
      <p>Start Date: {formatDate(iteration.startDate) || 'N/A'}</p>
      <p>End Date: {formatDate(iteration.endDate) || 'N/A'}</p>
      <p>Assignees: {assignees.length > 0 ? assignees.join(', ') : 'N/A'}</p>
      <p>Status: {iteration.status || 'N/A'}</p>
      <p>Priority: {iteration.priority || 'N/A'}</p>
      <button onClick={handleEdit}>Edit</button>
      <Link to="/space/${projectId}">Close</Link>
    </div>
  );

  /*
  return (
    <div>
      <h2>Iteration Details</h2>
      <p>Name: {iteration.name || 'N/A'}</p>
      <p>Objective: {iteration.objective || 'N/A'}</p>
      <p>User Stories: {userStories.length > 0 ? userStories.map(story => story.name).join(', ') : 'N/A'}</p>
      <p>Start Date: {formatDate(iteration.startDate) || 'N/A'}</p>
      <p>End Date: {formatDate(iteration.endDate) || 'N/A'}</p>
      <p>Assignees: {assignees.length > 0 ? assignees.join(', ') : 'N/A'}</p>
      <p>Status: {iteration.status || 'N/A'}</p>
      <p>Priority: {iteration.priority || 'N/A'}</p>
  
      <button onClick={handleEdit}>Edit</button>
      <Link to="/space/${projectId}">Close</Link>
    </div>
  );
  */
}

export default IterationDetails;

