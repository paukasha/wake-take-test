# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Комментарии к проекту

В проекте частично используется fsd(https://feature-sliced.github.io/documentation/docs/get-started/overview).
В своих проектах я обычно использую этот архитектурный подход, так как считаю, что он обеспечивает четкую модульную структуру, улучшает масштабируемость и удобство поддержки кода, а также помогает оптимально распределять ответственность между слоями приложения.

Данные о пользователе хранятся в localStorage.

## Описание процесса развертывания проекта на PROD сервере

1. Зайти на сервер по ssh (обновить систему)
2. Сгенерировать ssh ключ для доступа к гиту
3. Добавить ключ id_rsa.pub в репозиторий
4. Клонировать проект на сервер
5. Создать https-server (можно и локально сделать, затем клонировать проект), сделать ключи cert.pem и key.pem  (необходимо для https)
6. Установить зависимости
7. Сделать билд проекта
8. Установить nginx, pm2, Certbot (если не установленo)
9. Настроить nginx - написать в /etc/nginx/site-enabled/default конфигурацию (прописать домен, пути к статическим файлам)
10. С помощью certbot добавить ssl
11. Запустить сервер с помощью pm2 чтобы он не падал, если мы выйдем из ssh

