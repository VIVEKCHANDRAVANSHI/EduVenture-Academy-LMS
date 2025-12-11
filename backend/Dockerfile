# Use Maven with Eclipse Temurin 21 as the base image
FROM maven:3.9.5-eclipse-temurin-21

# Set the working directory
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/Learning-Management-System-0.0.1-SNAPSHOT.jar"]
