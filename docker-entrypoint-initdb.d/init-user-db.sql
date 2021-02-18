CREATE USER ltiadmin PASSWORD 'adminltiaccess';
CREATE DATABASE ltiissuer;
GRANT ALL PRIVILEGES ON DATABASE ltiissuer TO ltiadmin;
CREATE USER credadmin PASSWORD 'admin_cred_access';
CREATE DATABASE credadmin;
GRANT ALL PRIVILEGES ON DATABASE credadmin TO credadmin;
