# Entity Relationship Diagram for Medical Prescription System

## Entities and Attributes

### User/Account
- UserID (PK)
- Username
- Password
- Email 
- Role (Doctor/Patient/Admin)
- Status
- CreatedAt
- UpdatedAt

### Doctor
- DoctorID (PK)
- UserID (FK)
- FullName
- Specialization
- LicenseNumber
- PhoneNumber
- Address
- Status

### Patient
- PatientID (PK)
- UserID (FK)
- FullName
- DateOfBirth
- Gender
- PhoneNumber
- Address
- MedicalHistory
- Allergies
- Status

### Prescription
- PrescriptionID (PK)
- PatientID (FK)
- DoctorID (FK)
- DiagnosisNotes
- PrescriptionDate
- Status
- CreatedAt
- UpdatedAt

### Medicine
- MedicineID (PK)
- Name
- GenericName
- Category
- Manufacturer
- Description
- Unit
- Status

### PrescriptionDetail
- PrescriptionDetailID (PK)
- PrescriptionID (FK)
- MedicineID (FK)
- Dosage
- Frequency
- Duration
- Instructions
- Quantity
- Status

### Appointment
- AppointmentID (PK)
- PatientID (FK)
- DoctorID (FK)
- AppointmentDate
- TimeSlot
- Status
- Notes
- CreatedAt

## Relationships

1. User-Doctor/Patient (1:1)
- Each User can be either a Doctor or Patient
- Each Doctor/Patient must have one User account

2. Doctor-Prescription (1:N)
- One Doctor can create many Prescriptions
- Each Prescription must be created by one Doctor

3. Patient-Prescription (1:N)
- One Patient can have many Prescriptions
- Each Prescription belongs to one Patient

4. Prescription-PrescriptionDetail (1:N)
- One Prescription can have multiple PrescriptionDetails
- Each PrescriptionDetail belongs to one Prescription

5. Medicine-PrescriptionDetail (1:N)
- One Medicine can be in multiple PrescriptionDetails
- Each PrescriptionDetail must have one Medicine

6. Doctor-Appointment (1:N)
- One Doctor can have many Appointments
- Each Appointment belongs to one Doctor

7. Patient-Appointment (1:N)
- One Patient can have many Appointments
- Each Appointment belongs to one Patient 