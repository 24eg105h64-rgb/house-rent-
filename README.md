# RentEase - Full Stack MERN Project Documentation

## 1. Introduction

### Project Title
**RentEase** - A Full-Stack House Rental Management Platform

### Team Members
- **Solo Developer** (Project Owner)

---

## 2. Project Overview

### Purpose
RentEase is a comprehensive property rental management platform that bridges the gap between property owners and renters. The application streamlines the rental process by allowing owners to list properties, renters to browse and book available properties, and administrators to manage the entire platform.

### Key Features
- **User Authentication**: Role-based login system (Admin, Owner, Renter)
- **Property Listing**: Owners can create, edit, and manage rental properties
- **Property Search & Filtering**: Renters can filter properties by type, location, and rental type
- **Booking Management**: Complete booking workflow with status tracking
- **Admin Dashboard**: Comprehensive admin controls for users, properties, and bookings
- **Owner Dashboard**: Property management and booking requests
- **Renter Dashboard**: Browse properties and manage bookings
- **Image Upload**: Support for multiple property images
- **Responsive UI**: Mobile-friendly dark-themed interface with Tailwind CSS

---

## 3. Architecture

### Frontend Architecture
**Technology Stack**: React 18, Vite, React Router v6, Tailwind CSS, Ant Design, Axios

**Key Components**:
- **App.jsx**: Main router and context provider
- **UserContext**: Global state management for authentication and user data
- **Modules**:
  - `common/`: Public pages (Home, Login, Register, ForgotPassword)
  - `admin/`: Admin dashboard (AllUsers, AllProperties, AllBookings)
  - `user/owner/`: Owner dashboard (AddProperty, AllProperties, AllBookings)
  - `user/renter/`: Renter dashboard (AllProperties, AllBookings)
  - `user/AllPropertiesCards.jsx`: Shared property listing component

**Authentication Flow**:
1. User logs in via Login component
2. Backend returns JWT token in cookie and response body
3. Frontend stores token in localStorage and axios Authorization header
4. UserContext updates with user data and login status
5. Protected routes check UserContext before rendering

### Backend Architecture
**Technology Stack**: Node.js, Express.js, Mongoose, MongoDB, JWT, Bcryptjs, Multer

**Folder Structure**:
```
backend/
├── config/
│   └── connect.js          # MongoDB connection with retry logic
├── controllers/
│   ├── userController.js   # User auth & property endpoints
│   ├── ownerController.js  # Owner property management
│   └── adminController.js  # Admin user & property management
├── middlewares/
│   └── authMiddleware.js   # JWT token verification
├── models/
│   ├── UserSchema.js       # User model (Admin, Owner, Renter)
│   ├── PropertySchema.js   # Property listings model
│   └── BookingSchema.js    # Booking records model
├── routes/
│   ├── userRoutes.js       # Auth & renter endpoints
│   ├── ownerRoutes.js      # Owner endpoints
│   ├── adminRoutes.js      # Admin endpoints
│   └── sampleRoutes.js     # Test endpoints
├── uploads/                # Property images directory
├── index.js                # Express app setup & server start
├── package.json
└── .env                    # Environment variables
```

**Key Features**:
- Async/await error handling
- Multer for image uploads
- Bcryptjs for password hashing
- JWT for stateless authentication
- In-memory MongoDB fallback (mongodb-memory-server)
- Database seeding on startup

### Database Schema

#### UserSchema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  type: String (Admin, Owner, Renter),
  granted: String (for Owners: "granted", "ungranted")
}
```

#### PropertySchema
```javascript
{
  ownerId: ObjectId (ref: User),
  propertyType: String (house, villa, residential, commercial, land/plot),
  propertyAdType: String (rent, sale),
  propertyAddress: String (required),
  ownerContact: String (phone number),
  propertyAmt: Number (rental/sale price),
  propertyImage: Array<{filename, path}>,
  isAvailable: String (Available, Unavailable),
  additionalInfo: String (description),
  ownerName: String
}
```

#### BookingSchema
```javascript
{
  propertyId: ObjectId (ref: Property),
  userID: ObjectId (ref: User - Renter),
  ownerID: ObjectId (ref: User - Owner),
  userName: String,
  phone: String,
  bookingStatus: String (pending, confirmed, rejected, booked)
}
```

---

## 4. Setup Instructions

### Prerequisites
- Node.js v24.15.0 or higher
- npm v11.12.1 or higher
- MongoDB (local or cloud instance, or use in-memory fallback)
- Git

### Installation

#### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/HouseRent.git
cd HouseRent
```

#### Step 2: Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in `backend/` directory:
```env
PORT=8001
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
MONGO_DB=mongodb://localhost:27017/rentease
```

#### Step 3: Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` file in `frontend/` directory (optional):
```env
VITE_API_URL=http://localhost:8001
```

#### Step 4: Verify Installation
```bash
# In backend directory
npm list

# In frontend directory
npm list
```

---

## 5. Folder Structure

### Frontend Structure
```
frontend/
├── src/
│   ├── App.jsx                    # Main router & context
│   ├── App.css
│   ├── index.css                  # Tailwind imports
│   ├── main.jsx                   # Entry point
│   ├── images/                    # Static images
│   └── modules/
│       ├── common/
│       │   ├── Home.jsx           # Landing page
│       │   ├── Login.jsx          # Auth form
│       │   ├── Register.jsx       # User registration
│       │   ├── ForgotPassword.jsx # Password reset
│       │   └── Toast.jsx          # Toast notifications
│       ├── admin/
│       │   ├── AdminHome.jsx      # Admin dashboard
│       │   ├── AllUsers.jsx       # User management
│       │   ├── AllProperty.jsx    # Property management
│       │   └── AllBookings.jsx    # Booking management
│       ├── user/
│       │   ├── AllPropertiesCards.jsx # Shared property cards
│       │   ├── owner/
│       │   │   ├── OwnerHome.jsx  # Owner dashboard
│       │   │   ├── AddProperty.jsx # Add new property
│       │   │   ├── AllProperties.jsx
│       │   │   └── AllBookings.jsx
│       │   └── renter/
│       │       ├── RenterHome.jsx
│       │       └── AllProperties.jsx (Booking history)
│       └── images/
├── package.json
├── vite.config.js
└── eslint.config.js
```

### Backend Structure
```
backend/
├── config/
│   └── connect.js              # DB connection logic
├── controllers/
│   ├── userController.js       # Auth & user endpoints
│   ├── ownerController.js      # Owner operations
│   └── adminController.js      # Admin operations
├── middlewares/
│   └── authMiddleware.js       # JWT verification
├── models/
│   ├── UserSchema.js
│   ├── PropertySchema.js
│   └── BookingSchema.js
├── routes/
│   ├── userRoutes.js
│   ├── ownerRoutes.js
│   ├── adminRoutes.js
│   └── sampleRoutes.js
├── uploads/                    # Property images
├── index.js                    # App & server
├── package.json
├── .env
└── .env.example
```

---

## 6. Running the Application

### Start Backend Server
```bash
cd backend
npm start
# or
node index.js
```

**Expected Output**:
```
Starting in-memory MongoDB
Connected to in-memory MongoDB
Seeded 3 sample properties
Server is running on port 8001
```

### Start Frontend Server
```bash
cd frontend
npm run dev
```

**Expected Output**:
```
VITE v8.0.16 building client environment for production...
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Build Frontend for Production
```bash
cd frontend
npm run build
```

---

## 7. API Documentation

### Base URL
```
http://localhost:8001/api
```

### Authentication Endpoints

#### Register User
- **Route**: `POST /user/register`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "type": "Renter"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Register Success"
}
```

#### Login User
- **Route**: `POST /user/login`
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Login success successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "type": "Renter"
  }
}
```

#### Forgot Password
- **Route**: `POST /user/forgotpassword`
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "newpassword123"
}
```

### Property Endpoints

#### Get All Properties (Public)
- **Route**: `GET /user/getAllProperties`
- **Auth**: No
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "propertyType": "house",
      "propertyAddress": "1483 Willow Lane",
      "propertyAmt": 1800,
      "propertyImage": [...],
      "isAvailable": "Available"
    }
  ]
}
```

#### Add Property (Owner)
- **Route**: `POST /owner/postproperty`
- **Auth**: Required (JWT)
- **Body**: FormData
```
propertyType: "house"
propertyAdType: "rent"
propertyAddress: "123 Main St"
ownerContact: "+1234567890"
propertyAmt: 1800
additionalInfo: "3-bedroom house"
propertyImages: [File, File]
```

#### Get Owner Properties
- **Route**: `GET /owner/getallproperties`
- **Auth**: Required
- **Response**: Array of properties owned by authenticated user

#### Delete Property (Owner)
- **Route**: `DELETE /owner/deleteproperty/:propertyid`
- **Auth**: Required

#### Update Property (Owner)
- **Route**: `PATCH /owner/updateproperty/:propertyid`
- **Auth**: Required

### Booking Endpoints

#### Create Booking (Renter)
- **Route**: `POST /user/bookinghandle/:propertyid`
- **Auth**: Required
- **Body**:
```json
{
  "userDetails": {
    "fullName": "John Doe",
    "phone": "+1234567890"
  },
  "status": "pending",
  "ownerId": "507f1f77bcf86cd799439011"
}
```

#### Get User Bookings (Renter)
- **Route**: `GET /user/getallbookings`
- **Auth**: Required

#### Get Owner Bookings
- **Route**: `GET /owner/getallbookings`
- **Auth**: Required

#### Update Booking Status (Owner)
- **Route**: `POST /owner/handlebookingstatus`
- **Auth**: Required
- **Body**:
```json
{
  "bookingId": "507f1f77bcf86cd799439013",
  "propertyId": "507f1f77bcf86cd799439012",
  "status": "confirmed"
}
```

### Admin Endpoints

#### Get All Users (Admin)
- **Route**: `GET /admin/getalluser`
- **Auth**: Required

#### Update User Status (Admin)
- **Route**: `POST /admin/updateuserstatus`
- **Auth**: Required
- **Body**:
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "status": "granted"
}
```

#### Get All Properties (Admin)
- **Route**: `GET /admin/getallproperties`
- **Auth**: Required

#### Get All Bookings (Admin)
- **Route**: `GET /admin/getallbookings`
- **Auth**: Required

---

## 8. Authentication

### Method: JWT (JSON Web Tokens) + Cookies

### Flow
1. **User Registration**: Password hashed with bcryptjs (10 salt rounds)
2. **User Login**: 
   - Email & password verified
   - JWT token generated with 1-day expiration
   - Token sent in:
     - Cookie (httpOnly, secure in production)
     - Response body for localStorage backup
3. **Authorization**: 
   - Token extracted from cookies OR Authorization header OR request body
   - JWT verified using JWT_SECRET
   - User ID attached to req.userId for use in controllers

### Token Structure
```javascript
jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
```

### Cookie Configuration
```javascript
{
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000
}
```

### Protected Routes
All routes requiring authentication use the `authMiddleware`:
- `/owner/*` - All owner routes
- `/admin/*` - All admin routes
- `/user/getallbookings` - Renter bookings
- `/user/bookinghandle/*` - Create booking

### Frontend Auth Management
```javascript
// On login success
localStorage.setItem("user", JSON.stringify(user))
localStorage.setItem("token", token)
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

// On app load
const token = localStorage.getItem("token")
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

// On logout
localStorage.removeItem("user")
localStorage.removeItem("token")
document.cookie = "token=; path=/;"
```

---

## 9. User Interface

### Color Scheme
- **Primary**: Indigo (#6366f1)
- **Background**: Dark gradient (Gray 800 → Gray 900 → Black)
- **Text**: White & Gray 200-400
- **Accents**: Red (logout), Yellow (warnings)

### Key Pages

#### 1. Landing Page (Home)
- Navigation with hero section
- Featured properties showcase
- Call-to-action buttons for signup/login
- Property listing with filters

#### 2. Login Page
- Email and password fields
- Remember password option
- Link to registration
- Toast notifications

#### 3. Registration Page
- Name, email, password fields
- User type selection dropdown (Renter, Owner, Admin)
- Form validation
- Success/error feedback

#### 4. Admin Dashboard
- **All Users Tab**: User table with status management
- **All Properties Tab**: Property listing with details
- **All Bookings Tab**: Booking management and status updates

#### 5. Owner Dashboard
- **Add Property**: Form to upload property details and images
- **All Properties**: List of owned properties with edit/delete options
- **All Bookings**: Incoming booking requests with accept/reject options

#### 6. Renter Dashboard
- **All Properties**: Browse all available properties with filters (type, location, price range)
- **Booking Modal**: Quick property details and booking form
- **Booking History**: Track all bookings and their status

---

## 10. Testing

### Manual Testing Strategy

#### Authentication Testing
- [ ] Register new user as Renter
- [ ] Register new user as Owner
- [ ] Attempt login with invalid credentials
- [ ] Login with valid credentials and verify redirect
- [ ] Verify token stored in localStorage and cookies
- [ ] Test logout functionality
- [ ] Test session persistence (page refresh)

#### Property Management Testing (Owner)
- [ ] Add property with all fields
- [ ] Upload multiple property images
- [ ] Verify property appears in owner list
- [ ] Edit existing property
- [ ] Delete property
- [ ] Verify property image display

#### Booking Testing
- [ ] Browse available properties
- [ ] Filter properties by type/location
- [ ] Submit booking request
- [ ] Verify booking appears in owner's list
- [ ] Accept/reject booking as owner
- [ ] Verify booking status updates for renter

#### Admin Testing
- [ ] View all users and bookings
- [ ] Update user status (grant owner access)
- [ ] Verify property and booking listings

### Testing Tools Used
- Manual browser testing
- Network tab inspection for API calls
- Browser console for error checking
- Postman (optional) for direct API endpoint testing

---

## 11. Screenshots/Demo

### Key Application Screens

#### 1. Home Page
- Hero section with RentEase branding
- Navigation bar with Home, Login, Register links
- Featured properties grid
- Search and filter functionality

#### 2. Property Listing
- Property cards with images
- Property type, location, price badges
- "Get Info / Book" button for renters
- Modal with full property details

#### 3. Owner Dashboard
- Tabbed interface (Add Property, All Properties, All Bookings)
- Form for adding new properties
- List of properties owned by user
- Booking requests with accept/reject buttons

#### 4. Admin Panel
- Multi-tab dashboard (Users, Properties, Bookings)
- User management with status controls
- Property overview and management
- Booking status tracking

---

## 12. Known Issues

### Current Issues

1. **Image Upload Path Handling**
   - Filenames with spaces may cause URL encoding issues
   - Recommendation: Sanitize filenames on upload

2. **Owner Account Approval**
   - Owners are created as "ungranted" but admin interface for approval exists
   - Implement email notifications when owners are approved

3. **In-Memory Database**
   - Sample data is lost on server restart
   - Works great for development but not production
   - Connect to persistent MongoDB for production use

4. **Booking Status Terminology**
   - Inconsistent naming: "pending", "confirmed", "rejected", "booked"
   - Could be standardized to: "pending", "confirmed", "rejected", "completed"

5. **Error Messages**
   - Some error messages could be more user-friendly
   - Backend validation messages are sometimes generic

6. **Mobile Responsiveness**
   - UI is responsive but some modals may need adjustment on small screens
   - Testing needed on mobile devices

---

## 13. Future Enhancements

### High Priority

1. **Email Notifications**
   - Send confirmation emails on booking requests
   - Notify owners of new booking inquiries
   - Password reset via email link
   - **Implementation**: Integrate Nodemailer or SendGrid

2. **Payment Integration**
   - Implement Stripe or Razorpay for online payments
   - Payment tracking and invoice generation
   - **Impact**: Enables monetization and trust

3. **User Reviews & Ratings**
   - Allow renters to rate properties and leave reviews
   - Allow owners to rate tenant behavior
   - Display average ratings on property cards
   - **Impact**: Builds trust and helps decision-making

4. **Advanced Search & Filtering**
   - Filter by price range, bedrooms, amenities
   - Sorting options (price low-to-high, newest, most rated)
   - Search by proximity (using location APIs)
   - **Implementation**: Add Algolia or ElasticSearch for better search

### Medium Priority

5. **Property Analytics Dashboard**
   - View count and booking statistics for owners
   - Income tracking and revenue reports
   - Seasonal trends and peak booking periods
   - **Technology**: Chart.js or Recharts for visualization

6. **Chat/Messaging System**
   - Real-time chat between owners and renters
   - Message history and notifications
   - **Technology**: Socket.io for WebSocket connections

7. **Admin Reporting**
   - Generate reports on platform activity
   - Export data in CSV/Excel format
   - Track revenue and user metrics
   - **Implementation**: Use libraries like exceljs or jsPDF

8. **Property Recommendations**
   - AI-powered property suggestions based on user preferences
   - View similar properties
   - **Technology**: Machine learning recommendations engine

### Low Priority

9. **Mobile Application**
   - Native iOS and Android apps using React Native
   - Push notifications for bookings
   - Offline property browsing

10. **Virtual Tours**
    - 360-degree property photos
    - Video walkthrough support
    - **Technology**: Three.js or Matterport API

11. **Advanced Booking Features**
    - Calendar-based booking with date ranges
    - Recurring/monthly rentals
    - Cancellation policies
    - Security deposit handling

12. **Internationalization (i18n)**
    - Multi-language support
    - Currency conversion
    - **Technology**: i18next for translations

13. **SEO Optimization**
    - Meta tags for property listings
    - Sitemap generation
    - Structured data markup
    - **Technology**: Helmet for Express, next/head for React

14. **Performance Optimization**
    - Image optimization and lazy loading
    - API response caching
    - Database query optimization
    - **Tools**: ImageOptim, Redis caching

15. **Security Enhancements**
    - Two-factor authentication (2FA)
    - Rate limiting on API endpoints
    - CAPTCHA on registration/login
    - **Libraries**: speakeasy for 2FA, express-rate-limit

---

## Additional Resources

### Documentation Links
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual)
- [JWT Introduction](https://jwt.io)
- [Tailwind CSS](https://tailwindcss.com)

### Deployment Guides
- **Frontend**: Deploy to Vercel, Netlify, or AWS Amplify
- **Backend**: Deploy to Heroku, Railway, Render, or AWS EC2
- **Database**: Use MongoDB Atlas for cloud database

---

## Support & Contact

For issues, feature requests, or contributions:
- Create an issue on GitHub
- Submit pull requests with improvements
- Follow the project's contributing guidelines

---

**Last Updated**: June 19, 2026  
**Version**: 1.0.0  
**License**: MIT
