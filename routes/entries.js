import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {   getAllEntries,createEntry, updateEntry ,deleteEntry,} from '../controllers/entryController.js';

const journalRouter = Router();


// define routes
journalRouter.get("/journal", protect, getAllEntries);
journalRouter.post("/journal", protect, createEntry);
journalRouter.patch("/journal/:id", protect, updateEntry);
journalRouter.delete("/journal/:id", protect, deleteEntry);


export default journalRouter;



