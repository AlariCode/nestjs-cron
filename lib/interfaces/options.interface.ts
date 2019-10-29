export interface ICronOptions {
	/** @summary Launch job right after start */
	launchOnInit?: boolean;
	/** @summary Wait for method to finish before launching next tick */
	sync?: boolean;
}
