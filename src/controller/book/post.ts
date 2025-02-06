import { bookDesc, BookInput } from '@/model/book.model';
import { BookService } from '@/service/book.service';
import { logger } from '@/util/logger.util';
import { JSONSchemaType } from 'ajv';
import { FastifyInstance } from 'fastify';
import { FastifySchema } from 'fastify';

const bodySchema: JSONSchemaType<BookInput> = {
  type: 'object',
  properties: {
    title: { type: 'string', maxLength: 50, description: bookDesc.title },
    content: { type: 'string', maxLength: 10000, description: bookDesc.content },
  },
  required: ['title', 'content'],
  additionalProperties: false,
};

export const schema: FastifySchema = {
  summary: '書籍追加',
  description: '書籍を追加します。',
  tags: ['book'],
  body: bodySchema,
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
          },
        },
      },
    },
  },
};

const routes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: BookInput }>(
    '/',
    {
      schema: schema,
      config: {
        logPrefix: '書籍追加',
      },
    },
    async (req, _reply) => {
      const form = req.body;
      const id = await BookService.add(form);
      logger.info(`書籍を追加しました。id: ${id}`);
      return { status: 'success', data: { id } };
    },
  );
};

export default routes;
