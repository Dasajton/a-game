import { useContext, createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [playerPosition, setPlayerPosition] = useState([0, -0.9, 0]);
  const [itemsCollected, setItemsCollected] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState(false);

  return (
    <AppContext.Provider
      value={{
        playerPosition,
        itemsCollected,
        levelCompleted,
        setPlayerPosition,
        setItemsCollected,
        setLevelCompleted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
