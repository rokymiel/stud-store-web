import Header from "./components/StoreHeader";
import Footer from "./components/Footer";

import { Routes, Route, Navigate } from 'react-router-dom' 

import { Home } from './pages/store/Home';
import { Store } from './pages/store/Store';
import { Project } from "./pages/store/Project";

import { ConsoleNewProject } from "./pages/console/ConsoleNewProject";
import { ConsoleProject } from "./pages/console/ConsoleProject";
import { ConsoleHome } from "./pages/console/ConsoleHome";

import { AdminMain } from "./pages/admin/AdminMain";
import { Auth } from "./pages/Auth";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(
    (state) => !!state.auth.authData.accessToken
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/store" element={<Store/>}/>
        <Route path="/project/:id" element={<Project/>}/>

        <Route path="/console/project/new" element={isLoggedIn ? <ConsoleNewProject/> : <Auth/>}/>
        <Route path="/console/project/:id" element={isLoggedIn ? <ConsoleProject/> : <Auth/>}/>
        <Route path="/console" element={isLoggedIn ? <ConsoleHome/> : <Auth/>}/>

        <Route path="/admin" element={<AdminMain/>}/>

        <Route path="/auth" element={!isLoggedIn ? <Auth/> : <Navigate to="/" />}/>
      </Routes>
    </>
  )
}

export default App;
