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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Admin Dashboard & Security

The project includes a secure Admin Dashboard at `/admin` to manage contact form submissions.

### Accessing the Dashboard
- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Default Username**: `admin`
- **Default Password**: `houseghost2026`

### Security Features
- **Authentication**: Secured via HttpOnly cookies and session management.
- **Password Hashing**: Credentials are NOT stored in plain text. They are hashed using SHA-256 in the `.env.local` file.
- **Data Privacy**: Submissions are stored in `src/data/contacts.json`, which is excluded from version control (Git) via `.gitignore`.

### Configuration (.env.local)
To change the credentials, update the following values in your `.env.local`:
- `ADMIN_USERNAME`: Your desired username.
- `ADMIN_PASSWORD_HASH`: The SHA-256 hash of your new password.

**How to generate a new password hash:**
Run the following command in your terminal to generate a hash for your new password (replace `YourNewPassword`):
```bash
node -e "console.log(require('crypto').createHash('sha256').update('YourNewPassword').digest('hex'))"
```

### Deployment Note
When deploying (e.g., to Vercel), ensure you set the following **Environment Variables** in your hosting provider's dashboard:
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_HASH`
- `AUTH_SECRET` (A long random string for session encryption)

