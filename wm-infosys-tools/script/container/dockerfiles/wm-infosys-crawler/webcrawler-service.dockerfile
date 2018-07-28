FROM docker.io/alpine
MAINTAINER junbo.yang@i-soft.com.cn
COPY ["./conf/web.properties.sample", "/etc/wisdom_medical/crawler_service/web.properties"]
COPY ["./lib", "/lib"]
COPY ["./webcrawler-service", "/bin"]
RUN echo -e "https://mirror.tuna.tsinghua.edu.cn/alpine/latest-stable/main\nhttps://mirror.tuna.tsinghua.edu.cn/alpine/latest-stable/community" > /etc/apk/repositories
RUN apk update && apk upgrade && \
  apk add openjdk8-jre-base && \
  chmod +x /bin/webcrawler-service
ENTRYPOINT /bin/webcrawler-service

