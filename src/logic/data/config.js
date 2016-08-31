export const PrimaryLeagueSortOption = 'Pts';

export const SecondaryLeagueSortOption = 'Frames Difference';

export const PrimaryLeagueSortDirection = 'Asc';

export const NumberOfFramesInMatch = 6;

export const NumberOfFramesGivenForWalkover = 6;

export function FilterValidMatches(matches) {
    return matches.filter((match) => {
        const matchScore = match.homeScore + match.awayScore;
        return ['W0', '0W', NumberOfFramesInMatch].includes(matchScore);
    });
}

export function TotalPoints(played, won, drew, lost, pointsFor, pointsAgainst, bonus) {
    return 3 * won + drew + pointsFor + bonus;
}