import { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Context } from "../context/context";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { IoIosCloseCircleOutline } from "react-icons/io";
let o = {
  email: "",
  password: "",
};
let reducer = (prvdata, action) => {
  return { ...prvdata, [action.type]: action.val };
};
let Login = () => {
  let { loading, setLoading } = useContext(Context);
  let [state, dispatch] = useReducer(reducer, o);
  let [msg, setmsg] = useState("");

  let navigate = useNavigate();

  let submit = (e) => {
    e.preventDefault();

    setLoading(true);
    fetch("http://localhost:3000/authroute/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
      credentials: "include",
    })
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          if (!value.ok) {
            return setmsg(value.massage);
          }

          toast.success(value.massage + "✅", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });

          navigate("/");
        }, 3000);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/authroute/acount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    })
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        if (!value.ok) {
          return navigate("/login");
        }
        return navigate("/");
      });
  }, []);

  return (
    <>
      <div className="w-full flex justify-center items-center mt-30">
        <div className="login-container ">
          <div className="w-full flex justify-end items-end">
            <IoIosCloseCircleOutline
              className="text-green-400 text-2xl cursor-pointer "
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <form
            action=""
            className="w-full flex flex-col gap-4"
            onSubmit={submit}
          >
            <p className="text-white text-center text-2xl">Login</p>
            <input
              type="email"
              name=""
              id="input"
              placeholder="Email"
              required
              onChange={(e) => {
                dispatch({ val: e.target.value, type: "email" });
              }}
            />
            <input
              type="password"
              name=""
              id="input"
              placeholder="password"
              required
              onChange={(e) => {
                dispatch({ val: e.target.value, type: "password" });
              }}
            />
            <button type="submit" className="submit-button">
              {loading ? <div className="loader"></div> : ""} Login
            </button>

            <p className="text-white text-center">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
            {msg ? <p className="text-green-400 text-center">{msg}</p> : ""}
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
