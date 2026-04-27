// All rates verified from https://www.birchbankgolf.com/rates/. April 2026.
// Dollar amounts are CAD; tax treatment per the source site.

export type Rate = {
  label: string;
  amount: string;
  note?: string;
};

export const GREEN_FEES: Rate[] = [
  { label: "18 Holes, day rate", amount: "$80" },
  { label: "9 Holes", amount: "$45" },
  { label: "Twilight, after 1:00 PM", amount: "$55" },
  { label: "Twilight, after 3:00 PM", amount: "$45" },
  { label: "Reciprocal rate", amount: "25% off rack", note: "Participating clubs" },
];

export const PROMOTIONS = [
  {
    name: "Beat The Heat",
    window: "July 1 – August 31 · after 1:00 PM · not valid Wednesdays",
    price: "$70",
    includes: "18 holes & half power cart",
  },
];

export const CART_FEES = [
  { label: "Power cart, 9 holes", amount: "$13.50", note: "Per rider, tax included" },
  { label: "Power cart, 18 holes", amount: "$24.00", note: "Per rider, tax included" },
  { label: "Power cart seasonal lease", amount: "$635" },
  { label: "Personal cart storage, gas", amount: "$285" },
  { label: "Personal cart storage, electric", amount: "$320" },
  { label: "Cart trackage fee", amount: "$225" },
];

export const PUNCH_PASSES = [
  { label: "5 rounds · 18 holes", amount: "$340" },
  { label: "5 rounds · 9 holes", amount: "$190" },
];

export const RANGE_PASS = [
  { label: "Single (members only)", amount: "$255" },
  { label: "Family (members only)", amount: "$385" },
];

export const LOCKERS = [
  { label: "Men's locker", amount: "$53" },
  { label: "Outside locker", amount: "$160" },
];

// Verified from https://www.birchbankgolf.com/memberships/ (2025 Early Bird prices displayed).
// 2026 prices to be confirmed, source page listed Early Bird pricing through Nov 5, 2025.
export const MEMBERSHIP_TIERS = [
  { name: "Single · Full Play", price: "$1,969", blurb: "Unlimited play, 7 days a week, no restrictions." },
  { name: "Couple · Full Play", price: "$3,590", blurb: "Unlimited play for two members." },
  { name: "Family", price: "$4,050", blurb: "Unlimited play for family members." },
  { name: "Intermediate (19–29)", price: "$1,175", blurb: "Unlimited play for the 19–29 age bracket." },
  { name: "New Member · Single Full Play", price: "$1,525", blurb: "For members who have not held membership for 2 years." },
  { name: "New Couple Members · Full Play", price: "$2,780", blurb: "For new members (non-members for 2 years)." },
  { name: "Student", price: "$640", blurb: "Unlimited play for students." },
];

export const MEMBERSHIP_BENEFITS = [
  "Advance tee time booking",
  "Member-only Pro Shop discounts",
  "Reciprocal rates at participating golf courses",
  "Early payment incentives",
  "Preferred guest green fee rates",
];

export const EARLY_BIRD_NOTE =
  "Fall Early Bird special pricing listed above was valid through November 5, 2025. Contact the office for current 2026 rates.";
