#!/bin/bash
cd /tmp/kavia/workspace/code-generation/web-tic-tac-toe-game-240731-240745/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

