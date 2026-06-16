@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo  ↩️  ROLLBACK - RESTAURANDO BACKUPS
echo ========================================
echo.
echo ⚠️  ADVERTENCIA: Esto restaurara TODOS los archivos
echo    a su estado anterior a la migracion.
echo.

set /p confirm="¿Estas seguro de continuar? (S/N): "

if /i not "%confirm%"=="S" (
    echo ❌ Rollback cancelado
    pause
    exit /b
)

set "restaurados=0"
set "errores=0"

:: Restaurar components
echo.
echo Restaurando archivos en components...
for /r "components" %%f in (*.bak) do (
    set "original=%%~dpnf"
    set "original=!original!.vue"
    if exist "!original!" (
        echo    Restaurando: %%~nxf
        copy "%%f" "!original!" >nul
        if errorlevel 1 (
            echo       ❌ Error al restaurar
            set /a errores+=1
        ) else (
            echo       ✅ Restaurado
            set /a restaurados+=1
        )
    ) else (
        echo    ⚠️  El archivo original no existe: %%~nxf
        set /a errores+=1
    )
)

:: Restaurar pages
echo.
echo Restaurando archivos en pages...
for /r "pages" %%f in (*.bak) do (
    set "original=%%~dpnf"
    set "original=!original!.vue"
    if exist "!original!" (
        echo    Restaurando: %%~nxf
        copy "%%f" "!original!" >nul
        if errorlevel 1 (
            echo       ❌ Error al restaurar
            set /a errores+=1
        ) else (
            echo       ✅ Restaurado
            set /a restaurados+=1
        )
    ) else (
        echo    ⚠️  El archivo original no existe: %%~nxf
        set /a errores+=1
    )
)

:: Restaurar layouts
if exist "layouts" (
    echo.
    echo Restaurando archivos en layouts...
    for /r "layouts" %%f in (*.bak) do (
        set "original=%%~dpnf"
        set "original=!original!.vue"
        if exist "!original!" (
            echo    Restaurando: %%~nxf
            copy "%%f" "!original!" >nul
            if errorlevel 1 (
                echo       ❌ Error al restaurar
                set /a errores+=1
            ) else (
                echo       ✅ Restaurado
                set /a restaurados+=1
            )
        ) else (
            echo    ⚠️  El archivo original no existe: %%~nxf
            set /a errores+=1
        )
    )
)

echo.
echo ========================================
if %errores%==0 (
    echo  ✅ ROLLBACK COMPLETADO!
    echo  📝 Archivos restaurados: %restaurados%
) else (
    echo  ⚠️ ROLLBACK COMPLETADO CON ERRORES
    echo  📝 Archivos restaurados: %restaurados%
    echo  ❌ Errores: %errores%
)
echo ========================================
pause