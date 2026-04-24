// Sanity schema, imported by the Studio, not the Next app.
// Rule validation is loosely typed here; Studio supplies concrete Rule types at runtime.
export const holeSchema = {
  name: "hole",
  title: "Hole",
  type: "document",
  fields: [
    { name: "number", title: "Hole number", type: "number" },
    { name: "name", title: "Name", type: "string" },
    { name: "par", title: "Par", type: "number" },
    { name: "strokeIndex", title: "Stroke index", type: "number" },
    {
      name: "yardage",
      title: "Yardage by tee",
      type: "object",
      fields: [
        { name: "black", title: "Black (tips)", type: "number" },
        { name: "blue", title: "Blue", type: "number" },
        { name: "white", title: "White", type: "number" },
        { name: "red", title: "Red", type: "number" },
      ],
    },
    { name: "description", title: "Strategy paragraph", type: "text", rows: 4 },
    { name: "proTip", title: "Tip from Jeff", type: "text", rows: 2 },
    { name: "heroImage", title: "Commissioned hero image", type: "image", options: { hotspot: true } },
    { name: "flyoverYoutubeId", title: "YouTube flyover ID", type: "string" },
    { name: "svgMap", title: "Hole SVG map", type: "file" },
  ],
};
