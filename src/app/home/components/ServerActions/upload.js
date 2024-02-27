'use server'
import { getSession } from "../../../../lib/lib";
export async function sendData(data, filename){

    const session = await getSession();
    let token = session.signed_user_token;
    const response = await fetch(`${process.env.BASE_URL}/api/v1/upload`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({data: data, filename: filename})
    });
    return response.json();
    
}