from flask import Flask, jsonify
from flask_socketio import SocketIO, emit
from threading import Thread, Event
import time

# Initialize Flask and Flask-SocketIO
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

# Example patient data
patient_info = {
    "name": "Harini",
    "id": "202409301125",
    "date": "03-10-2024",
    "doctor": "Dr.M.Kannan",
    "session": "3",
    "leg": "Right"
}

# Predefined ultrasonic sensor data
ultrasonic_data = {
    "graph1": [43.7, 22.4, 85.6, 17.9, 63.2, 54.8, 31.3, 76.5, 19.7, 45.2, 
               28.4, 67.9, 82.1, 33.6, 58.3, 39.4, 24.7, 72.9, 91.5, 50.6],
    "graph2": [47.3, 60.8, 18.9, 80.2, 36.7, 64.1, 29.3, 71.4, 90.3, 55.2,
               41.6, 26.8, 68.4, 83.7, 34.9, 52.8, 40.3, 23.5, 77.2, 93.1],
    "graph3": [48.6, 59.7, 21.4, 81.9, 37.8, 65.4, 30.2, 70.8, 88.4, 53.6,
               43.7, 63.2, 31.3, 76.5, 19.7, 45.2, 28.4, 67.9, 82.1, 33.6]
}

# Function to emit data sequentially
def data_emitter():
    index = 0
    data_length = len(ultrasonic_data["graph1"])
    while not stop_event.is_set():
        # Emit patient info
        socketio.emit('patient_data', patient_info)
        
        # Prepare graph data for the current index
        graph_data = {
            "graph1": [{"time": index, "distance": ultrasonic_data["graph1"][index]}],
            "graph2": [{"time": index, "distance": ultrasonic_data["graph2"][index]}],
            "graph3": [{"time": index, "distance": ultrasonic_data["graph3"][index]}]
        }
        
        # Emit graph data
        socketio.emit('graph_data', graph_data)
        
        # Increment index and loop back if end of data is reached
        index = (index + 1) % data_length
        
        # Wait for 1 second before sending the next reading
        time.sleep(1)

# Start background thread
stop_event = Event()
thread = Thread(target=data_emitter)
thread.start()

@app.route('/')
def index():
    return "Socket.IO server running."

@socketio.on('disconnect')
def disconnect():
    print('Client disconnected')

@app.before_request
def setup():
    global stop_event, thread
    if not thread.is_alive():
        stop_event.clear()
        thread = Thread(target=data_emitter)
        thread.start()

if __name__ == '__main__':
    try:
        socketio.run(app, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True)
    except KeyboardInterrupt:
        stop_event.set()
        thread.join()
