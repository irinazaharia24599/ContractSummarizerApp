@include "util.ne"
@include "contractanti.ne"
@include "obiect.ne"
@include "pret.ne"
@include "obligatii.ne"
@include "final.ne"


contract -> titlu clauze {% (data) => data[0] + data[1] %}
titlu -> denumire _ml dataContract _ml  {% (data) => data[0] + data[2] %}
dataContract -> "încheiat astăzi "i data {% (data) => "Data contractului: " + data[1]+ "\n" %}
denumire -> "Contract de "i _ tipContract {% (data) => "Tipul contractului: " + data[2] + "\n" %}

tipContract -> "vânzare"i|"vânzare-cumpărare"i|"donație"i|"schimb imobiliar"i | "schimb mobiliar"i {% id %}

clauze -> clauzeSchimb | clauzeVanzare 

clauzeVanzare -> contractanti clauzaObiect pretContract clauzaObligatii clauzaFinala
          {% (data) => data[0] + "\n" + data[1] + "\n" + data[2] + "\n" %}

clauzeSchimb -> contractanti clauzaObiect clauzaObligatii clauzaFinala:?
          {% (data) => data[0] + "\n" + data[1] + "\n" %}