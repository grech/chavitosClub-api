-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: chavitos_club
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contract`
--

DROP TABLE IF EXISTS `contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract` (
  `id` varchar(36) NOT NULL,
  `event_id` varchar(36) NOT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `tax` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_contract_event1_idx` (`event_id`),
  CONSTRAINT `fk_contract_event1` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract`
--

LOCK TABLES `contract` WRITE;
/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
INSERT INTO `contract` VALUES ('1e163f86-b63a-4ab8-bc7f-30ed4fc7114a','0f3cc84b-3bb1-4269-b99e-e846a10f5f7d',2784.00,384.00,'2025-10-17 23:02:23',2400.00),('1e26da9a-06fc-44d1-960b-5d0cce933bcd','7395e725-6eef-47fe-a333-3143db6bd946',2552.00,352.00,'2025-09-22 18:10:07',2200.00),('51afe495-a76e-43d7-9693-c1779e8393cc','4b1f5c62-3379-4019-a536-b63edaa63998',2784.00,384.00,'2025-10-06 18:19:09',2400.00),('6e719998-543c-45c8-8405-21b50e03ae8e','21326049-102a-4225-8363-1561f1e3bd2e',2784.00,384.00,'2025-10-17 17:49:57',2400.00);
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_suggestions`
--

DROP TABLE IF EXISTS `contract_suggestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_suggestions` (
  `id` varchar(36) NOT NULL,
  `contract_id` varchar(36) NOT NULL,
  `event_id` varchar(36) NOT NULL,
  `hours` int NOT NULL,
  `payload_json` json NOT NULL,
  `savings_mxn` decimal(10,2) NOT NULL,
  `status` enum('PENDING','APPLIED','EXPIRED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` datetime DEFAULT NULL,
  `applied_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_contract_pending` (`contract_id`,`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_suggestions`
--

LOCK TABLES `contract_suggestions` WRITE;
/*!40000 ALTER TABLE `contract_suggestions` DISABLE KEYS */;
INSERT INTO `contract_suggestions` VALUES ('8bab7b32-2ca0-4a1f-a4b2-18e39fcd938d','1e26da9a-06fc-44d1-960b-5d0cce933bcd','7395e725-6eef-47fe-a333-3143db6bd946',5,'{\"hours\": 5, \"calcAt\": \"2025-09-22T18:10:07.902Z\", \"vatRate\": 0.16, \"packages\": [{\"subtotal\": 2200, \"packageId\": 100, \"quaintity\": 1}], \"coveredServices\": [10, 20, 40], \"remainingServices\": []}',200.00,'APPLIED','2025-09-22 12:10:08','2025-09-22 12:25:08','2025-09-22 12:10:55'),('b5dbd6c9-73f8-421b-8c05-4a2b09f53f60','1e163f86-b63a-4ab8-bc7f-30ed4fc7114a','0f3cc84b-3bb1-4269-b99e-e846a10f5f7d',5,'{\"hours\": 5, \"calcAt\": \"2025-10-17T23:02:23.299Z\", \"vatRate\": 0.16, \"packages\": [{\"subtotal\": 2200, \"packageId\": 100, \"quaintity\": 1}], \"coveredServices\": [10, 20, 40], \"remainingServices\": []}',200.00,'PENDING','2025-10-17 17:02:23','2025-10-17 17:17:23',NULL),('c17f99ba-edf8-46fa-a1bc-5c62dd1ed050','51afe495-a76e-43d7-9693-c1779e8393cc','4b1f5c62-3379-4019-a536-b63edaa63998',5,'{\"hours\": 5, \"calcAt\": \"2025-10-06T18:19:09.949Z\", \"vatRate\": 0.16, \"packages\": [{\"subtotal\": 2200, \"packageId\": 100, \"quaintity\": 1}], \"coveredServices\": [10, 20, 40], \"remainingServices\": []}',200.00,'PENDING','2025-10-06 12:19:10','2025-10-06 12:34:10',NULL),('f85d7713-e9c1-4bea-af99-6e1ff7fc9ad4','6e719998-543c-45c8-8405-21b50e03ae8e','21326049-102a-4225-8363-1561f1e3bd2e',5,'{\"hours\": 5, \"calcAt\": \"2025-10-17T17:49:57.312Z\", \"vatRate\": 0.16, \"packages\": [{\"subtotal\": 2200, \"packageId\": 100, \"quaintity\": 1}], \"coveredServices\": [10, 20, 40], \"remainingServices\": []}',200.00,'PENDING','2025-10-17 11:49:57','2025-10-17 12:04:57',NULL);
/*!40000 ALTER TABLE `contract_suggestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` varchar(36) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `rfc` varchar(45) DEFAULT NULL,
  `fiscal_address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('5c12183b-f8f9-4bbb-af65-bc5b0783a776','Diego Tapioca','diego@dot.com','777 564 7640','laksjkjskdj122',NULL),('68cfb66c-5074-471b-921d-05d7fae44185','Majo Alba','majoAlba@gmail.com','7771133975','MAL1214362J3',NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` varchar(36) NOT NULL,
  `customer_id` varchar(36) NOT NULL,
  `date` date DEFAULT NULL,
  `address` varchar(140) DEFAULT NULL,
  `schedule` varchar(45) DEFAULT NULL,
  `createdate` timestamp NULL DEFAULT NULL,
  `pdf_path` varchar(145) DEFAULT NULL,
  `notes` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_event_customer_idx` (`customer_id`),
  CONSTRAINT `fk_event_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES ('0f3cc84b-3bb1-4269-b99e-e846a10f5f7d','68cfb66c-5074-471b-921d-05d7fae44185','2025-10-20','AV de la luz privada  Tabachines #31',NULL,'2025-10-17 23:02:23',NULL,NULL),('21326049-102a-4225-8363-1561f1e3bd2e','68cfb66c-5074-471b-921d-05d7fae44185','2025-10-20','AV de la luz privada  Tabachines #31',NULL,'2025-10-17 17:49:57',NULL,NULL),('4b1f5c62-3379-4019-a536-b63edaa63998','5c12183b-f8f9-4bbb-af65-bc5b0783a776','2025-10-11','AV compositores fraccionamiento cumbres ',NULL,'2025-10-06 18:19:10',NULL,NULL),('7395e725-6eef-47fe-a333-3143db6bd946','68cfb66c-5074-471b-921d-05d7fae44185','2025-10-20','AV de la luz privada  Tabachines #31',NULL,'2025-09-22 18:10:08',NULL,NULL);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_packages`
--

DROP TABLE IF EXISTS `event_packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_packages` (
  `event_id` varchar(36) NOT NULL,
  `package_id` int NOT NULL,
  `id` varchar(36) NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `event_packages_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`),
  CONSTRAINT `event_packages_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_packages`
--

LOCK TABLES `event_packages` WRITE;
/*!40000 ALTER TABLE `event_packages` DISABLE KEYS */;
INSERT INTO `event_packages` VALUES ('7395e725-6eef-47fe-a333-3143db6bd946',100,'7b6ee82e-97df-11f0-a752-da812fe7e2ca',1,2200.00);
/*!40000 ALTER TABLE `event_packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_services`
--

DROP TABLE IF EXISTS `event_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_services` (
  `id` varchar(36) DEFAULT NULL,
  `event_id` varchar(36) NOT NULL,
  `services_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`event_id`,`services_id`),
  KEY `fk_event_has_services_services1_idx` (`services_id`),
  KEY `fk_event_has_services_event1_idx` (`event_id`),
  CONSTRAINT `fk_event_has_services_event1` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`),
  CONSTRAINT `fk_event_has_services_services1` FOREIGN KEY (`services_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_services`
--

LOCK TABLES `event_services` WRITE;
/*!40000 ALTER TABLE `event_services` DISABLE KEYS */;
INSERT INTO `event_services` VALUES ('b3115852-1fb5-449c-8b14-8b9c92ab4ade','0f3cc84b-3bb1-4269-b99e-e846a10f5f7d',10,1,1300.00),('28d8746e-5b4a-4786-9323-005269728381','0f3cc84b-3bb1-4269-b99e-e846a10f5f7d',20,1,600.00),('e47f3dd3-9d70-4170-ac03-62f0fa8bbea0','0f3cc84b-3bb1-4269-b99e-e846a10f5f7d',40,1,500.00),('dd1423e5-415a-4cd7-bf1f-9704d297939b','21326049-102a-4225-8363-1561f1e3bd2e',10,1,1300.00),('75b413a3-1fb5-4766-b4bf-158dd4f29695','21326049-102a-4225-8363-1561f1e3bd2e',20,1,600.00),('39b9fb0d-966c-487e-b38c-39a2d56a8e9e','21326049-102a-4225-8363-1561f1e3bd2e',40,1,500.00),('394c997d-4b51-4107-90b9-4ca99f35641a','4b1f5c62-3379-4019-a536-b63edaa63998',10,1,1300.00),('0a271a40-625a-4172-9cc3-df8e0a678c94','4b1f5c62-3379-4019-a536-b63edaa63998',20,1,600.00),('98f115ff-b43c-4b01-9444-511ec04c252c','4b1f5c62-3379-4019-a536-b63edaa63998',40,1,500.00);
/*!40000 ALTER TABLE `event_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_items`
--

DROP TABLE IF EXISTS `package_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_items` (
  `package_id` int NOT NULL,
  `service_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`package_id`,`service_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `package_items_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`),
  CONSTRAINT `package_items_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_items`
--

LOCK TABLES `package_items` WRITE;
/*!40000 ALTER TABLE `package_items` DISABLE KEYS */;
INSERT INTO `package_items` VALUES (100,10,1),(100,20,1),(100,40,1),(110,10,1),(110,40,1),(110,50,1),(110,60,1),(120,20,1),(120,40,1),(120,50,1),(120,60,1);
/*!40000 ALTER TABLE `package_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_price`
--

DROP TABLE IF EXISTS `package_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_price` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `package_id` int NOT NULL,
  `hours_min` int NOT NULL,
  `hours_max` int NOT NULL,
  `price_mxn` decimal(10,2) NOT NULL,
  `extra_hour_mxn` decimal(10,2) DEFAULT NULL,
  `active_from` date NOT NULL DEFAULT (curdate()),
  `active_to` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_package_price_lookup` (`package_id`,`hours_min`,`hours_max`,`active_from`,`active_to`),
  CONSTRAINT `package_price_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_price`
--

LOCK TABLES `package_price` WRITE;
/*!40000 ALTER TABLE `package_price` DISABLE KEYS */;
INSERT INTO `package_price` VALUES (1,100,5,6,2200.00,NULL,'2025-09-09',NULL),(2,110,5,6,1700.00,NULL,'2025-09-09',NULL),(3,120,5,6,1000.00,NULL,'2025-09-09',NULL);
/*!40000 ALTER TABLE `package_price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packages`
--

DROP TABLE IF EXISTS `packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packages` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packages`
--

LOCK TABLES `packages` WRITE;
/*!40000 ALTER TABLE `packages` DISABLE KEYS */;
INSERT INTO `packages` VALUES (100,'Paquete 1','Incluye Inflable + IBrick + Conecta 4'),(110,'Paquete 2','Inflable + 1 juego + Piso de Tatami 3x3 + Carpa para el sol'),(120,'Paquete 3','IBrick + Conecta 4 + Piso de Tatami 3x3 + Carpa para el sol');
/*!40000 ALTER TABLE `packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_price`
--

DROP TABLE IF EXISTS `service_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_price` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `service_id` int NOT NULL,
  `hours_min` int NOT NULL,
  `hours_max` int NOT NULL,
  `price_mxn` decimal(10,2) NOT NULL,
  `extra_hour_mxn` decimal(10,2) DEFAULT NULL,
  `active_from` date NOT NULL DEFAULT (curdate()),
  `active_to` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_service_price_lookup` (`service_id`,`hours_min`,`hours_max`,`active_from`,`active_to`),
  CONSTRAINT `service_price_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_price`
--

LOCK TABLES `service_price` WRITE;
/*!40000 ALTER TABLE `service_price` DISABLE KEYS */;
INSERT INTO `service_price` VALUES (1,10,4,6,1300.00,NULL,'2025-09-09',NULL),(2,20,4,6,600.00,NULL,'2025-09-09',NULL),(3,40,4,6,500.00,NULL,'2025-09-09',NULL);
/*!40000 ALTER TABLE `service_price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(140) DEFAULT NULL,
  `price_hour` int DEFAULT NULL,
  `default_min_hours` int DEFAULT NULL,
  `default_max_hours` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (10,'Inflable','Inflable 3x6 Metros',NULL,4,6),(20,'IBrick','Set de 96 Bloques con piso de tatami',NULL,4,6),(40,'Conecta 4','Juego gigante de Conecta 4',NULL,4,6),(50,'Piso de Tatami 3x3','Piso de tatami 3x3m',NULL,NULL,NULL),(60,'Carpa para el sol','Carpa para sombra',NULL,NULL,NULL);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'chavitos_club'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-17 17:46:17
