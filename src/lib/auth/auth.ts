export async function loginUser(email: string, password: string) {
    try {
        const response = await fetch("http://localhost:8080/api/v1/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            throw new Error("Login failed")
        }

        return await response.json()
    } catch (error) {
        throw new Error("Login failed")
    }
}

export async function signupUser(fullname: string, email: string, password: string) {
    try {
        // https://prospective-christal-uf-official-4b28783f.koyeb.app
        const response = await fetch("http://localhost:8080/api/v1/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fullname, email, password }),
        })

        if (!response.ok) {
            throw new Error("Signup failed")
        }

        return await response.json()
    } catch (error) {
        throw new Error("Signup failed")
    }
}

// import { getCookie } from 'cookies-next';
// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';

// export async function middleware(req: NextRequest) {
//     try {
//         const accessToken = getCookie('accessToken', { req });
//         if (!accessToken) {
//             return NextResponse.redirect(new URL('/login', req.url));
//         }
//     } catch (error) {
//         console.log('Error during token verification:', error);
//         return NextResponse.redirect(new URL('/login', req.url));
//     }
// }

// export const config = {
//     matcher: ['/', '/dashboard', '/About', '/Blogs', '/Contact'],
// };