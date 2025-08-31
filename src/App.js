import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Topic from './pages/Topic';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';
import Error from './pages/Error';
import JsonViewer from './pages/JsonViewer';
import UserManagement from './pages/UserManagement';

function App() {
  const [hasError, setHasError] = useState(false);

  const resetError = () => setHasError(false);

  return (
    <div className="App">
      <Router>
        <Navbar />
        {hasError ? (
          <Error reset={resetError} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topics/:topic" element={<Topic />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/json-viewer" element={<JsonViewer />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;