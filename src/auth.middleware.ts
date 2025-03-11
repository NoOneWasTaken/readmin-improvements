import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { WsException } from '@nestjs/websockets';

const prisma = new PrismaClient();

const AUTH_GUARD = async (req: Request, res: Response, next: NextFunction) => {
  if (
    req.headers.upgrade &&
    req.headers.upgrade.toLowerCase() === 'websocket'
  ) {
    console.log('Websocket connection detected! By-passing auth guard...');
    return next();
  }
  if (req.url === '/api/server/configure' && req.method === 'POST') {
    return next();
  }

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const existingServer = await prisma.server.findFirst({
      where: { serverToken: token },
    });

    if (!existingServer) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    return next();
  } catch (e) {
    console.error('Error from AUTH_GUARD\n\n', e);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const GATEWAY_GUARD = (socket: Socket): any => {
  try {
    console.log('Socket connection detected!');

    const token = socket.handshake.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Invalid Token');

    return verify(token, process.env.SECRET as string);
  } catch (e) {
    if (e instanceof Error && e.message === 'Invalid Token') {
      throw new WsException('Invalid Token');
    }

    console.error('Error from GATEWAY_GUARD\n\n', e);
    throw new WsException('Unauthorized');
  }
};

export { AUTH_GUARD, GATEWAY_GUARD };
