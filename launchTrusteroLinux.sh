#!/bin/bash

# Function to pause and wait for key press
pause(){
    read -p "$*"
}

# Set the relative path to the Chromium executable
chromiumPath="./chromium/chrome"
# Set the user data directory
userDataDir="./chromium/datadir"
# Set the path to the index.html file
indexPath="./index.html"

# Check if Chromium exists
if [ ! -f "$chromiumPath" ]; then
    echo "Chromium not found in the ./chromium directory. Please install chromium into that directory."
    pause "Press [Enter] to exit..."
    exit 1
fi

# Check if the index file exists
if [ ! -f "$indexPath" ]; then
    echo "Index file not found at $indexPath."
    pause "Press [Enter] to exit..."
    exit 1
fi

# Try starting Python 2.7 SimpleHTTPServer in the background
echo "Trying to launch Python 2.7 SimpleHTTPServer..."
python -m SimpleHTTPServer 9000 &
server_pid=$!

# Wait a second to check if it failed
sleep 1

# Check if the Python 2.7 SimpleHTTPServer started successfully
if ! ps -p $server_pid > /dev/null; then
    echo "Python 2.7 SimpleHTTPServer failed. Trying Python 3 http.server..."
    python3 -m http.server 9000 &
    server_pid=$!

    # If Python 3 also fails, exit
    if ! ps -p $server_pid > /dev/null; then
        echo "Failed to start the web server."
        pause "Press [Enter] to exit..."
        exit 1
    fi
fi

# Wait a moment to ensure the server has started
sleep 1

# Launch Chromium in kiosk mode with the specified data directory and flags
"$chromiumPath" --user-data-dir="$userDataDir" --app=http://localhost:9000/index.html --disable-web-security --disable-features=IsolateOrigins,site-per-process

# After closing Chromium, kill the server process
if ps -p $server_pid > /dev/null; then
    echo "Stopping the Python web server..."
    kill $server_pid
fi

# Pause before exiting
pause "Press [Enter] to exit..."
exit 0