from flask import Flask, render_template, request, session, redirect, url_for, jsonify
from flask_socketio import join_room, leave_room, send, SocketIO
import random
from string import ascii_uppercase
import sys
from flask_cors import CORS

app = Flask(__name__)
app.config["SECRET_KEY"] = "hjhjsdahhds"
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

avatarURLs = ['https://i.postimg.cc/bvw5txrS/Screenshot-2024-02-19-at-09-51-18.png', 'https://i.postimg.cc/TwyHkTrR/Screenshot-2024-02-19-at-09-53-28.png', 'https://i.postimg.cc/zDgcKXz7/Screenshot-2024-02-19-at-09-53-32.png', 'https://i.postimg.cc/7h0tkXsd/Screenshot-2024-02-19-at-09-53-43.png', 'https://i.postimg.cc/259KF1Lc/Screenshot-2024-02-19-at-09-53-47.png', 'https://i.postimg.cc/TwZNFB9n/Screenshot-2024-02-19-at-09-53-50.png']


@app.route("/avatars", methods=["GET"])
def avatars():
    return jsonify(Avatars = avatarURLs)

@app.route("/hangmanPrompts", methods=["GET"])
def hangman():
    with open("./prompts/hangman-prompts.txt") as f:
        wordList = []
        for line in f:
            wordList.append(line.strip())
        return jsonify(HangmanPrompts = wordList)
    
@app.route("/pictionaryPrompts", methods=["GET"])
def pictionary():
    with open("./prompts/pictionary-prompts.txt") as f:
        wordList = []
        for line in f:
            wordList.append(line.strip())
        return jsonify(PictionaryPrompts = wordList)
    




rooms = {}

def generate_unique_code(length):
    while True:
        code = ""
        for _ in range(length):
            code += random.choice(ascii_uppercase)
        
        if code not in rooms:
            break
    
    return code

@app.route("/", methods=["POST", "GET"])
def home():
    session.clear()
    if request.method == "POST":
        name = request.form.get("name")
        code = request.form.get("code")
        join = request.form.get("join", False)
        create = request.form.get("create", False)

        if not name:
            return render_template("home.html", error="Please enter a name.", code=code, name=name)

        if join != False and not code:
            return render_template("home.html", error="Please enter a room code.", code=code, name=name)
        
        room = code
        if create != False:
            print("Made it this far")
            room = generate_unique_code(4)
            rooms[room] = {"members": 0, "messages": [], "users": []}
        elif code not in rooms:
            return render_template("home.html", error="Room does not exist.", code=code, name=name)
        
        session["room"] = room
        session["name"] = name
        return redirect(url_for("room"))

    return render_template("home.html")

@app.route("/room")
def room():
    room = session.get("room")
    if room is None or session.get("name") is None or room not in rooms:
        return redirect(url_for("home"))

    return render_template("room.html", code=room, messages=rooms[room]["messages"])

@socketio.on("message")
def message(data):
    room = session.get("room")
    if room not in rooms:
        return 
    
    content = {
        "name": session.get("name"),
        "message": data["data"]
    }
    send(content, to=room)
    rooms[room]["messages"].append(content)
    print(f"{session.get('name')} said: {data['data']}")

@socketio.on("connect")
def connect(auth):
    room = session.get("room")
    name = session.get("name")
    if not room or not name:
        return
    if room not in rooms:
        leave_room(room)
        return
    
    join_room(room)
    send({"name": name, "message": "has entered the room"}, to=room)
    rooms[room]["members"] += 1
    print(f"{name} joined room {room}")

@socketio.on("disconnect")
def disconnect():
    room = session.get("room")
    name = session.get("name")
    leave_room(room)

    if room in rooms:
        rooms[room]["members"] -= 1
        if rooms[room]["members"] <= 0:
            del rooms[room]
    
    send({"name": name, "message": "has left the room"}, to=room)
    print(f"{name} has left the room {room}")



@socketio.on("fe_list_existing_rooms")
def list_existing_rooms():
    print("\n******************** \navailable rooms:\n" + "\n".join([f"{room} -> members: {rooms[room]['members']}" for room in rooms]) + "\n********************\n")
    sys.stdout.flush()

    socketio.emit("be_list_existing_rooms", {'rooms': rooms})

@socketio.on("fe_join_room")
def fe_join_room(data):
    room = data['room']
    name = data['username']
    print(name)
    sys.stdout.flush()

    join_room(room)
    rooms[room]['members'] += 1
    rooms[room]['users'].append(name)
    print(rooms[room]['users'])
    sys.stdout.flush()

    list_existing_rooms()

    socketio.emit("be_join_room", {'rooms': room})

@socketio.on("fe_create_room")
def fe_create_room(data):
    name = data['username']

    room = generate_unique_code(4)
    rooms[room] = {"members": 0, "messages": [], "users": []}

    join_room(room)

    rooms[room]['members'] += 1
    rooms[room]['users'].append(name)
    print(name, room)
    sys.stdout.flush()

    data = {"name": name, "room": room, "users": rooms[room]['users']}
    socketio.emit("be_create_room", data)

@socketio.on("fe_users_list")
def fe_users_list(data):
    room = data['room']
    users = rooms[room]['users']

    socketio.emit("be_users_list", {"users": users, "room": room})

@socketio.on("fe_avatar_select")
def fe_avatar_select(data):
    name = data['username']
    avatar = data['avatarUrl']

    socketio.emit("be_avatar_select", {'username': name, 'avatarUrl': avatar})

@socketio.on("fe_start_game")
def fe_start_game(data):
    saboteurName = data['saboteur']
    print(saboteurName)
    sys.stdout.flush()
    socketio.emit("be_start_game", {'saboteur': saboteurName})

@socketio.on("fe_random_prompt")
def fe_random_prompt(data):
    prompt = data['prompt']

    socketio.emit("be_random_prompt", {'prompt' : prompt})

@socketio.on("fe_start_drawing")
def fe_start_drawing(data):
    offsetX = data['offsetX']
    offsetY = data['offsetY']

    socketio.emit("be_start_drawing", {'offsetX': offsetX, 'offsetY': offsetY})

@socketio.on("fe_draw")
def fe_draw(data):
    offsetX = data['offsetX']
    offsetY = data['offsetY']

    socketio.emit("be_draw", {'offsetX': offsetX, 'offsetY': offsetY})

@socketio.on("fe_finish_drawing")
def fe_finish_drawing(data):
    drawingCommands = data['drawingCommands']

    socketio.emit("be_finish_drawing", {'drawingCommands': drawingCommands})

@socketio.on("fe_rotate_canvas")
def fe_rotate_canvas():
    socketio.emit("be_rotate_canvas")

@socketio.on("fe_lives")
def fe_lives(data):
    lives = data['lives']

    socketio.emit("be_lives", {'lives': lives})


if __name__ == "__main__":
    socketio.run(app, debug=True, host='0.0.0.0', port=8080, allow_unsafe_werkzeug=True)