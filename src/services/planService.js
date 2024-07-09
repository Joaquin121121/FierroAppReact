const createPlan = (sessions, duration, goal) => {

    const chestExercises = [
        { name: { spanish: "Press de Banca", english: "Bench Press" }, imagen: "PRESS-BANCA.jpg", targetedMuscles: { spanish: "Pecho, Tríceps", english: "Chest, Triceps" } },
        { name: { spanish: "Press de Banca Inclinado", english: "Incline Bench Press" }, imagen: "PRESS-INCLINADO.jpeg", targetedMuscles: { spanish: "Pecho, Tríceps", english: "Chest, Triceps" } },
        { name: { spanish: "Fondos de Pecho", english: "Chest Dips" }, imagen: "CHEST-DIPS.jpg", targetedMuscles: { spanish: "Pecho, Tríceps, Hombros", english: "Chest, Triceps, Shoulders" } },
        { name: { spanish: "Press de Banca Declinado", english: "Decline Bench Press" }, imagen: "PRESS-DECLINADO.jpg", targetedMuscles: { spanish: "Pecho, Tríceps", english: "Chest, Triceps" } },
        { name: { spanish: "Aperturas de Pecho con Mancuernas", english: "Dumbbell Flyes" }, imagen: "APERTURA-MANCUERNAS.jpg", targetedMuscles: { spanish: "Pecho, Hombros", english: "Chest, Shoulders" } },
        { name: { spanish: "Cruces de Poleas para Pecho", english: "Cable Crossovers" }, imagen: "CRUCE-POLEA.jpg", targetedMuscles: { spanish: "Pecho", english: "Chest" } },
        { name: { spanish: "Press de Banca con Mancuernas", english: "Dumbbell Bench Press" }, imagen: "PRESS-MANCUERNAS.jpg", targetedMuscles: { spanish: "Pecho, Tríceps", english: "Chest, Triceps" } },
        { name: { spanish: "Pull-over", english: "Pull-over" }, imagen: "PULLOVER.jpg", targetedMuscles: { spanish: "Pecho, Dorsales", english: "Chest, Lats" } }
    ]
    
    const backExercises = [
        { name: { spanish: "Dominada Abierta", english: "Wide Pull-up" }, imagen: "DOMINADA-ABIERTA.jpeg", targetedMuscles: { spanish: "Dorsales, Bíceps", english: "Lats, Biceps" } },
        { name: { spanish: "Dominada Cerrada", english: "Close Pull-up" }, imagen: "DOMINADA-CERRADA.jpg", targetedMuscles: { spanish: "Dorsales, Bíceps", english: "Lats, Biceps" } },
        { name: { spanish: "Remo con Barra", english: "Barbell Row" }, imagen: "REMO-BARRA.jpg", targetedMuscles: { spanish: "Espalda Alta, Dorsales", english: "Upper Back, Lats" } },
        { name: { spanish: "Remo con Mancuerna", english: "Dumbbell Row" }, imagen: "REMO-MANCUERNAS.jpg", targetedMuscles: { spanish: "Espalda Alta, Dorsales", english: "Upper Back, Lats" } },
        { name: { spanish: "Peso Muerto", english: "Deadlift" }, imagen: "PESO-MUERTO.jpg", targetedMuscles: { spanish: "Espalda Baja, Glúteos, Isquiotibiales", english: "Lower Back, Glutes, Hamstrings" } },
        { name: { spanish: "Pulldowns al Pecho", english: "Pulldowns to Chest" }, imagen: "PULLDOWN-PECHO.jpg", targetedMuscles: { spanish: "Dorsales, Bíceps", english: "Lats, Biceps" } },
        { name: { spanish: "Remo con Cable", english: "Cable Row" }, imagen: "REMO-CABLE.jpg", targetedMuscles: { spanish: "Espalda Alta, Dorsales", english: "Upper Back, Lats" } },
        { name: { spanish: "Hiperextensiones", english: "Hyperextensions" }, imagen: "HIPEREXTENSIONES.jpg", targetedMuscles: { spanish: "Espalda Baja, Glúteos", english: "Lower Back, Glutes" } }
    ]
    
    const bicepsExercises = [
        { name: { spanish: "Curl de Bíceps con Barra", english: "Barbell Curl" }, imagen: "BICEPS-BARRA.jpg", targetedMuscles: { spanish: "Bíceps", english: "Biceps" } },
        { name: { spanish: "Curl de Bíceps con Mancuernas", english: "Dumbbell Curl" }, imagen: "BICEPS-MANCUERNAS.jpg", targetedMuscles: { spanish: "Bíceps", english: "Biceps" } },
        { name: { spanish: "Curl de Bíceps con Cable", english: "Cable Curl" }, imagen: "BICEPS-CABLE.jpg", targetedMuscles: { spanish: "Bíceps", english: "Biceps" } },
        { name: { spanish: "Martillo de Bíceps", english: "Hammer Curl" }, imagen: "BICEPS-MARTILLO.jpg", targetedMuscles: { spanish: "Bíceps, Braquiorradial", english: "Biceps, Brachioradialis" } },
        { name: { spanish: "Curl de Concentración", english: "Concentration Curl" }, imagen: "BICEP-CONCENTRADO.jpg", targetedMuscles: { spanish: "Bíceps", english: "Biceps" } },
        { name: { spanish: "Curl de Bíceps Inclinado", english: "Incline Dumbbell Curl" }, imagen: "BICEPS-INCLINADO.jpeg", targetedMuscles: { spanish: "Bíceps", english: "Biceps" } },
        { name: { spanish: "Curl de Bíceps en Banco Scott", english: "Preacher Curl" }, imagen: "BICEPS-SCOTT.jpg", targetedMuscles: { spanish: "Bíceps", english: "Biceps" } },
        { name: { spanish: "Chin-ups (Dominadas Supinas)", english: "Chin-ups" }, imagen: "CHIN-UPS.jpg", targetedMuscles: { spanish: "Bíceps, Dorsales", english: "Biceps, Lats" } }
    ]
    
    const tricepsExercises = [
        { name: { spanish: "Press Francés", english: "French Press" }, imagen: "TRICEP-FRANCES.jpeg", targetedMuscles: { spanish: "Tríceps", english: "Triceps" } },
        { name: { spanish: "Extensiones de Tríceps en Polea Alta", english: "Triceps Pushdown" }, imagen: "TRICEP-POLEA.jpg", targetedMuscles: { spanish: "Tríceps", english: "Triceps" } },
        { name: { spanish: "Extensiones de Tríceps con Soga", english: "Rope Tricep Extension" }, imagen: "TRICEP-SOGA.jpg", targetedMuscles: { spanish: "Tríceps", english: "Triceps" } },
        { name: { spanish: "Fondos de Tríceps", english: "Tricep Dips" }, imagen: "TRICEP-DIPS.jpg", targetedMuscles: { spanish: "Tríceps, Pecho", english: "Triceps, Chest" } },
        { name: { spanish: "Patada de Tríceps", english: "Tricep Kickback" }, imagen: "TRICEP-PATADA.jpg", targetedMuscles: { spanish: "Tríceps", english: "Triceps" } },
        { name: { spanish: "Press de Tríceps con Mancuernas", english: "Dumbbell Tricep Press" }, imagen: "TRICEP-PRESS.jpg", targetedMuscles: { spanish: "Tríceps", english: "Triceps" } }
    ]
    
    const legExercises = [
        { name: { spanish: "Sentadillas (Squats)", english: "Squats" }, imagen: "SENTADILLA.jpeg", targetedMuscles: { spanish: "Cuádriceps, Glúteos, Isquiotibiales", english: "Quadriceps, Glutes, Hamstrings" } },
        { name: { spanish: "Peso Muerto", english: "Deadlift" }, imagen: "PESO-MUERTO.jpg", targetedMuscles: { spanish: "Espalda Baja, Glúteos, Isquiotibiales", english: "Lower Back, Glutes, Hamstrings" } },
        { name: { spanish: "Zancadas (Lunges)", english: "Lunges" }, imagen: "ZANCADAS.jpg", targetedMuscles: { spanish: "Cuádriceps, Glúteos", english: "Quadriceps, Glutes" } },
        { name: { spanish: "Extensiones de Pierna en Máquina", english: "Leg Extensions" }, imagen: "EXTENSIONES-PIERNA.jpg", targetedMuscles: { spanish: "Cuádriceps", english: "Quadriceps" } },
        { name: { spanish: "Curl de Piernas Acostado", english: "Lying Leg Curls" }, imagen: "CURL-PIERNA.jpg", targetedMuscles: { spanish: "Isquiotibiales, Glúteos", english: "Hamstrings, Glutes" } },
        { name: { spanish: "Elevación de Talones de Pie", english: "Standing Calf Raises" }, imagen: "ELEVACION-TALONES.jpg", targetedMuscles: { spanish: "Gemelos", english: "Calves" } },
        { name: { spanish: "Prensa de Piernas", english: "Leg Press" }, imagen: "PRENSA-PIERNA.jpg", targetedMuscles: { spanish: "Cuádriceps, Glúteos", english: "Quadriceps, Glutes" } },
        { name: { spanish: "Sentadilla Hack", english: "Hack Squat" }, imagen: "SENTADILLA-HACK.jpg", targetedMuscles: { spanish: "Cuádriceps, Glúteos", english: "Quadriceps, Glutes" } }
    ]

    const shoulderExercises = [
        { name: "Press Militar", imagen: "PRESS-MILITAR.jpg", targetedMuscles: { spanish: "Hombros, Tríceps", english: "Shoulders, Triceps" } },
        { name: "Vuelos Laterales", imagen: "VUELO-LATERAL.jpg", targetedMuscles: { spanish: "Hombros", english: "Shoulders" } },
        { name: "Vuelos Posteriores", imagen: "VUELO-POSTERIOR.jpeg", targetedMuscles: { spanish: "Hombros, Espalda Alta", english: "Shoulders, Upper Back" } },
        { name: "Press Arnold", imagen: "PRESS-ARNOLD.jpeg", targetedMuscles: { spanish: "Hombros, Tríceps", english: "Shoulders, Triceps" } },
        { name: "Jalones a la Cara (Face Pulls)", imagen: "FACE-PULLS.jpg", targetedMuscles: { spanish: "Hombros, Espalda Alta", english: "Shoulders, Upper Back" } },
        { name: "Remo al Mentón (Upright Rows)", imagen: "REMO-MENTON", targetedMuscles: { spanish: "Hombros, Trapecio", english: "Shoulders, Trapezius" } }
    ];
    

    const forearmExercises = [
        { name: "Curl de Muñeca con Mancuernas", imagen: "MUÑECA-CURL.jpg", targetedMuscles: { spanish: "Antebrazos", english: "Forearms" } },
        { name: "Curl de Muñeca Inverso con Mancuernas", imagen: "CURL-MUÑECA-INVERTIDO.jpg", targetedMuscles: { spanish: "Antebrazos", english: "Forearms" } },
        { name: "Rotaciones de Muñeca con Mancuernas", imagen: "MUÑECAS-ROTACION.jpg", targetedMuscles: { spanish: "Antebrazos", english: "Forearms" } }
    ];
    
    
    
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
                return (((k + 1) * 3) <= plan[`session ${i + 1}`].chest) ? {ejercicio : e, sets : 3, reps : 6} : {ejercicio : e, sets : (plan[`session ${i + 1}`].chest % 3), reps : 6}   
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
                return (((k + 1) * 3) <= plan[`session ${i + 1}`].back) ? {ejercicio : e, sets : 3, reps : 6} : {ejercicio : e, sets : (plan[`session ${i + 1}`].back % 3), reps : 6}   
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
                return (((k + 1) * 3) <= plan[`session ${i + 1}`].legs) ? {ejercicio : e, sets : 3, reps : 6} : {ejercicio : e, sets : (plan[`session ${i + 1}`].legs % 3), reps : 6}   
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
                return (((k + 1) * 3) <= plan[`session ${i + 1}`].shoulders) ? {ejercicio : e, sets : 3, reps : 6} : {ejercicio : e, sets : (plan[`session ${i + 1}`].shoulders % 3), reps : 6}   
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
                return (((k + 1) * 3) <= plan[`session ${i + 1}`].biceps) ? {ejercicio : e, sets : 3, reps : 6} : {ejercicio : e, sets : (plan[`session ${i + 1}`].biceps % 3), reps : 6}   
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
                return (((k + 1) * 3) <= plan[`session ${i + 1}`].triceps) ? {ejercicio : e, sets : 3, reps : 6} : {ejercicio : e, sets : (plan[`session ${i + 1}`].triceps % 3), reps : 6} 
                
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
                return (((k + 1) * 3) <= plan[`session ${i + 1}`].forearms) ? {ejercicio : e, sets : 3, reps : 6} : {ejercicio : e, sets : (plan[`session ${i + 1}`].forearms % 3), reps : 6}   
            })
            plan[`session ${i + 1}`].exerciseList.push(...plan[`session ${i + 1}`].forearmsExercises)

            
        }
        plan[`session ${i + 1}`].exerciseList.sort((a, b) => b.sets - a.sets)
    }        
    return plan
}

export default createPlan