\# CodeGen Client 🚀



A powerful React-based frontend client for the CodeGen Client APP that enables automated code generation for enterprise applications. This client provides an intuitive interface for connecting to databases, configuring code generation options, and generating complete CRUD applications with React, TypeScript, and .NET backends.



!\[CodeGen Client](https://img.shields.io/badge/React-19.1.0-blue.svg)

!\[TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)

!\[Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.7-purple.svg)

!\[License](https://img.shields.io/badge/License-MIT-green.svg)



\## ✨ Features



\### 🔐 Authentication System

\- \*\*Secure Login/Registration\*\* - JWT-based authentication with user management

\- \*\*Protected Routes\*\* - Role-based access control for code generation features

\- \*\*Session Management\*\* - Automatic token refresh and logout handling



\### 🗄️ Database Integration

\- \*\*Multi-Database Support\*\* - Connect to SQL Server, MySQL, PostgreSQL, and more

\- \*\*Connection Testing\*\* - Validate database connectivity before code generation

\- \*\*Schema Discovery\*\* - Automatic table and column detection with metadata analysis

\- \*\*Real-time Validation\*\* - Live connection status and error handling



\### ⚙️ Code Generation Options

\- \*\*React Component Generation\*\* - Create enterprise-grade CRUD components

\- \*\*API Generation\*\* - Generate .NET Core APIs with proper architecture

\- \*\*Configuration API\*\* - Automated configuration management endpoints

\- \*\*Custom Templates\*\* - Liquid templating system for customizable output



\### 🎨 User Interface

\- \*\*Responsive Design\*\* - Mobile-first Bootstrap 5 interface

\- \*\*Interactive Forms\*\* - Dynamic form generation with validation

\- \*\*Progress Tracking\*\* - Real-time generation status and progress indicators

\- \*\*Error Handling\*\* - Comprehensive error messages and recovery options



\## 🚀 Quick Start



\### Prerequisites



\- \*\*Node.js\*\* 16.x or higher

\- \*\*npm\*\* or \*\*yarn\*\* package manager

\- \*\*CodeGen API\*\* server running (see backend setup)



\### Installation



1\. \*\*Clone the repository\*\*

&nbsp;  ```bash

&nbsp;  git clone https://github.com/yourusername/CodeGenerator.git

&nbsp;  cd CodeGenerator/codegen-client

&nbsp;  ```



2\. \*\*Install dependencies\*\*

&nbsp;  ```bash

&nbsp;  npm install

&nbsp;  # or

&nbsp;  yarn install

&nbsp;  ```



3\. \*\*Configure environment variables\*\*

&nbsp;  ```bash

&nbsp;  # Create .env file in the root directory

&nbsp;  REACT\_APP\_API\_BASE\_URL=http://localhost:5000/api

&nbsp;  REACT\_APP\_CLIENT\_URL=http://localhost:3001

&nbsp;  ```



4\. \*\*Start the development server\*\*

&nbsp;  ```bash

&nbsp;  npm start

&nbsp;  ```



5\. \*\*Open your browser\*\*

&nbsp;  ```

&nbsp;  Navigate to http://localhost:3001

&nbsp;  ```



\## 📁 Project Structure



```

codegen-client/

├── public/                 # Static assets

│   ├── index.html         # Main HTML template

│   ├── favicon.ico        # Application icon

│   └── manifest.json      # PWA configuration

├── src/

│   ├── components/        # Reusable UI components

│   │   ├── ConfigurationApiGenerationOptions.tsx

│   │   ├── DatabaseConnection.tsx

│   │   ├── Navbar.tsx

│   │   └── ReactGenerationOptions.tsx

│   ├── pages/            # Main application pages

│   │   ├── HomePage.tsx

│   │   ├── LoginPage.tsx

│   │   └── RegisterPage.tsx

│   ├── services/         # API and business logic

│   │   ├── api.ts

│   │   ├── authService.ts

│   │   ├── codeGenerationService.ts

│   │   └── databaseService.ts

│   ├── types/           # TypeScript type definitions

│   │   ├── auth.ts

│   │   ├── codeGeneration.ts

│   │   ├── database.ts

│   │   └── index.ts

│   ├── App.tsx          # Main application component

│   ├── App.css          # Global styles

│   └── index.tsx        # Application entry point

├── package.json         # Dependencies and scripts

├── tsconfig.json        # TypeScript configuration

└── README.md           # This file

```



\## 🔧 Available Scripts



\### Development Commands



```bash

\# Start development server on port 3001

npm start



\# Run tests in interactive watch mode

npm test



\# Build production bundle

npm run build



\# Run ESLint for code quality

npm run lint



\# Type checking

npm run type-check

```



\### Production Deployment



```bash

\# Build optimized production bundle

npm run build



\# Serve production build locally (for testing)

npx serve -s build -l 3001

```



\## 🛠️ Configuration



\### Environment Variables



Create a `.env` file in the project root:



```env

\# API Configuration

REACT\_APP\_API\_BASE\_URL=http://localhost:5000/api

REACT\_APP\_CLIENT\_URL=http://localhost:3001



\# Authentication

REACT\_APP\_JWT\_SECRET=your-jwt-secret

REACT\_APP\_TOKEN\_EXPIRY=24h



\# Database Connection Defaults

REACT\_APP\_DEFAULT\_DB\_HOST=localhost

REACT\_APP\_DEFAULT\_DB\_PORT=1433



\# Feature Flags

REACT\_APP\_ENABLE\_REGISTRATION=true

REACT\_APP\_ENABLE\_GUEST\_MODE=false

```



\### API Endpoints



The client connects to the following backend endpoints:



```typescript

// Authentication

POST /api/auth/login

POST /api/auth/register

POST /api/auth/refresh



// Database Operations

POST /api/database/test-connection

GET  /api/database/tables

GET  /api/database/schema/:tableName



// Code Generation

POST /api/codegen/generate-react

POST /api/codegen/generate-api

POST /api/codegen/generate-config

GET  /api/codegen/templates

```



\## 🎯 Usage Guide



\### 1. Authentication

\- Register a new account or login with existing credentials

\- JWT tokens are automatically managed and refreshed

\- Protected routes require authentication



\### 2. Database Connection

\- Enter your database connection details

\- Test the connection before proceeding

\- Support for multiple database providers



\### 3. Code Generation

\- Select tables for code generation

\- Choose generation options (React, API, Configuration)

\- Configure naming conventions and output paths

\- Generate and download your code



\### 4. Generated Code Features

\- \*\*Enterprise-grade React components\*\* with full CRUD operations

\- \*\*Redux Toolkit integration\*\* for state management

\- \*\*Ant Design components\*\* for professional UI

\- \*\*TypeScript interfaces\*\* with proper typing

\- \*\*.NET Core APIs\*\* with clean architecture

\- \*\*Bulk operations\*\* and advanced filtering

\- \*\*Responsive design\*\* and accessibility features



\## 🧪 Testing



\### Running Tests



```bash

\# Run all tests

npm test



\# Run tests with coverage

npm test -- --coverage



\# Run tests in CI mode

npm test -- --ci --watchAll=false

```



\### Test Structure



```

src/

├── components/

│   └── \_\_tests\_\_/

├── services/

│   └── \_\_tests\_\_/

├── pages/

│   └── \_\_tests\_\_/

└── setupTests.ts

```



\## 🚢 Deployment



\### Building for Production



```bash

\# Create optimized production build

npm run build



\# The build folder contains:

\# - Minified and optimized JavaScript bundles

\# - CSS files with vendor prefixes

\# - Static assets with cache-busting hashes

\# - Service worker for offline functionality

```



\### Deployment Options



\#### \*\*Netlify\*\*

```bash

\# Install Netlify CLI

npm install -g netlify-cli



\# Deploy to Netlify

npm run build

netlify deploy --prod --dir=build

```



\#### \*\*Vercel\*\*

```bash

\# Install Vercel CLI

npm install -g vercel



\# Deploy to Vercel

npm run build

vercel --prod

```



\#### \*\*Docker\*\*

```dockerfile

\# Dockerfile

FROM node:16-alpine as build

WORKDIR /app

COPY package\*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build



FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD \["nginx", "-g", "daemon off;"]

```



\## 🤝 Contributing



We welcome contributions! Please follow these guidelines:



\### Development Setup



1\. \*\*Fork the repository\*\*

2\. \*\*Create a feature branch\*\*

&nbsp;  ```bash

&nbsp;  git checkout -b feature/amazing-feature

&nbsp;  ```

3\. \*\*Install dependencies\*\*

&nbsp;  ```bash

&nbsp;  npm install

&nbsp;  ```

4\. \*\*Make your changes\*\*

5\. \*\*Run tests\*\*

&nbsp;  ```bash

&nbsp;  npm test

&nbsp;  ```

6\. \*\*Commit your changes\*\*

&nbsp;  ```bash

&nbsp;  git commit -m "Add amazing feature"

&nbsp;  ```

7\. \*\*Push to your branch\*\*

&nbsp;  ```bash

&nbsp;  git push origin feature/amazing-feature

&nbsp;  ```

8\. \*\*Open a Pull Request\*\*



\### Code Style



\- Use \*\*TypeScript\*\* for all new code

\- Follow \*\*ESLint\*\* and \*\*Prettier\*\* configurations

\- Write \*\*unit tests\*\* for new features

\- Use \*\*semantic commit messages\*\*

\- Document \*\*public APIs\*\* with JSDoc comments



\## 📚 Documentation



\### Additional Resources



\- \[CodeGen API Documentation](../CodeGen.Api/README.md)

\- \[Architecture Guide](../Frontend/ARCHITECTURE\_GUIDE.md)

\- \[Development Setup](../Frontend/SETUP.md)

\- \[Performance Guide](../Frontend/PERFORMANCE\_OPTIMIZATION\_GUIDE.md)



\### API Reference



The client uses a strongly-typed API layer built with Axios:



```typescript

// Example API usage

import { databaseService } from './services/databaseService';



// Test database connection

const result = await databaseService.testConnection({

&nbsp; host: 'localhost',

&nbsp; port: 1433,

&nbsp; database: 'MyDatabase',

&nbsp; username: 'sa',

&nbsp; password: 'password'

});

```



\## 🐛 Troubleshooting



\### Common Issues



\#### \*\*Port Already in Use\*\*

```bash

\# Find process using port 3001

lsof -i :3001



\# Kill the process

kill -9 <PID>



\# Or use a different port

PORT=3002 npm start

```



\#### \*\*API Connection Issues\*\*

\- Verify the backend API is running

\- Check CORS configuration

\- Validate environment variables

\- Review network connectivity



\#### \*\*Build Failures\*\*

```bash

\# Clear npm cache

npm cache clean --force



\# Delete node\_modules and reinstall

rm -rf node\_modules

npm install



\# Check for TypeScript errors

npm run type-check

```



\## 📄 License



This project is licensed under the MIT License - see the \[LICENSE](LICENSE) file for details.



\## 🙏 Acknowledgments



\- \*\*React Team\*\* for the amazing framework

\- \*\*TypeScript Team\*\* for type safety

\- \*\*Bootstrap Team\*\* for responsive design

\- \*\*Axios Team\*\* for HTTP client

\- \*\*Testing Library\*\* for testing utilities



\## 📞 Support



\- \*\*GitHub Issues\*\*: \[Report bugs and request features](https://github.com/yourusername/CodeGenerator/issues)

\- \*\*Documentation\*\*: \[Full documentation](https://your-docs-site.com)

\- \*\*Email\*\*: support@yourproject.com



---



<div align="center">

&nbsp; <p>Built with ❤️ by the CodeGen Team</p>

&nbsp; <p>⭐ Star this repo if you find it helpful!</p>

</div>



