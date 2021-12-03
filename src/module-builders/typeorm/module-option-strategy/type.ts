import { Function } from '@kiwi-lib/utils';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface TypeOrmModuleOptionStrategy {
	get: Function<ConfigService, TypeOrmModuleOptions>;
}
