import { createContext, useState } from "react";

const currentMenuContext = createContext();

export const CurrentMenuProvider = ({ children }) => {
  const [currentMenu, setCurrent] = useState("");

  const setCurrentMenu = (newActive) => {
    setCurrent(newActive);
  };

  return (
    <currentMenuContext.Provider value={{ currentMenu, setCurrentMenu }}>
      {children}
    </currentMenuContext.Provider>
  );
};

export default currentMenuContext;
