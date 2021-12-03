import { DynamicModule } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import {
	createSampleBuilder,
	createSampleDynamicModule,
	createSampleProvider,
} from '@test/samples';
import { TestingModuleBuilder } from './testing-module-builder';

describe('TestingModuleBuilder', () => {
	const sampleProvider = createSampleProvider(
		'sampleProviderToken',
		'sampleProviderValue',
	);
	const sampleModule: DynamicModule = createSampleDynamicModule({
		providers: [sampleProvider],
	});
	const sampleBuilder = createSampleBuilder(sampleModule);

	it('build output is TestingModule', async () => {
		const builder = new TestingModuleBuilder();
		const output = await builder.build();
		expect(output).toBeInstanceOf(TestingModule);
	});

	it('build with ModuleBuilders', async () => {
		const builder = new TestingModuleBuilder();
		const output = await builder.addModuleBuilder(sampleBuilder).build();

		const TEST_PROVIDER_VALUE = output.get<string>(sampleProvider.provide);
		expect(TEST_PROVIDER_VALUE).toBe(sampleProvider.useValue);
	});

	it('build with ModuleMetadata', async () => {
		const builder = new TestingModuleBuilder();
		const output = await builder
			.setModuleMetadata({ imports: [sampleModule] })
			.build();

		const TEST_PROVIDER_VALUE = output.get<string>(sampleProvider.provide);
		expect(TEST_PROVIDER_VALUE).toBe(sampleProvider.useValue);
	});
});
