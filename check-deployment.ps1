# Luxestate Deployment Status Checker
# Run this script to verify your Heroku deployment

Write-Host "🏠 Luxestate Deployment Status Check" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Check if Heroku CLI is installed
Write-Host "`n1. Checking Heroku CLI..." -ForegroundColor Yellow
try {
    $herokuVersion = heroku --version
    Write-Host "✅ Heroku CLI installed: $herokuVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Heroku CLI not found. Please install from https://devcenter.heroku.com/articles/heroku-cli" -ForegroundColor Red
    exit
}

# Check backend app status
Write-Host "`n2. Checking Backend App (luxestate-api)..." -ForegroundColor Yellow
try {
    $backendStatus = heroku ps -a luxestate-api 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Backend app found and running" -ForegroundColor Green
        heroku ps -a luxestate-api
    } else {
        Write-Host "❌ Backend app not found or not accessible" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error checking backend app" -ForegroundColor Red
}

# Check frontend app status
Write-Host "`n3. Checking Frontend App (luxestate-web)..." -ForegroundColor Yellow
try {
    $frontendStatus = heroku ps -a luxestate-web 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Frontend app found and running" -ForegroundColor Green
        heroku ps -a luxestate-web
    } else {
        Write-Host "❌ Frontend app not found or not accessible" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error checking frontend app" -ForegroundColor Red
}

# Check environment variables
Write-Host "`n4. Checking Environment Variables..." -ForegroundColor Yellow
Write-Host "Backend Config:" -ForegroundColor Gray
try {
    heroku config -a luxestate-api 2>$null
} catch {
    Write-Host "❌ Cannot access backend config" -ForegroundColor Red
}

Write-Host "`nFrontend Config:" -ForegroundColor Gray
try {
    heroku config -a luxestate-web 2>$null
} catch {
    Write-Host "❌ Cannot access frontend config" -ForegroundColor Red
}

# Test API endpoint
Write-Host "`n5. Testing API Endpoint..." -ForegroundColor Yellow
try {
    $apiResponse = Invoke-WebRequest -Uri "https://luxestate-api-9d55c3cb0537.herokuapp.com/api/properties" -Method GET -TimeoutSec 10
    if ($apiResponse.StatusCode -eq 200) {
        Write-Host "✅ API endpoint responding successfully" -ForegroundColor Green
        $propertyCount = ($apiResponse.Content | ConvertFrom-Json).Count
        Write-Host "   Properties loaded: $propertyCount" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ API endpoint not responding or error occurred" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test frontend
Write-Host "`n6. Testing Frontend..." -ForegroundColor Yellow
try {
    $frontendResponse = Invoke-WebRequest -Uri "https://luxestate-web-5f037f258020.herokuapp.com" -Method GET -TimeoutSec 10
    if ($frontendResponse.StatusCode -eq 200) {
        Write-Host "✅ Frontend responding successfully" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Frontend not responding or error occurred" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Summary
Write-Host "`n🎯 Quick Access URLs:" -ForegroundColor Cyan
Write-Host "Frontend: https://luxestate-web-5f037f258020.herokuapp.com" -ForegroundColor White
Write-Host "Backend API: https://luxestate-api-9d55c3cb0537.herokuapp.com" -ForegroundColor White
Write-Host "API Docs: https://luxestate-api-9d55c3cb0537.herokuapp.com/swagger" -ForegroundColor White

Write-Host "`n📋 Useful Commands:" -ForegroundColor Cyan
Write-Host "heroku logs --tail -a luxestate-api    # View backend logs" -ForegroundColor Gray
Write-Host "heroku logs --tail -a luxestate-web    # View frontend logs" -ForegroundColor Gray
Write-Host "heroku restart -a luxestate-api        # Restart backend" -ForegroundColor Gray
Write-Host "heroku restart -a luxestate-web        # Restart frontend" -ForegroundColor Gray

Write-Host "`n✨ Deployment Status Check Complete!" -ForegroundColor Green
