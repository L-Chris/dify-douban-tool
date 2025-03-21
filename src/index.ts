import { OpenAPIHono } from "@hono/zod-openapi";
// import { bearerAuth } from "hono/bearer-auth";
import { Bindings } from "./bindings";
import { searchBookRoute } from "./books";
import { searchBooks } from "./api";

const app = new OpenAPIHono<{ Bindings: Bindings }>();

app.doc31("/doc", (c) => ({
  openapi: c.env.OPENAPI_VERSION,
  info: {
    version: c.env.TOOL_VERSION,
    title: c.env.TOOL_NAME,
    description: c.env.TOOL_DESCRIPTION,
  },
  servers: [{ url: new URL(c.req.url).origin }],
}));

// app.use(
//   bearerAuth({
//     verifyToken: async (token, c) => {
//       return token === c.env.TOKEN;
//     },
//   })
// );

app
  .openapi(searchBookRoute, async (c) => {
    const q = c.req.query("q");
    const isbn = c.req.query("isbn");

    if (!q && !isbn) {
      return c.json({
        error: "Bad Request",
      });
    }

    try {
      let books = await searchBooks({ q, isbn })
      if (!books) {
        return c.json({
          error: "Not Found",
        });
      }
      return c.json({
        data: books,
        error: null,
      });
    } catch (e) {
      return c.json({
        error: "Internal Server Error",
      });
    }
  })

// app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
//   type: "http",
//   scheme: "bearer",
// });


export default app;
