import { RequestHandler } from "express";
import File from "../models/utils/File";

export const getFile: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const file = await File.findOne({ where: {id} })
        let newFile
        if(file)
        newFile = file.fileContent.toString('base64');

        return res.status(201).json({
            success: true,
            message: `File fetched successfully`,
            data: { file: {
                fileName: file?.fileName,
                fileContent: newFile
            } },
        });

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: {
                "source": "file.controller.js -> getFile"
            },
        });
    }
};