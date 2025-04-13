const express = require("express");
const router = express.Router();
const { Task, Tag } = require("../models");
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const userId = req.userId;

    const newTask = await Task.create({ 
      title, 
      description, 
      status, 
      priority,
      userId 
    });
    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return res.status(500).json({ error: "Erro interno ao criar tarefa." });
  }
});

const { Op } = require("sequelize");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { tags } = req.query;
    console.log("UserID extraído do token:", userId);
    console.log("Filtro de tags recebido:", tags);

    const includeClause = [{
      model: Tag,
      as: "Tags",
      through: { attributes: [] },
      required: false,
    }];

    if (tags) {
      const tagNames = tags.split(','); 
      includeClause[0].where = { name: { [Op.in]: tagNames } };
      includeClause[0].required = true;
    }

    const tasks = await Task.findAll({
      where: { userId },
      order: [['id', 'ASC']],
      include: includeClause,
    });

    console.log(`Tarefas encontradas para userId ${userId}:`, tasks);
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    return res.status(500).json({ error: "Erro ao buscar tarefas", details: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id, {
      include: [{ model: Tag, as: "Tags", through: { attributes: [] } }],
    });

    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error);
    return res.status(500).json({ error: "Erro ao buscar tarefa." });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }

    await task.update({ title, description, status, priority });
    return res.status(200).json(task);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return res.status(500).json({ error: "Erro ao atualizar tarefa." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }

    await task.destroy();
    return res.status(200).json({ message: "Tarefa deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    return res.status(500).json({ error: "Erro ao deletar tarefa." });
  }
});

router.post("/:taskId/tags", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { tagId } = req.body;

    if (!taskId || isNaN(taskId)) {
      return res.status(400).json({ error: "ID da tarefa inválido." });
    }

    if (!tagId || isNaN(tagId)) {
      return res.status(400).json({ error: "ID da tag inválido." });
    }

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }

    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({ error: "Tag não encontrada." });
    }

    await task.addTag(tag);
    return res.status(201).json({ message: "Tag associada à tarefa com sucesso!" });
  } catch (error) {
    console.error("Erro ao associar tags:", error);
    return res.status(500).json({ error: "Erro interno ao associar tags.", details: error.message });
  }
});

router.delete("/:taskId/tags/:tagId", async (req, res) => {
  try {
    const { taskId, tagId } = req.params;

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }

    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({ error: "Tag não encontrada." });
    }

    await task.removeTag(tag);
    return res.status(200).json({ message: "Tag removida da tarefa com sucesso!" });
  } catch (error) {
    console.error("Erro ao remover tag:", error);
    return res.status(500).json({ error: "Erro ao remover tag." });
  }
});

module.exports = router;
