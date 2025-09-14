const https = require('https');
const http = require('http');

// Production URLs for deployed applications
const PRODUCTION_FRONTEND = 'https://luxestate-web-d88c31e0b763.herokuapp.com';
const PRODUCTION_BACKEND = 'https://luxestate-api-a7544538b706.herokuapp.com';

async function checkEndpoint(url) {
    return new Promise((resolve) => {
        const start = Date.now();
        const client = url.startsWith('https:') ? https : http;

        const req = client.get(url, (res) => {
            const responseTime = Date.now() - start;
            resolve({
                status: res.statusCode,
                responseTime: responseTime
            });
        });

        req.on('error', () => {
            resolve({
                status: 'ERROR',
                responseTime: 'N/A'
            });
        });

        req.setTimeout(10000, () => {
            req.destroy();
            resolve({
                status: 'TIMEOUT',
                responseTime: 'N/A'
            });
        });
    });
}

async function main() {
    console.log('🚀 Production Deployment Status Check');
    console.log('=====================================\n');

    // Check Frontend
    console.log('Checking Frontend...');
    const frontendResult = await checkEndpoint(PRODUCTION_FRONTEND);
    const frontendStatus = frontendResult.status === 200 ? '✅' : '❌';
    console.log(`${frontendStatus} Frontend: ${frontendResult.status === 200 ? 'OK' : 'FAILED'}`);
    console.log(`   URL: ${PRODUCTION_FRONTEND}`);
    console.log(`   Status: ${frontendResult.status}`);
    console.log(`   Response Time: ${frontendResult.responseTime}ms\n`);

    // Check Backend API
    console.log('Checking Backend API...');
    const backendResult = await checkEndpoint(PRODUCTION_BACKEND + '/api/properties');
    const backendStatus = backendResult.status === 200 ? '✅' : '❌';
    console.log(`${backendStatus} Backend API: ${backendResult.status === 200 ? 'OK' : 'FAILED'}`);
    console.log(`   URL: ${PRODUCTION_BACKEND}/api/properties`);
    console.log(`   Status: ${backendResult.status}`);
    console.log(`   Response Time: ${backendResult.responseTime}ms\n`);

    // Check API Documentation
    console.log('Checking API Documentation...');
    const swaggerResult = await checkEndpoint(PRODUCTION_BACKEND + '/swagger');
    const swaggerStatus = swaggerResult.status === 200 ? '✅' : '❌';
    console.log(`${swaggerStatus} API Documentation: ${swaggerResult.status === 200 ? 'OK' : 'FAILED'}`);
    console.log(`   URL: ${PRODUCTION_BACKEND}/swagger`);
    console.log(`   Status: ${swaggerResult.status}`);
    console.log(`   Response Time: ${swaggerResult.responseTime}ms\n`);

    // Overall Status
    console.log('=====================================');
    const allGood = frontendResult.status === 200 && backendResult.status === 200;
    console.log(`Overall Status: ${allGood ? '✅ ALL SYSTEMS OPERATIONAL' : '❌ SOME SYSTEMS DOWN'}\n`);

    if (!allGood) {
        console.log('⚠️  Some services are not responding. Check the details above.\n');
        console.log('💡 This is for production deployment status.');
        console.log('   For local development, use: npm run dev (frontend) and dotnet run (backend)');
    }

    process.exit(allGood ? 0 : 1);
}

main().catch(console.error);
