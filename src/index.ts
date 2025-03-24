import { OpenAPIHono } from '@hono/zod-openapi'
import { searchBookRoute } from './books'
import { getGroupTopics, searchBooks, getGroupTopicDetail } from './api'
import { listGroupTopicsRoute, getGroupTopicDetailRoute } from './group'

const app = new OpenAPIHono<{ Bindings: {
  COOKIE: string;
  OPENAPI_VERSION: string;
  TOOL_VERSION: string;
  TOOL_NAME: string;
  TOOL_DESCRIPTION: string;
} }>()

app.doc31('/doc', c => ({
  openapi: c.env.OPENAPI_VERSION,
  info: {
    version: c.env.TOOL_VERSION,
    title: c.env.TOOL_NAME,
    description: c.env.TOOL_DESCRIPTION
  },
  servers: [{ url: new URL(c.req.url).origin }]
}))

app.openapi(searchBookRoute, async c => {
  const q = c.req.query('q')
  const isbn = c.req.query('isbn')

  if (!q && !isbn) {
    return c.json({
      error: 'Bad Request'
    })
  }

  try {
    let books = await searchBooks({ q, isbn })
    if (!books) {
      return c.json({
        error: 'Not Found'
      })
    }
    return c.json({
      data: books,
      error: null
    })
  } catch (e) {
    return c.json({
      error: 'Internal Server Error'
    })
  }
})

app.openapi(listGroupTopicsRoute, async c => {
  const id = c.req.param('id')
  const tag = c.req.query('tag')
  const from_date = c.req.query('from_date')

  try {
    const topics = await getGroupTopics({ id, tag, from_date })

    return c.json({
      data: topics,
      error: null
    })
  } catch (e) {
    return c.json({
      error: 'Internal Server Error'
    })
  }
})

app.openapi(getGroupTopicDetailRoute, async c => {
  const id = c.req.param('id')

  try {
    const detail = await getGroupTopicDetail({ id }, { cookie: c.env.COOKIE })

    return c.json({
      data: detail,
      error: null
    })
  } catch (e) {
    return c.json({
      error: 'Internal Server Error'
    })
  }
})

export default app
