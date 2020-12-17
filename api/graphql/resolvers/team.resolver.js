import { combineResolvers } from 'graphql-resolvers';
import { getAllTeams, findTeamById, createTeam, inviteTeamMember } from '~/services/teams/teams.service';
import { isAuthenticated } from './authorization.resolver';

const resolvers = {
  Query: {
    teams: combineResolvers(
      isAuthenticated,
      (_, arg, { user }) => getAllTeams(user),
    ),
    getTeamById: combineResolvers(
      isAuthenticated,
      (_, { teamId }, { user }) => findTeamById(user, teamId),
    ),
  },
  Mutation: {
    createTeam: combineResolvers(
      isAuthenticated,
      (_, { name, alias }, { user }) => createTeam(user, name, alias),
    ),
    inviteMember: combineResolvers(
      isAuthenticated,
      (_, { email, teamId }, { user }) => inviteTeamMember(user, teamId, email),
    ),
  },
};

export default resolvers;
