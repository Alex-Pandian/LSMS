import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Form, Alert} from 'react-bootstrap';

const StudentHome = ({ enrolledClasses , onLabJoined, userId, setActiveComponent}) => {
    const [showModal, setShowModal] = useState(false);
    const [courseCode, setCourseCode] = useState('');
    const [message, setMessage] = useState(null);

    const handleJoinClass = async () => {
        console.log('Course Code:', courseCode);
        try {
            const response = await fetch(`http://localhost:8000/api/student/join/${courseCode}/${userId}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({courseCode}),
            });

            if (response.ok) {
                const result = await response.json();
                onLabJoined(result);
                setMessage({ type: 'success', text: 'joined successfully!' });
                 // Call the callback to notify the parent component with the created lab session
            } else {
                const error = await response.json();
                setMessage({ type: 'danger', text: error.error || 'Failed to join lab session.' });
            }
        } catch (error) {
            setMessage({ type: 'danger', text: 'An error occurred. Please try again later.' });
        }
    };

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: '#282a36', /* Dracula background color */
            color: '#f8f8f2', /* Dracula text color */
            padding: '20px'
        }}>
            <h2>Enrolled Classes</h2>
            <div style={{ flex: 1 }}>
                <Row>
                    {enrolledClasses.map((classItem, index) => (
                        <Col key={index} sm={6} md={4} lg={3} className="mb-4">
                            <Card 
                                style={{ 
                                    width: '100%', 
                                    cursor: 'pointer', 
                                    backgroundColor: '#44475a', /* Dracula card background color */ 
                                    color: '#f8f8f2' /* Dracula card text color */ 
                                }} 
                                onClick={() => setActiveComponent(classItem._id)}
                            >
                                <Card.Body>
                                    <Card.Title>{classItem.labName}</Card.Title>
                                    <Card.Text>{classItem.labCode}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            
            <Button 
                variant="primary" 
                onClick={() => setShowModal(true)} // Show modal on button click
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                }}
            >
                <span className="material-icons">add</span>
            </Button>

            {/* Modal for joining a class */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Join Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="courseCode">
                            <Form.Label>Enter Course Code</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter course code" 
                                value={courseCode}
                                onChange={(e) => setCourseCode(e.target.value)} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleJoinClass}>
                        Join Class
                    </Button>
                </Modal.Footer>
                {message && <Alert variant={message.type} className="mt-3">{message.text}</Alert>}
            </Modal>
        </div>
    );
};

export default StudentHome;
