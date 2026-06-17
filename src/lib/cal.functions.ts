import { createServerFn } from "@tanstack/react-start";

const CAL_API_BASE = "https://api.cal.eu/v2";
const EVENT_TYPE_ID = 301758; // studio-legale-accarino / 15min
const TIME_ZONE = "Europe/Rome";

export type CalSlot = { start: string }; // ISO with offset
export type CalSlotsByDate = Record<string, CalSlot[]>;

export const getCalSlots = createServerFn({ method: "GET" })
  .inputValidator((input: { start: string; end: string }) => input)
  .handler(async ({ data }): Promise<CalSlotsByDate> => {
    const apiKey = process.env.CAL_API_KEY;
    if (!apiKey) throw new Error("CAL_API_KEY missing");

    const url = `${CAL_API_BASE}/slots?eventTypeId=${EVENT_TYPE_ID}&start=${encodeURIComponent(
      data.start,
    )}&end=${encodeURIComponent(data.end)}&timeZone=${encodeURIComponent(TIME_ZONE)}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": "2024-09-04",
      },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Cal slots ${res.status}: ${text}`);
    }
    const json = (await res.json()) as { data: CalSlotsByDate };
    return json.data ?? {};
  });

export const createCalBooking = createServerFn({ method: "POST" })
  .inputValidator(
    (input: {
      start: string;
      name: string;
      email: string;
      phone?: string;
      notes?: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.CAL_API_KEY;
    if (!apiKey) throw new Error("CAL_API_KEY missing");

    const body = {
      start: data.start,
      eventTypeId: EVENT_TYPE_ID,
      attendee: {
        name: data.name,
        email: data.email,
        timeZone: TIME_ZONE,
        language: "it",
        ...(data.phone ? { phoneNumber: data.phone } : {}),
      },
      ...(data.notes ? { bookingFieldsResponses: { notes: data.notes } } : {}),
    };

    const res = await fetch(`${CAL_API_BASE}/bookings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": "2024-08-13",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(`Cal booking ${res.status}: ${JSON.stringify(json)}`);
    }
    return json;
  });
