# Database & Data Models Documentation

## Database Engine
The platform uses a file-based JSON database engine (`services/api/db.json`) initialized with realistic seed data (`services/api/src/db/initialData.js`). It supports atomic file writes, read queries, item additions, updates, deletions, and audit logging.

## Core Models & Collections
- **`admins`**: `id`, `username`, `email`, `passwordHash`, `name`, `role`
- **`teachers`**: `id`, `name`, `photoUrl`, `qualification`, `department`, `subject`, `experience`, `designation`, `email`, `phone`, `isPublicVisible`, `bio`
- **`students`**: `id`, `admissionNo`, `rollNo`, `name`, `gender`, `dob`, `className`, `section`, `parentName`, `parentPhone`, `parentEmail`, `address`, `status`, `joiningDate`
- **`staff`**: `id`, `staffId`, `name`, `role`, `department`, `email`, `phone`, `joiningDate`, `status`
- **`admissions`**: `id`, `applicantName`, `parentName`, `email`, `phone`, `gradeApplying`, `previousSchool`, `message`, `status`, `createdAt`
- **`academics`**: `id`, `name`, `sections`, `subjects`, `classTeacherId`, `roomNo`
- **`attendance`**: `id`, `date`, `type`, `targetId`, `targetName`, `className`, `status`
- **`examinations`**: `id`, `title`, `term`, `className`, `subject`, `date`, `totalMarks`, `passingMarks`
- **`results`**: `id`, `examId`, `studentId`, `studentName`, `className`, `subject`, `marksObtained`, `maxMarks`, `grade`
- **`fees`**: `id`, `className`, `academicYear`, `tuitionFee`, `admissionFee`, `developmentFee`, `transportFee`, `dueDate`
- **`payments`**: `id`, `receiptNo`, `studentId`, `studentName`, `className`, `amountPaid`, `paymentMethod`, `transactionId`, `paymentDate`, `feeTerm`, `status`
- **`timetable`**: `id`, `day`, `className`, `period`, `subject`, `teacherName`, `roomNo`
- **`notices`**: `id`, `title`, `category`, `content`, `author`, `publishDate`, `isImportant`
- **`news`**: `id`, `title`, `slug`, `summary`, `content`, `imageUrl`, `author`, `publishDate`, `status`
- **`events`**: `id`, `title`, `description`, `date`, `time`, `location`, `category`, `imageUrl`, `isPublic`
- **`gallery`**: `id`, `title`, `category`, `coverImage`, `eventDate`, `images`
- **`achievements`**: `id`, `title`, `category`, `recipientName`, `year`, `description`, `imageUrl`
- **`downloads`**: `id`, `title`, `category`, `fileUrl`, `fileSize`, `uploadedAt`
- **`calendar`**: `id`, `title`, `startDate`, `endDate`, `type`, `description`
- **`enquiries`**: `id`, `name`, `email`, `phone`, `subject`, `message`, `submittedAt`, `status`
- **`siteContent`**: `heroTitle`, `heroSubtitle`, `principalName`, `principalMessage`, `principalImageUrl`, `schoolHistory`, `vision`, `mission`, `coreValues`, `contactAddress`, `contactPhone`, `contactEmail`, `workingHours`, `socialLinks`
- **`settings`**: `schoolName`, `logoUrl`, `currentAcademicYear`, `smtpConfigured`, `maintenanceMode`
- **`auditLogs`**: `id`, `timestamp`, `adminId`, `adminEmail`, `action`, `details`, `ipAddress`
