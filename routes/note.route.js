import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import { addNote, deleteNote, editNote, getAllNotes, searchNote, updateNotePin } from "../controller/note.controller.js"

const router = express.Router()

router.post("/add", verifyToken, addNote)
router.post("/edit/:noteId", verifyToken, editNote)
router.get("/all", verifyToken, getAllNotes)
router.delete("/delete/:noteId", verifyToken, deleteNote)
router.put("/update-note-pin/:noteId", verifyToken, updateNotePin)
router.get("/search", verifyToken, searchNote)

export default router