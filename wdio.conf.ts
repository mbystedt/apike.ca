export const config: WebdriverIO.Config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  runner: 'local',
  
  //
  // ==================
  // Specify Test Files
  // ==================
  specs: [
    './e2e/src/**/*.e2e-spec.ts'
  ],
  
  //
  // ============
  // Capabilities
  // ============
  maxInstances: 10,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--headless', '--disable-gpu', '--no-sandbox']
    }
  }],
  
  //
  // ===================
  // Test Configurations
  // ===================
  logLevel: 'info',
  bail: 0,
  baseUrl: 'http://localhost:4200',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  
  services: [],
  
  framework: 'mocha',
  reporters: ['spec'],
  
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  }
};
