import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UpdatePage from "./pages/UpdatePage";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth")); // default value comes from localStorage

  onAuthStateChanged(auth, user => {
    if (user) {
      //user is authenticated / signed in
      setIsAuth(true); // set isAuth to true
      localStorage.setItem("isAuth", true); // also, save isAuth in localStorage
    } else {
      // user is not authenticated / not signed in
      setIsAuth(false); // set isAuth to false
      localStorage.removeItem("isAuth"); // remove isAuth from localStorage
    }
  });

  // variable holding all private routes including the nav bar
  const privateRoutes = (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/:id/update" element={<UpdatePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );

  // variable holding all public routes without nav bar
  const publicRoutes = (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Routes>
  );

  // if user is authenticated, show privateRoutes, else show publicRoutes
  return <main>{isAuth ? privateRoutes : publicRoutes}</main>;
}

export default App;
