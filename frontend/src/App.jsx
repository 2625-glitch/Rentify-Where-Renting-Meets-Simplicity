import './index.css';
import { useContext } from 'react';
import { NoLoggedIn } from './NologinRoutes';
import { LoginRoute } from './LoginRoute';
import { AuthContext } from './contexts/AuthContext';
function App() {
  const { isLoggedin } = useContext(AuthContext);
  return <>{isLoggedin ? <LoginRoute /> : <NoLoggedIn />}</>;
}

export default App;
