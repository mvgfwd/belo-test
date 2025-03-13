const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const {name, className, section, roll} = req.query;
    const students = await getAllStudents({name, className, section, roll});
    res.json(students);
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const payload = req.body;
    const result = await addNewStudent(payload);
    res.json(result);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const payload = req.body;
    const result = await updateStudent({ ...payload, userId });
    res.json(result);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const accountDetail = await getStudentDetail(req.params.id);
    res.json(accountDetail);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const status = req.body.status;
    const { id: reviewerId } = req.user;
    const { id: userId } = req.params;
    const result = await setStudentStatus({status, userId, reviewerId});
    res.json(result);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
