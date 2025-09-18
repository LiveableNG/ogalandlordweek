import { NextResponse } from 'next/server';
import { saveFormSubmission } from '../../../lib/database';

export async function POST() {
  try {
    console.log('Testing database save function...');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+2341234567890',
      propertyStatus: 'existing',
      locations: ['Lagos'],
      sessionType: 'physical',
      preferredDate: '2024-02-15',
      preferredTime: 'morning',
      reportFrequency: 'monthly',
      additionalQuestions: 'Test question',
      wantsDashboard: true,
      wantsCourse: false,
      whatsappConsent: true,
      userAgent: 'test-agent',
      ipAddress: '127.0.0.1'
    };
    
    console.log('Test data:', testData);
    
    const submissionId = await saveFormSubmission(testData);
    console.log('Form saved successfully with ID:', submissionId);
    
    return NextResponse.json({
      success: true,
      message: 'Database save test successful',
      submissionId: submissionId
    });
    
  } catch (error) {
    console.error('Database save test failed:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage,
      stack: error.stack
    });
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage
      }
    }, { status: 500 });
  }
}
