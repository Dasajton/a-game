import { useEffect } from "react";
import { useAppContext } from "../AppContext";

export default function UILevelCompleted() {
  const { levelCompleted, setLevelCompleted, itemsCollected } = useAppContext();

  useEffect(() => {
    if (itemsCollected === 5) {
      setLevelCompleted(true);

      const timer = setTimeout(() => {
        setLevelCompleted(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [itemsCollected, setLevelCompleted]);

  return levelCompleted ? (
    <div className="levelCompleted">
      <img src="collected.png" />
    </div>
  ) : null;
}
