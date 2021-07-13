DROP TABLE IF EXISTS tera.usuarios;

CREATE TABLE `tera`.`usuarios` ( 
	`idlogin` INT(11) NOT NULL AUTO_INCREMENT , 
	`usuario` VARCHAR(50) NOT NULL , 
	`password` VARCHAR(50) NOT NULL, 
	`nombre` VARCHAR(50) NOT NULL , 
	`apellido` VARCHAR(50) NOT NULL , 
	`iniciales` VARCHAR(5) NOT NULL , 
	`tipo_usuario` INT(5) NOT NULL,
	PRIMARY KEY (`idlogin`),
	INDEX (`idlogin`)
) ENGINE = ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `usuarios` (`idlogin`, `usuario`, `password`, `nombre`, `apellido`, `iniciales`, `tipo_usuario`) 
VALUES 
(NULL, 'Juan', '123', 'Juan Fco', 'Prieto', 'JFPG', '1'),
(NULL, 'Sergio', '123', 'Sergio', 'Cuellar', 'SACD', '2'), 
(NULL, 'Edgar', '123', 'Edgar', 'Luna', 'ELH', '2'),
(NULL, 'Pablo', '123', 'Pablo', 'Chavez', 'JPCH', '2'),
(NULL, 'Marlo', '123', 'Marlo', 'Medina', 'MIML', '2');

UPDATE `usuarios` SET `password` = SHA1('123') WHERE `usuarios`.`idlogin` = 1;
UPDATE `usuarios` SET `password` = SHA1('123') WHERE `usuarios`.`idlogin` = 2;
UPDATE `usuarios` SET `password` = SHA1('123') WHERE `usuarios`.`idlogin` = 3;
UPDATE `usuarios` SET `password` = SHA1('123') WHERE `usuarios`.`idlogin` = 4;
UPDATE `usuarios` SET `password` = SHA1('123') WHERE `usuarios`.`idlogin` = 5;




DROP TABLE IF EXISTS tera.ot;

CREATE TABLE `tera`.`ot` ( 
	`id` INT(11) NOT NULL AUTO_INCREMENT , 
	`codigo_sai` VARCHAR(10) NOT NULL , 
	`area` VARCHAR(50) NOT NULL, 
	`descripcion_ot` TEXT NOT NULL , 
	`creado_el` TIMESTAMP NOT NULL , 
	`nombre_estatus_ot` VARCHAR(50) NOT NULL , 
	`usuario` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`id`),
	INDEX (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `ot` (`id`, `codigo_sai`, `area`, `descripcion_ot`, `creado_el`, `nombre_estatus_ot`, `usuario`) 

VALUES (NULL, '205657', '2', 'Instalacion regadera piloto', current_timestamp(), '1', '2'),
(NULL, '205565', '2', 'Reparacion techo piloto', current_timestamp(), '1', '3'),
(NULL, '204607', '1', 'Instalacion regadera Laboratorio', current_timestamp(), '1', '3'),
(NULL, '205669', '1', 'Instalacion de techo en cuarto de gases', current_timestamp(), '1', '2'),
(NULL, '205665', '2', 'Señaletica de tuberia externa', current_timestamp(), '1', '2');


DROP TABLE IF EXISTS tera.areas;

CREATE TABLE `tera`.`areas` ( 
	`id` INT(11) NOT NULL AUTO_INCREMENT , 
	`nombre_area` VARCHAR(50) NOT NULL , 
	PRIMARY KEY (`id`),
	INDEX (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `areas` (`id`, `nombre_area`) 
VALUES (NULL, 'Lab Investigación'),
(NULL, 'Planta Piloto'),
(NULL, 'Lab Calidad'),
(NULL, 'Oficinas Investigación');

DROP TABLE IF EXISTS tera.tareas;

CREATE TABLE `tera`.`tareas` ( 
	`id` INT(11) NOT NULL AUTO_INCREMENT , 
	`usr` VARCHAR(50) NOT NULL , 
	`tarea` TEXT NOT NULL, 
	`creado_el` TIMESTAMP NOT NULL , 
	`estatus_tarea` VARCHAR(50) NOT NULL , 
	`observaciones` TEXT NULL , 
	PRIMARY KEY (`id`),
	INDEX (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `tareas` (`id`, `usr`, `tarea`, `creado_el`, `estatus_tarea`, `observaciones`) 
VALUES 
(NULL, '2', 'Checklist de seguridad', NULL, '1', ''),
(NULL, '4', 'Tarea de Pablo', NULL, '1', ''),
(NULL, '3', 'Tarea de Edgar', NULL, '3', ''),
(NULL, '5', 'Tarea de Marlo', NULL, '2', '');

DROP TABLE IF EXISTS tera.estatus;

CREATE TABLE `tera`.`estatus` ( 
	`id` INT(11) NOT NULL AUTO_INCREMENT , 
	`nombre_estatus` VARCHAR(50) NOT NULL , 
	PRIMARY KEY (`id`),
	INDEX (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `estatus` (`id`, `nombre_estatus`) 
VALUES (NULL, 'Pendiente'),
(NULL, 'En Proceso'),
(NULL, 'Terminado');


DROP TABLE IF EXISTS tera.iniciales;

CREATE TABLE `tera`.`iniciales` ( 
	`id` INT(11) NOT NULL AUTO_INCREMENT , 
	`iniciales_id` VARCHAR(50) NOT NULL , 
	PRIMARY KEY (`id`),
	INDEX (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;