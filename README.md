This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://<ip>:3000](http://<ip>:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin Dashboard & Security

The project includes a secure Admin Dashboard at `/admin` to manage contact form submissions.

### Accessing the Dashboard
- **URL**: [http://<ip>:3000/admin](http://<ip>:3000/admin)
- **Default Username**: `admin`
- **Default Password**: `houseghost2026`

### Security Features
- **Authentication**: Secured via HttpOnly cookies and session management.
- **Password Hashing**: Credentials are NOT stored in plain text. They are hashed using SHA-256 in the `.env.local` file.
- **Data Privacy**: Submissions are stored in `src/data/contacts.json`, which is excluded from version control (Git) via `.gitignore`.

### Configuration (.env.local)
To change the credentials, update the following values in your `.env.local`:
- `ADMIN_USERNAME`: Your desired username.
- `ADMIN_PASSWORD_HASH`: The hash of your new password.

### How to update your password
- Open a terminal in your project directory.
- Run the generator script with your desired password:
- node generate-hash.js "DEIN_PASSWORT"

### Deployment Note
When deploying (e.g., to Vercel), ensure you set the following **Environment Variables** in your hosting provider's dashboard:
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_HASH`
- `AUTH_SECRET` (A long random string for session encryption)

