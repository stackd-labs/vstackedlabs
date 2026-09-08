# Proposed prices (need your review)

Every price below is a **placeholder I wrote** so the new divisions would look real on the site. None of them are yours yet. Everything is in one file: `lib/divisions.ts`. Change the `price` string, and the site, the pricing page, the services list, and the chatbot all update together.

Anything **not** on this list is a price that was already live on the site and I carried it over unchanged.

In `npm run dev` these placeholder prices render with a dotted orange underline so you can spot them while clicking through. In production they render normally, so nothing looks unfinished if you deploy before editing.

To find them all in the code:

```
grep -n "proposed: true" lib/divisions.ts
```

---

## 🎓 Learn (6 placeholders)

| Offer | Placeholder | Timing |
| --- | --- | --- |
| Build Your First App | **$497** | 4-week cohort |
| AI-Assisted Development | **$897** | 6 weeks |
| Vibe Coding to Real Development | **$1,200** | 8 weeks |
| Kids and Teens Technology | **$299** | Per term |
| 55+ Technology Program | **$199** | 4 sessions |
| Career Transition Program | **From $2,400** | 12 weeks |

Self-Paced Courses ("From $29") points at the existing store, so that one is real if your cheapest store product is $29. Check `lib/products.ts`.

## 👨‍💻 Builders (4 placeholders)

| Offer | Placeholder | Timing |
| --- | --- | --- |
| Unblock | **$97** | 24-hour turnaround |
| Code or Architecture Review | **$297** | 3 business days |
| 1:1 Engineering Session | **$150/hr** | Booked within 48 hours |
| Builder Support | **$199/mo** | Monthly membership |

The whole division is a placeholder, so the membership number matters most: it sets whether this reads as a hobbyist product or a professional one.

## 🛟 Rescue (4 placeholders)

| Offer | Placeholder | Timing |
| --- | --- | --- |
| App Diagnostic | **$297** | 48-hour turnaround |
| Security and Database Review | **$697** | 5 business days |
| Fix Sprint | **$1,497** | 5 business days |
| MVP Rescue and Production Readiness | **From $4,500** | 3 to 6 weeks |

I deliberately set the App Diagnostic ($297) below the Systems Audit ($397) so Rescue is the cheapest way into the company. It is also written to credit toward a Fix Sprint, mirroring how the Audit credits toward a Build Sprint. Both of those promises appear on the site and in the chatbot, so if you change the credit rules, say so and I will update all three places.

## 🚀 Build (1 placeholder)

| Offer | Placeholder | Timing |
| --- | --- | --- |
| MVP Build | **From $8,000** | 6 to 12 weeks |

Everything else in Build is your existing published pricing, unchanged: Systems Audit $397, Build Sprint $997, Website Build $1,800 to $3,000, Business Brain from $500 + $149/mo.

## 🏢 Teams (3 placeholders)

| Offer | Placeholder | Timing |
| --- | --- | --- |
| Fractional Engineering | **From $2,400/mo** | 10 to 20 hours per month |
| Fractional Technical Team | **From $6,500/mo** | Monthly |
| Embedded Engineering | **From $9,000/mo** | Quarterly commitment |

$2,400/mo across 10 to 20 hours works out to $120 to $240 an hour. Worth deciding whether you want the hourly rate to read higher than the $150/hr in Builders (it currently can, at the low-hours end, which is defensible but worth being deliberate about).

Team Enablement (from $2,500) and Operating Partner ($1,500/mo) are your existing prices, unchanged.

## 🏭 Enterprise (2 placeholders)

| Offer | Placeholder | Timing |
| --- | --- | --- |
| Capacity Assessment | **From $5,000** | 2 to 3 weeks |
| Engineering Augmentation | **From $18,000/mo** | Quarterly or annual |

Application Modernization is deliberately "Custom scope" with no number. Enterprise Enablement (from $5,000) is your existing price.

---

## Other things I decided that you may want to change

1. **Learn is not accredited and the site says so.** The chatbot knowledge base has an explicit "we do not accredit or certify anyone" line under what we do not do. If you plan to offer a Stackd Builder Certification later, that line comes out.

2. **The kids and 55+ programs imply a delivery format I made up.** Small groups, laptop required, parent showcase, one instructor per six people. Those are real commitments if they stay on the site.

3. **Builders promises response times.** Unblock says one business day, Builder Support says same or next day, and 1:1 sessions say booked within 48 hours. Those are the kind of promise that gets quoted back at you.

4. **Teams and Enterprise imply staff you may not have yet.** Embedded Engineering says "one to three engineers," Fractional Technical Team says "60 to 100 hours per month across roles," and Enterprise Engineering Augmentation says "a dedicated pod with named leads." Everything else on the site is deliverable by you plus contractors. These three are not, at volume. Worth deciding whether they stay published, go behind an application, or get a "limited availability" note.

5. **Enterprise claims compliance posture.** BAA and FedRAMP-aligned providers, on-premise deployment available. That language already existed elsewhere on your site, so I kept it, but Enterprise buyers read it as a commitment and will ask for documentation.
