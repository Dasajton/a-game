import { useEffect, useState } from "react";
import { Scroll } from ".";
import { possibleCords, goldenCord } from "../utility/possibleCords";
import { useAppContext } from "../AppContext";
import { TOTAL_SCROLLS } from "../utility/constants";

export default function Scrolls() {
  const [selectedCords, setSelectedCords] = useState([]);
  const { restartKey } = useAppContext();

  useEffect(() => {
    const sortedCords = [...possibleCords].sort(() => 0.5 - Math.random());

    setSelectedCords(sortedCords.slice(0, TOTAL_SCROLLS));
  }, [restartKey]);

  return (
    <>
      {selectedCords.map((position, index) => (
        <Scroll key={`${restartKey}-${index}`} position={position} />
      ))}
      <Scroll key={`golden-${restartKey}`} position={goldenCord} golden />
    </>
  );
}
