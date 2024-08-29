import React, { useState, useEffect } from "react";
import { Container, Row, Col, Navbar, Button, Dropdown } from "react-bootstrap";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Sidebar from './SideBar'; // Import the Sidebar component
import StudentHome from './StdHome';
import ClassContent from "./ClassContent";

const StudentLanding = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeComponent, setActiveComponent] = useState('home'); // Set default to 'home'
    const [enrolledClasses, setEnrolledClasses] = useState([]); // State to hold enrolled classes
    const { userId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state || {}; // Assuming username is passed in location state

    console.log(username);

    const handleLabJoined = (lab) => {
        setEnrolledClasses(enrolledClasses => [...enrolledClasses, lab]);
    };

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/student/enrolled-labs/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setEnrolledClasses(data);
            } catch (error) {
                console.error("Error fetching lab sessions:", error);
            }
        };

        fetchClasses();
    }, [userId]);

    useEffect(() => {
        const content = document.getElementById('content-area');
        if (content) {
            content.style.transition = 'margin-left 0.3s ease-in-out';
            content.style.marginLeft = isSidebarOpen ? '240px' : '0px';
        }
    }, [isSidebarOpen]);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const renderContent = () => {
        if (activeComponent === 'home') {
            return <StudentHome enrolledClasses={enrolledClasses} onLabJoined={handleLabJoined} userId={userId} setActiveComponent={setActiveComponent} />;
        } else {
            const classContent = enrolledClasses.find(cls => cls._id === activeComponent);
            return <ClassContent classContent={classContent} studentId={userId} />;
        }
    };

    return (
        <Container fluid className="student-home p-0">
            <Navbar 
                style={{ backgroundColor: '#282a36', position: 'fixed', width: '100%', zIndex: 1000 }} // Dark theme applied here
                variant="dark" 
                className="header p-3"
            >
                <Button 
                    variant="outline-light" 
                    onClick={toggleSidebar} 
                    className="me-2"
                    style={{ color: '#ffffff', borderColor: '#495057' }} // Darker border color to match theme
                >
                    <span className="material-icons">menu</span>
                </Button>
                <Navbar.Brand href={`/std-home/${userId}`} style={{ color: '#ffffff' }}>Welcome to Classroom</Navbar.Brand>
                <div className="ms-auto d-inline-flex align-items-center">
                    <span className="fs-5 me-2">{username}</span>
                    <Dropdown align="end">
                        <Dropdown.Toggle 
                            variant="secondary" 
                            id="dropdown-basic" 
                            style={{ background: 'none', border: 'none', color: '#ffffff' }}
                        >
                            <FaUserCircle size={30} color="white" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Navbar>
            <Row style={{ marginTop: '70px', overflowX: 'hidden' }}>
                {isSidebarOpen && (
                    <Col md={3} style={{ position: 'fixed', height: 'calc(100vh - 70px)', overflowY: 'auto', paddingTop: '10px', top: '70px', left: 0 }}>
                        <Sidebar 
                            isSidebarOpen={isSidebarOpen} 
                            setActiveComponent={setActiveComponent} 
                            activeComponent={activeComponent}
                            enrolledClasses={enrolledClasses} // Pass enrolled classes to Sidebar
                        />
                    </Col>
                )}
                <Col
                    md={isSidebarOpen ? 9 : 12}
                    id="content-area"
                    className="content"
                    style={{ marginLeft: isSidebarOpen ? '200px' : '0px' }}
                >
                    {renderContent()}
                </Col>
            </Row>
        </Container>
    );
};

export default StudentLanding;
