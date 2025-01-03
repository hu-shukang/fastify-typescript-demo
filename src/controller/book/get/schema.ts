import { bookDesc, BookIdInput } from '@/model/book.model';
import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';

const paramsSchema: JSONSchemaType<BookIdInput> = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid', description: bookDesc.id },
  },
  required: ['id'],
  additionalProperties: false,
};

export const schema: FastifySchema = {
  summary: '書籍取得',
  description: '書籍を取得します。',
  tags: ['book'],
  params: paramsSchema,
  response: {
    200: {
      description: '成功',
      type: 'object',
      properties: {
        status: { type: 'string', const: 'success' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', description: bookDesc.id },
            title: { type: 'string', description: bookDesc.title },
            content: { type: 'string', description: bookDesc.content },
          },
        },
      },
    },
  },
};
