import { Types } from "mongoose";
export interface ICourse {
    courseId: string;
    title: string;
    slug: string;
    category: Types.ObjectId;
    Types: string;
    image: string;
    fee: string;
    rating: number;
    totalRating: number;
    totalStudentEnroll: number;
    mentor: Types.ObjectId;
    courseStart: string;
    duration: number;
    lectures: number;
    totalExam: number;
    totalProject: number;
    courseDetails: string;
    courseOverview: string;
    curriculums: string[];
    courseIncludes: string[];
    softwareIncludes: string[];
    jobOption: string[];
}
//# sourceMappingURL=course.interface.d.ts.map