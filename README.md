LTI Verifiable Credential Issuer
================================

This is an [LTI](https://www.imsglobal.org/activity/learning-tools-interoperability) provider that uses the [cred-admin](https://github.com/digitalcredentials/cred-admin) API to issue Verifiable Credentials.

It should work with any LTI consumer, allowing instructors to configure multiple credentials for issuance to any student that is able to launch the tool, and as such is expected to be used with something like an LMS's conditionally released module system.

Running the dev environment
===========================

For dev use you'll need [node.js](https://nodejs.org/en/), [mkcert](https://github.com/FiloSottile/mkcert) and [docker-compose](https://docs.docker.com/compose/install/)

Configure SSL certs for the local docker instances, you should only have to do this once

1. Run `mkcert -install` to install a local CA
2. Generate SSL certs with `mkcert -cert-file ~/certs/127.0.0.1.nip.io.crt -key-file ~/certs/127.0.0.1.nip.io.key '*.127.0.0.1.nip.io'`
3. Run `echo export NODE_EXTRA_CA_CERTS="$(mkcert -CAROOT)/rootCA.pem" | tee -a ~/.bashrc ~/.zshrc && exec $0` to add the local CA to your environment

Now you can build and start the server by:

1. Set `LTI_KEY` and `LTI_SECRET` in a file named `.env` these can be set to any value but will need to match the settings in your LTI consumer
2. Build and start the tool using `docker-compose up --build`, if you get an error that a port is in use you're probably already running a web server or db on your machine, you'll have to either stop it or adjust the ports used by this project in `docker-compose.override.yml`
3. As the server starts for the first time it will generate an admin token for you, note it down as it's not possible to retrieve it after this point
4. Use the `cred-admin` API to set up a user in a group and note the user's API key as you'll need it when launching the tool for the first time
5. Configure the LTI consumer to use the launch URL `https://dev.127.0.0.1.nip.io` and the `LTI_KEY` and `LTI_SECRET` from your `.env` file
6. You should now be able to launch the tool from your LTI consumer

Configuration
=============

All configuration is done through environment variables.

|Variable           |Default          |Description                           |
|-------------------|-----------------|--------------------------------------|
|ANALYTICS_ID       |                 |Google analytics id                   |
|CRED_ADMIN_URL     |http://localhost/|Location of cred-admin                |
|DB_HOST            |localhost        |Postgres DB host                      |
|DB_NAME            |ltiissuer        |Postgres DB name                      |
|DB_PASSWORD        |                 |Postgres DB password                  |
|DB_PORT            |5432             |Postgres DB port                      |
|DB_USER            |ltiadmin         |Postgres DB user                      |
|EXTERNAL_ID_LTI_VAR|                 |LTI variable to send as external id   |
|JWT_SECRET         |secret           |Secret for signing JWTs               |
|LOG_LEVEL          |info             |Bunyan log level                      |
|LTI_KEY            |                 |LTI producer key                      |
|LTI_SECRET         |                 |LTI producer secret                   |
|PORT               |3000             |Port where server will listen for http|
|SENTRY_DSN         |                 |Send crash reports to this sentry id  |

