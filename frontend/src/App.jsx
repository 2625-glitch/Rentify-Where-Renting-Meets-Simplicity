import './index.css';
import { NoLoggedIn } from './NologinRoutes';
import { LoginRoute } from './LoginRoute';
function App() {
  const isLoggedin = true;

  return <>{isLoggedin ? <LoginRoute /> : <NoLoggedIn />}</>;
}

export default App;
