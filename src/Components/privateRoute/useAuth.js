export default function useAuth(){
    const loggedIn = localStorage.getItem("is_logged_in");
  const auth=loggedIn;

    return auth;
}