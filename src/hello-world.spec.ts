import { helloWorld } from './hello-world';

describe('helloWorld', () => {
	it('성공', () => {
		const spyOnConsoleLog = jest.spyOn(console, 'log');

		helloWorld();
		expect(spyOnConsoleLog).toBeCalled();
		expect(spyOnConsoleLog).toBeCalledWith('Hello, world!');
	});
});
