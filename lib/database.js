import mysql from 'mysql2/promise';

// Create connection pool for better performance
let pool = null;
let dbConfig = null;

// Function to get database configuration from environment variables
async function getDbConfig() {
  if (dbConfig) {
    return dbConfig;
  }

  try {
    console.log('Loading database configuration from environment variables...');
    
    dbConfig = {
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      connectionLimit: 10,
      acquireTimeout: 60000,
      timeout: 60000,
    };

    console.log('Database config loaded from environment variables:', {
      host: dbConfig.host ? 'SET' : 'MISSING',
      user: dbConfig.user ? 'SET' : 'MISSING',
      password: dbConfig.password ? 'SET' : 'MISSING',
      database: dbConfig.database ? 'SET' : 'MISSING',
      port: dbConfig.port
    });

    // Validate required parameters
    if (!dbConfig.host || !dbConfig.user || !dbConfig.password || !dbConfig.database) {
      const missing = [];
      if (!dbConfig.host) missing.push('MYSQL_HOST');
      if (!dbConfig.user) missing.push('MYSQL_USER');
      if (!dbConfig.password) missing.push('MYSQL_PASSWORD');
      if (!dbConfig.database) missing.push('MYSQL_DATABASE');
      
      throw new Error(`Missing required database parameters: ${missing.join(', ')}`);
    }

    return dbConfig;
  } catch (error) {
    console.error('Error loading database configuration from environment variables:', error);
    throw new Error(`Failed to load database configuration: ${error.message}`);
  }
}

export async function getDbPool() {
  if (!pool) {
    const config = await getDbConfig();
    pool = mysql.createPool(config);
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
    locations JSON,
    session_type VARCHAR(50),
    preferred_date DATE,
    preferred_time VARCHAR(50),
    report_frequency VARCHAR(50),
    additional_questions TEXT,
    wants_dashboard BOOLEAN DEFAULT FALSE,
    wants_course BOOLEAN DEFAULT FALSE,
    whatsapp_consent BOOLEAN DEFAULT FALSE,
    user_agent TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

// Function to save form submission to database
export async function saveFormSubmission(data) {
  try {
    console.log('Getting database pool...');
    const pool = await getDbPool();
    console.log('Database pool obtained successfully');
    
    // Test connection first
    console.log('Testing database connection...');
    await pool.execute('SELECT 1 as test');
    console.log('Database connection test successful');
    
    // Ensure table exists
    console.log('Creating table if not exists...');
    await pool.execute(CREATE_TABLE_SQL);
    console.log('Table creation/verification successful');
    
    // Convert locations array to JSON string
    const locationsJson = data.locations && data.locations.length > 0 
      ? JSON.stringify(data.locations) 
      : null;
    
    console.log('Inserting form submission data...');
    // Insert form submission
    const [result] = await pool.execute(
      `INSERT INTO form_submissions (
        name, email, phone, property_status, locations, 
        session_type, preferred_date, preferred_time, report_frequency,
        additional_questions, wants_dashboard, wants_course, whatsapp_consent, 
        user_agent, ip_address
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.email,
        data.phone || null,
        data.propertyStatus || null,
        locationsJson,
        data.sessionType || null,
        data.preferredDate || null,
        data.preferredTime || null,
        data.reportFrequency || null,
        data.additionalQuestions || null,
        data.wantsDashboard || false,
        data.wantsCourse || false,
        data.whatsappConsent || false,
        data.userAgent || null,
        data.ipAddress || null
      ]
    );
    
    console.log('Form submission saved successfully with ID:', result.insertId);
    return result.insertId;
  } catch (error) {
    console.error('Database error details:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage
    });
    throw new Error(`Failed to save form submission: ${error.message}`);
  }
}

// Function to get recent submissions (for admin purposes)
export async function getRecentSubmissions(limit = 50) {
  try {
    const pool = await getDbPool();
    
    const [rows] = await pool.execute(
      `SELECT id, name, email, phone, property_status, locations, 
              session_type, preferred_date, preferred_time, report_frequency,
              additional_questions, wants_dashboard, wants_course, whatsapp_consent, created_at 
       FROM form_submissions 
       ORDER BY created_at DESC 
       LIMIT ?`,
      [limit]
    );
    
    // Parse JSON locations for each row
    return rows.map(row => ({
      ...row,
      locations: row.locations ? JSON.parse(row.locations) : []
    }));
  } catch (error) {
    console.error('Database fetch error:', error);
    throw new Error('Failed to fetch submissions');
  }
}

