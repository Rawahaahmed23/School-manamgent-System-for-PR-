import './index.css'
import RegistrationForm from "./pages/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './pages/Login';
import StudentDetail from './pages/StudentData';
import StudentRegistrationForm from './pages/AddStudent';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import FeesTracker from './pages/FeesTracker';
import { AuthProvider } from './Store/useAuth';      
import ProtectedRoute from './components/Protectiveroute';
import ForgotPassword from './pages/ForgotPass';

import ResetPassword from './pages/ResetPassword';
function App() {
  return (
    <AuthProvider>   
    <BrowserRouter>
  <Routes>

    <Route path="/register" element={<RegistrationForm />} />
    <Route path="/" element={<LoginForm />} />

    <Route
      element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }
    >
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/studentdetails" element={<StudentDetail />} />
      <Route path="/addstudent" element={<StudentRegistrationForm />} />
      <Route path="/feestracker" element={<FeesTracker />} />



    </Route>

      <Route path="/forgot-password" element={<ForgotPassword />} />

<Route path="/ResetPassword" element={<ResetPassword />} />


  </Routes>
</BrowserRouter>
    </AuthProvider>
  )
}

export default App;