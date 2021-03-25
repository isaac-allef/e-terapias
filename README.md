# e-terapias

<!-- <p align="center">
   <img src="" width="350"/>
</p> -->

<br />

---

# :pushpin: Table of Contents

* [Installation](#construction_worker-installation)
* [Business rules](#business-rules)
* [Documentation - front-end](#rocket-features)
* [Documentation - back-end](#rocket-features)


# :construction_worker: Installation

**To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v12.20.0][nodejs] or higher + [Yarn 1.22.5][yarn] or higher installed on your computer. From your command line:**

Create postgres docker
```bash
$ sudo docker run --name e-terapias-docker -e POSTGRES_PASSWORD=1234 -p 5433:5432 -d postgres
```

Create 'e-terapias' database
```sql
CREATE DATABASE "e-terapias";
```
***Feel free to create the database however you want, but remember to change the ormconfig.json file in the backend folder***


Clone this repository
```bash
$ git clone https://github.com/isaac-allef/e-terapias.git
```
Go into the repository
```bash
$ cd e-terapias
```

Install backend dependencies and run it
```bash
$ cd back-end
$ yarn install
$ yarn dev:server
```

Install frontend dependencies and run it
```bash
$ cd front-end
$ yarn install
$ yarn dev or yarn build && yarn start
```

Install and configurate microservice to read google sheets information
- Create your own ".env.local" file based on ".env.local.example" in front-end root folder
- Instale and run [cms-sheets](https://github.com/isaac-allef/cms-sheets)

# Business rules
- [x] A aplicação só pode ser acessada pelos administrators ou pelos moderators
- [X] O moderator tem os recursos de criação e manipulação de seus field journals
- [X] O administrator não pode criar ou alterar field journals
- [X] O administrator pode criar e manipular os demais recursos da aplicação
- [X] Um field journal é criado seguindo um field journal template
- [x] Para que um field journal seja criado é preciso:
    - [x] Um moderator
    - [x] Uma eterapia
    - [x] Que ambos moderador e eterapia estejam previamente relacionados entre se
    - [x] Que a eterapia tenha um field journal template
- [x] Os templates de diários de campo não podem ser alterados, só criados, lidos e excluídos. Caso precise fazer alguma alteração, deverá ser criado um novo template e utiliza-lo
- [X] Cada field journal é composto por fields podem ser do tipo string, int, date e boolean
- [X] Cada eterapia deve ter apenas um field journal template, sendo livre para troca-lo

# Documentation - front-end

### :rocket: User Journey
<img src="/public/user-journey.png"/>


# Documentation - back-end

### :rocket: Features
- [x] Create, list, show, update and delete (administrators, moderators, eterapias and field journals)
- [x] Create, list, show and delete (field journals templates)
- [X] List with relations (administrators, moderators, eterapias, field journals and field journals templates)
- [x] List with pagination, ordenation and search (moderators, eterapias, field journals and field journals templates)
- [x] Link and unlink moderators with eterapias (many to many)
- [X] Link and unlink eterapias with field journals templates (many to one, one to many)
- [X] Login to administrators and moderators
- [X] Authentication and authorization with JWT (JSON WEB TOKEN)

### :rocket: Database schema
<img src="/public/database-schema.png"/>

