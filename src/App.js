import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPass from "./pages/ForgotPass";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";


function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPass />} />
          <Route path="/post/:postId" element={<Post />} />

          <Route path="/create-post" element={<PrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
          </Route>
          <Route path="/edit-post" element={<PrivateRoute />}>
            <Route path="/edit-post/:postId" element={<EditPost />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </>
  );
}

export default App;
