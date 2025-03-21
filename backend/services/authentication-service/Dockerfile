# 1️⃣ OpenJDK 21 tabanlı bir Docker image kullan
FROM eclipse-temurin:21-jdk AS build

# 2️⃣ Çalışma dizinini oluştur
WORKDIR /app

# 3️⃣ Maven bağımlılıklarını önceden cache’lemek için bağımlılıkları ayrı copy et
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# 4️⃣ Uygulama kaynak kodlarını kopyala
COPY src ./src

# 5️⃣ Maven ile projeyi build et
RUN ./mvnw clean package -DskipTests

# 6️⃣ Final aşama: Sadece jar dosyasını çalıştıracak hafif bir container oluştur
FROM eclipse-temurin:21-jre

WORKDIR /app

# 7️⃣ Build edilen jar dosyasını kopyala
COPY --from=build /app/target/*.jar app.jar

# 8️⃣ Container başlatılınca çalıştırılacak komut
ENTRYPOINT ["java", "-jar", "app.jar"]

# 9️⃣ Uygulamanın çalışacağı portu aç
EXPOSE 8081