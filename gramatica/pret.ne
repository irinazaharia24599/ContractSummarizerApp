@include "util.ne"

pretContract -> no ("Prețul contractului"i | "Prețul de vânzare"i):? _ml
            no "Prețul de vânzare este de " numar _ valuta ", echivalentul a " numar " lei, calculat la cursul de schimb valutar de " numar " lei/" valuta "." _ml 
            no "Aceasta suma a fost încasată de cumpărător de la vânzător, astăzi, " data " data autentificării prezentului contract, data de la care obiectul contractului intră în stăpânirea cumpărătorului de fapt și de drept."
            {% (data) => "Prețul contractului: " + data[5] + " " + data[7] + " (" + data[9] +" lei)" %}

valuta -> "euro" | "EUR" | "€" | "USD" | "$" | "dolari" | "lire sterline" | "GBP" | "£" {% id %}