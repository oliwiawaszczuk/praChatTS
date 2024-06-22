from flask import request, jsonify

from lib.hash import verify_password
from models.query import checking_is_user_exist_by_email, check_session_by_sid_and_user_id, get_user_by_user_id


def create_socket_routes(app, socketio):
    # @socketio.on('connect')
    # def handle_connect():
    #     print(f'Client connected, sid: {request.sid}')
    #
    # @socketio.on('disconnect')
    # def handle_disconnect():
    #     print(f'Client disconnected, sid: {request.sid}')

    @socketio.on('check_auth')
    def handle_check_auth(token):
        if not token or len(token) <= 20:
            socketio.emit('auth_status', {'isAuthenticated': False})
        else:
            sid, user_id = token[:20], token[20:]
            session = check_session_by_sid_and_user_id(sid[::-1], user_id)
            if not session:
                socketio.emit('auth_status', {'isAuthenticated': False})
            else:
                user = get_user_by_user_id(user_id)
                socketio.emit('auth_status', {'isAuthenticated': True, 'user': {'id': user.id, 'username': user.username, 'userCode': user.userCode, 'email': user.email}})
