import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pass, setpass] = useState("");
  const [username, setusername] = useState("");
  const [passcheck, setpasscheck] = useState(true);
  const [usernamecheck, setusernamecheck] = useState(true);
  const [visibility, setvisibility] = useState(true);
  const [users, setusers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get("http://localhost:8000/team_members")
        .then((res) => {
          setusers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUsers();
  }, []);

  // Toggle Password Visibility
  const toggleVisibility = () => {
    setvisibility(!visibility);
  };

  // password function
  const passFunc = (e) => {
    let pass = e.target.value;
    setpass(pass);
  };
  // username function
  const usernameFunc = (e) => {
    let username = e.target.value;
    setusername(username);
  };
  // check and submit user for login
  const submitUser = () => {
    users.forEach((user) => {
      if (pass === user.email && username === user.name) {
        dispatch({
          type: "login",
          payload: user.id,
        });
        dispatch({
          type: "userinfo",
          payload: user,
        });
        setpasscheck(true);
        setusernamecheck(true);
        navigate("/home");
      } else if (pass !== user.email && username !== user.name) {
        setpasscheck(false);
        setusernamecheck(false);
      } else if (pass !== user.email) {
        setpasscheck(true);
        setusernamecheck(false);
      } else if (username !== user.name) {
        setusernamecheck(true);
        setpasscheck(false);
      }
    });
  };
  return (
    <Fragment>
      <div className="w-full max-w-md bg-surface-dark border border-border-dark p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold leading-tight tracking-tight">
              Bug Mind
            </h2>
            <p className="text-slate-400 mt-2 font-medium">Welcome back</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <span className="material-symbols-outlined text-xl">mail</span>
              </div>
              <input
                onChange={(e) => usernameFunc(e)}
                className="block w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:border-primary focus:ring-0 transition-all outline-none"
                placeholder="Jane Doe"
                type="text"
              />
            </div>
            {!passcheck && <span style={{ color: "red" }}>Wrong Username</span>}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                Password
              </label>
              <div className="text-xs font-semibold text-primary hover:text-blue-400 transition-colors">
                Forgot password?
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <span className="material-symbols-outlined text-xl">lock</span>
              </div>
              <input
                onChange={(e) => passFunc(e)}
                className="block w-full pl-10 pr-10 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:border-primary focus:ring-0 transition-all outline-none"
                placeholder="••••••••"
                type={visibility ? "password" : "text"}
              />
              <button
                onClick={() => toggleVisibility()}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                type="button"
              >
                <span className="material-symbols-outlined text-xl">
                  visibility
                </span>
              </button>
            </div>
            {!usernamecheck && (
              <span style={{ color: "red" }}>Wrong Password</span>
            )}
          </div>
          <div className="flex items-center">
            <input
              className="size-4 bg-slate-950 border-slate-800 rounded text-primary focus:ring-offset-background-dark focus:ring-primary"
              id="remember_me"
              type="checkbox"
            />
            <label className="ml-2 block text-sm text-slate-400 font-medium">
              Keep me logged in
            </label>
          </div>
          <button
            onClick={() => submitUser()}
            className="w-full flex items-center justify-center py-3.5 px-4 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-blue-600 active:scale-[0.98] transition-all"
          >
            Login to Dashboard
          </button>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-400 text-sm">
            Don't have an account?
            <div className="text-primary font-bold hover:text-blue-400 transition-colors ml-1">
              Sign up
            </div>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
