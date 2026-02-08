import React from "react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

const Criticalbugs = () => {
  const criticalpriority = useSelector((state) => state.criticalpriority);
  const criticaltype = useSelector((state) => state.criticaltype);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <main className="flex-1 flex flex-col min-w-0 bg-background-dark overflow-hidden">
        <div className="p-6 pb-2">
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-white text-3xl font-black tracking-tight">
                  Critical Bugs
                </h1>
                <span className="px-2 py-0.5 rounded bg-critical/20 text-critical text-xs font-bold border border-critical/30 mt-1">
                  14 Issues
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1">
                Priority:{" "}
                <span className="text-slate-200">Critical, Blocker</span> •
                Type: <span className="text-slate-200">Bug</span>
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-border-dark text-white text-xs font-bold hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-sm">
                  filter_list
                </span>
                Edit Filters
              </button>
              <button className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-primary text-white text-xs font-bold hover:bg-blue-600 transition-colors">
                <span className="material-symbols-outlined text-sm">
                  ios_share
                </span>
                Export List
              </button>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap items-center mb-2 relative">
            <div className="relative group/priority">
              <div onClick={()=>dispatch({type:"criticalpriority"})} className="flex h-7 items-center gap-2 rounded-md bg-critical/20 border border-critical/30 px-2 cursor-pointer hover:bg-critical/30">
                <span className="material-symbols-outlined text-[14px] text-critical">
                  priority_high
                </span>
                <p className="text-critical text-[11px] font-bold uppercase">
                  Priority: Critical, Blocker
                </p>
                <span className="material-symbols-outlined text-[14px] text-critical/50">
                  expand_more
                </span>
              </div>
              {criticalpriority && <div className="absolute top-full left-0 mt-2 w-48 bg-[#111722] border border-slate-700 rounded-lg shadow-2xl z-50 p-2">
                <div className="flex flex-col gap-1">
                  <label className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-slate-700 cursor-pointer group">
                    <input
                      className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-0"
                      type="checkbox"
                    />
                    <span className="text-xs text-slate-200 group-hover:text-white">
                      Highest
                    </span>
                  </label>
                  <label className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-slate-700 cursor-pointer group">
                    <input
                      className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-0"
                      type="checkbox"
                    />
                    <span className="text-xs text-slate-200 group-hover:text-white">
                      High
                    </span>
                  </label>
                  <label className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-slate-700 cursor-pointer group">
                    <input
                      className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-0"
                      type="checkbox"
                    />
                    <span className="text-xs text-slate-200 group-hover:text-white">
                      Medium
                    </span>
                  </label>
                  <label className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-slate-700 cursor-pointer group">
                    <input
                      className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-0"
                      type="checkbox"
                    />
                    <span className="text-xs text-slate-200 group-hover:text-white">
                      Low
                    </span>
                  </label>
                  <label className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-slate-700 cursor-pointer group">
                    <input
                      className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-0"
                      type="checkbox"
                    />
                    <span className="text-xs text-slate-200 group-hover:text-white">
                      Lowest
                    </span>
                  </label>
                </div>
              </div>}
            </div>
            <div className="relative group/type">
              <div onClick={()=>dispatch({type:"criticaltype"})} className="flex h-7 items-center gap-2 rounded-md bg-blue-500/20 border border-blue-500/30 px-2 cursor-pointer hover:bg-blue-500/30">
                <span className="material-symbols-outlined text-[14px] text-blue-400">
                  bug_report
                </span>
                <p className="text-blue-400 text-[11px] font-bold uppercase">
                  Type: Bug
                </p>
                <span className="material-symbols-outlined text-[14px] text-blue-400/50">
                  expand_more
                </span>
              </div>
              {criticaltype && <div className="absolute top-full left-0 mt-2 w-48 bg-[#111722] border border-slate-700 rounded-lg shadow-2xl z-50 p-2">
                <div className="flex flex-col gap-1">
                  <label className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-slate-700 cursor-pointer group">
                    <input
                      className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-0"
                      type="checkbox"
                    />
                    <span className="text-xs text-slate-200 group-hover:text-white">
                      Bug
                    </span>
                  </label>
                  <label className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-slate-700 cursor-pointer group">
                    <input
                      className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-0"
                      type="checkbox"
                    />
                    <span className="text-xs text-slate-200 group-hover:text-white">
                      Task
                    </span>
                  </label>
                  <label className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-slate-700 cursor-pointer group">
                    <input
                      className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-0"
                      type="checkbox"
                    />
                    <span className="text-xs text-slate-200 group-hover:text-white">
                      Story
                    </span>
                  </label>
                  <label className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-slate-700 cursor-pointer group">
                    <input
                      className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-0"
                      type="checkbox"
                    />
                    <span className="text-xs text-slate-200 group-hover:text-white">
                      Epic
                    </span>
                  </label>
                </div>
              </div>}
            </div>
            <div className="h-4 w-[1px] bg-slate-700 mx-1"></div>
            <button className="text-slate-500 text-xs font-bold hover:text-white transition-colors">
              Clear all filters
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto custom-scrollbar px-6 pb-6">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-background-dark z-10">
              <tr className="border-b border-border-dark">
                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Type
                </th>
                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Key
                </th>
                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Summary
                </th>
                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Assignee
                </th>
                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Priority
                </th>
                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Status
                </th>
                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark/50">
              <tr className="hover:bg-slate-800/30 transition-colors group">
                <td className="py-3 px-4">
                  <span
                    className="material-symbols-outlined text-critical text-sm"
                    title="Bug"
                  >
                    bug_report
                  </span>
                </td>
                <td className="py-3 px-4 font-bold text-slate-400 text-xs group-hover:text-primary cursor-pointer">
                  QS-1042
                </td>
                <td className="py-3 px-4 font-medium text-sm text-slate-200">
                  Authentication failure in production environment for mobile
                  users
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-6 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9d-U0BUdegLkzri0_AjTabWyrXBiI-bmUQZQCnnM8ndottFQzU8ySqo3eaf1s5ghH_KVWwiJa7DfXAnhdnp5dtLi4geFS6G6JpIZjE3ynBM7_kJq9tOH7WoSjDwsLgkJKHQBeqP5mIuRKuYQPoGDOm2GAfw5k90NuZ_HOIT12wQZbQgUHmqfEE5a3FFEh7Ulsvz4R5Xc-44ckLTMfBbvhVi9FLUuhziOqKy3-YGohqubMoIDgg2VlVNDYLqk63ajQ6wY-iS-XBZAi')",
                      }}
                    ></div>
                    <span className="text-xs text-slate-300">Alex Rivera</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5 text-critical">
                    <span className="material-symbols-outlined text-sm">
                      keyboard_double_arrow_up
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-tight">
                      Blocker
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-blue-600/30">
                    In Progress
                  </span>
                </td>
                <td className="py-3 px-4 text-xs text-slate-500">2h ago</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors group">
                <td className="py-3 px-4">
                  <span
                    className="material-symbols-outlined text-critical text-sm"
                    title="Bug"
                  >
                    bug_report
                  </span>
                </td>
                <td className="py-3 px-4 font-bold text-slate-400 text-xs group-hover:text-primary cursor-pointer">
                  QS-1038
                </td>
                <td className="py-3 px-4 font-medium text-sm text-slate-200">
                  Data race condition during concurrent workspace sync
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-6 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2BkjfwD-3N8oFKJUJlF_WLkRfY3E6cG8m89Go3I6i9JUVow3xiDIPqJba-WHEOvpN3jMmpO_DiLB5gpy6TeT9zqQUXBPNOVwG_dj68z5X8DrvMXIlv0L4NTlmcj3Z0bcXYpFrOvk7t6zQE1_ubd49pKocsWAq-lK_8vakInnplFqs1NMQWNA5V7U1q4yyd3durodVzuRSeXLsjYZrmTlmaql3BjtvzqsyYsICQACWejEK_CEqe4yydwH7UYIKDm__GHxXWM2u_2ri')",
                      }}
                    ></div>
                    <span className="text-xs text-slate-300">Sarah Chen</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5 text-critical">
                    <span className="material-symbols-outlined text-sm">
                      keyboard_double_arrow_up
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-tight">
                      Critical
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-border-dark">
                    To Do
                  </span>
                </td>
                <td className="py-3 px-4 text-xs text-slate-500">5h ago</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors group">
                <td className="py-3 px-4">
                  <span
                    className="material-symbols-outlined text-critical text-sm"
                    title="Bug"
                  >
                    bug_report
                  </span>
                </td>
                <td className="py-3 px-4 font-bold text-slate-400 text-xs group-hover:text-primary cursor-pointer">
                  QS-1035
                </td>
                <td className="py-3 px-4 font-medium text-sm text-slate-200">
                  Database connection pool exhausted under peak load
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-6 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsZTi6x3-b4QzKMu7aV8uBcRy1-yR5h1U3MUpY4REbHD17rFmNCRg2h0BQacotlxoO8leKsM6NMSLpSTiaJ3yu6lFpi5JwUiEQZiFA-pg8Ol-WfyzG5uODUGX3wbFKQt3Qo4MedMD09XmF3jfJqhLw-CVlR0rPBO8SN_M38P3mltQ5hQp74_fVl-zGT3MT1bm8XNbg3r517JqE4H3fFewjFLB3UldCtfwC3JjYonwWBdSkTSvADre_Rc34eUMjO43A58X_8Vo8y-dp')",
                      }}
                    ></div>
                    <span className="text-xs text-slate-300">
                      Marcus Wright
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5 text-critical">
                    <span className="material-symbols-outlined text-sm">
                      keyboard_double_arrow_up
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-tight">
                      Blocker
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-purple-600/30">
                    In Review
                  </span>
                </td>
                <td className="py-3 px-4 text-xs text-slate-500">1d ago</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors group">
                <td className="py-3 px-4">
                  <span
                    className="material-symbols-outlined text-critical text-sm"
                    title="Bug"
                  >
                    bug_report
                  </span>
                </td>
                <td className="py-3 px-4 font-bold text-slate-400 text-xs group-hover:text-primary cursor-pointer">
                  QS-1029
                </td>
                <td className="py-3 px-4 font-medium text-sm text-slate-200">
                  Payment processing API returning 500 on all international
                  transactions
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-6 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAsEUXsN4T-vj7NgGPWv9I2I6npn7kxdMktH3RWeL323yoqdDqxKXExHGHcWL90a3f-c4mSaq1kJCbyQEngBocdA4YQhmGiHa4HQhlDiWYyi7zirdgC9P0lKvNM4ChTY_-tYm_qlryb8mgdCNCjydX6jl1RYDcq389XTi7Q12T209CfPZWc7UvxLeWXdNBpGBBMLHNqhC2Sf1Jj_jtSkBiagTbpoSTgClUycJyxS4TWjMWYdytLcvBH0afOHEfMTFf6qsS80nzrCuWJ')",
                      }}
                    ></div>
                    <span className="text-xs text-slate-300">James Kim</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5 text-critical">
                    <span className="material-symbols-outlined text-sm">
                      keyboard_double_arrow_up
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-tight">
                      Critical
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-blue-600/30">
                    In Progress
                  </span>
                </td>
                <td className="py-3 px-4 text-xs text-slate-500">1d ago</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors group">
                <td className="py-3 px-4">
                  <span
                    className="material-symbols-outlined text-critical text-sm"
                    title="Bug"
                  >
                    bug_report
                  </span>
                </td>
                <td className="py-3 px-4 font-bold text-slate-400 text-xs group-hover:text-primary cursor-pointer">
                  QS-1021
                </td>
                <td className="py-3 px-4 font-medium text-sm text-slate-200">
                  Security: Unauthorized access to billing dashboard via URL
                  direct entry
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-6 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC7IFCdY8X13vvJTek46Z1Ljsmp6mB3Gzu6q4pymKLMqAZDGMmerys61Xo0Fpgkeoies35PMr_ehAPWfK0KoSfMnZNuJ0E4Jj--HGjqATQINJLIZ2f8h8YkqUrCQf8sWw1p5GlQRJDAaLiqcBHhOHyYb6m-YnIQaWolXbEHmAXgx9FhdvW0DQGLhQXjjO1j52KRlfEl-nJQ0LHm278R1LkFzYfDh0Wg4vl-ez7-YlNqMckCMCILwaoOCyN10eE0tpDBKABUxa7_8r2S')",
                      }}
                    ></div>
                    <span className="text-xs text-slate-300">Lena Petrova</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5 text-critical">
                    <span className="material-symbols-outlined text-sm">
                      keyboard_double_arrow_up
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-tight">
                      Blocker
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-border-dark">
                    To Do
                  </span>
                </td>
                <td className="py-3 px-4 text-xs text-slate-500">2d ago</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-6 flex items-center justify-between text-slate-500 text-xs px-4">
            <p>Showing 1-14 of 14 results</p>
            <div className="flex gap-1">
              <button className="px-2 py-1 rounded bg-border-dark text-slate-300 opacity-50 cursor-not-allowed">
                Previous
              </button>
              <button className="px-2 py-1 rounded bg-primary text-white font-bold">
                1
              </button>
              <button className="px-2 py-1 rounded bg-border-dark text-slate-300 hover:text-white transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Criticalbugs;
