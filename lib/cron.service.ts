import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleState, moduleStateEmmiter } from './module-state.emmiter';

@Injectable()
export class CronService implements OnModuleInit {
	constructor() {}

	onModuleInit() {
		moduleStateEmmiter.emit(ModuleState.ready);
		return CronService;
	}
}
