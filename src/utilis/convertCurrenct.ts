/**
 * Converte um valor monetário (BRL) para centavos
 * @param {string} amount
 * @returns  um valor convertido em centavos
 * @example
 * convertRealToCents('1.300,50') //retorna 135000
 */
export function convertRealToCents(amount: string) {
  const numericPrice = parseFloat(amount.replace(/\./g, "").replace(",", "."));

  const priceInCents = Math.round(numericPrice * 100);

  return priceInCents;
}
