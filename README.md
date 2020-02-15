# Registration Form - Laravel + Vue.js
Для запуска проекта неоходимо:
- Настроить файл `.env`, для подключения к БД.
- В файл `config.js` написать Google Key для Google Maps
```sh
googleKey: ""
```
- Установить пакеты
```sh
$ composer install
$ npm install
```
- Собрать проект
```sh
$ npm run prod
```
- Создать хранилие для изображений
```sh
$ php artisan storage:link
```
- Создать таблицы в БД
```sh
$ php artisan migrate
```