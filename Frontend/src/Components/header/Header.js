import { React, Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Header = () => {
  const toggleprofile = useSelector((state) => state.toggleProfile);
  const togglenotif = useSelector((state) => state.toggleNotif);
  const id = useSelector((state) => state.userid);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setuser] = useState({});
  const [tciketdata, settciketdata] = useState([]);
  const [ticket, setticket] = useState("");
  const [ticketstate, setticketstate] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get(`http://localhost:8000/team_members/${id}`)
        .then((res) => {
          setuser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUsers();
    const getTickets = async () => {
      await axios
        .get(`http://localhost:8001/tickets/`)
        .then((res) => {
          settciketdata(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTickets();
  }, []);

  // Toggle for Profile Image
  const toggleProfile = () => {
    dispatch({ type: "toggleprofile" });
  };
  const toggleNotif = () => {
    dispatch({ type: "togglenotif" });
  };
  const profileSettings = (profile) => {
    dispatch({ type: "userprofile", payload: profile });
    navigate("/profile");
  };
  const logoutFunc = () => {
    dispatch({ type: "logout" });
    dispatch({ type: "ticketid", payload: null });
    dispatch({ type: "ticketinfo", payload: {} });
    dispatch({ type: "newticket", payload: {} });
    dispatch({ type: "aiticket", payload: {} });
    navigate("/");
  };
  const ticketSearch = (e) => {
    const ticketstring = e.target.value;
    tciketdata.forEach((ticket) => {
      if (ticket.ticketid === ticketstring) {
        setticket(ticket.id);
        setticketstate(true);
      } else {
        setticket("");
        setticketstate(false);
      }
    });
  };
  const ticketEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (ticketstate) {
        findTicket();
      } else {
        dispatch({ type: "ticketbody", payload: {} });
        dispatch({ type: "ticketid", payload: null });
        setticket("Ticket Not Found");
        setTimeout(() => {
          setticket("");
        }, 3000);
      }
    }
  };
  const findTicket = () => {
    const getTicketInfo = async () => {
      await axios
        .get(`http://localhost:8001/tickets/${ticket}`)
        .then((res) => {
          dispatch({ type: "ticketbody", payload: res.data });
          dispatch({ type: "ticketid", payload: ticket });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTicketInfo();
  };
  return (
    <Fragment>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark px-6 py-3 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div
              style={{ backgroundImage: "url('/bugmindimg.png')" }}
              className="size-20 rounded-lg flex items-center justify-center text-white bg-cover bg-center bg-no-repeat bg-contain"
            ></div>
          </div>
          <label className="flex flex-col min-w-40 h-10 max-w-md">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div
                className="text-slate-400 dark:text-[#92a4c9] flex border-none bg-slate-100 dark:bg-border-dark items-center justify-center pl-4 rounded-l-lg"
                data-icon="search"
              >
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                onChange={(e) => ticketSearch(e)}
                onKeyDown={(e) => ticketEnter(e)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-slate-100 dark:bg-border-dark h-full placeholder:text-slate-400 dark:placeholder:text-[#92a4c9] px-4 rounded-l-none pl-2 text-sm font-normal"
                placeholder="Search Tickets by ID"
              />
            </div>
            {ticket === "Ticket Not Found" && (
              <span style={{ color: "red" }}>{ticket}</span>
            )}
          </label>
        </div>
        <div className="flex items-center gap-4 relative z-50">
          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() => {
                  toggleNotif();
                }}
                className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-200 dark:bg-slate-700 text-primary dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors relative"
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 size-2 bg-primary rounded-full border-2 border-white dark:border-surface-dark"></span>
              </button>
              {togglenotif && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-border-dark">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Notifications
                    </h3>
                    <button className="text-[11px] font-semibold text-primary hover:underline">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    <div className="flex items-start gap-3 p-4 hover:bg-slate-50 dark:hover:bg-border-dark/40 transition-colors cursor-pointer group border-b border-slate-100 dark:border-border-dark/30">
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-border-dark text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
          <div className="h-8 w-[1px] bg-slate-200 dark:bg-border-dark mx-2"></div>
          <div className="relative profile-trigger">
            <button
              onClick={() => {
                toggleProfile();
              }}
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/20 cursor-pointer focus:outline-none focus:ring-primary transition-all active:scale-95"
              data-alt="User profile avatar showing a professional portrait"
              style={{
                backgroundImage: `url(${user.image})`,
              }}
            ></button>
            {toggleprofile && (
              <div className="profile-dropdown absolute right-0 mt-2 w-64 bg-surface-dark border border-border-dark rounded-xl shadow-2xl z-[100] overflow-hidden">
                <div className="p-4 border-b border-border-dark bg-card-dark/30">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${user.image})`,
                      }}
                    ></div>
                    <div className="flex flex-col min-w-0">
                      <p className="text-sm font-bold text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-[#92a4c9] truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => profileSettings(user)}
                    className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-[#92a4c9] hover:text-white hover:bg-primary/10 transition-colors text-left group"
                  >
                    <span className="material-symbols-outlined text-xl group-hover:text-primary transition-colors">
                      account_circle
                    </span>
                    <span className="text-sm font-medium">
                      Profile Settings
                    </span>
                  </button>
                </div>
                <div className="h-[1px] bg-border-dark mx-2"></div>
                <div className="p-2">
                  <button
                    onClick={() => logoutFunc()}
                    className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-left group"
                  >
                    <span className="material-symbols-outlined text-xl">
                      logout
                    </span>
                    <span className="text-sm font-bold">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </Fragment>
  );
};
