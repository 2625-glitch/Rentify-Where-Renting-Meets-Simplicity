import "./index.css";
import { NoLoggedIn } from "./NologinRoutes";
function App() {
  const isLoggedin = false;

  return <>{isLoggedin ? null : <NoLoggedIn />}</>;
}

export default App;
