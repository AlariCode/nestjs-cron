export interface ICronMeta {
	cron: string;
	methodName: string;
	target: any;
	launchOnInit: boolean;
	sync: boolean;
}
