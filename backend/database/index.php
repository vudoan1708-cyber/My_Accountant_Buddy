<?php
  namespace backend\database;

  use backend\database\Env;
  use backend\database\Database;

  /**
   * This class is a factory - a factory provides an interface with which its corresponding an instance of a class is interacted
   */
  final class DBFactory {
    public static $interface;

    private $select = [];
    private $insert = FALSE;
    private $update = FALSE;
    private $delete = FALSE;

    private function __construct() {
      $dbInstance = new Database(new Env(realpath(__DIR__ . "/.env")));
      self::$interface = $dbInstance->connect();
    }
  }
?>
