import kafka_connection
import json
import uuid


def bus_2_producer():
    # dummy data to replicate the data flow
    data_flow = open("bus2.json")
    data_decode = json.load(data_flow)
    coordinate_data = data_decode['features'][0]['geometry']['coordinates']

    data = {}
    data['bus_line_no'] = '2'
    data["id"] = str(uuid.uuid4())
    i = 0
    while i <= len(coordinate_data):
        data['lat'] = coordinate_data[i][0]
        data['long'] = coordinate_data[i][1]
        i = i + 1
        message = json.dumps(data)
        kafka_connection.producing_message(message)
        print(message)
        if i == len(coordinate_data):
            i = 0


bus_2_producer()
