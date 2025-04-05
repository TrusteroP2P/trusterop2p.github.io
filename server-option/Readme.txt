Must have ssh for your system which is natively supported in most operating systems
and its easy to set up.

_____________________________________________________________________________________________
Set up NGROK
_____________________________________________________________________________________________

To generate your key:
ssh-keygen -t rsa

Then sign up for ngrok, and follow instructions to make ngrok.yml and place it in the same
directory as your files. Then create a custom domain on ngrok. The line below listed
here starts the server however you will run it at a later step through the bat file.
ngrok http --url=your-custom-url.ngrok-free.app 9000

_____________________________________________________________________________________________
Then set up config file, index and bat file
_____________________________________________________________________________________________

To set up your servers details and API keys, edit the config.js file in static directory.
If needed ctrl + f5 hard refresh gecko and restart server for changes to take effect.
Also you public key should be shared so users know how to connect to you.

You can set the number of running threads in the config file(the default is 4). However,
when the server is running do not close any of the browser windows and do not take any
of the tabs out of focus. Please leave each firefox window on it's own. The windows can
however be minimized. You may occasionally look at the console or ngrok to report errors.

For security do not put sensitive files in the "static" directory

If you know your public key you can share it with users by changing the line
var=serverPublicKey = "" ... with the one you generate so visiting the page lets them see it

Next, in pythonserver.bat replace the line that says:
start cmd /k "ngrok http --url=your-custom-url.ngrok-free.app 9000"
with the actual custom link of your ngrok server

Finally if you are building everything from python directly then replace the line:
server.exe
...with the following line:
python server.py

Otherwise you may use the prebuilt server executable. For security you may choose to download
your own copies of ngrok.exe and of geckodriver.exe as well

_____________________________________________________________________________________________
Run the server
_____________________________________________________________________________________________

Finally load "pythonserver.bat" which will automatically boot up your ngrok server and
your python server. You are of course able to edit the python code and improve on the code.

_____________________________________________________________________________________________
Share your node with your friends
_____________________________________________________________________________________________

Now you are able to share the nodes URL for the api as well as the public key which will
allow you to engage in chats with your friends. Please understand you are responsible for your
own security and proper use of this software. You are also responsible for auditing this
code to make sure it meets your security standards.