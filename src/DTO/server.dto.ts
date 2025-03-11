import { IsString, IsNumber, IsArray, IsNotEmpty } from 'class-validator';

export class ConfigureGameServer {
  @IsString()
  @IsNotEmpty()
  serverId: string;

  @IsNumber()
  @IsNotEmpty()
  playerCount: number;

  @IsArray()
  @IsNotEmpty()
  players: {
    playerId: string;
    username: string;
    profileImage: string;
    serverJoinTime: number;
  }[];

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsNumber()
  @IsNotEmpty()
  startTime: number;
}
