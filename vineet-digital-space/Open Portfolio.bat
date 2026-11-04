@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if errorlevel 1 (
  where python >nul 2>nul
  if errorlevel 1 (
    echo Python is required to start the local preview server.
    echo You can also open this folder with VS Code Live Server.
    pause
    exit /b 1
  )
  start "Vineet Portfolio Server" cmd /k python -m http.server 8765
) else (
  start "Vineet Portfolio Server" cmd /k py -m http.server 8765
)
timeout /t 2 /nobreak >nul
start "" http://localhost:8765
