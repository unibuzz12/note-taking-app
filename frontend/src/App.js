import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import GetNotes from "./pages/GetNotesPage";
import HomeAuth from "./pages/HomeAuthPage";
import HomeNonAuth from "./pages/HomeNonAuthPage";
import NoteForm from "./components/NoteForm";
import NoteDetail from "./pages/NoteDetailPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <ToastContainer />
        <AuthProvider>
          <Navbar />
          <Switch>
            <PrivateRoute component={HomeAuth} path="/welcome" exact />
            <PrivateRoute component={GetNotes} path="/notes" exact />
            <PrivateRoute component={NoteForm} path="/notes/:id/edit" exact />
            <PrivateRoute component={NoteDetail} path="/notes/:id/" exact />
            <PrivateRoute component={NoteForm} path="/notes/create" exact />

            <Route component={HomeNonAuth} path="/" exact />
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
          </Switch>
        </AuthProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
