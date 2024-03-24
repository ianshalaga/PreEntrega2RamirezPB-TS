import QueryParams from "../interfaces/QueryParams";
import { z } from "zod";

const queryParamsSchema = z.object({
  limit: z.string().optional(),
  page: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  query: z
    .object({
      category: z.string().optional(),
      status: z.string().optional(),
    })
    .optional(),
});

function validateQueryParams(data: any): QueryParams {
  let validatedData: QueryParams = null;
  const { limit, page, sort, query } = data;
  let parsedQuery = undefined;
  if (query) {
    try {
      parsedQuery = JSON.parse(query);
    } catch (error) {
      throw new Error("Error al analizar la cadena JSON en query:");
    }
  }
  const validationResult = queryParamsSchema.safeParse({
    limit,
    page,
    sort,
    query: parsedQuery,
  });

  if (validationResult.success) {
    validatedData = validationResult.data;
  }

  return validatedData;
}

export default validateQueryParams;
