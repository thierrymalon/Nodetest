#!/bin/bash
if [ $# -eq 0 ]; then
    port=8000
else
    port=$1
fi

python -m SimpleHTTPServer $port
