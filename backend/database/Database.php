<?php
namespace backend\database

class Database {
  private static MYSQL_DB
}
try {
  $db = new PDO("mysql:host=".$host.";dbname=".$dbname.";charset=utf8", $dbun, $dbpwd,
               [PDO::MYSQL_ATTR_FOUND_ROWS => true, PDO::ATTR_PERSISTENT => false]);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $db;
} catch (PDOException $db) {
  voly_error_log($db->getMessage());
  return false;
}
?>