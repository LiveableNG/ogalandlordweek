# Database Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MySQL Database Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password_here
MYSQL_DATABASE=ark_kollective
```

## Database Setup

1. Make sure MySQL is running on your system
2. Create a database named `ark_kollective` (or update the MYSQL_DATABASE variable)
3. The application will automatically create the `form_submissions` table when the first form is submitted

## Table Schema

The `form_submissions` table includes the following fields:
- `id` - Auto-increment primary key
- `name` - User's full name
- `email` - User's email address
- `phone` - User's phone number
- `property_status` - Current property ownership status
- `location` - Property location
- `property_type` - Type of property
- `session_type` - Preferred session type (virtual/physical)
- `preferred_date` - Preferred date for session
- `preferred_time` - Preferred time slot
- `report_frequency` - Current reporting frequency
- `additional_questions` - Additional comments/questions
- `wants_dashboard` - Boolean for dashboard interest
- `wants_course` - Boolean for course interest
- `user_agent` - Browser information
- `ip_address` - Client IP address
- `created_at` - Timestamp when record was created
- `updated_at` - Timestamp when record was last updated

## API Endpoints

- `POST /api/submit-form` - Submit form data
- The API will return appropriate error messages for validation failures or duplicate emails
