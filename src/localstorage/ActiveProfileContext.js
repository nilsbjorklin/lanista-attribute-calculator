import React, { useState, useContext, useMemo } from "react";
import { getActiveProfile, putActiveProfile } from "./localStorage";

const ActiveProfileIdContext = React.createContext();

export function useTheme() {
  return useContext(ActiveProfileIdContext);
}

export function ActiveProfileContext({ children }) {
  const [activeProfileId, setActiveProfileId] = useState(getActiveProfile());

  useMemo(()=> {
    console.log('Changed active profile');
    putActiveProfile(activeProfileId);
    return activeProfileId;
  }, [activeProfileId])

  return (
    <ActiveProfileIdContext.Provider value={{ activeProfileId, setActiveProfileId }}>
      {children}
    </ActiveProfileIdContext.Provider>
  );
}
