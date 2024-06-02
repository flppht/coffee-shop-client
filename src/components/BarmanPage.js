import axios from "axios";
import React, { useEffect, useState } from "react";
import CoffeeToGoOrder from "./CoffeeToGoOrder";
import CoffeeList from "./CoffeeList";
import BaristasList from "./BaristasList";
import PendingList from "./PendingList";
import CompletedList from "./CompletedList";

const BarmanPage = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [coffees, setCoffees] = useState([]);
  const [baristas, setBaristas] = useState([]);

  const fetchCoffees = () => {
    axios.get("http://localhost:8080/coffee/allCoffees").then((response) => {
      setCoffees(response.data);
    });
  };

  const fetchBaristas = () => {
    axios
      .get("http://localhost:8080/barista/allBaristas")
      .then((response) => setBaristas(response.data));
  };

  const fetchPendingOrders = () => {
    axios
      .get("http://localhost:8080/barman/pendingOrders")
      .then((response) => setPendingOrders(response.data));
  };

  const fetchCompletedOrders = () => {
    axios
      .get("http://localhost:8080/barman/completedOrders")
      .then((response) => setCompletedOrders(response.data));
  };

  useEffect(() => {
    fetchCoffees();
    fetchBaristas();
    fetchPendingOrders();
    fetchCompletedOrders();

    const interval = setInterval(() => {
      fetchBaristas();
      fetchPendingOrders();
      fetchCompletedOrders();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center text-amber-900">
      <div className="font-semibold text-xl my-2">Coffee To Go</div>
      <div className="flex flex-row overflow-x-auto w-[500px] justify-between">
        {coffees && coffees.length > 0 && <CoffeeList coffees={coffees} />}
      </div>

      <div className="flex flex-col items-center">
        <CoffeeToGoOrder setMessage={setMessage} />
        {message !== "" && <div className="italic">{message}</div>}
      </div>

      <div className="mt-5 mb-2 font-semibold">Baristas:</div>
      <div className="flex flex-row">
        {baristas && baristas.length > 0 && (
          <BaristasList baristas={baristas} />
        )}
      </div>
      <div className="mt-5 mb-2 grid grid-cols-2 justify-between gap-2">
        <div className="flex flex-col">
          <div className="pl-2 font-semibold">
            Pending "coffee to go" orders:
          </div>
          <div className="overflow-auto h-[200px] mt-1">
            {pendingOrders && pendingOrders.length > 0 && (
              <PendingList pendingOrders={pendingOrders} />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="pl-2 font-semibold">All completed orders:</div>
          <div className="overflow-auto h-[200px] mt-1">
            {completedOrders && completedOrders.length > 0 && (
              <CompletedList completedOrders={completedOrders} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarmanPage;
