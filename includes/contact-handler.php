<?php
/**
 * Contact Form Handler
 * Handles form validation, database saving, and email sending
 */

class ContactFormHandler {
    private $db;
    private $errors = [];
    private $data = [];

    public function __construct() {
        require_once 'config/database.php';
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Process contact form submission
     */
    public function processForm() {
        // Get form data
        $this->data = [
            'first_name' => $this->sanitizeInput($_POST['first_name'] ?? ''),
            'phone' => $this->sanitizeInput($_POST['phone'] ?? ''),
            'email' => $this->sanitizeInput($_POST['email'] ?? ''),
            'subject' => $this->sanitizeInput($_POST['subject'] ?? ''),
            'message' => $this->sanitizeInput($_POST['message'] ?? '', false) // Don't strip HTML from message
        ];

        // Validate all fields
        $this->validateForm();

        // If no errors, save to database and send email
        if (empty($this->errors)) {
            try {
                $contactId = $this->saveToDatabase();
                $emailSent = $this->sendEmail($contactId);
                
                return [
                    'success' => true,
                    'message' => 'Thank you for your message! I will get back to you soon.',
                    'contact_id' => $contactId,
                    'email_sent' => $emailSent
                ];
            } catch (Exception $e) {
                error_log('Contact form error: ' . $e->getMessage());
                return [
                    'success' => false,
                    'message' => 'Sorry, there was an error processing your message. Please try again later.',
                    'errors' => ['system' => 'Database error occurred.']
                ];
            }
        }

        return [
            'success' => false,
            'message' => 'Please correct the following errors:',
            'errors' => $this->errors
        ];
    }

    /**
     * Validate form data - returns ALL errors at once
     */
    private function validateForm() {
        // First name validation
        if (empty($this->data['first_name'])) {
            $this->errors['first_name'] = 'First name is required.';
        } elseif (strlen($this->data['first_name']) < 2) {
            $this->errors['first_name'] = 'First name must be at least 2 characters.';
        } elseif (strlen($this->data['first_name']) > 50) {
            $this->errors['first_name'] = 'First name cannot exceed 50 characters.';
        } elseif (!preg_match('/^[a-zA-Z\s\'-]+$/', $this->data['first_name'])) {
            $this->errors['first_name'] = 'First name can only contain letters, spaces, hyphens, and apostrophes.';
        }

        // Phone validation (optional field)
        if (!empty($this->data['phone'])) {
            $cleaned_phone = preg_replace('/[\s\-\(\)]/', '', $this->data['phone']);
            if (!preg_match('/^[\+]?[1-9][\d]{0,15}$/', $cleaned_phone)) {
                $this->errors['phone'] = 'Please enter a valid phone number.';
            }
        }

        // Email validation
        if (empty($this->data['email'])) {
            $this->errors['email'] = 'Email address is required.';
        } elseif (!filter_var($this->data['email'], FILTER_VALIDATE_EMAIL)) {
            $this->errors['email'] = 'Please enter a valid email address.';
        } elseif (strlen($this->data['email']) > 100) {
            $this->errors['email'] = 'Email address cannot exceed 100 characters.';
        }

        // Subject validation
        if (empty($this->data['subject'])) {
            $this->errors['subject'] = 'Subject is required.';
        } elseif (strlen($this->data['subject']) < 3) {
            $this->errors['subject'] = 'Subject must be at least 3 characters.';
        } elseif (strlen($this->data['subject']) > 100) {
            $this->errors['subject'] = 'Subject cannot exceed 100 characters.';
        }

        // Message validation
        if (empty($this->data['message'])) {
            $this->errors['message'] = 'Message is required.';
        } elseif (strlen($this->data['message']) < 10) {
            $this->errors['message'] = 'Message must be at least 10 characters.';
        } elseif (strlen($this->data['message']) > 5000) {
            $this->errors['message'] = 'Message cannot exceed 5000 characters.';
        }

        // Check for spam patterns
        if ($this->isSpam($this->data['message'])) {
            $this->errors['message'] = 'Your message appears to contain spam content.';
        }
    }

    /**
     * Sanitize input data
     */
    private function sanitizeInput($input, $stripTags = true) {
        $input = trim($input);
        if ($stripTags) {
            $input = strip_tags($input);
        } else {
            // For message field, allow some HTML but sanitize it
            $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
        }
        return $input;
    }

    /**
     * Basic spam detection
     */
    private function isSpam($message) {
        $spamKeywords = ['casino', 'lottery', 'viagra', 'cialis', 'bitcoin', 'crypto', 'investment opportunity'];
        $message_lower = strtolower($message);
        
        foreach ($spamKeywords as $keyword) {
            if (strpos($message_lower, $keyword) !== false) {
                return true;
            }
        }

        // Check for too many URLs
        if (preg_match_all('/https?:\/\//', $message) > 3) {
            return true;
        }

        return false;
    }

    /**
     * Save contact to database
     */
    private function saveToDatabase() {
        $sql = "INSERT INTO contacts (first_name, phone, email, subject, message, ip_address, user_agent) 
                VALUES (:first_name, :phone, :email, :subject, :message, :ip_address, :user_agent)";
        
        $stmt = $this->db->prepare($sql);
        
        $params = [
            ':first_name' => $this->data['first_name'],
            ':phone' => $this->data['phone'],
            ':email' => $this->data['email'],
            ':subject' => $this->data['subject'],
            ':message' => $this->data['message'],
            ':ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
            ':user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null
        ];

        if ($stmt->execute($params)) {
            return $this->db->lastInsertId();
        } else {
            throw new Exception('Failed to save contact to database');
        }
    }

    /**
     * Send email notification
     */
    private function sendEmail($contactId) {
        try {
            // Load PHPMailer
            require_once __DIR__ . '/../vendor/autoload.php';
            
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            
            // SMTP Configuration
            $mail->isSMTP();
            $mail->Host = $_ENV['SMTP_HOST'] ?? 'smtp.mailtrap.io';
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV['SMTP_USERNAME'] ?? '';
            $mail->Password = $_ENV['SMTP_PASSWORD'] ?? '';
            $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = $_ENV['SMTP_PORT'] ?? 2525;

            // Email content
            $mail->setFrom($_ENV['MAIL_FROM'] ?? 'noreply@mark-peters.dev', 'Portfolio Contact Form');
            $mail->addAddress($_ENV['MAIL_TO'] ?? 'mark@example.com', 'Mark Peters');
            $mail->addReplyTo($this->data['email'], $this->data['first_name']);

            $mail->isHTML(true);
            $mail->Subject = $this->data['subject'] . ' - Contact Form #' . $contactId;
            
            $mail->Body = $this->getEmailTemplate($contactId);
            $mail->AltBody = $this->getEmailTextVersion($contactId);

            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log('Email sending failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * HTML email template
     */
    private function getEmailTemplate($contactId) {
        $name = htmlspecialchars($this->data['first_name']);
        $email = htmlspecialchars($this->data['email']);
        $phone = htmlspecialchars($this->data['phone']);
        $subject = htmlspecialchars($this->data['subject']);
        $message = nl2br(htmlspecialchars($this->data['message']));
        $timestamp = date('Y-m-d H:i:s');
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

        $phoneRow = !empty($phone) ? "<p><strong>Phone:</strong> {$phone}</p>" : '';

        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>New Contact Form Submission</title>
        </head>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                <h2 style='color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;'>
                    Portfolio Contact: {$subject}
                </h2>
                
                <div style='background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;'>
                    <h3 style='margin-top: 0; color: #2c3e50;'>Contact Information:</h3>
                    <p><strong>Name:</strong> {$name}</p>
                    <p><strong>Email:</strong> <a href='mailto:{$email}'>{$email}</a></p>
                    {$phoneRow}
                    <p><strong>Subject:</strong> {$subject}</p>
                    <p><strong>Submission ID:</strong> #{$contactId}</p>
                    <p><strong>Date/Time:</strong> {$timestamp}</p>
                    <p><strong>IP Address:</strong> {$ip}</p>
                </div>

                <div style='background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;'>
                    <h3 style='margin-top: 0; color: #2c3e50;'>Message:</h3>
                    <div style='background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db;'>
                        {$message}
                    </div>
                </div>

                <div style='margin-top: 30px; padding: 15px; background-color: #e8f5e8; border-radius: 5px; text-align: center;'>
                    <p style='margin: 0; color: #27ae60;'>
                        <strong>Next Steps:</strong> Reply directly to this email to respond to {$name}.
                    </p>
                </div>
            </div>
        </body>
        </html>";
    }

    /**
     * Plain text email version
     */
    private function getEmailTextVersion($contactId) {
        $name = $this->data['first_name'];
        $email = $this->data['email'];
        $phone = $this->data['phone'];
        $subject = $this->data['subject'];
        $message = $this->data['message'];
        $timestamp = date('Y-m-d H:i:s');

        $phoneText = !empty($phone) ? "- Phone: {$phone}\n" : '';

        return "
PORTFOLIO CONTACT: {$subject}

Contact Information:
- Name: {$name}
- Email: {$email}
{$phoneText}- Subject: {$subject}
- Submission ID: #{$contactId}
- Date/Time: {$timestamp}

Message:
{$message}

Reply directly to this email to respond to {$name}.
        ";
    }

    /**
     * Get form data for repopulating form on error
     */
    public function getFormData() {
        return $this->data;
    }
}
?>