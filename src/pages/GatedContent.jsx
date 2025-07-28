// ----------------------------------------------------------------------
// warrior-built/src/pages/GatedContent.jsx (SIMPLIFIED)
// ----------------------------------------------------------------------
import React from 'react';
import { useSelector } from 'react-redux';

function GatedContent() {
  // We can get the user's name for a personalized message!
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Gated Content</h1>
      <p>
        This content is protected. You can only see it because you are logged in.
      </p>
      {user && user.name && <p>Welcome, {user.name}!</p>}
    </div>
  );
}

export default GatedContent;