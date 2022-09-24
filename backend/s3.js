const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET
    }
});

async function getFile(fileName) {
    const params = {
        Bucket: "hackdfw2022",
        Key: fileName
    };
    const command = new GetObjectCommand(params);
    const data = await s3.send(command);
    return data.Body;
}

module.exports = getFile;

function streamToString (stream) {
    new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
}