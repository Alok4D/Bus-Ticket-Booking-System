"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courses = void 0;
const course_model_1 = require("./course.model");
const getAllCourses = async () => {
    const courses = await course_model_1.Course.find();
    return courses;
};
exports.courses = {
    getAllCourses
};
//# sourceMappingURL=course.services.js.map