#!/usr/bin/env nodeconst fs = require('fs');

const path = require('path');

const http = require('http');

const { exec } = require('child_process');console.log('🔍 Checking Local Development Setup...\n');



console.log('🔍 Checking LuxEstate Setup Status...\n');// Check if .env file exists and has required variables

const envPath = path.join(__dirname, '..', '.env');

// Check Docker MongoDBlet envExists = false;

function checkDocker() {let mongoConfigured = false;

    return new Promise((resolve) => {

        exec('docker ps --filter name=luxestate-mongodb --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"', (error, stdout) => {if (fs.existsSync(envPath)) {

            if (error || !stdout.includes('luxestate-mongodb')) {    envExists = true;

                console.log('❌ MongoDB Docker container is not running');    const envContent = fs.readFileSync(envPath, 'utf8');

                console.log('   Run: cd backend && docker compose up -d\n');    mongoConfigured = envContent.includes('MongoSettings__ConnectionString');

                resolve(false);    console.log('✅ .env file found (optional for local development)');

            } else {    if (mongoConfigured) {

                console.log('✅ MongoDB Docker container is running');        console.log('✅ MongoDB connection configured (for production testing)');

                console.log(`   ${stdout.trim()}\n`);    } else {

                resolve(true);        console.log('ℹ️  MongoDB not configured - using sample data (recommended for evaluation)');

            }    }

        });} else {

    });    console.log('ℹ️  .env file not found - using sample data (recommended for local development)');

}    console.log('   MongoDB configuration only needed for production deployments');

}

// Check Backend API

function checkBackend() {// Check if package.json files exist

    return new Promise((resolve) => {const rootPackageJson = path.join(__dirname, '..', 'package.json');

        const options = {const frontendPackageJson = path.join(__dirname, '..', 'frontend', 'real-estate-web', 'package.json');

            hostname: 'localhost',const backendProject = path.join(__dirname, '..', 'backend', 'RealEstate.Api', 'RealEstate.Api.csproj');

            port: 5000,

            path: '/api/properties',console.log('\n📦 Project Files Check:');

            method: 'GET',console.log(fs.existsSync(rootPackageJson) ? '✅ Root package.json found' : '❌ Root package.json missing');

            timeout: 3000console.log(fs.existsSync(frontendPackageJson) ? '✅ Frontend package.json found' : '❌ Frontend package.json missing');

        };console.log(fs.existsSync(backendProject) ? '✅ Backend project file found' : '❌ Backend project file missing');



        const req = http.request(options, (res) => {// Check if node_modules exist for frontend

            let data = '';const frontendNodeModules = path.join(__dirname, '..', 'frontend', 'real-estate-web', 'node_modules');

            res.on('data', chunk => data += chunk);const frontendDepsInstalled = fs.existsSync(frontendNodeModules);

            res.on('end', () => {

                try {console.log('\n🔧 Dependencies Check:');

                    const properties = JSON.parse(data);console.log(frontendDepsInstalled ? '✅ Frontend dependencies installed' : '❌ Frontend dependencies not installed - run "npm install" in frontend/real-estate-web');

                    console.log('✅ Backend API is responding');

                    console.log(`   Found ${properties.length} properties at http://localhost:5000/api/properties\n`);// Check documentation files

                    resolve(true);const readmeExists = fs.existsSync(path.join(__dirname, '..', 'README.md'));

                } catch (e) {const devDocsExist = fs.existsSync(path.join(__dirname, '..', 'SETUP.md'));

                    console.log('⚠️  Backend API responded but returned invalid JSON');

                    console.log(`   Response: ${data.substring(0, 100)}...\n`);console.log('\n� Documentation Check:');

                    resolve(false);console.log(readmeExists ? '✅ README.md found' : '❌ README.md missing');

                }console.log(devDocsExist ? '✅ SETUP.md found' : '❌ SETUP.md missing');

            });

        });// Summary

console.log('\n🎯 Setup Status Summary:');

        req.on('error', () => {if (frontendDepsInstalled) {

            console.log('❌ Backend API is not responding');    console.log('✅ Project is ready for local development!');

            console.log('   Start with: cd backend/RealEstate.Api && dotnet run\n');    console.log('\n🚀 Next steps:');

            resolve(false);    console.log('   1. Run: npm run dev');

        });    console.log('   2. Open http://localhost:3000 in browser');

    console.log('   3. The app will use sample data automatically');

        req.on('timeout', () => {    if (envExists && mongoConfigured) {

            console.log('❌ Backend API request timed out');        console.log('\n🗄️  Optional: MongoDB configured for production testing');

            console.log('   Check if backend is running: cd backend/RealEstate.Api && dotnet run\n');    } else {

            resolve(false);        console.log('\n💡 Note: MongoDB only needed for production - sample data works great for evaluation!');

        });    }

} else {

        req.end();    console.log('⚠️  Frontend dependencies missing. Run "npm install" in frontend/real-estate-web');

    });    console.log('\n📖 For detailed setup instructions, see SETUP.md');

}}



// Check Frontendconsole.log('\n' + '='.repeat(50));

function checkFrontend() {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/',
            method: 'GET',
            timeout: 3000
        };

        const req = http.request(options, (res) => {
            console.log('✅ Frontend is responding');
            console.log('   Accessible at http://localhost:3000\n');
            resolve(true);
        });

        req.on('error', () => {
            console.log('❌ Frontend is not responding');
            console.log('   Start with: cd frontend/real-estate-web && npm run dev\n');
            resolve(false);
        });

        req.on('timeout', () => {
            console.log('❌ Frontend request timed out');
            console.log('   Check if frontend is running: cd frontend/real-estate-web && npm run dev\n');
            resolve(false);
        });

        req.end();
    });
}

// Main execution
async function main() {
    const dockerOk = await checkDocker();
    const backendOk = await checkBackend();
    const frontendOk = await checkFrontend();

    console.log('📊 Setup Summary:');
    console.log(`   MongoDB Docker: ${dockerOk ? '✅' : '❌'}`);
    console.log(`   Backend API: ${backendOk ? '✅' : '❌'}`);
    console.log(`   Frontend: ${frontendOk ? '✅' : '❌'}`);

    if (dockerOk && backendOk && frontendOk) {
        console.log('\n🎉 All services are running! Your LuxEstate setup is complete.');
        console.log('   • View the app: http://localhost:3000');
        console.log('   • Test API: http://localhost:5000/api/properties');
    } else {
        console.log('\n⚠️  Some services need attention. Follow the instructions above.');
        process.exit(1);
    }
}

main().catch(console.error);