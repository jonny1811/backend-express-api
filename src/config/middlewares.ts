import cors from 'cors';
import bodyParser from 'body-parser';

import { Express } from 'express';

export default (app: Express): void => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
};
