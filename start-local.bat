@echo off
title ResumeCraft Pro Local Server
echo ======================================================
echo   ResumeCraft Pro - Starting Local Web Application...
echo ======================================================
cd /d "%~dp0"
node server.js
if %errorlevel% neq 0 (
  echo.
  echo Node.js not detected or error occurred. Opening index.html directly...
  start "" "%~dp0index.html"
)
pause
