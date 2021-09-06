;; Wrapping in an `eval-and-compile` ensures global python packages
;; are available in macros defined in this file as well.
(eval-and-compile
  (import sys os)
  (sys.path.append "~/<path-to-global-libs>"))

;; These modules, macros, and methods are now available in any Hy repl
(import
  re
  json
  pathlib [Path]
  hyrule [pp pformat])

(require
  hyrule [%])

(setv
  ;; Spy and output-fn will be set automatically for all hy repls
  repl-spy True
  repl-output-fn pformat
  ;; We can even add colors to the promps. This will set `=>` to green and `...` to red.
  sys.ps1 "\x01\x1b[0;32m\x02=> \x01\x1b[0m\x02"
  sys.ps2 "\x01\x1b[0;31m\x02... \x01\x1b[0m\x02")

;; Functions and Macros will be available in the repl without qualification
(defn slurp [path]
  (setv path (Path path))
  (when (path.exists)
    (path.read-text)))

(defmacro greet [person]
  `(print ~person))
