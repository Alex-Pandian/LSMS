import React, { useState, useEffect } from 'react';
import { ListGroup, Modal, Button } from 'react-bootstrap';

const Stream = ({ labSessionId }) => {
    const [classworks, setClassworks] = useState([]);
    const [selectedClasswork, setSelectedClasswork] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchClassworks = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/labsession/all-questions/${labSessionId}`);
                if (response.ok) {
                    const data = await response.json();
                    setClassworks(data);
                } else {
                    console.error('Failed to fetch classworks');
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        };

        fetchClassworks();
    }, [labSessionId]);

    const handleShowModal = (classworkItem) => {
        setSelectedClasswork(classworkItem);
        setShowModal(true);
    };

    return (
        <div className="stream">
            <h4>Stream</h4>
            {classworks.length > 0 ? (
                <ListGroup>
                    {classworks.map((item) => (
                        <ListGroup.Item 
                            action 
                            key={item._id} 
                            onClick={() => handleShowModal(item)}
                        >
                            {item.title}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <p>No classwork available.</p>
            )}

            {selectedClasswork && (
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedClasswork.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedClasswork.questions.length > 0 ? (
                            selectedClasswork.questions.map((question, index) => (
                                <p key={index}>{question}</p>
                            ))
                        ) : (
                            <p>No questions assigned.</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Stream;
