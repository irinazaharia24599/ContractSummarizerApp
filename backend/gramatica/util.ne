# text ->  (word (_ | sep _))
#      | (text ( word (_ | sep _)))
# 	 | (digit:+ (_ | sep _))
# 	 | (text ( digit:+ (_ | sep _)))

text -> (word sep:? _ | digit:+ sep:? _)
     | text (word sep:? _ | digit:+ sep:? _)
words -> word:+  
word -> letter:+ {% (data) => data[0].join('') %}

letter -> ( A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z ) {% id %}
A -> "A" | "a" | "Ă" | "ă" | "â" | "Â"
B -> "B" | "b"
C -> "C" | "c"
D -> "D" | "d"
E -> "E" | "e"
F -> "F" | "f"
G -> "G" | "g"
H -> "H" | "h"
I -> "I" | "i" | "Î" | "î"
J -> "J" | "j"
K -> "K" | "k"
L -> "L" | "l"
M -> "M" | "m"
N -> "N" | "n"
O -> "O" | "o"
P -> "P" | "p"
Q -> "Q" | "q"
R -> "R" | "r"
S -> "S" | "s" | "Ș" | "ș"
T -> "T" | "t" | "Ț" | "ț"
U -> "U" | "u"
V -> "V" | "v"
W -> "W" | "w"
X -> "X" | "x"
Y -> "Y" | "y"
Z -> "Z" | "z"

sep -> ['.', '?', '!', ',', ';', ':', '"', '“', '”', '-', '/'] {% () => null %} 
no -> (([1-9] "." ):* _ ){% () => null %}
    | (("I" | "II" | "III" | "IV" | "V" | "VI" | "VII" | "VIII" | "IX" | "X" ) "." _):* {% () => null %}
    | ("a) " | "b) " | "c) " | "d) " | "e) " | "f) "):* {% () => null %}

digit -> [0-9]

nume -> word {% (data) => data[0] %}
      | nume (" " | "-") word  {% (data) => data[0]+ data[1] + data[2] %}

numar -> numarIntreg | numarZecimal

numarIntreg -> digit    {% (data) => data[0] %}
            | numarIntreg digit {% (data) => data[0]+ data[1] %}
       
numarZecimal -> numarIntreg "." digit digit {% (data) => data[0]+ data[1]+ data[2] %}

nrInreg -> numarIntreg "/" numarIntreg  {% (data) => data[0] + data[1] + data[2] %}

data -> zi sep luna sep an {% (data) => data[0] + "/" + data[2] + "/" + data[4] %}
an -> digit digit digit digit  {% (data) => data[0]+data[1]+data[2]+data[3]%}
luna -> digit digit {% (data) => data[0]+data[1] %}
zi -> digit digit {% (data) => data[0]+data[1] %}

bloc -> letter {% (data) => data[0] %}
      | bloc digit  {% (data) => data[0]+data[1] %}

# optional whitespace 
_ -> [ \t]:* {% () => null %}

# mandatory whitespace
__ -> [ \t]:+ {% () => null %}

# optional end of line
endl -> [ \r\n]:* {% () => null %}

# optional multiline whitespace 
_ml -> ([ \t] | [ \r\n]):*

# mandatory multiline whitespace 
__ml -> ([ \t] | [ \r\n]):+

# mandatory linebreak with optional whitespace around it 
__lb_ -> (_ [ \r\n]):+ _