import { z } from "zod";

const numberSchema = z.object({
  quantity: z.number(),
});

function validateNumber(data: any): number {
  const validationResult = numberSchema.safeParse(data);
  if (validationResult.success) {
    return validationResult.data.quantity;
  } else {
    throw new Error("Número inválido.");
  }
}

export default validateNumber;
