# Definir el nombre del grupo y del tipo de contenido
$contentTypeGroup = "Usuarios"
$contentTypeName = "THISUsuarios"

# Añadir los nombres internos de las columnas que compondrán el tipo de contenido
$columns = "US_User","US_UsernameLOL","US_UsernameFOR","US_Role","US_Platform","US_Controls","US_Championpic"


# ID del tipo de contenido padre
$parentContentTypeID = "0x01"

# Cargar campos y tipos de contenido
$fields = $context.web.fields
$contentTypes = $context.web.contenttypes
$context.load($fields)
$context.load($contentTypes)

# Ejecutar la consulta para cargar campos y tipos de contenido
try {
    $context.executeQuery()
    Write-Host "Info: Campos y tipos de contenido cargados correctamente" -ForegroundColor Green
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Verificar si el tipo de contenido ya existe
$contentTypeExists = $false
foreach ($ct in $contentTypes) {
    if ($ct.Name -eq $contentTypeName) {
        $contentTypeExists = $true
        break
    }
}
$newContentType = $null
if (-not $contentTypeExists) {
    # Cargar el tipo de contenido padre
    $parentContentType = $contentTypes.GetByID($parentContentTypeID)
    $context.load($parentContentType)

    try {
        $context.executeQuery()
        Write-Host "Info: Tipo de contenido padre cargado correctamente" -ForegroundColor Green
    }
    catch {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }

    # Crear un nuevo tipo de contenido
    $ctci = New-Object Microsoft.SharePoint.Client.ContentTypeCreationInformation
    $ctci.name = $contentTypeName
    $ctci.ParentContentType = $parentContentType
    $ctci.group = $contentTypeGroup
    $ctci = $contentTypes.add($ctci)
    $context.load($ctci)

    try {
        $context.executeQuery()
        Write-Host "Info: Tipo de contenido creado correctamente" -ForegroundColor Green
    }
    catch {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }

    # Obtener el objeto del nuevo tipo de contenido
    $newContentType = $context.web.contenttypes.getbyid($ctci.id)
}

# Añadir campos al tipo de contenido si se creó correctamente
if ($newContentType -ne $null) {
    foreach ($column in $columns) {
        $field = $fields.GetByInternalNameOrTitle($column)
        $flci = New-Object Microsoft.SharePoint.Client.FieldLinkCreationInformation
        $flci.Field = $field
        $addContentType = $newContentType.FieldLinks.Add($flci)
    }

    # Actualizar el tipo de contenido
    $newContentType.Update($true)

    try {
        $context.executeQuery()
        Write-Host "Info: Columnas añadidas al tipo de contenido correctamente" -ForegroundColor Green
    }
    catch {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }

    # Cargar los enlaces de campo del nuevo tipo de contenido
   #e99c56fb-0190-4b9a-ad34-2a0e3684d284 $context.Load($newContentType.FieldLinks)

    try {
        $context.executeQuery()
    }
    catch {
        Write-Host "Error en campos: $($_.Exception.Message)" -ForegroundColor Red
    }

    Write-Host "Tipo de contenido $contentTypeName creado correctamente." -ForegroundColor Green
}
else {
    Write-Host "El tipo de contenido $contentTypeName ya existe." -ForegroundColor Yellow
}
