#!/bin/bash

dean=$(($"$(grep -r --exclude='About.tsx' './frontend/src' -e '[Aa]uthor.*[Dd]ean' | wc -l)" + "$(grep -r --include=\*test.py './backend/' -e '[Aa]uthor.*[Dd]ean' | wc -l)"))
connor=$(($"$(grep -r --exclude='About.tsx' './frontend/src' -e '[Aa]uthor.*[Cc]onnor' | wc -l)" + "$(grep -r --include=\*test.py './backend/' -e '[Aa]uthor.*[Cc]onnor' | wc -l)"))
rosemary=$(($"$(grep -r --exclude='About.tsx' './frontend/src' -e '[Aa]uthor.*[Rr]osemary' | wc -l)" + "$(grep -r --include=\*test.py './backend/' -e '[Aa]uthor.*[Rr]osemary' | wc -l)"))
robert=$(($"$(grep -r --exclude='About.tsx' './frontend/src' -e '[Aa]uthor.*[Rr]obert' | wc -l)" + "$(grep -r --include=\*test.py './backend/' -e '[Aa]uthor.*[Rr]obert' | wc -l)"))
cristian=$(($"$(grep -r --exclude='About.tsx' './frontend/src' -e '[Aa]uthor.*[Cc]ristian' | wc -l)" + "$(grep -r --include=\*test.py './backend/' -e '[Aa]uthor.*[Cc]ristian' | wc -l)"))
andrew=$(($"$(grep -r --exclude='About.tsx' './frontend/src' -e '[Aa]uthor.*[Aa]ndrew' | wc -l)" + "$(grep -r --include=\*test.py './backend/' -e '[Aa]uthor.*[Aa]ndrew' | wc -l)"))

echo "{
    \"Dean\": "$dean",
    \"Connor\": "$connor",
    \"Rosemary\": "$rosemary",
    \"Robert\": "$robert",
    \"Cristian\": "$cristian",
    \"Andrew\": "$andrew",
    \"sum\": $(($dean + $connor + $rosemary + $robert + $cristian + $andrew))
}" > frontend/src/About/test-count.json
