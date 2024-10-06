@echo off

REM Start MongoDB
start mongod --dbpath "C:\data\db"

REM Start Backend
cd backend
start cmd /k "npm run dev"
cd ..

REM Start Frontend
cd frontend
start cmd /k "npm run dev -- --host"
cd ..


REM Open Chrome in a new window and navigate to http://localhost:5173/
start chrome --new-window http://localhost:5173/


REM Keep the command prompt open
pause
