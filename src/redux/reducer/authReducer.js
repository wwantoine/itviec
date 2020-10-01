const initialState = {
  user: null,
  loading: false,
  error: "",
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_REQUEST":
      state.loading = true;
      console.log("LOGIN_REQUEST");
      return { ...state };
    case "LOGIN_SUCCESS":
      state.loading = false;
      state.user = { ...payload };
      state.error = "";
      state.isAuthenticated = true;
      console.log("LOGIN_SUCCESS", state.user, state.isAuthenticated);
      return { ...state };
    case "LOGIN_FAILED":
      state.loading = false;
      state.error = payload;
      console.log("LOGIN_FAILED");
      return { ...state };
    default:
      return { ...state };
  }
};

export default authReducer;
