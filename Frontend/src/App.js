import "./App.css";
import { Header } from "./Components/header/Header";
import { React } from "react";
import Leftpanel from "./Components/leftpanel/Leftpanel";
import Bugboard from "./Components/interface/Bugboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Allissues from "./Components/interface/Allissues";
import Dashboard from "./Components/interface/Dashboard";
import Resolutionhub from "./Components/interface/Resolutionhub";
import Sladashboard from "./Components/interface/Sladashboard";
import Teammembers from "./Components/interface/Teammembers";
import Createissue from "./Components/modals/Createissue";
import Editissue from "./Components/modals/Editissue";
import Login from "./Components/login/Login";
import PrivateRoute from "./Components/login/PrivateRoute";
import { useSelector } from "react-redux";
import Profile from "./Components/interface/Profile";

function App() {
  const login = useSelector((state) => state.login);
  const createticket = useSelector((state) => state.createticket);
  const ticketid = useSelector((state) => state.ticketid);

  return (
    <BrowserRouter>
      <Routes>
        {!login ? <Route path="/" element={<Login />} /> : null}
        <Route element={<PrivateRoute />}>
          <Route
            path="/home"
            element={
              <div>
                <Header />
                <div class="flex flex-1 overflow-auto">
                  <Leftpanel />
                  {ticketid === null ? <Bugboard /> : <Editissue />}
                </div>
                {createticket && <Createissue />}
              </div>
            }
          />
          <Route
            path="/allissues"
            element={
              <div>
                <Header />
                <div class="flex flex-1 overflow-auto">
                  <Leftpanel />
                  {ticketid === null ? <Allissues /> : <Editissue />}
                </div>
                {createticket && <Createissue />}
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <div>
                <Header />
                <div class="flex flex-1 overflow-auto">
                  <Leftpanel />
                  {ticketid === null ? <Dashboard /> : <Editissue />}
                </div>
                {createticket && <Createissue />}
              </div>
            }
          />
          <Route
            path="/resolutionhub"
            element={
              <div>
                <Header />
                <div class="flex flex-1 overflow-auto">
                  <Leftpanel />
                  {ticketid === null ? <Resolutionhub /> : <Editissue />}
                </div>
                {createticket && <Createissue />}
              </div>
            }
          />
          <Route
            path="/sladashboard"
            element={
              <div>
                <Header />
                <div class="flex flex-1 overflow-auto">
                  <Leftpanel />
                  {ticketid === null ? <Sladashboard /> : <Editissue />}
                </div>
                {createticket && <Createissue />}
              </div>
            }
          />
          <Route
            path="/teammembers"
            element={
              <div>
                <Header />
                <div class="flex flex-1 overflow-auto">
                  <Leftpanel />
                  {ticketid === null ? <Teammembers /> : <Editissue />}
                </div>
                {createticket && <Createissue />}
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div>
                <Header />
                <div class="flex flex-1 overflow-auto">
                  <Leftpanel />
                  {ticketid === null ? <Profile /> : <Editissue />}
                </div>
                {createticket && <Createissue />}
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
