$backup = Get-Content -Raw "C:\Users\luizw\Downloads\mimos-produtos-backup.json" | ConvertFrom-Json
$ursos = $backup | Where-Object { $_.id -eq "1780189745001" }
$base64image = $ursos.image
Write-Host "Base64 length: $($base64image.Length) chars"$body = @{
    id = "1780189745001"
    image = $base64image
} | ConvertTo-Json -Compress
try {
    $r = Invoke-RestMethod -Uri "https://mimos-personalizados-tan.vercel.app/api/products" -Method Put -Body $body -ContentType "application/json" -TimeoutSec 30
    Write-Host "OK: $($r | ConvertTo-Json)"
} catch {
    Write-Host "Erro: $_"
}
