import axios from "axios";
import LocalStorageService from "./LocalStorageService";
import jwt_decode from "jwt-decode"

const localStorageService = LocalStorageService.getService();




axios.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;

      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async(error)=> {
    const originalConfig = error.config;
 
    if (error.response){
     
      if (error.response.status === 401 && !originalConfig._retry) {
       
        originalConfig._retry = true;
        const refresh=localStorageService.getRefreshToken();
        try {

      if(refresh){
      let  decoded = jwt_decode(refresh);
        const time =decoded.exp*1000 > new Date().getTime()
        console.log('time', time)
     
        if(time){
          const exptime=decoded.exp*1000;
          const timereal= new Date().getTime();
          console.log('exptime', exptime)
          console.log('timereal', timereal)
          const rs = await refreshToken();
          console.log('rs', rs)
          const { access } = rs.data;
          window.localStorage.setItem("access_token", access);
          const token2 = localStorageService.getAccessToken();
          axios.defaults.headers.common["Authorization"]  = "Bearer " + token2;
          window.location.reload()
         
        }
        else{
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
          localStorage.removeItem("is_logged_in")
          localStorage.removeItem("user_type")
          window.location.replace("/login")
     
          
        }
      }
          return (originalConfig);
        
        } catch (_error) {
          console.log('SomeThing is wrong bro')
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      
    }
    return Promise.reject(error);
  }
);



function refreshToken() {
  return axios.post("https://dev.taamid.com/api/token/refresh/", {
    refresh:localStorageService.getRefreshToken()
  });
}