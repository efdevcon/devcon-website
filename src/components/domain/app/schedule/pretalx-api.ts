const host = "https://pretalx.com/api";
const event = "democon";
// const event = 'devcon-test-2020'
// const host = "https://speak.devcon.org/api";

const get = (slug: string) =>
   fetch(`${host}${slug}`, {
      // headers: {
      //   Authorization: "Token 313f17b453e1b0f8279d56b9e86841e1425ddf6a",
      // },
    })
    .then((response: any) => response.json());

const span = 25;
const exhaustResource = (slug: string, limit = span, offset = 0, results = []): any => {
  return get(`${slug}?limit=${limit}&offset=${offset}`).then((data: any) => {
    results.push(data.results);

    if (data.next) {
      return exhaustResource(slug, limit + span, offset + span, results);
    } else {
      return results.flat();
    }
  });
};

export const getEvent = () => get(`/events/${event}`);
export const getTalks = () => {
  return exhaustResource(`/events/${event}/talks`);
};
export const getSpeakers = () => {
  return exhaustResource(`/events/${event}/speakers`);
};