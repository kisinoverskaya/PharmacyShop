const session = require('express-session');
const FileStore = require('session-file-store')(session);
const express = require('express');
const ssr = require('../middleware/ssr');

const config = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(session({
    store: new FileStore(), // создаем хранилище для сессии
    name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
    secret: process.env.SESSION_SECRET ?? 'test', // Секретное слово для шифрования, может быть любым
    resave: false, // Пересохранять ли куку при каждом запросе
    saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
    cookie: {
      maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
      httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
    },
  }));
  app.use(express.static('public'));
  app.use(ssr);
};

module.exports = config;
