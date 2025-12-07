# 🌐 Translation Management Tool (TMT)

<div align="center">
  <p><strong>A Modern Multilingual Translation Platform</strong></p>
  <p>Manage and auto-generate translations across multiple languages with ease</p>
</div>

---

## 🤖 Introduction

**Translation Management Tool (TMT)** is a powerful, full-stack MERN application designed to simplify the process of managing multilingual content. Built with modern web technologies, TMT provides an intuitive interface for creating, editing, and organizing translations across multiple languages.

### What Makes TMT Special?

- **AI-Powered Translations**: Automatically generate translations using LibreTranslate API with MyMemory fallback
- **Real-Time Updates**: Instant database synchronization using MongoDB
- **Multi-Language Support**: Built-in support for Hindi, Bengali, and Spanish with extensibility for more
- **Smart Search**: Quickly find translations by key or content
- **User-Friendly Interface**: Beautiful, responsive UI with gradient themes and smooth animations
- **RESTful API**: Well-structured API endpoints for easy integration
- **Scalable Architecture**: Modular codebase designed for growth and maintenance

Whether you're managing a small project or enterprise-level application, TMT provides a reliable, efficient solution for all your translation needs.

## 🌍 **Live Demo**

🔗 **Visit the live application:** [translation-tool-l25e.vercel.app](https://translation-tool-l25e.vercel.app/)

---

## ✨ Key Features

### 🌐 **Translation Management**
- Add new translation keys with English text
- Auto-generate translations for 3 languages (Hindi, Bengali, Spanish)
- Edit existing translations with inline editing
- Delete unwanted translations
- View all translations in a responsive card grid
- Timestamps for tracking creation and updates

### 🔍 **Smart Search**
- Search by translation key
- Search by English content
- Real-time search results
- Clear search functionality
- Case-insensitive matching
- Regex-based search patterns

### 🌍 **Multi-Language Support**
- **English (en)**: Source language
- **Hindi (hi)**: Devanagari script support
- **Bengali (bn)**: Bengali script support
- **Spanish (es)**: Full Spanish language support
- **Extensible**: Add custom languages dynamically

### 🎨 **Beautiful UI**
- Modern gradient design (Purple theme)
- Responsive card layout
- Smooth animations and transitions
- Language badge indicators
- Loading states and error handling
- Mobile-friendly interface
- Toast notifications

### 🔄 **Auto-Translation**
- Powered by LibreTranslate API (primary)
- MyMemory API fallback for reliability
- Supports ANY text input
- Real-time translation generation
- Smart error handling
- Parallel translation processing

### 📊 **Database Management**
- MongoDB integration with Mongoose
- Schema validation
- Indexing for fast text searches
- Timestamps for tracking
- Flexible schema for new languages
- Unique key constraints

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| ⚛️ **React.js** | 18.2+ | Core UI library for building interactive components |
| ⚡ **Vite** | 5.0+ | Lightning-fast build tool and dev server |
| 🌐 **Axios** | 1.6+ | HTTP client for API requests |
| 🎨 **Custom CSS** | - | Beautiful gradient UI with animations |

### **Backend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| 🚀 **Node.js** | 16+ | JavaScript runtime environment |
| 🚂 **Express.js** | 4.18+ | Fast and minimalist web framework |
| 🗄️ **MongoDB** | 8.0+ | NoSQL database for flexible data storage |
| 🔗 **Mongoose** | 8.0+ | Elegant MongoDB object modeling |
| 🌐 **CORS** | 2.8+ | Cross-Origin Resource Sharing |
| 🔧 **dotenv** | 16.3+ | Environment variable management |
| 🔄 **Nodemon** | 3.0+ | Auto-restart during development |
| 🌍 **LibreTranslate API** | - | Free translation API service |
| 🔤 **MyMemory API** | - | Translation API fallback |

---

## 📁 Detailed Project Structure

```
📦 translation-tool/
│
├── 📂 backend/                      # Express.js backend application
│   ├── 📂 config/                   # Configuration files
│   │   └── 📄 db.js                 # MongoDB connection setup
│   │
│   ├── 📂 models/                   # Database models
│   │   └── 📄 Translation.js        # Translation schema with multilingual support
│   │
│   ├── 📂 routes/                   # API routes
│   │   └── 📄 translations.js       # Translation CRUD endpoints + auto-translate
│   │
│   ├── 📄 .env                      # Environment variables (not in git)
│   ├── 📄 .gitignore                # Git ignore rules
│   ├── 📄 package.json              # Backend dependencies and scripts
│   └── 📄 server.js                 # Express server setup and middleware
│
├── 📂 frontend/                     # React frontend application
│   ├── 📂 public/                   # Static assets
│   │
│   ├── 📂 src/                      # Source code
│   │   │
│   │   ├── 📂 api/                  # API integration
│   │   │   └── 📄 api.js            # Axios API calls to backend
│   │   │
│   │   ├── 📂 components/           # Reusable React components
│   │   │   ├── 📄 AddTranslation.jsx        # Form to add new translations
│   │   │   ├── 📄 TranslationList.jsx       # Display all translations with search
│   │   │   └── 📄 EditTranslation.jsx       # Modal for editing translations
│   │   │
│   │   ├── 📄 App.jsx               # Main application component
│   │   ├── 📄 main.jsx              # React entry point
│   │   └── 📄 styles.css            # Global styles with gradients
│   │
│   ├── 📄 .gitignore                # Git ignore rules
│   ├── 📄 index.html                # HTML entry point
│   ├── 📄 package.json              # Frontend dependencies and scripts
│   └── 📄 vite.config.js            # Vite build configuration with proxy
│
└── 📄 README.md                     # Project documentation
```

---

## 📋 API Endpoints

### **Translation Routes** (`/api/translations`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create a new translation with auto-generation | ❌ |
| GET | `/` | Get all translations or search by query | ❌ |
| GET | `/:id` | Get a single translation by ID | ❌ |
| PUT | `/:id` | Update an existing translation | ❌ |
| DELETE | `/:id` | Delete a translation | ❌ |
| POST | `/:id/languages` | Add a new language to existing translation | ❌ |

### **Request/Response Examples**

#### Create Translation
```http
POST /api/translations
Content-Type: application/json

{
  "key": "test.random",
  "english": "I love programming"
}
```

**Response:**
```json
{
  "_id": "675456a7b8c9d0e1f2345678",
  "key": "test.random",
  "translations": {
    "en": "I love programming",
    "hi": "मुझे प्रोग्रामिंग पसंद है",
    "bn": "আমি প্রোগ্রামিং ভালোবাসি",
    "es": "Me encanta programar"
  },
  "availableLanguages": ["en", "hi", "bn", "es"],
  "createdAt": "2025-12-07T10:30:00.000Z",
  "updatedAt": "2025-12-07T10:30:00.000Z"
}
```

#### Search Translations
```http
GET /api/translations?search=programming
```

**Response:**
```json
[
  {
    "_id": "675456a7b8c9d0e1f2345678",
    "key": "test.random",
    "translations": {
      "en": "I love programming",
      "hi": "मुझे प्रोग्रामिंग पसंद है",
      "bn": "আমি প্রোগ্রামিং ভালোবাসি",
      "es": "Me encanta programar"
    },
    "createdAt": "2025-12-07T10:30:00.000Z"
  }
]
```

---

## 🔧 Environment Variables

### **Backend Environment Variables** (`backend/.env`)

Create a `.env` file in the `backend` directory with the following variables:

```bash
# Server Configuration
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/translation-tool
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/translation-tool?retryWrites=true&w=majority

# CORS Configuration (optional)
CLIENT_URL=http://localhost:3000
```

### **Frontend Configuration**

The frontend is configured to proxy API requests through Vite. No environment variables needed!

---

## 🚀 Installation & Setup

### **Prerequisites**

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

### **Step 1: Clone the Repository**

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd translation-tool
```

### **Step 2: Backend Setup**

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the environment variables from the section above

# Start MongoDB (if using local installation)
# Windows: Start MongoDB service
# Mac/Linux: mongod

# Start the development server
npm run dev
```

The backend server will start on `http://localhost:5000`

### **Step 3: Frontend Setup**

Open a new terminal window and run:

```bash
# Navigate to the frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will start on `http://localhost:3000`

### **Step 4: Access the Application**

Open your browser and navigate to `http://localhost:3000`

---

## 🎯 Usage Guide & Testing Examples

### **1. Adding Translations**

Use these example inputs to test the auto-translation feature:

#### Example 1: Greeting
```
Translation Key: greeting.hello
English Value: Hello! Welcome to our platform
```
**Expected Output:**
```json
{
  "key": "greeting.hello",
  "translations": {
    "en": "Hello! Welcome to our platform",
    "hi": "नमस्ते! हमारे प्लेटफॉर्म पर आपका स्वागत है",
    "bn": "হ্যালো! আমাদের প্ল্যাটফর্মে স্বাগতম",
    "es": "¡Hola! Bienvenido a nuestra plataforma"
  }
}
```

#### Example 2: User Actions
```
Translation Key: user.login
English Value: Login Successful
```
**Expected Output:**
```json
{
  "key": "user.login",
  "translations": {
    "en": "Login Successful",
    "hi": "लॉगिन सफल",
    "bn": "লগইন সফল",
    "es": "Inicio de sesión exitoso"
  }
}
```

#### Example 3: Random Text
```
Translation Key: test.random
English Value: I love programming
```
**Expected Output:**
```json
{
  "key": "test.random",
  "translations": {
    "en": "I love programming",
    "hi": "मुझे प्रोग्रामिंग पसंद है",
    "bn": "আমি প্রোগ্রামিং ভালোবাসি",
    "es": "Me encanta programar"
  }
}
```

#### Example 4: Error Messages
```
Translation Key: error.not_found
English Value: Page not found
```
**Expected Output:**
```json
{
  "key": "error.not_found",
  "translations": {
    "en": "Page not found",
    "hi": "पृष्ठ नहीं मिला",
    "bn": "পৃষ্ঠা পাওয়া যায়নি",
    "es": "Página no encontrada"
  }
}
```

#### Example 5: Button Labels
```
Translation Key: button.submit
English Value: Submit
```
**Expected Output:**
```json
{
  "key": "button.submit",
  "translations": {
    "en": "Submit",
    "hi": "सबमिट करें",
    "bn": "জমা দিন",
    "es": "Enviar"
  }
}
```

### **2. Searching Translations**

- Enter a keyword in the search box (e.g., "hello", "login", "submit")
- Click "Search" button or press Enter
- Results will filter in real-time
- Click "Clear" to reset the search

### **3. Editing Translations**

- Click the "Edit" button on any translation card
- Modify the key or any translation values
- Add new languages using the "Add New Language" button
- Example: Add Italian (it), Japanese (ja), or any language code
- Click "Save Changes" to update

### **4. Deleting Translations**

- Click "Edit" on a translation
- Click the "Delete" button
- Confirm the deletion
- Translation will be removed from the database

### **5. Adding Custom Languages**

In the Edit modal:
1. Click "+ Add New Language"
2. Enter language code (e.g., `it`, `pt`, `ja`, `fr`)
3. Enter the translation value
4. Click "Add Language"

---

## 📦 Available Scripts

### **Frontend Scripts**

```bash
npm run dev       # Start development server (http://localhost:3000)
npm run build     # Build for production
npm run preview   # Preview production build
```

### **Backend Scripts**

```bash
npm run dev       # Start development server with nodemon (auto-restart)
npm start         # Start production server
```

---

## 🎨 Translation Key Naming Conventions

For better organization, follow these naming patterns:

| Category | Pattern | Example |
|----------|---------|---------|
| Greetings | `greeting.*` | `greeting.hello`, `greeting.goodbye` |
| User Actions | `user.*` | `user.login`, `user.logout`, `user.register` |
| Buttons | `button.*` | `button.submit`, `button.cancel`, `button.save` |
| Errors | `error.*` | `error.not_found`, `error.invalid_input` |
| Messages | `message.*` | `message.success`, `message.warning` |
| App Content | `app.*` | `app.welcome`, `app.title`, `app.description` |

---

## 🐛 Known Issues & Troubleshooting

### **Common Issues**

**Issue 1: MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- **Solution**: Ensure MongoDB is running
  - Windows: Start MongoDB service from Services
  - Mac: `brew services start mongodb-community`
  - Linux: `sudo systemctl start mongod`
- Or use MongoDB Atlas cloud database

**Issue 2: Translation API Timeout**
```
Translation error: timeout of 8000ms exceeded
```
- **Solution**: This is normal for slow networks. The app will return the original English text as fallback.
- Both LibreTranslate and MyMemory APIs have timeouts built-in

**Issue 3: CORS Error**
```
Access to XMLHttpRequest blocked by CORS policy
```
- **Solution**: Check if backend is running on port 5000
- Verify frontend proxy configuration in `vite.config.js`

**Issue 4: Port Already in Use**
```
Error: Port 5000 is already in use
```
- **Solution**: Change PORT in backend `.env` file
- Or kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:5000 | xargs kill
  ```

---

## 🚀 Deployment

### **Frontend Deployment (Vercel/Netlify)**

#### Vercel
1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com/) and sign in
3. Import your repository
4. Set root directory to `frontend`
5. Build command: `npm run build`
6. Output directory: `dist`
7. Update API URL in your code to point to deployed backend
8. Deploy!

#### Netlify
1. Push your code to GitHub
2. Visit [Netlify](https://www.netlify.com/) and sign in
3. New site from Git
4. Select your repository
5. Base directory: `frontend`
6. Build command: `npm run build`
7. Publish directory: `dist`
8. Deploy!

### **Backend Deployment (Render/Railway/Heroku)**

#### Render
1. Push your code to GitHub
2. Visit [Render](https://render.com/) and sign in
3. New Web Service
4. Connect GitHub repository
5. Root directory: `backend`
6. Build command: `npm install`
7. Start command: `npm start`
8. Add environment variables (MONGODB_URI, PORT)
9. Deploy!

#### Railway
1. Push your code to GitHub
2. Visit [Railway](https://railway.app/) and sign in
3. New Project → Deploy from GitHub repo
4. Select your repository
5. Root directory: `backend`
6. Add environment variables
7. Deploy!

### **Database (MongoDB Atlas)**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster (M0)
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (all IPs) for development
5. Get connection string
6. Update `MONGODB_URI` in backend environment variables

---

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes**
4. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
5. **Push to the branch** (`git push origin feature/AmazingFeature`)
6. **Open a Pull Request**

### **Development Guidelines**

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation if needed
- Keep pull requests focused and small

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [LibreTranslate](https://libretranslate.com/) for providing free translation API
- [MyMemory](https://mymemory.translated.net/) for translation API fallback
- [MongoDB](https://www.mongodb.com/) for excellent database solution
- [Vite](https://vitejs.dev/) for lightning-fast build tool
- [React](https://react.dev/) for powerful UI library

---

## 📧 Contact & Support

If you have any questions, suggestions, or issues, please:

- Open an issue on GitHub
- ⭐ Star this repository if you find it helpful!

---

## 🎓 Assignment Information

This project was created as part of the **MERN Stack Internship Assignment** for **ClearQuote**.

### **Assignment Requirements Met:**

✅ **Node.js / Express fundamentals** - RESTful API with proper routing and middleware  
✅ **MongoDB schema design & CRUD operations** - Flexible schema with full CRUD functionality  
✅ **React UI development** - Component-based architecture with hooks  
✅ **Workflow and debugging** - Error handling, API fallbacks, logging  
✅ **Clarity in explanation** - Comprehensive README with examples  
✅ **Bonus: Add new language** - Dynamic language addition feature  
✅ **Bonus: UI enhancements** - Gradient design, animations, responsive layout  

---

<div align="center">
  <p>Made with ❤️ for ClearQuote Internship Assignment</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
