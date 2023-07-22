from pykafka import KafkaClient

client = KafkaClient(hosts="localhost:9092")
topic = client.topics["test123"]
producer = topic.get_sync_producer()

def producing_message(message):
    producer.produce(message.encode('utf-8'))