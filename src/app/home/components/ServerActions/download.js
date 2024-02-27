'use server'
import { getSession } from "../../../../lib/lib";
export async function download (filekey){

    const session = await getSession();
    let token = session.signed_user_token;
    const response = await fetch(`${process.env.BASE_URL}/api/v1/files/specific?key=${filekey}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    });
    return response.json();

}