import axios from "axios";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const JWTKEY: string = process.env.JWTKEY || "MYNAME-IS-HELLOWORLD";

export const login: RequestHandler = async (req, res) => {
    try {
        const { authCode } = req.params;

        const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
            params: {
                code: authCode,
                redirect_uri: process.env.AUTH_REDIRECT_URL,
                client_id: process.env.AUTH_CLIENT_ID,
                client_secret: process.env.AUTH_CLIENT_SECRET,
                grant_type: 'authorization_code',
            }
        });
        // Store access token securely & use it for subsequent API requests.
        console.log('Access Token:', response.data.access_token);
        const userInfo: any = jwt.decode(response.data.id_token)
        const token = jwt.sign({ email: userInfo?.email}, JWTKEY);

        return res.status(201).json({
            success: true,
            message: `Login success`,
            data: {
                token,
                user: {
                    "gender": userInfo.gender,
                    "last_name": userInfo.last_name,
                    "picture": userInfo.picture,
                    "name": userInfo.name,
                    "first_name": userInfo.first_name,
                    "email": userInfo.email,
                }
            },
        });

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "auth.controller.js -> login"
            },
        });
    }
};