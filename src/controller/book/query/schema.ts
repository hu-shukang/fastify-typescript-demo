import { bookDesc, BookQueryInput } from '@/model/book.model';
import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';

const querystringSchema: JSONSchemaType<BookQueryInput> = {
  type: 'object',
  properties: {
    title: { type: 'string', maxLength: 50, nullable: true, description: bookDesc.title },
    content: { type: 'string', maxLength: 10000, nullable: true, description: bookDesc.content },
  },
  additionalProperties: false,
};

export const schema: FastifySchema = {
  description: '書籍検索',
  tags: ['book'],
  summary: '書籍を検索します。',
  querystring: querystringSchema,
  response: {
    200: {
      description: '成功',
      type: 'object',
      properties: {
        status: { type: 'string', const: 'success' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: bookDesc.id },
              title: { type: 'string', description: bookDesc.title },
              createdAt: { type: 'string', description: bookDesc.createdAt },
              updatedAt: { type: 'string', description: bookDesc.updatedAt },
            },
          },
        },
      },
    },
  },
};