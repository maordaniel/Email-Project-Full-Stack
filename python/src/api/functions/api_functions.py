from flask import make_response
from datetime import datetime
import re

# all emails that received from the requests with all of the data
# (sender, receiver, subject, message and creation date)
emails = {}


# verify emails that received from the requests
def verify_email(email):
    sender_address = email["sender"]
    receiver_address = email["receiver"]
    message = email["message"]
    if email_address_validation(sender_address) and email_address_validation(receiver_address) and message:
        return True
    return False


# verify email address
def email_address_validation(email):
    regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    if re.search(regex, email):
        return True


# create new email message
def create_message_action(content):
    sender = content["sender"]
    receiver = content["receiver"]
    content["creation date"] = {"date": current_date(), "time": current_time()}

    if sender not in emails.keys():
        emails[sender] = {"outbox": [], "inbox": []}
    if receiver not in emails.keys():
        emails[receiver] = {"outbox": [], "inbox": []}

    emails[sender]["outbox"].append(content)
    emails[receiver]["inbox"].append(content)


# delete email message from user email, val is inbox/outbox.
def delete_message_action(user, message, val):
    emails[user][val].remove(message)


# return the current date
def current_date():
    now = datetime.now()
    today = now.strftime("%d/%m/%Y")
    return today


# return the current time
def current_time():
    now = datetime.now()
    time = now.strftime("%H:%M:%S")
    return time


# return response 401 Unauthorized
def unauthorized():
    return make_response("Unauthorized", 401)


# return response 404 Not Found
def not_found():
    return make_response("Not Found", 404)
