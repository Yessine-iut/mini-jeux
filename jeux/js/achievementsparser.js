
function updateAchievements(achievements, idjeu, diff) {
    for (let i = 0; i < achievements.achievements.length; i++)
    updateAchievement(achievements.achievements[i], idjeu, diff);
}
function updateAchievement(achievement, idjeu, hard) {

    if (achievement.jeux[idjeu]) {
        if (!achievement.ishard)
            achievement.compteurvictoire++;
        else if (achievement.ishard && hard)
            achievement.compteurvictoire++;
    }
    if (achievement.compteurvictoire >= achievement.objectif)
        achievement.iscomplete = true;
}

function updateScores(achievements, idjeu, score) {
    if (achievements.scores[idjeu] < score)
        achievements.scores[idjeu] = score;
}
