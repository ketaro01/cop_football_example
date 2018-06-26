import request from "./request";

export default {
  search(text) {
    // futbol.date
    return request(`/search?q=${text}`);
  },
  competition(year) {
    return request(`/v1/competitions/?season=${year}`);
  },
  teams(id) {
    return request(`/v1/competitions/${id}/teams`);
  },
  league(id, matchday) {
    return request(
      `/v1/competitions/${id}/leagueTable?${
        !matchday ? "" : `matchday=${matchday}`
      }`
    );
  },
  fixture(timeFrame, league) {
    return request(
      `/v1/fixtures?${!timeFrame ? "" : `timeFrame=${timeFrame}&`}${
        !league ? "" : `league=${league}`
      }`
    );
  },
  fixture_one(id, head2head) {
    return request(
      `/v1/fixtures/${id}?${!head2head ? "" : `head2head=${head2head}`}`
    );
  },
  fixture_competition(id, timeFrame, matchday) {
    return request(
      `/v1/competitions/${id}/fixtures?${
        !timeFrame ? "" : `timeFrame=${timeFrame}&`
      }${!matchday ? "" : `matchday=${matchday}`}`
    );
  },
  fixture_team(season, timeFrame, venue) {
    return request(
      `/v1/teams/{id}/fixtures?${!season ? "" : `season=${season}&`}${
        !timeFrame ? "" : `timeFrame=${timeFrame}&`
      }${!venue ? "" : `venue=${venue}`}`
    );
  },
  team(id) {
    return request(`/v1/teams/${id}`);
  },
  player(id) {
    return request(`/v1/teams/${id}/players`);
  },
  link(url) {
    const path = url.replace("http://api.football-data.org", "");
    return request(path);
  }
};
