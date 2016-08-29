import fixtures from '../data/fixtures';
import matches from '../data/matches';

export default function fixtureGridFormatter(firstPlayerID, secondPlayerID) {
	if (firstPlayerID === secondPlayerID) {
		return 'X';
	}

	const homeFixture = fixtures.filter((fixture) => {
		return fixture.homePlayerID === firstPlayerID && fixture.awayPlayerID === secondPlayerID;
	});

	const awayFixture = fixtures.filter((fixture) => {
		return fixture.homePlayerID === secondPlayerID && fixture.awayPlayerID === firstPlayerID;
	});

	if (homeFixture.length === 1) {
		const match = matches.filter((match) => { return match.fixtureID === homeFixture[0].id });
		return match.length === 0 ? 'GW' + homeFixture[0].gameWeek : match[0].homeScore + ' - ' + match[0].awayScore;
	} else if (awayFixture.length === 1) {
		const match = matches.filter((match) => { return match.fixtureID === awayFixture[0].id });
		return match.length === 0 ? 'GW' + awayFixture[0].gameWeek : match[0].awayScore + ' - ' + match[0].homeScore;
	}

	return '';
}