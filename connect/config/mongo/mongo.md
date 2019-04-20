# Mongo config

```
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @config.json
```

## Example Config json

```
{
  "name": "inventory-connector",
  "config": {
    "connector.class": "io.debezium.connector.mongodb.MongoDbConnector",
    "tasks.max": "1",
    "mongodb.hosts": "localhost:30001",
    "mongodb.name": "dbserver1",
    "database.whitelist": "test[.]*",
    "database.history.kafka.bootstrap.servers": "kafka:9092"
  }
}

```

## Create topic

```
docker-compose exec broker kafka-topics --create --zookeeper \
zookeeper:2181 --replication-factor 1 --partitions 1 --topic dbserver1.test.testC
```

## List Topic

```
 docker-compose exec broker kafka-topics --list --zookeeper localhost:2181
```
