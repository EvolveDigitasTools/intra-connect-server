import XLSX from 'xlsx';
import axios from 'axios';
import FormData from 'form-data';

// Define the path to the Excel file and the API endpoint
const pathToExcel = 'D:/jatin/company-projects/intra-connect/intra-connect-server/src/utils/Employees data for IT.xlsx';
const apiEndpoint = 'http://localhost:4000/api/auth/new';

// Function to read Excel file and return formatted user data
async function readExcelAndPostUsers() {
    // Read the Excel file
    const workbook = XLSX.readFile(pathToExcel);
    const sheetNameList = workbook.SheetNames;
    const data: any = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

    // Post each user to the API endpoint
    for (let row of data) {
        try {
            // Create an instance of FormData
            const formData = new FormData();

            // Append the data you want to send
            // Adjust these based on the actual column names in your Excel file
            formData.append('email', row['Email ID(offcial)']);
            formData.append('department', row['Department']);

            // Make the request
            const response = await axios.post(apiEndpoint, formData, {
                headers: formData.getHeaders(), // Include form-data headers
            });

            console.log(`User ${row['Email ID(offcial)']} added successfully: `, response.data);
        } catch (error: any) {
            console.error(`Error adding user ${row['Email ID(offcial)']}: `, error.response?.data || error.message);
        }
    }
}

// Execute the function
readExcelAndPostUsers();
