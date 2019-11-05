import { Module, DynamicModule, Global, OnModuleInit } from '@nestjs/common';

@Global()
@Module({})
export class CronModule {
	static forRoot(): DynamicModule {
		return {
			module: CronModule,
		};
	}
}
