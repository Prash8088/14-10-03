import express from 'express';
import { GridFSBucket, MongoClient, ObjectId } from 'mongodb';

const app = express();
const port = Number(process.env.PORT || 3000);
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/birthday';
const client = new MongoClient(mongoUrl, { serverSelectionTimeoutMS: 10000 });

await client.connect();
const bucket = new GridFSBucket(client.db(), { bucketName: 'photos' });

app.get('/api/images', async (_request, response, next) => {
  try {
    const files = await bucket.find({}).sort({ uploadDate: -1 }).toArray();
    const slots = {};
    for (const file of files) {
      const slot = file.metadata?.slot;
      if (Number.isInteger(slot) && slot >= 0 && slot <= 3 && slots[slot] === undefined) {
        slots[slot] = file._id.toString();
      }
    }
    response.json(slots);
  } catch (error) { next(error); }
});

app.get('/api/images/:id', async (request, response, next) => {
  try {
    if (!ObjectId.isValid(request.params.id)) return response.sendStatus(404);
    const [file] = await bucket.find({ _id: new ObjectId(request.params.id) }).toArray();
    if (!file) return response.sendStatus(404);
    response.type(file.contentType || 'application/octet-stream');
    bucket.openDownloadStream(file._id).on('error', next).pipe(response);
  } catch (error) { next(error); }
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: 'Could not load saved photos.' });
});

app.listen(port, '0.0.0.0', () => console.log(`Saved photo API listening on ${port}`));
