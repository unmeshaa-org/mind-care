(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__96d80cb2._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/ [middleware-edge] (unsupported edge import 'crypto', ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.n(__import_unsupported(`crypto`));
}),
"[project]/lib/adminAuth.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminToken",
    ()=>createAdminToken,
    "getAdminCookieHeader",
    ()=>getAdminCookieHeader,
    "getAdminCookieValue",
    ()=>getAdminCookieValue,
    "verifyAdminToken",
    ()=>verifyAdminToken
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$crypto$272c$__ecmascript$29$__ = __turbopack_context__.i("[project]/ [middleware-edge] (unsupported edge import 'crypto', ecmascript)");
;
const SECRET = process.env.ADMIN_SECRET || process.env.NEXTAUTH_SECRET || '';
const COOKIE_NAME = 'admin_session';
const TOKEN_VALIDITY_SECONDS = 60 * 60 * 24; // 24 hours
function createAdminToken() {
    if (!SECRET) {
        throw new Error('ADMIN_SECRET / NEXTAUTH_SECRET is not set');
    }
    const exp = Math.floor(Date.now() / 1000) + TOKEN_VALIDITY_SECONDS;
    const payload = `${exp}`;
    const signature = __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$crypto$272c$__ecmascript$29$__["default"].createHmac('sha256', SECRET).update(payload).digest('hex');
    return `${payload}.${signature}`;
}
function verifyAdminToken(token) {
    if (!token || !SECRET) return false;
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [expStr, signature] = parts;
    const exp = Number(expStr);
    if (!exp || exp < Math.floor(Date.now() / 1000)) return false;
    const expected = __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$crypto$272c$__ecmascript$29$__["default"].createHmac('sha256', SECRET).update(expStr).digest('hex');
    return __TURBOPACK__imported__module__$5b$project$5d2f$__$5b$middleware$2d$edge$5d$__$28$unsupported__edge__import__$27$crypto$272c$__ecmascript$29$__["default"].timingSafeEqual(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(signature), __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(expected));
}
function getAdminCookieValue(req) {
    const cookie = req.headers.get('cookie');
    if (!cookie) return null;
    const match = cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]+)`));
    return match ? decodeURIComponent(match[1]) : null;
}
function getAdminCookieHeader(token) {
    if (!token) {
        return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
    }
    return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${TOKEN_VALIDITY_SECONDS}; HttpOnly; Secure; SameSite=Lax`;
}
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/adminAuth.ts [middleware-edge] (ecmascript)");
;
;
const PUBLIC_PATHS = [
    '/admin/login',
    '/api/admin/login',
    '/api/admin/logout'
];
function middleware(req) {
    const { pathname } = req.nextUrl;
    // Only protect admin paths
    if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // allow public admin endpoints
    if (PUBLIC_PATHS.some((path)=>pathname.startsWith(path))) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getAdminCookieValue"])(req);
    const isAuthenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminAuth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["verifyAdminToken"])(token);
    if (!isAuthenticated) {
        const loginUrl = new URL('/admin/login', req.url);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        '/admin/:path*',
        '/api/admin/:path*'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__96d80cb2._.js.map