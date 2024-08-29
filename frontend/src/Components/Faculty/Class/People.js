import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const People = ({ labSessionId }) => {
    const [classContent, setClassContent] = useState(null);

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/labsession/${labSessionId}`);
                if (response.ok) {
                    const data = await response.json();
                    setClassContent(data);
                } else {
                    console.error('Failed to fetch class details');
                }
            } catch (error) {
                console.error('Error fetching class details:', error);
            }
        };

        fetchClassDetails();
    }, [labSessionId]);

    if (!classContent) return <div>Loading...</div>;

    return (
        <div className="people" style={{ backgroundColor: '#282a36', padding: '20px', borderRadius: '8px' }}>
            <Card className="mb-4" style={{ backgroundColor: '#44475a', color: '#f8f8f2', border: 'none' }}>
                <Card.Header style={{ backgroundColor: '#6272a4', borderBottom: 'none' }}>
                    Instructor
                </Card.Header>
                <Card.Body>
                    <Card.Title>{classContent.faculty_id.username}</Card.Title>
                </Card.Body>
            </Card>

            <Card style={{ backgroundColor: '#44475a', color: '#f8f8f2', border: 'none' }}>
                <Card.Header style={{ backgroundColor: '#6272a4', borderBottom: 'none' }}>
                    Students
                </Card.Header>
                <ListGroup variant="flush">
                    {classContent.participants.map((student) => (
                        <ListGroup.Item
                            key={student._id}
                            style={{
                                backgroundColor: '#44475a',
                                color: '#f8f8f2',
                                borderColor: '#6272a4',
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <span>{student.username}</span>
                                <span className="text-muted" style={{ color: '#bd93f9' }}>
                                    {student.email}
                                </span>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </div>
    );
};

export default People;
