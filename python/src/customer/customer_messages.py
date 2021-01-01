from python.src.functions.api_functions import *
import json
from flask import make_response, request, jsonify, session


# create message in user's email
def create_message():
    try:
        content = json.loads(request.data.decode())  # get the data received in a Flask request

        if not verify_email(content):   # verify emails
            return not_found()
        create_message_action(content)

        data = {'message': 'Created', 'code': 'SUCCESS'}
        return make_response(jsonify(data), 201)

    except:
        return not_found()


# delete message from user's email
def delete_message():
    try:
        content = json.loads(request.data.decode())  # get the data received in a Flask request

        user = session["user"]
        message = content["message"]
        val = content["val"]

        if session["logged_in"]:
            if user in emails.keys():
                delete_message_action(user, message, val)
            return make_response("Ok", 200)
        return unauthorized()

    except:
        return not_found()


# return all messages from user's email
def get_all_messages():
    try:
        user = session["user"]

        if session["logged_in"]:
            if user in emails.keys():
                data = {'messages': emails[user]}
                return make_response(jsonify(data), 200)
            return not_found()
        return unauthorized()

    except:
        return not_found()
