const createPlan = (sessions, duration, goal) => {

    const chestExercises = [
        { name: "benchPress", image: "bench-press.webp", targetedMuscles: ["chest", "triceps"] },
        { name: "inclineBenchPress", image: "incline-press.webp", targetedMuscles: ["chest", "triceps"] },
        { name: "chestDips", image: "chest-dips.webp", targetedMuscles: ["chest", "triceps", "shoulders"] },
        { name: "declineBenchPress", image: "declined-press.webp", targetedMuscles: ["chest", "triceps"] },
        { name: "dumbbellFlyes", image: "butterfly.jpeg", targetedMuscles: ["chest", "shoulders"] },
        { name: "cableCrossovers", image: "pulley-crossover.jpg", targetedMuscles: ["chest"] },
        { name: "dumbbellBenchPress", image: "dumbbell-press.jpeg", targetedMuscles: ["chest", "triceps"] },
        { name: "pullOver", image: "pullover.jpg", targetedMuscles: ["chest", "lats"] }
    ]
    
    const backExercises = [
        { name: "widePullUp", image: "pull-ups.webp", targetedMuscles: ["lats", "biceps"] },
        { name: "closePullUp", image: "chin-ups.jpg", targetedMuscles: ["lats", "biceps"] },
        { name: "barbellRow", image: "barbell-row.jpg", targetedMuscles: ["upperBack", "lats"] },
        { name: "dumbbellRow", image: "dumbbel-row.jpeg", targetedMuscles: ["upperBack", "lats"] },
        { name: "deadlift", image: "deadlift.jpeg", targetedMuscles: ["lowerBack", "glutes", "hamstrings"] },
        { name: "pulldownsToChest", image: "chest-pulldown.jpg", targetedMuscles: ["lats", "biceps"] },
        { name: "cableRow", image: "single-arm-cable-row.jpg", targetedMuscles: ["upperBack", "lats"] },
        { name: "hyperextensions", image: "hyperextensions.jpg", targetedMuscles: ["lowerBack", "glutes"] }
    ]
    
    const bicepsExercises = [
        { name: "barbellCurl", image: "barbell-biceps.jpg", targetedMuscles: ["biceps"] },
        { name: "dumbbellCurl", image: "dumbbell-biceps.jpg", targetedMuscles: ["biceps"] },
        { name: "cableCurl", image: "cable-biceps.webp", targetedMuscles: ["biceps"] },
        { name: "hammerCurl", image: "hammer-biceps.webp", targetedMuscles: ["biceps", "brachioradialis"] },
        { name: "concentrationCurl", image: "concentrated-bicep-curl.jpg", targetedMuscles: ["biceps"] },
        { name: "inclineDumbbellCurl", image: "incline-biceps.png", targetedMuscles: ["biceps"] },
        { name: "preacherCurl", image: "scott-biceps.jpeg", targetedMuscles: ["biceps"] },
        { name: "chinUps", image: "chin-row.jpeg", targetedMuscles: ["biceps", "lats"] }
    ]
    
    const tricepsExercises = [
        { name: "frenchPress", image: "french-press.avif", targetedMuscles: ["triceps"] },
        { name: "tricepsPushdown", image: "tricep-pulley.webp", targetedMuscles: ["triceps"] },
        { name: "ropeTricepExtension", image: "tricep-rope.jpeg", targetedMuscles: ["triceps"] },
        { name: "tricepDips", image: "tricep-dips.jpeg", targetedMuscles: ["triceps", "chest"] },
        { name: "tricepKickback", image: "tricep-kickback.png", targetedMuscles: ["triceps"] },
        { name: "dumbbellTricepPress", image: "tricep-pushdown.jpg", targetedMuscles: ["triceps"] }
    ]
    
    const legExercises = [
        { name: "squats", image: "squat.jpeg", targetedMuscles: ["quadriceps", "glutes", "hamstrings"] },
        { name: "deadlift", image: "deadlift.jpeg", targetedMuscles: ["lowerBack", "glutes", "hamstrings"] },
        { name: "lunges", image: "lunges.jpg", targetedMuscles: ["quadriceps", "glutes"] },
        { name: "legExtensions", image: "leg-extensions.jpeg", targetedMuscles: ["quadriceps"] },
        { name: "lyingLegCurls", image: "reverse-wrist-curl.jpg", targetedMuscles: ["hamstrings", "glutes"] },
        { name: "standingCalfRaises", image: "calf-raises.jpg", targetedMuscles: ["calves"] },
        { name: "legPress", image: "leg-press.jpeg", targetedMuscles: ["quadriceps", "glutes"] },
        { name: "hackSquat", image: "hack-squat.jpeg", targetedMuscles: ["quadriceps", "glutes"] }
    ]
    
    const shoulderExercises = [
        { name: "militaryPress", image: "military-press.jpeg", targetedMuscles: ["shoulders", "triceps"] },
        { name: "lateralRaises", image: "lateral-raises.jpg", targetedMuscles: ["shoulders"] },
        { name: "rearDeltFly", image: "rear-raises.jpeg", targetedMuscles: ["shoulders", "upperBack"] },
        { name: "arnoldPress", image: "arnold-press.jpeg", targetedMuscles: ["shoulders", "triceps"] },
        { name: "facePulls", image: "face-pulls.jpg", targetedMuscles: ["shoulders", "upperBack"] },
        { name: "uprightRows", image: "wrist-rotation.webp", targetedMuscles: ["shoulders", "trapezius"] }
    ]
    
    const forearmExercises = [
        { name: "wristCurlDumbbells", image: "wrist-curls.jpg", targetedMuscles: ["forearms"] },
        { name: "reverseWristCurlDumbbells", image: "reverse-wrist-curl.jpg", targetedMuscles: ["forearms"] },
        { name: "wristRotationsDumbbells", image: "wrist-rotation.webp", targetedMuscles: ["forearms"] }
    ]
    
    
    
    
    
    const primaryList = ["legs", "back", "chest"]
    const weeklySets = Math.floor((duration - 15) / 2 * sessions)
    const forearms = (weeklySets > 84)
    let exercisesPartialTotal = forearms ? 22 : 21
    let primary = Math.floor(weeklySets / exercisesPartialTotal) * 4
    let secondary = Math.floor(weeklySets / exercisesPartialTotal) * 3
    let tertiary = (forearms) ? Math.floor(weeklySets / exercisesPartialTotal) : null
    let remainder = weeklySets % exercisesPartialTotal
    let fixedRemainder = remainder
    if(!forearms && remainder >= 15){
        primary += 3
        secondary += 2
        remainder = remainder % 15
        fixedRemainder = remainder
    }
    const planSets = {
        legs : primary,
        back : primary,
        chest : primary,
        shoulders : secondary,
        biceps : secondary,
        triceps : secondary,
        forearms : (forearms) ? tertiary : 0
    }
    while(remainder > 0){
        let i = (fixedRemainder - remainder) % 3
        let attribute = primaryList[i]
        planSets[attribute]++
        remainder-- 
    }
    const plan = {}
    plan.sessions = sessions
    plan.duration = duration
    plan.goal = goal
    

    if(sessions <= 3){
        plan["name"] = "Full Body Split"
        for(let i = 0; i < sessions; i++){
            plan[`session ${i + 1}`] = {}
            plan[`session ${i + 1}`].chest = Math.floor(planSets.chest / sessions) 
            plan[`session ${i + 1}`].back = Math.floor(planSets.back / sessions)
            plan[`session ${i + 1}`].legs = Math.floor(planSets.legs / sessions)
            plan[`session ${i + 1}`].shoulders = Math.floor(planSets.shoulders / sessions)
            plan[`session ${i + 1}`].biceps = Math.floor(planSets.biceps / sessions)
            plan[`session ${i + 1}`].triceps = Math.floor(planSets.triceps / sessions)
            if(forearms){
                plan[`session ${i + 1}`].forearms = Math.floor(planSets.forearms / sessions)
        }}
        plan["session 1"].chest += planSets.chest % sessions
        plan["session 1"].back += planSets.back % sessions
        plan["session 1"].legs += planSets.legs % sessions
        plan["session 2"].shoulders += planSets.shoulders % sessions
        plan["session 2"].biceps += planSets.biceps % sessions
        plan["session 2"].triceps += planSets.triceps % sessions
        if(forearms){
            plan["session 2"].forearms += planSets.forearms % sessions
        }
        for(let i = 0; i < sessions; i++){
            plan[`session ${i + 1}`].nExercises = plan[`session ${i + 1}`].chest + plan[`session ${i + 1}`].back +  plan[`session ${i + 1}`].legs  +plan[`session ${i + 1}`].shoulders + plan[`session ${i + 1}`].biceps + plan[`session ${i + 1}`].triceps
            plan[`session ${i + 1}`].nExercises += (plan[`session ${i + 1}`].forearms) ? plan[`session ${i + 1}`].forearms : 0
        }
        
    }else{
        plan["name"] = "Push Pull Legs Split"
        if(sessions === 4){
            plan["session 1"] = {}
            plan["session 1"].name = "Push Day"
            plan["session 1"].chest = Math.floor(planSets.chest * 2 / 3) + (planSets.chest * 2) % 3
            plan["session 1"].triceps = Math.floor(planSets.triceps * 2 / 3) + (planSets.triceps *2) % 3
            plan["session 1"].shoulders = Math.floor(planSets.shoulders / 3)
            plan["session 1"].nExercises = plan["session 1"].shoulders + plan["session 1"].triceps + plan["session 1"].chest

            
            plan["session 2"] = {}
            plan["session 2"].name = "Pull Day"
            plan["session 2"].back = Math.floor(planSets.back * 2 / 3) + (planSets.chest * 2) % 3
            plan["session 2"].biceps = Math.floor(planSets.biceps * 2 / 3) + (planSets.triceps *2) % 3
            plan["session 2"].nExercises = plan["session 2"].back + plan["session 2"].biceps
            if(forearms){
                plan["session 2"].forearms = Math.floor(planSets.forearms / 3)
                plan["session 2"].nExercises += plan["session 2"].forearms
            }

            plan["session 3"] = {}
            plan["session 3"].name = "Leg Day"
            plan["session 3"].legs = planSets.legs
            plan["session 3"].shoulders = Math.floor(planSets.shoulders / 3) 
            plan["session 3"].nExercises = plan["session 3"].legs + plan["session 3"].shoulders
            if(forearms){
                plan["session 3"].forearms = Math.floor(planSets.forearms / 3) + (planSets.forearms * 2) % 3
                plan["session 3"].nExercises += plan["session 3"].forearms
            }
            
            plan["session 4"] = {}
            plan["session 4"].name = "Upper Day"
            plan["session 4"].chest = Math.floor(planSets.chest / 3)
            plan["session 4"].back = Math.floor(planSets.back / 3)
            plan["session 4"].triceps = Math.floor(planSets.triceps / 3)
            plan["session 4"].biceps = Math.floor(planSets.biceps / 3)
            plan["session 4"].shoulders = Math.floor(planSets.shoulders / 3) + planSets.shoulders % 3
            plan["session 4"].nExercises = plan["session 4"].chest + plan["session 4"].back + plan["session 4"].triceps + plan["session 4"].shoulders + plan["session 4"].biceps
        }
        else{
            plan["session 1"] = {}
            plan["session 1"].name = "Push Day"
            plan["session 1"].chest = Math.floor(planSets.chest * 2 / 3) + (planSets.chest * 2) % 3
            plan["session 1"].triceps = Math.floor(planSets.triceps * 2 / 3) + (planSets.triceps *2) % 3
            plan["session 1"].nExercises = plan["session 1"].triceps + plan["session 1"].chest

            
            plan["session 2"] = {}
            plan["session 2"].name = "Pull Day"
            plan["session 2"].back = Math.floor(planSets.back * 2 / 3) + (planSets.chest * 2) % 3
            plan["session 2"].biceps = Math.floor(planSets.biceps * 2 / 3) + (planSets.triceps *2) % 3
            plan["session 2"].nExercises = plan["session 2"].back + plan["session 2"].biceps

            plan["session 3"] = {}
            plan["session 3"].name = "Leg Day"
            plan["session 3"].legs = Math.floor(planSets.legs / 2) 
            plan["session 3"].shoulders = Math.floor(planSets.shoulders * 2 / 3) + (planSets.shoulders * 2) % 3 
            plan["session 3"].nExercises = plan["session 3"].legs + plan["session 3"].shoulders
            
            plan["session 4"] = {}
            plan["session 4"].name = "Upper Day"
            plan["session 4"].chest = Math.floor(planSets.chest / 3)
            plan["session 4"].back = Math.floor(planSets.back / 3)
            plan["session 4"].triceps = Math.floor(planSets.triceps / 3)
            plan["session 4"].biceps = Math.floor(planSets.biceps / 3)
            plan["session 4"].nExercises = plan["session 4"].chest + plan["session 4"].back + plan["session 4"].triceps + plan["session 4"].biceps

            plan["session 5"] = {}
            plan["session 5"].name = "Leg Day"
            plan["session 5"].legs = Math.floor(planSets.legs / 2) + planSets.legs % 2
            plan["session 5"].nExercises = plan["session 5"].legs 
            if(forearms){
                plan["session 5"].forearms = Math.floor(planSets.forearms * 2 / 3) + (planSets.forearms * 2) % 3
                plan["session 5"].nExercises += plan["session 5"].forearms
            }

        }
    }
    let chestPointer = 0, backPointer = 0, pointer_legs = 0, shouldersPointer = 0, tricepsPointer = 0, bicepsPointer = 0, forearmsPointer = 0
    for(let i = 0; i < sessions; i++){
        plan[`session ${i + 1}`].exerciseList = []
        if(plan[`session ${i + 1}`].chest){
            plan[`session ${i + 1}`].chestExercises = []
            for(let j = 0; j < plan[`session ${i + 1}`].chest; j+=3){
              plan[`session ${i + 1}`].chestExercises.push(chestExercises[(chestPointer % chestExercises.length)])
                chestPointer++
            }
            plan[`session ${i + 1}`].chestExercises = plan[`session ${i + 1}`].chestExercises.map((e, k) => {
                return (((k + 1) * 3) <= plan[`session ${i + 1}`].chest) ? {exercise : e, sets : 3, reps : 6} : {exercise : e, sets : (plan[`session ${i + 1}`].chest % 3), reps : 6}   
            })
            plan[`session ${i + 1}`].exerciseList.push(...plan[`session ${i + 1}`].chestExercises)

        }
        if(plan[`session ${i + 1}`].back){
            plan[`session ${i + 1}`].backExercises = []
            for(let j = 0; j < plan[`session ${i + 1}`].back; j+=3){
              plan[`session ${i + 1}`].backExercises.push(backExercises[(backPointer % backExercises.length)])    
              backPointer++
            }
            plan[`session ${i + 1}`].backExercises = plan[`session ${i + 1}`].backExercises.map((e, k) => {
                return (((k + 1) * 3) <= plan[`session ${i + 1}`].back) ? {exercise : e, sets : 3, reps : 6} : {exercise : e, sets : (plan[`session ${i + 1}`].back % 3), reps : 6}   
            })
            plan[`session ${i + 1}`].exerciseList.push(...plan[`session ${i + 1}`].backExercises)

        }
        if(plan[`session ${i + 1}`].legs){
            plan[`session ${i + 1}`].legsExercises = []
            for(let j = 0; j < plan[`session ${i + 1}`].legs; j+=3){
              plan[`session ${i + 1}`].legsExercises.push(legExercises[(pointer_legs % legExercises.length)])    
              pointer_legs++
            }
            plan[`session ${i + 1}`].legsExercises = plan[`session ${i + 1}`].legsExercises.map((e, k) => {
                return (((k + 1) * 3) <= plan[`session ${i + 1}`].legs) ? {exercise : e, sets : 3, reps : 6} : {exercise : e, sets : (plan[`session ${i + 1}`].legs % 3), reps : 6}   
            })
            plan[`session ${i + 1}`].exerciseList.push(...plan[`session ${i + 1}`].legsExercises)

        }
        if(plan[`session ${i + 1}`].shoulders){
            plan[`session ${i + 1}`].shouldersExercises = []
            for(let j = 0; j < plan[`session ${i + 1}`].shoulders; j+=3){
              plan[`session ${i + 1}`].shouldersExercises.push(shoulderExercises[(shouldersPointer % shoulderExercises.length)])    
              shouldersPointer++
            }
            plan[`session ${i + 1}`].shouldersExercises = plan[`session ${i + 1}`].shouldersExercises.map((e, k) => {
                return (((k + 1) * 3) <= plan[`session ${i + 1}`].shoulders) ? {exercise : e, sets : 3, reps : 6} : {exercise : e, sets : (plan[`session ${i + 1}`].shoulders % 3), reps : 6}   
            })
            plan[`session ${i + 1}`].exerciseList.push(...plan[`session ${i + 1}`].shouldersExercises)

        }
        if(plan[`session ${i + 1}`].biceps){
            plan[`session ${i + 1}`].bicepsExercises = []
            for(let j = 0; j < plan[`session ${i + 1}`].biceps; j+=3){
              plan[`session ${i + 1}`].bicepsExercises.push(bicepsExercises[(bicepsPointer % bicepsExercises.length)])
              bicepsPointer++    
            }
            plan[`session ${i + 1}`].bicepsExercises = plan[`session ${i + 1}`].bicepsExercises.map((e, k) => {
                return (((k + 1) * 3) <= plan[`session ${i + 1}`].biceps) ? {exercise : e, sets : 3, reps : 6} : {exercise : e, sets : (plan[`session ${i + 1}`].biceps % 3), reps : 6}   
            })
            plan[`session ${i + 1}`].exerciseList.push(...plan[`session ${i + 1}`].bicepsExercises)

            
            
        }
        if(plan[`session ${i + 1}`].triceps){
            plan[`session ${i + 1}`].tricepsExercises = []
            for(let j = 0; j < plan[`session ${i + 1}`].triceps; j+=3){
              plan[`session ${i + 1}`].tricepsExercises.push(tricepsExercises[(tricepsPointer % tricepsExercises.length)])    
              tricepsPointer++
            }
            plan[`session ${i + 1}`].tricepsExercises = plan[`session ${i + 1}`].tricepsExercises.map((e, k) => {
                return (((k + 1) * 3) <= plan[`session ${i + 1}`].triceps) ? {exercise : e, sets : 3, reps : 6} : {exercise : e, sets : (plan[`session ${i + 1}`].triceps % 3), reps : 6} 
                
            })
            plan[`session ${i + 1}`].exerciseList.push(...plan[`session ${i + 1}`].tricepsExercises)

        }
        if(plan[`session ${i + 1}`].forearms){
            plan[`session ${i + 1}`].forearmsExercises = []
            for(let j = 0; j < plan[`session ${i + 1}`].forearms; j+=3){
              plan[`session ${i + 1}`].forearmsExercises.push(forearmExercises[(forearmsPointer % forearmExercises.length)])   
              forearmsPointer++ 
            }
            plan[`session ${i + 1}`].forearmsExercises = plan[`session ${i + 1}`].forearmsExercises.map((e, k) => {
                return (((k + 1) * 3) <= plan[`session ${i + 1}`].forearms) ? {exercise : e, sets : 3, reps : 6} : {exercise : e, sets : (plan[`session ${i + 1}`].forearms % 3), reps : 6}   
            })
            plan[`session ${i + 1}`].exerciseList.push(...plan[`session ${i + 1}`].forearmsExercises)

            
        }
        plan[`session ${i + 1}`].exerciseList.sort((a, b) => b.sets - a.sets)
    }        
    return plan
}

export default createPlan