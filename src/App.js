import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contextos
import { AuthProvider } from './contexts/AuthContext';

// Componentes reactstrap
import { Container } from 'reactstrap';

// Componentes
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Inicio from './components/Inicio';

function App() {
  return (
    <div>
      <Container className='d-flex aling-items-center justify-content-center' style={{ minHeight: "100vh" }}>
        <div className='w-50 mt-5' style={{ maxWidht: "400px" }}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/registro" element={<Signup />} />
                <Route path="/inicio/*" element={<Inicio />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </div>
  );
}

export default App;
