FROM docker.io/alpine
MAINTAINER junbo.yang@i-soft.com.cn
COPY ["./conf/web.properties.sample", "/etc/wisdom_medical/web_service/web.properties"]
COPY ["./lib/wm-infosys-web-0.0.1-SNAPSHOT.jar", "/lib"]
COPY ["./web-service", "/bin"]
RUN echo -e "https://mirror.tuna.tsinghua.edu.cn/alpine/latest-stable/main\nhttps://mirror.tuna.tsinghua.edu.cn/alpine/latest-stable/community" > /etc/apk/repositories
RUN apk update && apk upgrade && \
  apk add openjdk8-jre-base && \
  chmod +x /bin/web-service
ENTRYPOINT /bin/web-service
