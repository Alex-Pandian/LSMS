import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { FaHome, FaBook } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, setActiveComponent, activeComponent, enrolledClasses }) => {
    return (
        <div
            className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
            style={{
                width: "200px",
                backgroundColor: "#282a36",
                color: "#f8f8f2",
                height: "100vh", 
                padding: '10px',
                borderRight: '2px solid #44475a',
                overflowY: 'auto', // Enables vertical scrolling
                position: 'fixed', // Keeps the sidebar fixed on the left side
                top: '80px', // Aligns the sidebar just below the fixed header
                left: 0,
            }}
        >
            <ListGroup variant="flush">
                <ListGroup.Item 
                    action 
                    onClick={() => setActiveComponent('home')} 
                    className={`sidebar-item ${activeComponent === 'home' ? 'active' : ''}`}
                    style={{
                        backgroundColor: activeComponent === 'home' ? "#44475a" : "transparent",
                        color: activeComponent === 'home' ? "#f8f8f2" : "#6272a4"
                    }}
                >
                    <FaHome /> Home
                </ListGroup.Item>
                {enrolledClasses.map((classItem, index) => (
                    <ListGroup.Item 
                        action 
                        key={index} 
                        onClick={() => setActiveComponent(classItem._id)} // Use unique _id for setting active component
                        className={`sidebar-item ${activeComponent === classItem._id ? 'active' : ''}`} // Compare with _id
                        style={{
                            backgroundColor: activeComponent === classItem._id ? "#44475a" : "transparent",
                            color: activeComponent === classItem._id ? "#f8f8f2" : "#6272a4"
                        }}
                    >
                        <FaBook /> {classItem.labName}
                    </ListGroup.Item>
                
                ))}
            </ListGroup>
        </div>
    );
};

export default Sidebar;
