import axios from 'axios'
import { getSessionStorage, setSessionStorage } from './storage';

const apiClient = axios.create();

apiClient.interceptors.request.use((req) => {
   const access = getSessionStorage("access", null)
   
   req.headers['x-access-token'] = access
  
  return req
  
  }, (err) => {
   console.log(err)
   Promise.reject(err)
});

/*
apiClient.interceptors.response.use((res) => {
   
   return res;
 }, async (err) => {
   if(err.response.status === 401 || err.response.status === 500){

      try{
         const {access, refresh} = err.response.data
         setSessionStorage('access', access)
         setSessionStorage('refresh', refresh)
         
         console.log("refreshing...")

         if(err.response.config.method === "post"){
            err.response.config.data = JSON.parse(err.response.config.data)
         }
      
         return apiClient(err.response.config)

      }catch(e){

         console.log(e)
         console.log(e.response)
      }
      
   } 
   

   Promise.reject(err)

 });
*/
export default apiClient