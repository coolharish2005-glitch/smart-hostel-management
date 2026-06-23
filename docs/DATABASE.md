# Database Schema

## User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  phone: String (required),
  role: String (enum: ['resident', 'admin', 'staff'], default: 'resident'),
  status: String (enum: ['active', 'inactive', 'suspended'], default: 'active'),
  profilePicture: String,
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

## Room Model
```javascript
{
  _id: ObjectId,
  roomNumber: String (required, unique),
  floor: Number (required),
  capacity: Number (required, default: 2),
  occupants: [ObjectId] (ref: User),
  amenities: [String],
  rentAmount: Number (required),
  status: String (enum: ['available', 'occupied', 'maintenance'], default: 'available'),
  images: [String],
  description: String,
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

## Complaint Model
```javascript
{
  _id: ObjectId,
  residentId: ObjectId (ref: User, required),
  roomId: ObjectId (ref: Room),
  title: String (required),
  description: String (required),
  category: String (enum: ['maintenance', 'cleanliness', 'noise', 'security', 'other'], required),
  priority: String (enum: ['low', 'medium', 'high', 'urgent'], default: 'medium'),
  status: String (enum: ['open', 'in-progress', 'resolved', 'closed'], default: 'open'),
  images: [String],
  assignedTo: ObjectId (ref: User),
  resolution: String,
  createdAt: Date (default: now),
  resolvedAt: Date,
  updatedAt: Date (default: now)
}
```

## Fee Model
```javascript
{
  _id: ObjectId,
  residentId: ObjectId (ref: User, required),
  roomId: ObjectId (ref: Room, required),
  amount: Number (required),
  feeType: String (enum: ['rent', 'electricity', 'water', 'maintenance', 'other'], default: 'rent'),
  month: Date (required),
  dueDate: Date (required),
  status: String (enum: ['pending', 'paid', 'overdue', 'cancelled'], default: 'pending'),
  paidDate: Date,
  paymentMethod: String (enum: ['online', 'cash', 'cheque', 'transfer'], default: 'online'),
  transactionId: String,
  notes: String,
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

## Announcement Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  content: String (required),
  author: ObjectId (ref: User, required),
  category: String (enum: ['maintenance', 'event', 'fee', 'security', 'general'], default: 'general'),
  priority: String (enum: ['low', 'medium', 'high', 'urgent'], default: 'medium'),
  targetAudience: String (enum: ['all', 'residents', 'staff', 'admin'], default: 'all'),
  isActive: Boolean (default: true),
  image: String,
  publishedAt: Date (default: now),
  expiresAt: Date,
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

## Relationships

- **User** --(one-to-many)--> **Complaint**: One user can have multiple complaints
- **User** --(one-to-many)--> **Fee**: One user can have multiple fees
- **User** --(one-to-many)--> **Announcement**: One admin can create multiple announcements
- **Room** --(one-to-many)--> **Complaint**: One room can have multiple complaints
- **Room** --(one-to-many)--> **Fee**: One room can have multiple fees
- **Room** --(many-to-many)--> **User**: Multiple users can occupy one room

## Indexes

- User: `email` (unique), `role`
- Room: `roomNumber` (unique), `status`
- Complaint: `residentId`, `status`, `createdAt`
- Fee: `residentId`, `status`, `dueDate`
- Announcement: `isActive`, `publishedAt`
