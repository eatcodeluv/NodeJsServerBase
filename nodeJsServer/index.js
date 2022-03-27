const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()) //access body -> req.body

//ROUTES

//GET all TODOS
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//GET A TODO
app.get("/todos/:id", async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//CREATE a TODO 
app.post("/todos", async(req, res) => {
    try {
        //await
        console.log(req.body);
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
//UPDATE A TODO
app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2, [description, id]",
            [description, id]
        );
        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
})
//DELETE A TODO
app.delete("/todos/:id", async( req, res ) => {
    try{
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
    } catch (err) {
        console.error(err.message);
    }
})


app.listen(5000, () => {
    console.log("server is listening on port 5000 WHERE ");
});

