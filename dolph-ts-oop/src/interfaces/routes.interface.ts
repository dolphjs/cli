import { Router } from '@dolph/core';

export interface Routes {
	path?: string;
	router: typeof Router;
}
