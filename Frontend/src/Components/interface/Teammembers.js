import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Teammembers = () => {
  const toggleteamdept = useSelector((state) => state.teamdept);
  const toggleteamrole = useSelector((state) => state.teamrole);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setusers] = useState([]);
  const [filterusers, setfilterusers] = useState([]);
  const [currdeptselection, setcurrdeptselection] = useState("All Departments");
  const [currroleselection, setcurrroleselection] = useState("All Roles");

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get("http://localhost:8000/team_members")
        .then((res) => {
          setusers(res.data);
          setfilterusers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUsers();
  }, []);

  // Filter Logic for Departments
  const departmentFunc = (dept) => {
    setcurrdeptselection(dept);
    if (dept === "All Departments" && currroleselection === "All Roles") {
      setfilterusers(users);
    } else {
      let arr = [];
      let block1 = false;
      let block2 = false;
      users.forEach((user) => {
        if (
          user.department === dept &&
          user.role === currroleselection &&
          !block2
        ) {
          arr.push(user);
          block1 = true;
        } else if (
          user.department === dept &&
          currroleselection === "All Roles" &&
          !block1
        ) {
          arr.push(user);
          block2 = true;
        }
      });
      setfilterusers(arr);
    }
  };

  // Filter Logic for Roles
  const roleFunc = (role) => {
    setcurrroleselection(role);
    if (currdeptselection === "All Departments" && role === "All Roles") {
      setfilterusers(users);
    } else {
      let arr = [];
      let block1 = false;
      let block2 = false;
      users.forEach((user) => {
        if (
          user.department === currdeptselection &&
          user.role === role &&
          !block2
        ) {
          arr.push(user);
          block1 = true;
        } else if (
          currdeptselection === "All Departments" &&
          user.role === role &&
          !block1
        ) {
          arr.push(user);
          block2 = true;
        }
      });
      setfilterusers(arr);
    }
  };
  const viewProfile = (profile) => {
    dispatch({ type: "userprofile", payload: profile });
    navigate("/profile");
  };
  return (
    <Fragment>
      <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-y-auto custom-scrollbar">
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">
                Team Members
              </h1>
              <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-medium">
                Manage your team and their workspace roles
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex gap-2 flex-wrap relative">
              <div className="relative">
                <button
                  onClick={() => dispatch({ type: "teamdept" })}
                  className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-white dark:bg-border-dark px-4 border border-primary dark:border-primary shadow-[0_0_0_1px_rgba(19,91,236,1)] transition-colors"
                >
                  <p className="text-slate-700 dark:text-white text-xs font-semibold">
                    {currdeptselection}
                  </p>
                  <span className="material-symbols-outlined text-sm">
                    expand_more
                  </span>
                </button>
                {toggleteamdept && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-[#111722] border border-primary rounded-lg shadow-2xl z-50 py-1.5 overflow-hidden">
                    <div
                      onClick={() => {
                        departmentFunc("All Departments");
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        All Departments
                      </span>
                      {currdeptselection === "All Departments" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => {
                        departmentFunc("Engineering");
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        Engineering
                      </span>
                      {currdeptselection === "Engineering" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => {
                        departmentFunc("Design");
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        Design
                      </span>
                      {currdeptselection === "Design" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => {
                        departmentFunc("Product");
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        Product
                      </span>
                      {currdeptselection === "Product" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => {
                        departmentFunc("Quality Assurance");
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        Quality Assurance
                      </span>
                    </div>
                    {currdeptselection === "QA" && (
                      <span className="material-symbols-outlined text-primary text-sm">
                        check
                      </span>
                    )}
                    <div
                      onClick={() => {
                        departmentFunc("IT Operations");
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        IT Operations
                      </span>
                      {currdeptselection === "IT Operations" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => {
                        departmentFunc("Support");
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        Support
                      </span>
                      {currdeptselection === "Support" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => {
                        departmentFunc("Infrastructure");
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        Infrastructure
                      </span>
                      {currdeptselection === "Infrastructure" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => {
                        departmentFunc("Analytics");
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        Analytics
                      </span>
                      {currdeptselection === "Analytics" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => {
                        departmentFunc("Security");
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        Security
                      </span>
                      {currdeptselection === "Security" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => dispatch({ type: "teamrole" })}
                  className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-white dark:bg-border-dark px-4 border border-primary dark:border-primary shadow-[0_0_0_1px_rgba(19,91,236,1)] transition-colors"
                >
                  <p className="text-slate-700 dark:text-white text-xs font-semibold">
                    {currroleselection}
                  </p>
                  <span className="material-symbols-outlined text-sm">
                    expand_more
                  </span>
                </button>
                {toggleteamrole && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-[#111722] border border-primary rounded-lg shadow-2xl z-50 py-1.5 overflow-hidden">
                    <div
                      onClick={() => roleFunc("All Roles")}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        All Roles
                      </span>
                      {currroleselection === "All Roles" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => roleFunc("Platform Admin")}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        Platform Admin
                      </span>
                      {currroleselection === "Platform Admin" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => roleFunc("Product Manager")}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        Product Manager
                      </span>
                      {currroleselection === "Product Manager" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => roleFunc("Frontend Developer")}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        Frontend Developer
                      </span>
                      {currroleselection === "Frontend Developer" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => roleFunc("Backend Developer")}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        Backend Developer
                      </span>
                      {currroleselection === "Backend Developer" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => roleFunc("QA Engineer")}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        QA Engineer
                      </span>
                      {currroleselection === "QA Engineer" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => roleFunc("UX Designer")}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        UX Designer
                      </span>
                      {currroleselection === "UX Designer" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => roleFunc("Customer Support Engineer")}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        Customer Support Engineer
                      </span>
                      {currroleselection === "Customer Support Engineer" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => roleFunc("DevOps Engineer")}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        DevOps Engineer
                      </span>
                      {currroleselection === "DevOps Engineer" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => roleFunc("Data Analyst")}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        Data Analyst
                      </span>
                      {currroleselection === "Data Analyst" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                    <div
                      onClick={() => roleFunc("Security Engineer")}
                      className="flex items-center justify-between px-3 py-2 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-medium text-slate-300">
                        Security Engineer
                      </span>
                      {currroleselection === "Security Engineer" && (
                        <span className="material-symbols-outlined text-primary text-sm">
                          check
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="text-slate-500 dark:text-slate-400 text-xs font-medium">
              Showing {filterusers.length} team members
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filterusers.map((user) => {
              return (
                <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark/50 hover:border-primary transition-all group">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="size-20 rounded-full bg-cover bg-center mb-4 ring-4 ring-slate-100 dark:ring-slate-800"
                      data-alt="Team member avatar"
                      style={{
                        backgroundImage: `url(${user.image})`,
                      }}
                    ></div>
                    <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1">
                      {user.name}
                    </h3>
                    <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
                      {user.role}
                    </p>
                    <div className="flex gap-4 mb-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                          Department
                        </span>
                        <span className="text-slate-900 dark:text-white font-semibold">
                          {user.department}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => viewProfile(user)}
                      className="w-full h-9 rounded-lg bg-slate-100 dark:bg-border-dark text-slate-700 dark:text-white text-xs font-bold hover:bg-primary hover:text-white dark:hover:bg-primary transition-all"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Teammembers;
