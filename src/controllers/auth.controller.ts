import axios from "axios";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import Department from "../models/auth/Department";
import User from "../models/auth/User";
import UserDepartment from "../models/auth/UserDepartment";
import { Op } from "sequelize";

const JWTKEY: string = process.env.JWTKEY || "MYNAME-IS-HELLOWORLD";

export const login: RequestHandler = async (req, res) => {
    try {
        const { authCode } = req.params;

        console.log(authCode, 'authcode')

        let response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
            params: {
                code: authCode,
                redirect_uri: process.env.AUTH_REDIRECT_URL,
                client_id: process.env.AUTH_CLIENT_ID_EVOLVE,
                client_secret: process.env.AUTH_CLIENT_SECRET_EVOLVE,
                grant_type: 'authorization_code',
            }
        });
        console.log(response.data, 'response')
        let userInfo: any = jwt.decode(response.data.id_token)
        console.log(userInfo, 'userInfo')
        if (!userInfo) {
            response = await axios.post('https://accounts.zoho.in/oauth/v2/token', null, {
                params: {
                    code: authCode,
                    redirect_uri: process.env.AUTH_REDIRECT_URL,
                    client_id: process.env.AUTH_CLIENT_ID_PLUUGIN,
                    client_secret: process.env.AUTH_CLIENT_SECRET_PLUUGIN,
                    grant_type: 'authorization_code',
                }
            });
            userInfo = jwt.decode(response.data.id_token)
        }
        const user = await User.findOne({ where: { email: userInfo.email } })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Login Failure. Please ask your admin to register you in the platform'
            })
        }
        let token
        if (!user.accessToken) {
            token = jwt.sign({ email: userInfo?.email }, JWTKEY);
            await User.update({
                accessToken: token,
                zohoAccessToken: response.data.access_token,
                refreshToken: response.data.refresh_token
            }, {
                where: {
                    email: userInfo.email
                }
            })
        }

        return res.status(201).json({
            success: true,
            message: `Login success`,
            data: {
                token: user.accessToken ? user.accessToken : token,
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
        let authHeader = req.header('Authorization'), accessToken
        if (authHeader) {
            accessToken = authHeader.split(' ')[1];
        } else {
            accessToken = 'none'
        }
        const user = await User.findOne({ where: { accessToken } })
        await User.update({
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

export const getAssignees: RequestHandler = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['email'] });
        const departments = await Department.findAll({ attributes: ['name'], where: { 'name': { [Op.ne]: 'All' } } });

        let assignees: string[] = []
        users.map(user => assignees.push(user.email));
        departments.map(department => assignees.push(department.name));

        return res.status(201).json({
            success: true,
            message: `Assignees Fetched Successfully`,
            data: {
                assignees
            }
        });

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "auth.controller.js -> getAssignees"
            },
        });
    }
};