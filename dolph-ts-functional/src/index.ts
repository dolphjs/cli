import Dolph from '@dolph/core';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { ENV, PORT } from '@/config';
import DemoAppRouter from '@/routes/demo.route';

dotenv.config({});

const dolph = new Dolph([new DemoAppRouter()], PORT, ENV, { url: null }, [
	helmet(),
]);
dolph.listen();
