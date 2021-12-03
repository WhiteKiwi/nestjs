import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmModuleOptionStrategy } from './type';

export interface MysqlConnectionInfoKeys {
	host: string;
	port: string;
	database: string;
	username: string;
	password: string;
}
export class MysqlTypeOrmModuleOptionStrategy
	implements TypeOrmModuleOptionStrategy
{
	constructor(private connectionInfoKeys: MysqlConnectionInfoKeys) {}

	get(configService: ConfigService) {
		const typeOrmModuleOptions: TypeOrmModuleOptions = {
			type: 'mysql',
			host: configService.get<string>(
				this.connectionInfoKeys['host'],
				'localhost',
			),
			port: configService.get<number>(this.connectionInfoKeys['port'], 3306),
			database: configService.get<string>(
				this.connectionInfoKeys['database'],
				'',
			),
			username: configService.get<string>(
				this.connectionInfoKeys['username'],
				'',
			),
			password: configService.get<string>(
				this.connectionInfoKeys['password'],
				'',
			),
		};
		return typeOrmModuleOptions;
	}
}
