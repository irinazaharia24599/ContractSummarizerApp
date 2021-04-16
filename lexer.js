const moo = require('moo')
const fs = require('mz/fs');

    let lexer = moo.compile({
      WS: /[ \t]+/,
      number:  /0|[1-9][0-9]*/,
      digit: /[0-9]/,
      word: /[a-zA-Z]+/,
      string:  /"(?:\\["\\]|[^\n"\\])*"/,
      separator: /['.', '?', '!', ',', ';', ':', '"', '“', '”', '-', '/']/,
      NL: { match: /\n/, lineBreaks: true }
    });

    module.exports = lexer;

    // TREBUIE ADAUGATE CARACTERELE CU DIACRITICE
    // DE CE NU RECUNOASTE - ???

    async function main() {
      const code = (await fs.readFile('contract.txt')).toString();
      lexer.reset(code);
      while(true) {
        const token = lexer.next();
        if(!token) {
          break;
        }
        console.log(token);
      }
    }

     //main().catch(err => console.log(err.stack));