import { CRON_META } from '../constants';
import { ICronMeta } from '../interfaces/cron-meta.interface';
import { ICronOptions } from '../interfaces/options.interface';

export const Cron = (cron: string, options: ICronOptions) => {
	const { launchOnInit, sync } = options;
	return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
		let func: ICronMeta[] = Reflect.getMetadata(CRON_META, target);
		if (!func) {
			func = [];
		}
		func.push({ cron, methodName, target, launchOnInit, sync });
		Reflect.defineMetadata(CRON_META, func, target);
	};
};
