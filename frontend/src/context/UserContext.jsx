import { createContext, useEffect, useState } from "react";
import { lookInSession } from "../common/session";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");
    if (userInSession) {
      setUserAuth(JSON.parse(userInSession));
    } else {
      setUserAuth({ access_token: null });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
