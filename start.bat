@echo off

REM Start MongoDB
start mongod --dbpath "C:\data\db"

REM Start Backend
cd backend
start cmd /k "npm run dev"
cd ..

REM Start Frontend
cd frontend
start cmd /k "npm run dev"
cd ..

REM Keep the command prompt open
pause
