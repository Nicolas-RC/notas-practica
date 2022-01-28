import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

// Contextos
import { AuthProvider } from './contexts/AuthContext';

// Componentes reactstrap
import { Container } from 'reactstrap';

// Componentes
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <div>
      <Container className='d-flex aling-items-center justify-content-center' style={{ minHeight: "100vh" }}>
        <div className='w-50 mt-5' style={{ maxWidht: "400px" }}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route path="/registro" element={<Signup />} />
                <Route path="/*" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </div>
  );
}

export default App;
