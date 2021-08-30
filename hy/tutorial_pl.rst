========
Tutorial
========

.. image:: _static/cuddles-transparent-small.png
   :alt: Karen Rustard's Cuddles

Ten rozdział zawiera krótkie wprowadzenie do Hy. Zakłada podstawową wiedzę
o programowaniu, ale bez konkretnej wcześniejszej znajomości Pythona lub Lispa.

Lisp-stick on a Python
======================
Zacznijmy od klasyki::

    (print "Hy, world!")

Ten program wywołuje funkcję :func:`print`, która podobnie jak wszystkie w Pythonie
:ref:`funkcje wbudowane <py:built-in-funcs>`, są dostępne w Hy.

Wszystkie :ref:`binarne i jednoargumentowe operatory <py:expressions>` są
również dostępne, chociaż  ze względu na lispową
tradycja``==`` jest pisane ``=``. A oto sposób używania operatora dodawania ``+``::

    (+ 1 3)

Ten kod zwraca ``4``. Jest to odpowiednik ``1 + 3`` w Pythonie i wielu innych
językach. Języki z `rodziny lispów
<https://pl.wikipedia.org/wiki/Lisp>`_ , w tym
Hy, użyj składni prefiksu: ``+``, tak jak ``print`` lub ``sqrt`` pojawia się przed
wszystkie jego argumenty. Wywołanie jest oddzielone nawiasami, ale otwarcie
nawias pojawia się przed wywołaniem operatora zamiast po nim, więc
zamiast ``sqrt(2)`` piszemy ``(sqrt 2)``. Wiele argumentów, takich jak
dwie liczby całkowite w ``(+ 1 3)`` są oddzielone białymi znakami. Wielu operatorów,
w tym ``+``, zezwól na więcej niż dwa argumenty: ``(+ 1 2 3)`` jest równoważne
``1 + 2 + 3``.

Oto bardziej złożony przykład::

    (- (* (+ 1 3 88) 2) 8)

Ten kod zwraca ``176``. Czemu? Możemy zobaczyć odpowiednik wrostka z
polecenie ``echo "(- (* (+ 1 3 88) 2) 8)" | hy2py``, który zwraca Python
kod odpowiadający podanemu kodowi Hy lub przekazując opcję ``--spy`` do
Hy podczas uruchamiania REPL, który pokazuje odpowiednik każdej linii wejściowej w Pythonie
przed wynikiem. Odpowiednikiem wrostka w tym przypadku jest::

.. code-block:: python

    ((1 + 3 + 88) * 2) - 8

Aby ocenić to wyrażenie wrostkowe, oczywiście obliczysz najgłębsze
najpierw umieść wyrażenie w nawiasach i wyjdź na zewnątrz. To samo dotyczy
Seplenienie. Oto, co otrzymamy, oceniając powyższy kod Hy krok po kroku::

    (- (* (+ 1 3 88) 2) 8)
    (- (* 92 2) 8)
    (- 184 8)
    176

Podstawową jednostką składni Lisp, która jest podobna do wyrażenia C lub Pythona, jest
**formularz**. ``92``, ``*`` i ``(* 92 2)`` to wszystkie formy. Program Lisp
składa się z sekwencji formularzy zagnieżdżonych w formularzach. Formularze są zazwyczaj
oddzielone od siebie białymi znakami, ale niektóre formy, takie jak string
literały (``"Hej, świat!"``) mogą same zawierać białe znaki. jakiś
**wyrażenie** to forma ujęta w nawiasy; jego pierwsza forma potomna, zwana
**głowa** określa, co robi wyrażenie i ogólnie powinna być a
funkcja lub makro. Funkcje to najzwyklejszy rodzaj głowy, podczas gdy makra
(opisane bardziej szczegółowo poniżej) są funkcjami wykonywanymi w czasie kompilacji
i powróć kod do wykonania w czasie wykonywania.

Komentarze zaczynają się od znaku ``;`` i trwają do końca linii. A
komentarz jest funkcjonalnie równoważny z białymi znakami. ::

    (print (** 2 64))   ; Max 64-bit unsigned integer value

Chociaż ``#`` nie jest znakiem komentarza w Hy, program Hy może zaczynać się od
`linia shebang <https://en.wikipedia.org/wiki/Shebang_(Unix)>`_, która sama Hy
zignoruje::

   #!/usr/bin/env hy
   (print "Uczyń mnie wykonywalnym i uruchom mnie!")

Literals
========

Hy ma :ref:`składnia literalna <składnia>` dla wszystkich tych samych typów danych, które
Python tak. Oto przykład kodu Hy dla każdego typu i Pythona
równowartość.

==============  ================  =================
Hy              Python            Typ
==============  ================  =================
``1``           ``1``             :class:`int` (liczba całkowita)
``1.2``         ``1.2``           :class:`float` (liczba zmiennoprzecinkowa)
``4j``          ``4j``            :class:`complex` (liczba zespolona)
``True``        ``True``          :class:`bool`
``None``        ``None``          :class:`NoneType`
``"hy"``        ``'hy'``          :class:`str`
``b"hy"``       ``b'hy'``         :class:`bytes`
``(, 1 2 3)``   ``(1, 2, 3)``     :class:`tuple`
``[1 2 3]``     ``[1, 2, 3]``     :class:`list`
``#{1 2 3}``    ``{1, 2, 3}``     :class:`set`
``{1 2  3 4}``  ``{1: 2, 3: 4}``  :class:`dict`
==============  ================  =================

Ponadto Hy ma dosłowną składnię w stylu Clojure dla
:class:`fractions.Fraction`: ``1/3`` jest odpowiednikiem ``fractions.Fraction(1,
3)"".

Hy REPL domyślnie drukuje dane wyjściowe w składni Hy, z funkcją :hy:func:`hy.repr`::

  => [1 2 3]
  [1 2 3]
Ale jeśli zaczniesz Hy w ten sposób::

  $ hy --repl-output-fn=repr

REPL użyje zamiast tego natywnej funkcji ``repr`` Pythona, więc zobaczysz wartości w składni Pythona::

  => [1 2 3]
  [1, 2, 3]


Podstawowe operacje
================
Ustaw zmienne za pomocą :hy:func:`setv`::

    (setv zone-plane 8)
Uzyskaj dostęp do elementów listy, słownika lub innej struktury danych za pomocą
:hy:func:`pobierz <hy.core.shadow.get>`::

    (setv fruit ["apple" "banana" "cantaloupe"])
    (print (get fruit 0))  ; => apple
    (setv (get fruit 1) "durian")
    (print (get fruit 1))  ; => durian
Uzyskaj dostęp do szeregu elementów w uporządkowanej strukturze za pomocą :hy:func:`cut`::

    (print (cut "abcdef" 1 4))  ; => bcd

Logika warunkowa może być zbudowana za pomocą :ref:`if`::

    (if (= 1 1)
      (print "Math works. The universe is safe.")
      (print "Math has failed. The universe is doomed."))

Tak jak w tym przykładzie, ``if`` jest wywoływane tak jak ``(if CONDITION THEN ELSE)``. Ono
wykonuje i zwraca formę ``THEN`` jeśli ``CONDITION`` jest prawdziwy (zgodnie z
:class:`bool`) i ``ELSE`` w przeciwnym razie. Jeśli pominięto ``ELSE``, użyto ``Brak``
Na swoim miejscu.

Co jeśli chcesz użyć czegoś więcej niż formy zamiast ``THEN`` lub ``ELSE``
klauzul lub zamiast „WARUNKU”? Użyj makra
:hy:func:`do` (znany bardziej tradycyjnie w Lispie jako ``progn``), który łączy
kilka formularzy w jeden, zwracając ostatnią:

   (if (do (print "Let's check.") (= 1 1))
     (do
       (print "Math works.")
       (print "The universe is safe."))
     (do
       (print "Math has failed.")
       (print "The universe is doomed.")))

Aby rozgałęziać się na więcej niż jeden przypadek, spróbuj :hy:func:`cond <hy.core.macros.cond>`::

   (setv somevar 33)
   (cond
    [(> somevar 50)
     (print "That variable is too big!")]
    [(< somevar 10)
     (print "That variable is too small!")]
    [True
     (print "That variable is jussssst right!")])

Makro ``(when CONDITION THEN-1 THEN-2 …)`` jest skrótem dla ``(if CONDITION
(do THEN-1 THEN-2 …))``. ``unless`` działa tak samo jak ``when``, ale odwraca
warunek z ``not``.

Podstawowe pętle Hy to :ref:`while` i :ref:`for`::

    (setv x 3)
    (while (> x 0)
      (print x)
      (setv x (- x 1)))  ; => 3 2 1

    (for [x [1 2 3]]
      (print x))         ; => 1 2 3

Bardziej funkcjonalny sposób iteracji zapewniają formy ze zrozumieniem, takie jak
:hy:funkcja:`lfor`. Podczas gdy ``for`` zawsze zwraca ``Brak``, ``lfor`` zwraca listę
z jednym elementem na iterację. ::

    (print (lfor  x [1 2 3]  (* x 2)))  ; => [2, 4, 6]


Funkcje, klasy i moduły
===============================

Zdefiniuj nazwane funkcje za pomocą :hy:func:`defn <hy.core.bootstrap.defn>`::

    (defn fib [n]
      (if (< n 2)
        n
        (+ (fib (- n 1)) (fib (- n 2)))))
    (print (fib 8))  ; => 21

Zdefiniuj funkcje anonimowe za pomocą :hy:func:`fn <fn>`::

    (print (list (filter (fn [x] (% x 2)) (range 10))))
      ; => [1, 3, 5, 7, 9]

Specjalne symbole na liście parametrów ``defn`` lub ``fn`` pozwalają na
wskaż opcjonalne argumenty, podaj wartości domyślne i zbierz niewymienione
argumenty::

    (defn test [a b [c None] [d "x"] #* e]
      [a b c d e])
    (print (test 1 2))            ; => [1, 2, None, 'x', ()]
    (print (test 1 2 3 4 5 6 7))  ; => [1, 2, 3, 4, (5, 6, 7)]

Ustaw parametr funkcji według nazwy z ``:keyword``::

    (test 1 2 :d "y")             ; => [1, 2, None, 'y', ()]

Zdefiniuj klasy za pomocą :hy:func:`defclass`::

    (defclass FooBar []
      (defn __init__ [self x]
        (setv self.x x))
      (defn get-x [self]
        self.x))

Tutaj tworzymy nową instancję ``fb`` ``FooBar`` i uzyskujemy dostęp do jej atrybutów przez
różne środki::

    (setv fb (FooBar 15))
    (print fb.x)         ; => 15
    (print (. fb x))     ; => 15
    (print (.get-x fb))  ; => 15
    (print (fb.get-x))   ; => 15

Zauważ, że składnia taka jak ``fb.x`` i ``fb.get-x`` działa tylko wtedy, gdy obiekt
wywoływana (w tym przypadku ``fb``) jest prostą nazwą zmiennej. Aby uzyskać
atrybut lub wywołaj metodę o dowolnej formie ``FORM``, musisz użyć
składnia ``(. FORM x)`` lub ``(.get-x FORM)``.

Uzyskaj dostęp do zewnętrznego modułu, napisanego w Pythonie lub Hy, za pomocą
:ref:`import`::

    (import math)
    (print (math.sqrt 2))  ; => 1.4142135623730951

Python może zaimportować moduł Hy jak każdy inny moduł, o ile sam Hy to posiada
został zaimportowany jako pierwszy, co oczywiście musiało już mieć miejsce, jeśli jesteś
uruchamianie programu Hy.

Makra
======

Makra są podstawowym narzędziem metaprogramowania Lispa. Makro to funkcja, która
jest wywoływana w czasie kompilacji (tj. gdy program Hy jest tłumaczony na
Python :mod:`ast` obiektów) i zwraca kod, który staje się częścią finalnego
program. Oto prosty przykład::

    (print "Executing")
    (defmacro m []
      (print "Now for a slow computation")
      (setv x (% (** 10 10 7) 3))
      (print "Done computing")
      x)
    (print "Value:" (m))
    (print "Done executing")
Jeśli uruchomisz ten program dwa razy z rzędu, zobaczysz to::

    $ hy example.hy
    Now for a slow computation
    Done computing
    Executing
    Value: 1
    Done executing
    $ hy example.hy
    Executing
    Value: 1
    Done executing

Wolne obliczenia są wykonywane podczas pierwszej kompilacji programu
wezwanie. Dopiero po skompilowaniu całego programu następuje normalne wykonanie
zacznij od góry, drukując "Wykonywanie". Kiedy program nazywa się sekundą
czas, jest uruchamiany z wcześniej skompilowanego kodu bajtowego, co jest równoważne
po prostu::

    (print "Executing")
    (print "Value:" 1)
    (print "Done executing")

Nasze makro ``m`` ma szczególnie prostą wartość zwracaną, liczbę całkowitą, która w
czas kompilacji jest konwertowany na literał całkowity. Ogólnie makra mogą zwracać
dowolne formularze Hy do wykonania jako kod. Jest kilku operatorów specjalnych
oraz makra, które ułatwiają programowe konstruowanie formularzy, takie jak
:hy:func:`quote` (``'``), :hy:func:`quasiquote` (`````), :hy:func:`unquote` (``~``), i
:hy:func:`defmacro! <hy.core.bootstrap.defmacro!>`. Poprzedni rozdział zawiera :hy:func:`prosty przykład <while>`
używania ````` i ``~`` do zdefiniowania nowej konstrukcji kontrolnej ``do-while``.

Czasami fajnie jest móc wywołać makro jednoparametrowe bez
zdanie wtrącone. Pozwalają na to makra tagów. Nazwa makra tagu często jest tylko jedna
długiego znaku, ale ponieważ Hy zezwala na większość znaków Unicode w nazwie a
makro (lub zwykła zmienna), wkrótce nie zabraknie Ci znaków. ::

  => (defmacro "#↻" [code]
  ...  (setv op (get code -1) params (list (butlast code)))
  ...  `(~op ~@params))
  => #↻(1 2 3 +)
  6

Co zrobić, jeśli chcesz użyć makra zdefiniowanego w innym module?
``import`` nie pomoże, ponieważ tłumaczy się jedynie na ``import`` . w Pythonie
instrukcja, która jest wykonywana w czasie wykonywania, a makra są rozwijane w czasie kompilacji,
czyli podczas tłumaczenia z Hy na Pythona. Zamiast tego użyj :hy:func:`require <require>`,
który importuje moduł i udostępnia makra w czasie kompilacji.
``require`` używa tej samej składni co ``import``. ::

   => (require tutorial.macros)
   => (tutorial.macros.rev (1 2 3 +))
   6

Następne kroki
===========

Wiesz już wystarczająco dużo, by być niebezpiecznym z Hy. Możesz teraz złośliwie się uśmiechać i
wymknąć się do Hydeaway, aby robić rzeczy niewyobrażalne.

Zapoznaj się z dokumentacją Pythona, aby uzyskać szczegółowe informacje na temat semantyki Pythona, a
pozostałą część tej instrukcji dla funkcji specyficznych dla Hy. Podobnie jak sam Hy, instrukcja jest
niekompletne, ale :ref:`wkłady <hakowanie>` są zawsze mile widziane.
