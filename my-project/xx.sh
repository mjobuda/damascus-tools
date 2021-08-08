#!/bin/sh
#_(
   #_DEPS is same format as deps.edn. Multiline is okay.
   DEPS='
   {:deps 
   	{cli-matic {:mvn/version "0.3.3"}}}
   '

   #_You can put other options here
   OPTS='
   -J-Xms256m -J-Xmx256m 
   -J-client
   -J-Dclojure.spec.skip-macros=true
   '
exec clojure $OPTS -Sdeps "$DEPS" "$0" "$@"
)

(println "It works!")
(println "It works!")


