import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./screens/Auth/Login/Login";
import Signup from "./screens/Auth/Signup/Signup";
import DashboardPage from "./screens/Dashboard/Dashboard";
import NotFound from "./screens/NotFound/Notfound";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./screens/Home/Home";
import AuthPage from "./screens/Auth/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
