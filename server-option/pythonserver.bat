@echo off
:: Start ngrok in a new command prompt window
start cmd /k "ngrok http --url=my-custom-url.ngrok-free.app 9000"

:: Wait for a short period to give ngrok time to initialize (optional)
timeout /t 10

:: Run the Python server script
server.exe