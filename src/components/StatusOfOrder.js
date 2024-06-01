import axios from "axios";
import React, { useEffect } from "react";

const StatusOfOrder = ({ statusOfOrder, setStatusOfOrder }) => {
  useEffect(() => {
    const updateStatus = async () => {
      const updatedOrders = await Promise.all(
        statusOfOrder.map(async (order) => {
          const newStatus = await axios
            .get(`http://localhost:8080/barman/status/${order.id}`)
            .then((response) => response.data)
            .catch((err) => console.error(err.response.data));
          if (newStatus !== order.status) {
            return { ...order, status: newStatus };
          }
          return order;
        })
      );
      setStatusOfOrder(updatedOrders);
    };

    let interval;
    const allOrdersCompleted = statusOfOrder.every(
      (order) => order.status === "COMPLETED"
    );
    if (allOrdersCompleted) {
      clearInterval(interval);
    } else {
      interval = setInterval(updateStatus, 10000);
    }

    return () => clearInterval(interval);
  }, [statusOfOrder]);

  return (
    <div className="flex flex-col overflow-auto max-h-[350px] md:max-h-[640px] lg:max-h-[340px] mt-2 mb-1">
      <div className="font-semibold mt-3">Order(s) status:</div>
      <hr className={`w-11/12 border-1 border-amber-900/30 rounded-md my-1`} />
      {statusOfOrder.map((s) => (
        <div key={s.id} className="my-1">
          Order no.{s.id} for {s.coffee.type} is:{" "}
          <span className="font-semibold">{s.status}</span>
        </div>
      ))}
    </div>
  );
};

export default StatusOfOrder;
