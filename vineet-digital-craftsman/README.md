# Vineet — Digital Craftsman

A responsive Next.js portfolio with an editorial dark interface, CSS-built workstation illustration, project filters, mobile navigation, reduced-motion support, and a Resend-backed contact endpoint.

## Run locally

1. Install Node.js 20 or later.
2. Run `npm install` in this folder.
3. Copy `.env.example` to `.env.local` and fill in the Resend API key, recipient address, and a sender address on a verified domain.
4. Run `npm run dev` and open the local URL printed by Next.js.

The contact endpoint is `POST /api/contact`. It validates input on the server and includes a honeypot field. Email delivery returns a configuration error until all three Resend environment values are set.

## Personalize before publishing

Update the placeholder social profile URLs and contact address in `app/page.tsx`, and replace the sample experience details and resume text with Vineet’s confirmed information. Project previews are original CSS mockups because no screenshots were supplied. The interface uses CSS scene construction rather than a WebGL/Three.js scene to keep the initial experience lightweight.
