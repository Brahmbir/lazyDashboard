| Action Category        | Action                    | Requiring Permission / Role                                  |
| ---------------------- | ------------------------- | ------------------------------------------------------------ |
| **User Account**       | Create Account            | Open to all (Implicit)                                       |
|                        | View Profile              | Self                                                         |
|                        | Update Profile            | Self                                                         |
|                        | Delete Account            | Self                                                         |
| **Group Management**   | Create Group              | Registered User                                              |
|                        | View Group List           | Public                                                       |
|                        | View Group Details        | Public (or Group Members if private groups were added later) |
|                        | Edit Group Details        | canEditGroup or ADMIN Role (Application Logic)               |
|                        | Delete Group              | ADMIN Role or Group Creator (Application Logic)              |
| **Group Membership**   | Join Group                | Open Groups (or Invitation)                                  |
|                        | Leave Group               | Self                                                         |
|                        | View Group Members        | Group Members                                                |
| **Member Management**  | Add Members               | canManageMembers or ADMIN Role                               |
|                        | Remove Members            | canManageMembers or ADMIN Role                               |
|                        | Change Member Role        | canManageMembers or ADMIN Role (Application Logic)           |
|                        | Modify Member Permissions | canManageMembers or ADMIN Role                               |
| **Video Management**   | Upload Videos             | canUploadVideos or ADMIN Role                                |
|                        | View Group Videos         | Group Members                                                |
|                        | Delete Videos             | canDeleteVideos or ADMIN Role                                |
| **Adapter Management** | Add Adapter               | ADMIN Role or specific permission (Application Logic)        |
|                        | View Adapters             | Group Members                                                |
|                        | Update Adapter            | ADMIN Role or specific permission (Application Logic)        |
|                        | Delete Adapter            | ADMIN Role or specific permission (Application Logic)        |

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

SpongeBob SquarePants S01E01 [Help Wanted|Reef Blower|Tea at the Treedome].mp4

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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
