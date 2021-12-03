import { DynamicModule, ModuleMetadata } from '@nestjs/common';

export function createSampleDynamicModule(
	moduleMetadata?: ModuleMetadata,
): DynamicModule {
	return {
		module: class SampleDynamicModule {},
		...moduleMetadata,
	};
}
