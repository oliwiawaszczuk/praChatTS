from flask import request

from models.query import get_user_by_sid, get_every_invitations_for_user_id, get_user_by_user_id, \
    get_every_friends_for_user_id, accept_invitation_by_users_id, decline_invitation_by_users_id


def create_friends_list_routes(socketio):
    @socketio.on('get_invitations')
    def get_invitations():
        user = get_user_by_sid(request.sid)
        invitations = get_every_invitations_for_user_id(user.id)
        user_invitations = []
        for x in invitations:
            user = get_user_by_user_id(x)
            user_invitations.append({'id': user.id, 'username': user.username, 'userCode': user.userCode, 'email': user.email})
        socketio.emit('invitations_list', user_invitations)

    @socketio.on('get_friends_list')
    def get_friends_list():
        user = get_user_by_sid(request.sid)
        friends_list = get_every_friends_for_user_id(user.id)
        user_friends_list = []
        for x in friends_list:
            user = get_user_by_user_id(x)
            user_friends_list.append({'id': user.id, 'username': user.username, 'userCode': user.userCode, 'email': user.email})
        socketio.emit('friends_list', user_friends_list)

    @socketio.on('accept_invitation')
    def accept_invitation(id):
        user = get_user_by_sid(request.sid)
        accept_invitation_by_users_id(id, user.id)
        get_invitations()
        get_friends_list()

    @socketio.on('decline_invitation')
    def decline_invitation(id):
        user = get_user_by_sid(request.sid)
        decline_invitation_by_users_id(id, user.id)
        get_invitations()
        get_friends_list()
