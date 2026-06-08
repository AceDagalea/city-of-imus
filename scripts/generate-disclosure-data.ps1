$outDir = Join-Path $PSScriptRoot "..\lib\generated"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Get-EOSection($html, $year) {
  $pattern = "(?s)id=`"Executive$year`"(.*?)(?=id=`"Executive|\z)"
  return [regex]::Match($html, $pattern).Groups[1].Value
}

function Parse-EOSection($sec, $year) {
  $items = @()
  [regex]::Matches($sec, '<tr[^>]*>(.*?)</tr>', 'Singleline') | ForEach-Object {
    $row = $_.Groups[1].Value
    $cells = [regex]::Matches($row, '<td[^>]*>(.*?)</td>', 'Singleline') | ForEach-Object { ($_.Groups[1].Value -replace '<[^>]+>',' ' -replace '\s+',' ').Trim() }
    $pdf = [regex]::Match($row, 'href="([^"]*\.pdf)"', 'IgnoreCase')
    if ($cells.Count -ge 3 -and $cells[0] -notmatch '__number' -and $cells[2] -ne '___title' -and $pdf.Success) {
      $num = ($cells[0] -replace 'EXECUTIVE ORDER NO\.','').Trim()
      $date = if ($cells[1] -and $cells[1] -ne '&nbsp;') { $cells[1] } else { "$year-01-01" }
      $pdfPath = $pdf.Groups[1].Value; if (-not $pdfPath.StartsWith('/')) { $pdfPath = "/$pdfPath" }
      $items += [ordered]@{ id="eo-$year-$($num -replace '\s','')"; title=$cells[2]; postedDate=$date; year=[int]$year; pdfPath=$pdfPath; number=$num }
    }
  }
  return $items
}

function Parse-Resolutions($html, $slug) {
  $items = @()
  [regex]::Matches($html, '<tr[^>]*>(.*?)</tr>', 'Singleline') | ForEach-Object {
    $cells = [regex]::Matches($_.Groups[1].Value, '<td[^>]*>(.*?)</td>', 'Singleline') | ForEach-Object { ($_.Groups[1].Value -replace '<[^>]+>',' ' -replace '\s+',' ').Trim() }
    if ($cells.Count -ge 2 -and $cells[0] -match 'SP RESOLUTION|CITY RESOLUTION') {
      $num = $cells[0]
      $date = if ($cells.Count -ge 3 -and $cells[1] -match '\d{4}') { $cells[1] } else { '' }
      $desc = if ($cells.Count -ge 3) { $cells[2] } else { $cells[1] }
      $short = if ($desc.Length -gt 100) { $desc.Substring(0,100) + '...' } else { $desc }
      $items += [ordered]@{ id="res-$slug-$($items.Count)"; number=$num; date=$date; title=$short; description=$desc }
    }
  }
  if ($items.Count -gt 0) { return $items }

  $plain = $html -replace '<script[\s\S]*?</script>',' ' -replace '<style[\s\S]*?</style>',' ' -replace '<br\s*/?>','`n' -replace '</p>','`n' -replace '</div>','`n' -replace '<[^>]+>',' '
  $plain = $plain -replace '\s+',' '
  $pattern = '((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4})\s+((?:SP|CITY) RESOLUTION(?:\s+NO\.)?\s+[\w\-]+)\s+(A RESOLUTION[\s\S]+?)(?=(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\s+(?:SP|CITY) RESOLUTION|$)'
  [regex]::Matches($plain, $pattern, 'IgnoreCase') | ForEach-Object {
    $desc = ($_.Groups[3].Value -replace '\s+',' ').Trim()
    $short = if ($desc.Length -gt 100) { $desc.Substring(0,100) + '...' } else { $desc }
    $items += [ordered]@{ id="res-$slug-$($items.Count)"; number=$_.Groups[2].Value.Trim(); date=$_.Groups[1].Value.Trim(); title=$short; description=$desc }
  }
  return $items
}

function Parse-Bids($html) {
  $items = @(); $seen = @{}
  [regex]::Matches($html, '<tr[^>]*>(.*?)</tr>', 'Singleline') | ForEach-Object {
    $row = $_.Groups[1].Value
    $cells = [regex]::Matches($row, '<td[^>]*>(.*?)</td>', 'Singleline') | ForEach-Object { ($_.Groups[1].Value -replace '<[^>]+>',' ' -replace '\s+',' ').Trim() }
    $pdf = [regex]::Match($row, 'href="([^"]*\.pdf)"', 'IgnoreCase')
    if ($cells.Count -ge 2 -and $pdf.Success -and $cells[0] -notmatch 'reference|________') {
      $ref = $cells[0]; $title = $cells[1]
      if ($title -and $title -ne '___title') {
        $pdfPath = $pdf.Groups[1].Value; if (-not $pdfPath.StartsWith('/')) { $pdfPath = "/$pdfPath" }
        $key = "$ref|$title|$pdfPath"
        if (-not $seen[$key]) {
          $seen[$key] = $true
          $items += [ordered]@{ id="bid-$($items.Count)"; reference=$ref; title=$title; datePosted='2026'; pdfPath=$pdfPath }
        }
      }
    }
  }
  return $items
}

function Parse-Ordinances($html, $slug) {
  $items = @()
  [regex]::Matches($html, '<tr[^>]*>(.*?)</tr>', 'Singleline') | ForEach-Object {
    $cells = [regex]::Matches($_.Groups[1].Value, '<td[^>]*>(.*?)</td>', 'Singleline') | ForEach-Object { ($_.Groups[1].Value -replace '<[^>]+>',' ' -replace '\s+',' ').Trim() }
    if ($cells.Count -ge 2 -and $cells[0] -match 'City Ordinance|ORDINANCE NO') {
      $items += [ordered]@{
        id = "ord-$slug-$($items.Count)"
        number = $cells[0]
        title = $cells[1]
        enacted = if ($cells.Count -ge 3) { $cells[2] } else { '' }
        approved = if ($cells.Count -ge 4) { $cells[3] } else { '' }
      }
    }
  }
  return $items
}

Write-Host "Fetching executive orders..."
$eoHtml = (Invoke-WebRequest -Uri "https://www.cityofimus.gov.ph/executive_order.html" -UserAgent "Mozilla/5.0" -UseBasicParsing).Content
$eo = @{}
foreach ($y in @(2026,2025,2024,2023,2022)) { $eo["$y"] = Parse-EOSection (Get-EOSection $eoHtml $y) $y }
$eo | ConvertTo-Json -Depth 6 | Set-Content (Join-Path $outDir "executive-orders.json") -Encoding UTF8

Write-Host "Fetching resolutions..."
$res = @{ current = Parse-Resolutions (Invoke-WebRequest -Uri "https://www.cityofimus.gov.ph/resolutions.html" -UserAgent "Mozilla/5.0" -UseBasicParsing).Content 'current' }
$archives = @(
  @('2024','resolutions_2024.html'), @('2023','resolutions_2023.html'), @('5th-2022','resolutions_5th2022.html'), @('4th-2022','resolutions_4th2022.html'),
  @('2020','resolutions_2020.html'), @('2019-4th','resolutions_4th2019.html'), @('2019-3rd','resolutions_3rd2019.html'), @('2018','resolutions_2018.html'),
  @('2017','resolutions_2017.html'), @('2016','resolutions_2016.html'), @('2015','resolutions_2015.html'), @('2014','resolutions_2014.html'),
  @('2013','resolutions_2013.html'), @('2012','resolutions_2012.html'), @('2011','resolutions_2011.html'), @('2010','resolutions_2010.html'),
  @('2009','resolutions_2009.html'), @('2008','resolutions_2008.html'), @('2007','resolutions_2007.html'), @('2006','resolutions_2006.html'),
  @('2005','resolutions_2005.html'), @('2003-2004','resolutions_2003-2004.html'), @('2001-2002','resolutions_2001-2002.html'),
  @('1996-2000','resolutions_1996-2000.html'), @('1991-1995','resolutions_1991-1995.html'), @('1986-1990','resolutions_1986-1990.html'), @('1980-1985','resolutions_1980-1985.html')
)
foreach ($a in $archives) {
  $html = (Invoke-WebRequest -Uri "https://www.cityofimus.gov.ph/$($a[1])" -UserAgent "Mozilla/5.0" -UseBasicParsing).Content
  $res[$a[0]] = Parse-Resolutions $html $a[0]
  Write-Host "  $($a[0]): $($res[$a[0]].Count)"
}
$res | ConvertTo-Json -Depth 6 | Set-Content (Join-Path $outDir "resolutions.json") -Encoding UTF8

Write-Host "Fetching bids..."
$bids = Parse-Bids (Invoke-WebRequest -Uri "https://www.cityofimus.gov.ph/bids-and-awards.html" -UserAgent "Mozilla/5.0" -UseBasicParsing).Content
$bids | ConvertTo-Json -Depth 6 | Set-Content (Join-Path $outDir "bids-awards.json") -Encoding UTF8

Write-Host "Fetching ordinances..."
$ord = @{
  '2011-2024' = Parse-Ordinances (Invoke-WebRequest -Uri "https://www.cityofimus.gov.ph/full-disclosure.html" -UserAgent "Mozilla/5.0" -UseBasicParsing).Content '2011-2024'
  '1919-2010' = Parse-Ordinances (Invoke-WebRequest -Uri "https://www.cityofimus.gov.ph/ordinance_1919-2010.html" -UserAgent "Mozilla/5.0" -UseBasicParsing).Content '1919-2010'
}
$ord | ConvertTo-Json -Depth 6 | Set-Content (Join-Path $outDir "ordinances.json") -Encoding UTF8

Write-Host "Done. EO:" ($eo.Values | Measure-Object).Count "total items, bids:" $bids.Count
