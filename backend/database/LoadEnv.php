<?php
  namespace backend\database\loadenv;

  // Reference: https://www.sourcecodester.com/tutorial/php/16035/load-environment-variables-env-file-using-php-tutorial

  class LoadEnv {
    private string $envFilePath;

    /**
     * Construct a new LoadEnv instance
     *
     * @param string $filePath     The realpath to the .env file.
    */
    private function __construct(string $filePath) {
      // Check .envenvironment file exists
      if(!is_file($filePath)) {
        throw new \ErrorException("Environment File is Missing.");
      }
      // Check .envenvironment file is readable
      if(!is_readable($filePath)) {
        throw new \ErrorException("Permission Denied for reading the ".($filePath).".");
      }
      $this->envFilePath = $filePath;
      $this->storeEnvVars($this->parseEnvContent($this->envFilePath));
    }

    private function parseEnvContent(string $path): array {
      $varArrs = array();
      // Open the .env file using the reading mode
      $fopen = fopen($path, 'r');

      if (!$fopen) return $varArrs;

      // Loop the lines of the file
      while (($line = fgets($fopen))){
        // Check if line is a comment
        $lineIsComment = substr(trim($line), 0, 1) === '#';
        // If line is a comment or empty, then skip
        if($lineIsComment || empty(trim($line)))
          continue;

        // Split the line variable and succeeding comment on line if exists
        $lineNoComment = explode("#", $line, 2)[0];
        // Split the variable name and value
        $env_ex = preg_split('/(\s?)\=(\s?)/', $lineNoComment);
        $env_name = trim($env_ex[0]);
        $env_value = isset($env_ex[1]) ? trim($env_ex[1]) : "";
        $varArrs[$env_name] = $env_value;

        // Close the file
        fclose($fopen);
      }

      return $varArrs;
    }

    private function storeEnvVars(array $varArrs) {
      foreach($varArrs as $name => $value){
        $_ENV[$name] = $value;
      }
    }

    public function getEnv(string $name): string {
      return $_ENV[$name];
    }
  }
?>
