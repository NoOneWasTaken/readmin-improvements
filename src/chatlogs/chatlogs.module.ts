import { Module } from '@nestjs/common';
import { ChatlogsService } from './chatlogs.service';
import { ChatlogsController } from './chatlogs.controller';

@Module({
  providers: [ChatlogsService],
  controllers: [ChatlogsController]
})
export class ChatlogsModule {}
