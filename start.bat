@echo off
REM GOD v2.0 Startup Script for Windows

echo ========================================
echo        GOD v2.0 Startup Script
echo ========================================
echo.

REM Check if Ollama is installed
where ollama >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Ollama not found!
    echo Please install Ollama first: https://ollama.com/download
    pause
    exit /b 1
)

echo [OK] Ollama found
echo.

REM Check if Ollama is running
curl -s http://localhost:11434/api/tags >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Starting Ollama...
    start /B ollama serve
    timeout /t 3 >nul
) else (
    echo [OK] Ollama already running
)

echo.
echo Checking models...
ollama list

echo.
echo Choose startup mode:
echo 1) Frontend only (simple, port 8000)
echo 2) Backend + Frontend (full stack, port 3000)
echo 3) Just check status
echo.
set /p choice="Enter choice (1-3): "

if "%choice%"=="1" goto frontend
if "%choice%"=="2" goto backend
if "%choice%"=="3" goto status
goto invalid

:frontend
echo.
echo Starting frontend on port 8000...
cd frontend
python -m http.server 8000
goto end

:backend
echo.
echo Starting backend server...
cd backend
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)
call npm start
goto end

:status
echo.
echo Status:
echo   Ollama: [OK] Running on http://localhost:11434
ollama list
pause
goto end

:invalid
echo [ERROR] Invalid choice
pause
exit /b 1

:end
