FROM nginx:1.16-alpine
COPY default.conf /etc/nginx/conf.d
COPY ./dist/arbo-ead-angular /usr/share/nginx/html