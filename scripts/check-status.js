const https = require('https');
const http = require('http');

// Configuration
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://luxestate-web-d88c31e0b763.herokuapp.com';
const BACKEND_URL = process.env.BACKEND_URL || 'https://luxestate-api-dbbf54d6d2c4.herokuapp.com';

function checkUrl(url, name) {
  return new Promise((resolve) => {
    const module = url.startsWith('https:') ? https : http;
    const startTime = Date.now();

    const req = module.get(url, (res) => {
      const responseTime = Date.now() - startTime;
      const status = {
        name,
        url,
        status: res.statusCode,
        responseTime: `${responseTime}ms`,
        ok: res.statusCode >= 200 && res.statusCode < 400
      };
      resolve(status);
    });

    req.on('error', (err) => {
      resolve({
        name,
        url,
        status: 'ERROR',
        responseTime: 'N/A',
        ok: false,
        error: err.message
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        name,
        url,
        status: 'TIMEOUT',
        responseTime: 'N/A',
        ok: false,
        error: 'Request timeout after 10 seconds'
      });
    });
  });
}

async function checkApplicationStatus() {
  console.log('🏠 Luxestate Application Status Check');
  console.log('=====================================');
  console.log();

  const checks = [
    checkUrl(FRONTEND_URL, 'Frontend'),
    checkUrl(`${BACKEND_URL}/api/properties`, 'Backend API'),
    checkUrl(`${BACKEND_URL}/swagger`, 'API Documentation')
  ];

  const results = await Promise.all(checks);

  results.forEach(result => {
    const statusIcon = result.ok ? '✅' : '❌';
    const statusText = result.ok ? 'OK' : 'FAILED';

    console.log(`${statusIcon} ${result.name}: ${statusText}`);
    console.log(`   URL: ${result.url}`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Response Time: ${result.responseTime}`);

    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
    console.log();
  });

  const allOk = results.every(r => r.ok);

  console.log('=====================================');
  console.log(`Overall Status: ${allOk ? '✅ ALL SYSTEMS OPERATIONAL' : '❌ SOME SYSTEMS DOWN'}`);
  console.log();

  if (allOk) {
    console.log('🎉 Your Luxestate application is running successfully!');
    console.log();
    console.log('📱 Frontend: Browse properties and search');
    console.log('🔌 Backend: API endpoints responding');
    console.log('📖 Documentation: Swagger UI available');
  } else {
    console.log('⚠️  Some services are not responding. Check the details above.');
    console.log();
    console.log('💡 Troubleshooting tips:');
    console.log('   - Ensure both frontend and backend are deployed');
    console.log('   - Check Heroku app logs for any errors');
    console.log('   - Verify environment variables are configured');
    console.log('   - Check CORS configuration in backend');
  }

  process.exit(allOk ? 0 : 1);
}

// Run the status check
checkApplicationStatus().catch(console.error);
