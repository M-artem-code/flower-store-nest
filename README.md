# Flower Store API

## Описание
Демо-проект backend API для "цветочного магазина" на NestJS.

В проекте есть несколько способов взаимодействия с системой:
- REST API + Swagger UI
- GraphQL API (Apollo)
- WebSocket (Socket.IO)
- TCP microservice (Nest microservices)

Данные хранятся в PostgreSQL, доступ к БД реализован через Prisma.

## Стек
- NestJS
- PostgreSQL
- Prisma
- Swagger (`/docs`)
- GraphQL (Apollo)
- Socket.IO (WebSocket)
- TCP microservice

## Основные URL после запуска
- REST base: `http://localhost:3000/api`
- Swagger: `http://localhost:3000/docs`
- GraphQL: `http://localhost:3000/graphql`
- TCP microservice: `localhost:3001`

## Требования
- Node.js
- npm
- PostgreSQL (локально или в Docker)

## Переменные окружения
Минимально необходима переменная:
- `DATABASE_URL` — строка подключения к PostgreSQL.

Пример:
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/flower_store?schema=public"
```

Примечание: если `DATABASE_URL` не задан, приложение упадёт при старте (это ожидаемо).

## Установка
```bash
npm install
```

## Подготовка базы данных (Prisma)
1) Убедись, что PostgreSQL запущен.

2) Прогони миграции:
```bash
npm run db:migrate
```

3) (Опционально) сиды:
```bash
npm run db:seed
```

## Запуск приложения
```bash
npm run start:dev
```

Продакшн сборка:
```bash
npm run build
npm run start:prod
```

## Доступ к API
После запуска приложения:
- REST base: `http://localhost:3000/api`
- Swagger UI: `http://localhost:3000/docs`
- GraphQL: `http://localhost:3000/graphql`

## Авторизация
Для части REST-эндпоинтов используется простой guard, который проверяет заголовок:
- `Authorization: secret`

Пример запроса:
```bash
curl -H "Authorization: secret" http://localhost:3000/api/flowers
```

## Что реализовано по функционалу
- CRUD/операции с цветами через Prisma (модель `Flower` в `prisma/schema.prisma`).
- Swagger документация.
- GraphQL схема генерируется автоматически в `src/schema.gql`.
- WebSocket gateway для сообщений (echo + broadcast).
- TCP microservice на порту `3001`.
