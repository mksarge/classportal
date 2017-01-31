import React, { PropTypes } from 'react';
import { FormInput, FormIconField, Glyph, Button, InputGroup } from 'elemental';
import Module from '../../../components/Module';
import { disbandTeamRequest } from '../../../ajax';
import config from '../../../config';

function disbandTeam(id) {
  if (confirm('Please confirm that you want to disband the team.')) {
    disbandTeamRequest(id)
      .then(() => {
        alert('Team has been disbanded!');
        window.location.reload(true);
      })
      .catch(alert);
  }
}

function renderMembers(teammates) {
  return teammates.map((value, index) => (
    <TeamMember key={index} name={value} />));
}

const TeamMember = (props) => (
  <InputGroup.Section grow>
    <FormIconField iconPosition="left" iconKey="mortar-board">
      <FormInput placeholder={` ${props.name}`} size="sm" disabled />
    </FormIconField>
  </InputGroup.Section>);

const RepoButton = (props) => (props.url
  ? (<InputGroup.Section>
    <a href={props.url} target="blank" >
      <Button size="sm" ><Glyph icon="organization" />
        &nbsp; Repo
            </Button>
    </a>
  </InputGroup.Section>)
  : (<InputGroup.Section>
    <Button size="sm" onClick={() => alert('Team repository has not yet been set by the prof.')}>
      <Glyph icon="organization" />&nbsp; Repo
          </Button>
  </InputGroup.Section >));

const DisbandButton = (props) => (<InputGroup.Section>
  <Button size="sm" onClick={() => disbandTeam(props.id)}>
    <Glyph icon="tools" />&nbsp; Disband
  </Button>
</InputGroup.Section >);

const DisplayTeam = (props) => (
  <Module title={`Team ${props.myTeamFile.id}`} initialHideContent={false}>
    <div>
      <InputGroup >
        {renderMembers(props.myTeamFile.members)}
        {config.studentsCanDisbandTeams && (<DisbandButton id={props.myTeamFile.id} />)}
        <RepoButton url={props.myTeamFile.url} />
      </InputGroup>
    </div>
  </Module>
);

TeamMember.propTypes = {
  name: PropTypes.string,
};

RepoButton.propTypes = {
  url: PropTypes.string,
};

DisbandButton.propTypes = {
  id: PropTypes.number,
};

DisplayTeam.propTypes = {
  myTeamFile: PropTypes.any, // eslint-disable-line
};

export default DisplayTeam;
