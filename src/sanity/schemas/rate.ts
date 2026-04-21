export const rateSchema = {
  name: "rate",
  title: "Rate",
  type: "document",
  fields: [
    { name: "label", title: "Label", type: "string" },
    {
      name: "window",
      title: "Day window",
      type: "string",
      options: {
        list: [
          { title: "Monday–Thursday", value: "weekday" },
          { title: "Friday–Sunday & holidays", value: "weekend" },
          { title: "Twilight (after 4 pm)", value: "twilight" },
        ],
      },
    },
    { name: "eighteen", title: "18 holes (CAD)", type: "number" },
    { name: "nine", title: "9 holes (CAD)", type: "number" },
    { name: "note", title: "Note", type: "string" },
    { name: "effectiveFrom", title: "Effective from", type: "date" },
    { name: "effectiveTo", title: "Effective to", type: "date" },
  ],
};
