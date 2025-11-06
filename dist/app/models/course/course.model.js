"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
;
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    courseId: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    Types: { type: String, required: true },
    image: { type: String, required: true },
    fee: { type: String, required: true },
    rating: { type: Number, required: true },
    totalRating: { type: Number, required: true },
    totalStudentEnroll: { type: Number, required: true },
    mentor: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    courseStart: { type: String, required: true },
    duration: { type: Number, required: true },
    lectures: { type: Number, required: true },
    totalExam: { type: Number, required: true },
    totalProject: { type: Number, required: true },
    courseDetails: { type: String, required: true },
    courseOverview: { type: String, required: true },
    curriculums: { type: [String], required: true },
    courseIncludes: { type: [String], required: true },
    softwareIncludes: { type: [String], required: true },
    jobOption: { type: [String], required: true },
});
exports.Course = (0, mongoose_1.model)("Course", courseSchema);
//# sourceMappingURL=course.model.js.map