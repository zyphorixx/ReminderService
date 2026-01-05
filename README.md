📧 Reminder Service – Setup & Architecture Documentation

🔹 Overview

The Reminder Service is a backend microservice responsible for sending reminder emails (for example: flight reminders) at scheduled times.
It uses Node.js, Nodemailer, Message Queues, and Cron Jobs to ensure reliable and asynchronous email delivery.

This service is designed to work independently and can be plugged into a larger system like an Airline Management System.

⸻

🔹 Key Features
	•	📩 Send automated email reminders
	•	⏰ Schedule emails using cron jobs
	•	📬 Asynchronous processing using message queues
	•	🔐 Secure email sending via Gmail App Passwords
	•	♻️ Fault-tolerant (retries possible with queues)

⸻


🔹 Project Structure (Simplified)

ReminderService/
│
├── src/
│   ├── config/
│   │   ├── serverConfig.js
│   │   └── emailConfig.js
│   │
│   ├── services/
│   │   └── email-service.js
│   │
│   ├── jobs/
│   │   └── reminder-job.js
│   │
│   ├── queues/
│   │   └── email-queue.js
│   │
│   └── index.js
│
├── .env
├── package.json
└── README.md


⸻

🔹 Environment Variables Setup

Create a .env file in the root directory:

PORT=3004
EMAIL_ID=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password

⚠️ Important:
	•	EMAIL_PASS must be a Gmail App Password (not your normal Gmail password)
	•	Remove spaces from the app password

⸻

🔹 Email Configuration (Nodemailer)

We use Nodemailer to send emails securely using Gmail SMTP.

Why Nodemailer?
	•	Simple API
	•	Reliable SMTP handling
	•	Widely used in production systems

Emails are sent from a verified Gmail account using an App Password.

⸻

🔹 Message Queue Usage

The service uses a message queue to handle email sending asynchronously.

Why Message Queues?
	•	Prevents API blocking
	•	Handles high email volume
	•	Enables retries on failure
	•	Improves system reliability

Flow:
	1.	Reminder event occurs
	2.	Job is pushed to queue
	3.	Worker consumes the job
	4.	Email is sent via Nodemailer

⸻

🔹 Cron Jobs (Scheduling)

Cron jobs are used to check for pending reminders at regular intervals.

Why Cron Jobs?
	•	Time-based execution
	•	Ensures reminders are sent at correct time
	•	Works independently of user requests

Example Use Case:
	•	Every minute, cron checks database for reminders due
	•	Due reminders are pushed to the email queue

⸻

🔹 Application Flow (High Level)

Cron Job → Message Queue → Email Service → Gmail SMTP


⸻

🔹 How to Run the Project

1️⃣ Install dependencies

npm install

2️⃣ Start the service

npm start

3️⃣ Server will run on

http://localhost:3004

⸻
