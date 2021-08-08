(ns demo.boot-build
  (:require [boot.core :as core]
            [boot.task.built-in :as task]))

(core/deftask build
  "Build my project."
  []
  (comp (task/pom) (task/jar) (task/install)))

