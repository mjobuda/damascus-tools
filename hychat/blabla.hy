(import starlette.responses :as RES)
(import starlette.applications :as SA)
(import starlette.routing :as RO)



(defn/a homepage[req] (RES.JSONResponse
                      {"hello" "world"}))




(setv app (SA.Starlette :debug True :routes
                                            [
                                             (RO.Route "/" homepage)]))
