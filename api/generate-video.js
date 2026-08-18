name: Test Sisif Video API

on:
  workflow_dispatch:

jobs:
  generate:
    runs-on: ubuntu-latest

    steps:
      - name: Generate test video
        env:
          SISIF_API_KEY: ${{ secrets.SISIF_API_KEY }}
        run: |
          response=$(curl -sS -w "\n%{http_code}" \
            -X POST \
            "https://sisif.ai/api/videos/generate/" \
            -H "Authorization: Bearer $SISIF_API_KEY" \
            -H "Content-Type: application/json" \
            -d '{
              "prompt": "A cinematic golden sunset over a beautiful mountain landscape, ultra realistic",
              "duration": 5,
              "resolution": "540x960"
            }')

          echo "$response"
