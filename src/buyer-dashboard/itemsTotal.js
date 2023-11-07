
export function itemsTotal(order) {
  const total = order.orderDetails.reduce(
    (partialSum, value) => partialSum + value.quantity,
    0
  );

  return total;
}
