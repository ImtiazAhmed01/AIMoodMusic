// import Home from "./pages/Home";
// import { AppProvider } from "./context/appContext";
// import { AuthProvider } from "./context/authContext";

// export default function App() {
//   return (
//     <AuthProvider>
//       <AppProvider>
//         <Home />
//       </AppProvider>
//     </AuthProvider>
//   );
// }

import { AuthProvider } from "./context/authContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useAuth } from "./context/authContext";

function AppContent() {
  const { user } = useAuth();
  return user ? <Home /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
