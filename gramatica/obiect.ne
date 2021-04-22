@include "util.ne"

clauzaObiect -> no ("Obiectul contractului"i):? _ml obiectContract
               {% (data) =>  "Obiectul contractului: " + data[3] %}

obiectContract -> obiectContractVanzare {% (data) => data[0] %}
                | obiectContractSchimb  {% (data) => data[0] %}
                | obiectContractDonatie {% (data) => data[0] %}
                
obiectContractVanzare -> no "Vânzătorul declară că îi vinde cumpărătorului dreptul de proprietate asupra "  obiect 
                      {% (data) => data[2] %}

obiectContractSchimb -> no "Copermutantul prim dă în deplină proprietate copermutantului secund dreptul asupra "  obiect
                        no "Evaluez acest " ("imobil" | "apartament" | "bun" | "teren" ) " la suma de " numar " lei." _ml 
                        no "Copermutantul secund dă în deplină proprietate copermutantului prim dreptul asupra " obiect
                        no "Evaluez acest " ("imobil" | "apartament" | "bun" | "teren" ) " la suma de " numar " lei." _ml 
                        {% (data) => data[2] + "; " + data[12] %}              

obiectContractDonatie -> no "Donatorul donează donatarului dreptul de proprietate asupra " (teren | apartament | imobil | mobil) 
                      {% (data) => data[2] %}


obiect -> teren | apartament | imobil | mobil {% (data) => data[0] %}

imobil -> "imobilului situat în " nume ", str. " nume " nr. " numar ", compus din " numar " camere de locuit şi dependinţe, anexele gospodăreşti, curte etc., precum şi dreptul de proprietate asupra terenului aferent în suprafaţă de " numar " mp." 
       _ml no "Am dobândit acest imobil prin " word " și mi-a revenit în baza sentinței civile nr. " nrInreg ", dată în Dosarul nr. " nrInreg " de Judecătoria " nume ", transcrisă sub nr. " nrInreg " de Judecatoria " nume "." _ml
       {% (data) => "imobil " + data[7] + " camere situat în " + data[1] + ", str. " + data[3]+ " nr. "+ data[5] + " și teren aferent de " + data[9] + " mp" %}

apartament -> "apartamentului nr. " numar ", situat la etajul " numar ", scara " letter ", blocul " bloc " din " nume ", jud./sector " (nume | digit) ", str. " nume ", compus din " numar " camere și dependințe, împreună cu dreptul de coproprietate asupra părților și dependințelor comune din imobil, care, prin natura și destinația lor, sunt în folosință comună a tuturor proprietarilor."
           _ml no "O dată cu proprietatea se transmite și dreptul de folosință asupra terenului aferent apartamentului în suprafață de " numar " mp atribuit pe durata existenței construcției." _ml
           {% (data) => "apartament cu " + data[15] + " camere situat în " + data[9] + ", jud./sector " + data[11] %}

mobil -> "următorului bun: " nume ", a cărui specificații sunt menționate în Anexa 1 a prezentului contract." _ml 
         no "Bunul menționat este proprietatea " ( "vânzătorului" | "donatorului" | "copermutantului prim" | "copermutantului secund") ", dobândit prin contractul de vânzare-cumpărare, donație, schimb. etc., autentificat sub nr. " nrInreg " la " data " și transcris în registrul de transcripțiuni și inscripțiuni sub nr. " nrInreg " la " data "." _ml
         {% (data) => data[1]  %}

teren -> "terenului liber de construcții, identificat conform planului de situație atașat ca Anexa 1, precum și a extraselor de Carte Funciara pentru autentificare nr. " nrInreg 
      " din data de " data " eliberate de Oficiul de Cadastru și Publicitate Imobiliară " nume ", Biroul de Carte Funciara " nume ", atașate ca Anexa 2 (denumit în continuare Terenul), compus din următoarele parcele:" 
      _ml parcela:+ no "Suprafața totală a Terenului este de " numar " mp și reprezintă teren arabil/construibil, fiind amplasat în intravilanul localității " nume ", jud. " nume 
      ", conform Certificatului de urbanism nr. " nrInreg " din data de " data ", atașat ca Anexa 3." _ml
      {% (data) => "teren în suprafață de " + data[13] + " mp, situat în " + data[15] + ", jud. " + data[17] %}


parcela -> no "parcela situată în " nume ", jud. " nume " în suprafață de " numar " mp înscrisă în Cartea Funciară cu C.F. nr. " nrInreg ", cu nr. topografic " numar ";" _ml {% () => null %}      