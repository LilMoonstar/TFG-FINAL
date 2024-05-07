$fieldsArray = @();
$fields = $web.Fields;
$context.Load($fields);
$context.ExecuteQuery();

#[guid]::NewGuid()

$fieldsArray += '<Field ID="cab5099a-4359-4a96-8f06-3a078e93bad7" 
                Name="US_User"
                DisplayName="User" 
                Type="User"
                Group="Usuarios"
                Required="TRUE"
                xmlns="http://schemas.microsoft.com/sharepoint/">
                </Field>';

$fieldsArray += '<Field ID="b7dc77a4-8cde-4fe2-9c41-eb2a14ddae8c" 
                Name="US_UsernameLOL"
                DisplayName="Nickname LoL" 
                Type="Note"
                Group="Usuarios" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                </Field>';
                
$fieldsArray += '<Field ID="3a75ae9f-3195-437a-9218-1cdbb2ba592b" 
                Name="US_UsernameFOR"
                DisplayName="Nickname Fortnite" 
                Type="Note"
                Group="Usuarios" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                </Field>';

$fieldsArray += '<Field ID="102598e3-bfb4-429c-bcc7-2104661d8dd6" 
                Name="US_Role"
                DisplayName="Role" 
                Type="Choice"
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

$fieldsArray += '<Field ID="94ebb0f9-9fc0-479e-9a75-0997cbc961d0" 
                Name="US_Platform"
                DisplayName="Platform" 
                Type="Choice"
                Group="Usuarios" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                <CHOICES>
                       <CHOICE>PS</CHOICE>
                       <CHOICE>XBox</CHOICE>
                       <CHOICE>PC</CHOICE>
                </CHOICES>
                </Field>';
                
$fieldsArray += '<Field ID="b2afd98d-37b3-4767-af00-ba5580f4dd5d" 
                Name="US_Controls"
                DisplayName="Controls" 
                Type="Choice"
                Group="Usuarios" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                <CHOICES>
                       <CHOICE>Keyboard + Mouse</CHOICE>
                       <CHOICE>Wireless Controler</CHOICE>
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