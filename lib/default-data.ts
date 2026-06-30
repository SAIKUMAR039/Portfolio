import { PortfolioData } from "@/types/portfolio";

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: "Sai Kumar Thota",
    role: "Full Stack Engineer",
    exp: "9 months production internship",
    superpower: "AI-assisted development",
    status: "Open to work 🟢",
    email: "saikumarthota2004@gmail.com",
    phone: "+91 90590 81173",
    location: "Hyderabad, India"
  },
  socials: {
    github: "https://github.com/SAIKUMAR039",
    linkedin: "https://www.linkedin.com/in/sai-kumar-thota-101764252/"
  },
  skills: [
    {
      name: "Languages",
      themeColor: "slate",
      summaryCode: `{\n  "category": "Programming Languages",\n  "featured": ["TypeScript", "Python", "SQL"],\n  "totalLanguages": 7,\n  "compilationEngine": "Node.js / JVM / Python Interpreter",\n  "typeSafetyStatus": "Enforced strictly"\n}`,
      skills: [
        {
          name: "TypeScript",
          fileName: "typescript.ts",
          category: "Languages",
          themeColor: "slate",
          proficiency: 92,
          experience: "3+ Years",
          description: "Robust type-safety configuration, generic design patterns, static analysis, and large codebase architecture.",
          keyConcepts: ["Generics & Utility Types", "Declaration Merging", "Strict Compiler Configuration"],
          code: `// Advanced type gymnastics for robust applications\ntype Developer = {\n  name: "Sai Kumar Thota";\n  role: "Full Stack Engineer";\n  specialty: "TypeScript";\n};\n\nexport type SkillLevel<T> = T extends "TypeScript" \n  ? "Expert" \n  : "Proficient";\n\nconst status: SkillLevel<"TypeScript"> = "Expert";`
        },
        {
          name: "JavaScript",
          fileName: "javascript.js",
          category: "Languages",
          themeColor: "slate",
          proficiency: 95,
          experience: "4+ Years",
          description: "Deep knowledge of modern ECMAScript specifications (ES6+), Event Loop mechanics, scopes, closures, and async patterns.",
          keyConcepts: ["Event Loop & Async I/O", "Lexical Scoping & Closures", "Prototypal Inheritance"],
          code: `// Core logic and async execution flow\nasync function fetchSkillMetrics(developer) {\n  try {\n    const data = await Promise.race([\n      database.query(developer.id),\n      timeout(1000)\n    ]);\n    return { status: 200, data };\n  } catch (error) {\n    console.error("Fetch failed:", error);\n    return null;\n  }\n}`
        },
        {
          name: "Python",
          fileName: "python.py",
          category: "Languages",
          themeColor: "slate",
          proficiency: 90,
          experience: "3+ Years",
          description: "Scripts modeling, automation scripts, machine learning libraries orchestration, and Django/FastAPI web frameworks.",
          keyConcepts: ["Decorators & Generators", "AI/ML Ecosystem (NumPy/Pandas)", "WSGI / ASGI Deployments"],
          code: `# Clean scripting and AI model wrappers\ndef timing_decorator(func):\n    import time\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"Elapsed: {time.time() - start:.4f}s")\n        return result\n    return wrapper\n\n@timing_decorator\ndef run_prediction(data):\n    # ML inference pipeline\n    return model.predict(data)`
        },
        {
          name: "SQL",
          fileName: "sql.sql",
          category: "Languages",
          themeColor: "slate",
          proficiency: 88,
          experience: "3+ Years",
          description: "Relational database schema modeling, optimized query plans, indexing strategies, complex joins, and aggregate functions.",
          keyConcepts: ["Window Functions", "Index Optimization", "Transaction Isolation States"],
          code: `-- Optimized data retrieval query\nSELECT \n  s.skill_name,\n  c.category_name,\n  AVG(s.proficiency) OVER(PARTITION BY c.category_id) as cat_avg\nFROM skills s\nINNER JOIN categories c ON s.category_id = c.id\nWHERE s.proficiency >= 80\nORDER BY s.proficiency DESC;`
        },
        {
          name: "Java",
          fileName: "java.java",
          category: "Languages",
          themeColor: "slate",
          proficiency: 75,
          experience: "2+ Years",
          description: "Object-oriented software development paradigms, multithreading control, memory management basics, and MVC Spring Boot patterns.",
          keyConcepts: ["Object-Oriented Design", "Multithreaded Execution", "JVM Performance Tuning"],
          code: `// Object-oriented design patterns\npublic class DeveloperPortfolio {\n    private String owner = "Sai Kumar Thota";\n    private List<String> skills;\n\n    public DeveloperPortfolio() {\n        this.skills = new ArrayList<>();\n    }\n\n    public synchronized void addSkill(String skillName) {\n        this.skills.add(skillName);\n    }\n}`
        },
        {
          name: "HTML5",
          fileName: "html.html",
          category: "Languages",
          themeColor: "slate",
          proficiency: 95,
          experience: "4+ Years",
          description: "Semantic document architectures, accessibility compliance (WCAG 2.1 AA), and robust meta tags configurations for SEO optimization.",
          keyConcepts: ["Semantic Elements", "WCAG Accessibility standards", "Meta Tags & SEO structure"],
          code: `<!-- Clean, semantic document outline -->\n<article class="portfolio-card" aria-labelledby="card-title">\n  <header>\n    <h3 id="card-title">Sai Kumar Thota</h3>\n    <p>Full Stack Engineer</p>\n  </header>\n  <main>\n    <p>Building high-fidelity web experiences.</p>\n  </main>\n</article>`
        },
        {
          name: "CSS3",
          fileName: "css.css",
          category: "Languages",
          themeColor: "slate",
          proficiency: 90,
          experience: "4+ Years",
          description: "Advanced layout paradigms (CSS Grid, Flexbox), custom properties (Variables), responsive designs, animations, and keyframes.",
          keyConcepts: ["CSS Custom Variables", "Keyframes & Animation Curves", "Flexbox & Grid Layouts"],
          code: `/* Responsive typography and glassmorphism styling */\n:root {\n  --glow-color: rgba(0, 212, 255, 0.45);\n}\n\n.ide-window {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  backdrop-filter: blur(12px);\n  border: 1px solid var(--border-color);\n  box-shadow: 0 8px 32px var(--glow-color);\n}`
        }
      ]
    },
    {
      name: "Frontend",
      themeColor: "cyan",
      summaryCode: `{\n  "category": "Frontend Development",\n  "frameworks": ["React", "Next.js"],\n  "stylingEngine": "Tailwind CSS",\n  "animations": "Framer Motion",\n  "designSystem": "Atomic components, Tailwind tokens"\n}`,
      skills: [
        {
          name: "React",
          fileName: "react.tsx",
          category: "Frontend",
          themeColor: "cyan",
          proficiency: 95,
          experience: "3+ Years",
          description: "React Server Components (RSC), complex state management, hooks optimizations, virtual DOM diffing, and performance optimization.",
          keyConcepts: ["Custom Hooks", "RSC & Suspense Boundaries", "Rendering Cycles Tuning"],
          code: `"use client";\nimport React, { useState, useEffect } from 'react';\n\nexport function SkillGlow({ name, theme }) {\n  const [active, setActive] = useState(false);\n  \n  return (\n    <div \n      className={\`chip transition-all duration-300 \${active ? 'glow' : ''}\`}\n      onMouseEnter={() => setActive(true)}\n      onMouseLeave={() => setActive(false)}\n    >\n      {name}\n    </div>\n  );\n}`
        },
        {
          name: "Next.js",
          fileName: "nextjs.tsx",
          category: "Frontend",
          themeColor: "cyan",
          proficiency: 92,
          experience: "2+ Years",
          description: "Server-side rendering (SSR), static site generation (SSG), App Router directory structure, API routes execution, and middleware authorization checks.",
          keyConcepts: ["App Router Routing", "Static & Dynamic Rendering", "Edge Middleware Functions"],
          code: `import { Suspense } from 'react';\nimport LoadingState from './loading';\n\n// Server-side data fetching page\nexport default async function SkillsPage() {\n  const skills = await getSkillsFromDatabase();\n  \n  return (\n    <section>\n      <h1 className="text-2xl font-bold">Skills Inventory</h1>\n      <Suspense fallback={<LoadingState />}>\n        <SkillsGrid items={skills} />\n      </Suspense>\n    </section>\n  );\n}`
        },
        {
          name: "Tailwind CSS",
          fileName: "tailwindcss.css",
          category: "Frontend",
          themeColor: "cyan",
          proficiency: 94,
          experience: "3+ Years",
          description: "Utility-first layout setups, theme customizations (tailwind.config.js), fluid layout adjustments, arbitrary variants, and responsive grids.",
          keyConcepts: ["Custom Config extensions", "Arbitrary Class Injection", "Responsive Breakpoints System"],
          code: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer utilities {\n  .glow-cyan {\n    box-shadow: 0 0 25px rgba(0, 212, 255, 0.4);\n    border-color: rgba(0, 212, 255, 0.8);\n  }\n}`
        },
        {
          name: "Framer Motion",
          fileName: "framer-motion.ts",
          category: "Frontend",
          themeColor: "cyan",
          proficiency: 85,
          experience: "2+ Years",
          description: "Interactive layouts transition, layout morphs, gesture controls, exit/entry presence triggers, and spring physics orchestration.",
          keyConcepts: ["Layout Transitions", "AnimatePresence Triggers", "Spring & Physics animations"],
          code: `import { motion, AnimatePresence } from 'framer-motion';\n\nexport function SidebarCollapse({ isOpen, children }) {\n  return (\n    <AnimatePresence initial={false}>\n      {isOpen && (\n        <motion.div\n          initial={{ height: 0, opacity: 0 }}\n          animate={{ height: 'auto', opacity: 1 }}\n          exit={{ height: 0, opacity: 0 }}\n          transition={{ duration: 0.25 }}\n        >\n          {children}\n        </motion.div>\n      )}\n    </AnimatePresence>\n  );\n}`
        }
      ]
    },
    {
      name: "Backend & APIs",
      themeColor: "green",
      summaryCode: `{\n  "category": "Backend & APIs",\n  "environments": ["Node.js", "Django"],\n  "specifications": ["REST APIs", "GraphQL"],\n  "frameworks": ["Express", "DRF"],\n  "securityEngine": "JWT / OAuth2.0"\n}`,
      skills: [
        {
          name: "Node.js",
          fileName: "nodejs.js",
          category: "Backend & APIs",
          themeColor: "green",
          proficiency: 90,
          experience: "3+ Years",
          description: "Server architecture execution, filesystem stream piping, non-blocking asynchronous requests concurrency, event loop cycles.",
          keyConcepts: ["Non-blocking Event Loop", "Buffers & File System streams", "Process & Child Thread Spawning"],
          code: `const fs = require('fs');\nconst http = require('http');\n\nconst server = http.createServer((req, res) => {\n  if (req.url === '/api/skills') {\n    const src = fs.createReadStream('./skills_db.json');\n    res.writeHead(200, { 'Content-Type': 'application/json' });\n    src.pipe(res);\n  }\n});\nserver.listen(8080);`
        },
        {
          name: "Express",
          fileName: "express.js",
          category: "Backend & APIs",
          themeColor: "green",
          proficiency: 88,
          experience: "3+ Years",
          description: "Lightweight routing engine design, custom global middlewares orchestration, JSON validation checks, and error interceptors.",
          keyConcepts: ["Middleware Pipeline Chaining", "Dynamic Parameter Binding", "Global Error Handling Middleware"],
          code: `const express = require('express');\nconst app = express();\n\napp.use(express.json());\n\napp.get('/api/v1/skills/:id', (req, res, next) => {\n  const skill = skillsDb.find(s => s.id === req.params.id);\n  if (!skill) return res.status(404).json({ error: "Not Found" });\n  res.status(200).json(skill);\n});`
        },
        {
          name: "Django",
          fileName: "django.py",
          category: "Backend & APIs",
          themeColor: "green",
          proficiency: 80,
          experience: "2+ Years",
          description: "Python-based MVC architectures, complex Django ORM model definitions, query optimizations, and Rest Framework configurations.",
          keyConcepts: ["Django ORM Query optimization", "Django REST Framework serializing", "Class-based ViewSets"],
          code: `from rest_framework import viewsets, permissions\nfrom .models import Skill\nfrom .serializers import SkillSerializer\n\nclass SkillViewSet(viewsets.ModelViewSet):\n    queryset = Skill.objects.all().order_by('-proficiency')\n    serializer_class = SkillSerializer\n    permission_classes = [permissions.IsAuthenticatedOrReadOnly]`
        },
        {
          name: "REST APIs",
          fileName: "rest-api.json",
          category: "Backend & APIs",
          themeColor: "green",
          proficiency: 92,
          experience: "3+ Years",
          description: "Standard HTTP methods implementation, status code standard routing, rate limiting setups, CORS configurations, and token securities.",
          keyConcepts: ["HTTP Status & Verb standards", "CORS & Rate Limiting headers", "Payload validation contracts"],
          code: `{\n  "swagger": "2.0",\n  "info": {\n    "title": "Sai Kumar Thota Portfolio API",\n    "version": "1.0.0"\n  }\n}`
        },
        {
          name: "GraphQL",
          fileName: "graphql.graphql",
          category: "Backend & APIs",
          themeColor: "green",
          proficiency: 80,
          experience: "1.5 Years",
          description: "Type definition assemblies, query and mutation specifications, Apollos client query caches, and dynamic schema resolvers.",
          keyConcepts: ["Queries, Mutations & Types", "Resolver Execution Graphs", "Client-Side Cache strategies"],
          code: `type Skill {\n  id: ID!\n  name: String!\n  proficiency: Int!\n  category: String!\n}\n\ntype Query {\n  getSkillsByCategory(category: String!): [Skill!]!\n}`
        }
      ]
    },
    {
      name: "Databases",
      themeColor: "magenta",
      summaryCode: `{\n  "category": "Databases & Storage",\n  "relational": ["PostgreSQL", "MySQL"],\n  "nonRelational": ["MongoDB"],\n  "serverless": ["Firebase Firestore"],\n  "optimization": "Caching, Indexing, Partitioning"\n}`,
      skills: [
        {
          name: "PostgreSQL",
          fileName: "postgresql.sql",
          category: "Databases",
          themeColor: "magenta",
          proficiency: 86,
          experience: "3+ Years",
          description: "Relational constraints design, complex SQL execution, schema updates, query optimization, foreign keys rules.",
          keyConcepts: ["Relational Schemes & Constraints", "Query Explain Analysis", "ACID Compliance Transactions"],
          code: `-- Transaction structure with constraints\nBEGIN;\nUPDATE developers \nSET last_active = NOW() \nWHERE id = 'saikumar039';\nCOMMIT;`
        },
        {
          name: "MongoDB",
          fileName: "mongodb.json",
          category: "Databases",
          themeColor: "magenta",
          proficiency: 88,
          experience: "3+ Years",
          description: "Document model definitions, aggregations pipeline design, index patterns, write/read setups, collections setups.",
          keyConcepts: ["BSON document modeling", "Aggregation Pipeline operators", "Compound Index optimizations"],
          code: `// MongoDB Aggregation to group skills by category\ndb.skills.aggregate([\n  { $match: { proficiency: { $gte: 80 } } },\n  { $group: {\n      _id: "$category",\n      skills: { $push: "$name" }\n    }\n  }\n]);`
        },
        {
          name: "MySQL",
          fileName: "mysql.sql",
          category: "Databases",
          themeColor: "magenta",
          proficiency: 82,
          experience: "3+ Years",
          description: "Standard SQL engine configurations, schema designs, indexes optimizations, triggers writing, backup tasks executions.",
          keyConcepts: ["Relational Data structures", "Database Backup schemas", "Constraints & Triggers"],
          code: `-- MySQL Schema Setup\nCREATE TABLE IF NOT EXISTS skills (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  name VARCHAR(50) NOT NULL,\n  proficiency INT CHECK (proficiency BETWEEN 0 AND 100)\n);`
        },
        {
          name: "Firebase",
          fileName: "firebase.json",
          category: "Databases",
          themeColor: "magenta",
          proficiency: 85,
          experience: "2.5 Years",
          description: "Serverless document storage (Firestore), realtime sockets synchronizations, Firebase client authorization, and custom security rules.",
          keyConcepts: ["Firestore Security Rules", "Realtime Web Listeners", "Federated User Auth integration"],
          code: `{\n  "rules": {\n    "firestore": {\n      "match": "/databases/{database}/documents" {\n        "match": "/skills/{document}" {\n          "allow read": "true"\n        }\n      }\n    }\n  }\n}`
        }
      ]
    },
    {
      name: "Cloud & DevOps",
      themeColor: "blue",
      summaryCode: `{\n  "category": "Cloud & DevOps",\n  "infrastructure": "AWS / Terraform IaC",\n  "containers": "Docker",\n  "automation": "GitHub Actions",\n  "versionControl": "Git CLI"\n}`,
      skills: [
        {
          name: "AWS",
          fileName: "aws.tf",
          category: "Cloud & DevOps",
          themeColor: "blue",
          proficiency: 80,
          experience: "2+ Years",
          description: "Cloud setups configuration (EC2 instances, Lambda computing, S3 buckets storage, Route53, API Gateway configurations).",
          keyConcepts: ["Serverless Architectures", "IAM policies & IAM roles", "Terraform IaC Configurations"],
          code: `# IaC Configuration for Portfolio Deployments\nresource "aws_s3_bucket" "portfolio" {\n  bucket = "saikumar-thota-portfolio"\n  tags = {\n    Name        = "Portfolio UI hosting"\n    Environment = "Production"\n  }\n}`
        },
        {
          name: "Docker",
          fileName: "docker.dockerfile",
          category: "Cloud & DevOps",
          themeColor: "blue",
          proficiency: 84,
          experience: "2+ Years",
          description: "Multi-stage compiler configurations, microservices containerizations, local network connections, image sizes optimizations.",
          keyConcepts: ["Multi-stage Compilation", "Docker Compose stacks", "Image Layer optimizations"],
          code: `# Multi-stage Build for Next.js App\nFROM node:18-alpine AS base\nWORKDIR /app\nCOPY package*.json ./\nRUN npm run build`
        },
        {
          name: "Git",
          fileName: "git.gitconfig",
          category: "Cloud & DevOps",
          themeColor: "blue",
          proficiency: 92,
          experience: "4+ Years",
          description: "Local codebase logs review, interactive rebases executions, merge conflict resolves, git hooks automations.",
          keyConcepts: ["Interactive Rebasing", "Merge Conflict resolutions", "Custom Git configurations"],
          code: `[user]\n\tname = Sai Kumar Thota\n\temail = thotasaikumar039@gmail.com\n[alias]\n\tco = checkout\n\tst = status`
        },
        {
          name: "GitHub Actions",
          fileName: "github-actions.yml",
          category: "Cloud & DevOps",
          themeColor: "blue",
          proficiency: 85,
          experience: "2+ Years",
          description: "Automated trigger execution pipelines, code testing automation scripts, artifact builds, and automated deployments setups.",
          keyConcepts: ["Build & Deploy Automation", "CI Secrets Security", "Matrix build steps configuration"],
          code: `name: Portfolio CI/CD Pipeline\non:\n  push:\n    branches: [ main ]\njobs:\n  test_and_deploy:\n    runs-on: ubuntu-latest`
        }
      ]
    },
    {
      name: "AI Tools",
      themeColor: "yellow",
      summaryCode: `{\n  "category": "AI Tools & Machine Learning",\n  "apis": ["Google Gemini API", "OpenAI API"],\n  "frameworks": ["TensorFlow", "PyTorch", "Scikit-Learn"],\n  "capabilities": "LLM integrations, Vector Embeddings, Predictive Modelling"\n}`,
      skills: [
        {
          name: "Gemini",
          fileName: "gemini.json",
          category: "AI Tools",
          themeColor: "yellow",
          proficiency: 92,
          experience: "1.5 Years",
          description: "Advanced Google Gemini SDK implementations, structured JSON response outputs configuration, system guidelines setups, and API tool call declarations.",
          keyConcepts: ["Structured Schema Generation", "Function calling integrations", "Context Optimization"],
          code: `{\n  "agentConfig": {\n    "model": "gemini-1.5-pro",\n    "temperature": 0.2,\n    "systemInstructions": "You are Antigravity, a premium portfolio assistant."\n  }\n}`
        },
        {
          name: "OpenAI",
          fileName: "openai.json",
          category: "AI Tools",
          themeColor: "yellow",
          proficiency: 88,
          experience: "2 Years",
          description: "Implementing GPT models, Assistants API setups, vector database indexing setups, token calculations, and RAG execution templates.",
          keyConcepts: ["Assistants Thread pipelines", "Vector Embedding Models", "System prompt optimization"],
          code: `{\n  "endpoint": "https://api.openai.com/v1/chat/completions",\n  "request": {\n    "model": "gpt-4-turbo",\n    "response_format": { "type": "json_object" }\n  }\n}`
        },
        {
          name: "TensorFlow",
          fileName: "tensorflow.py",
          category: "AI Tools",
          themeColor: "yellow",
          proficiency: 82,
          experience: "2 Years",
          description: "Sequential machine learning models training, tensor transformations, Keras layer creations, and predictive classifications pipelines.",
          keyConcepts: ["Neural Network Layouts", "Loss Optimization", "Model Weights Serializations"],
          code: `import tensorflow as tf\nfrom tensorflow import keras\n\nmodel = keras.Sequential([\n    keras.layers.Dense(128, activation='relu', input_shape=(30,)),\n    keras.layers.Dense(6, activation='softmax')\n])`
        },
        {
          name: "PyTorch",
          fileName: "pytorch.py",
          category: "AI Tools",
          themeColor: "yellow",
          proficiency: 80,
          experience: "2 Years",
          description: "Deep learning backpropagation, tensor operations, optimizer calculations, computational data graphs configurations.",
          keyConcepts: ["Tensor Computations", "Autograd Calculations", "Model Parameter Optimizer"],
          code: `import torch\nimport torch.nn as nn\n\nclass SkillNetwork(nn.Module):\n    def __init__(self):\n        super(SkillNetwork, self).__init__()\n        self.fc = nn.Linear(30, 6)\n\nmodel = SkillNetwork()`
        },
        {
          name: "Scikit-Learn",
          fileName: "scikit-learn.py",
          category: "AI Tools",
          themeColor: "yellow",
          proficiency: 86,
          experience: "3 Years",
          description: "Supervised and unsupervised machine learning algorithms (Random Forests, clustering structures), model scaling, split test validations.",
          keyConcepts: ["Supervised Classifications", "Standard Scaler scaling", "Regression metrics evaluation"],
          code: `from sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nclf = RandomForestClassifier(n_estimators=100)\nclf.fit(X_train, y_train)`
        }
      ]
    }
  ],
  experience: [
    {
      hash: "f7d8a9e",
      branch: "feat/internship",
      type: "feat",
      scope: "experience",
      subject: "Full Stack Developer Internship at Codit Tech Solutions",
      author: "Sai Kumar Thota <saikumarthota2004@gmail.com>",
      date: "May 2024 - January 2025 (9 months)",
      ref: "HEAD -> main, origin/main",
      themeColor: "cyan",
      details: [
        "Engineered responsive, high-performance web components using React.js and Tailwind CSS, reducing rendering latency.",
        "Developed robust, scalable RESTful API endpoints and server-side utilities using Node.js, Express, and FastAPI.",
        "Integrated PostgreSQL and MongoDB databases, optimizing query execution plans and database schema normalization.",
        "Participated in Agile sprints, collaborative code reviews, and Git flow branching management to ensure production stability."
      ]
    },
    {
      hash: "d3c4b5a",
      branch: "feat/education",
      type: "feat",
      scope: "education",
      subject: "B.Tech. in Computer Science & Engineering at SR University",
      author: "Sai Kumar Thota <saikumarthota2004@gmail.com>",
      date: "Nov 2022 - Present (Expected graduation: 2026)",
      ref: "origin/education",
      themeColor: "green",
      details: [
        "Solid foundations in Computer Science disciplines: Data Structures, Algorithms, DBMS, Operating Systems, and OOPs.",
        "Active member and contributor in the college developer community, organizing coding bootcamps and tech events.",
        "Designed and delivered multiple full-stack projects, deploying on AWS and Vercel for peer and instructor testing.",
        "Academic performance: 8.5 CGPA, maintaining excellent marks in software engineering and machine learning tracks."
      ]
    }
  ],
  projects: [],
  achievements: [
    {
      timestamp: "09:12:45",
      service: "innovent-2024.service",
      status: "OK",
      message: "LOADED National Finalist — Tata Technologies InnoVent",
      subtext: "Selected in top teams nationwide for innovative engineering solutions and product design."
    },
    {
      timestamp: "09:12:46",
      service: "aws-solutions-architect.service",
      status: "OK",
      message: "LOADED AWS Certified Solutions Architect - Associate",
      subtext: "Validated expertise in designing distributed, secure, and cost-effective applications on AWS."
    },
    {
      timestamp: "09:12:47",
      service: "aws-cloud-architecting.service",
      status: "OK",
      message: "LOADED AWS Academy Graduate — Cloud Architecting",
      subtext: "Completed academy curriculum covering cloud architecture, VPC design, ELB, and auto-scaling."
    },
    {
      timestamp: "09:12:48",
      service: "aws-cloud-foundations.service",
      status: "OK",
      message: "LOADED AWS Academy Graduate — Cloud Foundations",
      subtext: "Fundamental training in cloud infrastructure, services, security, pricing, and support models."
    },
    {
      timestamp: "09:12:49",
      service: "servicenow-internship.service",
      status: "OK",
      message: "LOADED ServiceNow Developer Virtual Internship",
      subtext: "AICTE & SmartBridge internship implementing workflows, scripting, and system admin tools."
    },
    {
      timestamp: "09:12:50",
      service: "oracle-oci-genai.service",
      status: "OK",
      message: "LOADED Oracle Cloud Infrastructure Generative AI Certified foundations",
      subtext: "Credentials in deploying Large Language Models, prompt tuning, and RAG architectures."
    }
  ]
};
