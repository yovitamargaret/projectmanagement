-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: db_projectmanagement
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_m_employee`
--

DROP TABLE IF EXISTS `tb_m_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_m_employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `team_id` int DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `FK_TEAM_idx` (`team_id`),
  CONSTRAINT `FK_TEAM` FOREIGN KEY (`team_id`) REFERENCES `tb_m_team` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_m_employee`
--

LOCK TABLES `tb_m_employee` WRITE;
/*!40000 ALTER TABLE `tb_m_employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_m_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_m_role`
--

DROP TABLE IF EXISTS `tb_m_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_m_role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `level` int NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_m_role`
--

LOCK TABLES `tb_m_role` WRITE;
/*!40000 ALTER TABLE `tb_m_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_m_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_m_team`
--

DROP TABLE IF EXISTS `tb_m_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_m_team` (
  `team_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `team_member_number` int NOT NULL,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_m_team`
--

LOCK TABLES `tb_m_team` WRITE;
/*!40000 ALTER TABLE `tb_m_team` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_m_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_m_user`
--

DROP TABLE IF EXISTS `tb_m_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_m_user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(70) NOT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK_ROLE_idx` (`role_id`),
  CONSTRAINT `FK_ROLE` FOREIGN KEY (`role_id`) REFERENCES `tb_m_role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_m_user`
--

LOCK TABLES `tb_m_user` WRITE;
/*!40000 ALTER TABLE `tb_m_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_m_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_tr_project`
--

DROP TABLE IF EXISTS `tb_tr_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_tr_project` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `start_date` datetime NOT NULL,
  `due_date` datetime NOT NULL,
  `project_approval_status` enum('Approved','Pending','Rejected') NOT NULL,
  `approval_date` datetime NOT NULL,
  `project_status` enum('Not Started','Ongoing','Done','Bug') NOT NULL,
  `team_id` int DEFAULT NULL,
  PRIMARY KEY (`project_id`),
  KEY `FK_TEAM_idx` (`team_id`),
  CONSTRAINT `FK_PROJECTTEAM` FOREIGN KEY (`team_id`) REFERENCES `tb_m_team` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_tr_project`
--

LOCK TABLES `tb_tr_project` WRITE;
/*!40000 ALTER TABLE `tb_tr_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_tr_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_tr_task`
--

DROP TABLE IF EXISTS `tb_tr_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_tr_task` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `task_approval_status` enum('Approved','Pending','Rejected') DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `FK_TASKPROJECT_idx` (`project_id`),
  CONSTRAINT `FK_TASKPROJECT` FOREIGN KEY (`project_id`) REFERENCES `tb_tr_project` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_tr_task`
--

LOCK TABLES `tb_tr_task` WRITE;
/*!40000 ALTER TABLE `tb_tr_task` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_tr_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_tr_taskdetail`
--

DROP TABLE IF EXISTS `tb_tr_taskdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_tr_taskdetail` (
  `task_detail_id` int NOT NULL AUTO_INCREMENT,
  `task_id` int DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `task_status` enum('Not Started','Ongoing','Done','Bug') DEFAULT NULL,
  PRIMARY KEY (`task_detail_id`),
  KEY `FK_TASKTASKDETAIL_idx` (`task_id`),
  KEY `FK_EMPLOYEE_idx` (`employee_id`),
  CONSTRAINT `FK_EMPLOYEE` FOREIGN KEY (`employee_id`) REFERENCES `tb_m_employee` (`employee_id`),
  CONSTRAINT `FK_TASKTASKDETAIL` FOREIGN KEY (`task_id`) REFERENCES `tb_tr_task` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_tr_taskdetail`
--

LOCK TABLES `tb_tr_taskdetail` WRITE;
/*!40000 ALTER TABLE `tb_tr_taskdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_tr_taskdetail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-22 11:45:40
