-- MySQL dump 10.13  Distrib 8.2.0, for Win64 (x86_64)
--
-- Host: localhost    Database: small_talkie
-- ------------------------------------------------------
-- Server version	8.2.0

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

DROP TABLE IF EXISTS `bookmarks`;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmarks`
--

LOCK TABLES `bookmarks` WRITE;
/*!40000 ALTER TABLE `bookmarks` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encounter_category`
--

DROP TABLE IF EXISTS `encounter_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `encounter_category` (
  `encounter_id` int NOT NULL AUTO_INCREMENT,
  `encounter` varchar(50) CHARACTER SET utf8mb3 NOT NULL,
  `encounter_emoji` varchar(60) CHARACTER SET utf8mb3 DEFAULT NULL,
  `situation_fk` int NOT NULL,
  PRIMARY KEY (`encounter_id`),
  KEY `situation_fk` (`situation_fk`),
  CONSTRAINT `encounter_category_ibfk_1` FOREIGN KEY (`situation_fk`) REFERENCES `situation_category` (`situation_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encounter_category`
--

LOCK TABLES `encounter_category` WRITE;
/*!40000 ALTER TABLE `encounter_category` DISABLE KEYS */;
INSERT INTO `encounter_category` VALUES (1,'?닿?',NULL,1),(2,'?좎뵪',NULL,1),(3,'?먯떖?쒓컙',NULL,1),(4,'?뚭컻??,NULL,2),(5,'沅뚰깭湲?,NULL,2),(6,'?숈갹??,NULL,3),(7,'??紐⑤Ⅴ??吏묒븞 ?대Ⅴ?좉낵??',NULL,4),(8,'?ㅻ옯?숈븞 紐?蹂?移쒖쿃?먭쾶',NULL,4);
/*!40000 ALTER TABLE `encounter_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encounter_talkie`
--

DROP TABLE IF EXISTS `encounter_talkie`;
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
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encounter_talkie`
--

LOCK TABLES `encounter_talkie` WRITE;
/*!40000 ALTER TABLE `encounter_talkie` DISABLE KEYS */;
INSERT INTO `encounter_talkie` VALUES (1,4,1),(2,3,2),(3,3,3),(4,4,4),(5,4,5),(6,4,6),(7,3,7),(8,3,8),(9,3,9),(10,4,10),(11,4,11),(12,4,12),(13,4,13),(14,4,14),(15,2,15),(16,2,16),(17,2,17),(18,2,18),(19,2,19),(20,2,20),(21,2,21),(22,2,22),(23,2,23),(24,2,24),(25,4,25),(26,4,26),(27,4,27),(28,4,28),(29,4,29),(30,4,30),(31,3,31),(32,3,32),(33,3,33),(34,3,34),(35,1,35),(36,1,36),(37,1,37),(38,1,38),(39,1,39),(40,1,40),(41,1,41),(42,1,42),(43,1,43),(44,1,44),(45,6,45),(46,3,46),(47,3,52),(48,3,56),(49,4,57),(50,4,58),(51,4,59),(52,4,60),(53,4,61),(54,4,62),(55,3,63),(56,3,64),(57,4,71),(58,4,72),(59,4,73),(60,4,74),(61,4,75);
/*!40000 ALTER TABLE `encounter_talkie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `situation_category`
--

DROP TABLE IF EXISTS `situation_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `situation_category` (
  `situation_id` int NOT NULL AUTO_INCREMENT,
  `situation` varchar(40) CHARACTER SET utf8mb3 NOT NULL,
  `situation_emoji` varchar(60) CHARACTER SET utf8mb3 DEFAULT NULL,
  PRIMARY KEY (`situation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `situation_category`
--

LOCK TABLES `situation_category` WRITE;
/*!40000 ALTER TABLE `situation_category` DISABLE KEYS */;
INSERT INTO `situation_category` VALUES (1,'?뚯궗?먯꽌',NULL),(2,'?곗븷',NULL),(3,'紐⑥엫',NULL),(4,'移쒖쿃, 媛議?,NULL);
/*!40000 ALTER TABLE `situation_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `small_talkies`
--

DROP TABLE IF EXISTS `small_talkies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `small_talkies` (
  `talkie_id` int NOT NULL AUTO_INCREMENT,
  `talkie` varchar(100) CHARACTER SET utf8mb3 NOT NULL,
  PRIMARY KEY (`talkie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `small_talkies`
--

LOCK TABLES `small_talkies` WRITE;
/*!40000 ALTER TABLE `small_talkies` DISABLE KEYS */;
INSERT INTO `small_talkies` VALUES (1,'理쒓렐???대뼡 ?쇱쓣 ?섍퀬 怨꾩떊媛??'),(2,'?붿쬁 愿??媛吏怨??덈뒗 ?쇱씠??痍⑤???臾댁뾿?멸???'),(3,'媛議? & 移쒓뎄?ㅺ낵 理쒓렐???④퍡??利먭굅???쇱씠 ?덈굹??'),(4,'理쒓렐??蹂??곹솕???쒕씪留?& 梨?以묒뿉??異붿쿇??留뚰븳 ?묓뭹???덈굹??'),(5,'媛??湲곗뼲???⑤뒗 ?ы뻾 寃쏀뿕? ?대뼡 寃껋씠?덈굹??'),(6,'理쒓렐???덈줈???щ엺??留뚮굹寃????곸씠 ?덈굹?? ?대뼡 ?щ엺?댁뿀?섏슂?'),(7,'理쒓렐??諛곗슫 寃껋씠???덈∼寃??쒖옉???쇱씠 ?덈굹??'),(8,'?쇱긽?먯꽌 ?밸퀎??湲곕텇 醫뗭? ?쒓컙???덉뿀?섏슂?'),(9,'理쒓렐???ㅽ듃?덉뒪瑜?諛쏄굅???대젮???寃れ? ?쇱씠 ?덉뿀?섏슂? ?대뼸寃?洹밸났?덈굹??'),(10,'?됱냼???먯＜ ?ｋ뒗 ?뚯븙?대굹 ?잛틦?ㅽ듃媛 ?덈굹?? 異붿쿇?댁＜?몄슂.'),(11,'?붿쬁?먮뒗 ?대뼡 ?듦????좉꼍?곌퀬 ?덈굹??'),(12,'理쒓렐??留쏆엳寃?癒뱀? ?뚯떇?대굹 移댄럹媛 ?덈굹?? 異붿쿇?댁＜?몄슂.'),(13,'媛??媛源뚯슫 移쒓뎄?ㅺ낵 ?대뼡 ?쇱쓣 媛숈씠 ?섎㈃???щ??덇쾶 ??섎굹??'),(14,'?욎쑝濡??대뼡 怨꾪쉷???덈굹?? 臾댁뾿???섍퀬 ?띠?吏 & 臾댁뾿??異붽뎄?섍퀬 ?띠?吏 ?깆쓣 ?댁빞湲고빐蹂댁꽭??'),(15,'?ㅻ뒛 ?좎뵪媛 ?대븣??'),(16,'媛??醫뗭븘?섎뒗 ?좎뵪??臾댁뾿?멸???'),(17,'怨꾩젅蹂꾨줈 ?대뼡 ?좎뵪媛 ?몄븞?쒓???'),(18,'?щ쫫泥?臾대뜑???좎뵪瑜??닿꺼?대뒗 諛⑸쾿? 臾댁뾿?멸???'),(19,'異붿슫 寃⑥슱?먮뒗 ?대뼡 ?룹쓣 ?낆뼱???좉퉴??'),(20,'?덉씠 ?대┛?ㅻ㈃ 臾댁뾿???섏떆?섏슂?'),(21,'鍮꾧? ?ㅻ뒗 ?좎뵪 醫뗭븘?섏꽭??'),(22,'?뉖퀡??醫뗭? ?좎뵪?먮뒗 ?대뼡 ?≫떚鍮꾪떚瑜?異붿쿇?섏떆?섏슂?'),(23,'?좎뵪媛 醫뗭쓣 ??媛??醫뗭븘?섎뒗 ?쇱쇅?쒕룞? 臾댁뾿?멸???'),(24,'?좎뵪???곕씪 湲곕텇???щ씪吏?섏슂?'),(25,'媛???щ??덇쾶 ?뚮젅?댄븳 寃뚯엫? 臾댁뾿?멸???'),(26,'?대뼡 寃뚯엫???먯＜ ?뚮젅?댄븯?섏슂?'),(27,'寃뚯엫???뚮젅?댄븷 ???좏샇?섎뒗 ?λⅤ??臾댁뾿?멸???'),(28,'寃뚯엫?먯꽌 媛??醫뗭븘?섎뒗 湲곕뒫?대굹 ?붿냼??臾댁뾿?멸???'),(29,'?щ윭遺꾩쓽 紐⑤컮??寃뚯엫 異붿쿇? 臾댁뾿?멸???'),(30,'濡ㅽ넗泥댁뒪 醫뗭븘?섏꽭?? (?닿? ?섎뒗 寃뚯엫)'),(31,'媛??醫뗭븘?섎뒗 ?뚯떇? 臾댁뾿?멸???'),(32,'?덈줈???뚯떇???쒕룄??蹂??곸씠 ?덈굹?? ?대뼡 ?뚯떇?댁뿀?섏슂? 留쏆? ?대븷?섏슂?'),(33,'媛??醫뗭븘?섎뒗 ?뚯떇?먯? ?대뵒?멸??? 洹멸납?먯꽌 異붿쿇?섎뒗 硫붾돱??臾댁뾿?멸???'),(34,'紐?癒밸뒗 ?앹옱猷뚮굹 ?뚯떇 ?덉뼱??'),(35,'?ы뻾 ?ㅽ??쇱씠 ?대뼸寃??섏꽭??'),(36,'?쇱옄 VS ?④퍡'),(37,'?먯쑀 ?ы뻾VS 媛?대뱶 ?ъ뼱?'),(38,'媛??醫뗭븘?섎뒗 ?ы뻾吏???대뵒?멸??? 洹멸납?먯꽌 媛??醫뗭븯??寃쏀뿕? 臾댁뾿?댁뿀?섏슂?'),(39,'?쇱옄 ?ы뻾??媛蹂댁떊 ?곸씠 ?덈굹?? ?대뼡 寃쏀뿕?댁뿀?섏슂?'),(40,'媛議깃낵 ?④퍡 ?ы뻾??媛蹂댁떊 ?곸씠 ?덈굹?? ?대뼡 怨녹쑝濡?媛붾굹??'),(41,'?댁쇅 ?ы뻾??媛蹂댁떊 ?곸씠 ?덈굹?? ?대뒓 ?섎씪瑜?諛⑸Ц?덈굹??'),(42,'?ы뻾 以?媛??湲곗뼲???⑤뒗 ?쇱? 臾댁뾿?멸???'),(43,'?ы뻾吏?먯꽌 ?볦튂吏 紐삵븷 寃껋? 臾댁뾿?멸??? ?밸퀎???됱궗 & ?뱀궛??& 愿愿묐챸??& ?뚯떇 & ?쇳븨 & ?댁떇'),(44,'?ㅼ쓬??媛蹂닿퀬 ?띠? ?ы뻾吏???대뵒?멸??? 洹멸납?먯꽌 ?섍퀬 ?띠? 寃껋? 臾댁뾿?멸???'),(45,'?ы뻾 以?媛??醫뗭븘?섎뒗 ?ъ쭊 ???μ쓣 蹂댁뿬二쇱꽭?? 洹??ъ쭊???닿릿 ?댁빞湲곕뒗 臾댁뾿?멸???'),(46,'?대뼡 醫낅쪟???대룞??醫뗭븘?섎굹??'),(47,'?대룞???쒖옉??怨꾧린媛 臾댁뾿?댁뿀?섏슂?'),(48,'?대룞?섎뒗 ?숈븞??媛??以묒슂?섍쾶 ?앷컖?섎뒗 寃껋? 臾댁뾿?멸???'),(49,'?대룞???섍린 ?꾩뿉 以鍮꾪븯??寃껋씠 ?덈굹??'),(50,'?대룞???섎㈃???살? 媛????蹂?붾뒗 臾댁뾿?멸???'),(51,'?꾩옱 紐⑺몴濡??쇨퀬 ?덈뒗 ?대룞 紐⑺몴??臾댁뾿?멸???'),(52,'媛???섎뱾寃??먭펷???대룞? 臾댁뾿?댁뿀?섏슂?'),(53,'?대룞 ?쒓컙????몄젣?멸??? ?꾩묠???대룞?섎뒗 寃껋씠 醫뗭? 寃?媛숇굹??'),(54,'?대룞???섎㈃???ｋ뒗 ?뚯븙? 臾댁뾿?멸???'),(55,'?대룞???섎㈃??嫄닿컯 ?앹뒿愿???좎??섎뒗 諛⑸쾿? 臾댁뾿?멸???'),(56,'?쇰쭏???먯＜ ?대룞 ?섏꽭??'),(57,'Mbti媛 ?대뼸寃??섏꽭??'),(58,'MBTI ?좏삎 寃곌낵瑜?泥섏쓬 ?뚭쾶 ?섏뿀?????대뼡 媛먯젙???먭펷?섏슂?'),(59,'MBTI ?좏삎 寃곌낵媛 ?뱀떊???몄깮?대굹 吏곸옣?먯꽌 ?대뼡 ?곹뼢??誘몄튂?붿? ?앷컖?대뇬?섏슂?'),(60,'?뱀떊??MBTI ?좏삎怨?鍮꾩듂???щ엺?ㅺ낵 ?대뼸寃?吏?댁떆?섏슂? ?쒕줈???깃꺽???대뼸寃??ㅻⅤ嫄곕굹 鍮꾩듂?쒖? ?먮겮?쒕굹??'),(61,'MBTI ?좏삎???뱀떊??媛뺤젏?대굹 ?쎌젏???섑??대뒗 ?곗뿉 ?꾩????섎뒗吏 ?대뼸寃??앷컖?섏떆?섏슂?'),(62,'?뱀떊???뚭퀬 ?덈뒗 ?щ엺??以묒뿉??MBTI ?좏삎 寃곌낵媛 ?덉긽怨??ㅻⅨ 寃쎌슦媛 ?덈굹?? ?댁뿉 ????대뼸寃??앷컖?섏떆?섏슂?'),(63,'?뱀떊??醫뗭븘?섎뒗 ?곗삁?몄씠???몃Ъ??以묒뿉??MBTI ?좏삎 寃곌낵媛 鍮꾩듂???щ엺???덈뒗吏 ?뚭퀬 ?덈굹??'),(64,'MBTI ?좏삎???좊?濡??대뼡 醫낅쪟??吏곸뾽?대굹 痍⑤?媛 ??留욎쓣 寃?媛숈?吏 ?앷컖?대낯 ?곸씠 ?덈굹??'),(65,'MBTI ?좏삎??湲곕컲?쇰줈 ??而ㅻ??덊떚???ъ씠???깆쓣 ?뚭퀬 ?덈굹??'),(66,'MBTI ?좏삎 寃곌낵媛 ?뱀떊???ㅼ젣 ?깃꺽怨??쇱튂?섏? ?딅뒗 寃쎌슦媛 ?덈굹?? ?댁뿉 ????대뼸寃??앷컖?섏떆?섏슂?'),(67,'MBTI ?좏삎???뱀떊?먭쾶 ?먯븘?깆같???꾩?二쇰뒗 ?곗뿉 ?꾩????섎뒗吏 ?대뼸寃??앷컖?섏떆?섏슂?'),(68,'MBTI ?좏삎???쒖슜?섏뿬 愿怨꾨? 媛쒖꽑?섎뒗 諛⑸쾿?대굹 ?곸씠 ?덈굹??'),(69,'MBTI ?좏삎 寃곌낵媛 ?대뼡 臾몄젣瑜?諛쒖깮?쒗궎嫄곕굹 ?쇰????????덈떎???댁빞湲곕? ?ㅼ뼱蹂댁븯????& ?댁뿉 ??댁꽌 ?대뼸寃??앷컖?섏떆?섏슂?'),(70,'MBTI ?좏삎 寃곌낵瑜??대뼡 諛⑹떇?쇰줈 ?쒖슜?섍퀬 ?덈뒗吏 & ?뱀? ?쒖슜?섍퀬 ?띠?吏 ?앷컖?대낫?섎굹??'),(71,'而ㅽ뵾 醫뗭븘?섏꽭??'),(72,'而ㅽ뵾瑜??몄젣遺??醫뗭븘?섍쾶 ?섏뿀?섏슂?'),(73,'?쇱긽?앺솢?먯꽌 而ㅽ뵾瑜?留덉떆???댁쑀??臾댁뾿?멸???'),(74,'媛??醫뗭븘?섎뒗 而ㅽ뵾 醫낅쪟??臾댁뾿?멸???'),(75,'而ㅽ뵾瑜?留덉떆??媛??醫뗭? ?쒓컙? ?몄젣?멸???'),(76,'而ㅽ뵾瑜?留덉떎 ???ㅽ깢怨?釉붾옓?쇰줈 留덉떆??寃?以??대뼡 寃껋쓣 ?좏샇?섎굹??'),(77,'而ㅽ뵾媛 ?뱁엳 留쏆엳??移댄럹媛 ?덉뿀?섏슂? ?대뵒?멸???'),(78,'?대뼡 而ㅽ뵾 釉뚮옖??醫뗭븘?섏꽭?? 洹??댁쑀??臾댁뾿?멸???'),(79,'?대뼡 而ㅽ뵾 留쏆쓣 醫뗭븘?섎굹?? ?쇱씠??& 誘몃뵒? & ?뱀? ?ㅽ겕 濡쒖뒪????'),(80,'而ㅽ뵾瑜?留덉떆硫댁꽌 醫뗭븘?섎뒗 ?뚯떇? 臾댁뾿?멸???'),(81,'媛??湲곗뼲???⑤뒗 而ㅽ뵾 寃쏀뿕? ?대뼡 寃껋씤媛??'),(82,'?쇱뒪??而щ윭 ?뚯뒪??諛쏆븘蹂????덉쑝?몄슂?');
/*!40000 ALTER TABLE `small_talkies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_category`
--

DROP TABLE IF EXISTS `topic_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_category` (
  `topic_id` int NOT NULL AUTO_INCREMENT,
  `topic` varchar(40) CHARACTER SET utf8mb3 NOT NULL,
  `topic_emoji` varchar(60) CHARACTER SET utf8mb3 DEFAULT NULL,
  PRIMARY KEY (`topic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_category`
--

LOCK TABLES `topic_category` WRITE;
/*!40000 ALTER TABLE `topic_category` DISABLE KEYS */;
INSERT INTO `topic_category` VALUES (1,'洹쇳솴',NULL),(2,'?좎뵪',NULL),(3,'寃뚯엫',NULL),(4,'?뚯떇',NULL),(5,'?ы뻾',NULL),(6,'?대룞',NULL),(7,'MBTI',NULL),(8,'而ㅽ뵾',NULL),(9,'酉고떚',NULL);
/*!40000 ALTER TABLE `topic_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_talk`
--

DROP TABLE IF EXISTS `topic_talk`;
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
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_talk`
--

LOCK TABLES `topic_talk` WRITE;
/*!40000 ALTER TABLE `topic_talk` DISABLE KEYS */;
INSERT INTO `topic_talk` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11),(12,1,12),(13,1,13),(14,1,14),(15,2,15),(16,2,16),(17,2,17),(18,2,18),(19,2,19),(20,2,20),(21,2,21),(22,2,22),(23,2,23),(24,2,24),(25,3,25),(26,3,26),(27,3,27),(28,3,28),(29,3,29),(30,3,30),(31,4,31),(32,4,32),(33,4,33),(34,4,34),(35,5,35),(36,5,36),(37,5,37),(38,5,38),(39,5,39),(40,5,40),(41,5,41),(42,5,42),(43,5,43),(44,5,44),(45,5,45),(46,6,46),(47,6,47),(48,6,48),(49,6,49),(50,6,50),(51,6,51),(52,6,52),(53,6,53),(54,6,54),(55,6,55),(56,6,56),(57,7,57),(58,7,58),(59,7,59),(60,7,60),(61,7,61),(62,7,62),(63,7,63),(64,7,64),(65,7,65),(66,7,66),(67,7,67),(68,7,68),(69,7,69),(70,7,70),(71,8,71),(72,8,72),(73,8,73),(74,8,74),(75,8,75),(76,8,76),(77,8,77),(78,8,78),(79,8,79),(80,8,80),(81,8,81),(82,9,82);
/*!40000 ALTER TABLE `topic_talk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_interest`
--

DROP TABLE IF EXISTS `user_interest`;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_interest`
--

LOCK TABLES `user_interest` WRITE;
/*!40000 ALTER TABLE `user_interest` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `kakao_client` varchar(100) NOT NULL,
  `nickname` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `nickname` (`nickname`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-07 10:12:16
