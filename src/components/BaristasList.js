import React from "react";

const BaristasList = ({ baristas }) => {
  return (
    <>
      {baristas.map((barista) => (
        <div
          className="p-2 bg-zinc-50 shadow-md rounded-md mx-1"
          key={barista.id}
        >
          <p className="underline underline-offset-2">Barista {barista.id}</p>
          <p>Busy: {barista.busy ? "yes" : "no"}</p>
          {barista.refilling && <p>Refilling...</p>}
        </div>
      ))}
    </>
  );
};

export default BaristasList;
