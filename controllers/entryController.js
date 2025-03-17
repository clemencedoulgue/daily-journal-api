import Entry from '../models/Entry.js';

export const getAllEntries = async (req, res, next) => {
  try {
    const entries = await Entry.find({ user: req.user._id });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const createEntry = async (req, res, next) => {
  const { title, content } = req.body;

  try {
    const entry = await Entry.create({
      user: req.user._id, // secure user assignment
      title,
      content,
    });
    res.status(201).json(entry);
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: 'Server error' });
  }
  

};

export const updateEntry = async (req, res, next) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    if (entry.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    entry.title = req.body.title || entry.title;
    entry.content = req.body.content || entry.content;

    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const deleteEntry = async (req, res, next) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    if (entry.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await entry.deleteOne();
    res.json({ message: 'Entry removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
