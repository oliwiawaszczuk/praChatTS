from flask import request

from lib.hash import verify_password
from models.query import checking_is_user_exist_by_email, add_new_user, create_session, \
    delete_session


def create_login_route(socketio):
    def login_successed(user):
        token = [request.sid[::-1], str(user.id)]
        create_session(user.id, request.sid)
        socketio.emit('login_successful', {'token': ''.join(token), 'user': {'id': user.id, 'username': user.username, 'userCode': user.userCode, 'email': user.email}})

    @socketio.on('login')
    def handle_login(data):
        email = data['email']
        password = data['password']

        if email.strip() == "" or password.strip() == "":
            socketio.emit('login_failed', 'Please enter both email and password')

        user = checking_is_user_exist_by_email(email)
        if user:
            if verify_password(password, user.password):
                login_successed(user)
            else:
                socketio.emit('login_failed', 'Wrong password')
        else:
            socketio.emit('login_failed', 'User with this email does not exist')

    @socketio.on('register')
    def handle_register(data):
        username = data['username']
        email = data['email']
        password = data['password']

        if email.strip() == "" or username.strip() == "" or password.strip() == "":
            socketio.emit('login_failed', 'Please enter both email and password')
        else:
            if checking_is_user_exist_by_email(email) is not None:
                socketio.emit('login_failed', 'User with this email exist')
            else:
                user = add_new_user(username, email, password)
                login_successed(user)

    @socketio.on('logout')
    def logout(token):
        sid, user_id = token[:20], token[20:]
        delete_session(sid[::-1], user_id)
        socketio.emit('logout')
