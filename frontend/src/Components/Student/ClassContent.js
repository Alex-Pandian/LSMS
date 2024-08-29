import React, { useState } from 'react';
import { Tabs, Tab, Navbar, Container, Row, Col } from 'react-bootstrap';
import { FaStream, FaChalkboard, FaUsers } from 'react-icons/fa';
import Stream from './Class/Stream';
import Classwork from './Class/Classwork';
import People from './Class/People';
import './ClassContent.css';

const ClassContent = ({ classContent, studentId }) => {
    const [key, setKey] = useState('stream');

    if (!classContent) {
        return <h1 style={{ color: '#f8f8f2' }}>Class not found</h1>;
    }

    return (
        <Container fluid className="full-height">
            <Navbar className="class-content-header" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="#">
                        <h4 style={{ color: '#f8f8f2' }}>{classContent.labName}</h4>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <div className="class-tabs-container">
                <Row className="pt-3 flex-grow-1">
                    <Col md={12}>
                        <Tabs
                            id="class-tabs"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                            justify
                            variant="dark"
                        >
                            <Tab eventKey="stream" title={<><FaStream /> Stream</>} tabClassName="class-tab-dracula">
                                <Stream labSessionId={classContent._id} />
                            </Tab>
                            <Tab eventKey="classwork" title={<><FaChalkboard /> Classwork</>} tabClassName="class-tab-dracula">
                                <Classwork labId={classContent._id} studentId={studentId} />
                            </Tab>
                            <Tab eventKey="people" title={<><FaUsers /> People</>} tabClassName="class-tab-dracula">
                                <People labSessionId={classContent._id} />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default ClassContent;
