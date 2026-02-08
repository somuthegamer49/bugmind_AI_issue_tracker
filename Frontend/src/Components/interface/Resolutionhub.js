import axios from "axios";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Resolutionhub = () => {
  const dispatch = useDispatch();
  const aiticket = useSelector((state) => state.aiticket);
  const [aiRes, setaiRes] = useState({});
  const [aiErr, setaiErr] = useState("");
  const [saveState, setsaveState] = useState("");
  const [Analyze, setAnalyze] = useState(false)

  const clearTicket = () => {
    dispatch({ type: "aiticket", payload: {} });
  };
  const generateFunc = (e) => {
    e.preventDefault();
    if (aiticket.id !== undefined) {
      let aiurl = `http://127.0.0.1:5000//generate/${aiticket.id}`;
      const generateResponse = async () => {
        setAnalyze(true)
        await axios
          .post(aiurl)
          .then((res) => {
            console.log(res.data);
            setaiRes(res.data);
            setAnalyze(false)
          })
          .catch((err) => {
            console.log(err);
            setaiErr(err);
            setTimeout(() => {
              setaiErr("");
            }, 2000);
          });
          setAnalyze(false)
      };
      generateResponse();
    } else {
      setaiErr("No Ticket Loaded");
      setTimeout(() => {
        setaiErr("");
      }, 2000);
    }
  };
  const saveResol = () => {
    if ((aiRes !== "Server Error" || aiRes !== "Could not Generate Solution") && aiRes.root_cause_analysis!==undefined && aiRes.code_fix!==undefined) {
      dispatch({ type: "newticket", payload: {rca:aiRes.root_cause_analysis,codefix:aiRes.code_fix} });
      setsaveState("Successful")
      setTimeout(() => {
        setsaveState("");
      }, 3000);
    }
  };
  return (
    <Fragment>
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#111722]">
        <div className="flex flex-wrap justify-between items-center gap-4 p-6 border-b border-slate-200 dark:border-[#232f48]">
          <div className="flex flex-col gap-1">
            <p className="text-slate-900 dark:text-white text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2">
              AI-Powered Resolution Hub
              <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full uppercase">
                Beta
              </span>
            </p>
            <p className="text-slate-500 dark:text-[#92a4c9] text-sm">
              Provide diagnostic data to let AI analyze and draft a
              comprehensive ticket.
            </p>
          </div>
          <div>Ticket: {aiticket.ticketid}</div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => clearTicket()}
              className="flex items-center justify-center rounded-lg h-9 px-4 bg-slate-100 dark:bg-[#232f48] text-slate-700 dark:text-white text-sm font-bold border border-slate-200 dark:border-transparent"
            >
              Clear
            </button>
            <button
              onClick={(e) => generateFunc(e)}
              className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-lg glow-blue hover:bg-primary/90 transition-all h-9"
            >
              <span className="material-symbols-outlined text-[18px]">
                auto_fix
              </span>{" "}
              Generate Solution
            </button>
          </div>
          {aiErr!=="" && <div>{aiErr}</div>}
        </div>
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="w-full lg:w-1/2 border-r border-slate-200 dark:border-[#232f48] flex flex-col overflow-y-auto custom-scrollbar p-6 gap-6 bg-slate-50/50 dark:bg-transparent">
            <div className="flex items-center gap-2 pb-2">
              <span className="material-symbols-outlined text-primary">
                input
              </span>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
                Diagnostic Input
              </h2>
            </div>
            <div className="flex flex-col items-stretch justify-start rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-[#192233] transition-all hover:border-primary/50">
              <div className="w-full bg-slate-100 dark:bg-[#0d1117] aspect-video rounded-t-lg relative group overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-700">
                    image
                  </span>
                </div>
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"
                  data-alt="Abstract code error visual representation"
                  style={{
                    backgroundImage:
                      aiticket.image !== undefined &&
                      aiticket.image.map((img) => {
                        return `url(${img})`;
                      }),
                  }}
                ></div>
                <div className="absolute bottom-4 right-4 flex gap-2"></div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-slate-900 dark:text-white text-sm font-bold leading-tight">
                    Error Screenshot
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-slate-900 dark:text-white text-sm font-bold">
                  System Logs
                </p>
              </div>
              <div className="terminal-bg rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-300 min-h-[160px] max-h-[160px] overflow-y-auto custom-scrollbar relative">
                <div className="flex gap-4">
                  <span className="text-slate-600/50 italic">
                    {aiticket.logs}
                  </span>
                </div>
                <div className="flex gap-4 mt-1"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-slate-900 dark:text-white text-sm font-bold">
                  Relevant Code Snippet{" "}
                  <span className="text-slate-500 font-normal">(Optional)</span>
                </p>
              </div>
              <div className="terminal-bg rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-300 min-h-[120px] max-h-[120px] overflow-y-auto custom-scrollbar">
                <div className="flex gap-4">
                  <span className="text-slate-600/50 italic">
                    {aiticket.code}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto custom-scrollbar p-6 gap-6 bg-slate-100/30 dark:bg-[#0b0c10]/40">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary fill-1">
                  auto_awesome
                </span>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
                  AI Intelligence Output
                </h2>
              </div>
              {Analyze && <div className="flex items-center gap-2 px-2 py-1 bg-primary/10 rounded-lg">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-ping"></span>
                <span className="text-[10px] font-bold text-primary uppercase">
                  Analyzing
                </span>
              </div>}
            </div>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-slate-500 dark:text-[#92a4c9] text-xs font-bold uppercase tracking-wider">
                  Issue Title
                </label>
                <div className="w-full bg-white dark:bg-[#192233] border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white font-medium focus:ring-primary/50 focus:border-primary glow-blue transition-all">
                  {aiticket.summary}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-slate-500 dark:text-[#92a4c9] text-xs font-bold uppercase tracking-wider">
                    Severity
                  </label>
                  <div className="relative">
                    <div className="w-full bg-white dark:bg-[#192233] border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white appearance-none py-2 px-10">
                      {aiticket.priority}
                    </div>
                    <div
                      className={
                        aiticket.priority === "Critical"
                          ? "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                          : aiticket.priority === "High"
                            ? "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                            : aiticket.priority === "Low"
                              ? "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                              : aiticket.priority === "Medium"
                                ? "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                                : ""
                      }
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-slate-500 dark:text-[#92a4c9] text-xs font-bold uppercase tracking-wider">
                    Component
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {aiticket.labels !== undefined &&
                      aiticket.labels.map((label) => {
                        return (
                          <span className="px-2 py-1 bg-slate-200 dark:bg-[#232f48] text-slate-600 dark:text-[#92a4c9] rounded text-[10px] font-bold uppercase">
                            {label}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4 rounded-xl border border-primary/30 bg-primary/5 dark:bg-primary/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-primary text-4xl">
                    psychology
                  </span>
                </div>
                <label className="text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">
                    verified
                  </span>{" "}
                  Root Cause Analysis
                </label>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-1">
                  {aiRes.root_cause_analysis!==undefined?aiRes.root_cause_analysis:""}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-500 dark:text-[#92a4c9] text-xs font-bold uppercase tracking-wider flex justify-between items-center">
                  Suggested Fix
                </label>
                <div className="terminal-bg rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-300 min-h-[140px] max-h-[140px] overflow-y-auto custom-scrollbar">
                  {aiRes.code_fix!==undefined?aiRes.code_fix:""}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-500 dark:text-[#92a4c9] text-xs font-bold uppercase tracking-wider">
                  Ticket Description Summary
                </label>
                <div className="bg-white dark:bg-[#192233] border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-sm text-slate-600 dark:text-slate-400 h-24 overflow-y-auto custom-scrollbar">
                  {aiticket.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-[#232f48] bg-white dark:bg-[#111722] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4"></div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => saveResol()}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-12 px-10 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all glow-blue"
            >
              <span className="material-symbols-outlined text-[20px]">
                save
              </span>
              Save Resolution
            </button>
            {saveState!=="" && <span>{saveState}</span>}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Resolutionhub;
