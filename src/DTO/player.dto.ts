import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class InsertJoiningPlayerData {
  @IsString()
  @IsNotEmpty()
  playerId: string;

  @IsString()
  @IsNotEmpty()
  serverId: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  @IsNotEmpty()
  serverJoinTime: number;
}

export class RemoveLeavingPlayerData extends PartialType(
  InsertJoiningPlayerData,
) {}
