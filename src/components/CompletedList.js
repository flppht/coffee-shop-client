import React from "react";

const CompletedList = ({ completedOrders }) => {
  return (
    <>
      {completedOrders.map((order) => (
        <div className="px-2 py-1 bg-zinc-50 shadow-md rounded-md mx-2 mb-1">
          <div>
            Order no.{order.id} - {order.coffee.type} -{" "}
            {order.coffeeToGo ? "coffee to go" : "table order"}
          </div>
        </div>
      ))}
    </>
  );
};

export default CompletedList;
