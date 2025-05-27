import express from "express";
const todoRouter = express.Router();
import {
  createTodo,
  getTodos,
  getTodoById,
  updatePatchtodo,
  deletetodo,
  updateTodoStatus,
} from "../controllers/todoControllers.js";
import authorize from "../middlewares/autharize.js";
//create todo
todoRouter.post("/add", authorize(["user"]), createTodo);
//
//get all todos
todoRouter.get("/getAll", authorize(["admin", "user"]), getTodos);
//get single todo
todoRouter.get("/get/:id", authorize(["admin", "user"]), getTodoById);
//delete todo

todoRouter.delete("/delete/:id", authorize(["admin", "user"]), deletetodo);
todoRouter.patch("/status/:id", authorize(["admin", "user"]), updateTodoStatus);
//update todo
todoRouter.patch("/update/:id", authorize(["admin", "user"]), updatePatchtodo);
export default todoRouter;
