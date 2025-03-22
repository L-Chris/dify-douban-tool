import { createRoute } from "@hono/zod-openapi";
import {
  BadRequestSchema,
  ResponseSchema
} from "./schema";
import { z } from "@hono/zod-openapi";

export const listGroupTopicsRoute = createRoute({
  method: "get",
  path: "/group/{id}/topics",
  operationId: "listGroupTopics",
  summary: "List group topics",
  params: z.object({
    id: z.string().openapi({
      example: "732764",
      description: "group id",
    }),
  }),
  request: {
    query: z.object({
      tag: z.string().optional().openapi({
        example: "111517",
        description: "topic tag name",
      }),
      from_date: z.string().optional().openapi({
        example: "2025-01-01",
        description: "from date",
      }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ResponseSchema,
        },
      },
      description: "List group topics",
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
