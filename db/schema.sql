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
-- Table structure for table `bookmarks`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmarks` (
  `bookmark_id` int NOT NULL AUTO_INCREMENT,
  `talkie_fk` int NOT NULL,
  `user_fk` int NOT NULL,
  PRIMARY KEY (`bookmark_id`),
  KEY `talkie_fk` (`talkie_fk`),
  KEY `user_fk` (`user_fk`),
  CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`talkie_fk`) REFERENCES `small_talkies` (`talkie_id`),
  CONSTRAINT `bookmarks_ibfk_2` FOREIGN KEY (`user_fk`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `encounter_category`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `encounter_category` (
  `encounter_id` int NOT NULL AUTO_INCREMENT,
  `encounter` varchar(50) NOT NULL,
  `encounter_emoji` varchar(60) DEFAULT NULL,
  `situation_fk` int NOT NULL,
  PRIMARY KEY (`encounter_id`),
  KEY `situation_fk` (`situation_fk`),
  CONSTRAINT `encounter_category_ibfk_1` FOREIGN KEY (`situation_fk`) REFERENCES `situation_category` (`situation_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `encounter_talkie`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `encounter_talkie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `encounter_fk` int NOT NULL,
  `talkie_fk` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `encounter_fk` (`encounter_fk`),
  KEY `talkie_fk` (`talkie_fk`),
  CONSTRAINT `encounter_talkie_ibfk_1` FOREIGN KEY (`encounter_fk`) REFERENCES `encounter_category` (`encounter_id`),
  CONSTRAINT `encounter_talkie_ibfk_2` FOREIGN KEY (`talkie_fk`) REFERENCES `small_talkies` (`talkie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `schema_migrations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(128) NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `situation_category`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `situation_category` (
  `situation_id` int NOT NULL AUTO_INCREMENT,
  `situation` varchar(40) NOT NULL,
  `situation_emoji` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`situation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `small_talkies`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `small_talkies` (
  `talkie_id` int NOT NULL AUTO_INCREMENT,
  `talkie` varchar(100) NOT NULL,
  PRIMARY KEY (`talkie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `topic_category`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_category` (
  `topic_id` int NOT NULL AUTO_INCREMENT,
  `topic` varchar(40) NOT NULL,
  `topic_emoji` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`topic_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `topic_talk`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_talk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topic_fk` int NOT NULL,
  `talkie_fk` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `topic_fk` (`topic_fk`),
  KEY `talkie_fk` (`talkie_fk`),
  CONSTRAINT `topic_talk_ibfk_1` FOREIGN KEY (`topic_fk`) REFERENCES `topic_category` (`topic_id`),
  CONSTRAINT `topic_talk_ibfk_2` FOREIGN KEY (`talkie_fk`) REFERENCES `small_talkies` (`talkie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_interest`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_interest` (
  `interest_id` int NOT NULL AUTO_INCREMENT,
  `topic_fk` int NOT NULL,
  `user_fk` int NOT NULL,
  PRIMARY KEY (`interest_id`),
  KEY `topic_fk` (`topic_fk`),
  KEY `user_fk` (`user_fk`),
  CONSTRAINT `user_interest_ibfk_1` FOREIGN KEY (`topic_fk`) REFERENCES `topic_category` (`topic_id`),
  CONSTRAINT `user_interest_ibfk_2` FOREIGN KEY (`user_fk`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `kakao_client` varchar(100) NOT NULL,
  `nickname` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `darkmode` tinyint(1) NOT NULL DEFAULT '0',
  `profile_image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `nickname` (`nickname`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'small_talkie'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed

--
-- Dbmate schema migrations
--

LOCK TABLES `schema_migrations` WRITE;
INSERT INTO `schema_migrations` (version) VALUES
  ('20230612082600'),
  ('20230612082615'),
  ('20230612082626'),
  ('20230612082635'),
  ('20230612082642'),
  ('20230612082751'),
  ('20230612082754'),
  ('20230612082810'),
  ('20230612082824'),
  ('20230714065552'),
  ('20230719085253');
UNLOCK TABLES;
