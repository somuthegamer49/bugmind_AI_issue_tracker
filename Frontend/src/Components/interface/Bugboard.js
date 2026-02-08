import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

const Bugboard = () => {
  const [ticket, setticket] = useState([]);
  const dispatch = useDispatch();
  const storebugboarddata = useSelector((state) => state.storebugboarddata);

  useEffect(() => {
    const getTicket = async () => {
      await axios
        .get("http://localhost:8001/tickets")
        .then((res) => {
          setticket(res.data);
          let todoarr = [];
          let progarr = [];
          let reviarr = [];
          let donearr = [];
          let todocount = 0;
          let proggcount = 0;
          let revicount = 0;
          let donecount = 0;
          res.data.forEach((tik) => {
            if (tik.status === "To Do") {
              todocount += 1;
              todoarr.push(tik);
            } else if (tik.status === "In Progress") {
              proggcount += 1;
              progarr.push(tik);
            } else if (tik.status === "Review") {
              revicount += 1;
              reviarr.push(tik);
            } else if (tik.status === "Done") {
              donecount += 1;
              donearr.push(tik);
            }
          });
          dispatch({
            type: "storebugboarddata",
            payload: {
              todoc: todocount,
              progc: proggcount,
              revic: revicount,
              donec: donecount,
              todoarr: todoarr,
              progarr: progarr,
              reviarr: reviarr,
              donearr: donearr,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTicket();
  }, []);
  return (
    <Fragment>
      <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark">
        <div className="p-6 pb-2">
          <div className="flex flex-wrap gap-2 mb-4"></div>
          <div className="flex flex-wrap justify-between items-end gap-3 mb-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">
                Board
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {ticket.length > 0 &&
                    ticket.map((tik) => {
                      return (
                        <div
                          className="size-6 rounded-full border-2 border-background-dark bg-cover bg-center"
                          data-alt="Team member avatar"
                          style={{
                            backgroundImage: `url(${tik.assigneeImg})`,
                          }}
                        ></div>
                      );
                    })}
                </div>
                <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-medium">
                  {ticket.length === 1
                    ? "Issue"
                    : ticket.length === 0
                      ? ""
                      : "Issues"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-x-auto p-6 flex gap-4 custom-scrollbar">
          <div className="flex flex-col min-w-[300px] w-1/4 h-full bg-slate-100/50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-border-dark/30">
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
                  To Do
                </h3>
                <span className="bg-slate-200 dark:bg-border-dark text-slate-600 dark:text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  {storebugboarddata.todoc}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined text-lg">
                  more_horiz
                </span>
              </button>
            </div>
            {storebugboarddata.todoarr !==undefined &&
              storebugboarddata.todoarr.map((ticket) => {
                return (
                  <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-3 custom-scrollbar">
                    <div className="bg-white dark:bg-card-dark p-4 rounded-lg shadow-sm border border-slate-200 dark:border-border-dark/50 hover:border-primary transition-all cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                          {ticket.ticketid}
                        </span>
                        <span
                          className="material-symbols-outlined text-sm text-red-500"
                          title="High Priority"
                        >
                          keyboard_double_arrow_up
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug mb-4 group-hover:text-primary transition-colors">
                        {ticket.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          <span className="bg-blue-100 dark:bg-blue-500/20 text-600 dark:text-blue-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {ticket.priority}
                          </span>
                        </div>
                        <div
                          className="size-6 rounded-full bg-cover bg-center"
                          data-alt="Assignee avatar"
                          style={{
                            backgroundImage: `url(${ticket.assigneeImg})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex flex-col min-w-[300px] w-1/4 h-full bg-slate-100/50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-border-dark/30">
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">
                  In Progress
                </h3>
                <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  {storebugboarddata.progc}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined text-lg">
                  more_horiz
                </span>
              </button>
            </div>

            {storebugboarddata.progarr!==undefined &&
              storebugboarddata.progarr.map((ticket) => {
                return (
                  <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-3 custom-scrollbar">
                    <div className="bg-white dark:bg-card-dark p-4 rounded-lg shadow-sm border-l-4 border-l-primary border border-slate-200 dark:border-border-dark/50 hover:border-primary transition-all cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                          {ticket.ticketid}
                        </span>
                        <span
                          className="material-symbols-outlined text-sm text-red-500"
                          title="High Priority"
                        >
                          keyboard_double_arrow_up
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug mb-4">
                        {ticket.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          <span className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {ticket.priority}
                          </span>
                        </div>
                        <div
                          className="size-6 rounded-full bg-cover bg-center"
                          data-alt="Assignee avatar"
                          style={{
                            backgroundImage: `url(${ticket.assigneeImg})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex flex-col min-w-[300px] w-1/4 h-full bg-slate-100/50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-border-dark/30">
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-widest">
                  In Review
                </h3>
                <span className="bg-slate-200 dark:bg-border-dark text-slate-600 dark:text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  {storebugboarddata.revic}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined text-lg">
                  more_horiz
                </span>
              </button>
            </div>

            {storebugboarddata.reviarr!==undefined &&
              storebugboarddata.reviarr.map((ticket) => {
                return (
                  <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-3 custom-scrollbar">
                    <div className="bg-white dark:bg-card-dark p-4 rounded-lg shadow-sm border border-slate-200 dark:border-border-dark/50 hover:border-primary transition-all cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 h-1.5 w-full bg-purple-500"></div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                          {ticket.ticketid}
                        </span>
                        <span
                          className="material-symbols-outlined text-sm text-yellow-500"
                          title="Medium Priority"
                        >
                          keyboard_arrow_up
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug mb-4">
                        {ticket.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {ticket.priority}
                          </span>
                        </div>
                        <div
                          className="size-6 rounded-full bg-cover bg-center"
                          data-alt="Assignee avatar"
                          style={{
                            backgroundImage: `url(${ticket.assigneeImg})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex flex-col min-w-[300px] w-1/4 h-full bg-slate-100/50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-border-dark/30 opacity-70">
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-widest">
                  Done
                </h3>
                <span className="bg-green-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  {storebugboarddata.donec}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined text-lg">
                  more_horiz
                </span>
              </button>
            </div>

            {storebugboarddata.donearr!==undefined &&
              storebugboarddata.donearr.map((ticket) => {
                return (
                  <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-3 custom-scrollbar">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-border-dark/30 hover:opacity-100 transition-all cursor-pointer grayscale-[0.5]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter line-through">
                          {ticket.ticketid}
                        </span>
                        <span className="material-symbols-outlined text-sm text-green-500">
                          check_circle
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-snug mb-4 line-through">
                        {ticket.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          <span className="bg-slate-200 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {ticket.priority}
                          </span>
                        </div>
                        <div
                          className="size-6 rounded-full bg-cover bg-center grayscale"
                          data-alt="Assignee avatar"
                          style={{
                            backgroundImage: `url(${ticket.assigneeImg})`,
                          }}
                        ></div>
                      </div>
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

export default Bugboard;
