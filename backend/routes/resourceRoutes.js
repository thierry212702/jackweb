import express from 'express';
const router = express.Router();

const resources = [
  {
    id: 1,
    title: "2026 Case Strategy Kit",
    description: "Complete workbook for organizing your legal case",
    type: "pdf",
    downloadUrl: "/downloads/case-strategy-kit-2026.pdf"
  },
  {
    id: 2,
    title: "Evidence Log Template",
    description: "Template for tracking evidence",
    type: "xlsx",
    downloadUrl: "/downloads/evidence-log.xlsx"
  }
];

router.get('/', (req, res) => {
  res.json(resources);
});

router.get('/download/:id', (req, res) => {
  const resource = resources.find(r => r.id === parseInt(req.params.id));
  if (!resource) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  res.json(resource);
});

export default router;