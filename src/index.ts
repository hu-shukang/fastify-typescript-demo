import fastify from 'fastify';
import autoLoad from '@fastify/autoload';
import path from 'path';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'local') {
  dotenv.config();
}

const server = fastify({
  disableRequestLogging: true,
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: process.env.NODE_ENV === 'local',
        translateTime: 'SYS:standard',
        ignore: 'pid,reqId,hostname,res,responseTime,logPrefix',
        messageFormat: '[{reqId}] [{logPrefix}] - {msg}',
      },
    },
  },
});

server.register(autoLoad, {
  dir: path.join(__dirname, 'plugin'),
  matchFilter: (path) => path.endsWith('global.plugin.ts'),
});

server.register(autoLoad, {
  dir: path.join(__dirname, 'controller'),
});

server.listen({ host: '0.0.0.0', port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
  console.log(server.printRoutes());
});

export default server;
