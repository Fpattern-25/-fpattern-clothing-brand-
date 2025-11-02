@echo off
echo ========================================
echo Fpattern Setup Script
echo ========================================
echo.

echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: npm install failed
    pause
    exit /b 1
)

echo.
echo Step 2: Seeding database...
cd server
call npm run seed
if %errorlevel% neq 0 (
    echo Warning: Database seed failed. Make sure MongoDB is running.
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application, run: npm start
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo.
echo Admin credentials: admin@fpattern.com / admin123
echo.
pause
