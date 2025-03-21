import { z } from "@hono/zod-openapi";
  
export const NotFoundSchema = z.object({
  error: z.string().openapi({
    example: "Not Found",
    description: "Error Message",
  }),
});

export const BadRequestSchema = z.object({
  error: z.string().openapi({
    example: "Bad Request",
    description: "Error Message",
  }),
});

export const InternalServerErrorSchema = z.object({
  error: z.string().openapi({
    example: "Internal Server Error",
    description: "Error Message",
  }),
});

export const ResponseSchema = z.object({
  data: z.unknown().openapi({
    example: {},
    description: "Response data",
  }),
  error: z.union([z.string(), z.null()]).openapi({
    example: "Error Message",
    description: "Error Message or null if no error occurred",
  }),
});