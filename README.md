# Example Shopify Product Discount Function to limit discounts to certain markets and optionally exclude line items on sale

## Overview

This Shopify Function dynamically applies a 10% discount to eligible products in specific markets, excluding items that are already on sale. It is designed to integrate seamlessly with Shopify Markets, allowing for targeted discounts that enhance the shopping experience and promote sales in designated regions.

**[Demo](https://screenshot.click/19-00-8itdu-si1q9.mp4)**

## Features

- **Market-Specific Discounts**: Applies discounts only to products in specified markets (`de`, `usa`).
- **Exclusion of Sale Items**: Automatically excludes products that are already on sale from receiving additional discounts.
- **Dynamic Discount Application**: Discounts are applied dynamically based on the cart contents and market during the checkout process.

## Requirements

- Shopify plan that supports Shopify Functions.
- Access to the Shopify admin area to manage functions.

## Setup

To set up this project:

1. Create an [extension-only app](https://shopify.dev/docs/apps/build/app-extensions/build-extension-only-app):
   ```bash
   shopify app init

2. Create a new Product Discount Function and replace the code in the ['src' folder](https://github.com/markusvoigt/market_discount/tree/main/src).
3. Deploy the changes
   ```bash
   yarn deploy
4. Create a discount code using the [discountCodeAppCreate mutation](https://shopify.dev/docs/api/admin-graphql/2024-07/mutations/discountCodeAppCreate)
   

## Configuration

- **Market Handles**:
  - Adjust the `ELEGIBLE_MARKETS` array in the code to include or exclude market handles as required for your business strategy.
  
- **Sale Item Exclusion**:
  - Modify `EXLUDE_LINE_ITEMS_ON_SALE` to `true` to ensure sale items are excluded from discounts, or set it to `false` to include them in the discount calculations.

## Usage

Once deployed, the function will automatically apply a 10% discount to all eligible non-sale items in the specified markets at checkout. The function runs in the background and requires no manual intervention post-setup.

## Troubleshooting

- **Discounts Not Applied Correctly**:
  - Verify that the market handle during checkout matches one of the configured handles in `ELEGIBLE_MARKETS`.
  - Confirm that items are not on sale if `EXLUDE_LINE_ITEMS_ON_SALE` is set to `true`.

- **Function Errors**:
  - Check the function for any syntax or logical errors.
  - Ensure that all configurations and external references are correctly set up.

## Support

For further assistance, please consult [the relevant developer documentation](https://shopify.dev/docs/api/functions/reference/product-discounts).

