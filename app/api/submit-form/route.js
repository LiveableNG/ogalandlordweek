import { NextResponse } from 'next/server';
import { saveFormSubmission } from '../../../lib/database';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Note: We allow multiple submissions with the same email since this is a form submissions table, not a users table

    // Validate locations array (optional)
    if (body.locations && !Array.isArray(body.locations)) {
      return NextResponse.json(
        { error: 'Locations must be an array' },
        { status: 400 }
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

    // Save to database
    const submissionId = await saveFormSubmission(formData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Welcome to Oga Landlord Week! We\'ll be in touch soon.',
        submissionId: submissionId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
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
