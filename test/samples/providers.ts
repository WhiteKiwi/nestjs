import { Abstract, Type, ValueProvider } from '@nestjs/common';

export function createSampleProvider<T = any>(
	provide: string | symbol | Type<any> | Abstract<any> | Function,
	value: T,
): ValueProvider<T> {
	return {
		provide,
		useValue: value,
	};
}
