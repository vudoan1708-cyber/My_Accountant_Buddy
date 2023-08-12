<?php
  namespace backend\database;

  use backend\database\Env;

  class Database {
    private string $env = "";
    private static string $MYSQL_HOST;
    private static string $MYSQL_DB;
    private static string $MYSQL_USER;
    private static string $MYSQL_PASSWORD;

    /**
     * Construct a new Database instance
     * @param Env $EnvInstance an instance of Env class,
     * needed when instantiating a Database class to retrieve environment variables
     */
    private function __construct(Env $EnvInstance) {
      $this->env = $EnvInstance;
      self::$MYSQL_HOST = $this->env->get("MYSQL_HOST");
      self::$MYSQL_DB = $this->env->get("MYSQL_DB");
      self::$MYSQL_USER = $this->env->get("MYSQL_USER");
      self::$MYSQL_PASSWORD = $this->env->get("MYSQL_PASSWORD");
    }

    public function connect(): \PDO | null {
      require_once(dirname(__DIR__) . "/../internal/Debugging.php");
      try {
        $db = new \PDO(
          "mysql:host=" . self::$MYSQL_HOST .";dbname=". self::$MYSQL_DB .";charset=utf8",
          self::$MYSQL_USER,
          self::$MYSQL_PASSWORD,
          [
            \PDO::MYSQL_ATTR_FOUND_ROWS => true,
            \PDO::ATTR_PERSISTENT => false,
          ]);
        $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        return $db;
      } catch (\PDOException $db) {
        ErrorLog($db->getMessage());
        return null;
      }
    }
  }
?>
