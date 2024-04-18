/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import Axios from 'axios';

function Progress() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [currentZoom, setCurrentZoom] = useState('Days');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch tasks for the project from the backend when the component mounts
    fetchTasks();
  }, [projectId]); // Update tasks whenever projectId changes

  const fetchTasks = async () => {
    try {
      const response = await Axios.get(`http://localhost:5000/tasks/${projectId}`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addMessage = (message) => {
    const maxLogLength = 5;
    const newMessage = { message };
    const updatedMessages = [newMessage, ...messages.slice(0, maxLogLength - 1)];
    setMessages(updatedMessages);
  };

  const logDataUpdate = (entityType, action, itemData, id) => {
    let text = itemData && itemData.text ? ` (${itemData.text})` : '';
    let message = `${entityType} ${action}: ${id} ${text}`;
    if (entityType === 'link' && action !== 'delete') {
      message += ` (source: ${itemData.source}, target: ${itemData.target})`;
    }
    addMessage(message);
  };

  const handleZoomChange = (zoom) => {
    setCurrentZoom(zoom);
  };

  return (
    <div>
      <Toolbar zoom={currentZoom} onZoomChange={handleZoomChange} />
      <div className="gantt-container">
        <Gantt tasks={tasks} zoom={currentZoom} onDataUpdated={logDataUpdate} />
      </div>
      <MessageArea messages={messages} />
    </div>
  );
}

export default Progress;

*/


import React, { Component } from 'react';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';



const data = {
    data: [
        { id: 1, text: 'Task #1', start_date: '2024-04-9', duration: 3, progress: 0.6 },
        { id: 2, text: 'Task #2', start_date: '2024-04-18', duration: 3, progress: 0.4 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: '0' }
    ]
};
class Progress extends Component {
  
  state = {
    currentZoom: 'Days',
    messages: [],
};

addMessage(message) {
    const maxLogLength = 5;
    const newMessage = { message };
    const messages = [
        newMessage,
        ...this.state.messages
    ];

    if (messages.length > maxLogLength) {
        messages.length = maxLogLength;
    }
    this.setState({ messages });
}

logDataUpdate = (entityType, action, itemData, id) => {
  let text = itemData && itemData.text ? ` (${itemData.text})`: '';
  let message = `${entityType} ${action}: ${id} ${text}`;
  if (entityType === 'link' && action !== 'delete' ) {
      message += ` ( source: ${itemData.source}, target: ${itemData.target} )`;
  }
  this.addMessage(message);
}
 
handleZoomChange = (zoom) => {
    this.setState({
        currentZoom: zoom
    });
}
render() {  
  const { currentZoom, messages } = this.state;
  return (
      <div>
          <Toolbar
              zoom={ currentZoom }
              onZoomChange={ this.handleZoomChange }
          />
          <div className="gantt-container">
              <Gantt
                  tasks={ data }
                  zoom={ currentZoom }
                  onDataUpdated ={ this.logDataUpdate }
              />
          </div>
          <MessageArea
              messages={ messages }
          />
      </div>
  )
}
}
export default Progress;
