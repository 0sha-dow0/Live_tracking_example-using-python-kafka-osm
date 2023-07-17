from flask import Flask,Response
from pykafka import KafkaClient


consumer_client=KafkaClient(hosts="localhost:9092")
topic = consumer_client.topics["testing"]
consumer = topic.get_simple_consumer()


app = Flask(__name__)



@app.route('/')
def index():
    def event():
        for i in consumer:
            yield 'data{0}:\n\n'.format(i.value.decode())


    return Response(event(),mimetype="text/event-stream")


if __name__=='__main__':
    app.run(debug=True,port=5253)

