import { useCallback, useReducer } from "react";
import apiClient from "../utils/apiClient";
import { useAuth } from "../context/AuthContext";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "pending": {
      return { loading: true, data: null, error: null };
    }
    case "reset": {
      return { loading: false, data: null, error: null };
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

export default function useRequest(endpoint: any) { // setup options type
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    error: null,
    loading: false,
  });

  const {logout} = useAuth()

  const trigger = useCallback(async (body?: any) => {
    dispatch({ type: "pending" });
    try {

      endpoint.data = body
      const response = await apiClient.request(endpoint);
      console.log(endpoint.url, response)
      
      dispatch({ type: "success", data: response.data });
    } catch (err: Error | any) {
      console.log(endpoint.url, err)

      if(err.response.status == 401) logout()

      dispatch({ type: "error", err });

      
      
    }
  }, [endpoint]);

  const clear = useCallback(() => {
    dispatch({ type: "reset" });
  }, [])

  return { trigger,clear, ...state };
}
