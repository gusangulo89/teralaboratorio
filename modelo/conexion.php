<?php
/*Clase conexion para la base de datos: tera*/

require "config.php";
    class ConectaBase {
        protected $conexionBBDD;
        
        public function __construct(){
            try{
            $this->conexionBBDD = new PDO("mysql:host=".DB_SERVER.";dbname=".DB_NOMBRE,DB_USUARIO,DB_PASS);
            $this->conexionBBDD->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conexionBBDD->exec(DB_CHARSET);
            
            return $this->conexionBBDD;
            
            }catch (Exception $e){
                echo "<script> alert('ERROR EN LA CONEXION DE LA BASE DE DATOS\n VERIFIQUE CON EL ADMINISTRADOR');</script>";
            }
        }
    }
?>