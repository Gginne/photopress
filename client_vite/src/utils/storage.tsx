export const getSessionStorage = (key: string, initialValue: any) => {
    try {
      const value = window.sessionStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      // if error, return initial value
      return initialValue;
    }
  };
  
  export const setSessionStorage = (key: string, value: any) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };