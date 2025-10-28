#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PAC_FILE="$SCRIPT_DIR/proxy.pac"

[ -f "$PAC_FILE" ] || { echo "PAC-файл не найден: $PAC_FILE"; exit 1; }

echo "Запуск прокси-системы из: $SCRIPT_DIR"
echo "PAC: http://localhost:8000/proxy.pac"
echo "SOCKS5: 127.0.0.1:1080"

# Запускаем все в фоне
socat TCP-LISTEN:8000,fork,reuseaddr SYSTEM:"echo -e 'HTTP/1.1 200 OK\\r\\nContent-Type: application/x-ns-proxy-autoconfig\\r\\n\\r'; cat '$PAC_FILE'" &
SOCAT_PID=$!

ciadpi --ip 127.0.0.1 -o1 -An &
CIADPI_PID=$!

# Ожидание Ctrl+C
trap "kill $SOCAT_PID $CIADPI_PID; exit" SIGINT SIGTERM
echo "Нажмите Ctrl+C для остановки"
wait
