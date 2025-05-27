import ToDo from "../models/todo.js";
import ErrorResponse from "../utils/erorrModel.js";
export const createTodo = async (req, res, next) => {
  const { title, description } = req.body;
  const user = req.user._id;
  try {
    const todo = await ToDo.create({
      title,
      status: "new",
      description: description,
      userId: user,
    });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};
export const getTodos = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const todos = await ToDo.find({ userId: userId });

    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};
export const getTodoById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await ToDo.findById(id).populate("user");
    if (!todo) {
      next(new ErrorResponse("This is a test error", 400));
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};
export const updatePatchtodo = async (req, res, next) => {
  const { id } = req.params;
  const { title, status } = req.body;
  try {
    const todo = await ToDo.findByIdAndUpdate(
      id,
      { title, status },
      { new: true, runValidators: true }
    );
    if (!todo) {
      next(new ErrorResponse("This is a test error", 400));
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};
export const deletetodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await ToDo.findByIdAndDelete(id);
    if (!todo) {
      next(new ErrorResponse("This is a test error", 400));
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const updateTodoStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const todo = await ToDo.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    if (!todo) {
      next(new ErrorResponse("This is a test error", 400));
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};
