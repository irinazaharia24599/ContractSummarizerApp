@include "util.ne"

clauzaObligatii -> no "Obligațiile părților":? _ml obligatii {% (data) => null %}

obligatii -> obligatiiDonatie | obligatiiVanzareMobil | obligatiiVanzareImobil | obligatiiSchimbImobiliar | obligatiiSchimbMobiliar 
obligatiiDonatie -> no "Eu, donatorul, declar că imobilul descris mai sus se află în întregime în proprietatea mea, nefiind înstrăinat sub nici o formă vreunei alte persoane până la data încheierii prezentului contract." _ml
                no "Eu, donatorul, declar de asemenea că imobilul nu a fost scos din circuitul civil prin trecere în proprietatea publică, nu este urmărit și sechestrat, nu face obiectul vreunui litigiu cu privire la dreptul de proprietate și este liber de orice sarcini și servituți, fiind în mod legal și continuu în proprietatea și posesia mea, de la data dobândirii și până în prezent și garantez pe donatar împotriva oricărei evicțiuni, potrivit art. 828 Cod civil." _ml
                no "Taxele și impozitele către stat, de orice natură asupra imobilului sunt în sarcina mea, donatorul, până astăzi, data autentificării prezentului contract, au fost achitate la zi, iar de la această dată trec asupra donatarului, care suportă taxele și onorariul notarului public, pentru autentificarea prezentului contract." _ml
                no "Noi, părțile, declarăm că transmisiunea deplinei proprietăți și a posesiei asupra obiectului menționat și descris mai sus se face astăzi, data autentificării prezentului contract, fără îndeplinirea altor formalități." _ml
                no no "Eu donatarul, primesc cu recunoștință donația făcută de donator, privind obiectul menționat și descris mai sus." _ml 
                no "Am luat cunoștință de situația juridică și de fapt a obiectului, ca fiind cea arătată mai sus de donator și declar ca am luat cunoștință de dispozițiile legale privind stabilirea dreptului de proprietate asupra terenului în baza titlului de proprietate și, totodată, că îl scutesc pe donator de cercetarea registrelor de publicitate imobiliară, înțelegând să dobândesc, în aceste condiții și pe riscul meu, ceea ce nu-l exonerează de răspundere pentru evicțiune." _ml
                no "Evaluăm donația la suma de " numar " lei, exclusiv în scopul stabilirii taxei de timbru." _ml

obligatiiVanzareMobil -> no "Vânzătorul garantează pe cumpărător împotriva oricărei evicțiuni, cât și împotriva viciilor ascunse." _ml
                         no "De asemenea, vânzătorul garantează pe cumpărător că bunul vândut nu este sechestrat, ipotecat sau gajat, așa cum reiese din certificatul nr. " nrInreg " din data de " data " eliberat de grefa judecătoriei " nume "." _ml
                         no "Cumpărătorul declară că a cumpărat bunul descris mai sus la prețul de " numar " lei și se obligă a-l plăti integral (sau în condițiile descrise mai sus)." _ml
            
obligatiiVanzareImobil -> no "Vânzătorul are următoarele obligații:" _ml
                          no "să predea imobilul descris la pct. 2.1 de mai sus, la data prevăzută în contract;" _ml
                          no "să garanteze cumpărătorul împotriva evicțiunii și împotriva viciilor ascunse." _ml
                          no "Cumpărătorul are următoarele obligații:" _ml
                          no "să efectueze plata prețului la locul și data menționate la pct. 3.1 si 3.2 prin contract sau la locul unde se face predarea imobilului;" _ml
                          no "să suporte taxele aferente încheierii prezentului contract." _ml

obligatiiSchimbImobiliar -> no "Copermutanții au obligația să predea reciproc bunurile care fac obiectul prezentului contract." _ml
                            no "Imobilul menționat mai sus este liber de orice sarcini, nu este scos din circuitul civil, prin trecere în proprietatea publică, fiind, în mod legal și continuu, în proprietatea și posesia copermutantului prim, de la data dobândirii și până în prezent." _ml
                            no "Imobilul menționat mai sus este liber de orice sarcini, nu este scos din circuitul civil, prin trecere în proprietatea publică, fiind, în mod legal și continuu, în proprietatea și posesia copermutantului secund, de la data dobândirii și până în prezent." _ml

obligatiiSchimbMobiliar -> no "Copermutanții au obligația să predea reciproc bunurile ce fac obiectul prezentului contract de schimb." _ml
                           no "Copermutanții au deplină proprietate asupra bunurilor după predarea-primirea lor." _ml                      