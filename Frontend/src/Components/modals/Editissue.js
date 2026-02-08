import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Editissue = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ticketbody = useSelector((state) => state.ticketbody);
  const newticket = useSelector((state) => state.newticket);
  const ticketid = useSelector((state) => state.ticketid);
  const aiticket = useSelector((state) => state.aiticket);
  const userid = useSelector((state) => state.userid);
  const userinfo = useSelector((state) => state.userinfo);
  const [ticketinfo, setticketinfo] = useState(ticketbody);
  const [datedifference, setdatedifference] = useState(0);
  const [summary, setsummary] = useState(ticketinfo.summary);
  const [description, setdescription] = useState(ticketinfo.description);
  const [rca, setrca] = useState(newticket.rca);
  const [status, setstatus] = useState(ticketinfo.status);
  const [codefix, setcodefix] = useState(newticket.codefix);
  const [assignee, setassignee] = useState([]);
  const [assignToggle, setassignToggle] = useState(false);
  const [comment, setcomment] = useState(ticketinfo.comments);
  const [commentmsg, setcommentmsg] = useState("");
  const [commentStat, setcommentStat] = useState("No Comment");
  const [submitState, setsubmitState] = useState(false);
  const [submitMessage, setsubmitMessage] = useState("");
  const [aiTicketStat, setaiTicketStat] = useState(false);
  const [deleteTicket, setdeleteTicket] = useState(false);
  const [selectedAssignee, setselectedAssignee] = useState({
    assignee: ticketinfo.assignee,
    assigneeImg: ticketinfo.assigneeImg,
    assigneeId: ticketinfo.assigneeId,
  });
  const [months, setmonths] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  useEffect(() => {
    const getTickets = async () => {
      await axios
        .get(`http://localhost:8001/tickets/${ticketbody.id}`)
        .then((res) => {
          setticketinfo(res.data);
          if (res.data.rca !== "") {
            setrca(res.data.rca);
          }
          if (res.data.codefix !== "") {
            setcodefix(res.data.codefix);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTickets();
  }, [submitMessage, commentStat]);
  useEffect(() => {
    if (ticketinfo.updatetime !== "") {
      const diff = Math.abs(
        new Date(ticketinfo.updatetime).getTime() - new Date().getTime(),
      );
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      setdatedifference(hours);
    } else {
      setdatedifference(0);
    }
    if (userid === ticketinfo.assigneeId) {
      setassignee([
        {
          assignee: ticketinfo.assignee,
          assigneeImg: ticketinfo.assigneeImg,
          assigneeId: ticketinfo.assigneeId,
        },
      ]);
    } else {
      setassignee([
        {
          assignee: ticketinfo.assignee,
          assigneeImg: ticketinfo.assigneeImg,
          assigneeId: ticketinfo.assigneeId,
        },
        {
          assignee: userinfo.name,
          assigneeImg: userinfo.image,
          assigneeId: userinfo.id,
        },
      ]);
    }
  }, [ticketinfo, userid, userinfo]);

  // Handlers to get user inputs
  const getSummary = (e) => {
    setsummary(e.target.value);
  };
  const getDesc = (e) => {
    setdescription(e.target.value);
  };
  const getRCA = (e) => {
    setrca(e.target.value);
  };
  const getStatus = (e) => {
    setstatus(e.target.value);
  };
  const getAssignee = (assignee) => {
    setselectedAssignee(assignee);
  };
  const getCode = (e) => {
    setcodefix(e.target.value);
  };
  const userComment = (e) => {
    setcommentmsg(e.target.value);
  };
  const assignToggleFunc = () => {
    setassignToggle(!assignToggle);
  };
  // Handlers to get user inputs ends

  // Handler to add ticket to AI Resolution Hub
  const AIResolveFunc = () => {
    if (ticketid !== aiticket.id) {
      dispatch({ type: "aiticket", payload: ticketinfo });
      setaiTicketStat("Ticket Added to AI Resolution Hub");
    } else {
      setaiTicketStat("Ticket Already Added");
    }
    setTimeout(() => {
      setaiTicketStat("");
    }, 2000);
  };

  // Handler to add comments
  const setcommentFunc = (e) => {
    e.preventDefault();
    const saveComment = async () => {
      if (commentmsg.trim().length > 0) {
        let comm = {
          commentImg: userinfo.image,
          commentor: userinfo.name,
          message: commentmsg,
        };
        let data = {
          comments: [...comment, comm],
        };
        await axios
          .patch(`http://localhost:8001/tickets/${ticketbody.id}`, data, {
            "Content-Type": "application/json",
          })
          .then((res) => {
            setcommentStat("Successful");
          })
          .catch((err) => {
            setcommentStat("");
          });
      } else {
        setcommentStat("");
      }
      setTimeout(() => {
        setcommentStat("No Comment");
      }, 2000);
    };
    saveComment();
  };

  // Handler to delete ticket modal
  const delTicket = (e) => {
    setdeleteTicket(true);
  };

  // Handler to Confirm Delete Ticket
  const delPermanent = (e) => {
    e.preventDefault();
    const delTick = async () => {
      await axios
        .delete(`http://localhost:8001/tickets/${ticketinfo.id}`)
        .then((res) => {
          console.log(res.data);
          dispatch({ type: "ticketid", payload: null });
          dispatch({ type: "ticketinfo", payload: {} });
          dispatch({ type: "newticket", payload: {} });
          dispatch({ type: "aiticket", payload: {} });
          navigate("/allissues");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    delTick();
  };

  // Handler to cancel Delete Ticket Operation
  const cancelDelTicket = ()=>{
    setdeleteTicket(false);
  }
  // Handler for Updating ticket to backend
  const updateTicketFunc = (e) => {
    e.preventDefault();
    setsubmitState(true);
    if (rca !== undefined && rca.trim().length > 0) {
      let data = {
        updatetime: `${new Date()}`,
        rca: rca,
        codefix: codefix,
        status: status,
      };
      const updateTicketInfo = async () => {
        await axios
          .patch(`http://localhost:8001/tickets/${ticketinfo.id}`, data, {
            "Content-Type": "application/json",
          })
          .then((res) => {
            if (res.status === 200) {
              setsubmitMessage("Update Successfull");
              dispatch({ type: "ticketid", payload: null });
              dispatch({ type: "ticketinfo", payload: {} });
              dispatch({ type: "newticket", payload: {} });
              dispatch({ type: "aiticket", payload: {} });
              navigate("/allissues");
            } else {
              setsubmitMessage("Unknown Error");
            }
          })
          .catch((err) => {
            setsubmitMessage("Could Not Update Ticket");
          });
      };
      updateTicketInfo();
    }
  };
  return (
    <Fragment>
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-background-light dark:bg-background-dark p-8">
        {deleteTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div
              className="w-full max-w-md bg-dark-800 border border-slate-700 rounded-custom shadow-2xl p-8 transform animate-in fade-in zoom-in duration-200"
              data-purpose="delete-confirmation-modal"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-rose-500"
                    fill="none"
                    stroke="currentColor"
                    viewbox="0 0 24 24"
                  >
                    <path
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Delete Ticket?
                </h2>
                <p className="text-slate-400">
                  This action will permanently delete issue{" "}
                  <span className="text-slate-200 font-semibold">
                    {ticketinfo.ticketid}
                  </span>{" "}
                  and all its associated logs. This cannot be undone.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={(e) => delPermanent(e)}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-custom transition-all active:scale-[0.98] shadow-lg shadow-rose-900/20"
                  data-purpose="confirm-action"
                  id="confirm-delete-btn"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={()=>cancelDelTicket()}
                  className="w-full py-3 bg-transparent hover:bg-dark-700 text-slate-400 hover:text-white font-medium rounded-custom transition-colors"
                  data-purpose="cancel-action"
                  id="cancel-delete-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Edit Ticket
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {`Created on ${months[ticketinfo.ticketmonth - 1]} ${ticketinfo.ticketcreateday}, ${ticketinfo.ticketyear} ${datedifference !== 0 ? `• Last updated ${datedifference} hours ago` : ""}`}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => AIResolveFunc()}
                className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
              >
                AI Resolve
              </button>
              <button
                disabled={
                  selectedAssignee.assigneeId !== userinfo.id ? true : false
                }
                onClick={(e) => delTicket(e)}
                className="flex items-center gap-2 rounded-lg h-9 px-4 bg-slate-200 dark:bg-border-dark text-slate-700 dark:text-white text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">
                  delete
                </span>{" "}
                Delete
              </button>
            </div>
            {aiTicketStat !== "" && (
              <div style={{ color: "green" }}>{aiTicketStat}</div>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Summary
                </label>
                <input
                  onChange={(e) => getSummary(e)}
                  className="w-full bg-white dark:bg-card-dark border-slate-200 dark:border-border-dark rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  type="text"
                  value={summary}
                  disabled={
                    selectedAssignee.assigneeId !== userinfo.id ||
                    status === "Done"
                      ? true
                      : false
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <div className="border border-slate-200 dark:border-border-dark rounded-xl overflow-hidden bg-white dark:bg-card-dark">
                  <textarea
                    onChange={(e) => getDesc(e)}
                    className="w-full bg-transparent border-none px-4 py-3 text-slate-900 dark:text-white focus:ring-0 resize-none outline-none text-sm leading-relaxed"
                    rows="8"
                    value={description}
                    disabled={
                      selectedAssignee.assigneeId !== userinfo.id ||
                      status === "Done"
                        ? true
                        : false
                    }
                  ></textarea>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Logs
                </label>
                <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-slate-400 border border-border-dark h-40 overflow-y-auto custom-scrollbar">
                  <div className="space-y-1">
                    <p>{ticketinfo.logs}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Code Snippet Reference
                </label>
                <div className="bg-[#0f172a] rounded-xl p-4 font-mono text-sm text-blue-300 border border-border-dark">
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-800"></div>
                  <textarea
                    onChange={(e) => getCode(e)}
                    className="w-full bg-transparent border-none px-4 py-3 text-slate-900 dark:text-white focus:ring-0 resize-none outline-none text-sm leading-relaxed"
                    rows="8"
                    value={codefix !== undefined ? codefix : ""}
                    disabled={
                      selectedAssignee.assigneeId !== userinfo.id ||
                      status === "Done"
                        ? true
                        : false
                    }
                  ></textarea>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Root Cause Analysis
                </label>
                <textarea
                  onChange={(e) => getRCA(e)}
                  className="w-full bg-white dark:bg-card-dark border-slate-200 dark:border-border-dark rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm leading-relaxed"
                  placeholder="Identify the underlying cause of this issue..."
                  rows="4"
                  value={rca !== undefined ? rca : ""}
                  disabled={
                    selectedAssignee.assigneeId !== userinfo.id ||
                    status === "Done"
                      ? true
                      : false
                  }
                ></textarea>
              </div>
              <div className="flex justify-end items-center gap-3 py-2">
                <button
                  disabled={
                    selectedAssignee.assigneeId !== userinfo.id ||
                    status === "Done"
                      ? true
                      : false
                  }
                  onClick={(e) => updateTicketFunc(e)}
                  className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
                >
                  Update Ticket
                </button>
              </div>
              {rca !== undefined && rca.trim().length === 0 && submitState && (
                <span style={{ color: "red" }}>
                  Provide Root Cause Analysis
                </span>
              )}
              {submitMessage !== "" && <span>{submitMessage}</span>}
              <div className="pt-6 border-t border-slate-200 dark:border-border-dark space-y-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Activity &amp; Comments
                </h3>
                <div className="space-y-4">
                  {comment.length > 0 &&
                    comment.map((comments) => {
                      return (
                        <div className="flex gap-4">
                          <div
                            className="size-8 rounded-full bg-cover shrink-0"
                            style={{
                              backgroundImage: `url(${comments.commentImg})`,
                            }}
                          ></div>
                          <div className="flex-1 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-bold">
                                {comments.commentor}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                              {comments.message}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  <div className="flex gap-4">
                    <div
                      className="size-8 rounded-full bg-cover shrink-0"
                      style={{
                        backgroundImage: `url(${userinfo.assigneeImg})`,
                      }}
                    ></div>
                    <div className="flex-1 relative">
                      <textarea
                        style={{
                          border: commentStat === "" ? "1px solid red" : null,
                        }}
                        onChange={(e) => userComment(e)}
                        className="w-full bg-white dark:bg-card-dark border-slate-200 dark:border-border-dark rounded-xl px-4 py-3 pr-20 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none h-12"
                        placeholder="Add a comment..."
                      ></textarea>
                      <button
                        onClick={(e) => setcommentFunc(e)}
                        className="absolute right-2 top-2 px-3 py-1 bg-primary text-white text-xs font-bold rounded-lg"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl p-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      disabled={
                        selectedAssignee.assigneeId !== userinfo.id
                          ? true
                          : false
                      }
                      onChange={(e) => getStatus(e)}
                      className="w-full appearance-none bg-slate-100 dark:bg-border-dark border-none rounded-lg px-4 py-2.5 text-sm font-bold text-primary focus:ring-2 focus:ring-primary"
                    >
                      <option
                        value={"To Do"}
                        selected={ticketinfo.status === "To Do"}
                      >
                        TO DO
                      </option>
                      <option
                        value={"In Progress"}
                        selected={ticketinfo.status === "In Progress"}
                      >
                        IN PROGRESS
                      </option>
                      <option
                        value={"Review"}
                        selected={ticketinfo.status === "Review"}
                      >
                        REVIEW
                      </option>
                      <option
                        value={"Done"}
                        selected={ticketinfo.status === "Done"}
                      >
                        DONE
                      </option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-slate-500">
                      expand_more
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Priority
                  </label>
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-border-dark rounded-lg px-4 py-2.5">
                    <span className="material-symbols-outlined text-red-500 text-lg">
                      keyboard_double_arrow_up
                    </span>
                    <span className="text-sm font-medium">High Priority</span>
                  </div>
                </div>
                <div className="space-y-2 relative">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Assignee
                  </label>
                  <div
                    onClick={() => assignToggleFunc()}
                    className="flex items-center gap-3 bg-slate-100 dark:bg-border-dark rounded-lg px-3 py-2 cursor-pointer hover:ring-1 hover:ring-primary transition-all"
                  >
                    <div
                      className="size-7 rounded-full bg-cover"
                      style={{
                        backgroundImage: `url(${selectedAssignee.assigneeImg})`,
                      }}
                    ></div>
                    <span className="text-sm font-medium">
                      {selectedAssignee.assignee}
                    </span>
                    <span className="material-symbols-outlined text-slate-500 ml-auto">
                      expand_more
                    </span>
                  </div>
                  {assignToggle && (
                    <div className="absolute z-50 mt-1 w-full bg-card-dark border border-border-dark rounded-xl shadow-2xl py-2 overflow-hidden">
                      {assignee.map((assign) => {
                        return (
                          <div
                            onClick={() => getAssignee(assign)}
                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                          >
                            <div
                              className="size-7 rounded-full bg-cover"
                              style={{
                                backgroundImage: `url(${assign.assigneeImg})`,
                              }}
                            ></div>
                            <span className="text-sm font-medium">
                              {`${assign.assigneeId === userinfo.id ? `Self` : `${assign.assignee}`}`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Labels
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ticketinfo.labels.length > 0 &&
                      ticketinfo.labels.map((label) => {
                        return (
                          <span className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                            {label}{" "}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl p-6">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4 block">
                  Attachments
                </label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="aspect-square bg-slate-100 dark:bg-border-dark rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 group relative">
                    {ticketinfo.image.map((img) => {
                      return (
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${img})`,
                          }}
                        ></div>
                      );
                    })}
                  </div>
                  <button className="aspect-square border-2 border-dashed border-slate-200 dark:border-border-dark rounded-lg flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all"></button>
                </div>
              </div>
              <div className="bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-border-dark/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-sm text-slate-500">
                    terminal
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    System Logs
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">ID</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">
                      {ticketinfo.ticketid}
                    </span>
                  </div>

                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Story Points</span>
                    <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-slate-700 dark:text-slate-300">
                      {ticketinfo.story_points}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Editissue;
