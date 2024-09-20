// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

function isLineOnDiscount(line) {
  const compareAtPrice = line.cost.compareAtAmountPerQuantity?.amount;
  const currentPrice = line.cost.amountPerQuantity.amount;
  return compareAtPrice && compareAtPrice > currentPrice;
}

const ELEGIBLE_MARKETS = ['de','usa']
const EXLUDE_LINE_ITEMS_ON_SALE=true
/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const currentMarket = input?.localization.market.handle;
  if (!ELEGIBLE_MARKETS.some((market)=>market===currentMarket)) return EMPTY_DISCOUNT;
  const targets = input.cart.lines.filter((line) => !isLineOnDiscount(line) || !EXLUDE_LINE_ITEMS_ON_SALE)
    .map((line) => {
      return ({
        cartLine: {
          id: line.id,
        },
      });
    });
  if (!targets.length) {
    console.error("No cart lines qualify for our discount.");
    return EMPTY_DISCOUNT;
  }

  return {
    discounts: [
      {
        targets,
        value: {
          percentage: {
            value: "10.0",
          },
        },
      },
    ],
    discountApplicationStrategy: DiscountApplicationStrategy.All,
  };

};
