import { RequestHandler } from "express";
import Department from "../models/Department";
import Workflow from "../models/Workflow";

export const newWorkflow: RequestHandler = async (req, res) => {
    try {
        const { name, description, department } = req.body;

        const selectedDepartment = await Department.findOne({ where: { name: department } });

        const workflow = await Workflow.create({
            name,
            description,
            departmentId: selectedDepartment?.id
        })

        return res.status(201).json({
            success: true,
            message: 'Workflow successfully created',
            data: {
                workflow
            }
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "workflow.controller.js -> newWorkflow"
            },
        });
    }
};

// export const getBoards: RequestHandler = async (req, res) => {
//     try {
//         const user = await User.findOne({ where: { accessToken: req.header('Authorization')?.split(' ')[1] } })

//         const boards = await Board.findAll({
//             attributes: ['id', 'title'],
//             include: [
//                 {
//                     model: User,
//                     attributes: [],
//                     as: 'creator'
//                 },
//                 {
//                     model: User,
//                     attributes: [],
//                     as: 'members'
//                 },
//                 {
//                     model: Department,
//                     as: 'departments',
//                     include: [
//                         {
//                             model: UserDepartment
//                         }
//                     ]
//                 }
//             ],
//             where: Sequelize.or(
//                 { createdBy: user?.id },
//                 { '$members.id$': user?.id },
//                 { '$departments.users.userId$': user?.id }
//             )
//         });

//         return res.status(200).json({
//             success: true,
//             message: 'Boards successfully fetched',
//             data: {
//                 boards
//             }
//         })

//     } catch (error: any) {
//         return res.status(504).json({
//             success: false,
//             message: error.message,
//             data: {
//                 "source": "board.controller.js -> newBoard"
//             },
//         });
//     }
// };

// export const getBoard: RequestHandler = async (req, res) => {
//     try {
//         const boardId = req.params.boardId;

//         const board = await Board.findOne({
//             attributes: ['id', 'title', 'listOrder'],
//             where: {
//                 id: boardId
//             },
//             include: [
//                 {
//                     model: List,
//                     attributes: ['id', 'boardListId', 'cardOrder', 'title']
//                 },
//                 {
//                     model: Card,
//                     attributes: ['id', 'boardCardId', 'title']
//                 }
//             ]
//         })

//         return res.status(200).json({
//             success: true,
//             message: 'Board successfully fetched',
//             data: {
//                 board
//             }
//         })

//     } catch (error: any) {
//         return res.status(504).json({
//             success: false,
//             message: error.message,
//             data: {
//                 "source": "board.controller.js -> getBoard"
//             },
//         });
//     }
// };