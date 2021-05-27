import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const helmet = require('helmet');
  const server = express();
  const distFolder = join(process.cwd(), 'dist/ng-apike/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  const targetServer = process.env.TARGET_URL || 'http://drupal.apike.ca';

  server.use(helmet({
    hsts: false,
    contentSecurityPolicy: false
  }));

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Drupal Rest API endpoints
  server.use('/drupal', createProxyMiddleware({
    target: targetServer,
    changeOrigin: true
  }));

  const rewriteDrupalProxy = createProxyMiddleware({
    target: targetServer,
    changeOrigin: true,
    pathRewrite: {'^/' : '/drupal/'},
    /**
     * IMPORTANT: avoid res.end being called automatically
     **/
    selfHandleResponse: true, // res.end() will be called internally by responseInterceptor()
    /**
     * Intercept response and replace 'Hello' with 'Goodbye'
     **/
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
      const response = responseBuffer.toString('utf8'); // convert buffer to string
      return response.replace(/drupal\.apike\.ca\/drupal/g, 'apike.ca'); // manipulate response and return the result
    }),
  });

  // Drupal Rest API endpoints
  server.use('/sites', createProxyMiddleware({
    target: targetServer,
    changeOrigin: true
  }));

  // Rewrite xml
  server.use('/rss.xml', rewriteDrupalProxy);
  server.use('/sitemap.xml', createProxyMiddleware({
    target: targetServer,
    changeOrigin: true,
    pathRewrite: {'^/' : '/drupal/'},
  }));

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1h'
  }));

  // Intercept attempts to get php
  server.get('*.php', (req, res) => {
    res.status(404).send('');
  });

  // Redirect japan pages
  server.get('/japan_*', (req, res) => {
    res.status(301).redirect(`http://japan.apike.ca${req.originalUrl}`);
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
