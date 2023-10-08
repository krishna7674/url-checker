const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/proxy', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).send('URL query parameter is required.');
    }

    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(`Failed to fetch the URL. Error: ${error.message}`);
    }
});

app.get('/check-status', async (req, res) => {
    const { url } = req.query;
    try {
        const response = await axios.get(url, { timeout: 5000 }); // 5 seconds timeout
        return res.json({ url, status: response.status });
    } catch (error) {
        return res.json({ url, status: error.response ? error.response.status : 500 });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});