# Используем официальный nginx образ
FROM nginx:alpine

# Копируем нашу сборку React в директорию, которую nginx будет отдавать
COPY build /usr/share/nginx/html

# Копируем кастомный конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
