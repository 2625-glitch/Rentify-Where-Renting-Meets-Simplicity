import './index.css';
import { NoLoggedIn } from './NologinRoutes';
import { LoginRoute } from './LoginRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isLoggedin } = useAuth(); // Correct usage of useAuth
  return <>{isLoggedin ? <LoginRoute /> : <NoLoggedIn />}</>;
}

export default App;
