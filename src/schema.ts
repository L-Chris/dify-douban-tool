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

// 通用响应Schema
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

// 书籍搜索响应Schema
export const BookSchema = z.object({
  rating: z.object({
    max: z.number().openapi({
      example: 10,
      description: "最高分",
    }),
    numRaters: z.number().openapi({
      example: 214056,
      description: "评分人数",
    }),
    average: z.string().openapi({
      example: "9.2", 
      description: "平均评分",
    }),
    min: z.number().openapi({
      example: 0,
      description: "最低分",
    }),
  }).openapi({
    description: "图书评分信息",
  }),
  subtitle: z.string().openapi({
    example: "魔幻现实主义文学经典",
    description: "副标题",
  }),
  author: z.array(z.string()).openapi({
    example: ["加西亚·马尔克斯"],
    description: "作者",
  }),
  pubdate: z.string().openapi({
    example: "2011/06",
    description: "出版日期",
  }),
  tags: z.array(z.object({
    count: z.number(),
    name: z.string(),
    title: z.string(),
  })).openapi({
    example: [{ count: 1000, name: "小说", title: "小说" }],
    description: "图书标签",
  }),
  origin_title: z.string().openapi({
    example: "Cien años de soledad",
    description: "原作名",
  }),
  image: z.string().openapi({
    example: "https://img.example.com/book.jpg",
    description: "图书封面图片URL",
  }),
  binding: z.string().openapi({
    example: "精装",
    description: "装帧",
  }),
  translator: z.array(z.any()).openapi({
    example: ["范晔"],
    description: "译者",
  }),
  catalog: z.string().openapi({
    example: "第一章\n第二章\n...",
    description: "目录",
  }),
  pages: z.string().openapi({
    example: "368",
    description: "页数",
  }),
  images: z.object({
    small: z.string(),
    large: z.string(),
    medium: z.string(),
  }).openapi({
    example: {
      small: "https://img.example.com/small.jpg",
      large: "https://img.example.com/large.jpg",
      medium: "https://img.example.com/medium.jpg",
    },
    description: "图书封面不同尺寸",
  }),
  alt: z.string().openapi({
    example: "https://book.douban.com/subject/1234567/",
    description: "豆瓣链接",
  }),
  id: z.string().openapi({
    example: "1234567",
    description: "图书ID",
  }),
  publisher: z.string().openapi({
    example: "南海出版公司",
    description: "出版社",
  }),
  isbn10: z.string().openapi({
    example: "7544253996",
    description: "10位ISBN",
  }),
  isbn13: z.string().openapi({
    example: "9787544253994",
    description: "13位ISBN",
  }),
  title: z.string().openapi({
    example: "百年孤独",
    description: "书名",
  }),
  url: z.string().openapi({
    example: "https://book.douban.com/subject/1234567/",
    description: "豆瓣URL",
  }),
  alt_title: z.string().openapi({
    example: "One Hundred Years of Solitude",
    description: "副标题",
  }),
  author_intro: z.string().openapi({
    example: "加西亚·马尔克斯，哥伦比亚作家...",
    description: "作者简介",
  }),
  summary: z.string().openapi({
    example: "《百年孤独》是魔幻现实主义文学的代表作...",
    description: "图书简介",
  }),
  series: z.object({
    id: z.string(),
    title: z.string(),
  }).optional().openapi({
    example: { id: "123", title: "马尔克斯文集" },
    description: "丛书信息",
  }),
  price: z.string().openapi({
    example: "39.50元",
    description: "价格",
  }),
  ebook_url: z.string().optional().openapi({
    example: "https://read.douban.com/ebook/1234567/",
    description: "电子书链接",
  }),
});

export const BookSearchResponseSchema = z.object({
  data: z.array(BookSchema).openapi({
    description: "搜索到的图书列表",
  }),
  error: z.union([z.string(), z.null()]).openapi({
    example: null,
    description: "错误信息，如果没有错误则为null",
  }),
});

// 群组话题列表响应Schema
export const TopicSchema = z.object({
  update_time: z.string().openapi({
    example: "2023-01-02 14:30:00",
    description: "更新时间",
  }),
  is_event: z.boolean().openapi({
    example: false,
    description: "是否是活动",
  }),
  is_elite: z.boolean().openapi({
    example: false,
    description: "是否是精华",
  }),
  title: z.string().openapi({
    example: "读书心得分享",
    description: "话题标题",
  }),
  url: z.string().openapi({
    example: "https://www.douban.com/group/topic/123456/",
    description: "话题URL",
  }),
  topic_tags: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })).openapi({
    example: [{ id: "111517", name: "读书" }],
    description: "话题标签",
  }),
  author: z.array(z.any()).openapi({
    description: "作者信息",
  }),
  uri: z.string().openapi({
    example: "douban://douban.com/group/topic/123456",
    description: "话题URI",
  }),
  cover_url: z.string().nullable().openapi({
    example: "https://img.example.com/cover.jpg",
    description: "封面图片URL",
  }),
  id: z.string().openapi({
    example: "123456",
    description: "话题ID",
  }),
  create_time: z.string().openapi({
    example: "2023-01-01 12:00:00",
    description: "创建时间",
  }),
  comments_count: z.number().openapi({
    example: 42,
    description: "评论数量",
  }),
  activity_tag: z.null().openapi({
    description: "活动标签",
  }),
  gallery_topic: z.null().openapi({
    description: "画廊话题",
  }),
  label: z.string().openapi({
    example: "讨论",
    description: "标签类型",
  }),
  type: z.string().openapi({
    example: "topic",
    description: "类型",
  }),
  is_ad: z.boolean().openapi({
    example: false,
    description: "是否是广告",
  }),
});

export const GroupTopicsResponseSchema = z.object({
  data: z.array(TopicSchema).openapi({
    description: "群组话题列表",
  }),
  error: z.union([z.string(), z.null()]).openapi({
    example: null,
    description: "错误信息，如果没有错误则为null",
  }),
});

// 话题详情响应Schema
export const TopicDetailSchema = z.object({
  like_count: z.number().openapi({
    example: 56,
    description: "点赞数量",
  }),
  comments_count: z.number().openapi({
    example: 42,
    description: "评论数量",
  }),
  collections_count: z.number().openapi({
    example: 15,
    description: "收藏数量",
  }),
  reshares_count: z.number().openapi({
    example: 8,
    description: "转发数量",
  }),
  content: z.string().openapi({
    example: "<p>这是一篇读书心得分享...</p>",
    description: "话题内容",
  }),
  abstract: z.string().openapi({
    example: "这是一篇读书心得分享...",
    description: "话题摘要",
  }),
}).openapi({
  description: "话题详情信息",
});

// 合并话题详情，添加基础话题信息
export const FullTopicDetailSchema = TopicSchema.merge(TopicDetailSchema);

export const TopicDetailResponseSchema = z.object({
  data: FullTopicDetailSchema.openapi({
    description: "话题详细信息",
  }),
  error: z.union([z.string(), z.null()]).openapi({
    example: null,
    description: "错误信息，如果没有错误则为null",
  }),
});