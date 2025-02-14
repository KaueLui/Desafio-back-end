const express = require("express");
const { Tag } = require("../models");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, color } = req.body;
        const tag = await Tag.create({ name, color });
        res.status(201).json(tag);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar a tag." });
    }
});

router.get("/", async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar as tags." });
    }
});

router.get("/:tagId", async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.tagId);
        if (!tag) {
            return res.status(404).json({ error: "Tag não encontrada." });
        }
        res.json(tag);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar a tag." });
    }
});

router.put("/:tagId", async (req, res) => {
    try {
        const { name, color } = req.body;
        const tag = await Tag.findByPk(req.params.tagId);

        if (!tag) {
            return res.status(404).json({ error: "Tag não encontrada." });
        }

        tag.name = name;
        tag.color = color;
        await tag.save();

        res.json(tag);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar a tag." });
    }
});

router.delete("/:tagId", async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.tagId);
        if (!tag) {
            return res.status(404).json({ error: "Tag não encontrada." });
        }

        await tag.destroy();
        res.json({ message: "Tag deletada com sucesso." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar a tag." });
    }
});

module.exports = router;
