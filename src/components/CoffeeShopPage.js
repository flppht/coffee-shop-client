import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CoffeeItem from "./CoffeeItem";
import CoffeeOrder from "./CoffeeOrder";
import StatusOfOrder from "./StatusOfOrder";

const CoffeeShopPage = () => {
  const [coffees, setCoffees] = useState([]);
  const [order, setOrder] = useState([]);
  const [statusOfOrder, setStatusOfOrder] = useState([]);

  useEffect(() => {
    const getAllCoffees = async () => {
      axios.get("http://localhost:8080/coffee/allCoffees").then((response) => {
        setCoffees(response.data);
      });
    };

    getAllCoffees();
  }, []);

  const selectCoffee = useCallback((coffee) => {
    setOrder((prevOrder) => {
      const orderIndex = prevOrder.findIndex(
        (prev) => prev.coffeeId === coffee.id
      );
      if (orderIndex !== -1) {
        let updatedOrder = [...prevOrder];
        updatedOrder[orderIndex].count += 1;
        return updatedOrder;
      } else {
        return [
          ...prevOrder,
          {
            coffeeId: coffee.id,
            count: 1,
            type: coffee.type,
            price: coffee.price,
          },
        ];
      }
    });
  }, []);

  const deselectCoffee = useCallback((coffeeId) => {
    setOrder((prevOrder) => {
      const orderIndex = prevOrder.findIndex((o) => o.coffeeId === coffeeId);
      let updatedOrder = [...prevOrder];

      updatedOrder[orderIndex].count -= 1;

      return updatedOrder.filter((order) => order.count > 0);
    });
  }, []);

  return (
    <div className="flex flex-col mt-2 items-center w-full">
      <div className="mt-2 mb-1 font-semibold text-2xl text-amber-900">
        COFFEE SHOP
      </div>
      <hr className={`w-2/3 border-1 border-amber-900/50 rounded-md`} />

      <div className="flex flex-col items-center md:items-start md:grid md:grid-cols-2 md:justify-items-center w-[400px] md:w-[600px] lg:w-[800px] gap-2 md:gap-0">
        <div className="mt-5 w-[350px] md:w-[280px] lg:w-[350px] bg-[#f9f9f9] rounded-md px-3 py-2 md:mb-2 overflow-auto max-h-[500px] md:max-h-[900px] lg:max-h-[595px] text-amber-900">
          <div className="font-semibold my-1 ">Choose your coffee:</div>
          <div className="mt-1 mb-3 grid grid-cols-2 gap-2 md:flex md:flex-col">
            {coffees.length > 0 &&
              coffees.map((coffee) => (
                <div key={coffee.id}>
                  <CoffeeItem coffee={coffee} selectCoffee={selectCoffee} />
                </div>
              ))}
          </div>
        </div>
        <div className="mt-5 w-[350px] md:w-[280px] lg:w-[350px] bg-[#f9f9f9] rounded-md px-3 py-2 mb-2 text-amber-900">
          <CoffeeOrder
            order={order}
            coffees={coffees}
            deselectCoffee={deselectCoffee}
            setStatusOfOrder={setStatusOfOrder}
            setOrder={setOrder}
          />

          {statusOfOrder && statusOfOrder.length > 0 && (
            <StatusOfOrder
              statusOfOrder={statusOfOrder}
              setStatusOfOrder={setStatusOfOrder}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CoffeeShopPage;
