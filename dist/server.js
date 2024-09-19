"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const classRoutes_1 = __importDefault(require("./routes/classRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json()); // Middleware to parse incoming JSON
app.use('/classes', classRoutes_1.default); // Attach the class routes
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
