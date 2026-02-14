# Lancement du Projet - Détection Maladie Alzheimer

## Prérequis

Avant de lancer, vérifier que ces services sont installés et fonctionnels :

```
java -version       → 17.x.x
mvn --version       → 3.x.x
node --version      → 18.x.x
ng version          → 17.x.x
PostgreSQL          → en cours d'exécution
Base alzheimer_stock → créée
```

---

## Compilation (une seule fois ou après modification du code)

```
cd alzheimer-detection/backend
mvn clean install -DskipTests
```

Résultat attendu : **BUILD SUCCESS**

---

## Lancement (4 terminaux)

### Terminal 1 : Eureka Server

```
cd alzheimer-detection/backend/eureka-server
mvn spring-boot:run
```

Attendre : `Started EurekaServerApplication`
Vérifier : http://localhost:8761

---

### Terminal 2 : API Gateway

```
cd alzheimer-detection/backend/api-gateway
mvn spring-boot:run
```

Attendre : `Started ApiGatewayApplication`

---

### Terminal 3 : Service Stock

```
cd alzheimer-detection/backend/service-stock
mvn spring-boot:run
```

Attendre : `Started ServiceStockApplication`
Vérifier : http://localhost:8081/api/categories

---

### Terminal 4 : Frontend Angular

```
cd alzheimer-detection/frontend/alzheimer-app
npm install
ng serve --open
```

Vérifier : http://localhost:4200

---

## Vérification rapide

| Service | URL | Attendu |
|---------|-----|---------|
| Eureka | http://localhost:8761 | Dashboard |
| Gateway | http://localhost:8080 | Actif |
| Stock API | http://localhost:8081/api/categories | JSON |
| Frontend | http://localhost:4200 | Interface |

---

## Arrêt

`Ctrl + C` dans chaque terminal.
