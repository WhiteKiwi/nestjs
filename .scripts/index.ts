import { publish } from './publish';
const scripts = {
	publish,
};

async function run(scriptName: string) {
	const script = scripts[scriptName];
	if (!script) {
		console.error('스크립트 이름을 확인해주세요');
		return;
	}

	await script(...process.argv.slice(3));
	process.exit();
}

run(process.argv[2]);
