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
const xlsx_1 = __importDefault(require("xlsx"));
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
// Define the path to the Excel file and the API endpoint
const pathToExcel = 'D:/jatin/company-projects/intra-connect/intra-connect-server/src/utils/Employees data for IT.xlsx'; // Replace with the path to your Excel file
const apiEndpoint = 'http://localhost:4000/api/auth/new';
// Function to read Excel file and return formatted user data
function readExcelAndPostUsers() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // Read the Excel file
        const workbook = xlsx_1.default.readFile(pathToExcel);
        const sheetNameList = workbook.SheetNames;
        const data = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
        // Post each user to the API endpoint
        for (let row of data) {
            try {
                // Create an instance of FormData
                const formData = new form_data_1.default();
                // Append the data you want to send
                // Adjust these based on the actual column names in your Excel file
                formData.append('email', row['Email ID(offcial)']);
                formData.append('department', row['Department']);
                // Make the request
                const response = yield axios_1.default.post(apiEndpoint, formData, {
                    headers: formData.getHeaders(), // Include form-data headers
                });
                console.log(`User ${row['Email ID(offcial)']} added successfully: `, response.data);
            }
            catch (error) {
                console.error(`Error adding user ${row['Email ID(offcial)']}: `, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            }
        }
    });
}
// Execute the function
readExcelAndPostUsers();
