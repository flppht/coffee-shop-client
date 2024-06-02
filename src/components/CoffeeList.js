const CoffeeList = ({ coffees }) => {
  return (
    <>
      {coffees.map((coffee) => (
        <div className="flex flex-col px-2 pb-2 pt-1 shadow-md rounded-md m-1 min-w-36 mb-1 bg-[#f9f9f9]">
          <div className="flex flex-col pl-1" key={coffee.id}>
            <p className="capitalize font-semibold">{coffee.type}</p>
            <p>code: {coffee.id}</p>
          </div>
          {/* <img
            src={coffee.imageUrl}
            alt={coffee.type}
            className="w-16 h-16 rounded-sm shadow-md self-center mt-1"
          /> */}
        </div>
      ))}
    </>
  );
};

export default CoffeeList;
