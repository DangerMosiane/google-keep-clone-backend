import { prisma } from "../lib/prisma.js";


export async function listNotes(req, res, next) {
    try {
        const page = parseInt(req.query.page || "1", 10);
        const pageSize = Math.min(parseInt(req.query.pageSize || "20", 10), 100);
        const where = {};
        if (req.query.archived === "true") where.archived = true;
    if (req.query.archived === "false") where.archived = false;
        const [items, total] = await Promise.all([
        prisma.note.findMany({
        where,
        orderBy: { updatedAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize
        }),
        prisma.note.count({ where })
        ]);
        res.json({ items, page, pageSize, total });
    } catch (e) { next(e); }
}


export async function getNote(req, res, next) {
    try {
        const note = await prisma.note.findUnique({ where: { id: req.params.id } });
        if (!note) return res.status(404).json({ error: "Note not found" });
        res.json(note);
    } catch (e) { next(e); }
}


export async function createNote(req, res, next) {
    try {
        const { title, text, reminder, archived } = req.body;
        const data = { title, text, archived: !!archived };
        if (reminder) data.reminder = new Date(reminder);

        const note = await prisma.note.create({ data });
        res.status(201).json(note);
        } catch (e) { next(e); }
}


export async function updateNote(req, res, next) {
    try {
        const { title, text, reminder, archived } = req.body;
        const data = {};
        if (title !== undefined) data.title = title;
        if (text !== undefined) data.text = text;
        if (archived !== undefined) data.archived = !!archived;
        if (reminder !== undefined) data.reminder = reminder ? new Date(reminder) : null;
    } catch (e) { next(e); }
}