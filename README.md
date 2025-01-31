# Projet Car - Gestion des voitures

Ce projet est une API Symfony permettant de gérer des modèles de voitures, de calculer la vitesse nécessaire pour parcourir une certaine distance, et de consommer cette API sur un frontend Angular.

## Structure du projet

Le projet est divisé en deux répertoires principaux :

- `car/app_car` : L'application frontend en Angular
- `car/api_car` : L'API backend en Symfony

Chaque partie peut être lancée indépendamment, mais elles sont intégrées et gérées via Docker pour simplifier le processus de développement.

## Prérequis

Avant de commencer, assurez-vous que vous avez installé les outils suivants :

- Docker et Docker Compose : [Télécharger Docker](https://www.docker.com/products/docker-desktop)
- Node.js (pour Angular) : [Télécharger Node.js](https://nodejs.org/)
- Composer (pour Symfony) : [Télécharger Composer](https://getcomposer.org/)

## Installation

### 1. Cloner le dépôt du projet
```bash
git clone <URL-du-dépôt>
cd <nom-du-dossier>
```

### 2. Lancer les services avec Docker Compose
```bash
docker-compose up --build -d
```

## Installation de l'API Symfony

1. Accédez au répertoire `api_car` :
   ```bash
   cd api_car
   ```

2. Installez les dépendances avec Composer :
   ```bash
   composer install
   ```

3. Assurez-vous que le répertoire de stockage et le cache ont les bonnes permissions :
   ```bash
   chmod -R 777 var/
   ```

4. Créez et appliquez les migrations de la base de données :
   ```bash
   php bin/console doctrine:migrations:migrate
   ```

## Installation de l'application Angular

1. Accédez au répertoire `app_car` :
   ```bash
   cd app_car
   ```

2. Installez les dépendances avec npm :
   ```bash
   npm install
   ```

3. Lancez le serveur de développement Angular :
   ```bash
   ng serve
   ```

Votre application Angular sera accessible via `http://localhost:4200`, et l'API Symfony via `http://localhost:8081` (ou selon la configuration de votre `docker-compose.yml`).

