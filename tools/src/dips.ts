import { Octokit } from '@octokit/rest';
const fs = require('fs');

const owner = 'efdevcon'
const repo = 'DIPs'
const path = 'DIPs'
const outDir = '../src/content/dips/'

console.log("GET DIPs");
GetDIPs();

async function GetDIPs() {
    const octokit = new Octokit();
    const files = await octokit.repos.getContent({ owner, repo, path });

    if (Array.isArray(files.data)) { 
        const array = Array.from(files.data);

        if (!fs.existsSync(outDir)){
            fs.mkdirSync(outDir);
        }

        array.forEach(async i => {
            if (i.type === 'file') { 
                const file = await octokit.repos.getContent({ owner, repo, path: i.path });

                const buffer = Buffer.from(file.data.content, 'base64');
                const decoded = buffer.toString('utf-8');
                
                fs.writeFile(outDir + i.name, decoded, function (err: any) {
                    if (err) return console.log(err);
                });
            }
        });
    }
}