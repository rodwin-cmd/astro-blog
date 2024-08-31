import rss from '@astrojs/rss';


import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
const blogPosts = await getCollection('blog');

const parser = new MarkdownIt();

export const GET: APIRoute = ({ params, request, site }) => {
  
        

    return rss({
        // stylesheet:'/styles/rss.xsl',
        // `<title>` field in output xml
        title: 'Rodwin Blog',
        // `<description>` field in output xml
        description: 'Mi blog con Astro',


        xmlns: {
            media: 'http://search.yahoo.com/mrss/',
          },
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#contextsite
        site: site ?? '',
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: blogPosts.map(({data, slug, body}) =>({
            title: data.title,
            pubDate:data.date,
            description:data.description,
            link:`posts/${slug}`,

            content: sanitizeHtml(parser.render(body), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
              }),
              
              customData: `<media:content
                  type="image/${data.image.format === 'jpg' ? 'jpeg' : 'png'}"
                  width="${data.image.width}"
                  height="${data.image.height}"
                  medium="image"
                  url="${site + data.image.src}" />
              `,
        })),
        // (optional) inject custom xml
        customData: `<language>es-es</language>`,
      });


}