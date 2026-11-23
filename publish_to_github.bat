@echo off
setlocal
cd /d "%~dp0"

echo ==================================================
echo HSE PMU Command - upload to a NEW GitHub repository
 echo GitHub: kenclark1209-tradewars/hse-pmu-command-lng
 echo ==================================================
 echo.
echo IMPORTANT: First create an EMPTY repository at https://github.com/new
 echo Name: hse-pmu-command-lng  (do not initialize a README)
 echo.
where git >nul 2>nul
if errorlevel 1 (
 echo ERROR: Git for Windows is not installed or not in PATH.
 echo Install Git for Windows, then run this file again.
 pause
 exit /b 1
)
if exist ".git" (
 echo This folder is already a Git checkout; refusing to initialize/push automatically.
 echo Check the existing remote first.
 pause
 exit /b 1
)
set /p choice=Have you created the EMPTY repository? Type YES to continue: 
if /I not "%choice%"=="YES" (
 echo No changes made.
 pause
 exit /b 1
)
git init
if errorlevel 1 goto failed
git checkout -B main
if errorlevel 1 goto failed
git add README.md index.html .gitignore .nojekyll source publish_to_github.bat
if errorlevel 1 goto failed
git commit -m "Initial commit: HSE PMU Command LNG offline webapp"
if errorlevel 1 (
 echo Commit failed. Set git user.name and user.email, then commit and push manually.
 goto failed
)
git remote add origin https://github.com/kenclark1209-tradewars/hse-pmu-command-lng.git
if errorlevel 1 goto failed
git push -u origin main
if errorlevel 1 (
 echo Push failed. Confirm the repository exists and GitHub sign-in is complete.
 goto failed
)
echo.
echo SUCCESS: https://github.com/kenclark1209-tradewars/hse-pmu-command-lng
pause
exit /b 0
:failed
echo.
echo Upload was NOT confirmed. No force push or delete was attempted.
pause
exit /b 1
