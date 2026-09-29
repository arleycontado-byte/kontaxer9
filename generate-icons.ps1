# Recorta el JPG cuadrado, convierte el fondo negro a transparencia y genera iconos PNG.
# No sustituye las instrucciones ImageMagick/WebP del README; usa .NET integrado en Windows.
Add-Type -AssemblyName System.Drawing
$jpg = [System.Drawing.Bitmap]::new((Join-Path $PSScriptRoot 'assets/kontaxer-logo-source.jpg'))
$source = [System.Drawing.Bitmap]::new($jpg.Width,$jpg.Height,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$copyGraphics=[System.Drawing.Graphics]::FromImage($source)
$copyGraphics.DrawImageUnscaled($jpg,0,0)
$copyGraphics.Dispose();$jpg.Dispose()
$rect = [System.Drawing.Rectangle]::new(0, 0, $source.Width, $source.Height)
$data = $source.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bytes = [Math]::Abs($data.Stride) * $source.Height
$buffer = [byte[]]::new($bytes)
[Runtime.InteropServices.Marshal]::Copy($data.Scan0, $buffer, 0, $bytes)
for ($i = 0; $i -lt $bytes; $i += 4) {
    $blue=$buffer[$i]; $green=$buffer[$i+1]; $red=$buffer[$i+2]
    $alpha=[Math]::Max($red,[Math]::Max($green,$blue))
    if ($alpha -lt 22) { $buffer[$i+3]=0 } else {
        $buffer[$i+3]=$alpha
        $buffer[$i]=[byte][Math]::Min(255,[int]($blue*255/$alpha))
        $buffer[$i+1]=[byte][Math]::Min(255,[int]($green*255/$alpha))
        $buffer[$i+2]=[byte][Math]::Min(255,[int]($red*255/$alpha))
    }
}
[Runtime.InteropServices.Marshal]::Copy($buffer, 0, $data.Scan0, $bytes)
$source.UnlockBits($data)
$minX=$source.Width;$minY=$source.Height;$maxX=0;$maxY=0;$stride=[Math]::Abs($data.Stride)
for($py=0;$py -lt $source.Height;$py++){for($px=0;$px -lt $source.Width;$px++){$alphaIndex=$py*$stride+$px*4+3;if($buffer[$alphaIndex] -gt 12){if($px -lt $minX){$minX=$px};if($px -gt $maxX){$maxX=$px};if($py -lt $minY){$minY=$py};if($py -gt $maxY){$maxY=$py}}}}
$pad=22;$cropX=[Math]::Max(0,$minX-$pad);$cropY=[Math]::Max(0,$minY-$pad)
$cropW=[Math]::Min($source.Width-$cropX,$maxX+$pad-$cropX+1);$cropH=[Math]::Min($source.Height-$cropY,$maxY+$pad-$cropY+1)
$lockup=$source.Clone([System.Drawing.Rectangle]::new($cropX,$cropY,$cropW,$cropH),[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$lockup.Save((Join-Path $PSScriptRoot 'assets/kontaxer-logo-lockup.png'),[System.Drawing.Imaging.ImageFormat]::Png)
$lockup.Dispose()
function Save-LogoPng([int]$size,[string]$path,[bool]$darkBackground=$false,[int]$safeSize=0) {
    $canvas=[System.Drawing.Bitmap]::new($size,$size,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics=[System.Drawing.Graphics]::FromImage($canvas)
    $background=if($darkBackground){[System.Drawing.Color]::FromArgb(9,11,18)}else{[System.Drawing.Color]::Transparent}
    $graphics.Clear($background)
    $graphics.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $artSize=if($safeSize -gt 0){$safeSize}else{$size}
    $offset=[int](($size-$artSize)/2)
    $graphics.DrawImage($source,$offset,$offset,$artSize,$artSize)
    $canvas.Save((Join-Path $PSScriptRoot $path),[System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose();$canvas.Dispose()
}
Save-LogoPng 512 'assets/kontaxer-logo.png'
Save-LogoPng 64 'assets/favicon.png' $true
Save-LogoPng 180 'assets/apple-touch-icon.png' $true
Save-LogoPng 192 'assets/icon-192.png' $true
Save-LogoPng 512 'assets/icon-512.png' $true
Save-LogoPng 512 'assets/icon-maskable-512.png' $true 416
$og=[System.Drawing.Bitmap]::new(1200,630,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g=[System.Drawing.Graphics]::FromImage($og)
$g.Clear([System.Drawing.Color]::FromArgb(9,11,18))
$g.SmoothingMode=[System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.DrawImage($source,35,65,500,500)
$gold=[System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255,185,0))
$white=[System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(245,245,247))
$muted=[System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(195,199,208))
$fontTitle=[System.Drawing.Font]::new('Georgia',58,[System.Drawing.FontStyle]::Bold)
$fontBody=[System.Drawing.Font]::new('Arial',25,[System.Drawing.FontStyle]::Regular)
$fontSmall=[System.Drawing.Font]::new('Arial',23,[System.Drawing.FontStyle]::Regular)
$g.DrawString('KONTAXER',$fontTitle,$gold,585,145)
$g.DrawString('SERVICIOS CONTABLES Y',$fontBody,$white,590,265)
$g.DrawString('TRIBUTARIOS',$fontBody,$white,590,310)
$g.DrawString('Servicios para pymes y emprendedores',$fontSmall,$muted,590,405)
$og.Save((Join-Path $PSScriptRoot 'assets/og-image.png'),[System.Drawing.Imaging.ImageFormat]::Png)
$fontTitle.Dispose();$fontBody.Dispose();$fontSmall.Dispose();$gold.Dispose();$white.Dispose();$muted.Dispose();$g.Dispose();$og.Dispose()
$source.Dispose()
Write-Output 'Generated transparent logo PNG, favicon, Apple icon, PWA icons, and maskable icon.'
