export const journalSchema = {
  name: "journalPost",
  title: "Dispatch",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "publishedAt", title: "Published", type: "datetime" },
    { name: "excerpt", title: "Excerpt", type: "text", rows: 2 },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    },
    {
      name: "season",
      title: "Season tag",
      type: "string",
      options: {
        list: [
          { title: "April (opening)", value: "april" },
          { title: "July (peak)", value: "july" },
          { title: "October (gold)", value: "october" },
          { title: "November (close)", value: "november" },
        ],
      },
    },
  ],
};
