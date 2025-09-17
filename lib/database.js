import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'ark_kollective',
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
};

// Create connection pool for better performance
let pool = null;

export function getDbPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

// Database schema for form submissions
export const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS form_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    property_status VARCHAR(100),
    location VARCHAR(255),
    property_type VARCHAR(100),
    session_type VARCHAR(50),
    preferred_date DATE,
    preferred_time VARCHAR(50),
    report_frequency VARCHAR(100),
    additional_questions TEXT,
    wants_dashboard BOOLEAN DEFAULT FALSE,
    wants_course BOOLEAN DEFAULT FALSE,
    user_agent TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

// Function to save form submission to database
export async function saveFormSubmission(data) {
  const pool = getDbPool();
  
  try {
    // Ensure table exists
    await pool.execute(CREATE_TABLE_SQL);
    
    // Insert form submission
    const [result] = await pool.execute(
      `INSERT INTO form_submissions (
        name, email, phone, property_status, location, property_type, 
        session_type, preferred_date, preferred_time, report_frequency, 
        additional_questions, wants_dashboard, wants_course, user_agent, ip_address
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.email,
        data.phone || null,
        data.propertyStatus || null,
        data.location || null,
        data.propertyType || null,
        data.sessionType || null,
        data.preferredDate || null,
        data.preferredTime || null,
        data.reportFrequency || null,
        data.additionalQuestions || null,
        data.wantsDashboard || false,
        data.wantsCourse || false,
        data.userAgent || null,
        data.ipAddress || null
      ]
    );
    
    return result.insertId;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to save form submission');
  }
}

// Function to get recent submissions (for admin purposes)
export async function getRecentSubmissions(limit = 50) {
  const pool = getDbPool();
  
  try {
    const [rows] = await pool.execute(
      `SELECT id, name, email, phone, property_status, location, property_type, 
              session_type, preferred_date, preferred_time, report_frequency, 
              additional_questions, wants_dashboard, wants_course, created_at 
       FROM form_submissions 
       ORDER BY created_at DESC 
       LIMIT ?`,
      [limit]
    );
    return rows;
  } catch (error) {
    console.error('Database fetch error:', error);
    throw new Error('Failed to fetch submissions');
  }
}

// Function to check if an email already exists
export async function emailExists(email) {
  const pool = getDbPool();
  try {
    const [rows] = await pool.execute(
      `SELECT COUNT(*) as count FROM form_submissions WHERE email = ?`,
      [email]
    );
    return rows[0].count > 0;
  } catch (error) {
    console.error('Database email check error:', error);
    throw new Error('Failed to check email');
  }
}
