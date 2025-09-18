import { NextResponse } from 'next/server';
import { getDbPool } from '../../../lib/database';

export async function GET() {
  try {
    console.log('Health check started');
    
    // Test environment variables
    const envCheck = {
      MYSQL_HOST: process.env.MYSQL_HOST ? 'Set' : 'Missing',
      MYSQL_USER: process.env.MYSQL_USER ? 'Set' : 'Missing',
      MYSQL_PASSWORD: process.env.MYSQL_PASSWORD ? 'Set' : 'Missing',
      MYSQL_DATABASE: process.env.MYSQL_DATABASE ? 'Set' : 'Missing',
      MYSQL_PORT: process.env.MYSQL_PORT ? 'Set' : 'Missing',
    };
    
    console.log('Environment variables check:', envCheck);
    
    // Test database connection
    const pool = getDbPool();
    const connection = await pool.getConnection();
    
    console.log('Database connection successful');
    
    // Test a simple query
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('Database query test successful:', rows);
    
    connection.release();
    
    return NextResponse.json({
      status: 'healthy',
      environment: envCheck,
      database: 'connected',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Health check failed:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage,
      stack: error.stack
    });
    
    return NextResponse.json({
      status: 'unhealthy',
      error: error.message,
      code: error.code,
      errno: error.errno,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
