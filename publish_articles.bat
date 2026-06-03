@echo off
setlocal EnableExtensions

cd /d "%~dp0"

if "%~1"=="" (
  set "COMMIT_MSG=Update tech blog articles"
) else (
  set "COMMIT_MSG=%~1"
)

echo [1/5] Cleaning Next.js build output...
call :clean_next
if errorlevel 1 exit /b 1

echo [2/5] Building site...
call npm run build
if errorlevel 1 exit /b 1

echo [3/5] Staging site changes...
git add content src public publish_articles.bat
if errorlevel 1 exit /b 1

git diff --cached --quiet
if not errorlevel 1 (
  echo No staged changes to commit.
  exit /b 0
)

echo [4/5] Committing...
git commit -m "%COMMIT_MSG%"
if errorlevel 1 exit /b 1

echo [5/5] Pushing to origin...
git push origin main
if errorlevel 1 exit /b 1

echo Done.
exit /b 0

:clean_next
set "CLEAN_ATTEMPT=1"
set "CLEAN_MAX=5"

:clean_next_retry
if not exist ".next" exit /b 0
echo Removing .next attempt %CLEAN_ATTEMPT%/%CLEAN_MAX%...
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -ExecutionPolicy Bypass -Command "$p = Join-Path (Get-Location) '.next'; if (Test-Path -LiteralPath $p) { Remove-Item -LiteralPath $p -Recurse -Force -ErrorAction SilentlyContinue }; if (Test-Path -LiteralPath $p) { exit 1 }"
if not errorlevel 1 exit /b 0

if %CLEAN_ATTEMPT% GEQ %CLEAN_MAX% (
  echo Failed to remove .next after %CLEAN_MAX% attempts.
  echo Close running dev servers, pause OneDrive sync if needed, then retry.
  exit /b 1
)

set /a CLEAN_ATTEMPT+=1
"%SystemRoot%\System32\timeout.exe" /t 2 /nobreak >nul
goto clean_next_retry
