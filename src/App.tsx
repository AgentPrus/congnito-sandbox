import Account from "./components/Account";
import Login from "./components/Login";
import { useAuth } from "./context/Auth";

function App() {
  const { session } = useAuth();

  return <>{session ? <Account /> : <Login />}</>;
}

export default App;
