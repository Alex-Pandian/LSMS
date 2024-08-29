import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

const Classwork = ({ labId }) => {
    const [showModal, setShowModal] = useState(false);
    const [questionData, setQuestionData] = useState({ title: '', questions: [''] }); // Initialize with one empty question field

    const handleAddQuestion = () => {
        setQuestionData((prevData) => ({
            ...prevData,
            questions: [...prevData.questions, ''], // Add a new empty question field
        }));
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questionData.questions];
        newQuestions[index] = value;
        setQuestionData({ ...questionData, questions: newQuestions });
    };

    const handleTitleChange = (value) => {
        setQuestionData({ ...questionData, title: value });
    };

    const handleCreateClasswork = async () => {
        const requestBody = {
            title: questionData.title,
            questions: questionData.questions,
            labSessionId: labId, 
        };

        try {
            const response = await fetch('http://localhost:8000/api/labsession/assign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Questions assigned successfully:', data);
                setQuestionData({ title: '', questions: [''] }); // Reset form
                setShowModal(false);
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className="classwork">
            <h4>Create Classwork</h4>
            <Button
                variant="primary"
                onClick={() => setShowModal(true)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    borderRadius: '20px',
                    padding: '10px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '16px',
                    color: '#f8f8f2',
                    backgroundColor: '#bd93f9',
                    border: 'none',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                <FaPlus size={20} style={{ marginRight: '8px' }} />
                Create
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Classwork</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle" className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={questionData.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                            />
                        </Form.Group>

                        {questionData.questions.map((question, index) => (
                            <Form.Group controlId={`formQuestion-${index}`} key={index} className="mb-3">
                                <Form.Label>Question {index + 1}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter question"
                                    value={question}
                                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                                />
                            </Form.Group>
                        ))}

                        <Button variant="primary" onClick={handleAddQuestion}>
                            Add Another Question
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateClasswork}>
                        Assign Questions
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Classwork;
