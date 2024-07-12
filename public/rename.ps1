# Define the directory where your files are located
$directory = "C:\Users\Joaquin Del Rio\Documents\Carpetas\Programacion\FierroAppJS\dist\Imagenes"

# List of new names for files (must match the number of files in the directory)
$newNames = @(
    "chest-dips.jpg",
    "background.jpg",
    "concentrated-bicep.jpg",
    "barbell-biceps.jpg",
    "cable-biceps.jpg",
    "inclined-biceps.jpeg",
    "dumbbell-biceps.jpg",
    "hammer-biceps.jpg",
    "scott-biceps.jpg",
    "calf-raises.jpg",
    "cbum.jpg",
    "chin-ups.jpg",
    "pulley-cross.jpg",
    "wrist-curl-inverted.jpg",
    "open-pull-up.jpeg",
    "closed-pull-up.jpg",
    "eddie-happy.gif",
    "back.jpg",
    "back.jpeg",
    "face-pulls.jpg",
    "foundation-form.jpg",
    "foundation.avif",
    "strength.png",
    "strength.svg",
    "full-body-1.avif",
    "full-body-1.jpg",
    "full-body-2.jpg",
    "full-body-3.jpg",
    "goggins.png",
    "good-mornings.jpg",
    "gym.webp",
    "hip-thrust.jpg",
    "hyperextensions.jpg",
    "shoulders.jpg",
    "junior.webp",
    "leg-extensions.jpg",
    "leg-press.jpg",
    "leg.jpg",
    "butterfly.jpg",
    "wrist-curl.jpg",
    "wrist-rotation.jpg",
    "chest-icon.png",
    "chest-machine.jpg",
    "chest.jpg",
    "deadlift.jpg",
    "arnold-press.jpeg",
    "bench-press.gif",
    "bench-press.jpg",
    "bench-press.webp",
    "declined-press.jpg",
    "french-press.jpeg",
    "inclined-press.jpeg",
    "dumbbell-press.jpg",
    "military-press.jpg",
    "pull.jpg",
    "pulldown-chest.jpg",
    "pullover.jpg",
    "barbell-row.jpg",
    "cable-row.jpg",
    "dumbbell-row.jpg",
    "chin-row.jpg",
    "bulgarian-squat.jpeg",
    "squat.jpeg",
    "single-arm-cable-row-swolverine-800x.webp",
    "streak.png",
    "strongman.png",
    "blue-check.png",
    "green-check.png",
    "check.svg",
    "tricep-dips.jpg",
    "french-tricep.jpeg",
    "tricep-kickback.jpg",
    "tricep-pulley.jpg",
    "tricep-press.jpg",
    "tricep-rope.jpg",
    "upload.svg",
    "lateral-fly.jpg",
    "rear-fly.jpeg",
    "weightlifting.gif",
    "lunges.jpg"
)

# Get all files in the directory
$files = Get-ChildItem -Path $directory

# Check if the number of new names matches the number of files


# Rename each file with corresponding new name
for ($i = 0; $i -lt $files.Count; $i++) {
    $oldPath = $files[$i].FullName
    $newPath = Join-Path -Path $directory -ChildPath $newNames[$i]
    Rename-Item -Path $oldPath -NewName $newPath -Force
    Write-Host "Renamed $($files[$i].Name) to $($newNames[$i])"
}