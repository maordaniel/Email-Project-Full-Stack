from flask import Flask
import os
from flask_cors import CORS
from user.user_messages import *
from auth.auth_api import *

app = Flask(__name__)
app.secret_key = os.urandom(12)
CORS(app, supports_credentials=True)


# login function
@app.route('/api/login', methods=['POST'])
def app_login():
    return login()


# logout function
@app.route('/api/logout', methods=['GET'])
def app_logout():
    return logout()


# create message function
@app.route('/api/create', methods=['POST'])
def app_create_message():
    return create_message()


# get all messages function
@app.route('/api/messages', methods=['GET'])
def app_get_all_messages():
    return get_all_messages()


# delete message function
@app.route('/api/delete', methods=['DELETE'])
def app_delete_message():
    return delete_message()


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
