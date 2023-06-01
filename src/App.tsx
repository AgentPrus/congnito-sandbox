import { Container, useColorModeValue } from "@chakra-ui/react";
import Account from "./components/Account";

import Login from "./components/Login";
import { useAuth } from "./context/Auth";

function App() {
  const { user } = useAuth();

  return (
    <Container
      minH="100vh"
      minW="100vw"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {user ? <Account /> : <Login />}
    </Container>
  );
}

export default App;
