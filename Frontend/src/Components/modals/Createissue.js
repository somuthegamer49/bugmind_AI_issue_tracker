import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const Createissue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [base64IMG, setBase64IMG] = useState([]);
  const [log, setlog] = useState("");
  const [code, setcode] = useState("");
  const [bug, setbug] = useState("Story");
  const [summary, setsummary] = useState("");
  const [description, setdescription] = useState("");
  const [priority, setpriority] = useState("High");
  const [users, setusers] = useState([]);
  const [searchUsers, setsearchUsers] = useState([]);
  const [userid, setuserid] = useState(null);
  const [storypoints, setstorypoints] = useState(0);
  const [assignee, setassignee] = useState("Unassigned");
  const [labels, setlabels] = useState(new Set([]));
  const [labelItems, setlabelItems] = useState([]);
  const [labelVal, setlabelVal] = useState("");
  const [assigneeToggle, setassigneeToggle] = useState(false);
  const [checkSubmit, setcheckSubmit] = useState(false);
  const [files, setfiles] = useState([]);
  const fileInputRef = useRef(null);
  const [assigneeImg, setassigneeImg] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA5u3Z9leZ6E3jG8hZAEx6gP0VWtld3TpWqwLqIr1_DlVvxb0t7z_DqoVnSsZBIbXHLbuVa5EOwUALeuPFviwAWSpE-j75oiQZx2gOXdDyBizY9uz_p0X6yUzwjq91n3KKhYgdfv5Fhu2NRFamIpgcR6atMGhSjllmyqlamvPucpCGynln9zEvmqWmy9O6Dd3yRfdR6h3Eb1ch8FanRaNAMVDr3NCxYIyI1La8HNRXmFAZ4dRUKgookLzkUKfhhNmrml4XYmktnHHQg",
  );
  // Reading Users from backend
  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get("http://localhost:8000/team_members")
        .then((res) => {
          setusers(res.data);
          setsearchUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUsers();
  }, []);

  // Taking Input Function series

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const attachScreenshot = async (e) => {
    const files = e.target.files;
    if (!files) return;
    const filesArray = Array.from(files);
    let base64Results = [];
    for (const file of filesArray) {
      try {
        const base64 = await convertToBase64(file);
        base64Results.push(base64);
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
    }
    setBase64IMG(base64Results, [...base64IMG]);
    let filearr = [];
    filesArray.forEach((file) => {
      filearr.push(file.name);
    });
    setfiles(filearr, [...files]);
  };
  const getLogs = (e) => {
    const logs = e.target.value;
    setlog(logs);
  };
  const getCodeSnippet = (e) => {
    let codes = e.target.value;
    codes = JSON.stringify(codes);
    setcode(codes);
  };
  const getBug = (e) => {
    const bugs = e.target.value;
    setbug(bugs);
  };
  const getSummary = (e) => {
    const summ = e.target.value;
    setsummary(summ);
  };
  const getDesc = (e) => {
    const desc = e.target.value;
    setdescription(desc);
  };
  const getPriority = (e) => {
    const prio = e.target.value;
    setpriority(prio);
  };
  const getUser = (user) => {
    setuserid(user.id);
    setassignee(user.name);
    setassigneeImg(user.image);
  };
  const getStoryPoints = (e) => {
    const stpoints = e.target.value;
    if (stpoints === "") {
      setstorypoints(0);
    } else {
      setstorypoints(stpoints);
    }
  };
  const storeLabel = (e) => {
    const label = e.target.value;
    setlabelVal(label);
  };
  const getLabel = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveLabel();
    }
  };
  const saveLabel = () => {
    let st = "";
    st += labelVal.charAt(0);
    if (labelVal.length > 0 && st !== " ") {
      const updatedLabel = new Set([...labels]).add(labelVal);
      setlabels(updatedLabel);
      setlabelItems([...updatedLabel]);
      setlabelVal("");
    }
  };
  // Remove Label
  const remLabel = (label) => {
    const newLabel = new Set(labels);
    newLabel.delete(label);
    setlabels(newLabel);
    setlabelItems([...newLabel]);
  };
  // Remove Label Ends

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  // Taking Input Function series Ends

  // Switches
  const assigneeToggleFunc = () => {
    setassigneeToggle(!assigneeToggle);
  };
  // Search Members
  const searchMembers = (e) => {
    const member = e.target.value;
    let arr = [];
    users.forEach((user) => {
      if (user.name.includes(member)) {
        arr.push(user);
      }
    });
    setsearchUsers(arr);
  };
  // Submit and Create Ticket Handler
  const submitTicket = (e) => {
    e.preventDefault();
    setcheckSubmit(true);
    if (
      bug !== "" &&
      summary !== "" &&
      description !== "" &&
      assignee !== "" &&
      priority !== ""
    ) {
      const unique_id = uuid();
      const small_id = unique_id.slice(0, 8);
      const ticketday = new Date().getDay();
      let ticketdate = `${new Date()}`;
      const ticketmonth = new Date().getMonth();
      const ticketyear = new Date().getFullYear();
      const ticketcreateday = new Date().getDate();

      if (priority === "High") {
        ticketdate=ticketdate+2
      } else if (priority === "Low") {
        ticketdate=ticketdate+4
      } else if (priority === "Medium") {
        ticketdate=ticketdate+3
      } else if (priority === "Critical") {
        ticketdate=ticketdate+1
      }
      let data = {
        ticketid: small_id,
        ticket_type: bug,
        summary: summary,
        description: description,
        assignee: assignee,
        assigneeId: userid,
        assigneeImg: assigneeImg,
        priority: priority,
        labels: labelItems,
        story_points: storypoints,
        image: base64IMG,
        logs: log,
        code: code,
        seen: false,
        status: "To Do",
        ticketdate: ticketdate,
        ticketmonth: `${ticketmonth}`,
        ticketyear: `${ticketyear}`,
        ticketday: `${ticketday}`,
        ticketcreateday:`${ticketcreateday}`,
        updatetime: "",
        comments: [],
        rca: "",
        codefix: ""
      };
      const postTicket = async () => {
        await axios
          .post("http://localhost:8001/tickets", data, {
            "Content-Type": "application/json",
          })
          .then((res) => {
            dispatch({ type: "createticket" });
            navigate("/allissues");
          })
          .catch((err) => {
            console.log(err);
          });
      };
      postTicket();
    }
  };

  return (
    <Fragment>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 flex items-center justify-center p-4">
        <div className="bg-surface-dark w-full max-w-3xl max-h-[90vh] rounded-xl border border-border-dark shadow-2xl flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-border-dark flex items-center justify-between shrink-0">
            <h2 className="text-white text-xl font-bold tracking-tight">
              Create Ticket
            </h2>
            <button
              onClick={() => dispatch({ type: "createticket" })}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Ticket Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => getBug(e)}
                    className="w-full bg-card-dark border-border-dark rounded-lg text-sm text-white focus:ring-primary focus:border-primary px-3 h-10 appearance-none pl-10"
                  >
                    <option>Story</option>
                    <option>Task</option>
                    <option>Bug</option>
                    <option>Epic</option>
                    <option>Improvement</option>
                    <option>Performance</option>
                    <option>Security Bug</option>
                  </select>
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-blue-400 text-lg">
                    bookmark
                  </span>
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-500 pointer-events-none text-sm">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
            <hr className="border-border-dark" />
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                Summary <span className="text-red-500">*</span>
              </label>
              <input
                style={{
                  border:
                    checkSubmit && summary === "" ? "1px solid red" : null,
                }}
                onChange={(e) => getSummary(e)}
                className="w-full bg-card-dark border-border-dark rounded-lg text-sm text-white focus:ring-primary focus:border-primary px-3 h-10"
                placeholder="Short description of the task"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Description <span className="text-red-500">*</span>
              </label>
              <div className="border border-border-dark rounded-lg overflow-hidden flex flex-col">
                <div className="bg-border-dark/50 px-2 py-1.5 flex gap-2 border-b border-border-dark">
                  <button
                    className="p-1 hover:bg-slate-700 rounded text-slate-400"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">
                      format_bold
                    </span>
                  </button>
                  <button
                    className="p-1 hover:bg-slate-700 rounded text-slate-400"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">
                      format_italic
                    </span>
                  </button>
                  <button
                    className="p-1 hover:bg-slate-700 rounded text-slate-400"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">
                      format_list_bulleted
                    </span>
                  </button>
                  <button
                    className="p-1 hover:bg-slate-700 rounded text-slate-400"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">
                      link
                    </span>
                  </button>
                </div>
                <textarea
                  style={{
                    border:
                      checkSubmit && description === ""
                        ? "1px solid red"
                        : null,
                  }}
                  onChange={(e) => getDesc(e)}
                  className="w-full bg-card-dark border-none focus:ring-0 text-sm text-white p-3 resize-none"
                  placeholder="Add a description..."
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 relative">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Assignee <span className="text-red-500">*</span>
                </label>
                <div
                  style={{
                    border:
                      checkSubmit && assignee === "Unassigned"
                        ? "1px solid red"
                        : null,
                  }}
                  onClick={() => assigneeToggleFunc()}
                  className="flex items-center gap-2 bg-card-dark border-2 border-primary rounded-lg p-1 px-2 h-10 cursor-pointer transition-colors ring-4 ring-primary/10"
                >
                  <div
                    className="size-6 rounded-full bg-cover bg-center grayscale opacity-50"
                    style={{
                      backgroundImage: `url(${assigneeImg})`,
                    }}
                  ></div>
                  <span className="text-sm text-white font-medium">
                    {assignee}
                  </span>
                  <span className="material-symbols-outlined ml-auto text-slate-400 text-lg">
                    expand_more
                  </span>
                </div>
                {assigneeToggle && (
                  <div className="absolute left-0 top-full mt-2 w-full z-50 bg-surface-dark border-2 border-primary rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2 border-b border-border-dark">
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-2 top-1.5 text-slate-500 text-lg">
                          search
                        </span>
                        <input
                          onChange={(e) => searchMembers(e)}
                          className="w-full bg-background-dark border-border-dark rounded-md text-xs text-white pl-8 py-1.5 focus:ring-primary focus:border-primary"
                          placeholder="Search members..."
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                      <div className="p-1">
                        {searchUsers.map((user) => {
                          return (
                            <div
                              onClick={() => getUser(user)}
                              className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 text-slate-300 hover:text-white rounded-lg cursor-pointer transition-colors group mt-1"
                            >
                              <div
                                className="size-7 rounded-full bg-cover bg-center border border-border-dark"
                                style={{
                                  backgroundImage: `url(${user.image})`,
                                }}
                              ></div>
                              <span className="text-xs font-medium">
                                {user.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Priority <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => getPriority(e)}
                    className="w-full bg-card-dark border-border-dark rounded-lg text-sm text-white focus:ring-primary focus:border-primary px-3 h-10 appearance-none pl-10"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    <option value="Critical">Critical</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-500 pointer-events-none text-sm">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Labels
                </label>
                <div className="flex flex-wrap gap-1 p-1 bg-card-dark border border-border-dark rounded-lg min-h-10">
                  {labelItems.map((label) => {
                    return (
                      <span className="bg-slate-700 text-slate-200 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                        {label}{" "}
                        <span
                          onClick={() => remLabel(label)}
                          className="material-symbols-outlined text-[12px] cursor-pointer"
                        >
                          close
                        </span>
                      </span>
                    );
                  })}
                  <input
                    onKeyDown={(e) => getLabel(e)}
                    onChange={(e) => storeLabel(e)}
                    className="bg-transparent border-none focus:ring-0 text-sm text-white flex-1 min-w-[80px]"
                    placeholder="Add labels..."
                    type="text"
                    value={labelVal}
                  />
                </div>
              </div>
              <div onChange={(e) => getStoryPoints(e)} className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Story Points
                </label>
                <input
                  className="w-full bg-card-dark border-border-dark rounded-lg text-sm text-white focus:ring-primary focus:border-primary px-3 h-10"
                  type="number"
                  value={storypoints}
                  max="10"
                  min="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Attachments
              </label>
              <div
                onClick={() => handleDivClick()}
                className="border-2 border-dashed border-border-dark rounded-lg p-8 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={(e) => attachScreenshot(e)}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <span className="material-symbols-outlined text-slate-500 group-hover:text-primary mb-2 text-3xl">
                  cloud_upload
                </span>
                <p className="text-sm text-slate-400">
                  <span className="text-primary font-bold">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  Maximum file size: 10MB
                </p>
              </div>
            </div>
            {files.length > 0 && (
              <span style={{ color: "green" }}>
                {files.map((file) => {
                  return <span>{`${file}, `}</span>;
                })}{" "}
                Upload Successfull
              </span>
            )}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                System Logs
              </label>
              <textarea
                onChange={(e) => getLogs(e)}
                className="w-full bg-background-dark border-border-dark rounded-lg text-xs font-mono text-slate-300 focus:ring-primary focus:border-primary p-3 custom-scrollbar"
                placeholder="Paste relevant logs here..."
                rows="3"
              ></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Optional Code Snippet
              </label>
              <div className="relative">
                <textarea
                  onChange={(e) => getCodeSnippet(e)}
                  className="w-full bg-slate-950 border-border-dark rounded-lg text-xs font-mono text-emerald-400 focus:ring-primary focus:border-primary p-3 pt-8 custom-scrollbar"
                  placeholder="// Enter code here..."
                  rows="4"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-border-dark bg-surface-dark/50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2"></div>
            <div className="flex gap-3">
              <button
                onClick={() => dispatch({ type: "createticket" })}
                className="px-5 py-2 text-sm font-bold text-slate-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={(e) => submitTicket(e)}
                className="px-6 py-2 bg-primary hover:bg-blue-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 transition-all"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Createissue;
