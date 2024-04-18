import { useState, useEffect } from 'react'
import Axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Modal, ListGroup, Form, Button } from 'react-bootstrap'

function Projects( ) {
    const api = "http://localhost:5000"

    const [projects, setProjects] = useState([])
    const userID = window.localStorage.getItem("userID")
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        fetchData();
    });

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

    const [showModal, setShowModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [newPasscode, setNewPasscode] = useState("");

    const [Id, setInId] = useState("");

    const handleOpenModal = (_id, projectName, passcode) => {
        setInId(_id)
        setErrorMessage("")
        setNewProjectName(projectName)
        setNewPasscode(passcode)
        setShowModal(true);
    };

    const handleJoinModal = (passcode) => {
        setNewPasscode(passcode)
        setShowJoinModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setShowJoinModal(false);
    };

    const handleSave = () => {
        const userID = window.localStorage.getItem("userID")
        Axios.post(`${api}/project`, { _id: Id, projectName: newProjectName, passcode: newPasscode, userID: userID })
            .then(res => {

                if (res.data.message) {
                    setErrorMessage("Passcode already reserved.")
                }
                else {
                    handleCloseModal();
                    fetchData();
                }


                return res.data;
            }).catch(error => {
                if (error.response && error.response.status === 500) {
                    setErrorMessage(error);
                }
            });

    };
    const handleJoin = () => {
        const userID = window.localStorage.getItem("userID")
        Axios.post(`${api}/joinProject`, { passcode: newPasscode, userID: userID })
            .then(res => res.data)
        handleCloseModal();
        fetchData();
    };

    const handleDeleteProject = async (projectID) => {
        // Show confirmation dialog
        const confirmDelete = window.confirm('Are you sure you want to delete this Project?');

        if (confirmDelete) {
            try {
                // Send delete request to the server
                const response = await fetch(api + `/project/${projectID}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log('Project deleted successfully');
                    // Fetch data again after deleting
                    fetchData();
                } else {
                    console.error('Error deleting Project');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <Container>
            <div className="result">

                {showModal && (
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} />

                                <Form.Label>PassCode</Form.Label>
                                <Form.Control type="text" value={newPasscode} onChange={(e) => setNewPasscode(e.target.value)} />
                                <p>{errorMessage}</p>
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={handleSave}>
                                Save Changes
                            </Button>

                        </Modal.Footer>
                    </Modal>
                )}

                {showJoinModal && (
                    <Modal show={showJoinModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Join Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formName">
                                <Form.Label>PassCode</Form.Label>
                                <Form.Control type="text" value={newPasscode} onChange={(e) => setNewPasscode(e.target.value)} />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={handleJoin}>
                                Join
                            </Button>

                        </Modal.Footer>
                    </Modal>

                )}

                <br></br>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                    {projects.map(({ _id, projectName, passcode }) => {
                        return (
                            <ListGroup key={_id}>
                                <ListGroup.Item style={{
                                    border: "3px solid black",
                                    borderRadius: "5px",
                                    height: "300px",
                                    width: "300px",
                                    backgroundColor: "white"
                                }} variant="dark" className="align-items-start">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold ">
                                            <a href={`/space/${_id}`}>
                                                {projectName},{passcode}
                                            </a>

                                            <img src="delete.svg" type="submit" alt="Delete List" onClick={() => handleDeleteProject(_id)} />
                                            <img src="edit.svg" type="submit" alt="Edit List" onClick={() => handleOpenModal(_id, projectName, passcode)} />
                                        </div>
                                    </div>

                                </ListGroup.Item>

                            </ListGroup>
                        );
                    })}
                </div>
                <img src="add.svg" type="submit" alt="Edit List" onClick={() => handleOpenModal("", "", "")} />
                <img src="edit.svg" type="submit" alt="Join Project" onClick={() => handleJoinModal("")} />
            </div>

        </Container>

    )
}

export default Projects;