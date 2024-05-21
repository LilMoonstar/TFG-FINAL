$fieldsArray = @();
$fields = $web.Fields;
$context.Load($fields);
$context.ExecuteQuery();

#[guid]::NewGuid()

$fieldsArray += '<Field ID="b74e4865-19e1-47f2-b302-cecfe7049324" 
                Name="TEAM_Members"
                DisplayName="Miembros" 
                Type="UserMulti" 
                Mult="TRUE"
                Group="Equipos" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                </Field>';
                
$fieldsArray += '<Field ID="06a1ffe5-f46d-4f4a-b203-da6d9ccaec36" 
                Name="TEAM_Game"
                DisplayName="Juego" 
                Type="Choice"
                Required="TRUE"
                Group="Equipos" 
                xmlns="http://schemas.microsoft.com/sharepoint/">
                <CHOICES>
                       <CHOICE>LEAGUE OF LEGENDS</CHOICE>
                       <CHOICE>FORTNITE</CHOICE>
                </CHOICES>
                </Field>';

$fieldsArray += '<Field ID="a752ea1e-9969-40c3-8632-02ef0149cf01" 
                Name="TEAM_Date"
                DisplayName="Fecha" 
                Type="DateTime"
                Group="Equipos" 
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