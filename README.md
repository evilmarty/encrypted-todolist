# Client-side Encrypted Todo App

An example Todo App that uses a user-specified password to encrypt the todo list. Built in React.js and the WebCrypto API.

[View demo](https://evilmarty.github.io/encrypted-todolist)

## Purpose

An exercise to learn how to build a completely isolated application where the user's data is stored on the device and encrypted by a password of their choosing. The intent is to limit access to the user's data to only the original device and the user itself.

The criteria for the project:

* Web-based application.
* Only require a password. No accounts or profiles.
* Limit password exposure inside application to avoid leakage.
* Store data to device. No network calls or backends.

## Lessons learnt

* Documentation for WebCrypto API is scarce but [just] enough.
* Recommendations on best practise and techniques on securing data on client-side is limited and not really directed for the web.
* Cipher usage and explanation is very technical and hard to find resources that attempt to simplify.

## Usage

Prerequisite: (node.js)[https://nodejs.org] with npm or yarn installed.

1. Clone the repository: `git clone git@github.com:evilmarty/encrypted-todolist.git 
2. Run `npm install` or `yarn install`
3. To start the web server run: `npm run start`
4. Open `http://localhost:8080` in your browser.

## References

* The most valuable resource on WebCrypto API: https://diafygi.github.io/webcrypto-examples/
* Second most valuable resource and helped with practically getting the encryption to work: https://timtaubert.de/blog/2015/05/implementing-a-pbkdf2-based-password-storage-scheme-for-firefox-os/

## Disclosure

I am not a security expert nor has any of my code been audited by one.
