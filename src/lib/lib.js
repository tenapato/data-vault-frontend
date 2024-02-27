import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
    .sign(key);
}

// export async function decrypt(input){
//   const { payload } = await jwtVerify(input, key, {
//     algorithms: ["HS256"],
//   });
//   return payload;
// }
export async function decrypt(input){
    try {
      const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
      });
      return payload;
    } catch (error) {
      console.error('Failed to decrypt JWT:', error);
      throw error;
    }
  }


async function signIn(email, password) {
    try {
        const response = await fetch(
            `${process.env.BASE_URL}/api/v1/users/signin`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }) // Fixed the body parameter
            }
        ).then((response) => response.json());
        //  console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function login(formData) {
  // Verify credentials && get the user
//   const user = { email: formData.get("email"), name: "John" };

  const user = { email: formData.get("email"), password: formData.get("password"), name: "John" };

  let user_test = await signIn(user.email,user.password);

  if(user_test.session === null){
    throw new Error("Forbidden");
  }

  let signed_user_token  = user_test.session.access_token;

  // Create the session
const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week
  const session = await encrypt({ signed_user_token, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  try {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
}

export async function updateSession(request) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}