import { Builder } from '@kiwi-lib/utils';
import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptionStrategy } from './module-option-strategy';

export class TypeOrmModuleBuilder implements Builder<DynamicModule> {
	private moduleOptionStrategy?: TypeOrmModuleOptionStrategy;
	setModuleOptionStrategy(
		moduleOptionStrategy: TypeOrmModuleOptionStrategy,
	): TypeOrmModuleBuilder {
		this.moduleOptionStrategy = moduleOptionStrategy;
		return this;
	}

	private entityDir?: string;
	private get entities(): string[] {
		return this.entityDir ? [this.entityDir] : [];
	}
	setEntityDir(entityDir: string): TypeOrmModuleBuilder {
		this.entityDir = entityDir;
		return this;
	}

	private migrationDir?: string;
	private get migrations(): string[] {
		return this.migrationDir ? [this.migrationDir] : [];
	}
	setMigrationDir(migrationDir: string): TypeOrmModuleBuilder {
		this.migrationDir = migrationDir;
		return this;
	}
	private migrationsRun: boolean = false;
	setMigrationsRun(migrationsRun: boolean): TypeOrmModuleBuilder {
		this.migrationsRun = migrationsRun;
		return this;
	}

	build() {
		// TODO: 에러 정리
		const moduleOptionStrategy = this.moduleOptionStrategy;
		if (!moduleOptionStrategy)
			throw new Error('TypeOrmModuleBuilder: moduleOptionStrategy is empty');

		return TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				...moduleOptionStrategy.get(configService),
				entities: this.entities,
				migrations: this.migrations,
				migrationsRun: this.migrationsRun,
				keepConnectionAlive: true,
				// This value must be false! - https://typeorm.io/#/connection-options/common-connection-options
				synchronize: false,
			}),
			inject: [ConfigService],
		});
	}
}
