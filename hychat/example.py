#!/usr/bin/env python
# -*- coding: utf-8 -*-

from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route


async def homepage(request):
    return JSONResponse({'hello': 'world'})

async def hophop(request):
    source = request.path_params['source']
    destination = request.path_params['destination']
    return JSONResponse({source: destination})

app = Starlette(debug=True, routes=[
    Route('/', homepage),
    Route('/{source}/{destination}', hophop)
])

