FROM nginx

MAINTAINER troy (渔歌)

RUN rm /etc/nginx/conf.d/default.conf

ADD nginx.custom.conf /etc/nginx/conf.d/

COPY dist /usr/share/nginx/dist

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

RUN echo 'build success!!'
