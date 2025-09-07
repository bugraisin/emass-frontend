export const formatPrice = (priceString: string): string => {
  const num = parseFloat(priceString);
  return new Intl.NumberFormat("tr-TR").format(num);
};
