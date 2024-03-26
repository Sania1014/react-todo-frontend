import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context, server } from "../main";

const Header = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    setUser_refresher,
  } = useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
      setUser_refresher((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };
  //is sy jb b profle pr koi click kry ga to user ka data update hoga taky updated details profile sheet pr show huskain
  const profile_handler = () => {
    setUser_refresher((prev) => !prev);
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link onClick={profile_handler} to={"/profile"}>
          Profile
        </Link>
        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
