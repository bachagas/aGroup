# aGroup
## A meta-groupware platform assisting people with technology

aGroup is a demo/research project I did to play around with Node.js and Angular.

So it is a "complete" MEAN stack project (Backend + Frontend) I built from scratch to see how it is to put a complete web app live using this technology.

You can chekout a live demo on Heroku: [http://agroup.herokuapp.com/](http://agroup.herokuapp.com/)

_Note: If it is dead, please drop me a line, probably Heroku dynos are sleeping for too long and need a restart._

---

## What it does

It has very basic functions, but allow anyone to see how the basic things work in the MEAN Javascript full stack, from the Back to the Frontend:

- Sing up as a new user
- Log in and manage your "profile"
- A sort of "events" CRUD
- Mails the event owner, when somebody post a new thing on it

---

## What it uses

The app plays around with some web app important concepts:
- Routing in the Backend (using Express)
- EJS templates and partials
- Basic authentication and authorization
- Single page app in the Frontend (using Angular routing)
- Angular services, resources, directives, etc.
- Controllers and forms
- Storing data in a MongoDB ([Parse.com](http://parse.com/))

---

## Installation / Usage

If you do want to download and install it to tinker and mess around just go:

```bash
git clone https://bachagas@bitbucket.org/bachagas/agroup.git
cd agroup
npm install
node server.js
```

And everything has worked if can tap the app up and alive in [http://localhost:3030](http://localhost:3030) ;-)
