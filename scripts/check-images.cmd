@echo off
setlocal enabledelayedexpansion

echo ========================================
echo  🔍 VERIFICANDO IMAGENES NO MIGRADAS
echo ========================================
echo.

set "encontrados=0"

echo Buscando en components...
for /r "components" %%f in (*.vue) do (
    findstr /c:"<img " "%%f" >nul 2>&1
    if not errorlevel 1 (
        set /a encontrados+=1
        echo ⚠️  %%f
    )
)

echo.
echo Buscando en pages...
for /r "pages" %%f in (*.vue) do (
    findstr /c:"<img " "%%f" >nul 2>&1
    if not errorlevel 1 (
        set /a encontrados+=1
        echo ⚠️  %%f
    )
)

echo.
echo ========================================
if !encontrados!==0 (
    echo  ✅ TODOS LOS ARCHIVOS ESTAN MIGRADOS!
) else (
    echo  ⚠️ HAY !encontrados! ARCHIVOS CON ^<img^> SIN MIGRAR
    echo.
    echo  Para migrar manualmente, reemplaza:
    echo  ^<img src="..." class="..." /^>
    echo  por:
    echo  ^<AppImage :src="..." image-class="..." /^>
)
echo ========================================
pause