import { createContext, useState } from "react";

export let Context = createContext(null);

export let Contextfuntion = ({ children }) => {
  let [loading, setLoading] = useState(false);
  let [deta, setdeta] = useState([]);
  return (
    <Context.Provider value={{ loading, setLoading, deta, setdeta }}>
      {children}
    </Context.Provider>
  );
};
