import React from "react";

const PendingList = ({ pendingOrders }) => {
  return (
    <>
      {pendingOrders.map((order) => (
        <div
          className="px-2 py-1 bg-zinc-50 shadow-md rounded-md mx-2 mb-1"
          key={order.id}
        >
          <div>
            Order no.{order.id} - {order.coffee.type}
          </div>
        </div>
      ))}
    </>
  );
};

export default PendingList;
