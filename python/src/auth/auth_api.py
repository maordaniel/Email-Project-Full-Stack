from python.src.functions.api_functions import *
from flask import make_response, request, session
import json


# user login and save session parameters
def login():
    try:
        content = json.loads(request.data.decode())

        user = content["user"]
        session["user"] = user
        session['logged_in'] = True

        return make_response("Ok", 200)
    except:
        return not_found()


# user logout
def logout():
    try:
        session['logged_in'] = False
        return make_response("Ok", 200)
    except:
        return not_found()
