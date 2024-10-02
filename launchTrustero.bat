@echo off
setlocal

:: Set the relative path to the Chromium executable
set chromiumPath=.\chromium\chrome.exe

:: Set the relative path to the user data directory
set userDataDir=.\chromium\datadir

:: Set the path to the index.html file
set indexPath=.\index.html

:: Set the path to the local server executable
set localServerExe=.\localserver.exe

:: Check if Python or local server is required
if not exist "%localServerExe%" (
    :: Check if Python is installed
    where python >nul 2>&1
    if %errorlevel% neq 0 (
        echo Python is not installed. Please install Python to continue.
        pause
        exit /b
    )
)

:: Check if Chromium exists at the specified path
if not exist "%chromiumPath%" (
    echo Chromium not found in the ./chromium directory. Please install Chromium into that directory.
    pause
    exit /b
)

:: Check if the index file exists
if not exist "%indexPath%" (
    echo Index file not found at %indexPath%.
    pause
    exit /b
)

:: Prompt for a firewall exception
echo.
echo Requesting firewall exception for Chromium instance...
netsh advfirewall firewall add rule name="Chromium WeRTC" dir=in action=allow program="%chromiumPath%" enable=yes
echo Firewall exception added.
echo.

:: Check if the local server executable exists
if exist "%localServerExe%" (
    if %errorlevel%==0 (
        echo Launching localserver.exe...
        start /B "" "%localServerExe%"
    )
) else (
    :: Check if Python server is already running
    tasklist | findstr /I "python.exe" >nul
    if %errorlevel%==0 (
        echo Python server is already running. Skipping launch of local.bat.
    ) else (
        echo Launching Python XML-RPC server...
        start "" local.bat
    )
)

:: Wait a moment to ensure the server has started (optional, adjust time as necessary)
timeout /t 1 /nobreak > nul

:: Launch Chromium in kiosk mode with the specified data directory and flags
"%chromiumPath%" --user-data-dir="%userDataDir%" --app=http://localhost:9000/%indexPath% --disable-web-security --disable-features=IsolateOrigins,site-per-process

endlocal
pause