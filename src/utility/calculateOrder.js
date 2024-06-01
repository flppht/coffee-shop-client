export const calculateOrder = (order) => {
  let amount = 0;

  order.forEach((o) => {
    amount += o.price * o.count;
  });

  return amount;
};
