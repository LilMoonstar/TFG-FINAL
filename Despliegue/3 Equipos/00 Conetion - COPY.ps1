#hay que tener instalada librería pnp Install-Module PnP.PowerShell
#https://github.com/pnp/powershell

$siteUrl = "https://onlinecomasis.sharepoint.com/sites/Natasha"

Connect-PnPOnline -Url $siteUrl -UseWebLogin -WarningAction ignore

$context = Get-PnpContext
$web = $context.Web;
$context.Load($web);
$context.ExecuteQuery();


$lists = $web.Lists;
$context.Load($lists);
$context.ExecuteQuery();

#invoke-expression -Command "$contentPath\01.TrabajadoresTypes.ps1"
#invoke-expression -Command "$contentPath\02.TrabajadoresList.ps1"
#invoke-expression -Command "$contentPath\03.ActivosTypes.ps1"