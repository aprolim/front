@echo off
setlocal enabledelayedexpansion

echo ========================================
echo  🔍 MIGRACION DE IMAGENES A APPIMAGE
echo ========================================
echo.

set "contador=0"

echo Procesando archivos en components...
for /r "components" %%f in (*.vue) do (
    call :procesar "%%f"
)

echo.
echo Procesando archivos en pages...
for /r "pages" %%f in (*.vue) do (
    call :procesar "%%f"
)

echo.
echo ========================================
echo  ✅ MIGRACION COMPLETADA!
echo  📝 Archivos procesados: %contador%
echo  ⚠️ Revisa los archivos .bak si hay problemas
echo ========================================
pause
exit /b

:procesar
set "file=%~1"
set "filename=%~nx1"

:: Verificar si el archivo contiene <img>
findstr /c:"<img " "%file%" >nul 2>&1
if errorlevel 1 goto :eof

set /a contador+=1
echo.
echo 📝 [%contador%] Procesando: %filename%

:: Crear backup
copy "%file%" "%file%.bak" >nul

:: Crear archivo temporal
set "tempfile=%file%.tmp"

:: Reemplazar usando PowerShell (más confiable)
powershell -Command "
  $content = Get-Content '%file%' -Raw;
  $content = $content -replace '<img ', '<AppImage ';
  $content = $content -replace ' loading=\"lazy\"', ' loading-strategy=\"lazy\"';
  $content = $content -replace ' class=\"', ' image-class=\"';
  $content = $content -replace ' src=\"', ' :src=\"';
  [System.IO.File]::WriteAllText('%tempfile%', $content, [System.Text.UTF8Encoding]::new($false))
"

:: Reemplazar archivo original
move "%tempfile%" "%file%" >nul

echo ✅ Modificado: %filename%
goto :eof