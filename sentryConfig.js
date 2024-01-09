const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

export const sentryConfig = {
  dsn: SENTRY_DSN,
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,
  enabled: process.env.NODE_ENV === 'production',
  beforeSend(event) {
    return sanitizeEvent(event);
  },
};

function sanitizeEvent(event) {
  const keywords = [
    'name',
    'address',
    'city',
    'street',
    'house',
    'email',
    'cloudinary',
    'message',
    'phone',
    'postal',
    'zip',
    'file',
    'image',
    'token',
    'password',
    'secret',
    'key',
    'authorization',
    'user',
    'headers',
    'cookies',
  ];

  //This is needed to reduce the amount of data being sent to sentry
  if (event.breadcrumbs) {
    event.breadcrumbs = event.breadcrumbs.slice(-5, event.breadcrumbs.length);
  }

  if (event.request) {
    event.request = `method: ${event.request.method} - url: ${event.request.url}`;
  }

  for (const key in event) {
    if (Object.hasOwnProperty.bind(event)(key)) {
      const lowerCaseKey = key?.toLocaleLowerCase();
      const value = event[key];

      if (keywords.some((keyword) => lowerCaseKey.includes(keyword))) {
        switch (typeof value) {
          case 'number': {
            event[key] = 'number';
            continue;
          }
          case 'string': {
            event[key] = 'string';
            continue;
          }
          case 'object': {
            if (value === null) {
              event[key] = 'null';
              continue;
            }
            if (Array.isArray(value)) {
              event[key] = `array: (length-${value.length})`;
              continue;
            } else {
              event[key] = 'object';
              continue;
            }
          }
        }
        continue;
      }

      if (typeof value === 'object' && !Array.isArray(value)) {
        if (value === null) {
          event[key] = 'null';
          continue;
        }
        event[key] = sanitizeEvent(value);
      }
    }
  }
  return event;
}
