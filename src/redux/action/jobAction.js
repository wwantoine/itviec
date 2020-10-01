const getJobData = () => async (dispatch) => {
  try {
    const url = `${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
    // setOriginalList(data);
    dispatch({ type: "GET_JOB_SUCCESS", payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const jobAction = {
  getJobData,
};
