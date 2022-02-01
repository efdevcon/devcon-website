/*
  The reason we aren't just creating graphql nodes for pretalx data is twofold:
    1) If pretalx content ever changes, we lose historical data (e.g. the archive needs the speakers to be available from past devcons)
    2) It provides consistency within the repo if all our content is markdown basesd (no magic external content)
*/

/*
  To think about:
    If we want to allow speakers to override their data (that was the case for archive?), that data could be overriden by the automatic collection of this script
    Speakers speaking at multiple devcons might have different pretalx generated IDs - how do we make a stable one (name is semi-unreliable too?)?
*/

// const host = "https://pretalx.com/api";
// const event = 'devcon-test-2020'
import { markdown, files } from '../utils';
import path from 'path';
import { Session } from '../../../src/types/session';
import { Speaker } from '../../../src/types/speaker';
import { Room } from '../../../src/types/room';
require('dotenv').config()
const eventName = "pwa-data";
const nodeFetch = require('node-fetch');
const host = "https://speak.devcon.org/api";

const get = (slug: string) =>
   nodeFetch(`${host}${slug}`, {
      headers: {
        Authorization: `Token ${process.env.PRETALX_API_KEY}`,
      },
    })
    .then((response: any) => response.json());

const span = 25;
const exhaustResource = (slug: string, limit = span, offset = 0, results = [] as any): any => {
  return get(`${slug}?limit=${limit}&offset=${offset}`).then((data: any) => {
    results.push(data.results);

    if (data.next) {
      return exhaustResource(slug, limit + span, offset + span, results);
    } else {
      return results.flat();
    }
  });
};

const formatter = (() => {
  const formatters = {
    sessions: (sessions: any): Session[] => {
      return sessions.map((session: any) => {
        return {
          id: session.code,
          speakers: session.speakers ? session.speakers.map((speaker: any) => speaker.code) : [],
          title: session.title,
          track: session?.track?.en || '', 
          duration: session.duration,
          start: session.slot.start, 
          end: session.slot.end, 
          room: session.slot.room.en,
          description: session.description,
          abstract: session.abstract,
          image: session.image,
          tags: session.tags
        }
      });
    },
    rooms: (rooms: any): Room[] => {
      return rooms.map((room: any) => {
        return {
          id: room.id,
          name: room?.name?.en || '',
          description: room?.description?.en || ''
        }
      });
    },
    speakers: (speakers: any): Speaker[] => {
      return speakers.map((speaker: any) => {
        console.log(speaker, 'speaker')
        return {
          id: speaker.code,
          name: speaker.name,
          description: speaker.biography,
          // submissions: speaker.submissions // Probably better to derive from list of all sessions for historical reasons
          // tracks: speaker.tracks // 
        }
        /*
          name: string,
          role?: string,
          company?: string
          avatar?: string
          description?: string
          tracks?: string[]
        */
      });
    }
  }

  return formatters;
})();

const api = (() => {
  const getEvent = () => get(`/events/${eventName}`);
  const getTalks = () => {
    return exhaustResource(`/events/${eventName}/talks`);
  };
  const getRooms = () => {
    return exhaustResource(`/events/${eventName}/rooms`);
  };
  const getSpeakers = () => {
    return exhaustResource(`/events/${eventName}/speakers`);
  };

  return {
    getEvent,
    getTalks,
    getRooms,
    getSpeakers
  }
})();

api.getTalks().then((talks: any) => console.log(talks[0].speakers[0]));
api.getSpeakers().then(console.log)

const eventDirectory = path.resolve(__dirname, '../../../src/content/event');
const speakerDirectory = path.resolve(eventDirectory, 'speakers');
const sessionDirectory = path.resolve(eventDirectory, 'sessions');
const roomDirectory = path.resolve(eventDirectory, 'rooms');

files.ensureDirectory(eventDirectory);
files.ensureDirectory(speakerDirectory);
files.ensureDirectory(sessionDirectory);
files.ensureDirectory(roomDirectory);

api.getEvent().then(console.log, 'console log event');

api.getSpeakers()
  .then(formatter.speakers)
  .then(markdown.write(speakerDirectory, speaker => `${speaker.id}.md`))

api.getTalks()
  .then(formatter.sessions)
  .then((sessions: any) => {
    console.log(sessions)

    return sessions;
  })
  .then(markdown.write(sessionDirectory, session => `${session.id}.md`))

api.getRooms()
  .then(formatter.rooms)
  .then(markdown.write(roomDirectory, room => `${room.id}.md`))

  // TO-DO: Schedule update plugin https://docs.pretalx.org/developer/plugins/general.html#pretalx.schedule.signals.schedule_release