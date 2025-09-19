FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/ncc-backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=prod

ENTRYPOINT ["java", "-jar", "app.jar"]