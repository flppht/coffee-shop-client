import React from "react";

const CoffeeItem = ({ coffee, selectCoffee }) => {
  return (
    <div
      className="flex flex-col items-center my-2"
      onClick={() => selectCoffee(coffee)}
    >
      <p className="capitalize text-left">
        {coffee.type}: <span className="font-semibold">{coffee.price}$</span>
      </p>
      <img
        src={coffee.imageUrl}
        alt={coffee.type}
        className="max-w-36 md:max-w-52 max-h-36 md:max-h-52 rounded-sm shadow-md"
      />
    </div>
  );
};

export default CoffeeItem;
