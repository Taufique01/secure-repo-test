
export function orderTotal(order) {
  const total = order.orderDetails.reduce(
    (partialSum, value) => partialSum + value.quantity * value.price,
    0
  );

  return total;
}
