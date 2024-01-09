import * as Sentry from '@sentry/nextjs';
import { sentryConfig } from './sentryConfig';

Sentry.init(sentryConfig);
