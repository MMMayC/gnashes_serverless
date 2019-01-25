const serverless = require('serverless-http');
const express = require('express')
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const cors = require("cors");
const CANDIDATES_TABLE = process.env.CANDIDATES_TABLE;
const VOTES_TABLE = process.env.VOTES_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function generateRowId() {
    const EPOCH = 1300000000000;
    const subid = 4;
    let ts = new Date().getTime() - EPOCH; // limit to recent
    let randid = Math.floor(Math.random() * 512);
    ts = ts * 64; // bit-shift << 6
    ts = ts + subid;
    return ts * 512 + (randid % 512);
}

app.use(express.static(path.resolve(__dirname, "./public")));

app.get(["/", "/result"], (req, res) => {
    res.setHeader("Cache-Control", "public, max-age=604800");
    res.sendFile("index.html", { root: path.resolve(__dirname, "public") });
});

app.post("/vote", (req, res) => {
    const vote = req.body;
    const voteIdGenerated = generateRowId();
    const params = {
        TableName: VOTES_TABLE,
        Item: {
            id: voteIdGenerated,
            candidate: vote.candidate,
            value: vote.value,
            achievement: vote.achievement,
            timestamp: vote.timestamp
        }
    };

    dynamoDb.put(params, (err, votes) => {
        if (err) {
            res.send(err);
        } else {
            res.json(votes);
        }
    });
});

app.get("/candidates", (req, res) => {
    const params = {
        TableName: CANDIDATES_TABLE
    };
    dynamoDb.scan(params, function(err, candidates) {
        if (err) {
            res.send(err);
        } else {
            res.json(candidates.Items);
        }
    });
});

app.get("/votes", (req, res) => {
    const params = {
        TableName: VOTES_TABLE,
        FilterExpression: "#timestamp between :from and :to",
        ExpressionAttributeNames: {
            "#timestamp": "timestamp"
        },
        ExpressionAttributeValues: {
            ":from": req.query.from,
            ":to": req.query.to
        }
    };
    dynamoDb.scan(params, function(err, votes) {
        if (err) {
            res.send(err);
        } else {
            res.json(votes.Items);
        }
    });
});

exports.handler = serverless(app);
