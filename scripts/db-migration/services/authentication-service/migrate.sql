CREATE DATABASE authentication_db;

CREATE USER authentication_user WITH ENCRYPTED PASSWORD 'secret';

GRANT ALL PRIVILEGES ON DATABASE authentication_db TO authentication_user;
ALTER DATABASE authentication_db OWNER TO authentication_user;