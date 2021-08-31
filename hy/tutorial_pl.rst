========
Tutorial
========

.. image:: _static/cuddles-transparent-small.png
   :alt: Karen Rustard's Cuddles

Ten rozdział zawiera krótkie wprowadzenie do Hy. Zakłada podstawową wiedzę
o programowaniu, ale bez konkretnej wcześniejszej znajomości Pythona lub Lispa.

Lisp na pythonie
================
Zacznijmy od klasyki::

    (print "Hy, world!")

Ten program wywołuje funkcję :func:`print`, która podobnie jak wszystkie w Pythonie
:ref:`funkcje wbudowane <py:built-in-funcs>`, są dostępne w Hy.

Wszystkie :ref:`binarne i jednoargumentowe operatory <py:expressions>` są
również dostępne, chociaż  ze względu na lispową
tradycja ``==`` jest pisane ``=``. A oto sposób używania operatora dodawania ``+``::

    (+ 1 3)

Ten kod zwraca ``4``. Jest to odpowiednik ``1 + 3`` w Pythonie i wielu innych
językach. Języki z `rodziny lispów
<https://pl.wikipedia.org/wiki/Lisp>`_ , w tym
Hy, używają tzw zapisu przedrostkowego(zwanego też notacją polską lub notacją Łukasiewicza): Zarówno ``+``, jak i ``print`` czy ``sqrt`` pojawiają się przed
wszystkimy zmiennymi. Wywołanie jest oddzielone nawiasami, ale otwarcie
nawiasu następuje przed wywołaniem operatora zamiast po nim, więc
zamiast ``sqrt(2)`` piszemy ``(sqrt 2)``. W przypadku większej ilości zmiennych np
dwie liczby całkowite w ``(+ 1 3)`` oddzielamy spacjami lubi innymi znakami niewidzialnymi. Wiele operatorów,
w tym ``+``, przyjmują więcej niż dwa zmienne: ``(+ 1 2 3)`` jest równoważne
``1 + 2 + 3``.

Oto bardziej złożony przykład::

    (- (* (+ 1 3 88) 2) 8)

Ten kod zwraca ``176``. Czemu? Możemy sprawdzić jak to wygląda w tradycyjnym zapisie wrostkowym(infiksowym) 
poleceniem ``echo "(- (* (+ 1 3 88) 2) 8)" | hy2py``, który zwraca kod Pythona odpowiadający podanemu kodowi Hy, albo przekazując opcję ``--spy`` do
Hy podczas uruchamiania REPL (Read Eval Print Loop, czyli Czytaj Ewaluuj Wyświetl Pętla), wówczas odpowiednik każdej linii wejściowej w Pythonie wyświetli się przed wynikiem. Odpowiednikiem wrostkowym w tym przypadku jest:

.. code-block:: python

    ((1 + 3 + 88) * 2) - 8

Aby ewaluować to wyrażenie infiksowe trzeba zacząć od obliczania formuły leżącej najbardziej wewnątrz i kontynuować z doliczaniem kolejnych wyrażen na zewnątrz. Tak samo się to robi w 
Lispie. Oto, co otrzymamy, ewaluując powyższy kod Hy krok po kroku::

    (- (* (+ 1 3 88) 2) 8)
    (- (* 92 2) 8)
    (- 184 8)
    176

Podstawową jednostką składni Lispa, która jest podobna do wyrażenia C lub Pythona, jest
**forma**. ``92``, ``*`` i ``(* 92 2)`` to wszystko formy. Program Lisp
składa się z sekwencji form zagnieżdżonych w formach. Formy są zazwyczaj
oddzielone od siebie znakami niedrukowalnymi, ale niektóre formy, takie jak ciąg znaków (``"Hej, świat!"``) mogą same zawierać znaki niedrukowalne. 
Natomiast **wyrażenie** to forma ujęta w nawiasy; jego pierwsza forma, potocznie zwana **głowa**, określa co robi wyrażenie i ogólnie powinna być to funkcja lub makro. Funkcje to najzwyklejszy rodzaj głowy, podczas gdy makra
(opisane bardziej szczegółowo poniżej) są funkcjami wykonywanymi w czasie kompilacji
i zwracają kod do wykonania w czasie wykonywania.

Komentarze zaczynają się od znaku ``;`` i trwają do końca linii.Komentarz jest funkcjonalnie równoważny z znakami niedrukowalnymi. ::

    (print (** 2 64))   ; Największa całkowita liczba 64 bitowa

Chociaż ``#`` nie jest znakiem komentarza w Hy, program Hy może zaczynać się od
`linii shebang <https://pl.wikipedia.org/wiki/Shebang>`_, którą Hy
zignoruje::

   #!/usr/bin/env hy
   (print "Uczyń mnie wykonywalnym i uruchom mnie!")

Literały
========

Hy ma :ref:`składnia literalna <syntax>` dla wszystkich typów co Python. Oto przykład kodu Hy dla każdego typu i jego odpowiednik w Pythonie.

==============  ================  ============================
Hy              Python            Typ
==============  ================  ============================
``1``           ``1``             :class:`int` (liczba całkowita)
``1.2``         ``1.2``           :class:`float` (liczba zmiennoprzecinkowa)
``4j``          ``4j``            :class:`complex` (liczba zespolona)
``True``        ``True``          :class:`bool` (typ logiczny)
``None``        ``None``          :class:`NoneType` (typ pusty)
``"hy"``        ``'hy'``          :class:`str` (tekstowy typ danych)
``b"hy"``       ``b'hy'``         :class:`bytes` (bajt)
``(, 1 2 3)``   ``(1, 2, 3)``     :class:`tuple` (krotka)
``[1 2 3]``     ``[1, 2, 3]``     :class:`list` (lista)
``#{1 2 3}``    ``{1, 2, 3}``     :class:`set` (zbiór)
``{1 2  3 4}``  ``{1: 2, 3: 4}``  :class:`dict` (tablica asocjacyjna)
==============  ================  ============================

Ponadto Hy przejmuje skłądnie ułamków z Clojure dla
:class:`fractions.Fraction`: ``1/3`` jest odpowiednikiem ``fractions.Fraction(1,3)``.

Hy REPL domyślnie wyświetla dane wyjściowe w składni Hy, za pomocą funkcji :hy:func:`hy.repr`::

  => [1 2 3]
  [1 2 3]


Natomiast jeśli wywołasz Hy w taki sposób::

  $ hy --repl-output-fn=repr


REPL użyje zamiast tego natywnej funkcji ``repr`` Pythona, więc zobaczysz wartości w składni Pythona::

  => [1 2 3]
  [1, 2, 3]


Podstawowe operacje
===================
Nadaj wartość zmiennej za pomocą :hy:func:`setv`::

    (setv zone-plane 8)


Uzyskaj dostęp do elementów listy, słownika lub innej struktury danych za pomocą
:hy:func:`get <hy.core.shadow.get>`::

    (setv owoc ["jabłko" "banan" "melon"])
    (print (get owoc 0))  ; => jabłko
    (setv (get owoc 1) "durian")
    (print (get owoc 1))  ; => durian


Uzyskaj dostęp do szeregu elementów w uporządkowanej strukturze za pomocą :hy:func:`cut`::

    (print (cut "abcdef" 1 4))  ; => bcd


Logika warunkowa może być zbudowana za pomocą :ref:`if`::

    (if (= 1 1)
      (print "Matamtyka działą. Wszechświat jest bezpieczny.")
      (print "Matematyka zawiodła. Apokalipsa!!!"))


Tak jak w tym przykładzie, ``if`` jest wywoływane tak jak ``(if CONDITION THEN ELSE)`` (jeśli WARUNEK WTEDY W-INNYM-PRZYPADKU). Ono
wykonuje i zwraca formę ``THEN`` jeśli ``CONDITION`` jest prawdziwy (zgodnie z
:class:`bool`) i ``ELSE`` w przeciwnym razie. Jeśli pominięto ``ELSE``, to ``None`` będzie w tym miejscu.

Co jeśli chcesz użyć czegoś więcej niż formy na miejscu ``THEN`` lub klauzuli ``ELSE`` lub zamiast „CONDITION”? Użyj makra
:hy:func:`do` (znany bardziej tradycyjnie w Lispie jako ``progn``), który łączy kilka form w jedną, zwracając ostatnią::

   (if (do (print "Sprawdźmy.") (= 1 1))
     (do
       (print "Matematyka działa.")
       (print "Wschechświat jest bezpieczny."))
     (do
       (print "Matematyka zawiodła.")
       (print "Armageddon!!")))


Aby rozgałęziać na więcej niż jeden przypadek, spróbuj :hy:func:`cond <hy.core.macros.cond>`::

   (setv somevar 33)
   (cond
    [(> somevar 50)
     (print "Zmienna jest za duża!")]
    [(< somevar 10)
     (print "Zmienna jest za mała!")]
    [True
     (print "W sssssam raz!!")])


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


Bardziej funkcjonalny sposób iteracji zapewniają formy interpetowalne(po angielsku list comprehension, nie kojarzę ładnego polskiego odpowiednika), takie jak
:hy:func:`lfor`. Podczas gdy ``for`` zawsze zwraca ``None``, ``lfor`` zwraca listę
z jednym elementem z każdej iteracji. ::

    (print (lfor  x [1 2 3]  (* x 2)))  ; => [2, 4, 6]


Funkcje, klasy i moduły
===============================

Definiowanie funkcji nazwanej za pomocą :hy:func:`defn <hy.core.bootstrap.defn>`::

    (defn fib [n]
      (if (< n 2)
        n
        (+ (fib (- n 1)) (fib (- n 2)))))
    (print (fib 8))  ; => 21


Definiowanie funkcji anonimowej za pomocą :hy:func:`fn <fn>`::

    (print (list (filter (fn [x] (% x 2)) (range 10))))
      ; => [1, 3, 5, 7, 9]


Symbole specjalne w liście parametrów ``defn`` lub ``fn`` pozwalają na
wskazanie opcjonalnych argumentów, podają wartości domyślne i zbierają niewymienione argumenty::

    (defn test [a b [c None] [d "x"] #* e]
      [a b c d e])
    (print (test 1 2))            ; => [1, 2, None, 'x', ()]
    (print (test 1 2 3 4 5 6 7))  ; => [1, 2, 3, 4, (5, 6, 7)]


Ustawianie parametru funkcji według nazwy z ``:słowo-kluczowe``::

    (test 1 2 :d "y")             ; => [1, 2, None, 'y', ()]


Definiowanie klasy za pomocą :hy:func:`defclass`::

    (defclass FooBar []
      (defn __init__ [self x]
        (setv self.x x))
      (defn get-x [self]
        self.x))


Tutaj tworzymy nową instancję ``fb`` z klasy ``FooBar`` i uzyskujemy dostęp do jej atrybutów poprzez różne środki::

    (setv fb (FooBar 15))
    (print fb.x)         ; => 15
    (print (. fb x))     ; => 15
    (print (.get-x fb))  ; => 15
    (print (fb.get-x))   ; => 15


Zauważ, że składnia taka jak ``fb.x`` i ``fb.get-x`` działa tylko wtedy, gdy obiekt
wywoływany (w tym przypadku ``fb``) jest prostą nazwą zmiennej. Aby uzyskać
atrybut lub wywołać metodę o dowolnej formie ``FORM``, musisz użyć
składnie ``(. FORM x)`` lub ``(.get-x FORM)``.

Dostęp do zewnętrznego modułu, napisanego w Pythonie lub Hy, za pomocą
:ref:`import`::

    (import math)
    (print (math.sqrt 2))  ; => 1.4142135623730951


Python może zaimportować moduł Hy jak każdy inny moduł, o ile sam Hy został zaimportowany jako pierwszy, co oczywiście musiało już mieć miejsce, jeśli uruchomiłeś program Hy.

Makra
======

Makra są podstawowym narzędziem metaprogramowania Lispa. Makro to funkcja, która
jest wywoływana w czasie kompilacji (tj. gdy program Hy jest tłumaczony na
Python :mod:`ast` obiektów) i zwraca kod, który staje się częścią finalnego
program. Oto prosty przykład::

    (print "Uruchamiam")
    (defmacro m []
      (print "A teraz parę powolnych obliczeń")
      (setv x (% (** 10 10 7) 3))
      (print "Skończyłem obliczanie")
      x)
    (print "Wynik:" (m))
    (print "Skończyłem wykonywanie")


Jeśli uruchomisz ten program dwa razy z rzędu, zobaczysz to::

    $ hy przyklad.hy
    A teraz parę powolnych obliczeń
    Skończyłem obliczanie
    Uruchamiam
    Wynik: 1
    Skończyłem wykonywanie
    $ hy przyklad.hy
    Uruchamiam
    Wynik: 1
    Skończyłem wykonywanie


Powolne obliczenia są wykonywane podczas kompilacji programu przy pierwszym wywołaniu. Dopiero po skompilowaniu całego programu następuje normalne wykonanie zaczynając od góry, wyświetla "Uruchamiam". Kiedy program uruchamia się drugi raz, jest uruchamiany z wcześniej skompilowanego kodu bajtowego, co jest równoważne do::

    (print "Uruchamiam")
    (print "Wynik:" 1)
    (print "Skończyłem wykonywanie")


Nasze makro ``m`` ma szczególnie prostą wartość zwracaną, liczbę całkowitą, która w
czas kompilacji jest konwertowany na literał całkowity. Ogólnie makra mogą zwracać
dowolne formy Hy do wykonania jako kod. Jest kilku operatorów specjalnych
oraz makra, które ułatwiają programowe konstruowanie formularzy, takie jak
:hy:func:`quote` (``'``), :hy:func:`quasiquote` (`````), :hy:func:`unquote` (``~``), i
:hy:func:`defmacro! <hy.core.bootstrap.defmacro!>`. Poprzedni rozdział zawiera :hy:func:`prosty przykład <while>`
używania ````` i ``~`` do zdefiniowania nowej konstrukcji kontrolnej ``do-while``.

Czasami fajnie jest móc wywołać makro jednoparametrowe bez
nawiasów. Umożliwiają to makra tagów. Nazwa makra tagu często jest tylko jeden znak, ale ponieważ Hy zezwala na większość znaków Unicode w nazwie 
makra (lub zwykłej zmiennej), to tak prędko ci się nie skończą znaki. ::

  => (defmacro "#↻" [code]
  ...  (setv op (get code -1) params (list (butlast code)))
  ...  `(~op ~@params))
  => #↻(1 2 3 +)
  6


A co, gdybyś chciał użyć makra zdefiniowanego w innym module?
``import`` nie pomoże, ponieważ tłumaczy się jedynie na ``import`` . w Pythonie
instrukcja, która jest wykonywana w czasie wykonywania, a makra są rozwijane w czasie kompilacji,
czyli podczas tłumaczenia z Hy na Pythona. Zamiast tego użyj :hy:func:`require <require>`,
który importuje moduł i udostępnia makra w czasie kompilacji.
``require`` używa tej samej składni co ``import``. ::

   => (require tutorial.macros)
   => (tutorial.macros.rev (1 2 3 +))
   6

Hyrule
======

`Hyrule <https://github.com/hylang/hyrule>`_ to standardowa biblioteka narzędziowa Hy.
Zapewnia wiele funkcji i makr, które są przydatne do pisania programów w Hy. ::

    => (import hyrule [inc])
    => (list (map inc [1 2 3]))
    [2 3 4]
    => (require hyrule [assoc])
    => (setv d {})
    => (assoc d  "a" 1  "b" 2)
    => d
    {"a" 1  "b" 2}

Następne kroki
==============

Wiesz już wystarczająco dużo, by być niebezpiecznym z Hy. Możesz teraz złośliwie się uśmiechać i
wymknąć się do swojej kryjówki, aby robić rzeczy niewyobrażalne.

Zapoznaj się z dokumentacją Pythona, aby uzyskać szczegółowe informacje na temat semantyki Pythona, a
pozostałą część tej dokumentacji dla funkcji specyficznych dla Hy. Podobnie jak sam Hy, ta dokumentacja nie jest jeszcze gotowa(ani jej tłumaczenie!), ale :ref:`wkłady <hacking>` są zawsze mile widziane.
