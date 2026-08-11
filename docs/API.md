# REST API Specification (`services/api`)

## Base URLs
- Public API: `http://localhost:5000/api/v1/public`
- Admin API:  `http://localhost:5000/api/v1/admin`

## Public Endpoints (Unauthenticated)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/site-content` | Returns CMS text, principal message, vision & mission |
| GET | `/faculty` | Returns public teacher profiles (`isPublicVisible: true`) |
| GET | `/notices` | Returns official notices and circulars |
| GET | `/events` | Returns upcoming public events |
| GET | `/news` | Returns published news articles |
| GET | `/gallery` | Returns photo/video albums |
| GET | `/achievements` | Returns student & school awards |
| GET | `/downloads` | Returns downloadable circulars & forms |
| GET | `/calendar` | Returns academic calendar dates & holidays |
| GET | `/faqs` | Returns FAQ questions & answers |
| POST | `/enquiry` | Submits a new admission enquiry |
| POST | `/contact` | Submits a public contact message |
| POST | `/ai-assistant` | Returns AI chatbot answers to visitor queries |

## Admin Endpoints (Require `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | Authenticate admin (`username` & `password`) |
| GET | `/auth/me` | Get active admin session info |
| GET | `/dashboard/stats` | Get dashboard stats (students, revenue, admissions) |
| GET/POST/PUT/DELETE | `/students` | Student records CRUD |
| GET/POST/PUT/DELETE | `/teachers` | Faculty records CRUD & public visibility toggle |
| GET/POST/PUT/DELETE | `/staff` | Non-teaching staff CRUD |
| GET/POST/PUT/DELETE | `/admissions` | Review & approve admission applications |
| GET/POST/PUT/DELETE | `/academics` | Manage classes, sections & subjects |
| GET/POST/PUT/DELETE | `/attendance` | Track student & teacher attendance |
| GET/POST/PUT/DELETE | `/examinations` | Manage exam timetables & student marks |
| GET/POST/PUT/DELETE | `/fees` | Fee structures & payment transactions CRUD |
| GET/POST/PUT/DELETE | `/timetable` | Class & period schedules CRUD |
| GET/POST/PUT/DELETE | `/events` | Events CMS CRUD |
| GET/POST/PUT/DELETE | `/notices` | Notices CMS CRUD |
| GET/POST/PUT/DELETE | `/news` | News CMS CRUD |
| GET/POST/PUT/DELETE | `/gallery` | Gallery albums CRUD |
| GET/POST/PUT/DELETE | `/achievements` | Achievements CMS CRUD |
| GET/POST/PUT/DELETE | `/downloads` | Downloads CMS CRUD |
| GET/POST/PUT/DELETE | `/calendar` | Academic calendar dates CRUD |
| GET/POST/PUT/DELETE | `/enquiries` | Manage contact form submissions |
| GET/PUT | `/cms` | Fetch / Update public website CMS content |
| GET/PUT | `/settings` | Fetch / Update system branding & settings |
| GET | `/audit-logs` | Fetch admin security audit log |
