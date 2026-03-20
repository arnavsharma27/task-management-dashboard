# GitHub Hosting Guide

Complete step-by-step guide to host your Task Management Dashboard on GitHub.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Initialize Git Repository](#step-1-initialize-git-repository)
3. [Step 2: Create GitHub Repository](#step-2-create-github-repository)
4. [Step 3: Push Code to GitHub](#step-3-push-code-to-github)
5. [Step 4: Deploy to GitHub Pages (Optional)](#step-4-deploy-to-github-pages-optional)
6. [Step 5: Update Repository Settings](#step-5-update-repository-settings)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- ✅ GitHub account ([Sign up here](https://github.com/signup) if you don't have one)
- ✅ Git installed on your system
- ✅ Your Task Dashboard project ready

**Check Git Installation:**
```bash
git --version
```

If Git is not installed:
- **Windows:** Download from [git-scm.com](https://git-scm.com/download/win)
- **Mac:** `brew install git` or download from [git-scm.com](https://git-scm.com/download/mac)
- **Linux:** `sudo apt-get install git` (Ubuntu/Debian) or `sudo yum install git` (CentOS/RHEL)

---

## Step 1: Initialize Git Repository

### 1.1 Navigate to Project Directory

```bash
cd /home/arnavsharma/Licious/task-dashboard
```

### 1.2 Initialize Git

```bash
git init
```

### 1.3 Configure Git (First Time Only)

Set your name and email (replace with your GitHub credentials):

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

**Or set globally for all repositories:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 1.4 Stage All Files

```bash
git add .
```

### 1.5 Create Initial Commit

```bash
git commit -m "Initial commit: Task Management Dashboard"
```

---

## Step 2: Create GitHub Repository

### 2.1 Go to GitHub

1. Open [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**

### 2.2 Repository Settings

Fill in the form:

- **Repository name:** `task-management-dashboard` (or any name you prefer)
- **Description:** `A modern Task Management Dashboard built with React, TypeScript, and MUI`
- **Visibility:** 
  - ✅ **Public** (if you want others to see it)
  - ✅ **Private** (if you want it private)
- **⚠️ DO NOT** check:
  - ❌ "Add a README file" (we already have one)
  - ❌ "Add .gitignore" (we already have one)
  - ❌ "Choose a license" (optional, add later if needed)

### 2.3 Create Repository

Click the green **"Create repository"** button.

### 2.4 Copy Repository URL

After creating, GitHub will show you a page with setup instructions. **Copy the repository URL:**

- **HTTPS:** `https://github.com/YOUR_USERNAME/task-management-dashboard.git`
- **SSH:** `git@github.com:YOUR_USERNAME/task-management-dashboard.git`

**Note:** Use HTTPS if you're not sure (easier for beginners).

---

## Step 3: Push Code to GitHub

### 3.1 Add Remote Repository

Replace `YOUR_USERNAME` and `REPO_NAME` with your actual values:

```bash
git remote add origin https://github.com/YOUR_USERNAME/task-management-dashboard.git
```

**Example:**
```bash
git remote add origin https://github.com/arnavsharma/task-management-dashboard.git
```

### 3.2 Verify Remote

```bash
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/task-management-dashboard.git (fetch)
origin  https://github.com/YOUR_USERNAME/task-management-dashboard.git (push)
```

### 3.3 Rename Branch to Main (if needed)

```bash
git branch -M main
```

### 3.4 Push to GitHub

```bash
git push -u origin main
```

**First time pushing?** GitHub will ask for authentication:
- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (not your GitHub password)

**How to create Personal Access Token:**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Task Dashboard")
4. Select scopes: ✅ `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)
7. Use this token as your password when pushing

---

## Step 4: Deploy to GitHub Pages (Optional)

If you want to host your app live on the web:

### 4.1 Install GitHub Pages Plugin

```bash
npm install --save-dev gh-pages
```

### 4.2 Update package.json

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://YOUR_USERNAME.github.io/task-management-dashboard"
}
```

**Replace `YOUR_USERNAME` with your GitHub username.**

### 4.3 Build and Deploy

```bash
npm run deploy
```

### 4.4 Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select **"gh-pages"** branch
5. Click **Save**

### 4.5 Access Your Live Site

Your app will be available at:
```
https://YOUR_USERNAME.github.io/task-management-dashboard
```

**Note:** It may take a few minutes for the site to go live after first deployment.

---

## Step 5: Update Repository Settings

### 5.1 Add Repository Description

1. Go to your repository
2. Click the **⚙️ Settings** icon (or "Edit" button) next to the repository name
3. Add description: `A modern Task Management Dashboard built with React, TypeScript, and MUI`

### 5.2 Add Topics/Tags

1. Click **⚙️ Settings** → **General** → Scroll to **Topics**
2. Add tags: `react`, `typescript`, `mui`, `task-management`, `dashboard`, `vite`

### 5.3 Update README.md

Make sure your `README.md` includes:
- Project description
- Features list
- Setup instructions (link to SETUP.md)
- Screenshots (optional but recommended)
- Technologies used

---

## Quick Command Reference

**Complete setup in one go (after creating GitHub repo):**

```bash
cd /home/arnavsharma/Licious/task-dashboard
git init
git add .
git commit -m "Initial commit: Task Management Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/task-management-dashboard.git
git push -u origin main
```

**For future updates:**

```bash
git add .
git commit -m "Your commit message"
git push
```

---

## Troubleshooting

### ❌ Error: "remote origin already exists"

**Solution:**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/task-management-dashboard.git
```

### ❌ Error: "Authentication failed"

**Solution:**
- Use Personal Access Token instead of password
- Or set up SSH keys (advanced)

### ❌ Error: "Permission denied"

**Solution:**
- Check repository URL is correct
- Verify you have write access to the repository
- Make sure you're using the correct GitHub account

### ❌ Error: "Failed to push some refs"

**Solution:**
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### ❌ GitHub Pages not showing

**Solution:**
- Wait 5-10 minutes after first deployment
- Check GitHub Pages settings (Source = gh-pages branch)
- Verify `homepage` field in package.json matches your repo name
- Check Actions tab for deployment errors

### ❌ Can't push because of large files

**Solution:**
- Check `.gitignore` includes `node_modules/`, `dist/`, etc.
- If you accidentally committed large files:
  ```bash
  git rm --cached node_modules -r
  git commit -m "Remove node_modules"
  git push
  ```

---

## Next Steps

✅ **Your code is now on GitHub!**

- Share the repository link with others
- Add collaborators in Settings → Collaborators
- Create issues for bugs/features
- Use GitHub Actions for CI/CD (advanced)
- Add a license file (MIT, Apache, etc.)

---

## Need Help?

- [GitHub Docs](https://docs.github.com/)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Pages Guide](https://pages.github.com/)

---

**🎉 Congratulations! Your Task Management Dashboard is now on GitHub!**
