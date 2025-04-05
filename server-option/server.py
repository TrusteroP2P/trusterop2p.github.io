from flask import Flask, request, jsonify, send_from_directory
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import os
import sys
import json
import threading
import hashlib
import random
import binascii
import traceback
import time
from waitress import serve
from flask_cors import CORS  # Import flask-cors

if getattr(sys, 'frozen', False):
    # If the app is running as a frozen executable
    os.chdir(os.path.dirname(sys.executable))
print("Current working directory:", os.getcwd())

global totalThreads
global driver
global nonce
global nonce_lock
global reqdb

driver = []
nonce = 0
nonce_lock = threading.Lock()
reqdb = {}

app = Flask(__name__)
CORS(app)

# Function to generate a random hash for the password
def generate_random_hash():
    return hashlib.sha256(str(random.random()).encode()).hexdigest()

# Path to the localStorage.txt file
local_storage_file = 'localStorage.txt'

# Function to create or read the localStorage.txt file
def manage_local_storage():
    if not os.path.exists(local_storage_file):
        # If the file doesn't exist, create it with a random password
        initial_data = {'password': generate_random_hash(), 'reqdb': {}, 'items': {}}
        with open(local_storage_file, 'w') as f:
            json.dump(initial_data, f)

    # Read the current value from the file
    with open(local_storage_file, 'r') as f:
        data = json.load(f)
        return data['password'], data['items'], data['reqdb']

# Get the session key and items from the local storage file
session_key, local_storage_items, reqdb = manage_local_storage()

file_lock = threading.Lock()
# Function to handle GET and SET requests
def handle_local_storage(action, item, value=None, key=None):
    global reqdb
    with file_lock:
        # Load existing data
        with open(local_storage_file, 'r') as f:
            data = json.load(f)

        if action == 'get':
            # Validate key and retrieve item
            if key == data['password']:  # Check if key matches the stored password
                if(item == 'reqdb'):
                    return json.dumps(data['reqdb'])
                if(item == 'hashes'):
                    return data['items']['hashes'].get(value, None)  # Return the value or None if not found
                else:
                    return data['items'][item].get(value, None)
            else:
                return None  # Invalid key

        elif action == 'set':
            # Validate key and set item
            if key == data['password']:  # Check if key matches the stored password
                if("reqdb:" in item[:6]):
                    data['reqdb'][item.split("reqdb:")[1]] = json.loads(value)
                    reqdb[item.split("reqdb:")[1]] = json.loads(value)
                else:
                    if("hashes:" in item[:7]):
                        if "hashes" not in data['items']:
                            data['items']['hashes'] = {}
                        data['items']['hashes'][item.split("hashes:")[1]] = value
                    else:
                        if item.split(":")[0] not in data['items']:
                            data['items'][item.split(":")[0]] = {}
                        data['items'][item.split(":")[0]][item.split(":")[1]] = json.loads(value)
                # Save updated data back to the file
                with open(local_storage_file, 'w') as f:
                    json.dump(data, f)
                return True  # Indicate success
            else:
                return False  # Invalid key

@app.route('/')
def serve_index():
    return send_from_directory(os.getcwd(), 'index.html')

@app.route('/api', methods=['POST'])
def handle_post():
    global nonce;
    global reqdb;
    data = request.get_json()
    action = data.get('action')
    item = data.get('item')
    value = data.get('value')
    key = data.get('key')
    publickey = data.get('public')
    lastHash = data.get('lastHash')
    if action == 'get':
        value = handle_local_storage('get', item, value, key=key)
        response = {"action": "get", "item": item, "value": value}
    elif action == 'set':
        success = handle_local_storage('set', item, value, key=key)
        response = {"action": "set", "item": item, "success": success}
    elif action == 'sendMessage':
        try:
            print("Incoming request: " + action + " " + str(time.time()))
            hex_data = '"'+binascii.hexlify(value.encode('utf-8')).decode('utf-8')+'"'
            with nonce_lock:
                current_nonce = nonce
                nonce += 1
                if(nonce >= totalThreads):
                    nonce = 0
            result = driver[current_nonce].execute_script(f"return sendMessage({hex_data});")
            return jsonify({"result": result})
        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": str(e)}), 500
    elif action == 'getMessages':
        try:
            print("Incoming request: " + action + " " + str(time.time()))
            #if publickey in reqdb:
            #    if 'lastHash' in reqdb[publickey] and lastHash==reqdb[publickey]["lastHash"] and reqdb[publickey]["lastHash"] != "":
            #        return jsonify({"result": reqdb[publickey]});
            hex_data = '"'+binascii.hexlify(value.encode('utf-8')).decode('utf-8')+'"'
            with nonce_lock:
                current_nonce = nonce
                nonce += 1
                if(nonce >= totalThreads):
                    nonce = 0
            result = driver[current_nonce].execute_script(f"return getMessages({hex_data});")
            return jsonify({"result": result})
        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": str(e)}), 500
    else:
        response = {"error": "Invalid action"}

    return jsonify(response)

with open("config.js", 'r') as file:
    for line in file:
        totalThreads = int(line.strip().split("totalThreads = ")[1])
        break
# Function to start the Flask app in a separate thread
def run_flask():    
    serve(app, host='0.0.0.0', port=9000, threads=totalThreads)
    #app.run(port=9000, debug=False, use_reloader=False)
flask_thread = threading.Thread(target=run_flask)
flask_thread.start()

def execute_js_from_file(filepath, index):
    try:
        with open(filepath, 'r') as file:
            # Read and execute each line in the config.js file
            for line in file:
                clean_line = line.strip()
                if("totalThreads" in clean_line):
                    continue
                if clean_line:  # Skip empty lines
                    driver[index].execute_script(clean_line)
                    print(f"Executed: {clean_line}")
    except FileNotFoundError:
        print(f"Error: The file {filepath} was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Wait for Flask to start, then open the browser and set the session key
inx = 0
while(inx < totalThreads):
    driver.append(webdriver.Firefox(options=Options()))
    driver[inx].get('http://localhost:9000')
    execute_js_from_file("config.js", inx)
    driver[inx].execute_script(f"window.globalSessionKey = '{session_key}';")
    print("Session key(DO NOT SHARE):" + session_key)
    inx += 1
print(driver[0].title)
print(totalThreads)
