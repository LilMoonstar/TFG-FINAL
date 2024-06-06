# Creación de la lista
$listTitle = "Eventos"
$listDescription = "Lista Eventos"
$listTemplate = [Microsoft.SharePoint.Client.ListTemplateType]::GenericList

$lci = New-Object Microsoft.SharePoint.Client.ListCreationInformation
$lci.title = $listTitle
$lci.description = $listDescription
$lci.TemplateType = $listTemplate

$list = $context.web.lists.add($lci)
$context.load($list)

try {
    $context.executeQuery()
    Write-Host "List $listTitle created" -ForegroundColor Green
}
catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
}  

# Habilitar tipos de contenido y configuraciones adicionales
$list.ContentTypesEnabled = $true
$list.EnableFolderCreation = $false
$list.Update()
$context.ExecuteQuery()

# Añadir tipo de contenido existente a la lista
$tipodecontenido = "THISEventos"
$contentTypes = $context.web.ContentTypes

$context.Load($contentTypes)
$context.ExecuteQuery()

$contentType = $contentTypes | Where-Object {$_.Name -eq $tipodecontenido}

$context.Load($list.ContentTypes)
$context.ExecuteQuery();

if ($contentType -ne $null) {
    $AddCT = $list.ContentTypes.AddExistingContentType($contentType)
    $context.ExecuteQuery()

    Write-Host "Content type $tipodecontenido added to the list" -ForegroundColor Green

    # Eliminar tipos de contenido no deseados
    $tiposBorrar = @()

    foreach ($tipoenlista in $list.ContentTypes) {
        if ($tipoenlista.Name -eq "Elemento") {
            $tiposBorrar += $tipoenlista
        }
    }

    foreach ($tipoBorrar in $tiposBorrar) {
        $tipoBorrar.DeleteObject()
    }

    $context.ExecuteQuery()

    Write-Host "Unwanted content types removed from the list" -ForegroundColor Green

    # Configurar vista de la lista
    $views = $list.Views
    $context.Load($views)
    $context.ExecuteQuery()

    $vista = $views | Where-Object {$_.Title -eq "Todos los elementos"}

    if ($vista) {
        $viewFields = $vista.ViewFields
        $context.Load($viewFields)
        $context.ExecuteQuery()

            $viewFields.Add("ID")
            $viewFields.Add("EV_game")
            $viewFields.Add("EV_requirements")
            $viewFields.Add("EV_description")
            $viewFields.Add("EV_awards")
            $viewFields.Add("EV_date")
            $viewFields.Add("EV_composition")


        $vista.ViewQuery = "<OrderBy><FieldRef Name='ID' Ascending='TRUE'/></OrderBy>"
        $vista.Update()

        $context.ExecuteQuery()

        Write-Host "List view configured successfully" -ForegroundColor Green
    } else {
        Write-Host "ERROR: Unable to locate the view" -ForegroundColor Red
    }
} else {
    Write-Host "ERROR: Content type $tipodecontenido not found" -ForegroundColor Red
}

$fields = $web.Fields;
$context.Load($fields);
$context.ExecuteQuery();
 
$list.ID
write-host "|--- Lookup Evento";
$fieldxml= '<Field ID="{6e5be620-b717-4bae-8143-82a3a51744c5}" 
                Name="LookupEvento"
                DisplayName="LookupEvento" 
                Type="Lookup"
                List="'+$list.ID+'"
                ShowField="Title"
                Group="Lookups" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
</Field>';
 
$field = $fields.AddFieldAsXml($fieldxml, $true, [Microsoft.SharePoint.Client.AddFieldOptions]::DefaultValue); 
$context.Load($field);
$context.ExecuteQuery();