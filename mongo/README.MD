# Set up Replica MongoDB in Docker

### 1. Pull Image

```
docker pull mongo
```

### 2. Create Network for Mongo

```
docker network create my-mongo-cluster
```

### 3. Starts Mongo1 replica

```
docker run \
-p 30001:27017 \
--name mongo1 \
--net my-mongo-cluster \
mongo mongod --replSet my-mongo-set
```

### 4. Starts Mongo2-3

```
$ docker run \
-p 30002:27017 \
--name mongo2 \
--net my-mongo-cluster \
mongo mongod --replSet my-mongo-set
```

```
$ docker run \
-p 30003:27017 \
--name mongo3 \
--net my-mongo-cluster \
mongo mongod --replSet my-mongo-set
```

### 5. start Mongoshell for Configuration

```
docker exec -it mongo1 mongo
```

### 6. Set up DB -> test is der name

```javascript
db = new Mongo('localhost:27017').getDB('test')
```

###7. Set up Config !! have to be double quotes !!

```
config = {
  	"_id" : "my-mongo-set",
  	"members" : [
  		{
  			"_id" : 0,
  			"host" : "mongo1:27017"
  		},
  		{
  			"_id" : 1,
  			"host" : "mongo2:27017"
  		},
  		{
  			"_id" : 2,
  			"host" : "mongo3:27017"
  		}
  	]
  }
```

###8. initiate replicaSet

```javascript
rs.initiate(config)
```
