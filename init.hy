#! usr/bin/env hy
;; * Hy REPL Init Script
;; ** Set up sys.path
(eval-and-compile
  (import sys
          os
          [pathlib [Path :as _Path]])
  (for [path ["python-libs" "hy-libs"]]
    (-> (os.environ.get "HOME")
       (_Path ".config/hy" path)
       str
       sys.path.append)))

;; ** Imports
(import
  sys
  [ast :as _ast]
  [math :as _math]
  [subprocess [run :as _run]]

  [hy.contrib.pprint [pformat pp]])

(require
  [hy.contrib.loop [loop]]
  [hy.contrib.destructure [let+ :as let fn+ defn+]]
  [hy.extra.anaphoric [*]])


;; *** REPL config
(defclass _TermColors []
  (setv COLOR-TEMPLATES [(, "black"        "0;30")
                         (, "red"          "0;31")
                         (, "green"        "0;32")
                         (, "brown"        "0;33")
                         (, "blue"         "0;34")
                         (, "purple"       "0;35")
                         (, "cyan"         "0;36")
                         (, "light_gray"   "0;37")
                         (, "dark_gray"    "1;30")
                         (, "light_red"    "1;31")
                         (, "light_green"  "1;32")
                         (, "yellow"       "1;33")
                         (, "light_blue"   "1;34")
                         (, "light_purple" "1;35")
                         (, "light_cyan"   "1;36")
                         (, "white"        "1;37")
                         (, "normal"       "0"   )]
        NOCOLOR ""
        base "\001\033[{}m\002")

  (defn __init__ [self]
    (for [[k v] self.COLOR-TEMPLATES]
      (setattr self k (if (in (os.environ.get "TERM")
                              #{"xterm-color" "xterm-256color" "linux"
                               "screen" "screen-256color" "screen-bce"})
                          (self.base.format v)
                          self.NOCOLOR)))))

(setv _c (_TermColors)
      sys.ps1 f"{_c.green}=> {_c.normal}"
      sys.ps2 f"{_c.red}... {_c.normal}")

(setv _old-unparse _ast.unparse
      _new-unparse (fn [#* args #** kwargs]
                     f"{_c.blue}{(_old-unparse #* args #** kwargs)}{_c.normal}")
      _ast.unparse _new-unparse
      _pformat (fn [#* args #** kwargs]
                 f"{_c.green}{(pformat #* args #** kwargs)}{_c.normal}"))

(setv repl-spy False
      repl-output-fn _pformat)

;; ** Macros
(defmacro "#$" [cmd]
  `(. (_run ~(str cmd) :shell True :check True :capture-output True :encoding "utf-8") stdout))

;; * Prelude
;; ** Aliases
(setv finite? _math.isfinite
      inf? _math.isinf
      nan? _math.isnan
      sqrt? _math.isqrt)

(import [toolz [*]])
(import [more-itertools [*]])

(del tail)
(del recipes)
(import [toolz [tail]])

;; ** Macros
(defmacro cond-> [expr #* clauses]
  (when (even? (len clauses))
    (raise (ValueError "cond-> takes an even number of clauses")))

  (setv g (gensym)
        steps (lfor [test step] (partition clauses 2)
                    `(if ~test (-> ~g ~step) ~g)))
  `(do (setv ~g ~expr
             ~@(interleave (repeat g) (butlast steps)))
       ~(if (empty? steps)
            g
            (last steps))))

(defmacro cond->> [expr #* clauses]
  (when (even? (len clauses))
    (raise (ValueError "cond-> takes an even number of clauses")))

  (setv g (gensym)
        steps (lfor [test step] (partition clauses 2)
                    `(if ~test (->> ~g ~step) ~g)))
  `(do (setv ~g ~expr
             ~@(interleave (repeat g) (butlast steps)))
       ~(if (empty? steps)
            g
            (last steps))))

;; ** Functions
(defn split-index [seq index]
  (setv it (iter seq))
  (, (islice it None index) it))

;; *** IO
(defn slurp [path]
  (let [path (.expanduser (_Path path))]
    (when (path.exists)
      (path.read-text))))

(defn spit [text path]
  (let [path (.expanduser (_Path path))]
    (path.write-text text)))
