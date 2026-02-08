import React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const storebugboarddata = useSelector((state) => state.storebugboarddata);
  return (
    <Fragment>
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-background-dark">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-white text-3xl font-black tracking-tight mb-2">
              Project Analytics
            </h1>
            <p className="text-[#92a4c9] text-sm">
              Real-time performance metrics for{" "}
              <span className="text-white font-medium">Quantum Software</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-border-dark border border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-sm">
                calendar_today
              </span>
              Last 14 days
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/10">
              <span className="material-symbols-outlined text-sm">
                ios_share
              </span>
              Export PDF
            </button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 grid grid-cols-4 gap-4">
            <div className="bg-card-dark border border-border-dark p-4 rounded-xl">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                Open Issues
              </p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-bold text-white">
                  {storebugboarddata.todoc +
                    storebugboarddata.progc +
                    storebugboarddata.revic}
                </h3>
                <span className="text-red-400 text-xs font-medium mb-1 flex items-center">
                  <span className="material-symbols-outlined text-xs">
                    arrow_upward
                  </span>{" "}
                </span>
              </div>
            </div>
            <div className="bg-card-dark border border-border-dark p-4 rounded-xl">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                Resolved
              </p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-bold text-white">
                  {storebugboarddata.donec}
                </h3>
                <span className="text-green-400 text-xs font-medium mb-1 flex items-center">
                  <span className="material-symbols-outlined text-xs">
                    arrow_upward
                  </span>{" "}
                </span>
              </div>
            </div>
            <div className="bg-card-dark border border-border-dark p-4 rounded-xl">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                Cycle Time
              </p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-bold text-white">{}</h3>
                <span className="text-green-400 text-xs font-medium mb-1 flex items-center">
                  <span className="material-symbols-outlined text-xs">
                    arrow_downward
                  </span>{" "}
                </span>
              </div>
            </div>
            <div className="bg-card-dark border border-border-dark p-4 rounded-xl">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                Sprint Progress
              </p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-bold text-white">{}</h3>
                <div className="flex-1 h-2 bg-slate-700 rounded-full mb-2 ml-4 relative">
                  <div className="absolute inset-y-0 left-0 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 bg-card-dark border border-border-dark rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold">Issue Status</h3>
              <button className="text-slate-500 hover:text-white">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <div className="flex justify-center items-center py-4">
                <div className="text-center">
                  <p className="text-2xl font-black text-white">
                    {storebugboarddata.todoc +
                      storebugboarddata.progc +
                      storebugboarddata.revic +
                      storebugboarddata.donec}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Total
                  </p>
                </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-300">To Do</span>
                </div>
                <span className="text-sm font-bold text-white">
                  {`${(storebugboarddata.todoc /
                    (storebugboarddata.todoc +
                      storebugboarddata.progc +
                      storebugboarddata.revic +
                      storebugboarddata.donec)) *
                    100} %`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-300">Review</span>
                </div>
                <span className="text-sm font-bold text-white">
                  {`${(storebugboarddata.revic /
                    (storebugboarddata.todoc +
                      storebugboarddata.progc +
                      storebugboarddata.revic +
                      storebugboarddata.donec)) *
                    100} %`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-300">In Progress</span>
                </div>
                <span className="text-sm font-bold text-white">
                  {`${(storebugboarddata.progc /
                    (storebugboarddata.todoc +
                      storebugboarddata.progc +
                      storebugboarddata.revic +
                      storebugboarddata.donec)) *
                    100} %`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-300">Done</span>
                </div>
                <span className="text-sm font-bold text-white">
                  {`${(storebugboarddata.donec /
                    (storebugboarddata.todoc +
                      storebugboarddata.progc +
                      storebugboarddata.revic +
                      storebugboarddata.donec)) *
                    100} %`}
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 bg-card-dark border border-border-dark rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold">Team Velocity</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary"></span>
                  <span className="text-xs text-slate-400">Committed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-blue-400"></span>
                  <span className="text-xs text-slate-400">Completed</span>
                </div>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-4 px-2">
              <div className="flex-1 flex flex-col items-center gap-1 group">
                <div className="w-full flex justify-center items-end gap-1 h-full">
                  <div className="w-4 bg-primary rounded-t-sm"></div>
                  <div className="w-4 bg-blue-400 rounded-t-sm"></div>
                </div>
                <span className="text-[10px] text-slate-500 font-bold">
                  Sprint 10
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 group">
                <div className="w-full flex justify-center items-end gap-1 h-full">
                  <div className="w-4 bg-primary rounded-t-sm"></div>
                  <div className="w-4 bg-blue-400 rounded-t-sm"></div>
                </div>
                <span className="text-[10px] text-slate-500 font-bold">
                  Sprint 11
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 group">
                <div className="w-full flex justify-center items-end gap-1 h-full">
                  <div className="w-4 bg-primary rounded-t-sm"></div>
                  <div className="w-4 bg-blue-400 rounded-t-sm"></div>
                </div>
                <span className="text-[10px] text-slate-500 font-bold">
                  Sprint 12
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 group">
                <div className="w-full flex justify-center items-end gap-1 h-full">
                  <div className="w-4 bg-primary rounded-t-sm"></div>
                  <div className="w-4 bg-blue-400 rounded-t-sm"></div>
                </div>
                <span className="text-[10px] text-slate-500 font-bold">
                  Sprint 13
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 group">
                <div className="w-full flex justify-center items-end gap-1 h-full">
                  <div className="w-4 bg-primary rounded-t-sm"></div>
                  <div className="w-4 bg-blue-400 rounded-t-sm"></div>
                </div>
                <span className="text-[10px] text-slate-500 font-bold">
                  Sprint 14
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 group">
                <div className="w-full flex justify-center items-end gap-1 h-full">
                  <div className="w-4 bg-primary rounded-t-sm"></div>
                  <div className="w-4 bg-blue-400 rounded-t-sm"></div>
                </div>
                <span className="text-[10px] text-slate-500 font-bold">
                  Sprint 15
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Dashboard;
