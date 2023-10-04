export const getSessionStorage = (key, initialValue) => {
    try {
      const value = window.sessionStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      // if error, return initial value
      return initialValue;
    }
  };
  
  export const setSessionStorage = (key, value) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };