@include "util.ne"

contractanti -> no ("Părțile contractante" | "Între:" | "Între subsemnații:") _ml contractant contractant 
             "au convenit să încheie prezentul contract cu următoarele clauze:" _ml
             {% (data) => "Contractanti: " + data[3] + ", " + data[4] %}

contractant -> no numeContractant "," _ cetatenie "," _ adresa "," _ carteIdentitate "," _ cnp "," _ calitate ",":? _ml {% (data) => data[1] %}

numeContractant -> nume

cetatenie -> "cetățean" _ word

adresa -> ("cu domiciliul în " | "domiciliat în ") nume "," _ ("strada"i | "bulevardul"i | "șoseaua"i | "str."i | "șos."i | "bvd."i) _ nume _ "nr." _ 
       numar ("," _ "bl." _ bloc "," _ "sc." _ letter "," _ "et." _ numar "," _ "ap." _ numar):? {% () => null %}

cnp -> "cu ":? "CNP" _ numar

carteIdentitate -> ("identificat cu" | "identificată cu") " CI seria "  letter letter ",":? " nr. "  numar ",":? " eliberată de SPCEP " (nume | nume numar) ",":? " la data de " data ", valabilă până la data de " data

calitate -> "în nume propriu, ":? "în calitate de " ("cumpărător" | "vânzător" | "coschimbaș" | "copermutant prim" | "copermutant secund" |"donator" | "donatar" )

