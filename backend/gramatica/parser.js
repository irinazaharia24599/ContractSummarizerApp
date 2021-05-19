const nearley = require("nearley");
const grammar = require("./grammar2.js");
const mammoth = require("mammoth");


    //     let result;
    //     try {
    //         let text = mammoth.extractRawText({ path: __basedir + '/uploads/' + file.filename })

    //         parser.feed(text.value)
    //         result = parser.results

    //     } catch (e) {
    //         console.log(e);
    //     }

    //     return await result

// 2
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

parser.parseContract = async function (file) {

    //var text;
    var parsed;
    mammoth.extractRawText({ path: __basedir + '/uploads/' + file.filename })
        .then(function (result) {
            var text = result.value; // The raw text 
            //console.log(text);

            parser.feed(text);
            parsed = parser.results.join('')
            // console.log(parser.results.join(''))
            //return parser.results.join('')
        })
        .done();

        // parser.feed(text)
        // console.log(parser.results.join(''))
        console.log(parsed)
        //return await parser.results.join('')
}

module.exports = parser;


//3
// async function main() {

//     mammoth.extractRawText({ path: "./Contract Donatie.docx" })
//         .then(function (result) {
//             var text = result.value; // The raw text 
//             console.log(text);

//             const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
//             parser.feed(text);
//             console.log(parser.results.join(''));
//             //var messages = result.messages;
//         })
//         .done();

// }

// main().catch(err => console.log(err.stack));