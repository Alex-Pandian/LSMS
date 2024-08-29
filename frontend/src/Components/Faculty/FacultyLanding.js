import React, { useState, useEffect } from "react";
import { Container, Row, Col, Navbar, Button, Dropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import FacultyHome from "./FacultyHome";
import FSidebar from "./FSideBar";
import ClassContent from "./ClassContent";
import './FacultyLanding.css';

const FacultyLanding = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeComponent, setActiveComponent] = useState('home');
    const [classes, setClasses] = useState([]);
    const { faculty_id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state || {};

    console.log(username);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/labsession/created-labs/${faculty_id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setClasses(data);
            } catch (error) {
                console.error("Error fetching lab sessions:", error);
            }
        };

        fetchClasses();
    }, [faculty_id]);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const renderContent = () => {
        if (activeComponent === 'home') {
            return <FacultyHome Classes={classes} setClasses={setClasses} facultyId={faculty_id} setActiveComponent={setActiveComponent} />;
        } else {
            const classContent = classes.find(cls => cls._id === activeComponent);
            return <ClassContent classContent={classContent} />;
        }
    };

    return (
        <Container fluid className="faculty-home p-0">
            <Navbar 
                className="header p-3"
                variant="dark"
                style={{ backgroundColor: '#282a36', position: 'fixed', width: '100%', zIndex: 1000 }}
            >
                <Button 
                    variant="outline-light" 
                    onClick={toggleSidebar} 
                    className="me-2"
                    style={{ color: '#f8f8f2', borderColor: '#44475a' }}
                >
                    <span className="material-icons">menu</span>
                </Button>
                <Navbar.Brand href={`/faculty-home/${faculty_id}`} style={{ color: '#f8f8f2' }}>Welcome to Faculty Dashboard</Navbar.Brand>
                <div className="ms-auto d-inline-flex align-items-center">
                    <span className="fs-5 me-2">{username}</span>
                    <Dropdown align="end">
                        <Dropdown.Toggle 
                            variant="secondary" 
                            id="dropdown-basic" 
                            style={{ background: 'none', border: 'none', color: '#f8f8f2' }}
                        >
                            <FaUserCircle size={30} color="#f8f8f2" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Navbar>
            <Row style={{ marginTop: '70px' }}>
                {isSidebarOpen && (
                    <Col md={3} style={{ position: 'fixed', height: 'calc(100vh - 70px)', overflowY: 'auto', paddingTop: '10px', top: '70px', left: 0 }}>
                        <FSidebar 
                            isSidebarOpen={isSidebarOpen} 
                            setActiveComponent={setActiveComponent} 
                            activeComponent={activeComponent}
                            Classes={classes} 
                        />
                    </Col>
                )}
                <Col 
                    md={isSidebarOpen ? 9 : 12} 
                    id="content-area"
                    className="content"
                    style={{ marginLeft: isSidebarOpen ? '200px' : '0px'}}
                >
                    {renderContent()}
                </Col>
            </Row>
        </Container>
    );
};

export default FacultyLanding;
