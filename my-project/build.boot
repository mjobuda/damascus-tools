(set-env!
  :resource-paths #{"src"}
  :dependencies '[[me.raynes/conch "0.8.0"]])

(task-options!
  pom {:project 'my-project
       :version "0.1.0"}
  jar {:manifest {"Foo" "bar"}})

(require '[demo.boot-build :refer :all])

