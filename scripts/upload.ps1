$jsonPath = "C:\Users\luizw\Downloads\mimos-produtos-backup (2).json"
$apiUrl = "https://mimos-personalizados-brown.vercel.app/api/products"

$json = Get-Content $jsonPath -Raw | ConvertFrom-Json
$count = 0
$errors = 0

foreach ($p in $json) {
  try {
    $body = $p | ConvertTo-Json -Compress -Depth 100
    $r = Invoke-RestMethod -Uri $apiUrl -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
    $count++
  } catch {
    $errors++
  }
}

Write-Output "Enviados: $count | Erros: $errors"
