@echo off
setlocal EnableExtensions

cd /d "%~dp0"

set "ARTICLE=%~1"
set "RUN_BUILD=%~2"

if "%ARTICLE%"=="" (
  echo Target article: latest article by frontmatter date
) else (
  echo Target article: %ARTICLE%
)

echo.
echo [1/4] Suggesting term links...
if "%ARTICLE%"=="" (
  call npm run article:terms
) else (
  call npm run article:terms -- "%ARTICLE%"
)
if errorlevel 1 exit /b 1

echo.
echo [2/4] Suggesting related links...
if "%ARTICLE%"=="" (
  call npm run article:links
) else (
  call npm run article:links -- "%ARTICLE%"
)
if errorlevel 1 exit /b 1

echo.
echo [3/4] Scanning sensitive review candidates...
if "%ARTICLE%"=="" (
  call npm run article:sensitive
) else (
  call npm run article:sensitive -- "%ARTICLE%"
)
if errorlevel 1 exit /b 1

echo.
echo [4/4] Auditing article metadata and links...
if "%ARTICLE%"=="" (
  call npm run article:audit
) else (
  call npm run article:audit -- "%ARTICLE%"
)
if errorlevel 1 exit /b 1

if /I "%RUN_BUILD%"=="--build" (
  echo.
  echo [build] Running npm run build...
  call npm run build
  if errorlevel 1 exit /b 1
) else (
  echo.
  echo Build skipped. Pass --build as the second argument to run npm run build.
)

echo.
echo Article workflow checks completed.
exit /b 0
