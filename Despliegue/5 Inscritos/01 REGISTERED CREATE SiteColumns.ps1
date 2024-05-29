$fieldsArray = @();
$fields = $web.Fields;
$context.Load($fields);
$context.ExecuteQuery();

#[guid]::NewGuid()



$fieldOption = [Microsoft.SharePoint.Client.AddFieldOptions]::DefaultValue;

foreach ($xml in $fieldsArray) {
    write-host $xml
    $field = $fields.AddFieldAsXml($xml, $true, $fieldOption); 
    $context.Load($field);
    $context.ExecuteQuery();
}

write-host "Columnas creadas exitosamente." -ForegroundColor Green