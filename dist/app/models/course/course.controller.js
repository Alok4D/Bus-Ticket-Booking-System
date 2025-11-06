"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseController = void 0;
const getAllCoursesController = async (req, res) => {
    res.send({ message: "lkdsjflkds" });
};
// const getAllCoursesController = async (req: Request, res: Response) => {
//   try {
//     const result = await courses.getAllCourses();
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error", error });
//   }
// };
const creteCourse = async (req, res) => {
    const body = req.body;
    console.log(body);
};
exports.courseController = {
    getAllCoursesController,
    creteCourse,
};
//# sourceMappingURL=course.controller.js.map