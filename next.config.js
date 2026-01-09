/** @type {import('next').NextConfig} */
const nextConfig = {
  // Isso força o Next.js a usar o require nativo do Node em vez de tentar fazer o bundle
  serverExternalPackages: ['node-pg-migrate', 'pg'],
}

module.exports = nextConfig