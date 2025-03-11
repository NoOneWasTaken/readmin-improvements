import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { ConfigureGameServer } from '../DTO/server.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ServerService {
  private prisma = new PrismaClient();

  async getAllOnlineGameServers() {
    const servers = await this.prisma.server.findMany();

    return servers ? servers : [];
  }

  async configureGameServer(serverConfig: ConfigureGameServer) {
    try {
      const serverToken = uuid();

      await this.prisma.server.create({
        data: {
          serverId: serverConfig.serverId,
          serverToken: serverToken,
          playerCount: serverConfig.playerCount,
          region: serverConfig.region,
          startTime: new Date(serverConfig.startTime * 1000),
        },
      });

      await this.prisma.player.createMany({
        data: serverConfig.players.map((player) => {
          return {
            playerId: player.playerId,
            serverId: serverConfig.serverId,
            username: player.username,
            profileImage: `https://api.dicebear.com/9.x/initials/svg?seed=${player.username}`,
            serverJoinTime: new Date(player.serverJoinTime * 1000),
          };
        }),
      });

      return { status: 201, server_token: serverToken };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new HttpException('Server ID already exists', 400);
      }

      console.error('Error configuring game server:\n\n', e);
      throw new HttpException('Internal server error', 500);
    }
  }

  async deleteGameServer(serverToken: string) {
    try {
      if (!serverToken) {
        throw new Error('400');
      }

      await this.prisma.server.delete({
        where: {
          serverToken,
        },
      });

      return {
        status: 204,
        message: 'Server and its data was successfully deleted.',
      };
    } catch (e) {
      if (e instanceof Error && e.message === '400') {
        throw new HttpException(e.message as string, 400);
      }

      console.error('Error deleting game server data:\n\n', e);
      throw new HttpException('Internal server error', 500);
    }
  }
}
