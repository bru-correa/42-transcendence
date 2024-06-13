#!/bin/bash

elastic_url=http://localhost:9200

until curl -s $elastic_url -o /dev/null; do
  sleep 5
  echo "Waiting for Elastic..."
done


curl -u elastic:elastic \
	-X POST \
	http://localhost:9200/_security/user/kibana_system/_password \
	-d '{"password":"'"kibana"'"}' \
	-H 'Content-Type: application/json'

curl -u elastic:elastic \
	-X POST \
	http://localhost:9200/_security/role/logstash_writer \
	-d '{
        "cluster": ["manage_index_templates", "monitor", "manage_ilm"],
        "indices": [
          {
            "names": [ "logstash-*" ],
            "privileges": ["write","create","create_index","manage","manage_ilm"]
          }
        ]
  }' \
	-H 'Content-Type: application/json'

curl -u elastic:elastic \
	-X POST \
	http://localhost:9200/_security/user/logstash_internal \
	-d '{
        "password" : "logstash",
        "roles" : [ "logstash_writer"],
        "full_name" : "Internal Logstash User"
  }' \
	-H 'Content-Type: application/json'

curl -u elastic:elastic \
	-X POST \
	http://localhost:9200/_security/user/beats_system/_password \
	-d '{"password":"'"heartbeat"'"}' \
	-H 'Content-Type: application/json'

curl -u elastic:elastic \
	-X POST \
	http://localhost:9200/_security/role/heartbeat_writer \
	-d '{
        "cluster": ["monitor", "read_ilm"],
        "indices": [
          {
            "names": [ "heartbeat-*" ],
            "privileges": ["create_doc"]
          }
        ]
  }' \
	-H 'Content-Type: application/json'

curl -u elastic:elastic \
	-X POST \
	http://localhost:9200/_security/role/heartbeat_monitoring \
	-d '{
         "cluster": ["monitor"],
         "indices": [
           {
             "names": [ ".monitoring-beats-*" ],
             "privileges": ["create_index","create_doc"]
           }
         ]
   }' \
	-H 'Content-Type: application/json'

curl -u elastic:elastic \
	-X POST \
	http://localhost:9200/_security/role/heartbeat_setup \
	-d '{
         "cluster": ["monitor","manage_ilm"],
         "indices": [
           {
             "names": [ "heartbeat-*" ],
             "privileges": ["manage"]
           }
         ]
   }' \
	-H 'Content-Type: application/json'

curl -u elastic:elastic \
	-X POST \
	http://localhost:9200/_security/role/heartbeat_reader \
	-d '{
         "cluster": ["monitor", "manage_ilm"],
         "indices": [
           {
             "names": [ "heartbeat-*" ],
             "privileges": ["read"]
           }
         ]
   }' \
	-H 'Content-Type: application/json'

curl -u elastic:elastic \
	-X POST \
	http://localhost:9200/_security/user/heartbeat_internal \
	-d '{
         "password" : "heartbeat",
         "roles" : [ "kibana_admin","ingest_admin","monitoring_user","heartbeat_reader","heartbeat_writer","heartbeat_setup","heartbeat_monitoring","remote_monitoring_collector","remote_monitoring_agent"],
         "full_name" : "Internal Heartbeat User"
   }' \
	-H 'Content-Type: application/json'

curl -u elastic:elastic \
	-X POST \
	http://localhost:9200/_security/user/42user \
	-d '{
         "password" : "42user",
         "roles" : [ "monitoring_user","viewer","watcher_user" ],
         "full_name" : "Internal 42 User"
   }' \
	-H 'Content-Type: application/json'
