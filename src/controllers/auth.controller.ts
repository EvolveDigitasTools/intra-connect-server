import axios from "axios";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import Department from "../models/Department";
import User from "../models/User";
import UserDepartment from "../models/UserDepartment";

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
        const userInfo: any = jwt.decode(response.data.id_token)
        const token = jwt.sign({ email: userInfo?.email }, JWTKEY);
        const user = await User.findOne({ where: { email: userInfo.email } })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Login Failure. Please ask your admin to register you in the platform'
            })
        }
        User.update({
            accessToken: token,
            zohoAccessToken: response.data.access_token,
            refreshToken: response.data.refresh_token
        }, {
            where: {
                email: userInfo.email
            }
        })

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

export const logout: RequestHandler = async (req, res) => {
    try {
        const user = await User.findOne({where: {accessToken: req.header('Authorization')}})
        User.update({
            accessToken: null,
            zohoAccessToken: null,
            refreshToken: null
        }, {
            where: {
                email: user?.email
            }
        })

        return res.status(201).json({
            success: true,
            message: `Logout success`
        });

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "auth.controller.js -> logout"
            },
        });
    }
};

export const newEmployee: RequestHandler = async (req, res) => {
    try {
        const { email, department } = req.body;

        let employeeDepartment = await Department.findOne({ where: { name: department } })
        console.log(employeeDepartment, department)
        if (!employeeDepartment) {
            employeeDepartment = await Department.create({
                name: department
            })
        }
        let newEmployee = await User.create({
            email
        })

        let employeeDepartmentRel = await UserDepartment.create({
            userId: newEmployee.id,
            departmentId: employeeDepartment.id
        })

        if (employeeDepartmentRel)
            return res.status(201).json({
                success: true,
                message: `Employee Added`,
                data: {
                },
            });
        else
            return res.status(400).json({
                success: false,
                message: 'Some error occured in auth.controller.ts -> newEmployee',
                data: {}
            })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "auth.controller.js -> newEmployee"
            },
        });
    }
};