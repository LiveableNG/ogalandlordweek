import { NextResponse } from 'next/server';
import { saveFormSubmission, emailExists } from '../../../lib/database';

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

    // Check if email already exists
    const emailAlreadyExists = await emailExists(body.email);
    if (emailAlreadyExists) {
      return NextResponse.json(
        { error: 'This email has already been registered for Oga Landlord Week' },
        { status: 409 }
      );
    }

    // Validate locations array
    if (!body.locations || !Array.isArray(body.locations) || body.locations.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one property location' },
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
