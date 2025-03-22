FROM openjdk:21-jdk-slim

# 🔽 curl yükleniyor
RUN apt-get update && apt-get install -y curl && apt-get clean

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]