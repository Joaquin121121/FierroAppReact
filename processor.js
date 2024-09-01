const obj = {
  chestExercises: [
    {
      name: "benchPress",
      image: "bench-press.webp",
      targetedMuscles: ["chest", "triceps"],
    },
    {
      name: "inclineBenchPress",
      image: "incline-press.webp",
      targetedMuscles: ["chest", "triceps"],
    },
    {
      name: "chestDips",
      image: "chest-dips.png",
      targetedMuscles: ["chest", "triceps", "shoulders"],
    },
    {
      name: "declineBenchPress",
      image: "decline-bench-press.jpg",
      targetedMuscles: ["chest", "triceps"],
    },
    {
      name: "dumbbellFlyes",
      image: "dumbbell-fly.webp",
      targetedMuscles: ["chest", "shoulders"],
    },
    {
      name: "cableCrossovers",
      image: "pulley-crossover.jpg",
      targetedMuscles: ["chest"],
    },
    {
      name: "dumbbellBenchPress",
      image: "dumbbell-press.webp",
      targetedMuscles: ["chest", "triceps"],
    },
    {
      name: "pullOver",
      image: "pullover.jpg",
      targetedMuscles: ["chest", "lats"],
    },
  ],
  backExercises: [
    {
      name: "widePullUp",
      image: "pull-ups.webp",
      targetedMuscles: ["lats", "biceps"],
    },
    {
      name: "closePullUp",
      image: "chin-ups.jpg",
      targetedMuscles: ["lats", "biceps"],
    },
    {
      name: "barbellRow",
      image: "barbell-row.jpg",
      targetedMuscles: ["upperBack", "lats"],
    },
    {
      name: "dumbbellRow",
      image: "dumbbell-row.jpg",
      targetedMuscles: ["upperBack", "lats"],
    },
    {
      name: "deadlifts",
      image: "deadlifts.webp",
      targetedMuscles: ["lowerBack", "glutes", "hamstrings"],
    },
    {
      name: "pulldownsToChest",
      image: "chest-pulldown.jpg",
      targetedMuscles: ["lats", "biceps"],
    },
    {
      name: "cableRow",
      image: "single-arm-cable-row.jpg",
      targetedMuscles: ["upperBack", "lats"],
    },
    {
      name: "hyperextensions",
      image: "hyperextensions.jpg",
      targetedMuscles: ["lowerBack", "glutes"],
    },
  ],
  bicepsExercises: [
    {
      name: "barbellCurl",
      image: "barbell-biceps.jpg",
      targetedMuscles: ["biceps"],
    },
    {
      name: "dumbbellCurl",
      image: "dumbbell-biceps.jpg",
      targetedMuscles: ["biceps"],
    },
    {
      name: "cableCurl",
      image: "cable-biceps.webp",
      targetedMuscles: ["biceps"],
    },
    {
      name: "hammerCurl",
      image: "hammer-biceps.webp",
      targetedMuscles: ["biceps", "brachioradialis"],
    },
    {
      name: "concentrationCurl",
      image: "concentrated-bicep-curl.jpg",
      targetedMuscles: ["biceps"],
    },
    {
      name: "inclineDumbbellCurl",
      image: "incline-biceps.png",
      targetedMuscles: ["biceps"],
    },
    {
      name: "preacherCurl",
      image: "scott-biceps.jpeg",
      targetedMuscles: ["biceps"],
    },
    {
      name: "chinUps",
      image: "chin-ups.jpeg",
      targetedMuscles: ["biceps", "lats"],
    },
  ],
  tricepsExercises: [
    {
      name: "frenchPress",
      image: "french-press.avif",
      targetedMuscles: ["triceps"],
    },
    {
      name: "tricepsPushdown",
      image: "tricep-pulley.webp",
      targetedMuscles: ["triceps"],
    },
    {
      name: "ropeTricepExtension",
      image: "tricep-rope.avif",
      targetedMuscles: ["triceps"],
    },
    {
      name: "tricepDips",
      image: "tricep-dips.webp",
      targetedMuscles: ["triceps", "chest"],
    },
    {
      name: "tricepKickback",
      image: "tricep-kickback.png",
      targetedMuscles: ["triceps"],
    },
  ],
  legExercises: [
    {
      name: "squats",
      image: "squat.jpg",
      targetedMuscles: ["quadriceps", "glutes", "hamstrings"],
    },
    {
      name: "deadlift",
      image: "deadlifts.webp",
      targetedMuscles: ["hamstrings", "lowerBack", "glutes"],
    },
    {
      name: "lunges",
      image: "lunges.jpg",
      targetedMuscles: ["quadriceps", "glutes"],
    },
    {
      name: "legExtensions",
      image: "leg-extensions.webp",
      targetedMuscles: ["quadriceps"],
    },
    {
      name: "lyingLegCurls",
      image: "hamstring-curls.webp",
      targetedMuscles: ["hamstrings", "glutes"],
    },
    {
      name: "standingCalfRaises",
      image: "calf-raises.jpg",
      targetedMuscles: ["calves"],
    },
    {
      name: "legPress",
      image: "leg-press.webp",
      targetedMuscles: ["quadriceps", "glutes"],
    },
    {
      name: "hackSquat",
      image: "hack-squat.webp",
      targetedMuscles: ["quadriceps", "glutes"],
    },
    {
      name: "seatedCalfRaises",
      image: "seated-calf-raises.jpeg",
      targetedMuscles: ["calves"],
    },
  ],
  shoulderExercises: [
    {
      name: "militaryPress",
      image: "military-press.jpg",
      targetedMuscles: ["shoulders", "triceps"],
    },
    {
      name: "lateralRaises",
      image: "lateral-raises.jpg",
      targetedMuscles: ["shoulders"],
    },
    {
      name: "rearDeltFly",
      image: "rear-raises.jpg",
      targetedMuscles: ["shoulders", "upperBack"],
    },
    {
      name: "arnoldPress",
      image: "arnold-press.jpg",
      targetedMuscles: ["shoulders", "triceps"],
    },
    {
      name: "facePulls",
      image: "face-pulls.jpg",
      targetedMuscles: ["shoulders", "upperBack"],
    },
    {
      name: "uprightRows",
      image: "chin-rows.jpg",
      targetedMuscles: ["shoulders", "trapezius"],
    },
  ],
  forearmExercises: [
    {
      name: "wristCurlDumbbells",
      image: "wrist-curls.jpg",
      targetedMuscles: ["forearms"],
    },
    {
      name: "reverseWristCurlDumbbells",
      image: "reverse-wrist-curl.jpg",
      targetedMuscles: ["forearms"],
    },
    {
      name: "wristRotationsDumbbells",
      image: "wrist-rotation.webp",
      targetedMuscles: ["forearms"],
    },
  ],
}
const uniques = []

Object.keys(obj).forEach((key) => {
  obj[key].forEach((e) => {
    const mainGroup = e.targetedMuscles[0]
    let found = false
    obj[key].forEach((otherExercise) => {
      if (found) {
        return
      }
      found =
        otherExercise !== e && otherExercise.targetedMuscles[0] === mainGroup
    })
    if (!found) {
      uniques.push(e)
    }
  })
})

console.log(uniques)
