// warrior-built/src/pages/Dashboard.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
      <section className='heading'>
        <h1>Welcome to Warrior Built</h1>
        <p>Your personal fitness and content hub.</p>
      </section>

      {user ? (
        // --- User is Logged In ---
        <section>
          <h2>Hello, {user.name || 'Warrior'}!</h2>
          <p>Explore the available content below.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <Link to='/free-content' className='btn'>
              View Free Content
            </Link>
            <Link to='/gated-content' className='btn btn-primary'>
              View Gated Content
            </Link>
          </div>
        </section>
      ) : (
        // --- User is Logged Out ---
        <section>
          <h2>Get Started</h2>
          <p>Please log in or register to access exclusive content.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <Link to='/login' className='btn'>
              Login
            </Link>
            <Link to='/register' className='btn btn-reverse'>
              Register
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default Dashboard;
