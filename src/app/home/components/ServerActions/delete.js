'use server'
import { getSession } from "../../../../lib/lib";
export async function deleteFile (filekey){

    const session = await getSession();
    let token = session.signed_user_token;
    const response = await fetch(`${process.env.BASE_URL}/api/v1/files/delete?key=${filekey}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    });
    return response.json();

}