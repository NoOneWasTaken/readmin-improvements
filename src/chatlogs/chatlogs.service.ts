import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ChatLog } from '../DTO/chatlog.dto';

@Injectable()
export class ChatlogsService {
  private prisma = new PrismaClient();

  async getChatlogs(serverId: string, filter: string | null | undefined) {
    try {
      if (!filter) {
        const chatlogs = await this.prisma.chatLog.findMany({
          where: {
            serverId: serverId,
          },
        });

        return chatlogs ? chatlogs : [];
      }

      const chatlogs = await this.prisma.chatLog.findMany({
        where: {
          serverId: serverId,
          message: {
            contains: filter,
          },
        },
      });

      return chatlogs ? chatlogs : [];
    } catch (e) {
      console.error('Error listing chatlogs:\n\n', e);
      throw new HttpException('Internal server error', 500);
    }
  }

  async registerChatMessage(chatlog: ChatLog) {
    try {
      await this.prisma.chatLog.create({
        data: {
          message: chatlog.message,
          timestamp: new Date(chatlog.timestamp),
          playerId: chatlog.playerId,
          serverId: chatlog.serverId,
        },
      });

      return { status: 200, message: 'Chat registered' };
    } catch (e) {
      console.error('Error registering chatlog:\n\n', e);
      throw new HttpException('Internal server error', 500);
    }
  }
}
