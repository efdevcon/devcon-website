import { ArchiveVideo, mapToArchiveVideo } from "src/types/ArchiveVideo"

const getRandomSubset = (arr: any[], n: number) => {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export const videoResolver = {
  type: '[ArchiveVideo]',
  resolve: (source: any, args: any, context: any) => {
    const videos = source['videos']
    if (!videos) return []

    const filter: any = {
      fields: {
        collection: {
          eq: 'videos',
        },
        path: {
          in: videos,
        },
      },
    }

    return context.nodeModel
      .runQuery({
        query: {
          filter,
        },
        type: 'MarkdownRemark',
      })
      .then((videos: any) => {
        return videos.map((source: any) => {
          return {
            id: source.id,
            slug: source.fields.slug,
            edition: source.frontmatter.edition,
            title: source.frontmatter.title,
            description: source.frontmatter.description,
            youtubeUrl: source.frontmatter.youtubeUrl,
            ipfsHash: source.frontmatter.ipfsHash,
            duration: source.frontmatter.duration,
            expertise: source.frontmatter.expertise,
            type: source.frontmatter.type,
            track: source.frontmatter.track,
            tags: source.frontmatter.tags,
            speakers: source.frontmatter.speakers,
            profiles: source.frontmatter.profiles
          } as ArchiveVideo
        })
      })
  },
  args: {},
}

export const relatedVideosResolver = {
  type: '[ArchiveVideo]',
  resolve: (source: any, args: any, context: any) => {
    const filter: any = {
      fields: {
        collection: {
          eq: 'videos',
        },
      },
      frontmatter: {
        tags: {
          in: source.tags,
        },
      }
    }

    return context.nodeModel
      .runQuery({
        query: {
          filter,
        },
        type: 'MarkdownRemark',
      })
      .then((videos: any) => {
        const subset = getRandomSubset(videos, Math.min(videos.length, 10));

        return subset.map((source: any) => {
          return {
            id: source.id,
            slug: source.fields.slug,
            edition: source.frontmatter.edition,
            title: source.frontmatter.title,
            description: source.frontmatter.description,
            youtubeUrl: source.frontmatter.youtubeUrl,
            ipfsHash: source.frontmatter.ipfsHash,
            duration: source.frontmatter.duration,
            expertise: source.frontmatter.expertise,
            type: source.frontmatter.type,
            track: source.frontmatter.track,
            tags: source.frontmatter.tags,
            speakers: source.frontmatter.speakers,
            profiles: source.frontmatter.profiles
          } as ArchiveVideo
        })
      })
  },
  args: {},
}

export const distinctVideoTagsResolver = {
  type: '[String]',
  resolve: (source: any, args: any, context: any) => {
    const filter: any = {
      fields: {
        collection: {
          eq: 'videos',
        }
      },
    }

    return context.nodeModel
      .runQuery({
        query: {
          filter,
        },
        type: 'MarkdownRemark',
      })
      .then((videos: any) => {
        const tags = {} as { [key: string]: boolean }

        videos.forEach((video: any) => {
          if (!video.frontmatter.tags) return;

          video.frontmatter.tags.forEach((tag: any) => {
            if (tags[tag.trim()]) return;

            tags[tag.trim()] = true;
          });
        });

        return Object.keys(tags).sort()
      })
  },
  args: {},
}