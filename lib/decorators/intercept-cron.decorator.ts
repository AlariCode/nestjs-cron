export const InterceptCron = (func: (...arg: any) => Promise<boolean>) => {
	return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
		const method = descriptor.value;
		descriptor.value = async function() {
			const result: boolean = await func();
			if(result) {
				return method.apply(this, arguments);
			}
		};
	};
};
