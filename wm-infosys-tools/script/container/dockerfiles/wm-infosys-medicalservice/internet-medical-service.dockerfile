FROM docker.io/alpine
MAINTAINER junbo.yang@i-soft.com.cn
COPY ["./conf/internet_medical_service.properties.sample", "/etc/wisdom_medical/internet_medical_service/internet_medical_service.properties"]
COPY ["./lib", "/lib"]
COPY ["./internet-medical-service", "/bin"]
RUN echo -e "https://mirror.tuna.tsinghua.edu.cn/alpine/latest-stable/main\nhttps://mirror.tuna.tsinghua.edu.cn/alpine/latest-stable/community" > /etc/apk/repositories
RUN apk update && apk upgrade && \
  apk add openjdk8-jre-base && \
  chmod +x /bin/internet-medical-service
ENTRYPOINT /bin/internet-medical-service

