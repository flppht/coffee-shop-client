import axios from "axios";
import { calculateOrder } from "../utility/calculateOrder";

const CoffeeOrder = ({ order, deselectCoffee, setStatusOfOrder, setOrder }) => {
  const makeOrder = () => {
    const data = order.map((o) => {
      return { id: o.coffeeId, count: o.count };
    });
    axios.post("http://localhost:8080/barman/table", data).then((response) => {
      setStatusOfOrder((prev) => [...prev, ...response.data]);
    });
  };

  return (
    <div className="flex flex-col md:max-h-[240px]">
      <div className="flex flex-row justify-between items-center align-middle my-1">
        <div className="font-semibold">Your order:</div>
        <button
          className="bg-orange-900/70 rounded-md px-2 py-1 text-white hover:bg-orange-900/80"
          type="button"
          onClick={() => {
            setOrder([]);
            setStatusOfOrder([]);
          }}
        >
          New order
        </button>
      </div>
      <div className="mt-3 overflow-auto lg:max-h-[100px]">
        {order.length > 0 &&
          order.map((ord) => (
            <div
              key={ord.coffeeId}
              className="capitalize flex flex-row relative"
            >
              <div className="flex flex-row w-52">
                <p className="w-5/6">{ord.type}: </p>
                <p>{ord.count}</p>
              </div>
              <span
                className="font-semibold text-red-500 absolute right-8 cursor-pointer px-1"
                onClick={() => deselectCoffee(ord.coffeeId)}
              >
                X
              </span>
            </div>
          ))}
      </div>

      {order && order.length > 0 && (
        <>
          <hr
            className={`w-11/12 border-1 border-amber-900/30 rounded-md my-1`}
          />
          <div className="font-semibold">
            Total to pay: {calculateOrder(order)} $
          </div>
          <button
            className="bg-teal-700/70 rounded-md px-2 py-1 text-white hover:bg-teal-700/90 mx-2 mt-4"
            type="button"
            onClick={makeOrder}
          >
            Make an order
          </button>
        </>
      )}
    </div>
  );
};

export default CoffeeOrder;
