import { useAppContext } from "../AppContext";

export default function UICollectedItems() {
  const { itemsCollected } = useAppContext();
  return (
    <div className="uiCollected">
      <img src="Ui.png" className="uiBG" />
      {itemsCollected}
    </div>
  );
}
