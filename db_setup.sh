#!/bin/bash
# Setup script to run the
# Usage: "bash db_setup.sh <admin-password>"

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
  use bubbs_quotes;
  if (db.getUsers({filter: {'user': "$DBUSER"}}).users.length != 0) {
    db.dropUser("$DBUSER")
  };
  db.createUser(
    {
      user: "$DBUSER",
      pwd: "$DBPASSWORD",
      roles: [ { role: "readWrite", db: "$DATABASE" } ]
    }
  );
EOF

mongoimport --db $DATABASE --collection $DBCOLLECTION --drop --file resources/data.json --jsonArray