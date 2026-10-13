# PromptPilot — Automated Verification & Sanity Test Runner

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " Running PromptPilot Automated Test Suite" -ForegroundColor Cyan
Write-Host " Target Directory: $projectRoot" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

$passed = 0
$failed = 0

function Assert-Test {
    param (
        [string]$Name,
        [scriptblock]$Condition
    )
    try {
        $result = & $Condition
        if ($result) {
            Write-Host " [PASS] $Name" -ForegroundColor Green
            $global:passed++
        } else {
            Write-Host " [FAIL] $Name" -ForegroundColor Red
            $global:failed++
        }
    } catch {
        Write-Host " [ERROR] $($Name): $_" -ForegroundColor Red
        $global:failed++
    }
}

# 1. File Structure Verification
Write-Host "`n1. Verifying Core File Structure..." -ForegroundColor Yellow

$requiredFiles = @(
    "index.html",
    "netlify.toml",
    "_redirects",
    ".gitignore",
    "README.md",
    "LICENSE",
    "css/styles.css",
    "css/components.css",
    "js/app.js",
    "js/bundle.js",
    "js/generator.js",
    "js/presets.js",
    "js/storage.js",
    "js/ui.js"
)

foreach ($file in $requiredFiles) {
    $fullPath = Join-Path $projectRoot $file
    Assert-Test "File exists and is non-empty: $file" {
        (Test-Path $fullPath) -and ((Get-Item $fullPath).Length -gt 0)
    }
}

# 2. HTML Markup & Netlify Configuration Verification
Write-Host "`n2. Verifying HTML Markup & Netlify Form Attributes..." -ForegroundColor Yellow
$htmlContent = Get-Content (Join-Path $projectRoot "index.html") -Raw

Assert-Test "HTML has modern DOCTYPE and viewport meta" {
    $htmlContent -match "<!DOCTYPE html>" -and $htmlContent -match 'name="viewport"'
}

Assert-Test "HTML contains Netlify form attributes" {
    $htmlContent -match 'data-netlify="true"' -and 
    $htmlContent -match 'name="form-name"\s+value="contact"' -and
    $htmlContent -match 'netlify-honeypot="bot-field"'
}

Assert-Test "HTML contains all 5 domain categories mentioned" {
    $htmlContent -match "Coding" -and 
    $htmlContent -match "Studying" -and 
    $htmlContent -match "Writing" -and 
    $htmlContent -match "Marketing" -and 
    $htmlContent -match "Creative"
}

Assert-Test "HTML has prompt generator form fields" {
    $htmlContent -match 'id="field-topic"' -and
    $htmlContent -match 'id="field-purpose"' -and
    $htmlContent -match 'id="field-audience"' -and
    $htmlContent -match 'id="field-tone"' -and
    $htmlContent -match 'id="field-output-format"' -and
    $htmlContent -match 'id="field-model"'
}

Assert-Test "HTML has copy-to-clipboard, reset, and favorites buttons" {
    $htmlContent -match 'id="btn-copy-prompt"' -and
    $htmlContent -match 'id="btn-reset-form"' -and
    $htmlContent -match 'id="btn-save-prompt"'
}

Assert-Test "HTML has mobile menu drawer and hamburger toggle" {
    $htmlContent -match 'id="mobile-menu-btn"' -and
    $htmlContent -match 'id="mobile-nav-drawer"'
}

# 3. Netlify Configuration Validation
Write-Host "`n3. Verifying Netlify Configuration Files..." -ForegroundColor Yellow
$netlifyToml = Get-Content (Join-Path $projectRoot "netlify.toml") -Raw
$redirects = Get-Content (Join-Path $projectRoot "_redirects") -Raw

Assert-Test "netlify.toml configures publish directory to '.'" {
    $netlifyToml -match 'publish\s*=\s*"\."'
}

Assert-Test "netlify.toml includes security headers" {
    $netlifyToml -match 'X-Frame-Options' -and $netlifyToml -match 'X-Content-Type-Options'
}

Assert-Test "_redirects contains fallback single-page rule" {
    $redirects -match "/\*\s+/index\.html\s+200"
}

# 4. JavaScript Modules & Prompt Engineering Logic
Write-Host "`n4. Verifying JavaScript Modules..." -ForegroundColor Yellow
$genContent = Get-Content (Join-Path $projectRoot "js/generator.js") -Raw
$presetsContent = Get-Content (Join-Path $projectRoot "js/presets.js") -Raw
$storageContent = Get-Content (Join-Path $projectRoot "js/storage.js") -Raw
$uiContent = Get-Content (Join-Path $projectRoot "js/ui.js") -Raw
$appContent = Get-Content (Join-Path $projectRoot "js/app.js") -Raw

Assert-Test "generator.js exports validatePromptInputs and generatePrompt" {
    $genContent -match "export function validatePromptInputs" -and
    $genContent -match "export function generatePrompt"
}

Assert-Test "generator.js implements CO-STAR, RTF, Claude XML, and Midjourney syntax" {
    $genContent -match "generateClaudeXmlPrompt" -and
    $genContent -match "generateMidjourneyPrompt" -and
    $genContent -match "generateStandardMarkdownPrompt" -and
    $genContent -match "calculateQualityScore"
}

Assert-Test "presets.js contains curated examples for all disciplines" {
    $presetsContent -match "coding:" -and
    $presetsContent -match "studying:" -and
    $presetsContent -match "writing:" -and
    $presetsContent -match "marketing:" -and
    $presetsContent -match "creative:" -and
    $presetsContent -match "CURATED_EXAMPLES"
}

Assert-Test "storage.js provides complete LocalStorage CRUD" {
    $storageContent -match "savePrompt" -and
    $storageContent -match "getSavedPrompts" -and
    $storageContent -match "deleteSavedPrompt" -and
    $storageContent -match "clearAllSavedPrompts"
}

Assert-Test "ui.js implements clipboard copy, toasts, and mobile navigation" {
    $uiContent -match "showToast" -and
    $uiContent -match "copyToClipboard" -and
    $uiContent -match "exportFile" -and
    $uiContent -match "initMobileNav"
}

# 5. CSS Stylesheet Sanity
Write-Host "`n5. Verifying CSS & Responsive Stylesheets..." -ForegroundColor Yellow
$stylesContent = Get-Content (Join-Path $projectRoot "css/styles.css") -Raw
$compContent = Get-Content (Join-Path $projectRoot "css/components.css") -Raw

Assert-Test "styles.css defines color variables and dark theme tokens" {
    $stylesContent -match "--bg-main" -and
    $stylesContent -match "--accent-cyan" -and
    $stylesContent -match "--accent-indigo"
}

Assert-Test "components.css includes responsive breakpoints" {
    $compContent -match "@media\s*\(max-width:\s*1024px\)" -and
    $compContent -match "@media\s*\(max-width:\s*768px\)" -and
    $compContent -match "@media\s*\(max-width:\s*480px\)"
}

# Summary
Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host " Test Execution Completed" -ForegroundColor Cyan
Write-Host " Passed: $passed | Failed: $failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })
Write-Host "==================================================" -ForegroundColor Cyan

if ($failed -gt 0) {
    exit 1
} else {
    exit 0
}
