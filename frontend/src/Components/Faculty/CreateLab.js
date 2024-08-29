import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const CreateLabSession = ({ faculty_id, onLabCreated }) => {
    const [labData, setLabData] = useState({
        labName: "",
        labCode: "",
        description: "",
        maxStudents: 30,
    });
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setLabData({
            ...labData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {labName, labCode, description, maxStudents }= labData;
            const response = await fetch('http://localhost:8000/api/labsession/create', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ labName, labCode, faculty_id, description, maxStudents}),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage({ type: 'success', text: 'Lab session created successfully!' });
                onLabCreated(result);
                setLabData({
                    labName: "",
                    labCode: "",
                    description: "",
                    maxStudents: 30,
                });
            } else {
                const error = await response.json();
                setMessage({ type: 'danger', text: error.error || 'Failed to create lab session.' });
            }
        } catch (error) {
            setMessage({ type: 'danger', text: 'An error occurred. Please try again later.' });
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="labName">
                    <Form.Label>Lab Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="labName"
                        value={labData.labName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="labCode" className="mt-3">
                    <Form.Label>Lab Code</Form.Label>
                    <Form.Control
                        type="text"
                        name="labCode"
                        value={labData.labCode}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="description" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={labData.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="maxStudents" className="mt-3">
                    <Form.Label>Maximum Students</Form.Label>
                    <Form.Control
                        type="number"
                        name="maxStudents"
                        value={labData.maxStudents}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Create Lab
                </Button>
            </Form>

            {message && <Alert variant={message.type} className="mt-3">{message.text}</Alert>}
        </div>
    );
};

export default CreateLabSession;
