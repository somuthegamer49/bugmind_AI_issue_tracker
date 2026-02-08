import React, { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Leftpanel = () => {
  const dispatch = useDispatch();
  const [select, setselect] = useState("Bug Board");

  const panelClick = (paneltext) => {
    setselect(paneltext);
      dispatch({ type: "ticketid", payload: null });
  };

  return (
    <Fragment>
      <aside className="w-64 border-r border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark flex flex-col justify-between p-4 shrink-0">
        <div className="flex flex-col gap-6">
          <nav className="flex flex-col gap-1">
            <Link to="/home">
              <div
                onClick={() => panelClick("Bug Board")}
                className={
                  select === "Bug Board"
                    ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary"
                    : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-[#92a4c9] hover:bg-slate-100 dark:hover:bg-border-dark transition-colors cursor-pointer"
                }
              >
                <span className="material-symbols-outlined">view_kanban</span>
                <p
                  className={
                    select === "Bug Board"
                      ? "text-sm font-medium"
                      : "text-sm font-semibold"
                  }
                >
                  Bug Board
                </p>
              </div>
            </Link>
            <Link to="/allissues">
              <div
                onClick={() => panelClick("All Tickets")}
                className={
                  select === "All Tickets"
                    ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary"
                    : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-[#92a4c9] hover:bg-slate-100 dark:hover:bg-border-dark transition-colors cursor-pointer"
                }
              >
                <span className="material-symbols-outlined">list_alt</span>
                <p
                  className={
                    select === "Bug Board"
                      ? "text-sm font-medium"
                      : "text-sm font-semibold"
                  }
                >
                  All Tickets
                </p>
              </div>
            </Link>
            <Link to="/dashboard">
              <div
                onClick={() => panelClick("Dashboards")}
                className={
                  select === "Dashboards"
                    ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary"
                    : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-[#92a4c9] hover:bg-slate-100 dark:hover:bg-border-dark transition-colors cursor-pointer"
                }
              >
                <span className="material-symbols-outlined">dashboard</span>
                <p
                  className={
                    select === "Bug Board"
                      ? "text-sm font-medium"
                      : "text-sm font-semibold"
                  }
                >
                  Dashboards
                </p>
              </div>
            </Link>
            <Link to="/teammembers">
              <div
                onClick={() => panelClick("Team Members")}
                className={
                  select === "Team Members"
                    ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary"
                    : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-[#92a4c9] hover:bg-slate-100 dark:hover:bg-border-dark transition-colors cursor-pointer"
                }
              >
                <span className="material-symbols-outlined">group</span>
                <p
                  className={
                    select === "Bug Board"
                      ? "text-sm font-medium"
                      : "text-sm font-semibold"
                  }
                >
                  Team Members
                </p>
              </div>
            </Link>
            <Link to="/resolutionhub">
              <div
                onClick={() => panelClick("Resolution Hub")}
                className={
                  select === "Resolution Hub"
                    ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary"
                    : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-[#92a4c9] hover:bg-slate-100 dark:hover:bg-border-dark transition-colors cursor-pointer"
                }
              >
                <span className="material-symbols-outlined">memory</span>
                <p
                  className={
                    select === "Bug Board"
                      ? "text-sm font-medium"
                      : "text-sm font-semibold"
                  }
                >
                  AI Resolution Hub
                </p>
              </div>
            </Link>
            <Link to="/sladashboard">
              <div
                onClick={() => panelClick("SLA Dashboard")}
                className={
                  select === "SLA Dashboard"
                    ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary"
                    : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-[#92a4c9] hover:bg-slate-100 dark:hover:bg-border-dark transition-colors cursor-pointer"
                }
              >
                <span className="material-symbols-outlined">dashboard</span>
                <p
                  className={
                    select === "Bug Board"
                      ? "text-sm font-medium"
                      : "text-sm font-semibold"
                  }
                >
                  SLA Dashboard
                </p>
              </div>
            </Link>
          </nav>
        </div>
        <button
          onClick={() => dispatch({ type: "createticket" })}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg h-11 px-4 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          <span className="truncate">Create Ticket</span>
        </button>
      </aside>
    </Fragment>
  );
};

export default Leftpanel;
