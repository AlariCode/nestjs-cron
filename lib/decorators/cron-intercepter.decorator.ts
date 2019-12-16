import { CronIntercepterClass } from '../classes/cron-intercepter.class';

export const CronIntercepter = (intercepter: typeof CronIntercepterClass) => {
	return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
		const method = descriptor.value;
		descriptor.value = async function() {
			const result: boolean = await new intercepter().intercept();
			if(result) {
				return method.apply(this, arguments);
			}
		};
	};
};
