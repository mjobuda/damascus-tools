import hy
import starlette.responses as Res
import starlette.applications as SA
import starlette.routing as RO


async def homepage(req):
    return Res.JSONResponse({'hello': 'world'})


app = SA.Starlette(debug=True, routes=[RO.Route('/', homepage)])

