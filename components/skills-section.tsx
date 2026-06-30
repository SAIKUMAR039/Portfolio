"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Play,
  Search,
  X,
  Eye,
  Code,
  Terminal,
  FileCode,
  Maximize2,
  Minimize2,
  Trash2,
  Sparkles,
  Cpu,
  Layers,
  Settings,
  GitBranch,
  TerminalSquare
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

// ---------------------------------------------------------
// Types & Interfaces
// ---------------------------------------------------------

interface Skill {
  name: string;
  fileName: string;
  category: string;
  themeColor: "cyan" | "green" | "blue" | "slate" | "magenta" | "yellow";
  proficiency: number;
  experience: string;
  description: string;
  keyConcepts: string[];
  code: string;
}

interface FolderData {
  name: string;
  themeColor: "cyan" | "green" | "blue" | "slate" | "magenta" | "yellow";
  skills: Skill[];
  summaryCode: string;
}

// ---------------------------------------------------------
// Theme Styles Map
// ---------------------------------------------------------
const themeStyles = {
  cyan: {
    text: "text-cyan",
    border: "border-cyan/20",
    bg: "bg-cyan/5",
    glowHover: "hover:shadow-[0_0_15px_rgba(0,212,255,0.35)] hover:border-cyan/50 hover:bg-cyan/10 hover:text-cyan",
    glowActive: "shadow-[0_0_15px_rgba(0,212,255,0.35)] border-cyan/50 bg-cyan/10 text-cyan",
    bullet: "bg-cyan",
    fillColor: "#00D4FF"
  },
  green: {
    text: "text-green",
    border: "border-green/20",
    bg: "bg-green/5",
    glowHover: "hover:shadow-[0_0_15px_rgba(0,255,136,0.35)] hover:border-green/50 hover:bg-green/10 hover:text-green",
    glowActive: "shadow-[0_0_15px_rgba(0,255,136,0.35)] border-green/50 bg-green/10 text-green",
    bullet: "bg-green",
    fillColor: "#00FF88"
  },
  blue: {
    text: "text-blue-400",
    border: "border-blue-500/20",
    bg: "bg-blue-950/10",
    glowHover: "hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] hover:border-blue-500/50 hover:bg-blue-950/20 hover:text-blue-400",
    glowActive: "shadow-[0_0_15px_rgba(59,130,246,0.35)] border-blue-500/50 bg-blue-950/20 text-blue-400",
    bullet: "bg-blue-500",
    fillColor: "#3b82f6"
  },
  slate: {
    text: "text-slate",
    border: "border-slate/20",
    bg: "bg-slate/5",
    glowHover: "hover:shadow-[0_0_15px_rgba(136,146,164,0.35)] hover:border-slate/50 hover:bg-slate/10 hover:text-slate",
    glowActive: "shadow-[0_0_15px_rgba(136,146,164,0.35)] border-slate/50 bg-slate/10 text-slate",
    bullet: "bg-slate",
    fillColor: "#8892A4"
  },
  magenta: {
    text: "text-pink-400",
    border: "border-pink-500/20",
    bg: "bg-pink-950/10",
    glowHover: "hover:shadow-[0_0_15px_rgba(236,72,153,0.35)] hover:border-pink-500/50 hover:bg-pink-950/20 hover:text-pink-400",
    glowActive: "shadow-[0_0_15px_rgba(236,72,153,0.35)] border-pink-500/50 bg-pink-950/20 text-pink-400",
    bullet: "bg-pink-500",
    fillColor: "#ec4899"
  },
  yellow: {
    text: "text-yellow-400",
    border: "border-yellow-500/20",
    bg: "bg-yellow-950/10",
    glowHover: "hover:shadow-[0_0_15px_rgba(234,179,8,0.35)] hover:border-yellow-500/50 hover:bg-yellow-950/20 hover:text-yellow-400",
    glowActive: "shadow-[0_0_15px_rgba(234,179,8,0.35)] border-yellow-500/50 bg-yellow-950/20 text-yellow-400",
    bullet: "bg-yellow-500",
    fillColor: "#eab308"
  }
};

// ---------------------------------------------------------
// Skills Database
// ---------------------------------------------------------
const skillFolders: FolderData[] = [
  {
    name: "Languages",
    themeColor: "slate",
    summaryCode: `{
  "category": "Programming Languages",
  "featured": ["TypeScript", "Python", "SQL"],
  "totalLanguages": 7,
  "compilationEngine": "Node.js / JVM / Python Interpreter",
  "typeSafetyStatus": "Enforced strictly"
}`,
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
        code: `// Advanced type gymnastics for robust applications
type Developer = {
  name: "Sai Kumar Thota";
  role: "Full Stack Engineer";
  specialty: "TypeScript";
};

export type SkillLevel<T> = T extends "TypeScript" 
  ? "Expert" 
  : "Proficient";

const status: SkillLevel<"TypeScript"> = "Expert";`
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
        code: `// Core logic and async execution flow
async function fetchSkillMetrics(developer) {
  try {
    const data = await Promise.race([
      database.query(developer.id),
      timeout(1000)
    ]);
    return { status: 200, data };
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}`
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
        code: `# Clean scripting and AI model wrappers
def timing_decorator(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Elapsed: {time.time() - start:.4f}s")
        return result
    return wrapper

@timing_decorator
def run_prediction(data):
    # ML inference pipeline
    return model.predict(data)`
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
        code: `-- Optimized data retrieval query
SELECT 
  s.skill_name,
  c.category_name,
  AVG(s.proficiency) OVER(PARTITION BY c.category_id) as cat_avg
FROM skills s
INNER JOIN categories c ON s.category_id = c.id
WHERE s.proficiency >= 80
ORDER BY s.proficiency DESC;`
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
        code: `// Object-oriented design patterns
public class DeveloperPortfolio {
    private String owner = "Sai Kumar Thota";
    private List<String> skills;

    public DeveloperPortfolio() {
        this.skills = new ArrayList<>();
    }

    public synchronized void addSkill(String skillName) {
        this.skills.add(skillName);
    }
}`
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
        code: `<!-- Clean, semantic document outline -->
<article class="portfolio-card" aria-labelledby="card-title">
  <header>
    <h3 id="card-title">Sai Kumar Thota</h3>
    <p>Full Stack Engineer</p>
  </header>
  <main>
    <p>Building high-fidelity web experiences.</p>
  </main>
</article>`
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
        code: `/* Responsive typography and glassmorphism styling */
:root {
  --glow-color: rgba(0, 212, 255, 0.45);
}

.ide-window {
  display: grid;
  grid-template-columns: 240px 1fr;
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 32px var(--glow-color);
}`
      }
    ]
  },
  {
    name: "Frontend",
    themeColor: "cyan",
    summaryCode: `{
  "category": "Frontend Development",
  "frameworks": ["React", "Next.js"],
  "stylingEngine": "Tailwind CSS",
  "animations": "Framer Motion",
  "designSystem": "Atomic components, Tailwind tokens"
}`,
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
        code: `"use client";
import React, { useState, useEffect } from 'react';

export function SkillGlow({ name, theme }) {
  const [active, setActive] = useState(false);
  
  return (
    <div 
      className={\`chip transition-all duration-300 \${active ? 'glow' : ''}\`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {name}
    </div>
  );
}`
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
        code: `import { Suspense } from 'react';
import LoadingState from './loading';

// Server-side data fetching page
export default async function SkillsPage() {
  const skills = await getSkillsFromDatabase();
  
  return (
    <section>
      <h1 className="text-2xl font-bold">Skills Inventory</h1>
      <Suspense fallback={<LoadingState />}>
        <SkillsGrid items={skills} />
      </Suspense>
    </section>
  );
}`
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
        code: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .glow-cyan {
    box-shadow: 0 0 25px rgba(0, 212, 255, 0.4);
    border-color: rgba(0, 212, 255, 0.8);
  }
}`
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
        code: `import { motion, AnimatePresence } from 'framer-motion';

export function SidebarCollapse({ isOpen, children }) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}`
      }
    ]
  },
  {
    name: "Backend & APIs",
    themeColor: "green",
    summaryCode: `{
  "category": "Backend & APIs",
  "environments": ["Node.js", "Django"],
  "specifications": ["REST APIs", "GraphQL"],
  "frameworks": ["Express", "DRF"],
  "securityEngine": "JWT / OAuth2.0"
}`,
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
        code: `const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/api/skills') {
    // Stream large JSON file to client
    const src = fs.createReadStream('./skills_db.json');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    src.pipe(res);
  }
});
server.listen(8080);`
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
        code: `const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/v1/skills/:id', (req, res, next) => {
  const skill = skillsDb.find(s => s.id === req.params.id);
  if (!skill) return res.status(404).json({ error: "Not Found" });
  res.status(200).json(skill);
});`
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
        code: `from rest_framework import viewsets, permissions
from .models import Skill
from .serializers import SkillSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().order_by('-proficiency')
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]`
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
        code: `{
  "swagger": "2.0",
  "info": {
    "title": "Sai Kumar Thota Portfolio API",
    "version": "1.0.0"
  },
  "paths": {
    "/skills": {
      "get": {
        "summary": "Retrieve developer skills hierarchy",
        "produces": ["application/json"]
      }
    }
  }
}`
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
        code: `type Skill {
  id: ID!
  name: String!
  proficiency: Int!
  category: String!
}

type Query {
  getSkillsByCategory(category: String!): [Skill!]!
}

mutation UpdateSkillProficiency($id: ID!, $level: Int!) {
  updateSkill(id: $id, proficiency: $level) {
    success
  }
}`
      }
    ]
  },
  {
    name: "Databases",
    themeColor: "magenta",
    summaryCode: `{
  "category": "Databases & Storage",
  "relational": ["PostgreSQL", "MySQL"],
  "nonRelational": ["MongoDB"],
  "serverless": ["Firebase Firestore"],
  "optimization": "Caching, Indexing, Partitioning"
}`,
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
        code: `-- Transaction structure with constraints
BEGIN;
UPDATE developers 
SET last_active = NOW() 
WHERE id = 'saikumar039';

INSERT INTO skills_log (dev_id, skill_id, action) 
VALUES ('saikumar039', 'react', 'selected');
COMMIT;`
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
        code: `// MongoDB Aggregation to group skills by category
db.skills.aggregate([
  { $match: { proficiency: { $gte: 80 } } },
  { $group: {
      _id: "$category",
      avg_proficiency: { $avg: "$proficiency" },
      skills: { $push: "$name" }
    }
  },
  { $sort: { avg_proficiency: -1 } }
]);`
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
        code: `-- MySQL Schema Setup
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  proficiency INT CHECK (proficiency BETWEEN 0 AND 100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
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
        code: `{
  "rules": {
    "firestore": {
      "rules_version": "2",
      "service": "cloud.firestore",
      "match": "/databases/{database}/documents" {
        "match": "/skills/{document}" {
          "allow read": "true",
          "allow write": "request.auth != null && request.auth.uid == 'saikumar039'"
        }
      }
    }
  }
}`
      }
    ]
  },
  {
    name: "Cloud & DevOps",
    themeColor: "blue",
    summaryCode: `{
  "category": "Cloud & DevOps",
  "infrastructure": "AWS / Terraform IaC",
  "containers": "Docker",
  "automation": "GitHub Actions",
  "versionControl": "Git CLI"
}`,
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
        code: `# IaC Configuration for Portfolio Deployments
resource "aws_s3_bucket" "portfolio" {
  bucket = "saikumar-thota-portfolio"
  tags = {
    Name        = "Portfolio UI hosting"
    Environment = "Production"
  }
}

resource "aws_s3_bucket_website_configuration" "ui_config" {
  bucket = aws_s3_bucket.portfolio.id
  index_document { suffix = "index.html" }
}`
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
        code: `# Multi-stage Build for Next.js App
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS builder
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
CMD ["npm", "start"]`
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
        code: `[user]
	name = Sai Kumar Thota
	email = thotasaikumar039@gmail.com
[alias]
	co = checkout
	br = branch
	ci = commit
	st = status
	hist = log --pretty=format:\"%h %ad | %s%d [%an]\" --graph --date=short`
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
        code: `name: Portfolio CI/CD Pipeline
on:
  push:
    branches: [ main ]
jobs:
  test_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm ci
      - name: Build check
        run: npm run build`
      }
    ]
  },
  {
    name: "AI Tools",
    themeColor: "yellow",
    summaryCode: `{
  "category": "AI Tools & Machine Learning",
  "apis": ["Google Gemini API", "OpenAI API"],
  "frameworks": ["TensorFlow", "PyTorch", "Scikit-Learn"],
  "capabilities": "LLM integrations, Vector Embeddings, Predictive Modelling"
}`,
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
        code: `{
  "agentConfig": {
    "model": "gemini-1.5-pro",
    "temperature": 0.2,
    "systemInstructions": "You are Antigravity, a premium portfolio assistant.",
    "tools": [
      {
        "functionDeclarations": [{
          "name": "triggerGlowEffect",
          "description": "Applies theme shadow colors to selected skill nodes"
        }]
      }
    ]
  }
}`
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
        code: `{
  "endpoint": "https://api.openai.com/v1/chat/completions",
  "request": {
    "model": "gpt-4-turbo",
    "messages": [
      {"role": "system", "content": "Embed skill matrix summaries"},
      {"role": "user", "content": "Retrieve React details"}
    ],
    "response_format": { "type": "json_object" }
  }
}`
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
        code: `import tensorflow as tf
from tensorflow import keras

# Simple sequential classifier
model = keras.Sequential([
    keras.layers.Dense(128, activation='relu', input_shape=(30,)),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(6, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])`
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
        code: `import torch
import torch.nn as nn

class SkillNetwork(nn.Module):
    def __init__(self):
        super(SkillNetwork, self).__init__()
        self.fc = nn.Linear(30, 6)
        
    def forward(self, x):
        return torch.softmax(self.fc(x), dim=1)

model = SkillNetwork()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)`
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
        code: `from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train_scaled, y_train)`
      }
    ]
  }
];

const readmeFile: Skill = {
  name: "README.md",
  fileName: "README.md",
  category: "Overview",
  themeColor: "cyan",
  proficiency: 100,
  experience: "N/A",
  description: "Overview of Sai Kumar Thota's technical capabilities, developer profile, and system specs.",
  keyConcepts: [],
  code: `# Sai Kumar Thota - Skills Inventory

Welcome to my interactive skills explorer IDE! 

## Workspace Details
- Developer: Sai Kumar Thota
- Focus: Full-Stack Engineering, AI Applications, DevOps
- Status: Ready for new projects & collaborations

## System Specifications
- Host OS: Windows / WSL2 Linux
- Preferred IDE: VS Code / Vim
- Continuous Integration: GitHub Actions
- Primary Backend Stack: Node.js, Express, Python, Django
- Primary Frontend Stack: React, Next.js, Tailwind CSS

## Navigation Instructions
1. Browse folders in the **Explorer Sidebar** on the left.
2. Select folders to view category aggregates.
3. Select specific files (e.g. \`react.tsx\`, \`gemini.json\`) to open code.
4. Toggle between **Code** </> and **Preview** 👁️ modes at the top right of this editor pane.

*Note: Hovering files and chips activates the category glow lights.*`
};

// Flattened skill list for easy searches
const allSkills = skillFolders.flatMap(f => f.skills);

// ---------------------------------------------------------
// File Icon Component
// ---------------------------------------------------------
function FileIcon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const ext = name.split(".").pop() || "";
  
  if (name === "README.md") {
    return (
      <svg className={`${className} text-sky-400`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    );
  }

  switch (ext) {
    case "ts":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" fill="#3178c6" />
          <text x="18" y="19" fill="white" fontSize="9" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">TS</text>
        </svg>
      );
    case "js":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" fill="#f7df1e" />
          <text x="18" y="19" fill="black" fontSize="9" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">JS</text>
        </svg>
      );
    case "tsx":
      return (
        <svg className={`${className} text-cyan-400`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(150 12 12)" />
        </svg>
      );
    case "py":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="#306998" />
          <path d="M12 2a10 10 0 0 0-4.5 1.1c.3.5.7.8 1.2 1 .5.2 1.1.4 1.8.4h3c1.1 0 2 .9 2 2v3c0 .7.2 1.3.4 1.8.2.5.5.9 1 1.2A10 10 0 0 0 12 2z" fill="#FFE873" />
        </svg>
      );
    case "sql":
      return (
        <svg className={`${className} text-emerald-400`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case "java":
      return (
        <svg className={`${className} text-orange-400`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z" />
          <path d="M12 18v-4" />
        </svg>
      );
    case "html":
      return (
        <svg className={`${className} text-orange-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 20l4-16m2 4l4 4-4 4M8 8l-4 4 4 4" />
        </svg>
      );
    case "css":
      return (
        <svg className={`${className} text-blue-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z" />
          <path d="M16 8h-8v8h8" />
          <path d="M12 8v8" />
        </svg>
      );
    case "tf":
      return (
        <svg className={`${className} text-purple-400`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 5.5v13L7 21.75V8.75L1.5 5.5zm11 6.5v9.75l5.5-3.25V8.75l-5.5 3.25zm11-6.5v6.5l-5.5 3.25v-6.5L23.5 5.5zm-11 0v6.5L7 8.75v-6.5l5.5 3.25z" />
        </svg>
      );
    case "dockerfile":
      return (
        <svg className={`${className} text-sky-400`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.983 8.871h-1.996V6.885h1.996V8.871zM11.106 8.871H9.11V6.885h1.996V8.871zm-2.88 0H6.23V6.885h1.996V8.871zm-2.88 0H3.35V6.885h1.996V8.871zm2.88-2.88H6.23V4.005h1.996V5.991zm2.88 0H9.11V4.005h1.996V5.991zm0-2.88H9.11V1.12h1.996v2.871zm2.88 2.88h-1.996V4.005h1.996V5.991zm8.384 5.342c-.225-.138-.646-.226-1.127-.226-.11 0-.214.005-.316.015a.992.992 0 00-.916-.622c-.085 0-.17.01-.252.03-.274-.694-.88-1.196-1.62-1.296-.062-.008-.124-.012-.186-.012-.663 0-1.246.368-1.57.92-.375-.246-.867-.394-1.393-.394-1.572 0-2.846 1.274-2.846 2.846h-6.86v1.393c0 3.393 2.76 6.153 6.153 6.153h9.81c2.617 0 4.743-2.126 4.743-4.743.003-1.63-.825-3.08-2.016-3.894z" />
        </svg>
      );
    case "gitconfig":
      return (
        <svg className={`${className} text-rose-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="6" y1="9" x2="6" y2="15" />
          <path d="M9 18h3a3 3 0 0 0 3-3V9" />
        </svg>
      );
    case "yml":
    case "yaml":
      return (
        <svg className={`${className} text-indigo-400`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
    case "json":
      return (
        <svg className={`${className} text-yellow-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
          <path d="M8 9h4" />
          <path d="M8 13h4" />
          <path d="M8 17h2" />
        </svg>
      );
    case "graphql":
      return (
        <svg className={`${className} text-pink-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <polygon points="12 6 7 12 12 18 17 12" />
        </svg>
      );
    default:
      return (
        <svg className={`${className} text-zinc-400`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
  }
}

// ---------------------------------------------------------
// Custom Micro Syntax Highlighter
// ---------------------------------------------------------
function SyntaxHighlighter({ code }: { code: string }) {
  if (!code) return null;

  // Escape HTML
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Comments
  html = html.replace(/(\/\/.*|\/\*[\s\S]*?\*\/)/g, '<span class="text-zinc-500">$1</span>');

  // String Literals
  html = html.replace(/(["'`])(.*?)\1/g, '<span class="text-emerald-400">$1$2$1</span>');

  // Reserved Keywords
  const keywords = /\b(import|export|const|let|var|function|return|from|type|interface|class|extends|new|default|as|true|false|null|undefined|string|number|boolean|any|void|async|await|try|catch|resource|from|with|import_types)\b/g;
  html = html.replace(keywords, '<span class="text-pink-400">$1</span>');

  // Numbers
  html = html.replace(/\b(\d+)\b/g, '<span class="text-amber-400">$1</span>');

  // HTML/JSX Tags
  html = html.replace(/(&lt;\/?[a-zA-Z0-9\-]+|&gt;)/g, '<span class="text-blue-400">$1</span>');

  return (
    <pre className="font-mono text-[11px] sm:text-xs leading-relaxed whitespace-pre overflow-x-auto select-text p-4">
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}

// ---------------------------------------------------------
// SkillsSection Component
// ---------------------------------------------------------
export function SkillsSection() {
  const [mounted, setMounted] = useState(false);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    Languages: true,
    Frontend: true,
    "Backend & APIs": false,
    Databases: false,
    "Cloud & DevOps": false,
    "AI Tools": false
  });

  // Editor State
  const [openTabs, setOpenTabs] = useState<string[]>(["README.md"]);
  const [activeFile, setActiveFile] = useState<string>("README.md");
  const [editorMode, setEditorMode] = useState<"code" | "preview">("preview");

  // Hover States for Glow effects
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);
  const [hoveredChip, setHoveredChip] = useState<string | null>(null);

  // Terminal Runner state
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Sync state mounting for Recharts SSR safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll to terminal bottom during compilation simulations
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLines]);

  // Determine active item data
  const activeItem = useMemo(() => {
    if (activeFile === "README.md") {
      return readmeFile;
    }
    // Check if folder is selected
    const folderMatch = skillFolders.find(f => `${f.name.toLowerCase()}_summary.json` === activeFile);
    if (folderMatch) {
      return {
        name: `${folderMatch.name} Overview`,
        fileName: `${folderMatch.name.toLowerCase()}_summary.json`,
        category: folderMatch.name,
        themeColor: folderMatch.themeColor,
        proficiency: Math.round(
          folderMatch.skills.reduce((acc, s) => acc + s.proficiency, 0) / folderMatch.skills.length
        ),
        experience: "Various",
        description: `Summary overview for all technologies nested within folder ${folderMatch.name}.`,
        keyConcepts: folderMatch.skills.map(s => s.name),
        code: folderMatch.summaryCode
      } as Skill;
    }
    // Check if specific skill is selected
    return allSkills.find(s => s.fileName === activeFile) || readmeFile;
  }, [activeFile, skillFolders, allSkills]);

  // Handle open tab clicks
  const selectFile = (fileName: string) => {
    if (!openTabs.includes(fileName)) {
      setOpenTabs(prev => [...prev, fileName]);
    }
    setActiveFile(fileName);
    
    // Auto scroll to editor viewport on small mobile devices
    if (window.innerWidth < 768) {
      document.getElementById("editor-panel-anchor")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Close editor tabs
  const closeTab = (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation();
    const filtered = openTabs.filter(t => t !== fileName);
    setOpenTabs(filtered);

    if (activeFile === fileName) {
      if (filtered.length > 0) {
        setActiveFile(filtered[filtered.length - 1]);
      } else {
        setActiveFile("README.md");
        setOpenTabs(["README.md"]);
      }
    }
  };

  // Toggle folders expansion
  const toggleFolder = (folderName: string) => {
    setOpenFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
    // Open a category summary file on clicking folder
    const folder = skillFolders.find(f => f.name === folderName);
    if (folder) {
      selectFile(`${folder.name.toLowerCase()}_summary.json`);
    }
  };

  // Simulated script compilations
  const runCodeExecution = () => {
    if (isRunning) return;
    setIsTerminalOpen(true);
    setIsRunning(true);
    setTerminalLines([]);

    const commands: Record<string, string[]> = {
      "typescript.ts": [
        "$ npx tsc typescript.ts --strict",
        "[info] compiling typescript.ts...",
        "[info] typechecking completed. 0 errors found.",
        "[success] skill \"TypeScript\" compiled successfully. exit: 0"
      ],
      "javascript.js": [
        "$ node javascript.js",
        "[info] executing in local node engine...",
        "[info] server response status: 200 OK",
        "[success] script finished with code 0. memory usage: 14MB"
      ],
      "python.py": [
        "$ python python.py",
        "[info] loading dependencies (sys, time)...",
        "[info] run_prediction() - Elapsed: 0.0421s",
        "[success] model weights verified. predicted category: Lead dev"
      ],
      "sql.sql": [
        "$ psql -d portfolio -f sql.sql",
        "[info] connecting PostgreSQL server...",
        "[info] query executed: Window average averages 88.50%",
        "[success] (2 rows returned)"
      ],
      "java.java": [
        "$ javac DeveloperPortfolio.java && java DeveloperPortfolio",
        "[info] compiling Java bytecodes...",
        "[info] booting Java Virtual Machine...",
        "[success] DeveloperPortfolio instantiated successfully."
      ],
      "html.html": [
        "$ html-validator html.html",
        "[info] validating structural nodes...",
        "[info] Web Accessibility guidelines assessment: AAA",
        "[success] html tree validation completed."
      ],
      "css.css": [
        "$ postcss css.css -o dist.css",
        "[info] building css variables configurations...",
        "[info] backdrop-filter support prefixes applied.",
        "[success] assets built. size: 2.1kb"
      ],
      "react.tsx": [
        "$ npm run build --match=react.tsx",
        "[info] compiling react tree objects...",
        "[info] bundling dependencies (react, framer-motion)...",
        "[success] built in 142ms. bundle size: 45.2kb"
      ],
      "nextjs.tsx": [
        "$ next build --filter=skills",
        "[info] compiling optimized production server bundle...",
        "[info] static routes collected...",
        "[success] route (SSR) built. cache: OK"
      ],
      "tailwindcss.css": [
        "$ tailwindcss -i tailwindcss.css -o output.css",
        "[info] scanning files for active utilities...",
        "[info] scanning variables matching theme glows...",
        "[success] utilities compiled in 88ms."
      ],
      "framer-motion.ts": [
        "$ node framer-motion.ts",
        "[info] compiling animation interpolation path...",
        "[info] calculated keyframes paths (60 FPS)...",
        "[success] layout preservation verified."
      ],
      "nodejs.js": [
        "$ node nodejs.js",
        "[info] initiating node http server on port 8080...",
        "[info] stream pipeline linked to file read stream.",
        "[success] stream running. press Ctrl+C to terminate."
      ],
      "express.js": [
        "$ nodemon express.js",
        "[nodemon] starting server...",
        "[info] Express server listening on port 3000",
        "[success] GET /api/v1/skills/react -> 200 OK (4ms)"
      ],
      "django.py": [
        "$ python manage.py runserver",
        "[info] django perform system checks... 0 issues found.",
        "[info] development server listening on http://127.0.0.1:8000/",
        "[success] db migrations verified."
      ],
      "rest-api.json": [
        "$ newman run rest-api.json",
        "[info] executing rest integration tests...",
        "[pass] GET /skills - status: 200 OK",
        "[success] API schema endpoints matched specs."
      ],
      "graphql.graphql": [
        "$ graphql-codegen --config codegen.yml",
        "[info] downloading GraphQL schema fields...",
        "[info] resolving graphql types to hooks...",
        "[success] query bindings compiled successfully."
      ],
      "postgresql.sql": [
        "$ psql -h localhost -d portfolio",
        "[info] executing transaction commits...",
        "[info] UPDATE 1 (developer activity updated)",
        "[success] COMMIT (transaction completed successfully)"
      ],
      "mongodb.json": [
        "$ mongosh --file mongodb.json",
        "[info] connecting MongoDB Atlas cluster...",
        "[info] aggregate([$match, $group]) evaluation completed.",
        "[success] result: { _id: 'Frontend', avg: 91.5 }"
      ],
      "mysql.sql": [
        "$ mysql -u root -p portfolio < mysql.sql",
        "[info] parsing schema relational indices...",
        "[success] table \"skills\" created in database."
      ],
      "firebase.json": [
        "$ firebase deploy --only firestore:rules",
        "[info] auditing firestore security directives...",
        "[info] uploading rules set to firebase console...",
        "[success] rules update active."
      ],
      "aws.tf": [
        "$ terraform plan -target=aws_s3_bucket.portfolio",
        "[info] locking workspace state...",
        "[info] Plan: 1 to add, 0 to change, 0 to destroy.",
        "[success] IaC configurations validated."
      ],
      "docker.dockerfile": [
        "$ docker build -t portfolio-runner .",
        "[info] building container daemon contexts...",
        "[info] step 1/5 FROM node:18-alpine...",
        "[success] image tagged: portfolio-runner:latest"
      ],
      "git.gitconfig": [
        "$ git log -n 1 --oneline",
        "[info] reading head commits...",
        "[git] ab63f71 (HEAD -> main) feat: update skills explorer IDE",
        "[success] repository log loaded."
      ],
      "github-actions.yml": [
        "$ act -j test_and_deploy",
        "[info] triggering runner environment...",
        "[info] Task: linting & tests execution successful.",
        "[success] act local emulation run finished."
      ],
      "gemini.json": [
        "$ node gemini_test.js",
        "[info] invoking gemini-1.5-pro LLM model...",
        "[gemini] output: 'Initializing premium coding configurations...'",
        "[success] structured response collected in 230ms."
      ],
      "openai.json": [
        "$ node openai_test.js",
        "[info] fetching embeddings vectors for input: 'TypeScript'",
        "[info] cosine similarity check completed.",
        "[success] semantic index updated."
      ],
      "tensorflow.py": [
        "$ python train.py",
        "[info] training Keras layers sequential network...",
        "[info] Epoch 1/5 - loss: 0.432 - accuracy: 0.894",
        "[success] Epoch 5/5 - loss: 0.082 - accuracy: 0.985"
      ],
      "pytorch.py": [
        "$ python pytorch_train.py",
        "[info] compiling computation tensor layouts...",
        "[info] step [100/500] SGD loss calculation: 0.1245",
        "[success] backward gradients calculated."
      ],
      "scikit-learn.py": [
        "$ python classify.py",
        "[info] loading StandardScaler models...",
        "[info] RandomForestClassifier: training completed.",
        "[success] model precision score: 94.2% verified."
      ],
      "README.md": [
        "$ cat README.md",
        "[info] initializing workspace...",
        "[info] Developer: Sai Kumar Thota",
        "[success] portfolio workspace initialized."
      ]
    };

    // Default runner messages if summary files are run
    const activeLines = commands[activeFile] || [
      `$ cat ${activeFile}`,
      "[info] parsing aggregate schema summary...",
      `[info] category: ${activeItem.category}`,
      `[success] processed ${activeItem.name} metrics successfully.`
    ];

    let lineIndex = 0;
    const printLine = () => {
      if (lineIndex < activeLines.length) {
        setTerminalLines(prev => [...prev, activeLines[lineIndex]]);
        lineIndex++;
        setTimeout(printLine, 180);
      } else {
        setIsRunning(false);
      }
    };

    printLine();
  };

  // Recharts Radar Chart Setup Data
  const radarData = useMemo(() => {
    return skillFolders.map(folder => ({
      subject: folder.name,
      value: folder.skills.length > 0 ? Math.round(
        folder.skills.reduce((acc, s) => acc + s.proficiency, 0) / folder.skills.length
      ) : 0,
      fullMark: 100
    }));
  }, [skillFolders]);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 relative overflow-hidden bg-bg font-mono select-none">
      {/* Decorative matrix lights */}
      <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] bg-cyan/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] bg-green/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-block text-xs text-cyan border border-cyan/20 px-3 py-1 rounded-full mb-3 bg-cyan/5 tracking-widest">
            // SKILLSET_WORKSPACE.sh
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Skills &amp; Architecture Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate mt-2 max-w-xl mx-auto">
            Interact with the simulated editor sidebar, select files, inspect code structures, and run compiled simulations.
          </p>
        </motion.div>

        {/* IDE Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full bg-[#090d16] border border-cyan/15 rounded-lg shadow-2xl overflow-hidden relative flex flex-col h-auto md:h-[650px]"
        >
          {/* 1. IDE Top Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#0b0f1a] border-b border-cyan/10 text-xs text-slate/80">
            {/* Left Mac Buttons */}
            <div className="flex space-x-1.5 items-center">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f] opacity-80" />
            </div>

            {/* Center: Command Palette search mockup */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#141b2c] border border-cyan/10 px-3 py-1 rounded-md w-72 text-[10px] text-slate/50 cursor-pointer hover:border-cyan/30 transition-colors">
              <Search className="h-3 w-3 text-cyan/40" />
              <span>search_portfolio_skills --ref</span>
            </div>

            {/* Right window title */}
            <div className="text-[10px] text-slate/60 tracking-wider">
              {activeFile} - saikumar_workspace
            </div>
          </div>

          {/* IDE Submenu bar */}
          <div className="flex px-4 py-1.5 bg-[#090d16] border-b border-cyan/5 text-[10px] text-slate/60 gap-4 overflow-x-auto whitespace-nowrap select-none scrollbar-none">
            <span className="hover:text-cyan cursor-pointer">File</span>
            <span className="hover:text-cyan cursor-pointer">Edit</span>
            <span className="hover:text-cyan cursor-pointer">Selection</span>
            <span className="hover:text-cyan cursor-pointer">View</span>
            <span className="hover:text-cyan cursor-pointer">Go</span>
            <span className="hover:text-cyan cursor-pointer">Run</span>
            <span className="hover:text-cyan cursor-pointer">Terminal</span>
            <span className="hover:text-cyan cursor-pointer">Help</span>
          </div>

          {/* 2. Split Workspace Pane */}
          <div className="flex flex-col md:flex-row flex-1 min-h-0">
            
            {/* Left Side: Activity Bar & Explorer */}
            <div className="flex border-b md:border-b-0 md:border-r border-cyan/10 w-full md:w-72 bg-[#060910] shrink-0 select-none">
              
              {/* Activity Bar icons (Vscode left sidebar) */}
              <div className="w-12 border-r border-cyan/5 flex flex-col items-center py-4 gap-4 text-slate/40 shrink-0">
                <div className="text-cyan p-1 cursor-pointer relative group">
                  <FileCode className="h-5 w-5" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-cyan rounded-r" />
                </div>
                <div className="hover:text-slate/80 p-1 cursor-pointer"><Search className="h-5 w-5" /></div>
                <div className="hover:text-slate/80 p-1 cursor-pointer"><GitBranch className="h-5 w-5" /></div>
                <div className="hover:text-slate/80 p-1 cursor-pointer"><TerminalSquare className="h-5 w-5" /></div>
                <div className="hover:text-slate/80 p-1 cursor-pointer mt-auto"><Settings className="h-5 w-5" /></div>
              </div>

              {/* Explorer Sidebar tree view */}
              <div className="flex-1 p-3 overflow-y-auto max-h-[300px] md:max-h-none">
                <div className="text-[10px] text-slate/50 font-bold uppercase tracking-wider mb-3">
                  EXPLORER: WORKSPACE
                </div>

                {/* Root workspace folder info */}
                <div className="flex items-center gap-1.5 text-xs text-white/95 mb-2 font-bold pl-1">
                  <ChevronDown className="h-3 w-3 text-cyan" />
                  <span>sai_portfolio_root</span>
                </div>

                {/* Permanent Readme entry */}
                <div
                  onClick={() => selectFile("README.md")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm cursor-pointer border border-transparent text-xs mb-3 ${
                    activeFile === "README.md"
                      ? "bg-cyan/10 border-cyan/20 text-cyan"
                      : "text-slate hover:bg-[#141b2c]/40 hover:text-white"
                  }`}
                >
                  <FileIcon name="README.md" className="h-3.5 w-3.5" />
                  <span>README.md</span>
                </div>

                {/* Folders tree list */}
                <div className="space-y-1.5">
                  {skillFolders.map((folder, fIndex) => {
                    const isOpen = openFolders[folder.name];
                    const activeSummary = `${folder.name.toLowerCase()}_summary.json`;
                    const hasSelectedInside = folder.skills.some(s => s.fileName === activeFile) || activeFile === activeSummary;
                    const folderStyle = themeStyles[folder.themeColor];

                    return (
                      <div key={fIndex} className="text-xs">
                        {/* Folder Header */}
                        <div
                          onClick={() => toggleFolder(folder.name)}
                          className={`flex items-center justify-between px-2 py-1.5 rounded-sm cursor-pointer transition-colors ${
                            hasSelectedInside ? "bg-[#141b2c]/30 text-white" : "text-slate hover:bg-[#141b2c]/20 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            {isOpen ? (
                              <ChevronDown className="h-3 w-3 text-slate/60" />
                            ) : (
                              <ChevronRight className="h-3 w-3 text-slate/60" />
                            )}
                            {isOpen ? (
                              <FolderOpen className={`h-3.5 w-3.5 ${folderStyle.text}`} />
                            ) : (
                              <Folder className={`h-3.5 w-3.5 ${folderStyle.text}`} />
                            )}
                            <span className="font-semibold">{folder.name}</span>
                          </div>
                        </div>

                        {/* Collapsible files list */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="pl-5 overflow-hidden border-l border-cyan/5 ml-3.5 mt-1 space-y-1"
                            >
                              {/* Summary JSON file */}
                              <div
                                onClick={() => selectFile(activeSummary)}
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm cursor-pointer text-[11px] border border-transparent ${
                                  activeFile === activeSummary
                                    ? folderStyle.glowActive
                                    : "text-slate/75 hover:bg-[#141b2c]/40 hover:text-white"
                                }`}
                              >
                                <FileIcon name={activeSummary} className="h-3 w-3" />
                                <span>{activeSummary}</span>
                              </div>

                              {/* Skills files */}
                              {folder.skills.map((skill, sIndex) => {
                                const isSkillActive = activeFile === skill.fileName;
                                const isFileHovered = hoveredFile === skill.fileName;

                                return (
                                  <div
                                    key={sIndex}
                                    onClick={() => selectFile(skill.fileName)}
                                    onMouseEnter={() => setHoveredFile(skill.fileName)}
                                    onMouseLeave={() => setHoveredFile(null)}
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm cursor-pointer text-[11px] border border-transparent transition-all ${
                                      isSkillActive
                                        ? folderStyle.glowActive
                                        : isFileHovered
                                        ? folderStyle.glowHover
                                        : "text-slate/75 hover:bg-[#141b2c]/40 hover:text-white"
                                    }`}
                                  >
                                    <FileIcon name={skill.fileName} className="h-3 w-3" />
                                    <span>{skill.fileName}</span>
                                  </div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side: Simulated Text Editor & Preview Dashboard */}
            <div id="editor-panel-anchor" className="flex-1 flex flex-col bg-[#090d16] min-h-[450px] md:min-h-0 min-w-0">
              
              {/* Editor Tabs Bar */}
              <div className="flex bg-[#070a11] border-b border-cyan/10 overflow-x-auto whitespace-nowrap select-none scrollbar-none shrink-0">
                {openTabs.map((tab, idx) => {
                  const isActive = activeFile === tab;
                  const skill = allSkills.find(s => s.fileName === tab) || (tab === "README.md" ? readmeFile : null);
                  const theme = skill ? skill.themeColor : "cyan";
                  const folder = skillFolders.find(f => `${f.name.toLowerCase()}_summary.json` === tab);
                  const displayTheme = folder ? folder.themeColor : theme;

                  const folderStyle = themeStyles[displayTheme];

                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveFile(tab)}
                      className={`flex items-center gap-1.5 px-4 py-2 border-r border-cyan/5 text-xs cursor-pointer select-none transition-colors ${
                        isActive
                          ? "bg-[#090d16] text-white border-t border-t-cyan border-b-transparent"
                          : "text-slate/60 bg-[#060910] hover:bg-[#141b2c]/20 hover:text-white"
                      }`}
                    >
                      <FileIcon name={tab} className="h-3 w-3" />
                      <span>{tab}</span>
                      <button
                        onClick={(e) => closeTab(e, tab)}
                        className="text-slate/40 hover:text-red-400 p-0.5 rounded transition-colors ml-1"
                      >
                        <X className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Editor Toolbar (Breadcrumbs & Toggles) */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#090d16] border-b border-cyan/5 text-[10px] text-slate/50 select-none shrink-0">
                {/* Breadcrumbs path */}
                <div className="flex items-center gap-1 overflow-hidden whitespace-nowrap text-ellipsis mr-2">
                  <span>workspace</span>
                  <ChevronRight className="h-2 w-2" />
                  <span>src</span>
                  <ChevronRight className="h-2 w-2" />
                  <span>skills</span>
                  <ChevronRight className="h-2 w-2" />
                  <span className="text-cyan/70">{activeItem.category || "General"}</span>
                  <ChevronRight className="h-2 w-2" />
                  <span className="text-white/80">{activeFile}</span>
                </div>

                {/* View/Run Toggles */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Run code trigger */}
                  <button
                    onClick={runCodeExecution}
                    disabled={isRunning}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded bg-green/10 border border-green/30 text-green hover:bg-green/20 transition-all font-mono text-[9px] ${
                      isRunning ? "animate-pulse cursor-not-allowed" : ""
                    }`}
                  >
                    <Play className={`h-2.5 w-2.5 fill-current ${isRunning ? "animate-spin" : ""}`} />
                    <span>{isRunning ? "Running..." : "Run"}</span>
                  </button>

                  <div className="h-3.5 w-px bg-cyan/15 mx-1" />

                  {/* Code Editor view */}
                  <button
                    onClick={() => setEditorMode("code")}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                      editorMode === "code" ? "bg-cyan/10 text-cyan border border-cyan/20" : "hover:text-slate/85"
                    }`}
                  >
                    <Code className="h-3 w-3" />
                    <span>Code</span>
                  </button>

                  {/* Dashboard Preview view */}
                  <button
                    onClick={() => setEditorMode("preview")}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                      editorMode === "preview" ? "bg-cyan/10 text-cyan border border-cyan/20" : "hover:text-slate/85"
                    }`}
                  >
                    <Eye className="h-3 w-3" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              {/* 3. Main Editor Window viewport */}
              <div className="flex-1 overflow-y-auto relative min-h-0 bg-[#090d16]">
                <AnimatePresence mode="wait">
                  {editorMode === "code" ? (
                    // CODE MODE: Line Numbers & Custom syntax highlighting
                    <motion.div
                      key="code"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex min-h-full"
                    >
                      {/* Line Numbers Column */}
                      <div className="w-10 border-r border-cyan/5 text-right pr-2.5 py-4 text-[10px] sm:text-xs text-slate/30 select-none bg-[#070a11] shrink-0 font-mono">
                        {Array.from({ length: activeItem.code.split("\n").length }).map((_, i) => (
                          <div key={i}>{i + 1}</div>
                        ))}
                      </div>
                      
                      {/* Code body */}
                      <div className="flex-1 overflow-x-auto">
                        <SyntaxHighlighter code={activeItem.code} />
                      </div>
                    </motion.div>
                  ) : (
                    // PREVIEW MODE: Stats dashboard & Tech radar charts
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="p-4 sm:p-6 min-h-full flex flex-col gap-6 select-text"
                    >
                      {activeFile === "README.md" ? (
                        // README PREVIEW: Main Dashboard (Welcome + Tech Radar)
                        <div className="grid md:grid-cols-2 gap-6">
                          
                          {/* Left Col: Welcome Info */}
                          <div className="space-y-4">
                            <div className="border border-cyan/15 rounded-md p-4 bg-[#0c1221] shadow-lg relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-2 opacity-10">
                                <Sparkles className="h-16 w-16 text-cyan" />
                              </div>
                              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                                <span className="h-2 w-2 rounded-full bg-cyan animate-ping" />
                                Sai Kumar Thota - Developer Profile
                              </h3>
                              <p className="text-xs text-slate leading-relaxed">
                                Self-driven Full Stack Engineer with a production-grade software deployment background. Capable of building scalable backend APIs, highly interactive UI components, and integrated AI agent modules.
                              </p>
                              <div className="grid grid-cols-2 gap-3 mt-4 text-[11px]">
                                <div className="p-2 border border-cyan/5 bg-[#080d17] rounded">
                                  <div className="text-slate/60 uppercase text-[9px]">Platform focus</div>
                                  <div className="text-cyan font-bold mt-0.5">Next.js &amp; Python APIs</div>
                                </div>
                                <div className="p-2 border border-cyan/5 bg-[#080d17] rounded">
                                  <div className="text-slate/60 uppercase text-[9px]">Execution Environment</div>
                                  <div className="text-green font-bold mt-0.5">Vercel / AWS Cloud</div>
                                </div>
                              </div>
                            </div>

                            {/* Glow Skill Chips List */}
                            <div className="border border-cyan/15 rounded-md p-4 bg-[#0c1221]">
                              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                                Highlights (Hover for Glow)
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {allSkills.filter(s => s.proficiency >= 90).map((skill, sIdx) => {
                                  const style = themeStyles[skill.themeColor];
                                  const isHovered = hoveredChip === skill.name;

                                  return (
                                    <div
                                      key={sIdx}
                                      onMouseEnter={() => setHoveredChip(skill.name)}
                                      onMouseLeave={() => setHoveredChip(null)}
                                      onClick={() => selectFile(skill.fileName)}
                                      className={`px-3 py-1.5 border rounded-md text-xs cursor-pointer transition-all duration-300 ${
                                        isHovered ? style.glowActive : "border-cyan/10 bg-[#080d17] text-slate"
                                      }`}
                                    >
                                      {skill.name}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Right Col: Radar Chart (Tech Radar) */}
                          <div className="border border-cyan/15 rounded-md p-4 bg-[#0c1221] flex flex-col justify-center items-center">
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 self-start">
                              System Tech Radar
                            </h3>
                            <div className="w-full aspect-square max-w-[280px] sm:max-w-[320px] flex items-center justify-center">
                              {mounted ? (
                                <ResponsiveContainer width="100%" height="100%">
                                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                                    <PolarGrid stroke="rgba(0, 212, 255, 0.1)" />
                                    <PolarAngleAxis
                                      dataKey="subject"
                                      stroke="#8892A4"
                                      fontSize={10}
                                      fontFamily="monospace"
                                    />
                                    <PolarRadiusAxis
                                      angle={30}
                                      domain={[0, 100]}
                                      stroke="rgba(0, 212, 255, 0.1)"
                                      tick={false}
                                    />
                                    <Radar
                                      name="Proficiency"
                                      dataKey="value"
                                      stroke="#00D4FF"
                                      fill="#00D4FF"
                                      fillOpacity={0.15}
                                    />
                                  </RadarChart>
                                </ResponsiveContainer>
                              ) : (
                                <div className="text-slate/50 text-[10px]">[Loading system chart...]</div>
                              )}
                            </div>
                            <div className="text-[9px] text-slate/50 text-center mt-2">
                              Radial meters represent average category proficiencies.
                            </div>
                          </div>
                        </div>
                      ) : activeFile.endsWith("_summary.json") ? (
                        // FOLDER CATEGORY PREVIEW: Category stats dashboard
                        <div className="space-y-5">
                          <div className="flex items-center gap-3 mb-2">
                            <FolderOpen className={`h-5 w-5 ${themeStyles[activeItem.themeColor].text}`} />
                            <h3 className="text-lg font-bold text-white">
                              {activeItem.category} Directory
                            </h3>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4">
                            {/* Summary stat cards */}
                            <div className="p-4 border border-cyan/15 bg-[#0c1221] rounded-md">
                              <div className="text-slate/50 text-[10px] uppercase font-bold">Files count</div>
                              <div className="text-2xl font-bold text-white mt-1">
                                {skillFolders.find(f => f.name === activeItem.category)?.skills.length || 0}
                              </div>
                            </div>
                            <div className="p-4 border border-cyan/15 bg-[#0c1221] rounded-md">
                              <div className="text-slate/50 text-[10px] uppercase font-bold">Category Mean</div>
                              <div className="text-2xl font-bold text-cyan mt-1">
                                {activeItem.proficiency}%
                              </div>
                            </div>
                            <div className="p-4 border border-cyan/15 bg-[#0c1221] rounded-md">
                              <div className="text-slate/50 text-[10px] uppercase font-bold">Active Status</div>
                              <div className="text-2xl font-bold text-green mt-1">
                                Online 🟢
                              </div>
                            </div>
                          </div>

                          {/* Category Skill details grid */}
                          <div className="border border-cyan/15 rounded-md p-5 bg-[#0c1221] space-y-4">
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                              Contained Skills Proficiency
                            </h4>
                            <div className="space-y-3.5">
                              {skillFolders
                                .find(f => f.name === activeItem.category)
                                ?.skills.map((skill, sIdx) => {
                                  const style = themeStyles[skill.themeColor];
                                  return (
                                    <div
                                      key={sIdx}
                                      onClick={() => selectFile(skill.fileName)}
                                      className="group cursor-pointer space-y-1.5"
                                    >
                                      <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate group-hover:text-white font-bold transition-colors">
                                          {skill.name} ({skill.fileName})
                                        </span>
                                        <span className={`${style.text} font-bold`}>{skill.proficiency}%</span>
                                      </div>
                                      <div className="w-full h-2 bg-[#080d17] border border-cyan/5 rounded-full overflow-hidden">
                                        <div
                                          className={`h-full rounded-full transition-all duration-500 ${style.bullet}`}
                                          style={{ width: `${skill.proficiency}%` }}
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      ) : (
                        // SPECIFIC SKILL FILE PREVIEW: Detailed skill metrics
                        <div className="space-y-6">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-cyan/10 pb-4">
                            <div className="flex items-center gap-3">
                              <FileIcon name={activeItem.fileName} className="h-6 w-6" />
                              <div>
                                <h3 className="text-base font-bold text-white">{activeItem.name}</h3>
                                <div className="text-[10px] text-slate/60 mt-0.5 uppercase tracking-wider">
                                  Extension: .{activeItem.fileName.split(".").pop()} | Folder: {activeItem.category}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate">Energy level:</span>
                              <div className="px-2.5 py-1 border border-green/30 bg-green/10 text-green rounded text-xs font-bold shadow-[0_0_10px_rgba(0,255,136,0.1)]">
                                {activeItem.proficiency}% Optimal
                              </div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Left panel metrics */}
                            <div className="space-y-4">
                              <div className="p-4 border border-cyan/15 bg-[#0c1221] rounded-md shadow">
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                                  Proficiency metrics
                                </h4>
                                <div className="space-y-3 mt-2">
                                  <div>
                                    <div className="flex justify-between text-xs mb-1">
                                      <span className="text-slate/70">Expertise Depth</span>
                                      <span className="text-white font-bold">{activeItem.proficiency}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#080d17] border border-cyan/5 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full rounded-full ${themeStyles[activeItem.themeColor].bullet}`}
                                        style={{ width: `${activeItem.proficiency}%` }}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-slate/70">Production experience</span>
                                    <span className="text-cyan font-bold">{activeItem.experience}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="p-4 border border-cyan/15 bg-[#0c1221] rounded-md">
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                                  Description
                                </h4>
                                <p className="text-xs text-slate leading-relaxed">
                                  {activeItem.description}
                                </p>
                              </div>
                            </div>

                            {/* Right panel topics */}
                            <div className="p-5 border border-cyan/15 bg-[#0c1221] rounded-md flex flex-col">
                              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                                Key architectural concepts
                              </h4>
                              <div className="space-y-3.5 flex-1 justify-center flex flex-col">
                                {activeItem.keyConcepts.map((concept, idx) => (
                                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate">
                                    <div className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 ${themeStyles[activeItem.themeColor].bullet}`} />
                                    <span className="leading-normal">{concept}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 4. IDE Terminal Output Drawer */}
              <AnimatePresence>
                {isTerminalOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "160px" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-cyan/15 bg-[#02050b] flex flex-col shrink-0 font-mono text-[10px] sm:text-xs min-w-0"
                  >
                    {/* Terminal Menu Header */}
                    <div className="flex justify-between items-center px-4 py-1.5 bg-[#060a12] border-b border-cyan/10 text-slate/50 select-none">
                      <div className="flex items-center gap-3">
                        <span className="text-cyan flex items-center gap-1.5 font-bold">
                          <Terminal className="h-3.5 w-3.5" />
                          TERMINAL CONSOLE
                        </span>
                        <span className="hover:text-white cursor-pointer">Output</span>
                        <span className="hover:text-white cursor-pointer">Problems</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setTerminalLines([])}
                          className="hover:text-red-400 p-0.5 rounded transition-colors"
                          title="Clear Output"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setIsTerminalOpen(false)}
                          className="hover:text-white p-0.5 rounded transition-colors"
                          title="Close Terminal"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Terminal Content rows */}
                    <div className="flex-1 overflow-y-auto p-3 text-zinc-300 leading-relaxed font-mono select-text bg-[#03060c]">
                      {terminalLines.length === 0 ? (
                        <div className="text-slate/40 italic">
                          Click green &quot;Run&quot; button above to simulate executing script.
                        </div>
                      ) : (
                        terminalLines.map((line, lIdx) => {
                          const isCmd = line.startsWith("$");
                          const isSuccess = line.includes("[success]");
                          const isGemini = line.includes("[gemini]");
                          let color = "text-zinc-300";
                          if (isCmd) color = "text-cyan font-bold";
                          else if (isSuccess) color = "text-green font-bold";
                          else if (isGemini) color = "text-purple-400 font-semibold";
                          else if (line.includes("[info]")) color = "text-slate/80";

                          return (
                            <div key={lIdx} className={`${color} whitespace-pre-wrap break-all`}>
                              {line}
                            </div>
                          );
                        })
                      )}
                      <div ref={terminalBottomRef} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* IDE Bottom Status Bar */}
          <div className="px-4 py-1 bg-[#0b0f1a] border-t border-cyan/10 text-[9px] text-slate/50 flex justify-between select-none shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-green flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green animate-ping" />
                Live: Main Branch
              </span>
              <span>Errors: 0</span>
              <span>Warnings: 0</span>
            </div>
            <div className="flex items-center gap-3">
              <span>UTF-8</span>
              <span>TypeScript JSX</span>
              <span>Sai Kumar Thota &copy; 2026</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
