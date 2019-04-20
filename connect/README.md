# Infos for custom-connector docker

## Connector directory

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