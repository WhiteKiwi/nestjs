import { Builder } from '@kiwi-lib/utils';
import { DynamicModule } from '@nestjs/common';
import { ConfigFactory, ConfigModule } from '@nestjs/config';
import Joi from 'joi';

export class ConfigModuleBuilder implements Builder<DynamicModule> {
	private configuration?: ConfigFactory;
	setConfiguration(configuration: ConfigFactory): ConfigModuleBuilder {
		this.configuration = configuration;
		return this;
	}

	private validationSchema?: Joi.ObjectSchema;
	setValidationSchema(validationSchema: Joi.ObjectSchema): ConfigModuleBuilder {
		this.validationSchema = validationSchema;
		return this;
	}

	private isTest = false;
	setIsTest(isTest: boolean): ConfigModuleBuilder {
		this.isTest = isTest;
		return this;
	}

	build() {
		// TODO: 에러 정리
		if (!this.configuration)
			throw new Error('ConfigModuleBuilder: configuration is empty');
		if (!this.validationSchema)
			throw new Error('ConfigModuleBuilder: validationSchema is empty');

		return ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: this.isTest ? 'test/.env' : '.env',
			load: [this.configuration],
			validationSchema: this.validationSchema,
		});
	}
}
