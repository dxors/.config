#!/bin/bash
cd "$(dirname "$0")"
socat TCP-LISTEN:8080,crlf,fork,reuseaddr SYSTEM:"cat response.txt proxy.pac" &
ciadpi -D --ip 127.0.0.1 -p 1080 -o1 -An &
wait
