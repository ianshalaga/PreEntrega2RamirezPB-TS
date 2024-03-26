import ProductCart from "../interfaces/ProductCart";
import { z } from "zod";

const productCartSchema = z
  .object({
    product: z.string(),
    quantity: z.number(),
  })
  .strict();

function validateProductCart(data: any): ProductCart[] {
  const validatedProducts: ProductCart[] = [];

  for (const item of data) {
    const validationResult = productCartSchema.safeParse(item);
    if (validationResult.success) {
      validatedProducts.push(item);
    } else {
      throw new Error("Objeto de actualización inválido.");
    }
  }
  return validatedProducts;
}

export default validateProductCart;
