# Effortless GitHub Webhook Integration with Jenkins & Ngrok

This guide walks you through connecting GitHub to your local Jenkins using Ngrok for secure tunneling. Follow these simple steps to automate builds on every git push—even if Jenkins is running locally!

---

## Prerequisites

- **Git** (installed)
- **Ngrok** (downloaded & unzipped)
- **Jenkins** (installed & running)
- **MySQL** database (with your credentials)

---

## Step 1: Initialize Your Git Repository

If you haven’t already, set up your project as a Git repository:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

---

## Step 2: Expose Jenkins with Ngrok

1. **Navigate to your Ngrok folder** and open a terminal there.
2. **Start Ngrok** on the port Jenkins uses (default is 8080):
    ```bash
    ngrok http 8080
    ```
   > _Tip: If Jenkins runs on a different port, replace `8080` with your port number._

3. **Copy the HTTPS forwarding URL** that Ngrok displays in your terminal. It will look like:
    ```
    https://<your-ngrok-id>.ngrok-free.app
    ```

---

## Step 3: Connect GitHub Webhook

1. Go to your GitHub repository **Settings** > **Webhooks** > **Add webhook**.
2. In the **Payload URL** box, enter:
    ```
    https://<your-ngrok-id>.ngrok-free.app/github_webhook/
    ```
   > _Replace `<your-ngrok-id>` with your actual Ngrok address._

3. Set **Content type** to `application/json`.
4. Set trigger event to push 
    > This is selected as default in the webhook
5. Save the webhook.

---

## Step 4: Start Jenkins (If Not Already Running)

- Make sure Jenkins is up and running on your chosen port before you start Ngrok.
- Confirm Jenkins is accessible via the Ngrok URL (try opening it in a browser).

---

## Step 5: Configure Your Backend Environment

If your project uses a `.env` file or `docker-compose.yml` for environment variables, be sure to include your real MySQL password:
```
DB_PASSWORD=your_mysql_password
```

---

## Quick Tips

- **Order Matters:**  
  1. Start Jenkins  
  2. Start Ngrok  
  3. Update the GitHub webhook with the new Ngrok URL

- **Ngrok Free Version:**  
  Every time you restart Ngrok, you’ll get a new URL. You must update your GitHub webhook each time.

---

## How It Works

1. **Push Code to GitHub:**  
   When you push changes, GitHub sends a webhook to your Ngrok-exposed Jenkins.

2. **Trigger Jenkins:**  
   Jenkins receives the webhook, fetches the latest code, and kicks off an automated build (using your `Jenkinsfile`).

3. **Automatic Docker Build:**  
   Jenkins can automatically build your Docker images or run tests as defined in your project.

---

## Summary

With this setup, you get seamless, automated CI/CD for your local Jenkins instance—no public server required! Push code, and watch Jenkins do the rest.

---
