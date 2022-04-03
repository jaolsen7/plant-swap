import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Plant from "./pages/Plant";
import Login from "./pages/Login";
import ProtectedPageExample from "./pages/ProtectedPageExample";
import SignUp from "./pages/SignUp";
import { client } from "./util/apolloClient";
import { AuthProvider } from "./util/auth";

// import Footer from './components/Footer';

// import Favorites from "./pages/Favorites";
// import Plant from "./pages/Plant";
// import Profile from "./pages/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/me" element={<Profile />} />
            <Route path="/profiles/:username" element={<Profile />} /> */}
            <Route path="/plants" element={<Plant />} />
            <Route path="/plants/:plantId" element={<Plant />} />
            {/* Use <RequiredAuth> for pages that should only be accessible to a
            user that has logged in. */}
            <Route
              path="/protected"
              element={
                <RequireAuth>
                  <ProtectedPageExample />
                  {/* <Profile /> */}
                  <Plant />
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
