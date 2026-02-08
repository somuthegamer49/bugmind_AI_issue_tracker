import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Allissues = () => {
  const togglestatus = useSelector((state) => state.togglestatus);
  const toggleassignee = useSelector((state) => state.toggleassignee);
  const togglepriority = useSelector((state) => state.togglepriority);
  const togglelabel = useSelector((state) => state.togglelabel);
  const createticket = useSelector((state) => state.createticket);
  const [tickets, settickets] = useState([]);
  const [filtertickets, setfiltertickets] = useState([]);
  const [pagenum, setpagenum] = useState([]);
  const [pageval, setpageval] = useState(1);
  const [status, setstatus] = useState("Status");
  const [prioritystat, setprioritystat] = useState("Priority");
  const [labelstat, setlabelstat] = useState("Labels");
  const [users, setusers] = useState([]);
  const [selectedUser, setselectedUser] = useState("Assignee");
  const [searchedUser, setsearchedUser] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTickets = async () => {
      await axios
        .get("http://localhost:8001/tickets")
        .then((res) => {
          settickets(res.data);
          setfiltertickets(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTickets();
    const pageCal = () => {
      let quo = Math.floor(tickets.length / 6);
      let rem = tickets.length % 6;
      let pagearr = [];
      if (rem !== 0) {
        for (let i = 1; i <= quo + 1; i++) {
          pagearr.push(i);
        }
      } else {
        for (let i = 1; i <= quo; i++) {
          pagearr.push(i);
        }
      }
      setpagenum(pagearr);
    };
    pageCal();
  }, [createticket]);

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get("http://localhost:8000/team_members")
        .then((res) => {
          setusers(res.data);
          setsearchedUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUsers();
  }, []);

  useEffect(() => {
    const ticketFilter = () => {
      if (
        status === "Status" &&
        prioritystat === "Priority" &&
        labelstat === "Labels" &&
        selectedUser === "Assignee"
      ) {
        setfiltertickets(tickets);
      } else if (
        status !== "Status" &&
        prioritystat === "Priority" &&
        labelstat === "Labels" &&
        selectedUser === "Assignee"
      ) {
        let arr=[];
        tickets.forEach((ticket)=>{
          if(ticket.status===status){
            arr.push(ticket);
          }
        })
        setfiltertickets(arr)
      }
      else if (
        status === "Status" &&
        prioritystat !== "Priority" &&
        labelstat === "Labels" &&
        selectedUser === "Assignee"
      ) {
        let arr=[];
        tickets.forEach((ticket)=>{
          if(ticket.priority===prioritystat){
            arr.push(ticket);
          }
        })
        setfiltertickets(arr)
      }
      else if (
        status === "Status" &&
        prioritystat === "Priority" &&
        labelstat !== "Labels" &&
        selectedUser === "Assignee"
      ) {
        let arr=[];
        tickets.forEach((ticket)=>{
          if(ticket.ticket_type===labelstat){
            arr.push(ticket);
          }
        })
        setfiltertickets(arr)
      }
      else if (
        status === "Status" &&
        prioritystat === "Priority" &&
        labelstat === "Labels" &&
        selectedUser !== "Assignee"
      ) {
        let arr=[];
        tickets.forEach((ticket)=>{
          if(ticket.assignee===selectedUser){
            arr.push(ticket);
          }
        })
        setfiltertickets(arr)
      }
      else if (
        status !== "Status" &&
        prioritystat !== "Priority" &&
        labelstat === "Labels" &&
        selectedUser === "Assignee"
      ) {
        let arr=[];
        tickets.forEach((ticket)=>{
          if(ticket.status===status && ticket.priority===prioritystat){
            arr.push(ticket);
          }
        })
        setfiltertickets(arr)
      }
      else if (
        status !== "Status" &&
        prioritystat === "Priority" &&
        labelstat !== "Labels" &&
        selectedUser === "Assignee"
      ) {
        let arr=[];
        tickets.forEach((ticket)=>{
          if(ticket.status===status && ticket.ticket_type===labelstat){
            arr.push(ticket);
          }
        })
        setfiltertickets(arr)
      }
      else if (
        status !== "Status" &&
        prioritystat === "Priority" &&
        labelstat === "Labels" &&
        selectedUser !== "Assignee"
      ) {
        let arr=[];
        tickets.forEach((ticket)=>{
          if(ticket.status===status && ticket.assignee===selectedUser){
            arr.push(ticket);
          }
        })
        setfiltertickets(arr)
      }
      else if (
        status === "Status" &&
        prioritystat !== "Priority" &&
        labelstat !== "Labels" &&
        selectedUser === "Assignee"
      ) {
        let arr=[];
        tickets.forEach((ticket)=>{
          if(ticket.priority===prioritystat && ticket.ticket_type===labelstat){
            arr.push(ticket);
          }
        })
        setfiltertickets(arr)
      }
      else if (
        status === "Status" &&
        prioritystat !== "Priority" &&
        labelstat === "Labels" &&
        selectedUser !== "Assignee"
      ) {
        let arr=[];
        tickets.forEach((ticket)=>{
          if(ticket.priority===prioritystat && ticket.assignee===selectedUser){
            arr.push(ticket);
          }
        })
        setfiltertickets(arr)
      }
      else if (
        status === "Status" &&
        prioritystat === "Priority" &&
        labelstat !== "Labels" &&
        selectedUser !== "Assignee"
      ) {
        let arr=[];
        tickets.forEach((ticket)=>{
          if(ticket.ticket_type===labelstat && ticket.assignee===selectedUser){
            arr.push(ticket);
          }
        })
        setfiltertickets(arr)
      }
      else if (
        status !== "Status" &&
        prioritystat !== "Priority" &&
        labelstat !== "Labels" &&
        selectedUser === "Assignee"
      ) {
        let arr=[];
        tickets.forEach((ticket)=>{
          if(ticket.status===status && ticket.priority===prioritystat && ticket.ticket_type===labelstat){
            arr.push(ticket);
          }
        })
        setfiltertickets(arr)
      }
      else if (
        status !== "Status" &&
        prioritystat !== "Priority" &&
        labelstat === "Labels" &&
        selectedUser !== "Assignee"
      ) {
        let arr=[];
        tickets.forEach((ticket)=>{
          if(ticket.status===status && ticket.priority===prioritystat && ticket.assignee===selectedUser){
            arr.push(ticket);
          }
        })
        setfiltertickets(arr)
      }
      else if (
        status === "Status" &&
        prioritystat !== "Priority" &&
        labelstat !== "Labels" &&
        selectedUser !== "Assignee"
      ) {
        let arr=[];
        tickets.forEach((ticket)=>{
          if(ticket.priority===prioritystat && ticket.ticket_type===labelstat && ticket.assignee===selectedUser){
            arr.push(ticket);
          }
        })
        setfiltertickets(arr)
      }
      else if (
        status !== "Status" &&
        prioritystat === "Priority" &&
        labelstat !== "Labels" &&
        selectedUser !== "Assignee"
      ) {
        let arr=[];
        tickets.forEach((ticket)=>{
          if(ticket.status===status && ticket.ticket_type===labelstat && ticket.assignee===selectedUser){
            arr.push(ticket);
          }
        })
        setfiltertickets(arr)
      }
      else if (
        status !== "Status" &&
        prioritystat !== "Priority" &&
        labelstat !== "Labels" &&
        selectedUser !== "Assignee"
      ) {
        let arr=[];
        tickets.forEach((ticket)=>{
          if(ticket.status===status && ticket.priority===prioritystat && ticket.ticket_type===labelstat && ticket.assignee===selectedUser){
            arr.push(ticket);
          }
        })
        setfiltertickets(arr)
      }
    };
    ticketFilter();
  }, [status, prioritystat, labelstat, selectedUser]);

  const pageselect = (page) => {
    setpageval(page);
  };
  const pageRight = () => {
    if (pageval !== null && pageval < pagenum.length) {
      setpageval(pageval + 1);
    }
  };
  const pageLeft = () => {
    if (pageval !== null && pageval > 1) {
      setpageval(pageval - 1);
    }
  };
  const getStatus = (status) => {
    setstatus(status);
  };
  const selectUser = (username) => {
    setselectedUser(username);
  };
  const searchSelectedUser = (e) => {
    let search = e.target.value;
    let arr = [];
    users.forEach((user) => {
      if (user.name.includes(search)) {
        arr.push(user);
      }
    });
    setsearchedUser(arr);
  };
  const selectPriority = (priority) => {
    setprioritystat(priority);
  };
  const selectLabel = (label) => {
    setlabelstat(label);
  };
  const clearFilter = () => {
    setlabelstat("Labels");
    setprioritystat("Priority");
    setstatus("Status");
    setselectedUser("Assignee");
  };
  const getTicket = (id,ticket) => {
    dispatch({type:"ticketid",payload:id})
    dispatch({type:"ticketbody",payload:ticket})
  };
  return (
    <Fragment>
      <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-hidden">
        <div className="p-6 pb-2 shrink-0">
          <div className="flex flex-wrap justify-between items-end gap-3 mb-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">
                Ticket List
              </h1>
              <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-medium">
                {`${tickets.length} Issues Total`}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-slate-200 dark:bg-border-dark text-slate-700 dark:text-white text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-sm">
                  filter_list
                </span>
                View Settings
              </button>
              <button className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-sm">
                  download
                </span>
                Export
              </button>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap items-center pb-4">
            <div className="flex gap-2 items-center">
              <div className="relative">
                <button
                  onClick={() => dispatch({ type: "togglestatus" })}
                  className="flex h-9 items-center justify-center gap-2 rounded-lg bg-primary/20 border border-primary text-primary px-3 transition-colors"
                >
                  <p className="text-xs font-semibold">{status}</p>
                  <span className="material-symbols-outlined text-sm">
                    keyboard_arrow_down
                  </span>
                </button>
                {togglestatus && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-slate-800 border border-primary/50 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="p-2 flex flex-col gap-1">
                      <div
                        onClick={() => getStatus("To Do")}
                        className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer"
                      >
                        <span className="text-xs font-medium text-slate-200">
                          To Do
                        </span>
                      </div>
                      <div
                        onClick={() => getStatus("In Progress")}
                        className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer"
                      >
                        <span className="text-xs font-medium text-slate-200">
                          In Progress
                        </span>
                      </div>
                      <div
                        onClick={() => getStatus("Review")}
                        className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer"
                      >
                        <span className="text-xs font-medium text-slate-200">
                          Review
                        </span>
                      </div>
                      <div
                        onClick={() => getStatus("Done")}
                        className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer"
                      >
                        <span className="text-xs font-medium text-slate-200">
                          Done
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => dispatch({ type: "toggleassignee" })}
                  className="flex h-9 items-center justify-center gap-2 rounded-lg bg-primary/20 border border-primary text-primary px-3 transition-colors"
                >
                  <p className="text-xs font-semibold">{selectedUser}</p>
                  <span className="material-symbols-outlined text-sm">
                    keyboard_arrow_down
                  </span>
                </button>
                {toggleassignee && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800 border border-primary/50 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="p-2 border-b border-slate-700">
                      <div className="flex items-center bg-slate-900 rounded px-2 py-1">
                        <span className="material-symbols-outlined text-sm text-slate-400">
                          search
                        </span>
                        <input
                          onChange={(e) => searchSelectedUser(e)}
                          className="bg-transparent border-none text-xs text-white focus:ring-0 w-full px-2 py-1"
                          placeholder="Find members..."
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="max-h-48 overflow-y-auto custom-scrollbar p-1">
                      {searchedUser.length > 0 &&
                        searchedUser.map((user) => {
                          return (
                            <div
                              onClick={() => selectUser(user.name)}
                              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer transition-colors"
                            >
                              <div
                                className="size-6 rounded-full bg-cover bg-center"
                                style={{
                                  backgroundImage: `url(${user.image})`,
                                }}
                              ></div>
                              <span className="text-xs font-medium text-slate-200">
                                {user.name}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => dispatch({ type: "togglepriority" })}
                  className="flex h-9 items-center justify-center gap-2 rounded-lg bg-primary/20 border border-primary text-primary px-3 transition-colors"
                >
                  <p className="text-xs font-semibold">{prioritystat}</p>
                  <span className="material-symbols-outlined text-sm">
                    keyboard_arrow_down
                  </span>
                </button>
                {togglepriority && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-primary/50 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="p-1">
                      <div
                        onClick={() => selectPriority("High")}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        <span className="material-symbols-outlined text-orange-500 text-lg">
                          keyboard_arrow_up
                        </span>
                        <span className="text-xs font-medium text-slate-200">
                          High
                        </span>
                      </div>
                      <div
                        onClick={() => selectPriority("Medium")}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        <span className="material-symbols-outlined text-yellow-500 text-lg">
                          keyboard_arrow_up
                        </span>
                        <span className="text-xs font-medium text-slate-200">
                          Medium
                        </span>
                      </div>
                      <div
                        onClick={() => selectPriority("Low")}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        <span className="material-symbols-outlined text-blue-500 text-lg">
                          keyboard_arrow_down
                        </span>
                        <span className="text-xs font-medium text-slate-200">
                          Low
                        </span>
                      </div>
                      <div
                        onClick={() => selectPriority("Critical")}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        <span className="material-symbols-outlined text-red-300 text-lg">
                          keyboard_double_arrow_up
                        </span>
                        <span className="text-xs font-medium text-slate-200">
                          Critical
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => dispatch({ type: "togglelabel" })}
                  className="flex h-9 items-center justify-center gap-2 rounded-lg bg-primary/20 border border-primary text-primary px-3 transition-colors"
                >
                  <p className="text-xs font-semibold">{labelstat}</p>
                  <span className="material-symbols-outlined text-sm">
                    keyboard_arrow_down
                  </span>
                </button>
                {togglelabel && (
                  <div className="absolute top-full left-0 mt-2 w-44 bg-slate-800 border border-primary/50 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="p-1">
                      <div
                        onClick={() => selectLabel("Story")}
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        <div className="size-2 rounded-full bg-red-500"></div>
                        <span className="text-xs font-medium text-slate-200">
                          Story
                        </span>
                      </div>
                      <div
                        onClick={() => selectLabel("Task")}
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        <div className="size-2 rounded-full bg-blue-500"></div>
                        <span className="text-xs font-medium text-slate-200">
                          Task
                        </span>
                      </div>
                      <div
                        onClick={() => selectLabel("Bug")}
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        <div className="size-2 rounded-full bg-purple-500"></div>
                        <span className="text-xs font-medium text-slate-200">
                          Bug
                        </span>
                      </div>
                      <div
                        onClick={() => selectLabel("Epic")}
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        <div className="size-2 rounded-full bg-green-500"></div>
                        <span className="text-xs font-medium text-slate-200">
                          Epic
                        </span>
                      </div>
                      <div
                        onClick={() => selectLabel("Improvement")}
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        <div className="size-2 rounded-full bg-pink-500"></div>
                        <span className="text-xs font-medium text-slate-200">
                          Improvement
                        </span>
                      </div>
                      <div
                        onClick={() => selectLabel("Performance")}
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        <div className="size-2 rounded-full bg-yellow-500"></div>
                        <span className="text-xs font-medium text-slate-200">
                          Performance
                        </span>
                      </div>
                      <div
                        onClick={() => selectLabel("Security Bug")}
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        <div className="size-2 rounded-full bg-gray-500"></div>
                        <span className="text-xs font-medium text-slate-200">
                          Security Bug
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700"></div>
            <button
              onClick={() => clearFilter()}
              className="text-slate-500 dark:text-slate-400 text-xs font-bold hover:text-primary transition-colors"
            >
              Clear filters
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto px-6 pb-6 custom-scrollbar">
          <div className="min-w-[800px] border border-slate-200 dark:border-border-dark rounded-xl bg-white dark:bg-surface-dark overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-border-dark bg-slate-50/50 dark:bg-slate-900/40">
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest w-24">
                    ID
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Summary
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest w-32">
                    Status
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest w-32">
                    Assignee
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest w-24">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest w-32">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-border-dark/50">
                {filtertickets.length > 0 &&
                  filtertickets.map((ticket, ind) => {
                    if (
                      (pageval - 1) * 6 + 1 >= ind + 1 ||
                      pageval * 6 <= ind + 1
                    ) {
                      return (
                        <tr onClick={()=>getTicket(ticket.id,ticket)} className="table-row-hover transition-colors cursor-pointer group">
                          <td className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                            {ticket.ticketid}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">
                            {ticket.summary}
                          </td>
                          <td className="px-4 py-4">
                            <span className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 text-[10px] font-bold px-2 py-1 rounded uppercase">
                              {ticket.status === "To Do"
                                ? `To Do`
                                : ticket.status === "In Progress"
                                  ? `In Progress`
                                  : ticket.status === "Review"
                                    ? `Review`
                                    : ticket.status === "Done"
                                      ? `Done`
                                      : null}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <div
                                className="size-6 rounded-full bg-cover bg-center"
                                style={{
                                  backgroundImage: `url(${ticket.assigneeImg})`,
                                }}
                              ></div>
                              <span className="text-xs text-slate-600 dark:text-slate-400">
                                {ticket.assignee}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div
                              className={
                                ticket.priority === "High"
                                  ? "flex items-center gap-1 text-red-500"
                                  : ticket.priority === "Medium"
                                    ? "flex items-center gap-1 text-yellow-500"
                                    : ticket.priority === "Low"
                                      ? "flex items-center gap-1 text-blue-500"
                                      : "flex items-center gap-1 text-red-500"
                              }
                            >
                              <span className="material-symbols-outlined text-sm">
                                {ticket.priority === "High"
                                  ? `keyboard_double_arrow_up`
                                  : ticket.priority === "Meduim"
                                    ? `keyboard_double_arrow_up`
                                    : ticket.priority === "Low"
                                      ? `keyboard_arrow_down`
                                      : `keyboard_double_arrow_up`}
                              </span>
                              <span className="text-[10px] font-bold uppercase">
                                {ticket.priority}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-xs text-slate-500 dark:text-slate-400">
                            {ticket.ticketdate}
                          </td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-slate-200 dark:border-border-dark flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/20">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {filtertickets.length > 0 &&
                  `Showing 1 to ${filtertickets.length >= 6 ? "6" : filtertickets.length} of ${filtertickets.length} issues`}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => pageLeft()}
                  className="flex items-center justify-center rounded-lg h-8 w-8 bg-white dark:bg-border-dark text-slate-600 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-sm">
                    chevron_left
                  </span>
                </button>
                {pagenum.length > 0 &&
                  pagenum.map((page) => {
                    return (
                      <button
                        onClick={() => pageselect(page)}
                        className={
                          pageval === page
                            ? "flex items-center justify-center rounded-lg h-8 px-3 bg-primary text-white text-xs font-bold"
                            : "flex items-center justify-center rounded-lg h-8 px-3 bg-white dark:bg-border-dark text-slate-600 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        }
                      >
                        {page}
                      </button>
                    );
                  })}
                <button
                  onClick={() => pageRight()}
                  className="flex items-center justify-center rounded-lg h-8 w-8 bg-white dark:bg-border-dark text-slate-600 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Allissues;
