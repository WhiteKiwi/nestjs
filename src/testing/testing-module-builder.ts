import { Builder } from '@kiwi-lib/utils';
import { DynamicModule } from '@nestjs/common';
import { ForwardReference, Provider, Type } from '@nestjs/common/interfaces';
import { Test, TestingModule } from '@nestjs/testing';

type Module =
	| Type<any>
	| DynamicModule
	| Promise<DynamicModule>
	| ForwardReference;

type ModuleMetadata = {
	imports?: Module[];
	controllers?: Type<any>[];
	providers?: Provider[];
};

export class TestingModuleBuilder implements Builder<TestingModule> {
	private moduleBuilders: Builder<Module>[] = [];
	setModuleBuilders(moduleBuilders: Builder<Module>[]): TestingModuleBuilder {
		this.moduleBuilders = moduleBuilders;
		return this;
	}
	addModuleBuilder(moduleBuilder: Builder<Module>): TestingModuleBuilder {
		this.moduleBuilders.push(moduleBuilder);
		return this;
	}

	private moduleMetadata?: ModuleMetadata;
	setModuleMetadata(moduleMetadata: ModuleMetadata): TestingModuleBuilder {
		this.moduleMetadata = moduleMetadata;
		return this;
	}

	async build(): Promise<TestingModule> {
		const { imports = [], controllers, providers } = this.moduleMetadata || {};
		const modules = await Promise.all(
			this.moduleBuilders.map((builder) => builder.build()),
		);
		return await Test.createTestingModule({
			imports: imports.concat(modules),
			controllers,
			providers,
		}).compile();
	}
}
