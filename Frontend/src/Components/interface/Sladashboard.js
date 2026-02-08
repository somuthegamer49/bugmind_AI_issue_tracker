import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

const Sladashboard = () => {
  const dispatch = useDispatch();
  const prioritytickets = useSelector((state) => state.prioritytickets);
  const storebugboarddata = useSelector((state) => state.storebugboarddata);
  const [breached, setbreached] = useState(0);
  const [ticket, setticket] = useState([]);
  const [finticket, setfinticket] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      await axios
        .get("http://localhost:8001/tickets")
        .then((res) => {
          setticket(res.data);
          let lowtik = [];
          let hightik = [];
          let medtik = [];
          let critik = [];
          let tickarr = [];
          let breach = 0;
          res.data.forEach((tick) => {
            const diff =
              new Date(tick.ticketdate).getTime() - new Date().getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
            const mins = Math.floor(diff / (1000 * 60 * 60 * 24));
            if (hours < 0) {
              breach++;
            }
            tickarr.push({ ...tick, hours, mins });
          });
          setfinticket(tickarr);
          setbreached(breach);
          res.data.forEach((ticket) => {
            if (res.data.priority === "Low") {
              lowtik.push(ticket);
            } else if (res.data.priority === "High") {
              hightik.push(ticket);
            } else if (res.data.priority === "Medium") {
              medtik.push(ticket);
            } else if (res.data.priority === "Critical") {
              critik.push(ticket);
            }
          });
          dispatch({
            type: "prioritytickets",
            payload: {
              lowticket: lowtik,
              higticket: hightik,
              mediumticket: medtik,
              criticalticket: critik,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTickets();
  }, []);
  return (
    <Fragment>
      <main className="flex-1 flex flex-col min-w-0 bg-background-dark overflow-auto custom-scrollbar">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-white text-3xl font-black tracking-tight">
                SLA Performance
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Real-time service level agreement monitoring across all active
                modules.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 bg-surface-dark border border-border-dark rounded-lg px-3 py-2">
                <span className="material-symbols-outlined text-slate-400 text-sm">
                  calendar_today
                </span>
                <span className="text-xs font-semibold text-slate-200">
                  Last 7 Days
                </span>
                <span className="material-symbols-outlined text-slate-400 text-sm">
                  expand_more
                </span>
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">
                  file_download
                </span>{" "}
                Export Report
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-surface-dark border border-border-dark rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-critical">
                  report
                </span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                Breached SLAs
              </p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-critical">
                  {breached}
                </span>
                <span className="text-critical/60 text-xs font-medium mb-1.5 flex items-center">
                  <span className="material-symbols-outlined text-sm">
                    trending_up
                  </span>{" "}
                </span>
              </div>
              <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-critical w-[15%]"></div>
              </div>
            </div>
            <div className="bg-surface-dark border border-border-dark rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-warning">
                  warning
                </span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                At Risk
              </p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-warning">
                  {prioritytickets.criticalticket !== undefined
                    ? `${prioritytickets.criticalticket.length}`
                    : ""}
                </span>
                <span className="text-warning/60 text-xs font-medium mb-1.5 flex items-center">
                  <span className="material-symbols-outlined text-sm">
                    trending_flat
                  </span>{" "}
                  No change
                </span>
              </div>
              <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-warning w-[45%]"></div>
              </div>
            </div>
            <div className="bg-surface-dark border border-border-dark rounded-xl p-6 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                  SLA Success Rate
                </p>
                <span className="text-4xl font-black text-success">{`${
                  (storebugboarddata.donec /
                    (storebugboarddata.todoc +
                      storebugboarddata.progc +
                      storebugboarddata.revic +
                      storebugboarddata.donec)) *
                  100
                } %`}</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold">SLA Trends Over Time</h3>
              <div className="flex gap-4 text-[10px] font-bold uppercase text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-primary"></span>{" "}
                  Resolution
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-success"></span>{" "}
                  Response
                </div>
              </div>
            </div>
            <div className="h-64 w-full chart-container relative border-l border-b border-border-dark flex items-end px-4 gap-8">
              <div className="flex-1 bg-primary/20 border-t-2 border-primary relative group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-[10px] hidden group-hover:block whitespace-nowrap">
                  Mon: 88%
                </div>
              </div>
              <div className="flex-1 bg-primary/20 border-t-2 border-primary relative group"></div>
              <div className="flex-1 bg-primary/20 border-t-2 border-primary relative group"></div>
              <div className="flex-1 bg-primary/20 border-t-2 border-primary relative group"></div>
              <div className="flex-1 bg-primary/20 border-t-2 border-primary relative group"></div>
              <div className="flex-1 bg-primary/20 border-t-2 border-primary relative group"></div>
              <div className="flex-1 bg-primary/20 border-t-2 border-primary relative group"></div>
            </div>
            <div className="flex justify-between mt-4 px-4 text-[10px] font-bold text-slate-500 uppercase">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
          <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border-dark bg-slate-800/20">
              <h3 className="text-white text-sm font-bold uppercase tracking-wider">
                Critical SLA Status
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-dark">
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Ticket Id
                    </th>
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Summary
                    </th>
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Assignee
                    </th>
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      SLA Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dark/50">
                  {finticket.length > 0 &&
                    finticket.map((tick) => {
                      return (
                        <tr className="hover:bg-slate-800/30 transition-colors group">
                          <td className="py-4 px-6 font-bold text-slate-400 text-xs group-hover:text-primary cursor-pointer">
                            {tick.ticketid}
                          </td>
                          <td className="py-4 px-6 font-medium text-sm text-slate-200 truncate max-w-xs">
                            {tick.summary.substring(0, 70)}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <div
                                className="size-6 rounded-full bg-cover bg-center"
                                style={{
                                  backgroundImage: `url(${tick.assigneeImg})`,
                                }}
                              ></div>
                              <span className="text-xs text-slate-300">
                                {tick.assignee}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="bg-critical/20 text-critical px-3 py-1 rounded-full text-[10px] font-black uppercase border border-critical/30">
                              {`${tick.hours < 0 ? `${Math.abs(tick.hours)} h Overdue` : `${tick.hours} h Remaining`}`}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Sladashboard;
