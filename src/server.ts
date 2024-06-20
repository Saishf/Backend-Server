import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
const dbFilePath = path.join(__dirname, 'db.json');

// Middleware
app.use(bodyParser.json());

// Ensure the database file exists
if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify([]));
}

// Routes
app.get('/ping', (req, res) => {
    res.send('True');
});

// src/server.ts

app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const newSubmission = { name, email, phone, github_link, stopwatch_time };

    fs.readFile(dbFilePath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading database file');
        }

        const submissions = JSON.parse(data.toString());
        submissions.push(newSubmission);

        fs.writeFile(dbFilePath, JSON.stringify(submissions), (err) => {
            if (err) {
                return res.status(500).send('Error writing to database file');
            }

            res.send('Submission successful');
        });
    });
});


app.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string);

    fs.readFile(dbFilePath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading database file');
        }

        const submissions = JSON.parse(data.toString());
        if (index >= 0 && index < submissions.length) {
            res.json(submissions[index]);
        } else {
            res.status(404).send('Submission not found');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


