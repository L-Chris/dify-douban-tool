import { createRoute } from "@hono/zod-openapi";
import {
  BadRequestSchema,
  BookSearchResponseSchema
} from "./schema";
import { z } from "@hono/zod-openapi";

export const searchBookRoute = createRoute({
  method: "get",
  path: "/book/search",
  operationId: "searchBook",
  summary: "Search book by query or isbn",
  request: {
    query: z.object({
      q: z.string().optional().openapi({
        example: "The Great Gatsby",
        description: "search query",
      }),
      isbn: z.string().optional().openapi({
        example: "9787544253994",
        description: "isbn",
      }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: BookSearchResponseSchema,
        },
      },
      description: "Search book by name",
    },
    400: {
      content: {
        "application/json": {
          schema: BadRequestSchema,
        },
      },
      description: "Bad Request",
    },
  },
});
