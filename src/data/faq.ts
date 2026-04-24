// All answers drawn from birchbankgolf.com or verified public information.
// Do not add unverified facts here. FAQ answers feed the FAQPage schema.

export type FAQCategory = "visiting" | "course" | "fees" | "community";

export const FAQ_CATEGORIES: { key: FAQCategory; label: string; blurb: string }[] = [
  { key: "visiting",  label: "Visiting & booking", blurb: "Hours, location, how to book a tee time, dress code." },
  { key: "course",    label: "The course",         blurb: "History, design, ratings, the 2018 restoration." },
  { key: "fees",      label: "Fees & equipment",   blurb: "Cart rates, range access, scoring." },
  { key: "community", label: "Community",          blurb: "Member clubs and how to get involved." },
];

export const FAQ: Array<{ question: string; answer: string; category: FAQCategory }> = [
  {
    category: "visiting",
    question: "How long is the Birchbank golf season?",
    answer:
      "Birchbank's average season runs from April 1 through October 31, 213 days of golf, per the course's published information.",
  },
  {
    category: "visiting",
    question: "Where is Birchbank Golf Course located?",
    answer:
      "5500 Highway 22, Genelle, BC (mailing address: PO Box 250, Trail, BC V1R 4L5). The course sits along the banks of the Columbia River.",
  },
  {
    category: "visiting",
    question: "What are the Pro Shop hours?",
    answer:
      "Pro Shop hours are 8 am to dusk, seven days a week during the April 1 through October 31 season.",
  },
  {
    category: "visiting",
    question: "What are the Bistro hours?",
    answer:
      "The Bistro is open daily from 10 am to 6 pm. It is fully licensed with a covered patio. The Bistro line is 250-693-5451.",
  },
  {
    category: "visiting",
    question: "How do I book a tee time?",
    answer:
      "Tee times can be booked online via Chronogolf or by phoning the Pro Shop at 250-693-2255.",
  },
  {
    category: "visiting",
    question: "What is the dress code?",
    answer:
      "Short version: golf-appropriate apparel, collared shirts or mock necks, shorts at least mid-thigh, soft-soled shoes (no metal spikes). Full published code, ladies, men, and footwear, is on the dedicated dress code page: /dress-code.",
  },
  {
    category: "fees",
    question: "Do you have a driving range?",
    answer:
      "Yes. Birchbank has a driving range. Season range passes are offered to members at $255 (single) or $385 (family).",
  },
  {
    category: "fees",
    question: "What power cart rates do you offer?",
    answer:
      "Power carts are priced per rider with tax included: $13.50 for 9 holes or $24.00 for 18 holes. Seasonal single-seat lease is $635.",
  },
  {
    category: "community",
    question: "Is the Retirees Club open to non-members?",
    answer:
      "Yes. Membership in the Retirees Club is open to retired players and does not require a Birchbank Golf Course membership. The club plays every Thursday morning from April through October with a two-hour reserved tee block.",
  },
  {
    category: "course",
    question: "Who designed the course?",
    answer:
      "The back nine and original clubhouse, completed in 1969, were designed by local golf professional Roy Stone. Construction of the Birchbank course began in 1962 on land leased from Cominco; the first nine holes were completed in 1964. The club purchased the property from Cominco in 2004.",
  },
  {
    category: "course",
    question: "Was the course reconfigured recently?",
    answer:
      "Yes. As of June 1, 2018, Birchbank was reconfigured to resemble the course as it was originally built.",
  },
  {
    category: "course",
    question: "What is the course rating and slope?",
    answer:
      "Par 72. Four sets of tees per the printed scorecard. Blue (6,584 yards): men's rating 71.5, slope 121. Combo (6,277 yards): men's rating 70.0, slope 120; women's rating 72.3, slope 124 over 5,620 yards. White (5,941 yards): men's rating 68.1, slope 115. Red (5,330 yards): women's rating 70.8, slope 119.",
  },
  {
    category: "fees",
    question: "Where can I enter my score?",
    answer:
      "Members and visiting Golf Canada members can post scores at scg.golfcanada.ca. The Pro Shop can help if you're new to the handicap system.",
  },
];
