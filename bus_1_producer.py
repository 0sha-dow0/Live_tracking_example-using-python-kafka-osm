import kafka_connection
import json
import uuid
from time import sleep


def bus_1_producer():
    # dummy data to replicate the data flow
    data_flow = open("bus1.json")
    data_decode = json.load(data_flow)
    coordinate_data = data_decode['features'][0]['geometry']['coordinates']

    data = {}
    data['bus_line_no'] = 1
    data["id"] = str(uuid.uuid4())
    i = 0
    while i <= len(coordinate_data):
        data['lat'] = coordinate_data[i][1]
        data['long'] = coordinate_data[i][0]
        i = i + 1
        message = json.dumps(data)
        sleep(2)
        kafka_connection.producing_message(message)
        if i == len(coordinate_data):
            i = 0

bus_1_producer()