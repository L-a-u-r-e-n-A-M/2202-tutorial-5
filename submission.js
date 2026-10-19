// VAR AND SCOPE

/**
 * This function takes an array of objects formatted like this
 * [{id: string, grade: number, daysLate: number}]
 * and returns an object detailing the average grade and id for the recent assignment formatted like this
 * {average: number, lastGraded: string}
**/
function summarizeGrades(assignments) {
    // not constant-> the sum is calculated later
    let sum = 0;

    // there is no way to add or remove an assignment so the count stays constant
    const count = assignments.length;

    //The late penalty is 20 percentage points per day,
    //not a percentage of the grade.
    const LATE_PENALTY_PER_DAY = 20;

    // this variable will be assigned a value in the for loop
    let assignment;

    for (let i = 0; i < count; i++) {
        assignment = assignments[i];
        // this is let and not const because the grade might be altered if there is a late penalty
        let grade = assignment.grade;

        if (assignment.daysLate > 0) {
            // this is const because there are no further changes to the late penalty
            const latePenalty = assignment.daysLate * LATE_PENALTY_PER_DAY;
            //The minimum grade allowed is 0.
            grade = grade - latePenalty >= 0 ? grade - latePenalty: 0;
        }
        sum += grade;
    }

    // this is const because lastGraded will not change until the function is called again
    const lastGraded = assignment;
    return { average: sum/count, lastGraded: lastGraded.id };
}

// CLOSURES

/**
 letterCounter should return a function that takes a word and counts occurrences
 of a particular letter. Capitalization should be ignored only if the ignoreCapitalization
 parameter is True.  For example:

 letterCounter('a', false)

 should return a function that takes a word and returns the number of occurences of
 lowercase 'a' (but not uppercase 'A').

 letter is guaranteed to be a single letter.
 **/
let letterCounter = function (letter, ignoreCapitalization) {

    let counter = function(word){
        let target = letter

        if (ignoreCapitalization){
            word = word.toLowerCase()
            target = target.toLowerCase()
        }

        return word.split(target).length - 1
    }

    return counter
}

/**
 Closures are one way of protecting data associated with objects.
 (We will see another way later.) If a variable should only be accessible
 by the object's methods, this can be accomplished by declaring the variable
 such that it's in the closure for the method.

 makeCharacter will take a character name, and return an object
 that includes the names as well as functions that modify two skill.
 The skills themselves will *not* be properties, or they would be able
 to be modified without using a method!

 The character returned from makeCharacter should have both skill levels
 start at 0.

 The object that makeCharacter should return is included. Fill in
 property values as necessary, but don't change the property names.
 **/
function makeCharacter(characterName){
    /**
     two variables farmingSkill and fishingSkill should be accessible
     to levelUp and showSkill through a closure. Declare them in a way
     that this will be achieved.
     **/
    let farmingSkill = 0
    let fishingSkill = 0

    /**
     If the skill is "farming", levelUp should increase farmingSkill by 1,
     up to a maximum of 10. If farming skill is already 10, do nothing.

     If the skill is "fishing", levelUp should increase fishingSkill by 1,
     up to a maximum of 10. If fishing skill is already 10, do nothing.

     Ignore any other input. Skill names should be lowercase and
     match exactly (i.e., "Farming" or "Fishing" should also be ignored).

     levelUp should not have a return statement.
     **/
    let levelUp = function (skill){
        if (skill === "farming" && farmingSkill < 10){
            farmingSkill++
        }
        if (skill === "fishing" && fishingSkill < 10){
            fishingSkill++
        }
    }

    /**
     If the skill is "farming", showSkill should return farmingSkill.

     If the skill is "fishing", showSkill should return fishingSkill.

     Otherwise, do not return anything.
     **/
    let showSkill = function (skill){
        if (skill === "farming"){
            return farmingSkill
        }
        if (skill === "fishing"){
            return fishingSkill
        }
    }

    return {
        name: characterName,
        levelUp,
        showSkill
    }
}