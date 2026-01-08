import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Context } from "../context/context";

let Urllist = () => {
  let [acount, setacount] = useState("");
  let { deta, setdeta } = useContext(Context);
  let navigate = useNavigate();

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
        if (value) {
          return setacount(value.user.email);
        }
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/urlshortner/urls", {
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
        if (value.massage === "You are not login, Plaese login") {
          toast.success(value.massage, {
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

          navigate("/login");
          return;
        }

        setdeta(value.deta);
      });
  }, []);
  // console.log(deta);
  let deleteDeta = (id) => {
    fetch("http://localhost:3000/urlshortner/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    })
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        console.log(value);
      });
  };

  let logout = () => {
    fetch("http://localhost:3000/authroute/logout", {
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
      });
  };
  return (
    <>
      <div className="w-full flex flex-col gap-10">
        <div className="bg-black  rounded-2xl w-full  flex justify-around items-center  text-white h-15  md:text-2xl">
          <Link to="/">URLshortner</Link>
          <Link to="/url">URLs</Link>
          <div className="round">
            <p className="acount-name">
              {acount ? acount[0].toUpperCase() : ""}
            </p>
          </div>
          <a href="/url">
            {" "}
            <button className="logout" onClick={logout}>
              Logout
            </button>
          </a>
        </div>

        <div className="w-full flex justify-center items-center gap-2 flex-col md:flex-row md:flex-wrap">
          {deta?.map((element) => {
            return (
              <div className="box text-white">
                <div className="w-full p-2 bg-green-400 flex justify-center items-center">
                  <img src={element.qrimage} className=" image mt-4 " alt="" />
                </div>
                <p className="text-white">
                  {"Owner : " + element?.user_id.email}
                </p>
                <a className="text" href={element.longurl}>
                  {"LongURL : " + element.longurl}
                </a>
                <a href={element.shorturl}>
                  {"ShortURL : " + element.shorturl}
                </a>

                <a href="/url" style={{ textDecoration: "none", color: "red" }}>
                  <p
                    className="text-red-500 , cursor-pointer"
                    onClick={() => deleteDeta(element._id)}
                  >
                    Delete
                  </p>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Urllist;
