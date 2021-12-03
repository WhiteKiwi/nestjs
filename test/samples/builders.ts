import { Builder } from '@kiwi-lib/utils';

export function createSampleBuilder<T>(output: T): Builder<T> {
	return {
		build: () => output,
	};
}
