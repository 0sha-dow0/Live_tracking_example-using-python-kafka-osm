from pykafka import KafkaClient

client = KafkaClient(hosts="localhost:9092")
topic = client.topics["testing"]
producer = topic.get_sync_producer()

def producing_message(message):
    producer.produce(message.encode('ascii'))