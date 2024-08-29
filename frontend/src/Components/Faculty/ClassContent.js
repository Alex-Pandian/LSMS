import React, { useState } from 'react';
import { Tabs, Tab, Navbar, Container, Row, Col } from 'react-bootstrap';
import { FaStream, FaChalkboard, FaUsers, FaClipboardList } from 'react-icons/fa';
import Stream from './Class/Stream';
import Classwork from './Class/Classwork';
import People from './Class/People';
import Grades from './Class/Grades';
import './ClassContent.css';

const ClassContent = ({ classContent }) => {
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
                                <Stream classContent={classContent} />
                            </Tab>
                            <Tab eventKey="classwork" title={<><FaChalkboard /> Classwork</>} tabClassName="class-tab-dracula">
                                <Classwork labId={classContent._id} />
                            </Tab>
                            <Tab eventKey="people" title={<><FaUsers /> People</>} tabClassName="class-tab-dracula">
                                <People labSessionId={classContent._id} />
                            </Tab>
                            <Tab eventKey="grades" title={<><FaClipboardList /> Grades</>} tabClassName="class-tab-dracula">
                                <Grades classContent={classContent} />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default ClassContent;
