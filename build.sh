#!/bin/sh
# app.html(미리보기용 본문)을 감싸서 어디서나 열 수 있는 index.html을 만든다
cd "$(dirname "$0")"
{
  printf '<!doctype html>\n<html lang="ko">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
  sed -n '1,/^<\/style>$/p' app.html
  printf '</head>\n<body>\n'
  sed -n '/^<\/style>$/,$p' app.html | sed '1d'
  printf '</body>\n</html>\n'
} > index.html
