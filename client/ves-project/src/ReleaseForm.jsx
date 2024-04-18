import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { formatDate } from './utils';
import { useParams } from 'react-router-dom';

const ReleaseForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    objective: '',
    iterations: [],
    startDate: '',
    endDate: '',
    released: false,
  });

  const { id } = useParams();

  const [iterations, setIterations] = useState([]);
  useEffect(() => {
    // Fetch the list of user stories from your backend API
    const fetchiterations = async () => {
      try {
        const iterationsResponse = await fetch(`http://localhost:5000/iterationsProject/${id}`);
        if (!iterationsResponse.ok) {
          throw new Error(`Error fetching iterations: ${iterationsResponse.statusText}`);
        }

        const iterationsData = await iterationsResponse.json();
        setIterations(iterationsData);
      } catch (error) {
        console.error('Error fetching iterations:', error);
        // Handle errors
      }
    };
    fetchiterations();
  }, []);


  const handleChange = (e) => {
    const { name, value, type, checked, selectedOptions } = e.target;

    // If the input is a checkbox or multi-select, handle its checked state
    const newValue = type === 'checkbox' ? checked : type === 'select-multiple'
      ? Array.from(selectedOptions).map(option => option.value)
      : value;

    setFormData({ ...formData, [name]: newValue });
  };

  const handleIterationsChange = (e) => {
    const { options } = e.target;
    const selectediterations = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData({ ...formData, iterations: selectediterations });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the server
      const response = await fetch('http://localhost:5000/releases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          projectID: id,
        }),
      });

      if (response.ok) {
        // Form data successfully sent to the server
        console.log('Release created successfully');
      } else {
        // Handle error from the server
        console.error('Error creating release');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Clear the form after submission
    setFormData({
      name: '',
      objective: '',
      iterations: [],
      startDate: '',
      endDate: '',
      released: false,
    });
    // Close the form modal
    onClose();
  };

  return (
    <div className="modal-content">
      <button className="cloesbtn" onClick={onClose}>
        x
      </button>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Objective
          </label>
          <input
            type="text"
            className="form-control"
            id="objective"
            name="objective"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userStories" className="form-label">
            Iterations
          </label>
          <select
            name="iterations"
            multiple
            className="form-control"
            value={formData.iterations}
            onChange={handleIterationsChange}
          >
            {iterations.map((iteration) => (
              <option key={iteration._id} value={iteration._id}>
                {iteration.name}
              </option>
            ))}

          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            value={formatDate(formData.startDate)}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            name="endDate"
            value={formatDate(formData.endDate)}
            onChange={handleChange}
          />
        </div>
        <label>Released:</label>
        <select name="released" value={formData.released} onChange={handleChange}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>

        <button type="submit" className="btn btn-primary">
          Create Release
        </button>
        <button className="close-button btn btn-danger" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ReleaseForm;
