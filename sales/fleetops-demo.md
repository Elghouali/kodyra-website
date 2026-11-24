# FleetOps — Five-minute client demo script

**Goal:** help a rental-agency manager understand the idea and start a requirements conversation. Never claim the demo is production-ready or used by real agencies.

## Before the meeting
- Open the [FleetOps working demo](https://kodyra-fleetops-live.elghoualizakariae.workers.dev/).
- Use only fictional data. Do not ask a prospect to paste customer records into the demo.
- Open the [FleetOps business page](https://kodyra-studio.elghoualizakariae.workers.dev/solutions/fleetops/).
- Have the [source repository](https://github.com/Elghouali/kodyra-fleetops) available for technical questions.

## 0:00–0:45 — Their process

**Say:** "Before I show the interface, how do you currently manage a new reservation and check whether a vehicle is available?"

Listen. Don't claim the prospect uses spreadsheets unless they say so.

## 0:45–1:45 — Bookings

Show a fictional reservation and the date selection. Explain how overlap validation can help avoid accidental double allocations. Be precise: it is rule validation in a browser demo, not a shared production booking ledger.

**Ask:** "Would your staff need to create bookings from a single desk, or from multiple branches?"

## 1:45–2:45 — Fleet and customers

Show the vehicle records, statuses, and a fictional customer. Explain the value of linking fleet details to a rental workflow.

**Ask:** "How do you currently track returns, maintenance, and vehicle availability?"

## 2:45–3:45 — Reporting

Open operational charts and explain what a manager might want to monitor. Mention the separate Python/SQLite reporting exercise without implying an existing live data warehouse.

**Ask:** "Which report takes the most manual effort today?"

## 3:45–4:30 — Production scope

**Say:** "This is a working demonstration using fictional data stored in this browser. Your business system would need authentication, a shared database, backups, and the integrations you actually use. We would define those in a written scope before development."

## 4:30–5:00 — Next step

**Say:** "If the workflow seems relevant, I can map your current process, suggest a practical first version, and prepare a tailored proposal. What would you consider the most valuable problem to solve first?"

Follow up only after receiving permission. Send a short recap covering their stated pain point, proposed scope, missing requirements, and next steps.

## Credibility checklist

- No invented client numbers, testimonials or ROI statistics.
- No false promises about launch time, security, payment integration or scalability.
- Don't show private company information or prospect records in a public browser demo.
- Keep the discussion anchored in a client's real workflow.
