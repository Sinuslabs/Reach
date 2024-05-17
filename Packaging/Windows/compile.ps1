# Start total execution time measurement with high precision
$overallStart = Get-Date

# Load environment variables from a file
$infoEnvPath = Join-Path $PSScriptRoot "..\..\info.env"
Get-Content $infoEnvPath | ForEach-Object {
    if ($_ -match '=') {
        $parts = $_ -split '=', 2
        Set-Variable -Name $parts[0].Trim() -Value $parts[1].Trim()
    }
}

# Set local variables
$config = "Release"
$optimization = $true
$clean = $true
$build = $true
$copy = $true
$pluginType = "VST3"
$project = $env:NAME
$scriptRoot = Get-Location
$projectRoot = (Get-Location).Parent.Parent
$projucerPath = Join-Path $env:HISE_PATH "tools\projucer\Projucer.exe"
$hise = Join-Path $env:HISE_PATH "projects\standalone\Builds\Windows\build\HISE Standalone.exe"
$output = Join-Path $projectRoot "build\Windows\"
$sourceVST3 = Join-Path $projectRoot "Binaries\Builds\Windows\build\$env:NAME.vst3"

Write-Output "Project root: $projectRoot"

# Cleaning old build files
if ($clean) {
    Write-Output "Starting clean action..."
    Remove-Item "$projectRoot\build" -Recurse -Force -ErrorAction SilentlyContinue
    New-Item -Path "$projectRoot\build" -ItemType Directory -Force
    Remove-Item "$projectRoot\Binaries" -Recurse -Force -ErrorAction SilentlyContinue
}

# Building the plugins
if ($build) {
    Write-Output "Starting plugin build..."
    # PowerShell does not require chmod
    if ($optimization) {
        & $hise "export_ci XmlPresetBackups\$project.xml -t:'effect' -p:$pluginType"
    } else {
        & $hise "export_ci XmlPresetBackups\$project.xml -t:'effect' -p:$pluginType -nolto"
    }
    Set-Location "$projectRoot\Binaries"
    & "./batchCompileWindows.ps1"
}

# Check and copy the .vst3 file if it exists
if (Test-Path $sourceVST3) {
    Write-Output "Copying $env:NAME to $output..."
    Copy-Item -Path $sourceVST3 -Destination $output -Recurse -Force
} else {
    Write-Output "$env:NAME not found, skipping copy."
}

# Check for build success
if ($LASTEXITCODE -eq 0) {
    Write-Output "Build succeeded."
} else {
    Write-Output "Build failed."
    exit 1
}

# End total execution time measurement and print
$overallEnd = Get-Date
$duration = $overallEnd - $overallStart
$durationSeconds = ($duration.TotalMilliseconds / 1000).ToString("N3")
Write-Output "Total execution time: $durationSeconds seconds."

# Display version
Write-Output "Version: $env:VERSION"
