# **Дипломный проект Movies Explorer - API**

### О чём этот проект:
Дипломный проект Movies Explorer. Проект представляет собой страницу с регистрацией и авторизацией, где можно просматривать фильмы и добавлять в избранное.

## Запуск проекта
`npm run start` — запускает сервер.   
`npm run dev` — запускает сервер с hot-reload.

### Запросы:
- `POST /signup` — создаёт пользователя с переданными в теле `email`, `password` и `name`
- `POST /signin` — проверяет переданные в теле `email`, `password` и возвращает JWT
- `GET /users/me` — возвращает данные о пользователе `email` и `name`
- `PATCH /users/me` — обновляет информацию о пользователе `name` и `email`
- `GET /movies` — возвращает все сохранённые текущим  пользователем фильмы
- `POST /movies` — создаёт фильм с переданными в теле `country`, `director`, `duration`, `year`, `description`, `image`, `trailer`, `thumbnail`, `movieId`, `nameRU`, `nameEN`
- `DELETE /movies/:movieId` —  удаляет сохранённый фильм по id

## Ссылки
###### API сервиса - https://api.movies.nomoredomains.xyz
