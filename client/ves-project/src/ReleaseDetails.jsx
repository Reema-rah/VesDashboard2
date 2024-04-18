import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatDate } from './utils';

function ReleaseDetails() {
  const { id } = useParams();
  const [release, setRelease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [iterations, setIterations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelease = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:5000/releases/${id}`);
          if (!response.ok) {
            throw new Error(`Error fetching releases details: ${response.statusText}`);
          }

          const data = await response.json();
          setRelease(data);
        
          // Extracting ObjectId references from iterations
          const iterationIds = data.iterations.map(iteration => iteration._id);
          setIterations(iterationIds);
    
          // Fetch details of iterations associated with the release
          const iterationsDetails = await Promise.all(
            iterationIds.map(async (iterationId) => {
              const iterationResponse = await fetch(`http://localhost:5000/iterations/${iterationId}`);
              if (!iterationResponse.ok) {
                throw new Error(`Error fetching iteration details: ${iterationResponse.statusText}`);
              }
              const iterationData = await iterationResponse.json();
              return iterationData.name; // Extracting the name of the iteration
            })
          );
    
          setIterations(iterationsDetails);
        }
      } catch (error) {
        console.error('Error fetching release details:', error.message);
        setError('Error fetching release details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRelease();
  }, [id]);


  const handleEdit = () => {
    navigate(`/releases/${id}/edit`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!release) {
    return <div>Release not found</div>;
  }
    // Log iterations array to console
    console.log('Iterations:', release?.iterations);

  return (
    <div>
      <h2>Release Details</h2>
      <p>Name: {release.name || 'N/A'}</p>
      <p>Objective: {release.objective || 'N/A'}</p>
      <p>Iterations: {iterations.length > 0 ? iterations.join(', ') : 'N/A'}</p>
      <p>Start Date: {formatDate(release.startDate) || 'N/A'}</p>
      <p>End Date: {formatDate(release.endDate) || 'N/A'}</p>
      <p>Released: {release.released ? 'Yes' : 'No'}</p>

      {/* Add other details as needed */}
      <button onClick={handleEdit}>Edit</button>
      <Link to="/space/${projectId}">Close</Link>
      {/* Or use a button with navigate function for closing */}
      {/* <button onClick={() => navigate('/iterations')}>Close</button> */}
    </div>
  );
}

export default ReleaseDetails;
