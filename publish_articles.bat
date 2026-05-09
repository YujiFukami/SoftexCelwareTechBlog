@echo off
setlocal

cd /d "%~dp0"

if "%~1"=="" (
  set "COMMIT_MSG=Update tech blog articles"
) else (
  set "COMMIT_MSG=%~1"
)

echo [1/5] Cleaning Next.js build output...
if exist ".next" rmdir /s /q ".next"
if exist ".next" (
  echo Failed to remove .next. Close running dev servers or OneDrive sync locks, then retry.
  exit /b 1
)

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
