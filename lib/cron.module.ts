import { Module, DynamicModule, Global } from '@nestjs/common';
import { CronService } from './cron.service';

@Global()
@Module({})
export class CronModule {
	static forRoot(): DynamicModule {
		const cronServiceProvider = {
			provide: CronService,
			useFactory: async (): Promise<CronService> => {
				return new CronService();
			},
		};
		return {
			module: CronModule,
			providers: [cronServiceProvider],
			exports: [cronServiceProvider],
		};
	}
}
