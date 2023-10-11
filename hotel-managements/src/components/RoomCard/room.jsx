import React from "react";
import RoomCard from "./roomCard";
import { rooms } from "../../Data";
const Rooms = () => {
  return (
    <div className="flex items-center justify-center flex-col  sm:flex-row mx-auto">
      {rooms.map((data, index) => (
        <RoomCard
          price={data.price}
          roomName={data.name}
          features={data.features}
        />
      ))}
    </div>
  );
};

export default Rooms;
