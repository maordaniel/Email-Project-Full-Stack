from ..functions.api_functions import *
from flask import make_response, request, session
import json


# user login and save session parameters
def login():
    try:
        content = json.loads(request.data.decode())

        user = content["user"]
        session["user"] = user
        session['logged_in'] = True
        data = {'message': 'OK', 'code': 'SUCCESS'}
        return make_response(jsonify(data), 200)
    except:
        return not_found()


# user logout
def logout():
    try:
        session['logged_in'] = False
        data = {'message': 'OK', 'code': 'SUCCESS'}
        return make_response(jsonify(data), 200)
    except:
        return not_found()
