import Home from "./pages/Home";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "../src/context/authContext";

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Home />
      </AppProvider>
    </AuthProvider>
  );
}
