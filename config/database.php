<?php
/**
 * Database Configuration and Connection
 * 
 * This file handles the database connection using environment variables
 * from the .env file for security and flexibility.
 */

// Load Composer autoloader
require_once __DIR__ . '/../vendor/autoload.php';

// Load environment variables  
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

/**
 * Database Connection Class
 */
class Database {
    private static $instance = null;
    private $connection;
    private $host;
    private $port;
    private $db_name;
    private $username;
    private $password;

    /**
     * Constructor - Initialize database parameters from environment variables
     */
    private function __construct() {
        $this->host = $_ENV['DB_HOST'] ?? 'localhost';
        $this->port = $_ENV['DB_PORT'] ?? '3306';
        $this->db_name = $_ENV['DB_NAME'] ?? '';
        $this->username = $_ENV['DB_USERNAME'] ?? '';
        $this->password = $_ENV['DB_PASSWORD'] ?? '';
    }

    /**
     * Get database instance (Singleton pattern)
     */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    /**
     * Get PDO database connection
     */
    public function getConnection() {
        if ($this->connection === null) {
            try {
                $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->db_name};charset=utf8mb4";
                
                $options = [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ];

                $this->connection = new PDO($dsn, $this->username, $this->password, $options);
                
                // Set timezone
                $this->connection->exec("SET time_zone = '+00:00'");
                
            } catch (PDOException $e) {
                throw new Exception("Database connection failed: " . $e->getMessage());
            }
        }
        
        return $this->connection;
    }

    /**
     * Test the database connection
     */
    public function testConnection() {
        try {
            $pdo = $this->getConnection();
            $stmt = $pdo->query("SELECT 1");
            return $stmt !== false;
        } catch (Exception $e) {
            return false;
        }
    }

    /**
     * Get database info
     */
    public function getDatabaseInfo() {
        try {
            $pdo = $this->getConnection();
            $stmt = $pdo->query("SELECT DATABASE() as db_name, VERSION() as version");
            return $stmt->fetch();
        } catch (Exception $e) {
            return null;
        }
    }

    /**
     * Prevent cloning of the instance
     */
    private function __clone() {}

    /**
     * Prevent unserializing of the instance
     */
    public function __wakeup() {
        throw new Exception("Cannot unserialize singleton");
    }
}

/**
 * Helper function to get database connection
 */
function getDB() {
    return Database::getInstance()->getConnection();
}

/**
 * Helper function to test database connection
 */
function testDatabaseConnection() {
    return Database::getInstance()->testConnection();
}