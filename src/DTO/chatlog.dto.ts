import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class ChatLog {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  timestamp: number;

  @IsString()
  @IsNotEmpty()
  playerId: string;

  @IsString()
  @IsNotEmpty()
  serverId: string;
}
