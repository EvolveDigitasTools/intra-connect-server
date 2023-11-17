"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newWorkflow = void 0;
const Department_1 = __importDefault(require("../models/Department"));
const Workflow_1 = __importDefault(require("../models/Workflow"));
const newWorkflow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, department } = req.body;
        const selectedDepartment = yield Department_1.default.findOne({ where: { name: department } });
        const workflow = yield Workflow_1.default.create({
            name,
            description,
            departmentId: selectedDepartment === null || selectedDepartment === void 0 ? void 0 : selectedDepartment.id
        });
        return res.status(201).json({
            success: true,
            message: 'Workflow successfully created',
            data: {
                workflow
            }
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "workflow.controller.js -> newWorkflow"
            },
        });
    }
});
exports.newWorkflow = newWorkflow;
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
