import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin_home.css';
import { Adduser } from './add_user';
import Updateuser from './update_user';
import Deleteuser from './delete_user';
const AdminHome = () => {
  const [activeTab, setActiveTab] = useState('Add User');  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="wrapper">
        <aside className="sidebar">
          <center>
          <div className="hamburger-icon">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          </center>
          <ul>
            {['Add User', 'Update User', 'Delete User'].map((tab, index) => (
              <li key={index}>
                <button
                  className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => handleTabClick(tab)}
                >
                  <h6>{tab}</h6>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <header>
        <h2>Velammal College Of Engineering & Technology</h2>
      </header>
      <div className="tab-content">
        {activeTab === 'Add User' && <div>{<Adduser />}</div>}
        {activeTab === 'Update User' && <div>{<Updateuser />}</div>}
        {activeTab === 'Delete User' && <div>{<Deleteuser />}</div>}
      </div>
    </>
  );
};

export default AdminHome;

