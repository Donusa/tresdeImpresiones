@echo off
setlocal
title Tres de Impresiones - Servidor de desarrollo

cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo.
  echo No se encontro Node.js ni npm.
  echo Instala Node.js LTS desde https://nodejs.org/ y vuelve a ejecutar este archivo.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Instalando dependencias por primera vez...
  call npm install
  if errorlevel 1 (
    echo.
    echo No se pudieron instalar las dependencias.
    pause
    exit /b 1
  )
)

echo.
echo Iniciando Tres de Impresiones...
echo Cuando Vite indique la URL, abrela en el navegador.
echo Para detener el servidor presiona Ctrl+C.
echo.
call npm run dev -- --host 127.0.0.1

endlocal
