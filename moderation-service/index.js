const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // To parse the incoming requests with JSON payloads

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const { id, postId, content } = data;
        const status = content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id,
                postId,
                status,
                content
            }
        })
    }
    res.send({});
});

app.listen(4003, () => {
    console.log('Listening on 4003');
});