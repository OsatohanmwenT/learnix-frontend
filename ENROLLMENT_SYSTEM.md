# Course Enrollment System Implementation

## Overview

The enrollment system has been properly implemented using Next.js server actions with cookie-based authentication, following the established patterns in the project.

## Architecture

### 1. Server Actions (`/lib/actions/courses.ts`)

- **Purpose**: Server-side data fetching and enrollment logic
- **Functions**:
  - `fetchCourses()`: Fetches course list with filtering
  - `fetchCourseById()`: Fetches single course details
  - `initiateEnrollment()`: Handles course enrollment initiation (server action)
  - `completeEnrollment()`: Handles payment completion verification (server action)
- **Authentication**: Uses httpOnly cookies (`access_token`) for secure authentication
- **Navigation**: Uses Next.js `redirect()` for server-side navigation

### 2. EnrollButton Component (`/components/course/EnrollButton.tsx`)

- **Purpose**: Reusable enrollment button with loading states
- **Features**:
  - Loading state management
  - Disabled state for invalid course IDs
  - Automatic payment completion handling via URL parameters
  - Clean UI with hover effects
  - Uses Next.js `useRouter` for client-side navigation

### 3. Course Details Page (`/app/(root)/courses/[id]/page.tsx`)

- **Purpose**: Main course display page
- **Features**:
  - Server-side rendering for SEO
  - Dynamic course content display
  - Collapsible module accordion
  - Integrated enrollment functionality

## Key Features

### Authentication & Security

- **Cookie-based Authentication**: Uses httpOnly cookies (`access_token`) for secure authentication
- **Automatic Login Redirection**: Server actions automatically redirect to `/sign-in` for unauthenticated users
- **Token Validation**: Server-side validation with automatic error handling
- **Secure API Communication**: All API calls use server-side fetch with proper headers

### Payment Integration

- **Free Courses**: Direct enrollment with success feedback
- **Paid Courses**: Automatic redirect to Paystack payment page
- **Payment Completion**: URL parameter-based payment verification
- **Automatic Course Access**: Redirect to enrolled course after successful payment

### User Experience

- **Loading States**: Visual feedback during enrollment process
- **Error Handling**: User-friendly error messages with fallbacks
- **Smooth Navigation**: Server-side redirects for better performance
- **Responsive Design**: Tailwind CSS styling consistent with project theme

### Error Handling

- **Comprehensive Error Catching**: Both server and client-side error handling
- **User-friendly Messages**: Clear feedback for all error scenarios
- **Graceful Fallbacks**: Automatic redirects and recovery mechanisms
- **Network Resilience**: Proper handling of network and API errors

## API Endpoints Expected

### Enrollment Initiation

```
POST /api/courses/:id/enroll
Headers: Authorization: Bearer <access_token>
Response: { data: { paymentUrl?: string } }
```

### Payment Completion

```
POST /api/courses/enroll/complete
Headers: Authorization: Bearer <access_token>
Body: { reference: string }
Response: { data: { course: { id: string, title: string } } }
```

## Authentication Flow

### Cookie Management

- **Access Token**: Stored in httpOnly cookie (`access_token`) - 15 minutes expiry
- **Refresh Token**: Stored in httpOnly cookie (`refresh_token`) - 7 days expiry
- **User Info**: Stored in httpOnly cookie (`user_info`) - 7 days expiry

### Server Action Authentication

```typescript
const cookieStore = await cookies();
const accessToken = cookieStore.get("access_token")?.value;

if (!accessToken) {
  redirect("/sign-in");
}
```

## Usage Patterns

### For Free Courses

1. User clicks "Enroll Class" button
2. Server action checks authentication via cookies
3. Makes API call to enrollment endpoint
4. Returns success result to client
5. Client shows success message and refreshes page

### For Paid Courses

1. User clicks "Enroll Class" button
2. Server action checks authentication via cookies
3. Makes API call to enrollment endpoint
4. Server redirects directly to Paystack payment page
5. After payment, user returns with reference parameter
6. System automatically verifies payment and redirects to course

## Implementation Benefits

### Security

- **No Client-side Token Storage**: Tokens stored in httpOnly cookies
- **Server-side Validation**: All authentication happens on the server
- **CSRF Protection**: Built-in protection through cookie-based auth

### Performance

- **Server-side Redirects**: Faster navigation with server redirects
- **Reduced Client Bundle**: Less JavaScript sent to client
- **Better SEO**: Server-side rendering maintained

### Maintainability

- **Consistent Patterns**: Follows project's established auth patterns
- **Centralized Logic**: All enrollment logic in server actions
- **Type Safety**: Full TypeScript support with proper error handling

## Testing Checklist

- [ ] Free course enrollment works with proper authentication
- [ ] Paid course enrollment redirects to payment correctly
- [ ] Payment completion verification functions properly
- [ ] Unauthenticated users are redirected to sign-in
- [ ] Error states display appropriate messages
- [ ] Loading states work correctly
- [ ] Course data displays properly
- [ ] Server-side redirects function properly
- [ ] Cookie-based authentication works as expected
- [ ] Mobile responsiveness maintained

## Future Enhancements

1. **Toast Notifications**: Replace alert() with toast notifications
2. **Enrollment Status**: Show enrollment status on course pages
3. **Progress Tracking**: Add enrollment progress indicators
4. **Bulk Enrollment**: Support for enrolling in multiple courses
5. **Enrollment History**: Track user's enrollment history
6. **Email Confirmations**: Send enrollment confirmation emails
7. **Course Prerequisites**: Check prerequisites before enrollment
8. **Enrollment Analytics**: Track enrollment metrics and conversion rates
