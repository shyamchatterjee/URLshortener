import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Context } from "../context/context";
import { Bounce, ToastContainer, toast } from "react-toastify";
let Home = () => {
  let { loading, setLoading } = useContext(Context);
  let [url, seturl] = useState("");
  let navigate = useNavigate();
  let submit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/urlshortner/createurl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longurl: url }),
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
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
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
          navigate("/url");
        }, 3000);
      });
  };

  return (
    <>
      <div className="w-full flex flex-col gap-28">
        <div className="bg-black rounded-2xl w-full  flex justify-around items-center  text-white h-15  md:text-2xl">
          <Link to="/">URLshortner</Link>
          <Link to="/url">URLs</Link>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="login-container">
            <form
              action=""
              className="w-full flex flex-col gap-4"
              onSubmit={submit}
            >
              <p className="text-white text-center text-2xl">URLshortner</p>
              <input
                type="text"
                name=""
                id="input"
                placeholder="Please enter the Longurl"
                required
                onChange={(e) => {
                  seturl(e.target.value);
                }}
              />

              <button type="submit" className="submit-button">
                {loading ? <div className="loader"></div> : ""}
                Create Shorturl
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
