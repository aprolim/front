@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo  🔍 VERIFICANDO IMAGENES NO MIGRADAS
echo ========================================
echo.

set "encontrados=0"

:: Buscar en components
echo Buscando en components...
for /r "components" %%f in (*.vue) do (
    findstr /c:"<img " "%%f" >nul 2>&1
    if not errorlevel 1 (
        set /a encontrados+=1
        echo ⚠️  %%f
    )
)

:: Buscar en pages
echo.
echo Buscando en pages...
for /r "pages" %%f in (*.vue) do (
    findstr /c:"<img " "%%f" >nul 2>&1
    if not errorlevel 1 (
        set /a encontrados+=1
        echo ⚠️  %%f
    )
)

:: Buscar en layouts
if exist "layouts" (
    echo.
    echo Buscando en layouts...
    for /r "layouts" %%f in (*.vue) do (
        findstr /c:"<img " "%%f" >nul 2>&1
        if not errorlevel 1 (
            set /a encontrados+=1
            echo ⚠️  %%f
        )
    )
)

echo.
echo ========================================
if !encontrados!==0 (
    echo  ✅ TODOS LOS ARCHIVOS ESTAN MIGRADOS!
) else (
    echo  ⚠️ HAY !encontrados! ARCHIVOS CON ^<img^> SIN MIGRAR
)
echo ========================================
pause