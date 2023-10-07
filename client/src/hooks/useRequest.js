import { useCallback, useReducer } from "react";
import apiClient from "../utils/apiClient";
import { useAuth } from "../context/AuthContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "pending": {
      return { loading: true, data: null, error: null };
    }
    case "success": {
      return { loading: false, data: action.data, error: null };
    }
    case "error": {
      return { loading: false, data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export default function useRequest(options) {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    error: null,
    loading: false,
  });

  //const {logout} = useAuth()

  const trigger = useCallback(async () => {
    dispatch({ type: "pending" });
    try {
      const response = await apiClient.request(options);
      console.log(options.url, response)
      dispatch({ type: "success", data: response.data });
    } catch (error) {
      console.log(options.url, error)
      dispatch({ type: "error", error });
      //logout()
    }
  }, [options]);

  return { trigger, ...state };
}
