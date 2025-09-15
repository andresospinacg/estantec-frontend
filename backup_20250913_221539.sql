/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.0.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: tiendaestantec_bd
-- ------------------------------------------------------
-- Server version	12.0.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `adm_usuarios`
--

DROP TABLE IF EXISTS `adm_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `adm_usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol` enum('super_admin','manager_inventario','manager_ventas','manager_marketing') NOT NULL DEFAULT 'manager_inventario',
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_modificaci├│n` datetime DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario` (`usuario`),
  UNIQUE KEY `correo` (`correo`),
  KEY `a_d_m__usuarios_usuario` (`usuario`),
  KEY `a_d_m__usuarios_correo` (`correo`),
  KEY `a_d_m__usuarios_rol` (`rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adm_usuarios`
--

LOCK TABLES `adm_usuarios` WRITE;
/*!40000 ALTER TABLE `adm_usuarios` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `adm_usuarios` VALUES
(1,'admin_estantec','admin@estantec.com','contrase├▒a_admin','super_admin','2025-01-01 13:00:00','2025-01-01 13:00:00',1),
(2,'inventario_estantec','inventario@estantec.com','contrase├▒a_inventario','manager_inventario','2025-01-15 15:30:00','2025-01-15 15:30:00',1);
/*!40000 ALTER TABLE `adm_usuarios` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `categorias_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `categorias` VALUES
(1,'Smartphones','Tel├®fonos inteligentes de ├║ltima generaci├│n','2025-01-01 13:00:00',1),
(2,'Laptops','Computadoras port├ítiles para trabajo y gaming','2025-01-01 13:00:00',1),
(3,'Tablets','Tablets y dispositivos t├íctiles','2025-01-01 13:00:00',1);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `dispositivos`
--

DROP TABLE IF EXISTS `dispositivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispositivos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nomre` varchar(200) NOT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `id_marca` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `especificaciones` text DEFAULT NULL,
  `url_imagen` varchar(500) DEFAULT NULL,
  `imagenes_galeria` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`imagenes_galeria`)),
  `fecha_actualizacion` date DEFAULT NULL,
  `cantidad_stock` int(11) DEFAULT 0,
  `estado_activo` tinyint(1) DEFAULT 1,
  `calificacion_promedio` decimal(3,2) DEFAULT 0.00,
  `total_rese├▒as` int(11) DEFAULT 0,
  `fecha_creacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dispositivos_id_marca` (`id_marca`),
  KEY `dispositivos_id_categoria` (`id_categoria`),
  KEY `dispositivos_precio` (`precio`),
  KEY `dispositivos_estado_activo` (`estado_activo`),
  KEY `dispositivos_calificacion_promedio` (`calificacion_promedio`),
  KEY `dispositivos_fecha_actualizacion` (`fecha_actualizacion`),
  CONSTRAINT `dispositivos_ibfk_1` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `dispositivos_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivos`
--

LOCK TABLES `dispositivos` WRITE;
/*!40000 ALTER TABLE `dispositivos` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `dispositivos` VALUES
(1,'iPhone 15 Pro','15 Pro',1,1,6999.99,'El iPhone m├ís avanzado con chip A17 Pro y sistema de c├ímaras profesional.','Procesador: A17 Pro\nRAM: 8GB\nAlmacenamiento: 128GB/256GB/512GB/1TB\nPantalla: 6.1\'\' Super Retina XDR\nC├ímara: 48MP Principal + 12MP Ultra Angular + 12MP Teleobjetivo\nBater├¡a: Hasta 23 horas de video\nOS: iOS 17','https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?w=500&h=500&fit=crop','\"[\\\"https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?w=500&h=500&fit=crop\\\",\\\"https://images.unsplash.com/photo-1710023038502-ba80a70a9f53?w=500&h=500&fit=crop\\\"]\"','2024-01-15',50,1,4.80,245,'2024-01-15 15:00:00'),
(2,'MacBook Pro M3','M3 Pro',1,2,7599.99,'Potencia profesional con el revolucionario chip M3 para los creadores m├ís exigentes.','Procesador: Apple M3\nRAM: 8GB/16GB/32GB\nAlmacenamiento: 512GB/1TB/2TB SSD\nPantalla: 14\'\' Liquid Retina XDR\nGPU: Integrada de 10 n├║cleos\nBater├¡a: Hasta 18 horas\nPuertos: 3x Thunderbolt 4, HDMI, SD','https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop','\"[\\\"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop\\\",\\\"https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop\\\"]\"','2024-02-01',25,1,4.90,189,'2024-02-01 14:00:00');
/*!40000 ALTER TABLE `dispositivos` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `url_logo` varchar(500) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_modificaci├│n` datetime DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `marcas_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `marcas` VALUES
(1,'Apple','https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg','Empresa l├¡der en tecnolog├¡a con productos innovadores y dise├▒o premium','2025-01-01 13:00:00','2025-01-01 13:00:00',1),
(2,'Samsung','https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg','Empresa surcoreana l├¡der en electr├│nica de consumo y tecnolog├¡a m├│vil','2025-01-01 13:00:00','2025-01-01 13:00:00',1),
(3,'Dell','https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg','Empresa estadounidense especializada en computadoras y tecnolog├¡a empresarial','2025-01-01 13:00:00','2025-01-01 13:00:00',1),
(4,'HP','https://example.com/hp-logo.png','Empresa l├¡der en computadoras personales, impresoras y soluciones empresariales','2025-09-14 00:31:12','2025-09-14 00:31:12',0);
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `resenas`
--

DROP TABLE IF EXISTS `resenas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `resenas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_dispositivo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `calificacion` tinyint(4) NOT NULL,
  `titulo` varchar(200) DEFAULT NULL,
  `comentario` text DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_usuario_dispositivo` (`id_usuario`,`id_dispositivo`),
  KEY `resenas_id_dispositivo` (`id_dispositivo`),
  KEY `resenas_id_usuario` (`id_usuario`),
  KEY `resenas_calificacion` (`calificacion`),
  KEY `resenas_fecha_creacion` (`fecha_creacion`),
  CONSTRAINT `resenas_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivos` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `resenas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resenas`
--

LOCK TABLES `resenas` WRITE;
/*!40000 ALTER TABLE `resenas` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `resenas` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `sesiones`
--

DROP TABLE IF EXISTS `sesiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sesiones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `token_hash` varchar(255) NOT NULL,
  `tipo_usuario` enum('admin','cliente') NOT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_expiracion` datetime NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sesiones_id_usuario` (`id_usuario`),
  KEY `sesiones_token_hash` (`token_hash`),
  KEY `sesiones_fecha_expiracion` (`fecha_expiracion`),
  KEY `sesiones_activo` (`activo`),
  CONSTRAINT `sesiones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `adm_usuarios` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sesiones`
--

LOCK TABLES `sesiones` WRITE;
/*!40000 ALTER TABLE `sesiones` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `sesiones` VALUES
(1,1,'ce04680130decbb5e112d6aa31b2138299efb054769ea4f49327d400dbbe84d8','admin','2025-09-14 00:30:53','2025-09-15 00:30:53',1,'::1','curl/8.14.1'),
(2,1,'9843361ea575c3756eeccdcaf1dc0d6c6451b184dd8629c241d45d9709824fc9','admin','2025-09-14 01:27:37','2025-09-15 01:27:37',1,'::1','curl/8.14.1'),
(3,1,'33518fd397c453b16fef59f245434ce1634c505e81353c0794564aeaf369b251','admin','2025-09-14 01:39:14','2025-09-15 01:39:14',1,'::1','PostmanRuntime/7.46.0'),
(4,1,'41c288db1359278b560449b983840c48ddb35bb9ebd8cddeb61ccd888ba8f778','admin','2025-09-14 01:41:47','2025-09-15 01:41:47',1,'::1','PostmanRuntime/7.46.0'),
(5,1,'e99b8dd5db5c5e7d90f3ea91c3faf78024eaa716d4deea52596f5fcef6a439a2','admin','2025-09-14 01:45:09','2025-09-15 01:45:09',1,'::1','PostmanRuntime/7.46.0'),
(6,1,'0569b8072e090432978aeb87b70ec341644d69a59d1ef7000a3d9e36d20aaaac','admin','2025-09-14 01:48:48','2025-09-15 01:48:48',1,'::1','PostmanRuntime/7.46.0'),
(7,1,'792f34bc4b908ad0ba6c5859ce636a6fbda8239b9970f3b787112c5a64573ffc','admin','2025-09-14 01:58:03','2025-09-15 01:58:03',1,'::1','PostmanRuntime/7.46.0'),
(8,1,'dfba2122f28a8729cb376094757686b9f28a8f871d79f257b75ec4fed6259217','admin','2025-09-14 02:00:44','2025-09-15 02:00:44',1,'::1','curl/8.14.1'),
(9,1,'538b66f5c226393b0d7a41f05189700b4abbe564ddc9299c2128d25228faa31f','admin','2025-09-14 02:06:17','2025-09-15 02:06:17',1,'::1','PostmanRuntime/7.46.0'),
(10,1,'155abf45b23d2292da7adaed79a62c64c69dc89b736110ce01c4e7c7fabe2bf1','admin','2025-09-14 02:08:28','2025-09-15 02:08:28',1,'::1','curl/8.14.1'),
(11,1,'260f8b55c294fcd05e8ae8ae16b9b0928add1c1dac01e6e7e7b9a2c218fabf44','admin','2025-09-14 02:10:09','2025-09-15 02:10:09',1,'::1','curl/8.14.1'),
(12,1,'c06d842f33495235960c2a2d17c702f3a80bb79c4268ca19becf2c6b0220efb0','admin','2025-09-14 02:13:27','2025-09-15 02:13:27',1,'::1','curl/8.14.1'),
(13,1,'7a4115e6de80fcd5dbfca6e21955773c44b14d51f1970db663322011add2fe9a','admin','2025-09-14 02:14:06','2025-09-15 02:14:06',1,'::1','curl/8.14.1'),
(14,1,'8143786a610c9c618ca39b681262fa0b3e46ff13340b054ea048b66e1e688016','admin','2025-09-14 02:14:56','2025-09-15 02:14:56',1,'::1','curl/8.14.1'),
(15,1,'e5f0cac6c5e7821ed17f8be613bb764d951b65f968f9250e6ef492f980a6a137','admin','2025-09-14 02:15:51','2025-09-15 02:15:51',1,'::1','curl/8.14.1'),
(16,1,'0a2b4c943b7168c638d80296a091f79011151d91610556bbfe4f5698aa8e6f17','admin','2025-09-14 02:30:38','2025-09-15 02:30:38',1,'::1','PostmanRuntime/7.46.0'),
(17,1,'8283951c89570f265a51d50092ad8c72c4b46e969bb02dfa55af0354e541408f','admin','2025-09-14 02:37:22','2025-09-15 02:37:22',1,'::1','PostmanRuntime/7.46.0'),
(18,1,'8064f52841cc777196fdb67dffb3b1df685ec05773be9a384ed45f2a2b651c54','admin','2025-09-14 02:41:14','2025-09-15 02:41:14',1,'::1','PostmanRuntime/7.46.0');
/*!40000 ALTER TABLE `sesiones` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrase├▒a` varchar(255) NOT NULL,
  `nombre_completo` varchar(150) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario` (`usuario`),
  UNIQUE KEY `correo` (`correo`),
  KEY `usuarios_usuario` (`usuario`),
  KEY `usuarios_correo` (`correo`),
  KEY `usuarios_nombre_completo` (`nombre_completo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `usuarios` VALUES
(1,'usuario1','usuario1@example.com','$2b$12$8BGPdKqJSB.oUdGUHZ4IfeNCUA./.2NtNKcQKZRI.hqVY.o4jT/7u','Juan P├®rez','+57 300 123 4567','2025-01-20 17:00:00',1),
(2,'usuario2','usuario2@example.com','$2b$12$GMjpAcbgRwzOlcCLN61vYOQg9tGwRgc/01MLRa6VAyohE6Sfg6PTO','Mar├¡a Garc├¡a','+57 301 987 6543','2025-01-25 19:30:00',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Dumping events for database 'tiendaestantec_bd'
--

--
-- Dumping routines for database 'tiendaestantec_bd'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-09-13 22:15:44
