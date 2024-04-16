$fields = $web.Fields;
$context.Load($fields);
$context.ExecuteQuery();
$fieldsArray = @();


$fieldsArray += '<Field ID="bf9c293c-a7d3-41b1-9753-cc82bcfe80d4" 
                Name="EV_id"
                DisplayName="ID" 
                Type="Number"
                Hidden="TRUE"
                Group="Eventos" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                </Field>';

$fieldsArray += '<Field ID="5a2335ef-d6e1-4b79-8c91-1fb040fe7f82" 
                Name="EV_game"
                DisplayName="Game" 
                Type="Text"
                Group="Eventos" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                </Field>';

$fieldsArray += '<Field ID="8ec85538-7976-4f9f-a762-e70d678ef0f8" 
                Name="EV_title"
                DisplayName="Title" 
                Type="Text"
                Group="Eventos" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                </Field>';

$fieldsArray += '<Field ID="1f794eea-2ffb-43d2-83b2-09e75d1e18d0" 
                Name="EV_requirements"
                DisplayName="Requirements" 
                Type="Note"
                Group="Eventos" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                </Field>';

$fieldsArray += '<Field ID="28afedf9-7eb3-450f-853d-5857bacf3088" 
                Name="EV_description"
                DisplayName="Description" 
                Type="Note"
                Group="Eventos" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                </Field>';

$fieldsArray += '<Field ID="3830efcf-c587-4354-81c0-2bfa5f719f13" 
                Name="EV_awards"
                DisplayName="Awards" 
                Type="Note"
                Group="Eventos" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                </Field>';

$fieldsArray += '<Field ID="0bd3d07b-3ef1-4f57-8015-492109800627" 
                Name="EV_date"
                DisplayName="Date" 
                Type="DateTime"
                Group="Eventos" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                </Field>';

$fieldsArray += '<Field ID="a99c8636-7882-4fc9-9181-5c77b6b37b67" 
                Name="EV_composition"
                DisplayName="Composition" 
                Type="Number"
                Group="Eventos" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                </Field>';


$fieldOption = [Microsoft.SharePoint.Client.AddFieldOptions]::DefaultValue;

foreach ($xml in $fieldsArray) {
    write-host $xml
    $field = $fields.AddFieldAsXml($xml, $true, $fieldOption); 
    $context.Load($field);
    $context.ExecuteQuery();
}

write-host "Columnas creadas exitosamente." -ForegroundColor Green