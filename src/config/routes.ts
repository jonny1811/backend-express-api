import { Express, Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';
import env from '../config/env';

import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';

const swaggerFile = (process.cwd() + '/swagger/swagger.json');
const swaggerData = fs.readFileSync(swaggerFile, 'utf-8');
const customCss = fs.readFileSync((process.cwd() + '/swagger/swagger.css'), 'utf-8');
const swaggerDocument = JSON.parse(swaggerData);

export default (app: Express): void => {
    const router = Router();
    app.use(env.baseUrl, router);

    app.use(
      env.docsUrl,
      swaggerUi.serve, 
      swaggerUi.setup(swaggerDocument, null, null, customCss)
    );
    
    readdirSync(join(__dirname, '../routes')).map(async file => {
      if (!file.endsWith('.map')) {
        (await import(`../routes/${file}`)).default(router);
      }
    });
}
