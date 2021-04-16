@include "util.ne"

clauzaFinala -> no "Clauze finale"i:? _ml 
                (finalSchimbImobiliar | finalSchimbMobiliar | finalVanzareImobil | finalVanzareMobil)
                {% (data) => "clauza finala" %}               

finalSchimbImobiliar -> no "Impozitele și taxele aferente imobilelor sunt achitate, la zi, conform certificatelor nr. " nrInreg " și nr. " nrInreg ", ambele eliberate de " nume ", urmând ca de astăzi, " data " data autentificării, să treacă în sarcina noilor proprietari." _ml
                        no "Prezentul contract de schimb se face fără plata vreunei sulte între copermutanți." _ml
                        no "Taxa de autentificare, timbrul judiciar și onorariul notarial sunt suportate de copermutanti, în părți egale." _ml
                        no "Părțile declară, potrivit art. 45 alin. 3 din Legea nr. 36/1995, că vor îndeplini formalitățile necesare pentru efectuarea operațiunilor de publicitate imobiliară." _ml
                        no "Prezentul contract a fost încheiat într-un număr de " numar " exemplare, din care " numar " astăzi, " data " data semnării lui." _ml

finalSchimbMobiliar -> no "Acceptarea bunurilor se consideră efectuată, iar acestea trec, reciproc, în proprietatea părților, la data constatării stării lor tehnice, prin procesele verbale semnate de ambele părți." _ml
                       no "Părțile garantează reciproc împotriva evicțiunii, cunosc situația juridică și de fapt a bunurilor mobile ce formează obiectul prezentului contract de schimb, ca fiind cea descrisă, susțin că nu sunt grevate de sarcini și declară că renunță la cercetarea registrelor de publicitate mobiliara." _ml
                       no "Părțile se obligă să îndeplinească formalitățile necesare pentru înscrierea autoturismului în evidențele financiare și pentru înmatricularea în circulație a acestuia pe numele noului proprietar." _ml      
                       no "Taxele pentru autentificare, timbrul judiciar și onorariul notarial sunt în sarcina ambelor părți, în cote egale." _ml
                       no "Prezentul contract a fost încheiat într-un număr de " numar " exemplare, din care " numar " astăzi, " data " data semnării lui." _ml

finalVanzareImobil -> no "Părțile declară că prețul menționat mai sus este prețul real intervenit între ei, au luat cunoștință de dispozițiile art. 1303 Cod civil, art. 12 din Legea nr. 87/1994 privind combaterea evaziunii fiscale, precum și de prevederile art. 6 alin. 1 și 2 din Ordonanța Guvernului nr. 12/1998, potrivit cărora, în cazul în care printr-un act ascuns înțeleg să plătească un preț mai mare decat cel indicat, atât prezentul act autentic, cât și actul ascuns sunt lovite de nulitate și își asumă întreaga răspundere pentru cele declarate în conținutul prezentului contract ca fiind date reale." _ml
                      no "Taxele și impozitele la stat sunt achitate la zi de vânzător, așa cum rezultă din certificatul nr. " nrInreg " eliberat de " nume ", urmând ca astăzi, data autentificării contractului, să treacă asupra cumpărătorului, care suportă și taxa de timbru, timbrul judiciar și onorariul notarului public." _ml
                      no "Cumpărătorul ce a cumpărat de la vânzător nuda proprietate asupra imobilului descris mai sus, cu prețul și în condițiile menționate se declară întrutotul de acord cu conținutul prezentului contract." _ml
                      no "Prezentul contract a fost încheiat într-un număr de " numar " exemplare, din care " numar " astăzi, " data " data semnării lui." _ml

finalVanzareMobil -> no "Taxele cu privire la cheltuielile vânzării (autentificarea actului, taxe de timbru, transport etc.), vor fi achitate potrivit acordului încheiat între părți." _ml
                     no "Prezentul contract a fost încheiat într-un număr de " numar " exemplare, din care " numar " astăzi, " data " data semnării lui." _ml



               