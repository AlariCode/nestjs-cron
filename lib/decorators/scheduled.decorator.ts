import { CRON_META } from '../constants';
import { moduleStateEmmiter, ModuleState } from '../module-state.emmiter';
import { schedule } from 'node-cron';
import { ICronMeta } from '../interfaces/cron-meta.interface';

export function Scheduled(): ClassDecorator {
	return function(target: any) {
		const jobs: ICronMeta[] = Reflect.getMetadata(CRON_META, target.prototype);
		target = class extends (target as { new (...args): any }) {
			constructor(...args) {
				super(...args);
				moduleStateEmmiter.on(ModuleState.ready, async event => {
					jobs.forEach(async job => {
						let isReady: boolean = true;
						if (job.launchOnInit) {
							isReady = false;
							job.sync ? await this[job.methodName]() : this[job.methodName]();
							isReady = true;
						}
						schedule(job.cron, async () => {
							if (isReady) {
								isReady = false;
								job.sync ? await this[job.methodName]() : this[job.methodName]();
								isReady = true;
							}
						});
					});
				});
			}
		};
		return target;
	};
}
