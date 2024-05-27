import "./index.css";
import { NoLoggedIn } from "./NologinRoutes";
import { LoginRoute } from "./LoginRoute";
import { useAuth } from "./contexts/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const { isLoggedin, isLoading } = useAuth();
  return (
    <>
      {!isLoading ? (
        <CircularProgress />
      ) : isLoggedin ? (
        <LoginRoute />
      ) : (
        <NoLoggedIn />
      )}
    </>
  );
}

export default App;
