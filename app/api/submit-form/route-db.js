import { NextResponse } from 'next/server';
import { saveFormSubmission, emailExists } from '../../../lib/database';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Received form data:', body);
    
    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const emailAlreadyExists = await emailExists(body.email);
    if (emailAlreadyExists) {
      return NextResponse.json(
        { error: 'This email has already been registered' },
        { status: 409 }
      );
    }

    // Get client IP and user agent
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Prepare data for database
    const formData = {
      ...body,
      ipAddress: ip,
      userAgent: userAgent
    };

    console.log('Prepared form data for database:', formData);

    // Save to database
    const submissionId = await saveFormSubmission(formData);
    console.log('Form saved successfully with ID:', submissionId);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully',
        submissionId: submissionId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Form submission error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
