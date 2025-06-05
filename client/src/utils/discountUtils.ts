export function applyDiscountToPrice(price: number, discountPercent: number) {
  const discountAmount = (price * discountPercent) / 100;

  const priceAfterDiscount = price - discountAmount;

  return {
    priceAfterDiscount,
    discountAmount,
  };
}
