import React, { useState, useEffect } from 'react';
import { ListGroup, Modal, Button, Form } from 'react-bootstrap';

const Classwork = ({ labId, studentId }) => {
    const [classwork, setClasswork] = useState([]);
    const [selectedClasswork, setSelectedClasswork] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState(null);

    useEffect(() => {
        const fetchClasswork = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/student/assigned-questions/${labId}/${studentId}`);
                if (response.ok) {
                    const data = await response.json();
                    setClasswork(data);
                } else {
                    console.error('Failed to fetch classwork');
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        };

        fetchClasswork();
    }, [labId, studentId]);

    const handleShowModal = (classworkItem) => {
        setSelectedClasswork(classworkItem);
        setShowModal(true);
    };

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('studentId', studentId);
        formData.append('labId', labId);
        formData.append('questionId', selectedClasswork._id);
        formData.append('pdf', pdfFile);

        try {
            const response = await fetch(`http://localhost:8000/api/student/submit-answer`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSubmissionStatus('Submission successful!');
            } else {
                setSubmissionStatus('Failed to submit. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmissionStatus('Network error. Please try again.');
        } finally {
            setPdfFile(null);
        }
    };

    return (
        <div className="classwork">
            <h4>Your Assigned Classwork</h4>
            {classwork.length > 0 ? (
                <ListGroup>
                    {classwork.map((item, index) => (
                        <ListGroup.Item 
                            action 
                            key={index} 
                            onClick={() => handleShowModal(item)}
                            className='mb-3'
                        >
                            {item.title}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <p>No classwork assigned yet.</p>
            )}

            {selectedClasswork && (
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedClasswork.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedClasswork.questions.map((question, index) => (
                            <p key={index}>{question}</p>
                        ))}
                        <Form>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload your answer (PDF format)</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    accept="application/pdf"
                                    onChange={handleFileChange} 
                                />
                            </Form.Group>
                        </Form>
                        {submissionStatus && <p>{submissionStatus}</p>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={handleSubmit}
                            disabled={!pdfFile} // Disable submit if no file is selected
                        >
                            Submit Answer
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Classwork;
