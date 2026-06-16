@echo off
echo ========================================
echo  🗑️  ELIMINANDO ARCHIVOS DE BACKUP
echo ========================================
echo.

echo Buscando archivos .bak...
for /r "components" %%f in (*.bak) do (
    echo Eliminando: %%f
    del "%%f"
)
for /r "pages" %%f in (*.bak) do (
    echo Eliminando: %%f
    del "%%f"
)

echo.
echo ✅ Backups eliminados!
pause