<?php
/**
 * Example Usage of Database Connection
 * 
 * This file shows how to use the database connection in your portfolio project.
 */

require_once 'config/database.php';

/**
 * Example: Contact Form Handler
 * This shows how you might handle form submissions and store them in the database
 */
class ContactHandler {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Create contacts table if it doesn't exist
     */
    public function createContactsTable() {
        $sql = "
            CREATE TABLE IF NOT EXISTS contacts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                ip_address VARCHAR(45),
                user_agent TEXT
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ";
        
        return $this->db->exec($sql) !== false;
    }

    /**
     * Save contact form submission
     */
    public function saveContact($firstName, $lastName, $email, $message) {
        $sql = "
            INSERT INTO contacts (first_name, last_name, email, message, ip_address, user_agent) 
            VALUES (:first_name, :last_name, :email, :message, :ip_address, :user_agent)
        ";
        
        $stmt = $this->db->prepare($sql);
        
        return $stmt->execute([
            ':first_name' => $firstName,
            ':last_name' => $lastName,
            ':email' => $email,
            ':message' => $message,
            ':ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
            ':user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null
        ]);
    }

    /**
     * Get all contacts (for admin use)
     */
    public function getAllContacts() {
        $sql = "SELECT * FROM contacts ORDER BY created_at DESC";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll();
    }

    /**
     * Get contact count
     */
    public function getContactCount() {
        $sql = "SELECT COUNT(*) as count FROM contacts";
        $stmt = $this->db->query($sql);
        $result = $stmt->fetch();
        return $result['count'] ?? 0;
    }
}

/**
 * Example: Portfolio Projects Handler
 * This shows how you might manage portfolio projects in the database
 */
class ProjectHandler {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Create projects table
     */
    public function createProjectsTable() {
        $sql = "
            CREATE TABLE IF NOT EXISTS projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                description TEXT,
                technologies VARCHAR(255),
                image_url VARCHAR(255),
                project_url VARCHAR(255),
                github_url VARCHAR(255),
                category ENUM('frontend', 'backend', 'refactor') DEFAULT 'frontend',
                is_featured BOOLEAN DEFAULT FALSE,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ";
        
        return $this->db->exec($sql) !== false;
    }

    /**
     * Add a new project
     */
    public function addProject($data) {
        $sql = "
            INSERT INTO projects (title, description, technologies, image_url, project_url, github_url, category, is_featured, is_active) 
            VALUES (:title, :description, :technologies, :image_url, :project_url, :github_url, :category, :is_featured, :is_active)
        ";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($data);
    }

    /**
     * Get all active projects
     */
    public function getActiveProjects() {
        $sql = "SELECT * FROM projects WHERE is_active = 1 ORDER BY is_featured DESC, created_at DESC";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll();
    }

    /**
     * Get projects by category
     */
    public function getProjectsByCategory($category) {
        $sql = "SELECT * FROM projects WHERE category = :category AND is_active = 1 ORDER BY created_at DESC";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':category' => $category]);
        return $stmt->fetchAll();
    }
}

// Example usage:
/*
// Initialize handlers
$contactHandler = new ContactHandler();
$projectHandler = new ProjectHandler();

// Create tables
$contactHandler->createContactsTable();
$projectHandler->createProjectsTable();

// Handle contact form submission
if ($_POST && isset($_POST['contact_form'])) {
    $result = $contactHandler->saveContact(
        $_POST['first_name'],
        $_POST['last_name'],
        $_POST['email'],
        $_POST['message']
    );
    
    if ($result) {
        echo "Contact form submitted successfully!";
    } else {
        echo "Error submitting contact form.";
    }
}

// Get projects for display
$projects = $projectHandler->getActiveProjects();
*/