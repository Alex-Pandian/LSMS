import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal } from 'react-bootstrap';
import CreateLabSession from './CreateLab';

const FacultyHome = ({ Classes, setClasses, facultyId, setActiveComponent }) => {
    const [showModal, setShowModal] = useState(false);

    const handleLabCreated = (lab) => {
        setClasses(Classes => [...Classes, lab]);
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
            <h2>Your Classes</h2>
            <div style={{ flex: 1 }}>
                <Row>
                    {Classes.map((classItem, index) => (
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
                onClick={() => setShowModal(true)} 
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
                    fontSize: '24px',
                    color: '#f8f8f2', /* Dracula text color */
                    backgroundColor: '#bd93f9' /* Dracula color for the button */
                }}
            >
                <span className="material-icons">add</span>
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateLabSession 
                        faculty_id={facultyId}
                        onLabCreated={handleLabCreated}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default FacultyHome;
