import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./page/Login";
import Landing from "./page/Landing";
import Member from "./page/Member";
import Card from "./component/Card";
import Addmember from "./page/Addmember";
import Admin from "./page/Admin/Admin";
import Requirement from "./page/Admin/Requirement";
import Approve from "./page/Admin/Approve";
import TopBar from "./component/topbar";
import './App.css';

function PrivateRoute() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/Login" replace />;
}

function AdminRoute() {
  const role = localStorage.getItem("role");
  return role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
}

function MainLayout() {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
}

function App() {
  return (
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/1" element={<Card />} />

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/member" element={<Member />} />
            <Route path="/member/:id" element={<Member />} />
            <Route path="/addmember" element={<Addmember />} />

            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/requirements" element={<Requirement />} />
              <Route path="/approve/:id" element={<Approve />} />
            </Route>
          </Route>
        </Route>
      </Routes>
  );
}

export default App;

