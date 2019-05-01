# Infos for custom-connector docker

## Connector directory in docker

```
/usr/share/confluent-hub-components
```

# HTTP Request for Connect API

### create Connector

```
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @config.json
```

### get Connectors

```
curl -H "Accept:application/json" localhost:8083/connectors/
```

### delete Connectors

```
curl -X DELETE localhost:8083/connectors/ConnectorName
```

### describe Connectors

```
curl -H "Accept:application/json" localhost:8083/connectors/ConnectorName
```

# get Topic info

```
docker run -it --name watcher --rm --link zookeeper:zookeeper --link kafka:kafka debezium/kafka:0.9 watch-topic -a -k rs0.test.testC.
```

## Info

- Connector pro Database, dank whitecard
- topic pro tabelle / collection
  - topic name = Instantz.databaseName.Collection
    - Instantz = name aus json
    - Databasname = name aus json
    - Collection = name aus Datenbank
