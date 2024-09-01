import { useEffect, useState } from "react";
import { Scroll } from ".";
import { possibleCords } from "../utility/possibleCords";

export default function Scrolls() {
  const [selectedCords, setSelectedCords] = useState([]);

  useEffect(() => {
    const sortedCords = [...possibleCords].sort(() => 0.5 - Math.random());

    setSelectedCords(sortedCords.slice(0, 5));
  }, []);

  return (
    <>
      {selectedCords.map((position, index) => (
        <Scroll key={index} position={position} />
      ))}
    </>
  );
}
