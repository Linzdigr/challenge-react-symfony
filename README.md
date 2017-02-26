webikeo.akacrow.tech
====================

A Symfony project created on February 22, 2017, 7:36 pm.


php bin/console doctrine:database:create

CREATE TYPE type_operation AS ENUM ('credit', 'debit'); # as ORM columnDefinition="enum()" notation seems to not working under postgreql
php bin/console doctrine:schema:update --dump-sql --force
