// const express = require('express');
const express = require("serverless-express/express");
var app = express();

const path = require("path");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");

const cors = require("cors");
const compression = require("compression");
const router = express.Router();

router.use(compression());

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();

// aws configuration
const AwsConfig = {
    tableCandidates: "Candidates",
    tableVotes: "Votes",
    tableCandidatesLocal: "Candidates_Local",
    tableVotesLocal: "Votes_Local",
    config: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    }
};

function generateRowId() {
    const EPOCH = 1300000000000;
    const subid = 4;
    let ts = new Date().getTime() - EPOCH; // limit to recent
    let randid = Math.floor(Math.random() * 512);
    ts = ts * 64; // bit-shift << 6
    ts = ts + subid;
    return ts * 512 + (randid % 512);
}

router.use(express.static(path.resolve(__dirname, "../spa/public")));

router.get(["/", "/result"], (req, res) => {
    res.setHeader("Cache-Control", "public, max-age=604800");
    res.sendFile("index.html", { root: path.resolve(__dirname, "public") });
});

router.post("/vote", (req, res) => {
    const vote = req.body;
    AWS.config.update(AwsConfig.config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const voteIdGenerated = generateRowId();
    const params = {
        TableName: AwsConfig.tableVotesLocal,
        Item: {
            id: voteIdGenerated,
            candidate: vote.candidate,
            value: vote.value,
            achievement: vote.achievement,
            timestamp: vote.timestamp
        }
    };

    docClient.put(params, (err, votes) => {
        if (err) {
            res.send(err);
        } else {
            res.json(votes);
        }
    });
});

router.get("/candidates", (req, res) => {
    AWS.config.update(AwsConfig.config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: AwsConfig.tableCandidatesLocal
    };
    docClient.scan(params, function(err, candidates) {
        if (err) {
            res.send(err);
        } else {
            res.json(candidates.Items);
        }
    });
});

router.get("/votes", (req, res) => {
    AWS.config.update(AwsConfig.config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: AwsConfig.tableVotesLocal,
        FilterExpression: "#timestamp between :from and :to",
        ExpressionAttributeNames: {
            "#timestamp": "timestamp"
        },
        ExpressionAttributeValues: {
            ":from": req.query.from,
            ":to": req.query.to
        }
    };
    docClient.scan(params, function(err, votes) {
        if (err) {
            res.send(err);
        } else {
            res.json(votes.Items);
        }
    });
});

app.use("/", router);

// app.get("/test", (req, res) => res.send("Hello World!"));

module.exports = app;
