"use client";

import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/context/portfolio-context";
import { 
  Terminal, ShieldCheck, Save, RefreshCw, Download, 
  Database, User, Code2, GitBranch, Server, ArrowLeft, 
  Trash2, Plus, AlertCircle, CheckCircle2, Key 
} from "lucide-react";
import Link from "next/link";
import { PortfolioData, Project, Commit, AchievementLog, FolderData, Skill } from "@/types/portfolio";

export default function AdminPage() {
  const { portfolioData, loading, saveData, resetData, isDbConfigured } = usePortfolio();
  
  // Auth State
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<"profile" | "skills" | "experience" | "projects" | "achievements" | "db" | "raw">("profile");

  // Local Editable State
  const [editedData, setEditedData] = useState<PortfolioData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Raw JSON text state
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState("");

  // Sync state once portfolio data loads
  useEffect(() => {
    if (portfolioData) {
      setEditedData(JSON.parse(JSON.stringify(portfolioData)));
      setJsonText(JSON.stringify(portfolioData, null, 2));
    }
  }, [portfolioData]);

  // Auth Submit handler
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsAuthenticating(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        // Save in session storage to avoid re-login on refresh
        sessionStorage.setItem("admin_auth_token", data.token);
      } else {
        setAuthError(data.error || "Authentication failed.");
      }
    } catch (err) {
      setAuthError("Failed to connect to authentication server.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Check session storage on load
  useEffect(() => {
    const token = sessionStorage.getItem("admin_auth_token");
    if (token === "sai_portfolio_admin_authorized_token") {
      setIsAuthenticated(true);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080B10] flex items-center justify-center font-mono text-cyan text-sm">
        $ fetching_system_config...
      </div>
    );
  }

  // ---------------------------------------------------------
  // Auth Screen
  // ---------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#080B10] flex items-center justify-center p-6 relative overflow-hidden font-mono select-none">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#080B10_95%),linear-gradient(to_right,rgba(0,212,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,212,255,0.02)_1px,transparent_1px)] bg-[size:100%_100%,24px_24px,24px_24px] pointer-events-none" />

        <div className="w-full max-w-md z-10">
          {/* Logo Back */}
          <div className="mb-6 flex justify-between items-center text-xs">
            <Link href="/" className="flex items-center gap-1 text-slate hover:text-cyan transition-colors">
              <ArrowLeft className="h-3 w-3" />
              <span>back to portfolio</span>
            </Link>
            <span className="text-slate/30">system_auth_v1.0</span>
          </div>

          {/* Terminal Window */}
          <div className="bg-[#0D1117] border border-cyan/15 rounded-lg overflow-hidden scanlines shadow-2xl">
            {/* Header */}
            <div className="px-4 py-2.5 bg-[#161B22] border-b border-cyan/10 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              <span className="text-slate/60 text-xs ml-2 flex items-center gap-1">
                <Key className="h-3.5 w-3.5 text-cyan" />
                <span>sudo access --admin</span>
              </span>
            </div>

            {/* Body */}
            <form onSubmit={handleAuth} className="p-6 space-y-6">
              <div className="text-xs text-slate/70">
                $ sh authenticate_admin.sh --require-passphrase
                <br />
                <span className="text-green-400">&gt; Status: Listening for credentials. Default is "admin".</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-cyan">$ passphrase --input</label>
                <div className="flex items-center bg-[#0a0e14] border border-cyan/10 focus-within:border-cyan/30 rounded px-3 py-2 transition-all">
                  <span className="text-slate/40 text-xs mr-2">[</span>
                  <input
                    type="password"
                    required
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent outline-none text-white text-xs md:text-sm placeholder:text-slate/20"
                    autoFocus
                  />
                  <span className="text-slate/40 text-xs ml-2">]</span>
                </div>
              </div>

              {authError && (
                <div className="text-red-400 text-xs p-2.5 rounded bg-red-950/10 border border-red-900/20 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>bash: {authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-2 bg-cyan/5 border border-cyan/20 hover:bg-cyan hover:text-[#080B10] text-cyan rounded text-xs transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isAuthenticating ? "Authenticating..." : "./execute_login.sh"}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  if (!editedData) return null;

  // ---------------------------------------------------------
  // Change Helpers
  // ---------------------------------------------------------
  const handleProfileChange = (key: keyof typeof editedData.profile, value: string) => {
    setEditedData(prev => {
      if (!prev) return null;
      const next = { ...prev };
      next.profile = { ...next.profile, [key]: value };
      return next;
    });
  };

  const handleSocialChange = (key: keyof typeof editedData.socials, value: string) => {
    setEditedData(prev => {
      if (!prev) return null;
      const next = { ...prev };
      next.socials = { ...next.socials, [key]: value };
      return next;
    });
  };

  // Add/Remove Project
  const addProject = () => {
    const newProj: Project = {
      id: `project-${Date.now()}`,
      name: "New Project",
      gitURL: "https://github.com",
      liveURL: "",
      description: "Short project summary description...",
      technologies: ["React", "TypeScript"],
      year: new Date().getFullYear().toString(),
      features: ["Feature Item 1"]
    };
    setEditedData(prev => {
      if (!prev) return null;
      return { ...prev, projects: [...prev.projects, newProj] };
    });
  };

  const removeProject = (id: string) => {
    setEditedData(prev => {
      if (!prev) return null;
      return { ...prev, projects: prev.projects.filter(p => p.id !== id) };
    });
  };

  const updateProject = (idx: number, key: keyof Project, value: any) => {
    setEditedData(prev => {
      if (!prev) return null;
      const next = { ...prev };
      const nextProj = [...next.projects];
      nextProj[idx] = { ...nextProj[idx], [key]: value };
      next.projects = nextProj;
      return next;
    });
  };

  // Add/Remove Commit (Experience)
  const addCommit = () => {
    const newCommit: Commit = {
      hash: Math.random().toString(16).substring(2, 9),
      branch: "feat/new-milestone",
      type: "feat",
      scope: "experience",
      subject: "New Experience Item",
      author: `${editedData.profile.name} <${editedData.profile.email}>`,
      date: "2026 - Present",
      themeColor: "cyan",
      details: ["Achieved core development operations targets"]
    };
    setEditedData(prev => {
      if (!prev) return null;
      return { ...prev, experience: [...prev.experience, newCommit] };
    });
  };

  const removeCommit = (hash: string) => {
    setEditedData(prev => {
      if (!prev) return null;
      return { ...prev, experience: prev.experience.filter(c => c.hash !== hash) };
    });
  };

  const updateCommit = (idx: number, key: keyof Commit, value: any) => {
    setEditedData(prev => {
      if (!prev) return null;
      const next = { ...prev };
      const nextCommits = [...next.experience];
      nextCommits[idx] = { ...nextCommits[idx], [key]: value };
      next.experience = nextCommits;
      return next;
    });
  };

  // Add/Remove Achievements
  const addAchievement = () => {
    const newLog: AchievementLog = {
      timestamp: new Date().toTimeString().split(" ")[0],
      service: "custom-success.service",
      status: "OK",
      message: "LOADED Custom Achievement Title",
      subtext: "Additional certification or qualification details..."
    };
    setEditedData(prev => {
      if (!prev) return null;
      return { ...prev, achievements: [...prev.achievements, newLog] };
    });
  };

  const removeAchievement = (idx: number) => {
    setEditedData(prev => {
      if (!prev) return null;
      return { ...prev, achievements: prev.achievements.filter((_, i) => i !== idx) };
    });
  };

  const updateAchievement = (idx: number, key: keyof AchievementLog, value: any) => {
    setEditedData(prev => {
      if (!prev) return null;
      const next = { ...prev };
      const nextLogs = [...next.achievements];
      nextLogs[idx] = { ...nextLogs[idx], [key]: value };
      next.achievements = nextLogs;
      return next;
    });
  };

  // Save changes to context/database
  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    // If active tab is raw JSON, load it first
    let payload = editedData;
    if (activeTab === "raw") {
      try {
        const parsed = JSON.parse(jsonText);
        setEditedData(parsed);
        payload = parsed;
        setJsonError("");
      } catch (err: any) {
        setJsonError(`JSON Syntax Error: ${err.message}`);
        setIsSaving(false);
        return;
      }
    }

    const result = await saveData(payload);
    setIsSaving(false);
    
    if (result.success) {
      setSaveStatus({ success: true, message: "Portfolio Database synchronized successfully!" });
      // Update JSON textbox
      setJsonText(JSON.stringify(payload, null, 2));
    } else {
      setSaveStatus({ success: false, message: result.error || "Failed to sync database." });
    }

    // Auto-clear message in 4s
    setTimeout(() => setSaveStatus(null), 4000);
  };

  // Download Config File
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(editedData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Reset to static code defaults
  const handleReset = async () => {
    if (window.confirm("Are you sure you want to revert all changes? This will clear Supabase override rows and local storage configurations.")) {
      setIsSaving(true);
      await resetData();
      setIsSaving(false);
      setEditedData(JSON.parse(JSON.stringify(portfolioData)));
      setJsonText(JSON.stringify(portfolioData, null, 2));
      setSaveStatus({ success: true, message: "Configurations restored to repository defaults." });
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  // Raw JSON edit text changer
  const handleJsonChange = (val: string) => {
    setJsonText(val);
    try {
      JSON.parse(val);
      setJsonError("");
    } catch (err: any) {
      setJsonError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#080B10] flex flex-col relative overflow-hidden font-mono text-white select-text">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4ff01_1px,transparent_1px),linear-gradient(to_bottom,#00d4ff01_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Header Panel */}
      <header className="bg-[#0D1117] border-b border-cyan/15 py-3 px-6 z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1 rounded border border-cyan/15 text-slate hover:text-cyan hover:border-cyan/35 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-cyan" />
            <h1 className="text-sm md:text-base font-bold tracking-wider text-white">
              saikumarthota@portfolio-db:~/admin
            </h1>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDownload}
            title="Download JSON config"
            className="px-2.5 py-1.5 rounded border border-slate/30 bg-slate/5 text-slate hover:text-white hover:border-white transition-all text-xs flex items-center gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>
          
          <button
            onClick={handleReset}
            title="Reset Database to code defaults"
            className="px-2.5 py-1.5 rounded border border-red-900/30 bg-red-950/5 text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-all text-xs flex items-center gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Revert Defaults</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-3 py-1.5 rounded border border-green/30 bg-green/5 text-green hover:bg-green hover:text-[#080B10] shadow-[0_0_12px_rgba(0,255,136,0.05)] transition-all duration-300 text-xs flex items-center gap-1.5"
          >
            <Save className="h-3.5 w-3.5" />
            <span>{isSaving ? "Syncing..." : "Save to Database"}</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace split pane */}
      <div className="flex-grow flex flex-col md:flex-row items-stretch z-10">
        
        {/* Left Sidebar Menu */}
        <nav className="w-full md:w-56 bg-[#0D1117] border-r border-cyan/10 flex-shrink-0 font-mono text-xs select-none">
          <div className="p-3 text-[10px] text-slate/40 tracking-wider"># WORKSPACE SHEETS</div>
          <ul className="space-y-1 px-2">
            {[
              { id: "profile", label: "Profile & Contact", icon: User },
              { id: "projects", label: "Projects Grid", icon: Code2 },
              { id: "experience", label: "Git Timeline", icon: GitBranch },
              { id: "achievements", label: "Boot Certs logs", icon: Server },
              { id: "raw", label: "Raw JSON Editor", icon: Terminal },
              { id: "db", label: "Supabase Settings", icon: Database }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full text-left px-3 py-2 rounded flex items-center gap-2.5 transition-all ${
                      activeTab === tab.id
                        ? "text-cyan bg-cyan/5 border-l-2 border-cyan font-bold"
                        : "text-slate hover:text-white hover:bg-slate/5"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="p-4 mt-8 mx-2 rounded border border-cyan/5 bg-[#0a0e14] text-[11px] leading-relaxed text-slate/50">
            <div className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isDbConfigured ? "bg-green" : "bg-yellow-500 animate-ping"}`} />
              <span>DB CONNECTION:</span>
            </div>
            {isDbConfigured ? (
              <span className="text-green/80">Active (Supabase connected)</span>
            ) : (
              <span className="text-yellow-400">Offline (Using LocalStorage cache)</span>
            )}
          </div>
        </nav>

        {/* Right Main Pane Editor forms */}
        <section className="flex-grow bg-[#080B10] p-6 overflow-y-auto max-h-[calc(100vh-130px)] md:max-h-[calc(100vh-60px)]">
          
          {/* Notification Messages */}
          {saveStatus && (
            <div className={`mb-6 p-4 rounded border text-xs font-mono flex items-start gap-2.5 ${
              saveStatus.success 
                ? "bg-green/5 border-green/30 text-green" 
                : "bg-red-950/10 border-red-900/20 text-red-400"
            }`}>
              {saveStatus.success ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> : <AlertCircle className="h-4 w-4 flex-shrink-0" />}
              <span>{saveStatus.message}</span>
            </div>
          )}

          {/* Tab 1: Profile & Contact */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white border-b border-cyan/5 pb-2">Edit Profile Diagnostics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "name", label: "Full Name" },
                  { key: "role", label: "Current Role" },
                  { key: "exp", label: "Internship / Experience Summary" },
                  { key: "superpower", label: "Key Superpower" },
                  { key: "status", label: "Job Status Banner" },
                  { key: "email", label: "Contact Email" },
                  { key: "phone", label: "Contact Phone" },
                  { key: "location", label: "Location" }
                ].map((field) => (
                  <div key={field.key} className="flex flex-col gap-1.5">
                    <label className="text-xs text-cyan">$ profile.{field.key}</label>
                    <input
                      type="text"
                      value={editedData.profile[field.key as keyof typeof editedData.profile] || ""}
                      onChange={(e) => handleProfileChange(field.key as any, e.target.value)}
                      className="bg-[#0D1117] border border-cyan/15 rounded px-3 py-2 text-xs md:text-sm font-mono text-white outline-none focus:border-cyan/40"
                    />
                  </div>
                ))}
              </div>

              <h2 className="text-lg font-bold text-white border-b border-cyan/5 pb-2 pt-6">Edit Networking Endpoints (Socials)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "github", label: "GitHub Profile Link" },
                  { key: "linkedin", label: "LinkedIn Profile Link" }
                ].map((field) => (
                  <div key={field.key} className="flex flex-col gap-1.5">
                    <label className="text-xs text-cyan">$ socials.{field.key}</label>
                    <input
                      type="text"
                      value={editedData.socials[field.key as keyof typeof editedData.socials] || ""}
                      onChange={(e) => handleSocialChange(field.key as any, e.target.value)}
                      className="bg-[#0D1117] border border-cyan/15 rounded px-3 py-2 text-xs md:text-sm font-mono text-white outline-none focus:border-cyan/40"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Projects */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-cyan/5 pb-2">
                <h2 className="text-lg font-bold text-white">Edit Projects Workspace</h2>
                <button
                  onClick={addProject}
                  className="px-2 py-1 rounded border border-cyan/30 text-cyan text-xs hover:bg-cyan/5 flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {editedData.projects.length === 0 ? (
                <p className="text-slate text-xs italic">No projects found. Click Add Project to create one.</p>
              ) : (
                <div className="space-y-6">
                  {editedData.projects.map((project, idx) => (
                    <div key={project.id} className="bg-[#0D1117] border border-cyan/15 rounded-lg p-5 relative space-y-4">
                      {/* Trash */}
                      <button
                        onClick={() => removeProject(project.id)}
                        className="absolute top-4 right-4 p-1.5 rounded border border-red-900/30 text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="text-xs text-slate/50"># Project index {idx + 1}</div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-cyan">$ project.name</label>
                          <input
                            type="text"
                            value={project.name}
                            onChange={(e) => updateProject(idx, "name", e.target.value)}
                            className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-cyan">$ project.id</label>
                          <input
                            type="text"
                            value={project.id}
                            onChange={(e) => updateProject(idx, "id", e.target.value)}
                            className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-cyan">$ project.gitURL</label>
                          <input
                            type="text"
                            value={project.gitURL}
                            onChange={(e) => updateProject(idx, "gitURL", e.target.value)}
                            className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-cyan">$ project.liveURL</label>
                          <input
                            type="text"
                            value={project.liveURL}
                            onChange={(e) => updateProject(idx, "liveURL", e.target.value)}
                            className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-cyan">$ project.year</label>
                          <input
                            type="text"
                            value={project.year}
                            onChange={(e) => updateProject(idx, "year", e.target.value)}
                            className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-cyan">$ project.description</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(idx, "description", e.target.value)}
                          rows={2}
                          className="bg-[#080B10] border border-cyan/10 rounded px-3 py-2 text-xs font-mono text-white outline-none focus:border-cyan/35 resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-cyan">$ project.technologies (comma separated)</label>
                          <input
                            type="text"
                            value={project.technologies.join(", ")}
                            onChange={(e) => updateProject(idx, "technologies", e.target.value.split(",").map(s => s.trim()))}
                            className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-cyan">$ project.features (comma separated)</label>
                          <input
                            type="text"
                            value={project.features.join(", ")}
                            onChange={(e) => updateProject(idx, "features", e.target.value.split(",").map(s => s.trim()))}
                            className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Experience */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-cyan/5 pb-2">
                <h2 className="text-lg font-bold text-white">Edit Git timeline logs (Experience)</h2>
                <button
                  onClick={addCommit}
                  className="px-2 py-1 rounded border border-cyan/30 text-cyan text-xs hover:bg-cyan/5 flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Commit</span>
                </button>
              </div>

              <div className="space-y-6">
                {editedData.experience.map((commit, idx) => (
                  <div key={commit.hash} className="bg-[#0D1117] border border-cyan/15 rounded-lg p-5 relative space-y-4">
                    {/* Trash */}
                    <button
                      onClick={() => removeCommit(commit.hash)}
                      className="absolute top-4 right-4 p-1.5 rounded border border-red-900/30 text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors"
                      title="Delete commit"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="text-xs text-slate/50"># Commit hash: {commit.hash}</div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-cyan">$ commit.subject</label>
                        <input
                          type="text"
                          value={commit.subject}
                          onChange={(e) => updateCommit(idx, "subject", e.target.value)}
                          className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-cyan">$ commit.branch</label>
                        <input
                          type="text"
                          value={commit.branch}
                          onChange={(e) => updateCommit(idx, "branch", e.target.value)}
                          className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-cyan">$ commit.date</label>
                        <input
                          type="text"
                          value={commit.date}
                          onChange={(e) => updateCommit(idx, "date", e.target.value)}
                          className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-xs text-cyan">$ commit.author</label>
                        <input
                          type="text"
                          value={commit.author}
                          onChange={(e) => updateCommit(idx, "author", e.target.value)}
                          className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-cyan">$ commit.themeColor</label>
                        <select
                          value={commit.themeColor}
                          onChange={(e) => updateCommit(idx, "themeColor", e.target.value)}
                          className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                        >
                          <option value="cyan">Cyan</option>
                          <option value="green">Green</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-cyan">$ commit.hash (7 char)</label>
                        <input
                          type="text"
                          maxLength={7}
                          value={commit.hash}
                          onChange={(e) => updateCommit(idx, "hash", e.target.value)}
                          className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-cyan">$ commit.details (One bullet point per line)</label>
                      <textarea
                        value={commit.details.join("\n")}
                        onChange={(e) => updateCommit(idx, "details", e.target.value.split("\n"))}
                        rows={4}
                        className="bg-[#080B10] border border-cyan/10 rounded px-3 py-2 text-xs font-mono text-white outline-none focus:border-cyan/35"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Achievements */}
          {activeTab === "achievements" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-cyan/5 pb-2">
                <h2 className="text-lg font-bold text-white">Edit systemd boot outputs (Achievements)</h2>
                <button
                  onClick={addAchievement}
                  className="px-2 py-1 rounded border border-cyan/30 text-cyan text-xs hover:bg-cyan/5 flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Log</span>
                </button>
              </div>

              <div className="space-y-6">
                {editedData.achievements.map((log, idx) => (
                  <div key={idx} className="bg-[#0D1117] border border-cyan/15 rounded-lg p-5 relative space-y-4">
                    {/* Trash */}
                    <button
                      onClick={() => removeAchievement(idx)}
                      className="absolute top-4 right-4 p-1.5 rounded border border-red-900/30 text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors"
                      title="Delete log"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="text-xs text-slate/50 font-mono"># Systemd Service log index {idx + 1}</div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-cyan">$ log.service</label>
                        <input
                          type="text"
                          value={log.service}
                          onChange={(e) => updateAchievement(idx, "service", e.target.value)}
                          className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-cyan">$ log.timestamp</label>
                        <input
                          type="text"
                          value={log.timestamp}
                          onChange={(e) => updateAchievement(idx, "timestamp", e.target.value)}
                          className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-cyan">$ log.status</label>
                        <select
                          value={log.status}
                          onChange={(e) => updateAchievement(idx, "status", e.target.value)}
                          className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                        >
                          <option value="OK">OK (Success)</option>
                          <option value="INFO">INFO (Notice)</option>
                          <option value="WARN">WARN (Warning)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-cyan">$ log.message</label>
                      <input
                        type="text"
                        value={log.message}
                        onChange={(e) => updateAchievement(idx, "message", e.target.value)}
                        className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-cyan">$ log.subtext</label>
                      <input
                        type="text"
                        value={log.subtext || ""}
                        onChange={(e) => updateAchievement(idx, "subtext", e.target.value)}
                        className="bg-[#080B10] border border-cyan/10 rounded px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-cyan/35"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Raw JSON Editor */}
          {activeTab === "raw" && (
            <div className="space-y-4 h-full flex flex-col">
              <div className="flex justify-between items-center border-b border-cyan/5 pb-2">
                <h2 className="text-lg font-bold text-white">Advanced JSON Code Configuration</h2>
                <span className="text-[10px] text-slate/50">Modify full config payload</span>
              </div>

              <div className="flex-grow flex flex-col gap-2">
                <textarea
                  value={jsonText}
                  onChange={(e) => handleJsonChange(e.target.value)}
                  rows={20}
                  className="w-full bg-[#0D1117] border border-cyan/15 rounded p-4 font-mono text-xs text-green-400 focus:border-cyan/40 outline-none leading-relaxed resize-y h-[420px]"
                />
                
                {jsonError && (
                  <div className="text-red-400 text-xs p-3 rounded bg-red-950/10 border border-red-900/20 font-mono">
                    {jsonError}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 6: Supabase & DB Setup */}
          {activeTab === "db" && (
            <div className="space-y-6 max-w-3xl">
              <h2 className="text-lg font-bold text-white border-b border-cyan/5 pb-2">Supabase Settings Info</h2>
              
              <div className="p-4 rounded-lg bg-[#0D1117] border border-cyan/10 space-y-4">
                <p className="text-xs md:text-sm text-slate leading-relaxed">
                  Your portfolio is currently connected to Supabase URL: 
                  <code className="text-cyan ml-2 bg-bg px-2 py-0.5 rounded text-xs select-all">
                    {process.env.NEXT_PUBLIC_SUPABASE_URL || "Not configured"}
                  </code>
                </p>

                <p className="text-xs md:text-sm text-slate leading-relaxed">
                  If this is your first time setting up the database, you **MUST** run the following query inside the **Supabase SQL Editor** dashboard. This builds the `portfolio_config` table and initializes it:
                </p>

                {/* SQL Code Block */}
                <div className="relative">
                  <pre className="p-4 rounded bg-[#080B10] border border-cyan/15 text-green-400 text-xs overflow-x-auto select-all leading-relaxed font-mono">
{`CREATE TABLE IF NOT EXISTS portfolio_config (
  id INTEGER PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Initialize placeholder row
INSERT INTO portfolio_config (id, data)
VALUES (1, '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;`}
                  </pre>
                  <span className="absolute top-2 right-2 text-[10px] text-slate/40"># Copy/Paste SQL</span>
                </div>

                <div className="p-3 bg-cyan/5 border border-cyan/20 rounded flex items-start gap-2.5 text-xs text-cyan leading-relaxed">
                  <AlertCircle className="h-4.5 w-4.5 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold">PRODUCTION TIP:</span> When you make modifications, they are committed to Supabase immediately. If you ever deploy new changes or run the code on another machine, the page will query Supabase and download the updated state instantly.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 7: Skills list placeholder */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white border-b border-cyan/5 pb-2">Skills Folder Explorer (JSON representation)</h2>
              <p className="text-xs text-slate">
                To edit skills, their fileName, proficiency, experience descriptions, key concepts, or mock code execution snippets, use the **Raw JSON Editor** tab. This allows you to manage the array elements with code highlights and prevents syntax errors.
              </p>
              
              {/* Highlight helper */}
              <div className="p-4 bg-cyan/5 border border-cyan/10 rounded-lg text-xs leading-relaxed text-slate space-y-3 font-mono">
                <div className="text-cyan font-bold flex items-center gap-1.5">
                  <Code2 className="h-4 w-4" />
                  <span>Format Example for Skills JSON:</span>
                </div>
                <pre className="p-3 bg-bg rounded border border-cyan/15 text-green-400 overflow-x-auto text-[11px]">
{`{
  "name": "Languages",
  "themeColor": "slate",
  "summaryCode": "{ ... }",
  "skills": [
    {
      "name": "TypeScript",
      "fileName": "typescript.ts",
      "category": "Languages",
      "themeColor": "slate",
      "proficiency": 92,
      "experience": "3+ Years",
      "description": "Robust type-safety configuration...",
      "keyConcepts": ["Generics", "Strict Compiler"],
      "code": "const level = 'Expert';"
    }
  ]
}`}
                </pre>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}