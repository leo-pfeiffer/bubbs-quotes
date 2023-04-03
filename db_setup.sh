#!/bin/bash
# Setup script to run the
# Usage: "bash db_setup.sh <mongo-admin-password>"

# export env variables

# check if we can import env from files
if [[ -f ".env" ]]
  then
    export $(grep -v '^#' .env | xargs)
fi

# if env not set at this point, exit
if [[ "$ENV_SET" == "" ]]
  then
    echo "ENV variables not set. Exiting."
    exit 1
fi

mongosh --authenticationDatabase "admin" -u "admin" -p "$1" <<EOF
  use $MONGO_DATABASE;
  if (db.getUsers({filter: {'user': "$MONGO_USER"}}).users.length != 0) {
    db.dropUser("$MONGO_USER")
  };
  db.createUser(
    {
      user: "$MONGO_USER",
      pwd: "$MONGO_PASSWORD",
      roles: [ { role: "readWrite", db: "$MONGO_DATABASE" } ]
    }
  );
EOF

mongoimport --db $MONGO_DATABASE --collection $MONGO_COLLECTION --drop --file resources/data.json --jsonArray