#!/bin/bash
# This script runs the needed migrations, and starts the server
npx prisma migrate deploy
node dist/index.js