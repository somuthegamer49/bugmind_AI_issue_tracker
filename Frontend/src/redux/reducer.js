const initialState = {
  toggleProfile: false,
  toggleNotif: false,
  teamdept: false,
  teamrole: false,
  togglestatus: false,
  toggleassignee: false,
  togglepriority: false,
  togglelabel: false,
  login: false,
  userid: null,
  userinfo:{},
  createticket: false,
  ticketid:null,
  userprofile:{},
  ticketbody:{},
  aiticket:{},
  newticket:{},
  storebugboarddata:{},
  prioritytickets:{},
};

function stateReducer(state = initialState, action) {
  switch (action.type) {
    case "toggleprofile":
      state.toggleProfile = !state.toggleProfile;
      return { ...state };
    case "togglenotif":
      state.toggleNotif = !state.toggleNotif;
      return { ...state };
    case "teamdept":
      state.teamdept = !state.teamdept;
      return { ...state };
    case "teamrole":
      state.teamrole = !state.teamrole;
      return { ...state };
    case "togglestatus":
      state.togglestatus = !state.togglestatus;
      return { ...state };
    case "toggleassignee":
      state.toggleassignee = !state.toggleassignee;
      return { ...state };
    case "togglelabel":
      state.togglelabel = !state.togglelabel;
      return { ...state };
    case "togglepriority":
      state.togglepriority = !state.togglepriority;
      return { ...state };
    case "login":
      state.login = true;
      state.userid = action.payload;
      return { ...state };
    case "logout":
      state.login = false;
      state.userid = null;
      state.aiticket= {};
      state.createticket =false;
      state.newticket = {};
      state.prioritytickets= {};
      state.storebugboarddata = {};
      state.ticketbody = {};
      state.userprofile = {};
      state.userinfo = {};
      state.ticketid = null;
      state.teamdept = false;
      state.teamrole = false;
      state.toggleNotif = false;
      state.toggleProfile = false;
      state.toggleassignee = false;
      state.togglelabel = false;
      state.togglestatus = false;
      state.togglepriority = false;
      return { ...state };
    case "createticket":
      state.createticket = !state.createticket;
      return { ...state };
    case "userprofile":
      state.userprofile = action.payload;
      return { ...state };
    case "userinfo":
      state.userinfo = action.payload;
      return { ...state };
    case "ticketid":
      state.ticketid = action.payload;
      return { ...state };
    case "ticketbody":
      state.ticketbody = action.payload;
      return { ...state };
    case "newticket":
      state.newticket = action.payload;
      return { ...state };
    case "aiticket":
      state.aiticket = action.payload;
      return { ...state };
    case "storebugboarddata":
      state.storebugboarddata = action.payload;
      return { ...state };
    case "prioritytickets":
      state.prioritytickets = action.payload;
      return { ...state };
    default:
      return state;
  }
}

export default stateReducer;
