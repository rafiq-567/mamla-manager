# ⚖️ MamlaManager - Legal Case Management System

A comprehensive full-stack MERN application for lawyers to manage cases, clients, documents, and track legal proceedings.

## 🌐 Live Demo

**Live Application**: [https://mamla-manager.vercel.app](https://your-actual-url.vercel.app)

**Demo Credentials**:
- Email: `demo@mamlamanager.com`
- Password: `demo123`

## 🚀 Features

### Core Features
- ✅ **Authentication System** - Secure JWT-based authentication with role-based access
- ✅ **Case Management** - Complete CRUD operations for legal cases
- ✅ **Client Management** - Comprehensive client database
- ✅ **Dashboard Analytics** - Visual insights with charts and statistics
- ✅ **Document Management** - Upload and organize case documents
- ✅ **Notifications** - Real-time case updates and hearing reminders
- ✅ **Search & Filtering** - Advanced case and client search

### Advanced Features
1. **Search, Filter & Sort** - Multi-parameter filtering and sorting
2. **Media Handling** - Cloudinary integration for document uploads
3. **Role-Based Access Control** - Admin, Lawyer, and Paralegal roles
4. **Analytics Dashboard** - Interactive charts with Recharts
5. **Advanced Forms** - Zod validation with error handling
6. **Activity & Notifications** - In-app notification system
7. **Reusable Architecture** - Custom hooks and modular components

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Cloudinary
- **Password Hashing**: bcryptjs

### Deployment
- **Platform**: Vercel
- **Database**: MongoDB Atlas

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account (optional)

### Local Development

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/mamla-manager.git
   cd mamla-manager
```

2. **Install dependencies**
```bash
   npm install --legacy-peer-deps
```

3. **Setup environment variables**
   
   Create `.env.local`:
```env
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run development server**
```bash
   npm run dev
```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Project Structure
```
mamla-manager/
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── (dashboard)/         # Dashboard pages
│   ├── api/                 # API routes
│   └── globals.css
├── components/
│   ├── ui/                  # Shadcn components
│   ├── forms/               # Form components
│   └── layout/              # Layout components
├── hooks/                   # Custom React hooks
├── lib/
│   ├── models/              # Mongoose models
│   ├── validations/         # Zod schemas
│   └── utils.ts
├── types/                   # TypeScript types
└── middleware.ts            # Route protection
```

## 📱 Screenshots

[Add screenshots of your application here]

## 🔐 Security Features

- JWT-based authentication
- HTTP-only cookies for token storage
- Password hashing with bcrypt (12 rounds)
- Route protection with middleware
- Role-based access control
- Input validation with Zod
- CSRF protection

## 🚧 Challenges Faced

1. **Real-time Data Sync** - Implemented TanStack Query with cache invalidation
2. **Complex Filtering** - Built dynamic MongoDB queries with indexing
3. **File Management** - Integrated Cloudinary for cloud storage
4. **Role-Based Security** - Multi-layer authorization checks
5. **Form Validation** - Complex nested forms with Zod schemas

## 🎯 Future Improvements

- [ ] Real-time WebSocket notifications
- [ ] AI-powered case outcome prediction
- [ ] Email integration for updates
- [ ] Calendar synchronization
- [ ] Mobile app (React Native)
- [ ] Bengali language support
- [ ] Document OCR and versioning
- [ ] E-signature integration

## 👨‍💻 Developer

**Your Name**
- GitHub: (https://github.com/rafiq-567)
- LinkedIn: (https://www.linkedin.com/in/md-rafiqul-akhter-b39610379/)
- Email: mdrafiqulakhter0@gmail.com

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Vercel](https://vercel.com/)

---

⭐ If you found this project helpful, please give it a star!