import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  InsertJoiningPlayerData,
  RemoveLeavingPlayerData,
} from '../DTO/player.dto';

@Injectable()
export class PlayerService {
  private prisma = new PrismaClient();

  getAllPlayersData(filter?: string | null) {
    if (filter) {
      return this.prisma.player.findMany({
        where: {
          username: {
            contains: filter,
          },
        },
      });
    }

    return this.prisma.player.findMany() ?? [];
  }

  async insertJoiningPlayerData(playerData: InsertJoiningPlayerData) {
    try {
      await this.prisma.player.create({
        data: {
          playerId: playerData.playerId,
          serverId: playerData.serverId,
          username: playerData.username,
          profileImage: `https://api.dicebear.com/9.x/initials/svg?seed=${playerData.username}`,
          serverJoinTime: new Date(playerData.serverJoinTime * 1000),
        },
      });

      await this.prisma.server.update({
        where: {
          serverId: playerData.serverId,
        },
        data: {
          playerCount: {
            increment: 1,
          },
        },
      });

      return { status: 201, message: 'Player added' };
    } catch (e) {
      console.error('Error inserting joining player data:\n\n', e);
      throw new HttpException('Internal server error', 500);
    }
  }

  async removeLeavingPlayerData(playerData: RemoveLeavingPlayerData) {
    try {
      await this.prisma.player.delete({
        where: {
          playerId: playerData.playerId,
          serverId: playerData.serverId,
        },
      });

      await this.prisma.server.update({
        where: {
          serverId: playerData.serverId,
        },
        data: {
          playerCount: {
            decrement: 1,
          },
        },
      });

      return { status: 204, message: 'Player removed' };
    } catch (e) {
      console.error('Error removing leaving player data:\n\n', e);
      throw new HttpException('Internal server error', 500);
    }
  }
}
