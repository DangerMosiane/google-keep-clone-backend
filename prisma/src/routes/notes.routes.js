import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { createNoteSchema, updateNoteSchema, idParamSchema } from "../schemas/note.schema.js";
import { listNotes, getNote, createNote, updateNote, deleteNote, archiveNote } from "../controllers/notes.controller.js";


const router = Router();


router.get("/", listNotes);
router.get("/:id", validate(idParamSchema), getNote);
router.post("/", validate(createNoteSchema), createNote);
router.patch("/:id", validate(updateNoteSchema), updateNote);
router.delete("/:id", validate(idParamSchema), deleteNote);
router.patch("/:id/archive", validate(idParamSchema), archiveNote);


export default router;