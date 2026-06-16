@echo off
echo ========================================
echo  ↩️  RESTAURANDO BACKUPS
echo ========================================
echo.

echo Restaurando archivos en components...
for /r "components" %%f in (*.bak) do (
    set "original=%%~dpnf"
    set "original=!original!.vue"
    echo Restaurando: !original!
    copy "%%f" "!original!" >nul
)

echo.
echo Restaurando archivos en pages...
for /r "pages" %%f in (*.bak) do (
    set "original=%%~dpnf"
    set "original=!original!.vue"
    echo Restaurando: !original!
    copy "%%f" "!original!" >nul
)

echo.
echo ✅ Backups restaurados!
pause