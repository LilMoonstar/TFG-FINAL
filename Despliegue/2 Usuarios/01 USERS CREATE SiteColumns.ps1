$fields = $web.Fields;
$context.Load($fields);
$context.ExecuteQuery();
$fieldsArray = @();

$fieldsArray += '<Field ID="28afedf9-7eb3-450f-853d-5857bacf3088" 
                Name="US_User"
                DisplayName="User" 
                Type="Note"
                Group="Usuarios" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                </Field>';

$fieldsArray += '<Field ID="28afedf9-7eb3-450f-853d-5857bacf3088" 
                Name="US_UsernameLOL"
                DisplayName="Nickname" 
                Type="Note"
                Group="Usuarios" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                </Field>';
                
$fieldsArray += '<Field ID="28afedf9-7eb3-450f-853d-5857bacf3088" 
                Name="US_UsernameFOR"
                DisplayName="Nickname" 
                Type="Note"
                Group="Usuarios" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                </Field>';

$fieldsArray += '<Field ID="5a2335ef-d6e1-4b79-8c91-1fb040fe7f82" 
                Name="US_Role"
                DisplayName="Role" 
                Type="Choice"
                Required="TRUE"
                Group="Usuarios" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                <CHOICES>
                       <CHOICE>TOP</CHOICE>
                       <CHOICE>JNG</CHOICE>
                       <CHOICE>MID</CHOICE>
                       <CHOICE>ADC</CHOICE>
                       <CHOICE>SUPP</CHOICE>
                </CHOICES>
                </Field>';


$fieldsArray += '<Field ID="5a2335ef-d6e1-4b79-8c91-1fb040fe7f82" 
                Name="US_Champs"
                DisplayName="Role" 
                Type="Choice"
                Required="TRUE"
                Group="Usuarios" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                <CHOICES>
                       <CHOICE>TOP</CHOICE>
                       <CHOICE>JNG</CHOICE>
                       <CHOICE>MID</CHOICE>
                       <CHOICE>ADC</CHOICE>
                       <CHOICE>SUPP</CHOICE>
                </CHOICES>
                </Field>';




$fieldOption = [Microsoft.SharePoint.Client.AddFieldOptions]::DefaultValue;

foreach ($xml in $fieldsArray) {
    write-host $xml
    $field = $fields.AddFieldAsXml($xml, $true, $fieldOption); 
    $context.Load($field);
    $context.ExecuteQuery();
}

write-host "Columnas creadas exitosamente." -ForegroundColor Green