const nearley = require("nearley");
const grammar = require("./grammar2.js");
const fs = require("mz/fs");

async function main() {
    const filename = process.argv[2];
    if(!filename) {
        console.log("Please provide a text document.");
        return;
    }

    const code = (await fs.readFile(filename)).toString();
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    parser.feed(code);
    console.log(parser.results);
}

main().catch(err => console.log(err.stack));