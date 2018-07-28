FROM docker.io/alpine
MAINTAINER junbo.yang@i-soft.com.cn
COPY ["./conf/disease_service.properties.sample", "/etc/wisdom_medical/disease_service/disease_service.properties"]
COPY ["./lib", "/lib"]
COPY ["./disease-service", "/bin"]
RUN echo -e "https://mirror.tuna.tsinghua.edu.cn/alpine/latest-stable/main\nhttps://mirror.tuna.tsinghua.edu.cn/alpine/latest-stable/community" > /etc/apk/repositories
RUN apk update && apk upgrade && \
  apk add openjdk8-jre-base && \
  chmod +x /bin/disease-service
ENTRYPOINT /bin/disease-service

