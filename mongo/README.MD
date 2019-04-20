# Set up Replica MongoDB in Docker

### 1. Start Dockers

```
docker-compose up -d
```

### 2. start Mongoshell for Configuration

```
docker exec -it mongo1 mongo
```

### 3. Set up Config

```
config = {"_id" : "rs0","members" : [{"_id" : 0,"host" : "mongo1:27017"},{"_id" : 1,"host": "mongo2:27017"},{"_id" : 2,"host" : "mongo3:27017"}]}
```

### 4. initiate replicaSet

```javascript
rs.initiate(config)
```

---

## Get Replica Config to see which container are init

```javascript
rs.config()
```

## Get Replica Status to see which container is primary and secondary

```javascript
rs.status()
```
