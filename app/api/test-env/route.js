import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test environment variables
    const envVars = {
      MYSQL_HOST: process.env.MYSQL_HOST ? 'SET' : 'MISSING',
      MYSQL_USER: process.env.MYSQL_USER ? 'SET' : 'MISSING',
      MYSQL_PASSWORD: process.env.MYSQL_PASSWORD ? 'SET' : 'MISSING',
      MYSQL_DATABASE: process.env.MYSQL_DATABASE ? 'SET' : 'MISSING',
      MYSQL_PORT: process.env.MYSQL_PORT || 'NOT_SET',
      NODE_ENV: process.env.NODE_ENV || 'NOT_SET',
    };

    // Log all environment variables that start with MYSQL
    const mysqlEnvVars = Object.keys(process.env)
      .filter(key => key.startsWith('MYSQL'))
      .reduce((obj, key) => {
        obj[key] = process.env[key] ? 'SET' : 'MISSING';
        return obj;
      }, {});

    return NextResponse.json({
      success: true,
      message: 'Environment variable test',
      envVars,
      mysqlEnvVars,
      allEnvKeys: Object.keys(process.env).filter(key => key.startsWith('MYSQL'))
    });

  } catch (error) {
    console.error('Environment test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        envVars: {
          MYSQL_HOST: process.env.MYSQL_HOST ? 'SET' : 'MISSING',
          MYSQL_USER: process.env.MYSQL_USER ? 'SET' : 'MISSING',
          MYSQL_PASSWORD: process.env.MYSQL_PASSWORD ? 'SET' : 'MISSING',
          MYSQL_DATABASE: process.env.MYSQL_DATABASE ? 'SET' : 'MISSING',
        }
      },
      { status: 500 }
    );
  }
}
