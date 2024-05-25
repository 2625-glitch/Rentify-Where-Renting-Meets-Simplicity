import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/LoginFlow/Home';
import Properties from './components/LoginFlow/Properties';
import UploadProperty from './components/LoginFlow/UploadProperty';
import LoggedInNav from './components/Navbar/LoggedInNav';

export const LoginRoute = () => {
  return (
    <BrowserRouter>
      <LoggedInNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/uploadProperties" element={<UploadProperty />} />
      </Routes>
    </BrowserRouter>
  );
};

export default LoginRoute;
