import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

export const signin = (formData, history) => async (dispatch) => {
  try {
    // login user

    const resp = await api.signIn(formData);
    console.log(resp);
    const { data, status } = await api.signIn(formData);
    dispatch({ type: AUTH, data });

    console.log("status: " + status);
    if (status === 200) {
      alert("Successfully Logged In");
    }
    history.push("/");  
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    // Signup user
    const { data, status } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    if (status === 200) {
      alert("Successfully Registered");
    }
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
