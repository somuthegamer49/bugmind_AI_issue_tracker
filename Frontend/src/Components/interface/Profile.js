import React, { useState } from "react";
import { Fragment, useEffect } from "react";
import { useSelector } from 'react-redux';

const Profile = () => {
  const profile = useSelector((state) => state.userprofile);
  const [user,setuser] = useState({})
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const getUsers = () => {
       setuser(profile)
    };
    getUsers();
    const timerId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 10000);

    return () => clearInterval(timerId)
  }, [profile]);
  return (
    <Fragment>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark/50 overflow-hidden shadow-sm">
            <div className="h-24 bg-gradient-to-r from-primary/80 to-blue-600"></div>
            <div className="px-6 pb-8 -mt-12 flex flex-col items-center text-center">
              <div
                className="size-24 rounded-full bg-cover bg-center mb-4 ring-4 ring-white dark:ring-card-dark"
                style={{backgroundImage: `url(${user.image})`}}
              ></div>
              <h2 className="text-slate-900 dark:text-white font-black text-2xl">
                {user.name}
              </h2>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-6">
                {user.role}
              </p>
              <div className="w-full space-y-3 pt-6 border-t border-slate-100 dark:border-border-dark">
                <div className="flex items-center gap-3 text-slate-600 dark:text-[#92a4c9]">
                  <span className="material-symbols-outlined text-lg">
                    mail
                  </span>
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-[#92a4c9]">
                  <span className="material-symbols-outlined text-lg">
                    location_on
                  </span>
                  <span className="text-sm">{user.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-[#92a4c9]">
                  <span className="material-symbols-outlined text-lg">
                    schedule
                  </span>
                  <span className="text-sm">Local time: {time}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white dark:bg-card-dark p-4 rounded-xl border border-slate-200 dark:border-border-dark/50 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Total Tasks Completed
                </p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  1,284
                </p>
              </div>
              <div className="size-10 bg-green-500/10 text-green-500 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined">task_alt</span>
              </div>
            </div>
            <div className="bg-white dark:bg-card-dark p-4 rounded-xl border border-slate-200 dark:border-border-dark/50 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Current Sprint Tasks
                </p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  8
                </p>
              </div>
              <div className="size-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined">rocket_launch</span>
              </div>
            </div>
            <div className="bg-white dark:bg-card-dark p-4 rounded-xl border border-slate-200 dark:border-border-dark/50 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Avg Resolution Time
                </p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  4.2h
                </p>
              </div>
              <div className="size-10 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined">timer</span>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark/50 overflow-hidden flex flex-col h-full">
            <div className="border-b border-slate-200 dark:border-border-dark px-6 pt-2">
              <div className="flex gap-8">
                <button className="pb-4 text-sm font-bold active-tab">
                  Assigned Issues
                </button>
                <button className="pb-4 text-sm font-bold text-slate-500 dark:text-[#92a4c9] hover:text-primary transition-colors">
                  Recent Activity
                </button>
                <button className="pb-4 text-sm font-bold text-slate-500 dark:text-[#92a4c9] hover:text-primary transition-colors">
                  Performance Metrics
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-border-dark/30 border border-slate-100 dark:border-border-dark/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="size-8 rounded-md bg-red-500/10 text-red-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">
                        bug_report
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                          QS-451
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                          Fix memory leak in websocket reconnection
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-[#92a4c9] mt-0.5">
                        Updated 2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-wider">
                      In Progress
                    </span>
                    <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                      P1
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-border-dark/30 border border-slate-100 dark:border-border-dark/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="size-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">
                        bolt
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                          QS-398
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                          Implement OAuth2 middleware for API gateway
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-[#92a4c9] mt-0.5">
                        Updated Yesterday
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-wider">
                      To Do
                    </span>
                    <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                      P2
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-border-dark/30 border border-slate-100 dark:border-border-dark/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="size-8 rounded-md bg-purple-500/10 text-purple-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">
                        auto_awesome
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                          QS-412
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                          Optimization: Database query indexing
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-[#92a4c9] mt-0.5">
                        Updated 3 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 text-[10px] font-bold uppercase tracking-wider">
                      Review
                    </span>
                    <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                      P1
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-border-dark/30 border border-slate-100 dark:border-border-dark/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="size-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">
                        bolt
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                          QS-221
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                          Refactor user authentication service
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-[#92a4c9] mt-0.5">
                        Updated 1 week ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-wider">
                      In Progress
                    </span>
                    <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                      P3
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-3 rounded-lg border border-slate-200 dark:border-border-dark text-slate-600 dark:text-[#92a4c9] text-sm font-bold hover:bg-slate-50 dark:hover:bg-border-dark/50 transition-colors">
                View All Assigned Issues
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
