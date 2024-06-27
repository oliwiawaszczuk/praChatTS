from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
import os

from routes.chat import create_chat_routes
from routes.friendsList import create_friends_list_routes
from routes.login import create_login_route
from routes.socket import create_socket_routes

db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../databases/databases.db"))


def create_app(db, migrate):
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    socketio = SocketIO(app, cors_allowed_origins="*")

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate.init_app(app, db)

    # create routes
    create_socket_routes(socketio)
    create_login_route(socketio)
    create_chat_routes(socketio)
    create_friends_list_routes(socketio)

    return app, socketio
